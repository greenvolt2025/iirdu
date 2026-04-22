"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Users, Building2, Landmark, Globe, ArrowRight } from "lucide-react";

const segments = [
  {
    key: "individuals",
    icon: Users,
    color: "from-blue-500 to-indigo-600",
    href: "/individuals",
  },
  {
    key: "business",
    icon: Building2,
    color: "from-amber-500 to-orange-600",
    href: "/business",
  },
  {
    key: "government",
    icon: Landmark,
    color: "from-indigo-500 to-violet-600",
    href: "/government",
  },
  {
    key: "international",
    icon: Globe,
    color: "from-emerald-500 to-green-600",
    href: "/international",
  },
] as const;

export default function SegmentHubSection() {
  const t = useTranslations("segmentHub");
  const params = useParams();
  const locale = params.locale as string;

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-900 mb-4">
            {t("title")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto mb-6 rounded-full" />
          <p className="text-lg text-slate-700 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {segments.map((segment) => {
            const Icon = segment.icon;
            return (
              <Link
                key={segment.key}
                href={`/${locale}${segment.href}`}
                className="group relative block"
              >
                <div
                  className="relative h-full bg-white rounded-xl border border-slate-200 p-8
                  transition-all duration-500 ease-out
                  hover:shadow-2xl hover:shadow-navy-900/10
                  hover:-translate-y-2 hover:border-gold-500/50
                  overflow-hidden"
                >
                  {/* Hover gradient overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-navy-900/0 to-gold-500/0
                    group-hover:from-navy-900/[0.02] group-hover:to-gold-500/[0.04]
                    transition-all duration-500 rounded-xl"
                  />

                  {/* Icon */}
                  <div className="relative flex items-start mb-6">
                    <div
                      className={`inline-flex items-center justify-center w-14 h-14
                      bg-gradient-to-br ${segment.color} rounded-xl
                      shadow-lg group-hover:scale-110 group-hover:rotate-3
                      transition-all duration-500`}
                    >
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="relative text-xl font-serif font-bold text-navy-900 mb-3
                    group-hover:text-navy-800 transition-colors duration-300"
                  >
                    {t(segment.key)}
                  </h3>

                  {/* Description */}
                  <p className="relative text-slate-600 text-sm leading-relaxed mb-6">
                    {t(`${segment.key}Desc`)}
                  </p>

                  {/* CTA */}
                  <div
                    className="relative flex items-center text-gold-600 font-semibold text-sm
                    group-hover:text-gold-700 transition-colors duration-300"
                  >
                    <span>{t(`${segment.key}Cta`)}</span>
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
                  </div>

                  {/* Bottom accent line */}
                  <div className="accent-line" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
