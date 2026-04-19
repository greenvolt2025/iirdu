"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowRight,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  TrendingUp,
  Globe2,
  MapPin,
  HardHat,
  Truck,
  Server,
  Umbrella,
  Zap,
  AlertTriangle,
  CloudRain,
  DollarSign,
  Atom,
  Building2,
  Landmark,
  BriefcaseBusiness,
  Users,
  Clock,
} from "lucide-react";
import { SERVICE_CATEGORIES, type ServiceItem } from "@/config/services-catalog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ── Types ──────────────────────────────────────────────────────────────────

type Locale = "uk" | "en";

interface FrameworkCard {
  code: string;
  name: { uk: string; en: string };
  icon: typeof Shield;
  color: string;
  description: { uk: string; en: string };
  services: { uk: string[]; en: string[] };
}

interface ClientSegment {
  name: { uk: string; en: string };
  description: { uk: string; en: string };
  examples: { uk: string; en: string };
  icon: typeof Shield;
  color: string;
}

// ── Content ────────────────────────────────────────────────────────────────

const heroContent = {
  uk: {
    badge: "ISO 31000 \u00b7 COSO \u00b7 NIST \u00b7 FAIR",
    title: "Оцінка ризиків",
    subtitle:
      "Комплексна оцінка ризиків за міжнародними фреймворками ISO 31000, COSO ERM, NIST CSF та FAIR, підсилена можливостями квантових обчислень для безпрецедентної точності аналізу.",
    quantumBadge: "Квантово-підсилений аналіз",
  },
  en: {
    badge: "ISO 31000 \u00b7 COSO \u00b7 NIST \u00b7 FAIR",
    title: "Risk Assessment",
    subtitle:
      "Comprehensive risk assessment using international frameworks ISO 31000, COSO ERM, NIST CSF, and FAIR, enhanced by quantum computing capabilities for unprecedented analytical precision.",
    quantumBadge: "Quantum-Enhanced Analysis",
  },
};

const frameworks: FrameworkCard[] = [
  {
    code: "ISO 31000:2018",
    name: { uk: "Управління ризиками", en: "Risk Management" },
    icon: ShieldCheck,
    color: "from-blue-500 to-blue-600",
    description: {
      uk: "Міжнародний стандарт, що встановлює принципи, фреймворк та процес управління ризиками. Застосовний до всіх типів організацій та будь-яких видів ризиків.",
      en: "International standard establishing principles, framework, and process for risk management. Applicable to all types of organizations and any kind of risk.",
    },
    services: {
      uk: [
        "Інвестиційні ризики",
        "Ризики відновлення",
        "Геополітичні ризики",
        "Ланцюги постачання",
      ],
      en: [
        "Investment risks",
        "Reconstruction risks",
        "Geopolitical risks",
        "Supply chain",
      ],
    },
  },
  {
    code: "COSO ERM 2017",
    name: {
      uk: "Корпоративне управління ризиками",
      en: "Enterprise Risk Management",
    },
    icon: Shield,
    color: "from-amber-500 to-orange-500",
    description: {
      uk: "Фреймворк управління ризиками підприємства, інтегрований зі стратегією та продуктивністю. Включає внутрішній контроль та оцінку ризиків шахрайства.",
      en: "Enterprise risk management framework integrated with strategy and performance. Includes internal controls and fraud risk assessment.",
    },
    services: {
      uk: [
        "Ризик шахрайства",
        "Внутрішній контроль",
        "Стратегічні ризики",
        "Операційні ризики",
      ],
      en: [
        "Fraud risk",
        "Internal controls",
        "Strategic risks",
        "Operational risks",
      ],
    },
  },
  {
    code: "NIST CSF 2.0",
    name: { uk: "Кібербезпека", en: "Cybersecurity Framework" },
    icon: Lock,
    color: "from-red-500 to-rose-600",
    description: {
      uk: "Фреймворк управління ризиками кібербезпеки для критичної інфраструктури. Ідентифікація, захист, виявлення, реагування та відновлення.",
      en: "Cybersecurity risk management framework for critical infrastructure. Identify, protect, detect, respond, and recover.",
    },
    services: {
      uk: [
        "Критична інфраструктура",
        "Захист даних",
        "Реагування на інциденти",
        "Відновлення систем",
      ],
      en: [
        "Critical infrastructure",
        "Data protection",
        "Incident response",
        "System recovery",
      ],
    },
  },
  {
    code: "FAIR",
    name: {
      uk: "Кількісний аналіз ризиків",
      en: "Quantitative Risk Analysis",
    },
    icon: TrendingUp,
    color: "from-emerald-500 to-green-600",
    description: {
      uk: "Factor Analysis of Information Risk -- кількісна модель фінансової оцінки ризиків. Переведення ризиків у конкретні фінансові показники для прийняття рішень.",
      en: "Factor Analysis of Information Risk -- quantitative financial risk assessment model. Translating risks into specific financial metrics for decision-making.",
    },
    services: {
      uk: [
        "Страхові ризики",
        "Фінансові втрати",
        "ROI безпеки",
        "Валютні ризики",
      ],
      en: [
        "Insurance risks",
        "Financial losses",
        "Security ROI",
        "Currency risks",
      ],
    },
  },
];

// ── Catalog data ─────────────────────────────────────────────────────────
const riskCategory = SERVICE_CATEGORIES.find((c) => c.id === "risk-assessment")!;

const SERVICE_ICON_MAP: Record<string, typeof Shield> = {
  "investment-risk": TrendingUp,
  "geopolitical-risk": Globe2,
  "country-risk": MapPin,
  "project-risk": HardHat,
  "supply-chain-risk": Truck,
  "cybersecurity-risk": Server,
  "insurance-risk": Umbrella,
  "energy-risk": Zap,
  "fraud-risk": AlertTriangle,
  "climate-risk": CloudRain,
  "financial-risk": DollarSign,
};

const SERVICE_COLOR_MAP: Record<string, string> = {
  "investment-risk": "from-blue-500 to-blue-600",
  "geopolitical-risk": "from-red-500 to-rose-600",
  "country-risk": "from-amber-500 to-orange-500",
  "project-risk": "from-emerald-500 to-green-600",
  "supply-chain-risk": "from-cyan-500 to-blue-600",
  "cybersecurity-risk": "from-violet-500 to-purple-600",
  "insurance-risk": "from-teal-500 to-emerald-600",
  "energy-risk": "from-yellow-500 to-amber-500",
  "fraud-risk": "from-rose-500 to-red-600",
  "climate-risk": "from-sky-500 to-blue-600",
  "financial-risk": "from-indigo-500 to-violet-600",
};

function formatPrice(svc: ServiceItem): string {
  const fmt = (n: number) => n.toLocaleString("en-US");
  return `${svc.priceRange.currency === "EUR" ? "\u20ac" : "$"}${fmt(svc.priceRange.min)} \u2013 ${svc.priceRange.currency === "EUR" ? "\u20ac" : "$"}${fmt(svc.priceRange.max)}`;
}

function formatTurnaround(svc: ServiceItem, locale: string): string {
  const { min, max } = svc.turnaroundDays;
  const weeks = (d: number) => Math.ceil(d / 7);
  const unit = locale === "uk" ? "тижнів" : "weeks";
  return `${weeks(min)}\u2013${weeks(max)} ${unit}`;
}

function formatClients(svc: ServiceItem, locale: string): string {
  return svc.targetClients.map((c) => (locale === "uk" ? c.uk : c.en)).join(", ");
}

const clientSegments: ClientSegment[] = [
  {
    name: {
      uk: "Іноземні інвестори",
      en: "Foreign Investors",
    },
    description: {
      uk: "Фонди прямих інвестицій, венчурні фонди та інститути фінансування розвитку, що розглядають інвестиції в Україну.",
      en: "Private equity, venture capital funds, and development finance institutions considering investments in Ukraine.",
    },
    examples: { uk: "PE/VC, DFI, IFC, OPIC", en: "PE/VC, DFIs, IFC, OPIC" },
    icon: TrendingUp,
    color: "from-blue-500 to-blue-600",
  },
  {
    name: {
      uk: "Страхові компанії",
      en: "Insurance Companies",
    },
    description: {
      uk: "Міжнародні страховики та перестраховики, що оцінюють воєнні та політичні ризики для андерайтингу.",
      en: "International insurers and reinsurers evaluating war and political risks for underwriting.",
    },
    examples: {
      uk: "Lloyd\u2019s, Munich Re, Swiss Re",
      en: "Lloyd\u2019s, Munich Re, Swiss Re",
    },
    icon: Umbrella,
    color: "from-emerald-500 to-green-600",
  },
  {
    name: {
      uk: "Будівельні компанії",
      en: "Construction Companies",
    },
    description: {
      uk: "Міжнародні та національні будівельні компанії, що беруть участь у проєктах відновлення інфраструктури.",
      en: "International and national construction firms participating in infrastructure reconstruction projects.",
    },
    examples: {
      uk: "STRABAG, VINCI, Bouygues",
      en: "STRABAG, VINCI, Bouygues",
    },
    icon: HardHat,
    color: "from-amber-500 to-orange-500",
  },
  {
    name: {
      uk: "Банки розвитку",
      en: "Development Banks",
    },
    description: {
      uk: "Міжнародні фінансові інституції, що фінансують проєкти відновлення та розвитку України.",
      en: "International financial institutions funding Ukraine reconstruction and development projects.",
    },
    examples: {
      uk: "Світовий банк, ЄБРР, ЄІБ",
      en: "World Bank, EBRD, EIB",
    },
    icon: Landmark,
    color: "from-violet-500 to-purple-600",
  },
  {
    name: {
      uk: "Державні органи",
      en: "Government Agencies",
    },
    description: {
      uk: "Центральні та місцеві органи влади, що потребують оцінки ризиків для державних програм відновлення.",
      en: "Central and local government authorities requiring risk assessments for state reconstruction programs.",
    },
    examples: {
      uk: "Мінінфраструктури, ОВА",
      en: "Ministry of Infrastructure, RMAs",
    },
    icon: Building2,
    color: "from-red-500 to-rose-600",
  },
  {
    name: {
      uk: "Енергетичні компанії",
      en: "Energy Companies",
    },
    description: {
      uk: "Компанії, що працюють у секторі відновлення та модернізації енергетичної інфраструктури України.",
      en: "Companies operating in Ukraine\u2019s energy infrastructure restoration and modernization sector.",
    },
    examples: {
      uk: "Ukrenergo, DTEK, ВДЕ-проєкти",
      en: "Ukrenergo, DTEK, RE projects",
    },
    icon: Zap,
    color: "from-yellow-500 to-amber-500",
  },
];

const processSteps = {
  uk: [
    {
      step: 1,
      title: "Встановлення контексту",
      description:
        "Визначення внутрішнього та зовнішнього контексту, цілей, критеріїв ризику та обсягу оцінки.",
    },
    {
      step: 2,
      title: "Ідентифікація ризиків",
      description:
        "Системний пошук, визнання та опис ризиків: джерела, події, причини та потенційні наслідки.",
    },
    {
      step: 3,
      title: "Аналіз ризиків",
      description:
        "Визначення ймовірності та наслідків кожного ризику, врахування контролів та їх ефективності.",
    },
    {
      step: 4,
      title: "Оцінювання ризиків",
      description:
        "Порівняння результатів аналізу з критеріями ризику для пріоритезації та прийняття рішень.",
    },
    {
      step: 5,
      title: "Обробка ризиків",
      description:
        "Розробка стратегій: уникнення, зменшення, передача або прийняття ризику з планом впровадження.",
    },
  ],
  en: [
    {
      step: 1,
      title: "Establish Context",
      description:
        "Define internal and external context, objectives, risk criteria, and scope of assessment.",
    },
    {
      step: 2,
      title: "Risk Identification",
      description:
        "Systematic finding, recognition, and description of risks: sources, events, causes, and potential consequences.",
    },
    {
      step: 3,
      title: "Risk Analysis",
      description:
        "Determine likelihood and consequences of each risk, considering controls and their effectiveness.",
    },
    {
      step: 4,
      title: "Risk Evaluation",
      description:
        "Compare analysis results with risk criteria for prioritization and decision-making.",
    },
    {
      step: 5,
      title: "Risk Treatment",
      description:
        "Develop strategies: avoid, reduce, transfer, or accept risk with an implementation plan.",
    },
  ],
};

const quantumContent = {
  uk: {
    badge: "Квантові обчислення",
    title: "Квантово-підсилена оцінка ризиків",
    subtitle:
      "Ми використовуємо найсучасніші квантові комп\u2019ютери для безпрецедентної точності та швидкості аналізу ризиків.",
    features: [
      {
        title: "Монте-Карло: мільйони сценаріїв",
        description:
          "Квантові алгоритми дозволяють моделювати мільйони сценаріїв одночасно, забезпечуючи квадратичне прискорення порівняно з класичними методами.",
      },
      {
        title: "Оптимізація портфелів ризиків",
        description:
          "QAOA та VQE алгоритми знаходять оптимальний баланс ризик/дохідність для складних портфелів з тисячами змінних.",
      },
      {
        title: "Перерахунок ризиків у реальному часі",
        description:
          "Миттєва переоцінка ризиків при зміні ринкових умов, геополітичної ситуації або нормативного середовища.",
      },
    ],
  },
  en: {
    badge: "Quantum Computing",
    title: "Quantum-Enhanced Risk Assessment",
    subtitle:
      "We leverage state-of-the-art quantum computers for unprecedented precision and speed in risk analysis.",
    features: [
      {
        title: "Monte Carlo: Millions of Scenarios",
        description:
          "Quantum algorithms model millions of scenarios simultaneously, providing quadratic speedup over classical methods.",
      },
      {
        title: "Risk Portfolio Optimization",
        description:
          "QAOA and VQE algorithms find optimal risk/return balance for complex portfolios with thousands of variables.",
      },
      {
        title: "Real-Time Risk Recalculation",
        description:
          "Instant risk re-evaluation upon changes in market conditions, geopolitical situation, or regulatory environment.",
      },
    ],
  },
};

const ctaContent = {
  uk: {
    title: "Замовити оцінку ризиків",
    description:
      "Наші фахівці підготують комплексну оцінку ризиків за міжнародними стандартами. Залиште заявку для безкоштовної консультації.",
    cta: "Замовити оцінку",
    ctaSecondary: "Контакти",
  },
  en: {
    title: "Order Risk Assessment",
    description:
      "Our experts will prepare a comprehensive risk assessment per international standards. Submit a request for a free consultation.",
    cta: "Order Assessment",
    ctaSecondary: "Contact Us",
  },
};

// ── Component ──────────────────────────────────────────────────────────────

export default function RiskAssessmentPage() {
  const params = useParams();
  const locale: Locale = (params.locale as string) === "en" ? "en" : "uk";

  const hero = heroContent[locale];
  const quantum = quantumContent[locale];
  const steps = processSteps[locale];
  const cta = ctaContent[locale];

  return (
    <>
      {/* ── 1. Hero (navy gradient) ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-radial-gold">
        <div className="absolute inset-0 bg-grid-gold bg-grid-64 opacity-40" />
        <div className="absolute top-20 right-[15%] w-72 h-72 bg-gold-500/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 left-[10%] w-96 h-96 bg-navy-600/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/10 border border-gold-500/30 rounded-full mb-6">
              <ShieldAlert className="h-4 w-4 text-gold-400" />
              <span className="text-sm font-medium text-gold-400">
                {hero.badge}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.1] mb-6">
              {hero.title}
            </h1>

            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8">
              {hero.subtitle}
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full">
              <Atom className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">
                {hero.quantumBadge}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ── 2. Frameworks Section (white, 4 cards) ──────────────────── */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-50 border border-gold-200 rounded-full text-xs font-medium text-gold-700 mb-4">
              {locale === "uk" ? "Фреймворки" : "Frameworks"}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-900 mb-4">
              {locale === "uk"
                ? "Міжнародні фреймворки"
                : "International Frameworks"}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto mb-6 rounded-full" />
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              {locale === "uk"
                ? "Ми застосовуємо провідні міжнародні стандарти для комплексної оцінки всіх типів ризиків."
                : "We apply leading international standards for comprehensive assessment of all risk types."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {frameworks.map((fw) => {
              const Icon = fw.icon;
              return (
                <div
                  key={fw.code}
                  className="group relative bg-white rounded-xl border border-slate-200 p-8
                    transition-all duration-500 ease-out
                    hover:shadow-2xl hover:shadow-navy-900/10
                    hover:-translate-y-1 hover:border-gold-500/50 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-navy-900/0 to-gold-500/0 group-hover:from-navy-900/[0.02] group-hover:to-gold-500/[0.04] transition-all duration-500 rounded-xl" />
                  <div className="relative">
                    <div className="flex items-start gap-5 mb-5">
                      <div
                        className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${fw.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-gold-600 bg-gold-50 px-2.5 py-1 rounded-md">
                          {fw.code}
                        </span>
                        <h3 className="font-serif font-bold text-lg text-navy-900 mt-2">
                          {fw.name[locale]}
                        </h3>
                      </div>
                    </div>

                    <p className="text-slate-500 text-sm leading-relaxed mb-5">
                      {fw.description[locale]}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {fw.services[locale].map((svc) => (
                        <span
                          key={svc}
                          className="text-xs px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md border border-slate-200"
                        >
                          {svc}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="accent-line" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. Services Grid (12 cards) ─────────────────────────────── */}
      <section className="section-padding bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-gold bg-dot-32 opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-50 border border-gold-200 rounded-full text-xs font-medium text-gold-700 mb-4">
              {locale === "uk" ? `${riskCategory.services.length} послуг` : `${riskCategory.services.length} Services`}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-900 mb-4">
              {locale === "uk" ? "Послуги оцінки ризиків" : "Risk Assessment Services"}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto mb-6 rounded-full" />
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              {locale === "uk"
                ? "Повний спектр послуг з оцінки ризиків для проєктів відновлення та міжнародного бізнесу."
                : "Full spectrum of risk assessment services for reconstruction projects and international business."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {riskCategory.services.map((svc) => {
              const Icon = SERVICE_ICON_MAP[svc.id] || Shield;
              const color = SERVICE_COLOR_MAP[svc.id] || "from-slate-500 to-slate-600";
              return (
                <Card
                  key={svc.id}
                  className="group border-slate-200 hover:shadow-2xl hover:shadow-navy-900/10 hover:-translate-y-1 hover:border-gold-500/50 transition-all duration-500 overflow-hidden"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-10 h-10 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-500`}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex items-center gap-2">
                        {svc.quantumEnhanced && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-50 border border-purple-200 rounded-full text-[10px] font-semibold text-purple-700 uppercase tracking-wider">
                            <Atom className="h-3 w-3" />
                            Quantum
                          </span>
                        )}
                      </div>
                    </div>
                    <CardTitle className="font-serif text-navy-900 text-base leading-tight">
                      {locale === "uk" ? svc.nameUk : svc.nameEn}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">
                      {locale === "uk" ? svc.descriptionUk : svc.descriptionEn}
                    </p>

                    {/* Methodology badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {svc.methodology.map((m) => (
                        <span
                          key={m}
                          className="text-[10px] font-semibold px-2 py-0.5 bg-gold-50 text-gold-700 border border-gold-200 rounded-md"
                        >
                          {m}
                        </span>
                      ))}
                    </div>

                    {/* Meta info */}
                    <div className="space-y-2 mb-5">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <DollarSign className="h-3.5 w-3.5 text-gold-500 flex-shrink-0" />
                        <span className="font-semibold text-navy-900">
                          {formatPrice(svc)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Clock className="h-3.5 w-3.5 text-gold-500 flex-shrink-0" />
                        <span>{formatTurnaround(svc, locale)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Users className="h-3.5 w-3.5 text-gold-500 flex-shrink-0" />
                        <span>{formatClients(svc, locale)}</span>
                      </div>
                    </div>

                    {/* Order button */}
                    <Link href={`/${locale}/orders/new`}>
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-bold shadow-gold-glow transition-all duration-300 hover:scale-[1.02]"
                      >
                        {locale === "uk" ? "Замовити" : "Order"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. Quantum Section (dark navy) ──────────────────────────── */}
      <section className="section-padding bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-gold bg-grid-64 opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-xs font-medium text-purple-300 mb-4">
                <Atom className="h-3.5 w-3.5" />
                {quantum.badge}
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
                {quantum.title}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-purple-600 mb-6 rounded-full" />
              <p className="text-lg text-white/60 leading-relaxed mb-10">
                {quantum.subtitle}
              </p>

              <div className="space-y-6">
                {quantum.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center mt-0.5">
                      <span className="text-purple-300 font-bold text-sm">
                        {i + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-white mb-1">
                        {feat.title}
                      </h3>
                      <p className="text-white/50 text-sm leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Abstract quantum visual (CSS-only) */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border border-purple-500/20 animate-spin" style={{ animationDuration: "20s" }} />
                {/* Middle ring */}
                <div className="absolute inset-8 rounded-full border border-purple-400/30 animate-spin" style={{ animationDuration: "15s", animationDirection: "reverse" }} />
                {/* Inner ring */}
                <div className="absolute inset-16 rounded-full border border-gold-500/30 animate-spin" style={{ animationDuration: "10s" }} />

                {/* Core glow */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-500/20 to-gold-500/20 rounded-full blur-2xl" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-400/40 to-gold-400/40 rounded-full blur-xl" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Atom className="h-12 w-12 text-purple-300/80" />
                </div>

                {/* Orbital dots */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50" />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2 h-2 bg-gold-400 rounded-full shadow-lg shadow-gold-400/50" />
                <div className="absolute top-1/2 left-4 -translate-y-1/2 w-2 h-2 bg-purple-300 rounded-full shadow-lg shadow-purple-300/50" />
                <div className="absolute top-1/2 right-4 -translate-y-1/2 w-2.5 h-2.5 bg-gold-500 rounded-full shadow-lg shadow-gold-500/50" />

                {/* Grid lines (decorative) */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500/20 to-transparent" />
                  <div className="absolute top-0 left-0 right-0 bottom-0 rotate-45">
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/10 to-transparent" />
                  </div>
                  <div className="absolute top-0 left-0 right-0 bottom-0 -rotate-45">
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/10 to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Target Clients Section (light bg) ────────────────────── */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-50 border border-gold-200 rounded-full text-xs font-medium text-gold-700 mb-4">
              {locale === "uk" ? "Клієнти" : "Clients"}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-900 mb-4">
              {locale === "uk" ? "Для кого ми працюємо" : "Who We Serve"}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto mb-6 rounded-full" />
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              {locale === "uk"
                ? "Наші послуги призначені для ключових учасників процесу відновлення та міжнародного бізнесу."
                : "Our services are designed for key stakeholders in the reconstruction process and international business."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clientSegments.map((seg) => {
              const Icon = seg.icon;
              return (
                <Card
                  key={seg.name.en}
                  className="group border-slate-200 hover:shadow-2xl hover:shadow-navy-900/10 hover:-translate-y-1 hover:border-gold-500/50 transition-all duration-500 overflow-hidden"
                >
                  <CardHeader className="pb-3">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${seg.color} rounded-xl flex items-center justify-center shadow-lg mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="font-serif text-navy-900 text-lg">
                      {seg.name[locale]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-500 text-sm leading-relaxed mb-3">
                      {seg.description[locale]}
                    </p>
                    <div className="flex items-center gap-2">
                      <BriefcaseBusiness className="h-3.5 w-3.5 text-gold-500 flex-shrink-0" />
                      <span className="text-xs text-slate-400 font-medium">
                        {seg.examples[locale]}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. Risk Assessment Process (steps) ──────────────────────── */}
      <section className="section-padding bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-gold bg-dot-32 opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-50 border border-gold-200 rounded-full text-xs font-medium text-gold-700 mb-4">
              {locale === "uk" ? "Процес" : "Process"}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-900 mb-4">
              {locale === "uk"
                ? "Процес оцінки ризиків"
                : "Risk Assessment Process"}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto mb-6 rounded-full" />
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              {locale === "uk"
                ? "П\u2019ять етапів відповідно до ISO 31000:2018 для системної та відтворюваної оцінки ризиків."
                : "Five stages per ISO 31000:2018 for systematic and reproducible risk assessment."}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical connector line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold-500 via-gold-500 to-gold-200 hidden md:block" />

              <div className="space-y-8">
                {steps.map((st, i) => (
                  <div key={st.step} className="relative flex items-start gap-6">
                    {/* Step number */}
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-600 rounded-full flex items-center justify-center shadow-lg z-10 relative">
                      <span className="text-white font-bold text-sm">
                        {st.step}
                      </span>
                    </div>

                    {/* Content */}
                    <div
                      className="flex-1 bg-white rounded-xl border border-slate-200 p-6
                        hover:shadow-xl hover:shadow-navy-900/5 hover:border-gold-500/30
                        transition-all duration-500"
                    >
                      <h3 className="font-serif font-bold text-lg text-navy-900 mb-2">
                        {st.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {st.description}
                      </p>
                    </div>

                    {/* Connector arrow (between steps) */}
                    {i < steps.length - 1 && (
                      <div className="absolute left-[23px] -bottom-5 md:hidden">
                        <ArrowRight className="h-4 w-4 text-gold-400 rotate-90" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. CTA ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 relative">
          <div className="absolute inset-0 bg-grid-gold bg-grid-64 opacity-20" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-6">
                {cta.title}
              </h2>
              <p className="text-lg text-slate-300 mb-10 max-w-xl mx-auto">
                {cta.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/${locale}/orders/new`}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-bold text-base px-10 h-14 shadow-gold-glow transition-all duration-300 hover:scale-105"
                  >
                    {cta.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href={`/${locale}/contacts`}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 text-base px-10 h-14"
                  >
                    {cta.ctaSecondary}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
