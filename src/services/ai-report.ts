/**
 * AI Report Generation Service
 *
 * Orchestrates multiple AI models for report creation:
 * 1. Claude Sonnet — main text generation (Ukrainian)
 * 2. GPT-4o Vision — damage photo analysis
 * 3. Gemini Flash — bulk processing, classification
 * 4. Ollama (local) — offline fallback
 */

import Anthropic from "@anthropic-ai/sdk";

interface ReportGenerationRequest {
  orderId: string;
  reportType: string;
  reportSubtype: string;
  objectAddress: string;
  description: string;
  ocrTexts: string[];
  photoDescriptions?: string[];
}

interface ReportDraft {
  title: string;
  sections: ReportSection[];
  metadata: {
    generatedAt: string;
    model: string;
    tokensUsed: number;
  };
}

interface ReportSection {
  heading: string;
  content: string;
  level: number;
}

// System prompt for Ukrainian scientific report generation
const REPORT_SYSTEM_PROMPT = `Ви — експерт з підготовки науково-технічних звітів для Реєстру збитків України (RD4U).

Ваше завдання — генерувати професійні науково-технічні звіти українською мовою з дотриманням наступних вимог:
1. Науковий стиль мовлення
2. Посилання на чинне законодавство України
3. Відповідність методикам оцінки збитків (Постанова КМУ № 326, ДСТУ та ін.)
4. Чітка структура: вступ, методологія, дослідження, висновки
5. Точні формулювання без суб'єктивних оцінок
6. Відповідність стандартам МСОЗ (Міжнародні стандарти оцінки збитків)

Формат відповіді — JSON з полями: title, sections (heading, content, level).`;

/**
 * Generate a report draft using Claude API
 */
export async function generateReportDraft(
  request: ReportGenerationRequest
): Promise<ReportDraft> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY not configured");
  }

  const anthropic = new Anthropic({ apiKey });

  const userPrompt = buildReportPrompt(request);

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 8192,
    system: REPORT_SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: userPrompt,
      },
    ],
  });

  const textContent = response.content.find((c) => c.type === "text");
  if (!textContent || textContent.type !== "text") {
    throw new Error("No text response from Claude");
  }

  // Parse JSON from response
  const jsonMatch = textContent.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    // If no JSON, create structured response from plain text
    return {
      title: request.reportSubtype,
      sections: [{ heading: "Звіт", content: textContent.text, level: 1 }],
      metadata: {
        generatedAt: new Date().toISOString(),
        model: "claude-sonnet-4-20250514",
        tokensUsed: response.usage.input_tokens + response.usage.output_tokens,
      },
    };
  }

  const parsed = JSON.parse(jsonMatch[0]);

  return {
    title: parsed.title || request.reportSubtype,
    sections: parsed.sections || [],
    metadata: {
      generatedAt: new Date().toISOString(),
      model: "claude-sonnet-4-20250514",
      tokensUsed: response.usage.input_tokens + response.usage.output_tokens,
    },
  };
}

function buildReportPrompt(request: ReportGenerationRequest): string {
  let prompt = `Підготуйте проект звіту:

**Тип:** ${request.reportSubtype}
**Адреса об'єкта:** ${request.objectAddress}
**Опис:** ${request.description}
`;

  if (request.ocrTexts.length > 0) {
    prompt += `\n**Дані з документів (OCR):**\n`;
    request.ocrTexts.forEach((text, i) => {
      prompt += `\nДокумент ${i + 1}:\n${text.substring(0, 3000)}\n`;
    });
  }

  if (request.photoDescriptions && request.photoDescriptions.length > 0) {
    prompt += `\n**Описи фотографій пошкоджень:**\n`;
    request.photoDescriptions.forEach((desc, i) => {
      prompt += `- Фото ${i + 1}: ${desc}\n`;
    });
  }

  prompt += `\nСтворіть повний звіт у форматі JSON: { "title": "...", "sections": [{ "heading": "...", "content": "...", "level": 1|2|3 }] }`;

  return prompt;
}

/**
 * Analyze damage photos using vision model (placeholder for GPT-4o / Gemini)
 */
export async function analyzePhotos(
  photoUrls: string[]
): Promise<string[]> {
  // TODO: Implement GPT-4o Vision or Gemini 2.0 Flash integration
  // For now, return placeholder descriptions
  return photoUrls.map((_, i) => `Фотографія ${i + 1}: потребує аналізу`);
}

/**
 * Convert report sections to HTML for the TipTap editor
 */
export function reportToHtml(draft: ReportDraft): string {
  let html = `<h1>${draft.title}</h1>\n`;

  for (const section of draft.sections) {
    const tag = `h${Math.min(section.level + 1, 4)}`;
    html += `<${tag}>${section.heading}</${tag}>\n`;
    // Convert plain text paragraphs to HTML
    const paragraphs = section.content.split("\n\n");
    for (const p of paragraphs) {
      if (p.trim()) {
        html += `<p>${p.trim()}</p>\n`;
      }
    }
  }

  return html;
}
