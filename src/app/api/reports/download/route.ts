import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

/**
 * GET /api/reports/download?reportId=xxx
 * Download a generated report as HTML (rendered as PDF via browser print).
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const reportId = request.nextUrl.searchParams.get("reportId");
    if (!reportId) {
      return NextResponse.json({ error: "reportId required" }, { status: 400 });
    }

    // Fetch report with order info
    const { data: report } = await supabase
      .from("reports")
      .select("*, orders(user_id, title)")
      .eq("id", reportId)
      .single();

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    // Verify ownership (user owns the order, or is admin/expert)
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const isAdmin = profile?.role === "admin";
    const isExpert = profile?.role === "expert";
    const orderArr = report.orders as { user_id: string; title: string }[] | null;
    const orderOwner = orderArr?.[0]?.user_id;

    if (!isAdmin && !isExpert && orderOwner !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const contentHtml = report.content_html || "<p>Report content not available</p>";
    const title = report.title || "Науково-правовий висновок";
    const generatedAt = report.generated_at
      ? new Date(report.generated_at).toLocaleDateString("uk-UA")
      : new Date().toLocaleDateString("uk-UA");

    // Generate full HTML document for PDF printing
    const fullHtml = `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    @page { margin: 2cm; size: A4; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Times New Roman', Georgia, serif; font-size: 14px; color: #1a1a1a; line-height: 1.6; }
    .header { text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #0f172a; }
    .header .institute { font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #666; margin-bottom: 5px; }
    .header .title { font-size: 20px; font-weight: bold; color: #0f172a; margin: 10px 0; }
    .header .meta { font-size: 11px; color: #888; }
    h1 { font-size: 18px; color: #0f172a; margin: 25px 0 15px; text-align: center; text-transform: uppercase; }
    h2 { font-size: 16px; color: #0f172a; margin: 20px 0 10px; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
    h3 { font-size: 14px; color: #333; margin: 15px 0 8px; }
    p { margin-bottom: 10px; text-align: justify; text-indent: 1.5em; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 11px; color: #888; text-align: center; }
    .signatures { display: flex; justify-content: space-between; margin-top: 60px; }
    .signature { width: 200px; text-align: center; }
    .signature-line { border-top: 1px solid #333; padding-top: 5px; font-size: 12px; }
    @media print {
      body { font-size: 12pt; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="institute">ПНУ «Міжнародний інститут відновлення та розвитку України»</div>
    <div class="institute" style="font-size:10px; color:#999;">ЄДРПОУ 45681824</div>
    <div class="title">${title}</div>
    <div class="meta">Дата: ${generatedAt}</div>
  </div>

  ${contentHtml}

  <div class="signatures">
    <div class="signature">
      <div class="signature-line">Директор</div>
    </div>
    <div class="signature">
      <div class="signature-line">М.П.</div>
    </div>
  </div>

  <div class="footer">
    &copy; ${new Date().getFullYear()} МІВРУ — Міжнародний інститут відновлення та розвитку України
  </div>
</body>
</html>`;

    return new NextResponse(fullHtml, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": `inline; filename="${encodeURIComponent(title)}.html"`,
      },
    });
  } catch (error) {
    console.error("Report download error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
