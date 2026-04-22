"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import {
  Building2,
  ShieldAlert,
  ClipboardCheck,
  FileSignature,
  BarChart3,
  Scale,
  Leaf,
  ShoppingBag,
  ArrowRight,
  Atom,
  Flame,
} from "lucide-react";
import { SERVICE_CATEGORIES } from "@/config/services-catalog";

// Build a lookup: category id → { count, quantumEnabled }
const catalogLookup = Object.fromEntries(
  SERVICE_CATEGORIES.map((c) => [
    c.id,
    { count: c.services.length, quantum: c.quantumEnabled },
  ]),
);

const services = [
  {
    key: "damageAssessment",
    categoryId: "damage-assessment",
    icon: Building2,
    color: "from-red-500 to-rose-600",
    href: "/services",
    isPopular: true, // Найпопулярніша послуга
  },
  {
    key: "riskAssessment",
    categoryId: "risk-assessment",
    icon: ShieldAlert,
    color: "from-amber-500 to-orange-500",
    href: "/risk-assessment",
    isPopular: true, // Популярна послуга
  },
  {
    key: "euCompliance",
    categoryId: "eu-compliance",
    icon: ClipboardCheck,
    color: "from-blue-500 to-indigo-600",
    href: "/eu-compliance",
    isPopular: true, // Популярна послуга
  },
  {
    key: "contractAnalysis",
    categoryId: "contract-analysis",
    icon: FileSignature,
    color: "from-indigo-500 to-blue-600",
    href: "/services",
  },
  {
    key: "economicAnalysis",
    categoryId: "economic-analysis",
    icon: BarChart3,
    color: "from-violet-500 to-purple-600",
    href: "/services",
  },
  {
    key: "legalSupport",
    categoryId: "legal-support",
    icon: Scale,
    color: "from-rose-500 to-pink-600",
    href: "/services",
  },
  {
    key: "environmental",
    categoryId: "environmental",
    icon: Leaf,
    color: "from-green-500 to-emerald-600",
    href: "/services",
  },
  {
    key: "euMarketAccess",
    categoryId: "eu-market-access",
    icon: ShoppingBag,
    color: "from-sky-500 to-blue-600",
    href: "/services",
  },
] as const;

export default function ServicesSection() {
  const t = useTranslations("services");
  const params = useParams();
  const locale = params.locale as string;

  return (
    <section id="services" className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-50 border border-gold-200 rounded-full text-xs font-medium text-gold-700 mb-4">
            {locale === "uk" ? "Повний спектр послуг" : "Full range of services"}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-900 mb-4">
            {t("title")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto mb-6 rounded-full" />
          <p className="text-lg text-slate-700 max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        {/* Cards grid - Better 3 column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            const cat = catalogLookup[service.categoryId];
            const cardContent = (
              <div className="relative h-full bg-white rounded-xl border border-slate-200 p-8
                transition-all duration-500 ease-out
                hover:shadow-2xl hover:shadow-navy-900/10
                hover:-translate-y-2 hover:border-gold-500/50
                overflow-hidden">

                {/* Popular badge - top right */}
                {'isPopular' in service && service.isPopular && (
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1
                    bg-gradient-to-r from-gold-500 to-gold-600 text-navy-900 rounded-full
                    shadow-lg animate-pulse-subtle">
                    <Flame className="h-3 w-3" />
                    <span className="text-[10px] font-bold uppercase tracking-wide">
                      {locale === "uk" ? "Популярно" : "Popular"}
                    </span>
                  </div>
                )}

                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-navy-900/0 to-gold-500/0
                  group-hover:from-navy-900/[0.02] group-hover:to-gold-500/[0.04]
                  transition-all duration-500 rounded-xl" />

                {/* Icon + Quantum badge row */}
                <div className="relative flex items-start justify-between mb-6">
                  <div className={`inline-flex items-center justify-center w-14 h-14
                    bg-gradient-to-br ${service.color} rounded-xl
                    shadow-lg group-hover:scale-110 group-hover:rotate-3
                    transition-all duration-500`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>

                  {cat?.quantum && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-violet-50 border border-violet-200 rounded-full">
                      <Atom className="h-3 w-3 text-violet-600" />
                      <span className="text-[10px] font-semibold text-violet-600 uppercase tracking-wide">
                        {t("quantumBadge")}
                      </span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 className="relative text-xl font-serif font-bold text-navy-900 mb-2
                  group-hover:text-navy-800 transition-colors duration-300">
                  {t(service.key)}
                </h3>

                {/* Count */}
                <div className="relative text-xs font-medium text-slate-600 mb-3">
                  {cat ? `${cat.count} ${locale === "uk" ? "типів звітів" : "report types"}` : t(`${service.key}Count`)}
                </div>

                {/* Description */}
                <p className="relative text-slate-700 text-sm leading-relaxed mb-6">
                  {t(`${service.key}Desc`)}
                </p>

                {/* CTA */}
                <div className="relative flex items-center text-gold-600 font-semibold text-sm
                  group-hover:text-gold-700 transition-colors duration-300">
                  <span>{t("learnMore")}</span>
                  <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
                </div>

                {/* Bottom accent line */}
                <div className="accent-line" />
              </div>
            );

            return (
              <Link
                key={service.key}
                href={`/${locale}${service.href}`}
                className="group relative h-full block"
              >
                {cardContent}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
