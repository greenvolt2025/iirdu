"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  Scale,
  Shield,
  FileText,
  Building2,
  Landmark,
  Target,
  Layers,
  BarChart3,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ── Content maps keyed by locale ────────────────────────────────────────────

const heroContent = {
  uk: {
    badge: "ЄДРПОУ 45681824",
    title: "Про інститут",
    description:
      "Міжнародний інститут відновлення та розвитку України (МІВРУ) — приватна наукова установа, що діє відповідно до Закону України No 848-VIII «Про наукову і науково-технічну діяльність». Інститут спеціалізується на підготовці комплексних звітів з оцінки збитків за методикою RDNA Світового банку, Due Diligence для європейських партнерів та оцінці ризиків за міжнародними стандартами.",
  },
  en: {
    badge: "EDRPOU 45681824",
    title: "About the Institute",
    description:
      "The International Institute for Reconstruction and Development of Ukraine (IIRDU) is a private scientific research institution operating under Ukrainian Law No. 848-VIII \"On Scientific and Scientific-Technical Activity.\" The Institute specializes in comprehensive damage assessment reports using World Bank RDNA methodology, Due Diligence for European partners, and risk assessment per international standards.",
  },
};

const missionContent = {
  uk: {
    badge: "Наша місія",
    title: "Місія та напрямки діяльності",
    points: [
      {
        icon: FileText,
        title: "Оцінка збитків (RDNA)",
        text: "Підготовка комплексних звітів з оцінки збитків за методологією RDNA (DaLA) Світового банку для подання до Реєстру збитків для України (RD4U) та Міжнародної комісії з розгляду претензій (ICC).",
      },
      {
        icon: Shield,
        title: "Оцінка ризиків",
        text: "Аналіз та управління ризиками відповідно до ISO 31000:2018, COSO ERM, NIST RMF та FAIR для підприємств, що працюють на ринках України, ЄС та США.",
      },
      {
        icon: Building2,
        title: "Due Diligence та відповідність",
        text: "Перевірка відповідності CSRD/ESG, DORA/NIS2, CSDDD для європейських інвесторів та компаній, що беруть участь у відновленні України.",
      },
      {
        icon: Scale,
        title: "Правова підтримка",
        text: "Підготовка доказової бази та документів для подання до RD4U, ICC та національних судів. Супровід процесу отримання компенсацій.",
      },
      {
        icon: Landmark,
        title: "Прозорість та запобігання корупції",
        text: "Оцінка ризиків шахрайства та корупції у програмах відновлення за методологією COSO. Виявлення червоних прапорів, Due Diligence для донорів (GIZ, EBRD, EIB), внутрішній контроль відповідності антикорупційним стандартам.",
      },
    ],
  },
  en: {
    badge: "Our Mission",
    title: "Mission & Areas of Activity",
    points: [
      {
        icon: FileText,
        title: "Damage Assessment (RDNA)",
        text: "Preparing comprehensive damage assessment reports using World Bank RDNA (DaLA) methodology for submissions to the Register of Damage for Ukraine (RD4U) and the International Claims Commission (ICC).",
      },
      {
        icon: Shield,
        title: "Risk Assessment",
        text: "Risk analysis and management per ISO 31000:2018, COSO ERM, NIST RMF, and FAIR frameworks for businesses operating in Ukraine, EU, and US markets.",
      },
      {
        icon: Building2,
        title: "Due Diligence & Compliance",
        text: "CSRD/ESG, DORA/NIS2, CSDDD compliance verification for European investors and companies participating in Ukraine's reconstruction.",
      },
      {
        icon: Scale,
        title: "Legal Support",
        text: "Evidence base preparation and documentation for RD4U, ICC, and national court submissions. Compensation claim process support.",
      },
      {
        icon: Landmark,
        title: "Transparency & Anti-Corruption",
        text: "Fraud and corruption risk assessment in reconstruction programs using COSO methodology. Red flag identification, Due Diligence for donors (GIZ, EBRD, EIB), internal control compliance with anti-corruption standards.",
      },
    ],
  },
};

const methodologyContent = {
  uk: {
    badge: "Методологія",
    title: "Методологія RDNA / DaLA",
    intro:
      "Ми працюємо за методологією Rapid Damage and Needs Assessment (RDNA), розробленою Світовим банком. В основі RDNA лежить фреймворк DaLA (Damage and Loss Assessment) — стандартизований підхід до оцінки наслідків конфліктів та катастроф.",
    components: [
      {
        title: "Збитки (Damage)",
        text: "Вартість заміщення або відновлення пошкоджених/зруйнованих активів за довоєнними цінами. Включає житло, інфраструктуру, обладнання, транспорт.",
        icon: Layers,
        accent: "from-red-500 to-rose-600",
      },
      {
        title: "Втрати (Losses)",
        text: "Порушені економічні потоки: упущений прибуток, зниження доходів, додаткові витрати, переривання бізнес-процесів за весь період відновлення.",
        icon: BarChart3,
        accent: "from-amber-500 to-orange-500",
      },
      {
        title: "Потреби (Needs)",
        text: 'Збитки + втрати + надбавка "build back better" (відновлення з покращенням). Враховує сучасні стандарти, енергоефективність, сейсмостійкість.',
        icon: Target,
        accent: "from-emerald-500 to-green-600",
      },
    ],
    sectors:
      "Методологія охоплює 20+ секторів: житло, транспорт, енергетика, сільське господарство, промисловість, освіта, охорона здоров'я, водопостачання, зв'язок та інші.",
    reportStructure: "Структура звіту",
    reportSteps: [
      "Документи власності та правовстановлюючі документи",
      "Документування пошкоджень (фото, відео, акти обстеження)",
      "Розрахунок вартості відновлення та упущеної вигоди",
      "Висновки та рекомендації з доказовою базою",
    ],
    individual:
      "Ми адаптуємо макро-методологію RDNA для індивідуальних претензій, забезпечуючи повну відповідність вимогам RD4U та ICC для кожного конкретного випадку.",
  },
  en: {
    badge: "Methodology",
    title: "RDNA / DaLA Methodology",
    intro:
      "We apply the Rapid Damage and Needs Assessment (RDNA) methodology developed by the World Bank. RDNA is built on the DaLA (Damage and Loss Assessment) framework — a standardized approach to evaluating the consequences of conflicts and disasters.",
    components: [
      {
        title: "Damage",
        text: "Replacement or restoration cost of damaged/destroyed assets at pre-war prices. Includes housing, infrastructure, equipment, and transport.",
        icon: Layers,
        accent: "from-red-500 to-rose-600",
      },
      {
        title: "Losses",
        text: "Disrupted economic flows: lost profits, revenue decline, additional costs, and business process interruption throughout the recovery period.",
        icon: BarChart3,
        accent: "from-amber-500 to-orange-500",
      },
      {
        title: "Needs",
        text: 'Damage + losses + "build back better" surcharge. Accounts for modern standards, energy efficiency, and seismic resilience.',
        icon: Target,
        accent: "from-emerald-500 to-green-600",
      },
    ],
    sectors:
      "The methodology covers 20+ sectors: housing, transport, energy, agriculture, industry, education, healthcare, water supply, telecommunications, and more.",
    reportStructure: "Report Structure",
    reportSteps: [
      "Ownership and title documents",
      "Damage documentation (photos, videos, inspection reports)",
      "Restoration cost and lost profits calculation",
      "Conclusions and recommendations with evidence base",
    ],
    individual:
      "We adapt the macro-level RDNA methodology for individual claims, ensuring full compliance with RD4U and ICC requirements for each specific case.",
  },
};

const standardsContent = {
  uk: {
    badge: "Стандарти",
    title: "Міжнародні стандарти",
    subtitle:
      "Кожен звіт відповідає вимогам національних та міжнародних стандартів, що забезпечує їх прийнятність у RD4U, ICC та міжнародних судах.",
    standards: [
      {
        code: "RDNA / DaLA",
        name: "Rapid Damage and Needs Assessment",
        org: "Світовий банк",
        desc: "Основна методологія оцінки збитків, втрат та потреб відновлення",
      },
      {
        code: "ISO 31000:2018",
        name: "Risk Management",
        org: "ISO",
        desc: "Міжнародний стандарт управління ризиками: принципи, фреймворк, процес",
      },
      {
        code: "ДСТУ 3008:2015",
        name: "Звіти у сфері науки і техніки",
        org: "УкрНДНЦ",
        desc: "Національний стандарт оформлення науково-технічних звітів",
      },
      {
        code: "IVS",
        name: "International Valuation Standards",
        org: "IVSC",
        desc: "Міжнародні стандарти оцінки вартості активів та майна",
      },
      {
        code: "COSO ERM",
        name: "Enterprise Risk Management",
        org: "COSO",
        desc: "Фреймворк управління ризиками підприємства, інтегрований зі стратегією",
      },
      {
        code: "NIST RMF / FAIR",
        name: "Risk Management Framework",
        org: "NIST / The Open Group",
        desc: "Кількісна та якісна оцінка ризиків для кібербезпеки та бізнес-процесів",
      },
    ],
  },
  en: {
    badge: "Standards",
    title: "International Standards",
    subtitle:
      "Every report complies with national and international standards, ensuring admissibility at RD4U, ICC, and international courts.",
    standards: [
      {
        code: "RDNA / DaLA",
        name: "Rapid Damage and Needs Assessment",
        org: "World Bank",
        desc: "Primary methodology for assessing damage, losses, and recovery needs",
      },
      {
        code: "ISO 31000:2018",
        name: "Risk Management",
        org: "ISO",
        desc: "International risk management standard: principles, framework, process",
      },
      {
        code: "DSTU 3008:2015",
        name: "Scientific-Technical Reports",
        org: "UkrNDNC",
        desc: "National standard for scientific-technical report formatting",
      },
      {
        code: "IVS",
        name: "International Valuation Standards",
        org: "IVSC",
        desc: "International standards for asset and property valuation",
      },
      {
        code: "COSO ERM",
        name: "Enterprise Risk Management",
        org: "COSO",
        desc: "Enterprise risk management framework integrated with strategy",
      },
      {
        code: "NIST RMF / FAIR",
        name: "Risk Management Framework",
        org: "NIST / The Open Group",
        desc: "Quantitative and qualitative risk assessment for cybersecurity and business",
      },
    ],
  },
};

const teamContent = {
  uk: {
    badge: "Команда",
    title: "Наші фахівці",
    subtitle:
      "Команда кваліфікованих науковців та експертів з багаторічним досвідом у науково-технічних дослідженнях та оцінці збитків.",
    members: [
      {
        name: "Олександр К.",
        role: "Керівник центру",
        title: "Кандидат технічних наук",
        specialization:
          "Оцінка збитків за методологією RDNA, координація науково-дослідних проєктів",
      },
      {
        name: "Наталія М.",
        role: "Старший науковий співробітник",
        title: "Кандидат економічних наук",
        specialization:
          "Економічний аналіз, DaLA-розрахунки, оцінка упущеної вигоди",
      },
      {
        name: "Віктор П.",
        role: "Керівник відділу технічних досліджень",
        title: "Інженер-будівельник, сертифікований оцінювач",
        specialization:
          "Технічне обстеження будівель, розрахунок вартості відновлення",
      },
      {
        name: "Ірина Л.",
        role: "Провідний фахівець з оцінки ризиків",
        title: "MBA, сертифікація ISO 31000",
        specialization:
          "Ризик-менеджмент, COSO ERM, FAIR, підготовка звітів для ЄС та США",
      },
    ],
  },
  en: {
    badge: "Team",
    title: "Our Experts",
    subtitle:
      "A team of qualified researchers and experts with extensive experience in scientific-technical research and damage assessment.",
    members: [
      {
        name: "Oleksandr K.",
        role: "Center Director",
        title: "Ph.D. in Technical Sciences",
        specialization:
          "RDNA damage assessment, research project coordination",
      },
      {
        name: "Nataliia M.",
        role: "Senior Research Fellow",
        title: "Ph.D. in Economics",
        specialization:
          "Economic analysis, DaLA calculations, lost profits assessment",
      },
      {
        name: "Viktor P.",
        role: "Head of Technical Research Division",
        title: "Civil Engineer, Certified Appraiser",
        specialization:
          "Building inspection, restoration cost calculation",
      },
      {
        name: "Iryna L.",
        role: "Lead Risk Assessment Specialist",
        title: "MBA, ISO 31000 Certified",
        specialization:
          "Risk management, COSO ERM, FAIR, EU/US market reports",
      },
    ],
  },
};

const transparencyContent = {
  uk: {
    badge: "Прозорість та антикорупція",
    title: "Протидія корупції у відновленні",
    subtitle:
      "Інститут надає незалежні науково-правові висновки для забезпечення прозорості та запобігання корупції у проєктах відновлення України — в тому числі за напрямками, що підтримуються міжнародними проєктами (GIZ, USAID, EU Anti-Corruption Initiative).",
    points: [
      {
        title: "Незалежна оцінка збитків",
        text: "Верифікація заявлених збитків за методикою RDNA для запобігання завищенню або фіктивним претензіям до RD4U та ICC",
      },
      {
        title: "Аналіз корупційних ризиків",
        text: "Застосування ISO 31000, COSO ERM, FAIR для виявлення схем розкрадання у тендерах, закупівлях, держзамовленнях",
      },
      {
        title: "Підтримка прозорості",
        text: "Методологічна експертиза для платформ електронних закупівель, реєстрів, баз даних про використання коштів на відновлення",
      },
    ],
  },
  en: {
    badge: "Transparency & Anti-Corruption",
    title: "Combating Corruption in Reconstruction",
    subtitle:
      "The Institute provides independent scientific-legal conclusions to ensure transparency and prevent corruption in Ukraine's reconstruction projects — including areas supported by international initiatives (GIZ, USAID, EU Anti-Corruption Initiative).",
    points: [
      {
        title: "Independent Damage Verification",
        text: "Verification of claimed damages using RDNA methodology to prevent inflated or fraudulent claims to RD4U and ICC",
      },
      {
        title: "Corruption Risk Analysis",
        text: "Application of ISO 31000, COSO ERM, FAIR to detect embezzlement schemes in tenders, procurement, state contracts",
      },
      {
        title: "Transparency Support",
        text: "Methodological expertise for electronic procurement platforms, registries, databases on reconstruction fund allocation",
      },
    ],
  },
};

const ctaContent = {
  uk: {
    title: "Потрібен звіт з оцінки збитків?",
    description:
      "Залиште заявку — наш фахівець зв'яжеться з вами протягом робочого дня для безкоштовної консультації та обговорення деталей.",
    cta: "Замовити дослідження",
  },
  en: {
    title: "Need a damage assessment report?",
    description:
      "Submit your request — our specialist will contact you within one business day for a free consultation and to discuss details.",
    cta: "Order Research",
  },
};

// ── Component ───────────────────────────────────────────────────────────────

export default function AboutPage() {
  const params = useParams();
  const locale = (params.locale as string) === "en" ? "en" : "uk";

  const hero = heroContent[locale];
  const mission = missionContent[locale];
  const methodology = methodologyContent[locale];
  const standards = standardsContent[locale];
  const team = teamContent[locale];
  const transparency = transparencyContent[locale];
  const cta = ctaContent[locale];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-radial-gold">
        <div className="absolute inset-0 bg-grid-gold bg-grid-64 opacity-40" />
        <div className="absolute top-20 right-[15%] w-72 h-72 bg-gold-500/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 left-[10%] w-96 h-96 bg-navy-600/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/10 border border-gold-500/30 rounded-full mb-8">
              <Landmark className="h-4 w-4 text-gold-400" />
              <span className="text-sm font-medium text-gold-400">
                {hero.badge}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.1] mb-6">
              {hero.title}
            </h1>

            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
              {hero.description}
            </p>
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

      {/* ── Mission ──────────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-50 border border-gold-200 rounded-full text-xs font-medium text-gold-700 mb-4">
              {mission.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-900 mb-4">
              {mission.title}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {mission.points.map((point) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.title}
                  className="group relative bg-white rounded-xl border border-slate-200 p-8
                    transition-all duration-500 ease-out
                    hover:shadow-2xl hover:shadow-navy-900/10
                    hover:-translate-y-1 hover:border-gold-500/50 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-navy-900/0 to-gold-500/0 group-hover:from-navy-900/[0.02] group-hover:to-gold-500/[0.04] transition-all duration-500 rounded-xl" />
                  <div className="relative flex gap-5">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-lg text-navy-900 mb-2">
                        {point.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {point.text}
                      </p>
                    </div>
                  </div>
                  <div className="accent-line" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Methodology ──────────────────────────────────────────────── */}
      <section className="section-padding bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-gold bg-grid-64 opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-500/30 rounded-full text-xs font-medium text-gold-400 mb-4">
              {methodology.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
              {methodology.title}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto mb-6 rounded-full" />
            <p className="text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
              {methodology.intro}
            </p>
          </div>

          {/* DaLA components */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {methodology.components.map((comp) => {
              const Icon = comp.icon;
              return (
                <div
                  key={comp.title}
                  className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8
                    hover:bg-white/[0.08] hover:border-gold-500/30 transition-all duration-500"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${comp.accent} rounded-xl flex items-center justify-center shadow-lg mb-5`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-serif font-bold text-xl text-white mb-3">
                    {comp.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {comp.text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Sectors */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 mb-12">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gold-500/10 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-gold-400" />
              </div>
              <p className="text-white/70 leading-relaxed">
                {methodology.sectors}
              </p>
            </div>
          </div>

          {/* Report structure */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
              <h3 className="font-serif font-bold text-xl text-white mb-6">
                {methodology.reportStructure}
              </h3>
              <div className="space-y-4">
                {methodology.reportSteps.map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gold-500/20 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-gold-400 font-bold text-sm">
                        {i + 1}
                      </span>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed pt-1">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 flex items-center">
              <div>
                <div className="w-10 h-10 bg-gold-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-5 w-5 text-gold-400" />
                </div>
                <h3 className="font-serif font-bold text-lg text-white mb-3">
                  {locale === "uk"
                    ? "Індивідуальний підхід"
                    : "Individual Approach"}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {methodology.individual}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Standards ────────────────────────────────────────────────── */}
      <section className="section-padding bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-gold bg-dot-32 opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-50 border border-gold-200 rounded-full text-xs font-medium text-gold-700 mb-4">
              {standards.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-900 mb-4">
              {standards.title}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto mb-6 rounded-full" />
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              {standards.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {standards.standards.map((std) => (
              <Card
                key={std.code}
                className="group border-slate-200 hover:shadow-2xl hover:shadow-navy-900/10 hover:-translate-y-1 hover:border-gold-500/50 transition-all duration-500"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gold-600 bg-gold-50 px-2.5 py-1 rounded-md">
                      {std.code}
                    </span>
                    <span className="text-xs text-slate-400">{std.org}</span>
                  </div>
                  <CardTitle className="font-serif text-navy-900 text-base">
                    {std.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {std.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-50 border border-gold-200 rounded-full text-xs font-medium text-gold-700 mb-4">
              {team.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-900 mb-4">
              {team.title}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto mb-6 rounded-full" />
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              {team.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.members.map((member) => (
              <Card
                key={member.name}
                className="group border-slate-200 hover:shadow-2xl hover:shadow-navy-900/10 hover:-translate-y-1 hover:border-gold-500/50 transition-all duration-500 overflow-hidden"
              >
                <CardHeader className="pb-3">
                  {/* Avatar placeholder */}
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <GraduationCap className="h-7 w-7 text-gold-400" />
                  </div>
                  <CardTitle className="font-serif text-navy-900 text-center text-lg">
                    {member.name}
                  </CardTitle>
                  <p className="text-gold-600 text-sm font-semibold text-center">
                    {member.role}
                  </p>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-xs text-slate-400 mb-2 font-medium">
                    {member.title}
                  </p>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {member.specialization}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Transparency & Anti-Corruption ───────────────────────────── */}
      <section className="section-padding bg-gradient-to-br from-navy-900 via-navy-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-gold bg-grid-64 opacity-10" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-500/30 rounded-full text-xs font-medium text-gold-400 mb-4">
              <Shield className="h-3.5 w-3.5" />
              {transparency.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
              {transparency.title}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto mb-6 rounded-full" />
            <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              {transparency.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {transparency.points.map((point, i) => (
              <div
                key={i}
                className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8
                  hover:bg-white/[0.08] hover:border-gold-500/30 transition-all duration-500"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gold-500/10 rounded-lg flex items-center justify-center">
                    <span className="text-gold-400 font-bold text-lg">{i + 1}</span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-white pt-1">
                    {point.title}
                  </h3>
                </div>
                <p className="text-white/60 text-sm leading-relaxed pl-14">
                  {point.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
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
              <Link href={`/${locale}/orders/new`}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-bold text-base px-10 h-14 shadow-gold-glow transition-all duration-300 hover:scale-105"
                >
                  {cta.cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
