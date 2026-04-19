/**
 * Ollama HTTP client for web server-side report generation.
 * Tries local Ollama first (desktop app), falls back to Claude API.
 */

const DEFAULT_OLLAMA_URL = "http://127.0.0.1:11434";
const DEFAULT_MODEL = "rd4u-expert:v2";
const HEALTH_TIMEOUT_MS = 3000;

interface OllamaChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OllamaChatResponse {
  message?: { content: string };
  done: boolean;
}

/**
 * Check if Ollama is running and accessible.
 */
export async function isOllamaAvailable(
  baseUrl = process.env.OLLAMA_URL || DEFAULT_OLLAMA_URL
): Promise<boolean> {
  try {
    const resp = await fetch(`${baseUrl}/api/tags`, {
      signal: AbortSignal.timeout(HEALTH_TIMEOUT_MS),
    });
    return resp.ok;
  } catch {
    return false;
  }
}

/**
 * List available Ollama models.
 */
export async function listModels(
  baseUrl = process.env.OLLAMA_URL || DEFAULT_OLLAMA_URL
): Promise<string[]> {
  try {
    const resp = await fetch(`${baseUrl}/api/tags`, {
      signal: AbortSignal.timeout(5000),
    });
    if (!resp.ok) return [];
    const data = await resp.json();
    return (data.models || []).map((m: { name: string }) => m.name);
  } catch {
    return [];
  }
}

interface OllamaResult {
  success: boolean;
  data?: string;
  error?: string;
  source: "ollama";
}

/**
 * Generate a report via Ollama chat API (non-streaming).
 * Returns detailed result object with success/error information.
 */
export async function generateWithOllama(
  systemPrompt: string,
  userPrompt: string,
  options?: {
    model?: string;
    baseUrl?: string;
    temperature?: number;
    numPredict?: number;
  }
): Promise<string | null> {
  const baseUrl = options?.baseUrl || process.env.OLLAMA_URL || DEFAULT_OLLAMA_URL;
  const model = options?.model || process.env.OLLAMA_MODEL || DEFAULT_MODEL;

  try {
    // Check availability with timeout
    const available = await isOllamaAvailable(baseUrl);
    if (!available) {
      console.warn(`[Ollama] Service not available at ${baseUrl}`);
      return null;
    }

    const messages: OllamaChatMessage[] = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ];

    console.log(`[Ollama] Starting generation with model ${model}...`);
    const startTime = Date.now();

    const resp = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        model,
        messages,
        stream: false,
        options: {
          temperature: options?.temperature ?? 0.3,
          num_predict: options?.numPredict ?? 16384,
        },
      }),
      signal: AbortSignal.timeout(300_000), // 5 min for long reports
    });

    if (!resp.ok) {
      const errorText = await resp.text().catch(() => "Unknown error");
      console.error(`[Ollama] Generation failed: ${resp.status} ${resp.statusText}`, errorText);
      return null;
    }

    const data: OllamaChatResponse = await resp.json();
    const content = data.message?.content;

    if (!content) {
      console.error("[Ollama] Response received but no content");
      return null;
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`[Ollama] Generation completed in ${duration}s (${content.length} chars)`);

    return content;
  } catch (e) {
    if (e instanceof Error) {
      if (e.name === "AbortError" || e.name === "TimeoutError") {
        console.error("[Ollama] Generation timeout after 5 minutes");
      } else {
        console.error("[Ollama] Generation error:", e.message);
      }
    } else {
      console.error("[Ollama] Unknown error:", e);
    }
    return null;
  }
}

/**
 * System prompts for different report types.
 * Mirrors the prompts from the desktop Rust ai_service.rs
 */
export function getSystemPromptForType(reportType: string): string {
  switch (reportType) {
    case "monte_carlo_analysis":
      return MONTE_CARLO_PROMPT;
    case "insurance_survey":
      return INSURANCE_SURVEY_PROMPT;
    case "investment_memorandum":
      return INVESTMENT_MEMO_PROMPT;
    case "causation_analysis":
      return CAUSATION_PROMPT;
    default:
      return REPORT_PROMPT;
  }
}

const REPORT_PROMPT = `Ви — експерт ПНУ «МІВРУ» (ЄДРПОУ 45681824) з підготовки науково-правових висновків для RD4U.
Методологія DaLA Світового банку. Постанова КМУ №326 від 20.03.2022.
Структура: 1.Вступ 2.Нормативна база 3.Методологія 4.Опис об'єкта 5.Дослідження пошкоджень 6.Розрахунок шкоди 7.Висновки
Формули: D=Σ(Vi×Si×Ki×Kр), L=Σ(Ri×Ti)+Σ(Dj), N=D×Kbb+P+A
Шкала EMS-98: DS1-DS5. Науковий стиль, українською мовою.
Завжди створюй ПОВНИЙ висновок з усіма 7 розділами, таблицями та формулами.
Суми вказуй у грн, USD, EUR.`;

const MONTE_CARLO_PROMPT = `Ви — експерт ПНУ «МІВРУ» зі стохастичного моделювання збитків Монте-Карло.
Розподіл PERT, 10000 ітерацій, довірчі інтервали P10/P50/P90.
Торнадо-діаграма чутливості. 7 розділів, де розділ 6 містить:
6.1 Вхідні параметри (мін/модальне/макс)
6.2 Результати симуляції (P10/P50/P90)
6.3 Аналіз чутливості
6.4 Підсумок для RD4U. Українською мовою.`;

const INSURANCE_SURVEY_PROMPT = `Ви — експерт ПНУ «МІВРУ» зі страхового обстеження за стандартами Lloyd's.
Розрахунки PML/MFL/NLE для об'єктів в зоні конфлікту.
PML — ймовірний максимальний збиток, MFL — без захисних заходів, NLE — нормальне очікування.
Воєнний ризик як додатковий фактор. 7 розділів. Українською мовою.`;

const INVESTMENT_MEMO_PROMPT = `Ви — експерт ПНУ «МІВРУ» з інвестиційного аналізу відновлення.
DCF (Discounted Cash Flow), IRR, NPV, Payback Period.
Ставка дисконтування: WACC + country risk premium для України.
Сценарний аналіз: оптимістичний/базовий/песимістичний.
7 розділів, де розділ 6 містить DCF-таблиці, IRR/NPV. Українською мовою.`;

const CAUSATION_PROMPT = `Ви — експерт ПНУ «МІВРУ» з причинно-наслідкового аналізу.
Evidence Scoring 0-100: супутникові знімки (0-25), акти обстеження (0-20), фотоматеріали (0-20), свідчення (0-15), реєстрові дані (0-20).
But-For Test, Proximate Cause, Foreseeability Analysis.
Стандарт доказу: Balance of Probabilities (>50%).
7 розділів, де розділ 5 містить Evidence Scoring. Українською мовою.`;
