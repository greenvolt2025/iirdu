"use client";

import { useParams } from "next/navigation";
import {
  Building2,
  ShieldCheck,
  FileSearch,
  BarChart3,
  CheckCircle2,
  Globe,
  TrendingUp,
  Heart,
  Clock,
  Target,
  Zap,
  Award,
} from "lucide-react";

const programTypes = [
  {
    id: "governance",
    nameUk: "Належне врядування",
    nameEn: "Good Governance",
    icon: Building2,
    color: "from-blue-600 to-indigo-700",
    descUk: "Підтримка децентралізації, реформи держуправління, розвитку місцевого самоврядування",
    descEn: "Decentralization support, public administration reform, local government development",
  },
  {
    id: "anticorruption",
    nameUk: "Протидія корупції",
    nameEn: "Anti-Corruption",
    icon: ShieldCheck,
    color: "from-red-500 to-rose-600",
    descUk: "Оцінка ризиків шахрайства, моніторинг прозорості донорських коштів",
    descEn: "Fraud risk assessment, donor fund transparency monitoring",
  },
  {
    id: "reconstruction",
    nameUk: "Відновлення",
    nameEn: "Reconstruction",
    icon: Globe,
    color: "from-emerald-500 to-green-600",
    descUk: "Інфраструктура, енергетика, житло за стандартами RDNA/DaLA",
    descEn: "Infrastructure, energy, housing using RDNA/DaLA standards",
  },
  {
    id: "economic",
    nameUk: "Економічний розвиток",
    nameEn: "Economic Development",
    icon: TrendingUp,
    color: "from-violet-500 to-purple-600",
    descUk: "Due Diligence інвестицій, оцінка ризиків, реформи приватного сектору",
    descEn: "Investment Due Diligence, risk assessment, private sector reform",
  },
  {
    id: "private-sector",
    nameUk: "Приватний сектор",
    nameEn: "Private Sector",
    icon: BarChart3,
    color: "from-amber-500 to-orange-500",
    descUk: "Розвиток МСП, доступ до ринків, торговельні програми",
    descEn: "SME development, market access, trade programs",
  },
  {
    id: "social",
    nameUk: "Соціальний розвиток",
    nameEn: "Social Development",
    icon: Heart,
    color: "from-pink-500 to-rose-600",
    descUk: "Соціальний захист, гендерна рівність, освіта, охорона здоров'я",
    descEn: "Social protection, gender equality, education, healthcare",
  },
] as const;

const dacCriteria = [
  {
    key: "relevance",
    icon: Target,
    color: "from-blue-500 to-indigo-600",
  },
  {
    key: "effectiveness",
    icon: CheckCircle2,
    color: "from-emerald-500 to-green-600",
  },
  {
    key: "efficiency",
    icon: Zap,
    color: "from-amber-500 to-orange-500",
  },
  {
    key: "impact",
    icon: TrendingUp,
    color: "from-violet-500 to-purple-600",
  },
  {
    key: "sustainability",
    icon: Globe,
    color: "from-teal-500 to-cyan-600",
  },
] as const;

const programPhases = [
  {
    key: "design",
    icon: FileSearch,
    color: "from-blue-500 to-indigo-600",
  },
  {
    key: "implementation",
    icon: Clock,
    color: "from-emerald-500 to-green-600",
  },
  {
    key: "evaluation",
    icon: Award,
    color: "from-violet-500 to-purple-600",
  },
] as const;

const donorStandards = [
  {
    key: "oecd",
    icon: Globe,
    color: "from-blue-600 to-indigo-700",
  },
  {
    key: "equator",
    icon: ShieldCheck,
    color: "from-emerald-500 to-green-600",
  },
  {
    key: "ifc",
    icon: Building2,
    color: "from-violet-500 to-purple-600",
  },
] as const;

const uk = {
  badge: "Донорські програми",
  title: "Наукова підтримка міжнародних програм відновлення",
  subtitle:
    "МІВРУ надає незалежні науково-правові висновки для забезпечення прозорості та ефективності донорських програм. Локальна експертиза міжнародного рівня для міжнародних організацій та фінансових інституцій.",

  programsTitle: "Типи донорських програм",

  dacTitle: "OECD DAC: 5 критеріїв оцінки програм",
  dacSubtitle: "Всі наші оцінки M&E відповідають міжнародним критеріям OECD DAC",

  relevanceTitle: "Relevance / Релевантність",
  relevanceDesc: "Чи відповідає програма потребам бенефіціарів та пріоритетам країни?",

  effectivenessTitle: "Effectiveness / Ефективність",
  effectivenessDesc: "Чи досягла програма поставлених цілей та очікуваних результатів?",

  efficiencyTitle: "Efficiency / Раціональність",
  efficiencyDesc: "Чи оптимально використані ресурси для досягнення результатів?",

  impactTitle: "Impact / Вплив",
  impactDesc: "Які довгострокові позитивні чи негативні зміни спричинила програма?",

  sustainabilityTitle: "Sustainability / Сталість",
  sustainabilityDesc: "Чи зможуть результати програми зберегтися після завершення фінансування?",

  phasesTitle: "Фази донорської програми",
  phasesSubtitle: "Ми надаємо послуги на кожному етапі програмного циклу",

  designTitle: "Планування (1-6 міс)",
  designDesc: "Baseline оцінка, M&E Framework, Stakeholder аналіз, бюджетна оптимізація",

  implementationTitle: "Реалізація (6-24+ міс)",
  implementationDesc: "Real-time моніторинг, fraud risk watch, due diligence підрядників, квартальні звіти",

  evaluationTitle: "Оцінка (фінал)",
  evaluationDesc: "End-line evaluation за DAC критеріями, impact assessment, lessons learned",

  standardsTitle: "Донорські стандарти та методології",
  standardsSubtitle: "Наші звіти відповідають ключовим міжнародним стандартам",

  oecdTitle: "OECD DAC Guidelines",
  oecdDesc: "Керівництво з оцінки програм міжнародного розвитку. 5 критеріїв: Relevance, Effectiveness, Efficiency, Impact, Sustainability",

  equatorTitle: "Equator Principles 4 (2020)",
  equatorDesc: "Фреймворк для оцінки екологічних та соціальних ризиків великих проєктів. Використовується IFC, EBRD, банками розвитку",

  ifcTitle: "IFC Performance Standards",
  ifcDesc: "8 стандартів ефективності Міжнародної фінансової корпорації: екологія, соціальні права, biodiversity, ресетлмент, трудові умови",

  specialTitle: "Спеціалізація інституту",
  specialText:
    "Інститут має досвід роботи з міжнародними донорськими програмами у напрямках належного врядування, протидії корупції та економічного розвитку. Надаємо:",
  special1: "Незалежну оцінку ризиків корупції у проєктах відновлення",
  special2: "Due Diligence бенефіціарів програм та підрядників",
  special3: "M&E за OECD DAC 5 критеріями для всіх фаз програми",
  special4: "Науково-правові висновки щодо відповідності стандартам",

  whyUsTitle: "Чому обирають МІВРУ",
  whyUs1: "Локальна експертиза з розумінням українського контексту",
  whyUs2: "Міжнародні стандарти (OECD DAC, ISO 31000, COSO, Equator Principles, IFC)",
  whyUs3: "Вартість на 40-60% нижча за міжнародні консалтингові фірми",
  whyUs4: "Науковий статус установи — повна незалежність та об'єктивність",

  cta: "Запит для донорських програм",
};

const en = {
  badge: "Donor Programs",
  title: "Scientific support for international reconstruction programs",
  subtitle:
    "IIRDU provides independent scientific-legal conclusions to ensure transparency and effectiveness of donor programs. Local expertise at international standards for international organizations and financial institutions.",

  programsTitle: "Types of Donor Programs",

  dacTitle: "OECD DAC: 5 Evaluation Criteria",
  dacSubtitle: "All our M&E assessments comply with OECD DAC international criteria",

  relevanceTitle: "Relevance",
  relevanceDesc: "Does the program meet beneficiary needs and country priorities?",

  effectivenessTitle: "Effectiveness",
  effectivenessDesc: "Did the program achieve its objectives and expected results?",

  efficiencyTitle: "Efficiency",
  efficiencyDesc: "Were resources optimally used to achieve results?",

  impactTitle: "Impact",
  impactDesc: "What long-term positive or negative changes did the program cause?",

  sustainabilityTitle: "Sustainability",
  sustainabilityDesc: "Will program results persist after funding ends?",

  phasesTitle: "Donor Program Phases",
  phasesSubtitle: "We provide services at every stage of the program cycle",

  designTitle: "Planning (1-6 months)",
  designDesc: "Baseline assessment, M&E Framework, Stakeholder analysis, budget optimization",

  implementationTitle: "Implementation (6-24+ months)",
  implementationDesc: "Real-time monitoring, fraud risk watch, contractor due diligence, quarterly reports",

  evaluationTitle: "Evaluation (final)",
  evaluationDesc: "End-line evaluation using DAC criteria, impact assessment, lessons learned",

  standardsTitle: "Donor Standards & Methodologies",
  standardsSubtitle: "Our reports comply with key international standards",

  oecdTitle: "OECD DAC Guidelines",
  oecdDesc: "Guidelines for evaluating international development programs. 5 criteria: Relevance, Effectiveness, Efficiency, Impact, Sustainability",

  equatorTitle: "Equator Principles 4 (2020)",
  equatorDesc: "Framework for assessing environmental and social risks in large projects. Used by IFC, EBRD, development banks",

  ifcTitle: "IFC Performance Standards",
  ifcDesc: "8 International Finance Corporation performance standards: environment, social rights, biodiversity, resettlement, labor conditions",

  specialTitle: "Institute Specialization",
  specialText:
    "The Institute has experience working with international donor programs in good governance, anti-corruption, and economic development. We provide:",
  special1: "Independent corruption risk assessment in reconstruction projects",
  special2: "Due Diligence of program beneficiaries and contractors",
  special3: "M&E using OECD DAC 5 criteria for all program phases",
  special4: "Scientific-legal conclusions on standards compliance",

  whyUsTitle: "Why choose IIRDU",
  whyUs1: "Local expertise with understanding of Ukrainian context",
  whyUs2: "International standards (OECD DAC, ISO 31000, COSO, Equator Principles, IFC)",
  whyUs3: "40-60% lower cost than international consulting firms",
  whyUs4: "Scientific institution status — full independence and objectivity",

  cta: "Inquiry for donor programs",
};

export default function DonorProgramsSection() {
  const params = useParams();
  const locale = params.locale as string;
  const t = locale === "uk" ? uk : en;

  return (
    <section id="donor-programs" className="section-padding bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-gold bg-dot-32 opacity-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-50 border border-gold-200 rounded-full text-xs font-medium text-gold-700 mb-4">
            <Globe className="h-3 w-3" />
            {t.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-900 mb-4">
            {t.title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto mb-6 rounded-full" />
          <p className="text-lg text-slate-500 max-w-3xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Program types - 6 programs in 3 columns */}
        <div className="mb-16">
          <h3 className="font-serif text-2xl font-bold text-navy-900 text-center mb-10">
            {t.programsTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programTypes.map((program) => {
              const Icon = program.icon;
              const name = program[`name${locale === "uk" ? "Uk" : "En"}` as keyof typeof program] as string;
              const desc = program[`desc${locale === "uk" ? "Uk" : "En"}` as keyof typeof program] as string;

              return (
                <div
                  key={program.id}
                  className="group relative bg-white rounded-xl border border-slate-200 p-6
                    hover:shadow-lg hover:border-gold-500/50 transition-all duration-300"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${program.color} rounded-xl
                    flex items-center justify-center shadow-lg mb-4
                    group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-serif font-bold text-navy-900 mb-2">{name}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* OECD DAC 5 Criteria */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="font-serif text-2xl font-bold text-navy-900 mb-2">
              {t.dacTitle}
            </h3>
            <p className="text-sm text-slate-500">{t.dacSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {dacCriteria.map((criterion) => {
              const Icon = criterion.icon;
              const title = t[`${criterion.key}Title` as keyof typeof t] as string;
              const desc = t[`${criterion.key}Desc` as keyof typeof t] as string;

              return (
                <div
                  key={criterion.key}
                  className="bg-white rounded-xl border border-slate-200 p-5
                    hover:shadow-lg hover:border-gold-500/50 transition-all duration-300"
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${criterion.color} rounded-lg
                    flex items-center justify-center shadow-lg mb-3`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-bold text-navy-900 text-sm mb-2">{title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Program Phases */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="font-serif text-2xl font-bold text-navy-900 mb-2">
              {t.phasesTitle}
            </h3>
            <p className="text-sm text-slate-500">{t.phasesSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programPhases.map((phase) => {
              const Icon = phase.icon;
              const title = t[`${phase.key}Title` as keyof typeof t] as string;
              const desc = t[`${phase.key}Desc` as keyof typeof t] as string;

              return (
                <div
                  key={phase.key}
                  className="relative bg-white rounded-xl border border-slate-200 p-6
                    hover:shadow-lg hover:border-gold-500/50 transition-all duration-300"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${phase.color} rounded-xl
                    flex items-center justify-center shadow-lg mb-4`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-serif font-bold text-navy-900 mb-2">{title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Donor Standards */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="font-serif text-2xl font-bold text-navy-900 mb-2">
              {t.standardsTitle}
            </h3>
            <p className="text-sm text-slate-500">{t.standardsSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {donorStandards.map((standard) => {
              const Icon = standard.icon;
              const title = t[`${standard.key}Title` as keyof typeof t] as string;
              const desc = t[`${standard.key}Desc` as keyof typeof t] as string;

              return (
                <div
                  key={standard.key}
                  className="bg-white rounded-xl border border-slate-200 p-6
                    hover:shadow-lg hover:border-gold-500/50 transition-all duration-300"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${standard.color} rounded-xl
                    flex items-center justify-center shadow-lg mb-4`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-serif font-bold text-navy-900 mb-2">{title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Institute Specialization + Why us */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Institute Focus */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg
                flex items-center justify-center shadow-lg">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-serif text-xl font-bold text-navy-900">
                {t.specialTitle}
              </h3>
            </div>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">{t.specialText}</p>
            <div className="space-y-2">
              {[t.special1, t.special2, t.special3, t.special4].map((service, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600">{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Why us */}
          <div className="bg-gradient-to-br from-navy-900 to-navy-800 rounded-2xl p-8">
            <h3 className="font-serif text-xl font-bold text-white mb-6">
              {t.whyUsTitle}
            </h3>
            <div className="space-y-3">
              {[t.whyUs1, t.whyUs2, t.whyUs3, t.whyUs4].map((reason, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="shrink-0 w-6 h-6 bg-gold-500/20 rounded-full flex items-center justify-center">
                    <ShieldCheck className="h-3 w-3 text-gold-400" />
                  </div>
                  <span className="text-sm text-white/80">{reason}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <a
                href="mailto:iirdu@proton.me"
                className="inline-flex items-center justify-center w-full px-6 py-3
                  bg-gradient-to-r from-gold-500 to-gold-600
                  hover:from-gold-600 hover:to-gold-700
                  text-navy-900 font-bold rounded-lg
                  shadow-gold-glow transition-all duration-300 hover:scale-105"
              >
                <Globe className="mr-2 h-4 w-4" />
                {t.cta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
