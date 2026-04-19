"use client";

import { useParams } from "next/navigation";
import {
  Globe,
  ShieldCheck,
  FileText,
  BarChart3,
  Scale,
  AlertTriangle,
  FileBarChart,
  CheckCircle2,
  Building2,
  Award,
} from "lucide-react";

const counters = [
  { key: "reports", icon: FileBarChart },
  { key: "accepted", icon: CheckCircle2 },
  { key: "sectors", icon: Building2 },
  { key: "standards", icon: Award },
] as const;

const standards = [
  {
    key: "rdna",
    icon: Globe,
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    key: "iso31000",
    icon: ShieldCheck,
    gradient: "from-emerald-500 to-green-600",
  },
  {
    key: "dstu3008",
    icon: FileText,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    key: "dala",
    icon: BarChart3,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    key: "euRegulatory",
    icon: Scale,
    gradient: "from-rose-500 to-pink-600",
  },
  {
    key: "coso",
    icon: AlertTriangle,
    gradient: "from-red-500 to-rose-600",
  },
] as const;

const uk = {
  badge: "Стандарти та методології",
  title: "Працюємо за міжнародними стандартами",
  counterReports: "500+",
  counterReportsLabel: "звітів",
  counterAccepted: "100%",
  counterAcceptedLabel: "прийнято",
  counterSectors: "20+",
  counterSectorsLabel: "секторів",
  counterStandards: "ISO",
  counterStandardsLabel: "стандарти",
  rdnaTitle: "World Bank RDNA",
  rdnaDesc:
    "Rapid Damage and Needs Assessment. Методика, що використовувалась у 4 раундах оцінки збитків України",
  iso31000Title: "ISO 31000:2018",
  iso31000Desc: "Міжнародний стандарт управління ризиками",
  dstu3008Title: "ДСТУ 3008:2015",
  dstu3008Desc: "Державний стандарт оформлення науково-технічних звітів",
  dalaTitle: "DaLA Framework",
  dalaDesc:
    "Damage and Loss Assessment. Збитки = вартість відновлення, втрати = порушені потоки",
  euRegulatoryTitle: "CSRD / CSDDD / CBAM",
  euRegulatoryDesc: "Регуляторні рамки ЄС: звітність зі сталого розвитку, належна обачність та вуглецеве регулювання",
  cosoTitle: "COSO / NIST / FAIR",
  cosoDesc: "Фреймворки оцінки ризиків для ринків ЄС та США",
};

const en = {
  badge: "Standards & Methodologies",
  title: "We work by international standards",
  counterReports: "500+",
  counterReportsLabel: "reports",
  counterAccepted: "100%",
  counterAcceptedLabel: "accepted",
  counterSectors: "20+",
  counterSectorsLabel: "sectors",
  counterStandards: "ISO",
  counterStandardsLabel: "standards",
  rdnaTitle: "World Bank RDNA",
  rdnaDesc:
    "Rapid Damage and Needs Assessment. Applied in 4 rounds of Ukraine's damage assessment",
  iso31000Title: "ISO 31000:2018",
  iso31000Desc: "International risk management standard",
  dstu3008Title: "DSTU 3008:2015",
  dstu3008Desc: "State standard for scientific-technical reports",
  dalaTitle: "DaLA Framework",
  dalaDesc:
    "Damage and Loss Assessment. Damage = restoration cost, Losses = disrupted flows",
  euRegulatoryTitle: "CSRD / CSDDD / CBAM",
  euRegulatoryDesc: "EU regulatory frameworks: sustainability reporting, due diligence, and carbon border adjustment",
  cosoTitle: "COSO / NIST / FAIR",
  cosoDesc: "Risk assessment frameworks for EU and US markets",
};

export default function PartnersSection() {
  const params = useParams();
  const locale = params.locale as string;
  const t = locale === "uk" ? uk : en;

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dot-gold bg-dot-32 opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-50 border border-gold-200 rounded-full text-xs font-medium text-gold-700 mb-4">
            {t.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-900 mb-4">
            {t.title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto rounded-full" />
        </div>

        {/* Counter row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-14">
          {counters.map((counter) => {
            const Icon = counter.icon;
            const value =
              counter.key === "reports"
                ? t.counterReports
                : counter.key === "accepted"
                  ? t.counterAccepted
                  : counter.key === "sectors"
                    ? t.counterSectors
                    : t.counterStandards;
            const label =
              counter.key === "reports"
                ? t.counterReportsLabel
                : counter.key === "accepted"
                  ? t.counterAcceptedLabel
                  : counter.key === "sectors"
                    ? t.counterSectorsLabel
                    : t.counterStandardsLabel;

            return (
              <div
                key={counter.key}
                className="text-center bg-slate-50 rounded-xl p-5 border border-slate-100"
              >
                <Icon className="h-5 w-5 text-gold-500 mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl font-bold text-navy-900">
                  {value}
                </div>
                <div className="text-sm text-slate-500">{label}</div>
              </div>
            );
          })}
        </div>

        {/* Standards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {standards.map((standard) => {
            const Icon = standard.icon;
            const title = t[`${standard.key}Title` as keyof typeof t];
            const desc = t[`${standard.key}Desc` as keyof typeof t];

            return (
              <div
                key={standard.key}
                className="group relative bg-white rounded-xl border border-slate-200 p-6
                  transition-all duration-500 ease-out
                  hover:shadow-xl hover:shadow-navy-900/5
                  hover:-translate-y-1 hover:border-gold-500/50
                  overflow-hidden"
              >
                {/* Hover gradient */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-navy-900/0 to-gold-500/0
                  group-hover:from-navy-900/[0.02] group-hover:to-gold-500/[0.04]
                  transition-all duration-500 rounded-xl"
                />

                <div className="relative flex gap-4">
                  {/* Icon */}
                  <div
                    className={`shrink-0 w-12 h-12 bg-gradient-to-br ${standard.gradient} rounded-xl
                    flex items-center justify-center shadow-lg
                    group-hover:scale-110 group-hover:rotate-3
                    transition-all duration-500`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Text */}
                  <div className="min-w-0">
                    <h3 className="font-serif font-bold text-navy-900 mb-1 group-hover:text-navy-800 transition-colors duration-300">
                      {title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="accent-line" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
