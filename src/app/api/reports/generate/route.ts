import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { generateWithOllama, getSystemPromptForType } from "@/lib/ollama-client";
import DOMPurify from "isomorphic-dompurify";
import { z } from "zod";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

/**
 * POST /api/reports/generate
 * Generate a report for an order.
 * Body: { orderId }
 *
 * Priority: Ollama (local) → Claude API → Template fallback.
 */
// Input validation schema
const requestSchema = z.object({
  orderId: z.string().uuid("Invalid order ID format"),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 5 report generations per hour per user
    const ip = getClientIp(request);
    const rateLimitResult = rateLimit(`report-gen:${ip}`, { limit: 5, windowSeconds: 3600 });

    if (!rateLimitResult.success) {
      return NextResponse.json({
        error: "Too many requests",
        message: `Rate limit exceeded. Please try again in ${rateLimitResult.resetIn} seconds.`,
        retryAfter: rateLimitResult.resetIn,
      }, {
        status: 429,
        headers: {
          "Retry-After": rateLimitResult.resetIn.toString(),
          "X-RateLimit-Limit": "5",
          "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
          "X-RateLimit-Reset": rateLimitResult.resetIn.toString(),
        }
      });
    }

    const supabase = createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validate input
    const body = await request.json();
    const validationResult = requestSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({
        error: "Invalid input",
        details: validationResult.error.issues
      }, { status: 400 });
    }
    const { orderId } = validationResult.data;

    // Fetch order
    const { data: order } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Fetch related documents
    const { data: docs } = await supabase
      .from("documents")
      .select("file_name, ocr_text, mime_type")
      .eq("order_id", orderId);

    // Create report record
    const { data: report, error: reportError } = await supabase
      .from("reports")
      .insert({
        order_id: orderId,
        status: "generating",
        title: `Науково-правовий висновок — ${order.title}`,
      })
      .select()
      .single();

    if (reportError || !report) {
      return NextResponse.json({ error: "Failed to create report" }, { status: 500 });
    }

    // Build prompts
    const reportType = order.report_subtype || order.report_type || "residential_damage";
    const systemPrompt = getSystemPromptForType(reportType);

    const docsContext = (docs || [])
      .filter((d) => d.ocr_text)
      .map((d) => `--- ${d.file_name} ---\n${d.ocr_text?.slice(0, 2000)}`)
      .join("\n\n");

    const userPrompt = `Підготуй науково-правовий висновок для RD4U.
Тип: ${reportType}
Об'єкт: ${order.object_address || "не вказано"}
Опис: ${order.description || "не надано"}
${docsContext ? `\nДокументи:\n${docsContext}` : ""}

Сформуй повний 7-розділовий висновок з таблицями, формулами та розрахунками у грн/USD/EUR.`;

    let contentHtml = "";
    let contentJson: Record<string, unknown> = {};
    let generatedBy = "";

    // 1. Try Ollama (local desktop app)
    const ollamaText = await generateWithOllama(systemPrompt, userPrompt);
    if (ollamaText) {
      contentHtml = markdownToHtml(ollamaText);
      contentJson = { raw: ollamaText, model: process.env.OLLAMA_MODEL || "rd4u-expert:v2", source: "ollama", generated: new Date().toISOString() };
      generatedBy = "ollama";
    }

    // 2. Fallback: Claude API
    if (!contentHtml) {
      const apiKey = process.env.ANTHROPIC_API_KEY;
      if (apiKey) {
        try {
          const claudeResp = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
              "x-api-key": apiKey,
              "anthropic-version": "2023-06-01",
              "content-type": "application/json",
            },
            body: JSON.stringify({
              model: "claude-sonnet-4-20250514",
              max_tokens: 8192,
              system: systemPrompt,
              messages: [{ role: "user", content: userPrompt }],
            }),
          });

          if (claudeResp.ok) {
            const data = await claudeResp.json();
            const text = data.content?.[0]?.text || "";
            contentHtml = markdownToHtml(text);
            contentJson = { raw: text, model: "claude-sonnet-4-20250514", source: "claude", generated: new Date().toISOString() };
            generatedBy = "claude";
          }
        } catch (e) {
          console.error("Claude API error:", e);
        }
      }
    }

    // 3. Fallback: template
    if (!contentHtml) {
      contentHtml = `<h1>НАУКОВО-ПРАВОВИЙ ВИСНОВОК</h1>
<h2>1. ВСТУП</h2><p>Цей висновок підготовлено ПНУ «МІВРУ» (ЄДРПОУ 45681824) на замовлення...</p>
<h2>2. НОРМАТИВНО-ПРАВОВА БАЗА</h2><p>Резолюція ГА ООН ES-11/5, CM/Res(2023)3, КМУ №326...</p>
<h2>3. МЕТОДОЛОГІЯ</h2><p>DaLA: D + L + N, EMS-98...</p>
<h2>4. ОПИС ОБ'ЄКТА</h2><p>${order.object_address || "Адреса не вказана"}...</p>
<h2>5. ДОСЛІДЖЕННЯ ПОШКОДЖЕНЬ</h2><p>Потребує заповнення експертом...</p>
<h2>6. РОЗРАХУНОК ШКОДИ</h2><p>Потребує заповнення...</p>
<h2>7. ВИСНОВКИ</h2><p>Потребує заповнення...</p>`;
      contentJson = { template: true, generated: new Date().toISOString() };
      generatedBy = "template";
    }

    // Update report
    await supabase
      .from("reports")
      .update({
        status: "draft",
        content_html: contentHtml,
        content_json: contentJson,
        generated_at: new Date().toISOString(),
      })
      .eq("id", report.id);

    // Update order status
    await supabase
      .from("orders")
      .update({ status: "processing" })
      .eq("id", orderId);

    return NextResponse.json({
      reportId: report.id,
      status: "draft",
      generatedBy,
      contentLength: contentHtml.length,
    });
  } catch (error) {
    console.error("Report generation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * Convert markdown-like text to basic HTML with XSS protection
 * Uses DOMPurify to sanitize output
 */
function markdownToHtml(text: string): string {
  // First escape any HTML entities in the input text
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Then apply markdown transformations
  const html = escaped
    // Headers
    .replace(/^#{1,2}\s+(.+)$/gm, "<h2>$1</h2>")
    // Numbered section headers
    .replace(/^(\d+\.\s+[A-ZА-ЯІЇЄҐ].+)$/gm, "<h2>$1</h2>")
    // Bold
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Table rows (markdown pipe tables → HTML)
    .replace(/^\|(.+)\|$/gm, (_, row: string) => {
      const cells = row.split("|").map((c: string) => c.trim());
      const tds = cells.map((c: string) => `<td>${c}</td>`).join("");
      return `<tr>${tds}</tr>`;
    })
    // Wrap consecutive <tr> in <table>
    .replace(/((?:<tr>.*<\/tr>\n?)+)/g, "<table>$1</table>")
    // Remove separator rows (|---|---|)
    .replace(/<tr><td>[-:]+<\/td>.*?<\/tr>/g, "")
    // Paragraphs
    .replace(/\n\n/g, "</p><p>")
    .replace(/^/, "<p>")
    .replace(/$/, "</p>")
    // Clean up empty paragraphs
    .replace(/<p>\s*<\/p>/g, "")
    .replace(/<p>\s*<(h2|table)/g, "<$1")
    .replace(/<\/(h2|table)>\s*<\/p>/g, "</$1>");

  // Sanitize the final HTML to prevent XSS
  const sanitized = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ["h1", "h2", "h3", "p", "strong", "em", "table", "tr", "td", "th", "ul", "ol", "li", "br"],
    ALLOWED_ATTR: ["class"],
    KEEP_CONTENT: true,
  });

  return sanitized;
}
