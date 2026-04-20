import type { ClientType } from "@/types";

export interface ClientSegment {
  id: ClientType;
  nameUk: string;
  nameEn: string;
  descriptionUk: string;
  descriptionEn: string;
  icon: "User" | "Building2" | "Globe";
  color: string;
  availableReportTypes: string[];
  additionalDocsUk: { label: string; required: boolean }[];
  additionalDocsEn: { label: string; required: boolean }[];
}

export const CLIENT_SEGMENTS: ClientSegment[] = [
  {
    id: "individual",
    nameUk: "Фізична особа",
    nameEn: "Individual",
    descriptionUk:
      "Власники житлової нерухомості, постраждалі від руйнувань. Висновки для RD4U категорій A1 та A3.",
    descriptionEn:
      "Residential property owners affected by damage. Reports for RD4U categories A1 and A3.",
    icon: "User",
    color: "from-blue-500 to-blue-600",
    availableReportTypes: [
      "damage_assessment",
      "legal_support",
      "consulting",
    ],
    additionalDocsUk: [],
    additionalDocsEn: [],
  },
  {
    id: "legal_entity",
    nameUk: "Юридична особа",
    nameEn: "Legal Entity",
    descriptionUk:
      "Підприємства, компанії, організації. Повний спектр: збитки, ризики, економічний аналіз, правова підтримка.",
    descriptionEn:
      "Businesses, companies, organizations. Full range: damage, risk, economic analysis, legal support.",
    icon: "Building2",
    color: "from-gold-500 to-gold-600",
    availableReportTypes: [
      "damage_assessment",
      "risk_assessment",
      "economic_analysis",
      "legal_support",
      "due_diligence",
      "consulting",
    ],
    additionalDocsUk: [
      { label: "Витяг з ЄДР (Єдиного державного реєстру)", required: true },
      { label: "Баланс підприємства (останній рік)", required: true },
      { label: "Документи страхування (якщо є)", required: false },
    ],
    additionalDocsEn: [
      { label: "Extract from Unified State Register", required: true },
      { label: "Company balance sheet (last year)", required: true },
      { label: "Insurance documents (if available)", required: false },
    ],
  },
  {
    id: "international_partner",
    nameUk: "Міжнародний партнер",
    nameEn: "International Partner",
    descriptionUk:
      "Міжнародні організації, DFI, донори, інвестори. EU compliance, due diligence, оцінка ризиків.",
    descriptionEn:
      "International organizations, DFIs, donors, investors. EU compliance, due diligence, risk assessment.",
    icon: "Globe",
    color: "from-emerald-500 to-emerald-600",
    availableReportTypes: [
      "due_diligence",
      "risk_assessment",
      "economic_analysis",
      "consulting",
    ],
    additionalDocsUk: [
      { label: "Проєктна документація / Terms of Reference", required: true },
      { label: "Вимоги відповідності (compliance requirements)", required: false },
      { label: "Попередні звіти / Due Diligence (якщо є)", required: false },
    ],
    additionalDocsEn: [
      { label: "Project documentation / Terms of Reference", required: true },
      { label: "Compliance requirements", required: false },
      { label: "Previous reports / Due Diligence (if available)", required: false },
    ],
  },
];

export function getSegment(clientType: ClientType): ClientSegment {
  return CLIENT_SEGMENTS.find((s) => s.id === clientType) || CLIENT_SEGMENTS[0];
}
