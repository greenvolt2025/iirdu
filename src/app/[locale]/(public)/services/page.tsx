"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Building2,
  ShieldAlert,
  ClipboardCheck,
  FileSignature,
  BarChart3,
  Scale,
  Lightbulb,
  Leaf,
  ShoppingBag,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Atom,
  Clock,
  DollarSign,
  Zap,
  TrendingUp,
  Calculator,
  Target,
  Package,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SERVICE_CATEGORIES,
  SERVICE_PACKAGES,
  getServiceById,
} from "@/config/services-catalog";

// ── Icon map (catalog stores icon name as string) ────────────────────────────

const ICON_MAP: Record<string, typeof Building2> = {
  Building2,
  ShieldAlert,
  ClipboardCheck,
  FileSignature,
  BarChart3,
  Scale,
  Lightbulb,
  Leaf,
  ShoppingBag,
};

// ── Gradient map for packages ────────────────────────────────────────────────

const PACKAGE_GRADIENTS: Record<string, string> = {
  "investor-entry": "from-blue-500 to-indigo-600",
  "reconstruction-project": "from-emerald-500 to-green-600",
  "eu-compliance-full": "from-violet-500 to-purple-600",
  "international-claims": "from-red-500 to-rose-600",
  "advanced-claims-analytics": "from-amber-500 to-orange-600",
};

// ── Formatting helpers ───────────────────────────────────────────────────────

function formatPrice(min: number, max: number, currency: string): string {
  const fmt = (n: number) => n.toLocaleString("en-US");
  return `${currency} ${fmt(min)} - ${fmt(max)}`;
}

function formatTurnaround(min: number, max: number, locale: string): string {
  const unit = locale === "uk" ? "днів" : "days";
  return `${min}-${max} ${unit}`;
}

// ── Bilingual UI text (NOT service data — that comes from catalog) ───────────

const uiText = {
  uk: {
    heroBadge: `${SERVICE_CATEGORIES.length} напрямків / ${SERVICE_CATEGORIES.reduce((t, c) => t + c.services.length, 0)}+ послуг`,
    heroTitle: "Повний спектр науково-правових висновків",
    heroSubtitle:
      "МІВРУ надає комплексні послуги з оцінки збитків, аналізу ризиків, Due Diligence, відповідності ЄС, ESIA для донорських проєктів, CBAM верифікації та підготовки до ринку ЄС.",
    heroQuantum: "З використанням квантових обчислень",
    categoriesBadge: "Наші послуги",
    categoriesTitle: "Категорії послуг",
    categoriesSubtitle:
      "Оберіть необхідний напрямок для детальної інформації про кожну послугу, вартість та строки виконання.",
    servicesLabel: "послуг",
    quantum: "Quantum",
    quantumBadge: "Технологічна перевага",
    quantumTitle: "Квантові обчислення для точності",
    quantumSubtitle:
      "МІВРУ застосовує найсучасніші квантові обчислення для підвищення точності розрахунків у складних фінансових та ризикових моделях. Квантові алгоритми дозволяють обробити мільйони сценаріїв одночасно.",
    quantumCard1Title: "Моделювання ризиків",
    quantumCard1Desc: "Мільйони сценаріїв одночасно на потужних квантових процесорах",
    quantumCard2Title: "Оцінка збитків",
    quantumCard2Desc: "Точні Монте-Карло симуляції для визначення вартості відновлення та втрат",
    quantumCard3Title: "Фінансовий аналіз",
    quantumCard3Desc: "Квантово-покращений DCF/NPV аналіз з оптимальними дисконтними ставками",
    quantumCard4Title: "Оптимізація кошторисів",
    quantumCard4Desc: "Квантові алгоритми оптимізації для мінімізації витрат відновлення",
    packagesBadge: "Вигідні пропозиції",
    packagesTitle: "Пакетні пропозиції",
    packagesSubtitle:
      "Комплексні пакети послуг зі знижкою до 20% порівняно з окремим замовленням кожної послуги.",
    packagesIncludes: "Включає:",
    packagesOrder: "Замовити",
    ctaTitle: "Потрібен науково-правовий висновок?",
    ctaSubtitle:
      "Залиште заявку або зателефонуйте нам — обговоримо ваш випадок та підберемо оптимальний тип дослідження.",
    ctaPrimary: "Замовити",
    ctaSecondary: "Зв'язатися з нами",
  },
  en: {
    heroBadge: `${SERVICE_CATEGORIES.length} Directions / ${SERVICE_CATEGORIES.reduce((t, c) => t + c.services.length, 0)}+ Services`,
    heroTitle: "Full Spectrum of Scientific-Legal Conclusions",
    heroSubtitle:
      "IIRDU provides comprehensive services in damage assessment, risk analysis, Due Diligence, EU compliance, ESIA for donor projects, CBAM verification, and EU market readiness.",
    heroQuantum: "Powered by Quantum Computing",
    categoriesBadge: "Our Services",
    categoriesTitle: "Service Categories",
    categoriesSubtitle:
      "Select a category for detailed information about each service, pricing, and turnaround time.",
    servicesLabel: "services",
    quantum: "Quantum",
    quantumBadge: "Technological Advantage",
    quantumTitle: "Quantum Computing for Precision",
    quantumSubtitle:
      "IIRDU applies state-of-the-art quantum computing to enhance calculation accuracy in complex financial and risk models. Quantum algorithms process millions of scenarios simultaneously.",
    quantumCard1Title: "Risk Modeling",
    quantumCard1Desc: "Millions of scenarios simultaneously on powerful quantum processors",
    quantumCard2Title: "Damage Assessment",
    quantumCard2Desc: "Precise Monte Carlo simulations for determining restoration costs and losses",
    quantumCard3Title: "Financial Analysis",
    quantumCard3Desc: "Quantum-enhanced DCF/NPV analysis with optimal discount rates",
    quantumCard4Title: "Cost Optimization",
    quantumCard4Desc: "Quantum optimization algorithms for minimizing restoration costs",
    packagesBadge: "Best Value",
    packagesTitle: "Service Packages",
    packagesSubtitle:
      "Comprehensive service packages with up to 20% discount compared to ordering each service separately.",
    packagesIncludes: "Includes:",
    packagesOrder: "Order",
    ctaTitle: "Need a Scientific-Legal Conclusion?",
    ctaSubtitle:
      "Submit a request or call us -- we will discuss your case and recommend the optimal research type.",
    ctaPrimary: "Order",
    ctaSecondary: "Contact Us",
  },
};

const quantumCards = [
  { key: "quantumCard1" as const, icon: TrendingUp, gradient: "from-purple-500 to-violet-600" },
  { key: "quantumCard2" as const, icon: Calculator, gradient: "from-red-500 to-rose-600" },
  { key: "quantumCard3" as const, icon: BarChart3, gradient: "from-amber-500 to-orange-500" },
  { key: "quantumCard4" as const, icon: Target, gradient: "from-emerald-500 to-green-600" },
];

// ── Component ────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const params = useParams();
  const locale = (params.locale as string) === "en" ? "en" : "uk";
  const t = uiText[locale];

  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    SERVICE_CATEGORIES[0]?.id ?? null
  );

  const toggleCategory = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  return (
    <>
      {/* ── Hero Section ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
        <div className="absolute inset-0 bg-grid-gold bg-grid-64 opacity-20" />
        <div className="absolute top-20 right-[15%] w-72 h-72 bg-gold-500/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-10 left-[10%] w-96 h-96 bg-navy-600/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="text-center max-w-3xl mx-auto animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/10 border border-gold-500/30 rounded-full mb-8">
              <Zap className="h-4 w-4 text-gold-400" />
              <span className="text-sm font-medium text-gold-400">{t.heroBadge}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.1] mb-6">
              {t.heroTitle}
            </h1>

            <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-6 max-w-2xl mx-auto">
              {t.heroSubtitle}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-full">
              <Atom className="h-4 w-4 text-purple-400 animate-spin" style={{ animationDuration: "8s" }} />
              <span className="text-sm font-medium text-purple-300">{t.heroQuantum}</span>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── Service Categories Grid ─────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-50 border border-gold-200 rounded-full text-xs font-medium text-gold-700 mb-4">
              {t.categoriesBadge}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-900 mb-4">
              {t.categoriesTitle}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto mb-6 rounded-full" />
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">{t.categoriesSubtitle}</p>
          </div>

          {/* Accordion cards */}
          <div className="space-y-6">
            {SERVICE_CATEGORIES.map((cat) => {
              const Icon = ICON_MAP[cat.icon] ?? Building2;
              const isExpanded = expandedCategory === cat.id;
              const catName = locale === "uk" ? cat.nameUk : cat.nameEn;
              const catDesc = locale === "uk" ? cat.descriptionUk : cat.descriptionEn;

              return (
                <div
                  key={cat.id}
                  className={`group relative rounded-2xl border transition-all duration-500 overflow-hidden ${
                    isExpanded
                      ? "border-gold-500/50 shadow-2xl shadow-navy-900/10"
                      : "border-slate-200 hover:border-gold-500/30 hover:shadow-lg hover:shadow-navy-900/5"
                  }`}
                >
                  {/* Header / Trigger */}
                  <button
                    onClick={() => toggleCategory(cat.id)}
                    className="w-full text-left p-6 md:p-8 flex items-start gap-5 transition-colors duration-300"
                  >
                    {/* Icon */}
                    <div
                      className={`shrink-0 inline-flex items-center justify-center w-14 h-14
                        bg-gradient-to-br ${cat.color} rounded-xl shadow-lg
                        transition-all duration-500 ${isExpanded ? "scale-110" : "group-hover:scale-105"}`}
                    >
                      <Icon className="h-7 w-7 text-white" />
                    </div>

                    {/* Title + meta */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="inline-flex items-center px-2 py-0.5 bg-slate-100 border border-slate-200 rounded-full text-[10px] font-semibold text-slate-600 uppercase tracking-wider">
                          {cat.services.length} {t.servicesLabel}
                        </span>
                        {cat.quantumEnabled && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-50 border border-purple-200 rounded-full text-[10px] font-semibold text-purple-700 uppercase tracking-wider">
                            <Atom className="h-3 w-3" />
                            {t.quantum}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-navy-900 mb-2">
                        {catName}
                      </h3>
                      {!isExpanded && (
                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{catDesc}</p>
                      )}
                    </div>

                    {/* Expand icon */}
                    <div className="shrink-0 mt-1">
                      <ChevronDown
                        className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {/* Expanded content */}
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      isExpanded ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 md:px-8 pb-8">
                      {/* Separator */}
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent mb-6" />

                      {/* Description */}
                      <p className="text-slate-600 leading-relaxed mb-8 max-w-3xl">{catDesc}</p>

                      {/* Sub-services list */}
                      <div className="grid gap-3">
                        {cat.services.map((service) => {
                          const serviceName = locale === "uk" ? service.nameUk : service.nameEn;
                          const price = formatPrice(
                            service.priceRange.min,
                            service.priceRange.max,
                            service.priceRange.currency
                          );
                          const time = formatTurnaround(
                            service.turnaroundDays.min,
                            service.turnaroundDays.max,
                            locale
                          );

                          return (
                            <div
                              key={service.id}
                              className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 rounded-xl
                                bg-slate-50 border border-slate-100
                                hover:bg-gold-50/50 hover:border-gold-200/50 transition-colors duration-300"
                            >
                              {/* Service name */}
                              <div className="flex items-start gap-3 flex-1 min-w-0">
                                <CheckCircle className="h-4 w-4 text-gold-500 mt-0.5 shrink-0" />
                                <span className="text-sm font-medium text-slate-700">{serviceName}</span>
                                {service.quantumEnhanced && (
                                  <span className="shrink-0 inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-purple-50 border border-purple-200 rounded text-[9px] font-bold text-purple-600 uppercase">
                                    <Atom className="h-2.5 w-2.5" />Q
                                  </span>
                                )}
                              </div>

                              {/* Price & turnaround */}
                              <div className="flex items-center gap-4 sm:gap-6 pl-7 sm:pl-0 shrink-0">
                                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                  <DollarSign className="h-3.5 w-3.5 text-gold-500" />
                                  <span>{price}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                                  <span>{time}</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* CTA */}
                      <div className="mt-8">
                        <Link href={`/${locale}/orders/new`}>
                          <Button className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-bold px-6 h-11 shadow-gold-glow transition-all duration-300 hover:scale-105">
                            {t.ctaPrimary}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Quantum Computing Section ───────────────────────────────── */}
      <section className="section-padding bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-gold bg-grid-64 opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-xs font-medium text-purple-400 mb-4">
              <Atom className="h-3.5 w-3.5" />
              {t.quantumBadge}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
              {t.quantumTitle}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-violet-600 mx-auto mb-6 rounded-full" />
            <p className="text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
              {t.quantumSubtitle}
            </p>
          </div>

          {/* Quantum cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quantumCards.map((card) => {
              const CardIcon = card.icon;
              const cardTitle = t[`${card.key}Title` as keyof typeof t] as string;
              const cardDesc = t[`${card.key}Desc` as keyof typeof t] as string;

              return (
                <div
                  key={card.key}
                  className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6
                    hover:bg-white/[0.08] hover:border-purple-500/30 transition-all duration-500"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${card.gradient} rounded-xl flex items-center justify-center shadow-lg mb-5
                      group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                  >
                    <CardIcon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-white mb-3">{cardTitle}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{cardDesc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Service Packages Section ────────────────────────────────── */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-gold bg-dot-32 opacity-20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-50 border border-gold-200 rounded-full text-xs font-medium text-gold-700 mb-4">
              <Package className="h-3.5 w-3.5" />
              {t.packagesBadge}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-900 mb-4">
              {t.packagesTitle}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto mb-6 rounded-full" />
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">{t.packagesSubtitle}</p>
          </div>

          {/* Package cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {SERVICE_PACKAGES.map((pkg) => {
              const pkgName = locale === "uk" ? pkg.nameUk : pkg.nameEn;
              const pkgPrice = formatPrice(pkg.priceRange.min, pkg.priceRange.max, pkg.priceRange.currency);
              const accent = PACKAGE_GRADIENTS[pkg.id] ?? "from-gold-500 to-gold-600";

              // Resolve included service names
              const pkgServiceNames = pkg.includedServiceIds
                .map((sid) => {
                  const result = getServiceById(sid);
                  if (!result) return null;
                  return locale === "uk" ? result.service.nameUk : result.service.nameEn;
                })
                .filter((name): name is string => name !== null);

              return (
                <div
                  key={pkg.id}
                  className="group relative bg-white rounded-xl border border-slate-200 p-8
                    transition-all duration-500 ease-out
                    hover:shadow-2xl hover:shadow-navy-900/10
                    hover:-translate-y-1 hover:border-gold-500/50
                    overflow-hidden"
                >
                  {/* Hover gradient overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-navy-900/0 to-gold-500/0
                      group-hover:from-navy-900/[0.02] group-hover:to-gold-500/[0.04]
                      transition-all duration-500 rounded-xl"
                  />

                  {/* Accent stripe */}
                  <div className={`relative w-full h-1 bg-gradient-to-r ${accent} rounded-full mb-6`} />

                  {/* Name */}
                  <h3 className="relative font-serif font-bold text-xl text-navy-900 mb-2">{pkgName}</h3>

                  {/* Price */}
                  <div className="relative flex items-center gap-2 mb-6">
                    <DollarSign className="h-4 w-4 text-gold-500" />
                    <span className="text-lg font-bold text-gold-600">{pkgPrice}</span>
                  </div>

                  {/* Discount badge */}
                  {pkg.discountPercent > 0 && (
                    <div className="relative inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 border border-emerald-200 rounded-full text-[10px] font-semibold text-emerald-700 uppercase tracking-wider mb-4">
                      -{pkg.discountPercent}%
                    </div>
                  )}

                  {/* Included services */}
                  <div className="relative mb-8">
                    <p className="text-xs font-semibold text-navy-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <div className="w-1 h-3 bg-gradient-to-b from-gold-500 to-gold-600 rounded-full" />
                      {t.packagesIncludes}
                    </p>
                    <div className="space-y-2.5">
                      {pkgServiceNames.map((serviceName, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <CheckCircle className="h-4 w-4 text-gold-500 mt-0.5 shrink-0" />
                          <span className="text-sm text-slate-600 leading-snug">{serviceName}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order button */}
                  <Link href={`/${locale}/orders/new`} className="relative block">
                    <Button className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-bold h-11 shadow-gold-glow transition-all duration-300 hover:scale-[1.02]">
                      {t.packagesOrder}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>

                  {/* Bottom accent line */}
                  <div className="accent-line" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 relative">
          <div className="absolute inset-0 bg-grid-gold bg-grid-64 opacity-20" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-6">
                {t.ctaTitle}
              </h2>
              <p className="text-lg text-slate-300 mb-10 max-w-xl mx-auto leading-relaxed">
                {t.ctaSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/${locale}/orders/new`}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-bold text-base px-10 h-14 shadow-gold-glow transition-all duration-300 hover:scale-105"
                  >
                    {t.ctaPrimary}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href={`/${locale}/contacts`}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 text-base px-10 h-14"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    {t.ctaSecondary}
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
