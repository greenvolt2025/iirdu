// ============================================================================
// DaLA Calculator — Damage and Loss Assessment (World Bank Methodology)
// ============================================================================
// Based on:
// - RDNA4 (Rapid Damage and Needs Assessment, Feb 2025)
// - КМУ №326 "Про затвердження Методики"
// - Методика 3904-1223 (оцінка збитків від збройної агресії)
// - EMS-98 European Macroseismic Scale
// ============================================================================

// ── Types ────────────────────────────────────────────────────────────────────

export interface DamageComponent {
  id: string;
  name: string;
  replacementValue: number; // Vi — вартість заміщення (EUR)
  area: number; // Si — площа або кількість (м², шт.)
  damageGrade: DamageGrade; // EMS-98 DS1-DS5
  region: string; // область для Kr
}

export interface LossComponent {
  id: string;
  name: string;
  monthlyRevenue: number; // Ri — місячний дохід/прибуток (EUR)
  downtimeMonths: number; // Ti — тривалість простою (місяці)
}

export interface AdditionalLoss {
  id: string;
  name: string;
  amount: number; // Dj — додаткові витрати (EUR)
}

export interface NeedsParams {
  totalDamage: number; // D — загальна сума збитків
  bbbMultiplier: number; // Kbb — коефіцієнт BBB (Build Back Better), 1.1-1.4
  priorityInvestments: number; // P — пріоритетні інвестиції (EUR)
  additionalCosts: number; // A — адміністративні/логістичні витрати (EUR)
}

export interface DaLAResult {
  damage: number; // D = Σ(Vi × Si × Ki × Kr)
  losses: number; // L = Σ(Ri × Ti) + Σ(Dj)
  needs: number; // N = D × Kbb + P + A
  total: number; // D + L + N
  components: {
    damageItems: { name: string; value: number }[];
    lossItems: { name: string; value: number }[];
    additionalLosses: { name: string; value: number }[];
  };
}

// ── EMS-98 Damage Scale ─────────────────────────────────────────────────────

export type DamageGrade = "DS0" | "DS1" | "DS2" | "DS3" | "DS4" | "DS5";

export interface DamageGradeInfo {
  grade: DamageGrade;
  nameUk: string;
  nameEn: string;
  descriptionUk: string;
  descriptionEn: string;
  ki: number; // коефіцієнт пошкодження
  color: string;
}

export const EMS98_SCALE: DamageGradeInfo[] = [
  {
    grade: "DS0",
    nameUk: "Без пошкоджень",
    nameEn: "No damage",
    descriptionUk: "Об'єкт не зазнав пошкоджень",
    descriptionEn: "No visible damage",
    ki: 0,
    color: "#22c55e",
  },
  {
    grade: "DS1",
    nameUk: "Незначні пошкодження",
    nameEn: "Negligible damage",
    descriptionUk: "Тріщини в штукатурці, випадання шматків, пошкодження оздоблення",
    descriptionEn: "Hair-line cracks, fall of small pieces of plaster, cosmetic damage",
    ki: 0.05,
    color: "#84cc16",
  },
  {
    grade: "DS2",
    nameUk: "Помірні пошкодження",
    nameEn: "Moderate damage",
    descriptionUk: "Тріщини в стінах, обвалення штукатурки, часткове пошкодження покрівлі",
    descriptionEn: "Cracks in walls, fall of plaster, partial roof damage",
    ki: 0.2,
    color: "#eab308",
  },
  {
    grade: "DS3",
    nameUk: "Значні пошкодження",
    nameEn: "Substantial damage",
    descriptionUk: "Великі тріщини, обвалення стін, пошкодження несучих конструкцій",
    descriptionEn: "Large cracks, collapse of non-structural walls, structural damage",
    ki: 0.5,
    color: "#f97316",
  },
  {
    grade: "DS4",
    nameUk: "Дуже тяжкі пошкодження",
    nameEn: "Very heavy damage",
    descriptionUk: "Часткове руйнування, серйозні структурні пошкодження",
    descriptionEn: "Partial structural collapse, serious structural failures",
    ki: 0.8,
    color: "#ef4444",
  },
  {
    grade: "DS5",
    nameUk: "Повне руйнування",
    nameEn: "Destruction",
    descriptionUk: "Повне або майже повне руйнування будівлі",
    descriptionEn: "Total or near-total collapse of the building",
    ki: 1.0,
    color: "#991b1b",
  },
];

// ── Regional Coefficients (Kr) ──────────────────────────────────────────────

export const REGIONAL_COEFFICIENTS: Record<string, { nameUk: string; nameEn: string; kr: number }> = {
  kyiv_city: { nameUk: "м. Київ", nameEn: "Kyiv City", kr: 1.25 },
  kyiv_oblast: { nameUk: "Київська обл.", nameEn: "Kyiv Oblast", kr: 1.15 },
  kharkiv: { nameUk: "Харківська обл.", nameEn: "Kharkiv Oblast", kr: 1.1 },
  odesa: { nameUk: "Одеська обл.", nameEn: "Odesa Oblast", kr: 1.1 },
  dnipro: { nameUk: "Дніпропетровська обл.", nameEn: "Dnipropetrovsk Oblast", kr: 1.1 },
  lviv: { nameUk: "Львівська обл.", nameEn: "Lviv Oblast", kr: 1.05 },
  zaporizhzhia: { nameUk: "Запорізька обл.", nameEn: "Zaporizhzhia Oblast", kr: 1.15 },
  donetsk: { nameUk: "Донецька обл.", nameEn: "Donetsk Oblast", kr: 1.2 },
  luhansk: { nameUk: "Луганська обл.", nameEn: "Luhansk Oblast", kr: 1.2 },
  kherson: { nameUk: "Херсонська обл.", nameEn: "Kherson Oblast", kr: 1.15 },
  mykolaiv: { nameUk: "Миколаївська обл.", nameEn: "Mykolaiv Oblast", kr: 1.05 },
  sumy: { nameUk: "Сумська обл.", nameEn: "Sumy Oblast", kr: 1.0 },
  chernihiv: { nameUk: "Чернігівська обл.", nameEn: "Chernihiv Oblast", kr: 1.0 },
  zhytomyr: { nameUk: "Житомирська обл.", nameEn: "Zhytomyr Oblast", kr: 1.0 },
  poltava: { nameUk: "Полтавська обл.", nameEn: "Poltava Oblast", kr: 1.0 },
  vinnytsia: { nameUk: "Вінницька обл.", nameEn: "Vinnytsia Oblast", kr: 1.0 },
  other: { nameUk: "Інша область", nameEn: "Other Oblast", kr: 1.0 },
};

// ── BBB (Build Back Better) Multipliers ─────────────────────────────────────

export const BBB_RATES: { id: string; nameUk: string; nameEn: string; multiplier: number }[] = [
  { id: "basic", nameUk: "Базове відновлення", nameEn: "Basic restoration", multiplier: 1.0 },
  { id: "improved", nameUk: "Покращене відновлення", nameEn: "Improved restoration", multiplier: 1.15 },
  { id: "bbb", nameUk: "Build Back Better", nameEn: "Build Back Better", multiplier: 1.3 },
  { id: "resilient", nameUk: "Стійке відновлення (сейсмо+енерго)", nameEn: "Resilient (seismic+energy)", multiplier: 1.4 },
];

// ── Calculation Functions ───────────────────────────────────────────────────

/** D = Σ(Vi × Si × Ki × Kr) */
export function calculateDamage(components: DamageComponent[]): { total: number; items: { name: string; value: number }[] } {
  const items = components.map((c) => {
    const gradeInfo = EMS98_SCALE.find((g) => g.grade === c.damageGrade);
    const ki = gradeInfo?.ki ?? 0;
    const kr = REGIONAL_COEFFICIENTS[c.region]?.kr ?? 1.0;
    const value = c.replacementValue * c.area * ki * kr;
    return { name: c.name, value: Math.round(value * 100) / 100 };
  });
  const total = items.reduce((sum, i) => sum + i.value, 0);
  return { total: Math.round(total * 100) / 100, items };
}

/** L = Σ(Ri × Ti) + Σ(Dj) */
export function calculateLosses(
  components: LossComponent[],
  additionalLosses: AdditionalLoss[]
): { total: number; lossItems: { name: string; value: number }[]; additionalItems: { name: string; value: number }[] } {
  const lossItems = components.map((c) => ({
    name: c.name,
    value: Math.round(c.monthlyRevenue * c.downtimeMonths * 100) / 100,
  }));
  const additionalItems = additionalLosses.map((a) => ({
    name: a.name,
    value: a.amount,
  }));
  const total = lossItems.reduce((sum, i) => sum + i.value, 0) + additionalItems.reduce((sum, i) => sum + i.value, 0);
  return { total: Math.round(total * 100) / 100, lossItems, additionalItems };
}

/** N = D × Kbb + P + A */
export function calculateNeeds(params: NeedsParams): number {
  return Math.round((params.totalDamage * params.bbbMultiplier + params.priorityInvestments + params.additionalCosts) * 100) / 100;
}

/** Full DaLA calculation */
export function calculateDaLA(
  damageComponents: DamageComponent[],
  lossComponents: LossComponent[],
  additionalLosses: AdditionalLoss[],
  needsParams: Omit<NeedsParams, "totalDamage">
): DaLAResult {
  const damageResult = calculateDamage(damageComponents);
  const lossResult = calculateLosses(lossComponents, additionalLosses);
  const needs = calculateNeeds({ totalDamage: damageResult.total, ...needsParams });

  return {
    damage: damageResult.total,
    losses: lossResult.total,
    needs,
    total: Math.round((damageResult.total + lossResult.total + needs) * 100) / 100,
    components: {
      damageItems: damageResult.items,
      lossItems: lossResult.lossItems,
      additionalLosses: lossResult.additionalItems,
    },
  };
}

// ── Currency conversion (static rates for demo, use NBU API in production) ──

export const CURRENCY_RATES = {
  EUR_USD: 1.08,
  EUR_UAH: 44.5,
  USD_UAH: 41.2,
};

export function convertCurrency(amount: number, from: "EUR" | "USD" | "UAH", to: "EUR" | "USD" | "UAH"): number {
  if (from === to) return amount;
  const key = `${from}_${to}` as keyof typeof CURRENCY_RATES;
  const reverseKey = `${to}_${from}` as keyof typeof CURRENCY_RATES;
  if (CURRENCY_RATES[key]) return Math.round(amount * CURRENCY_RATES[key] * 100) / 100;
  if (CURRENCY_RATES[reverseKey]) return Math.round((amount / CURRENCY_RATES[reverseKey]) * 100) / 100;
  // Two-step conversion via EUR
  const toEur = from === "EUR" ? amount : from === "USD" ? amount / CURRENCY_RATES.EUR_USD : amount / CURRENCY_RATES.EUR_UAH;
  const result = to === "EUR" ? toEur : to === "USD" ? toEur * CURRENCY_RATES.EUR_USD : toEur * CURRENCY_RATES.EUR_UAH;
  return Math.round(result * 100) / 100;
}

export function formatAmount(amount: number, currency: "EUR" | "USD" | "UAH"): string {
  const symbols = { EUR: "€", USD: "$", UAH: "₴" };
  return `${symbols[currency]}${amount.toLocaleString("uk-UA", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}
