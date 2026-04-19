"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Upload,
  Shield,
  FileText,
  CheckCircle,
  ArrowRight,
  Scale,
  Globe,
  Building2,
  BookOpen,
  Clock,
  BarChart3,
  Landmark,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const uk = {
  badge: "Науково-правовий висновок (НПВ)",
  title: "Що таке науково-правовий висновок",
  subtitle:
    "Науково-правовий висновок — це офіційний документ приватної наукової установи, підготовлений на основі наукової методології, який має доказову силу в суді, міжнародному арбітражі та перед міжнародними інституціями.",

  whatIsTitle: "Визначення",
  whatIsText:
    "Науково-правовий висновок (НПВ) — документ, підготовлений науковою установою відповідно до Закону України «Про наукову і науково-технічну діяльність» (№ 848-VIII). Це наукове дослідження з використанням визнаних міжнародних методологій.",

  legalBasisTitle: "Правова основа",
  legalBasis: [
    "ЗУ «Про наукову і науково-технічну діяльність» (848-VIII), ст. 6(3)(6), 7",
    "ЗУ «Про наукову і науково-технічну експертизу» (51/95-ВР)",
    "ЦПК України — ст. 95 (письмовий доказ), ст. 102-103",
    "ДСТУ 3008:2015 — стандарт оформлення науково-технічних звітів",
  ],

  methodologyTitle: "Методологія RDNA / DaLA",
  methodologySubtitle:
    "Ми застосовуємо методологію Rapid Damage and Needs Assessment (RDNA) та Damage and Loss Assessment (DaLA), розроблену Світовим банком та використану в 4-х раундах оцінки збитків України.",

  dalaTitle: "Структура DaLA",
  dalaPillars: [
    {
      title: "Damage (Збитки)",
      desc: "Вартість повного або часткового руйнування фізичних активів. Розраховується як вартість відновлення до довоєнного стану.",
      icon: "Building2",
    },
    {
      title: "Losses (Втрати)",
      desc: "Порушені економічні потоки внаслідок руйнування: втрачений дохід, додаткові витрати, упущена вигода.",
      icon: "BarChart3",
    },
    {
      title: "Needs (Потреби)",
      desc: "Вартість відновлення з урахуванням принципу Build Back Better: покращена якість, стійкість, інклюзивність.",
      icon: "Landmark",
    },
  ],

  whereUsedTitle: "Де приймається НПВ",
  whereUsed: [
    { name: "RD4U — Реєстр збитків (Рада Європи)", icon: "Globe" },
    { name: "ЄСПЛ — Європейський суд з прав людини (ст. 41)", icon: "Scale" },
    { name: "ICC Claims Commission (Конвенція CETS 225)", icon: "Landmark" },
    { name: "Українські суди — як письмовий доказ (ст. 95 ЦПК)", icon: "FileText" },
    { name: "Міжнародний арбітраж — ICC, LCIA, SCC, ICSID", icon: "Globe" },
    { name: "Страхові компанії — для обґрунтування претензій", icon: "Shield" },
  ],

  typesTitle: "Типи висновків",
  types: [
    "Науково-правовий висновок щодо розміру збитків (RDNA/DaLA)",
    "Науково-технічний висновок щодо стану об'єкта",
    "Науково-економічний висновок щодо втраченої вигоди",
    "Науково-правовий висновок щодо аналізу ризиків (ISO 31000)",
    "Висновок щодо EU Due Diligence (CBAM, CSRD, CSDDD)",
    "Висновок щодо відповідності FIDIC / SCL Protocol",
    "Науково-екологічний висновок (ESIA / ОВД)",
    "Висновок щодо аналізу контрактів та угод",
  ],

  processTitle: "Як отримати висновок",
  steps: [
    { step: "01", title: "Завантажте документи", desc: "Право власності, фото пошкоджень, акти, договори" },
    { step: "02", title: "Аналіз фахівцями", desc: "Наша команда перевіряє комплектність та аналізує" },
    { step: "03", title: "Верифікація", desc: "Науковий співробітник верифікує за ДСТУ 3008:2015" },
    { step: "04", title: "Отримання НПВ", desc: "PDF або друкований оригінал Новою Поштою" },
  ],

  turnaroundTitle: "Строки та вартість",
  turnaroundStandard: "Стандарт — до 30 робочих днів",
  turnaroundUrgent: "Терміновий — до 10 робочих днів (×1.5)",
  turnaroundPrice: "Від €500 залежно від типу та складності",

  importantTitle: "Важливо",
  importantText:
    "НПВ — це наукове дослідження приватної наукової установи за міжнародними стандартами (RDNA/DaLA, ISO 31000), що має повну юридичну вагу як письмовий доказ у судах та міжнародних інституціях.",

  cta: "Завантажити документи",
  ctaSecondary: "Переглянути всі послуги",
};

const en = {
  badge: "Scientific-Legal Conclusion",
  title: "What is a scientific-legal conclusion",
  subtitle:
    "A scientific-legal conclusion is an official document of a private scientific institution, prepared based on scientific methodology, that carries evidentiary weight in courts, international arbitration, and before international institutions.",

  whatIsTitle: "Definition",
  whatIsText:
    "A scientific-legal conclusion is a document prepared by a scientific institution under the Law of Ukraine on Scientific and Scientific-Technical Activity (No. 848-VIII). It is scientific research using recognized international methodologies.",

  legalBasisTitle: "Legal basis",
  legalBasis: [
    "Law on Scientific Activity (848-VIII), Art. 6(3)(6), 7",
    "Law on Scientific and Technical Expertise (51/95-VR)",
    "CPC of Ukraine — Art. 95 (written evidence), Art. 102-103",
    "DSTU 3008:2015 — standard for scientific-technical report formatting",
  ],

  methodologyTitle: "RDNA / DaLA Methodology",
  methodologySubtitle:
    "We apply the Rapid Damage and Needs Assessment (RDNA) and Damage and Loss Assessment (DaLA) methodology developed by the World Bank and used in 4 rounds of Ukraine's damage assessment.",

  dalaTitle: "DaLA Structure",
  dalaPillars: [
    {
      title: "Damage",
      desc: "Cost of full or partial destruction of physical assets. Calculated as the cost of restoring to pre-war condition.",
      icon: "Building2",
    },
    {
      title: "Losses",
      desc: "Disrupted economic flows due to destruction: lost income, additional costs, lost profits.",
      icon: "BarChart3",
    },
    {
      title: "Needs",
      desc: "Cost of recovery following Build Back Better principles: improved quality, resilience, inclusivity.",
      icon: "Landmark",
    },
  ],

  whereUsedTitle: "Where the conclusion is accepted",
  whereUsed: [
    { name: "RD4U — Register of Damage (Council of Europe)", icon: "Globe" },
    { name: "ECHR — European Court of Human Rights (Art. 41)", icon: "Scale" },
    { name: "ICC Claims Commission (Convention CETS 225)", icon: "Landmark" },
    { name: "Ukrainian courts — as written evidence (Art. 95 CPC)", icon: "FileText" },
    { name: "International arbitration — ICC, LCIA, SCC, ICSID", icon: "Globe" },
    { name: "Insurance companies — for claim substantiation", icon: "Shield" },
  ],

  typesTitle: "Types of conclusions",
  types: [
    "Scientific-legal conclusion on damage amount (RDNA/DaLA)",
    "Scientific-technical conclusion on object condition",
    "Scientific-economic conclusion on lost profits",
    "Scientific-legal conclusion on risk assessment (ISO 31000)",
    "Conclusion on EU Due Diligence (CBAM, CSRD, CSDDD)",
    "Conclusion on FIDIC / SCL Protocol compliance",
    "Scientific-environmental conclusion (ESIA / EIA)",
    "Conclusion on contract and agreement analysis",
  ],

  processTitle: "How to get a conclusion",
  steps: [
    { step: "01", title: "Upload documents", desc: "Ownership proof, damage photos, acts, contracts" },
    { step: "02", title: "Expert analysis", desc: "Our team verifies completeness and analyzes" },
    { step: "03", title: "Verification", desc: "Scientific researcher verifies per DSTU 3008:2015" },
    { step: "04", title: "Receive the conclusion", desc: "PDF or printed original via Nova Poshta" },
  ],

  turnaroundTitle: "Timeline & pricing",
  turnaroundStandard: "Standard — up to 30 business days",
  turnaroundUrgent: "Urgent — up to 10 business days (×1.5)",
  turnaroundPrice: "From €500 depending on type and complexity",

  importantTitle: "Important",
  importantText:
    "A scientific-legal conclusion is scientific research by a private scientific institution following international standards (RDNA/DaLA, ISO 31000) with full legal weight as written evidence in courts and international institutions.",

  cta: "Upload Documents",
  ctaSecondary: "View All Services",
};

const ICON_MAP: Record<string, typeof Building2> = {
  Building2,
  BarChart3,
  Landmark,
  Globe,
  Scale,
  FileText,
  Shield,
};

export default function ConclusionPage() {
  const params = useParams();
  const locale = params.locale as string;
  const t = locale === "uk" ? uk : en;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
        <div className="absolute inset-0 bg-grid-gold bg-grid-64 opacity-20" />
        <div className="absolute top-20 right-[15%] w-72 h-72 bg-gold-500/10 rounded-full blur-3xl animate-float" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="text-center max-w-3xl mx-auto animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/10 border border-gold-500/30 rounded-full mb-8">
              <BookOpen className="h-4 w-4 text-gold-400" />
              <span className="text-sm font-medium text-gold-400">{t.badge}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.1] mb-6">
              {t.title}
            </h1>

            <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl mx-auto">
              {t.subtitle}
            </p>

            <Link href={`/${locale}/orders/new`}>
              <Button size="lg" className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-bold text-base px-8 h-14 shadow-gold-glow transition-all duration-300 hover:scale-105">
                <Upload className="mr-2 h-5 w-5" />
                {t.cta}
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Definition + Legal Basis */}
      <section className="section-padding bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* What is */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-navy-900 mb-4">{t.whatIsTitle}</h2>
              <p className="text-slate-600 leading-relaxed mb-6">{t.whatIsText}</p>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <div className="flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-900 text-sm mb-1">{t.importantTitle}</h4>
                    <p className="text-sm text-amber-800 leading-relaxed">{t.importantText}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Legal basis */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-navy-900 mb-4">{t.legalBasisTitle}</h2>
              <div className="space-y-3">
                {t.legalBasis.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <Scale className="h-4 w-4 text-gold-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DaLA Methodology */}
      <section className="section-padding bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-50 border border-gold-200 rounded-full text-xs font-medium text-gold-700 mb-4">
              {t.methodologyTitle}
            </div>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">{t.methodologySubtitle}</p>
          </div>

          <h3 className="text-xl font-serif font-bold text-navy-900 mb-8 text-center">{t.dalaTitle}</h3>

          <div className="grid md:grid-cols-3 gap-6">
            {t.dalaPillars.map((pillar, i) => {
              const Icon = ICON_MAP[pillar.icon] ?? Building2;
              const gradients = [
                "from-red-500 to-rose-600",
                "from-amber-500 to-orange-500",
                "from-emerald-500 to-green-600",
              ];
              return (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-gold-500/50 transition-all duration-300">
                  <div className={`w-12 h-12 bg-gradient-to-br ${gradients[i]} rounded-xl flex items-center justify-center shadow-lg mb-5`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-serif font-bold text-navy-900 mb-2">{pillar.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Where accepted */}
      <section className="section-padding bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-serif font-bold text-navy-900 mb-10 text-center">{t.whereUsedTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.whereUsed.map((item, i) => {
              const Icon = ICON_MAP[item.icon] ?? Globe;
              return (
                <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <Icon className="h-5 w-5 text-gold-500 shrink-0" />
                  <span className="text-sm text-slate-700 font-medium">{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Types of conclusions */}
      <section className="section-padding bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-serif font-bold text-navy-900 mb-10 text-center">{t.typesTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {t.types.map((type, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200">
                <CheckCircle className="h-4 w-4 text-gold-500 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-700">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-serif font-bold text-navy-900 mb-10 text-center">{t.processTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.steps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-14 h-14 bg-gold-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-gold-500">{step.step}</span>
                </div>
                <h4 className="font-serif font-bold text-navy-900 mb-2">{step.title}</h4>
                <p className="text-sm text-slate-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Turnaround & Pricing */}
      <section className="section-padding bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-serif font-bold text-navy-900 mb-8 text-center">{t.turnaroundTitle}</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-5 bg-white rounded-xl border border-slate-200">
              <Clock className="h-5 w-5 text-gold-500 shrink-0" />
              <span className="text-slate-700 font-medium">{t.turnaroundStandard}</span>
            </div>
            <div className="flex items-center gap-4 p-5 bg-white rounded-xl border border-slate-200">
              <Clock className="h-5 w-5 text-amber-500 shrink-0" />
              <span className="text-slate-700 font-medium">{t.turnaroundUrgent}</span>
            </div>
            <div className="flex items-center gap-4 p-5 bg-white rounded-xl border border-slate-200">
              <BarChart3 className="h-5 w-5 text-emerald-500 shrink-0" />
              <span className="text-slate-700 font-medium">{t.turnaroundPrice}</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 relative">
          <div className="absolute inset-0 bg-grid-gold bg-grid-64 opacity-20" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-10">
                {t.processTitle}
              </h2>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/${locale}/orders/new`}>
                  <Button size="lg" className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-bold text-base px-10 h-14 shadow-gold-glow transition-all duration-300 hover:scale-105">
                    <Upload className="mr-2 h-5 w-5" />
                    {t.cta}
                  </Button>
                </Link>
                <Link href={`/${locale}/services`}>
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 text-base px-10 h-14">
                    {t.ctaSecondary}
                    <ArrowRight className="ml-2 h-4 w-4" />
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
