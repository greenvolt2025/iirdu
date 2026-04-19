"use client";

import { useParams } from "next/navigation";
import {
  Globe,
  Landmark,
  Building2,
  Factory,
  BarChart3,
  ShieldCheck,
  FileText,
  Scale,
  Leaf,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const partners = [
  {
    region: "eu",
    icon: Landmark,
    gradient: "from-blue-600 to-indigo-700",
    flagEmoji: null,
  },
  {
    region: "japan",
    icon: Building2,
    gradient: "from-red-500 to-rose-600",
    flagEmoji: null,
  },
  {
    region: "korea",
    icon: Factory,
    gradient: "from-sky-500 to-blue-600",
    flagEmoji: null,
  },
  {
    region: "china",
    icon: BarChart3,
    gradient: "from-amber-500 to-red-600",
    flagEmoji: null,
  },
] as const;

const services = [
  { icon: FileText, key: "esia" },
  { icon: Leaf, key: "cbam" },
  { icon: ShieldCheck, key: "rdna" },
  { icon: Scale, key: "fidic" },
  { icon: BarChart3, key: "me" },
  { icon: Globe, key: "feasibility" },
] as const;

const uk = {
  badge: "Міжнародне партнерство",
  title: "Послуги для міжнародних партнерів",
  subtitle: "Локальна експертиза міжнародного рівня для DFI, донорських програм та іноземних інвесторів",

  euName: "Європейський Союз",
  euOrgs: "EBRD • EIB • EU Facility • KfW • GIZ",
  euServices: "ESIA, CSRD/CSDDD, CBAM верифікація, M&E донорських програм",

  japanName: "Японія",
  japanOrgs: "JICA • Japan Fund for Poverty Reduction",
  japanServices: "Feasibility studies, JICA ESCS, Build Back Better, DRR",

  koreaName: "Республіка Корея",
  koreaOrgs: "KOICA • KDB • K-Exim",
  koreaServices: "ODA проєкти, Smart City, Digital Government, Green Growth",

  chinaName: "Азіатські інститути",
  chinaOrgs: "AIIB • ADB • Silk Road Fund",
  chinaServices: "ESF Assessment, Investment DD, Debt Sustainability Analysis",

  esiaLabel: "ESIA / ОВД",
  cbamLabel: "CBAM",
  rdnaLabel: "RDNA / DaLA",
  fidicLabel: "FIDIC Claims",
  meLabel: "M&E",
  feasibilityLabel: "Feasibility",

  advantage1: "Вартість на 40-60% нижча за Big 4",
  advantage2: "Локальна присутність у всіх регіонах України",
  advantage3: "Двомовні звіти UA/EN",
  advantage4: "Наукова вага висновків у суді та арбітражі",

  cta: "Запит для партнерів",
};

const en = {
  badge: "International Partnership",
  title: "Services for international partners",
  subtitle: "Local expertise at international standards for DFIs, donor programs, and foreign investors",

  euName: "European Union",
  euOrgs: "EBRD • EIB • EU Facility • KfW • GIZ",
  euServices: "ESIA, CSRD/CSDDD, CBAM verification, donor program M&E",

  japanName: "Japan",
  japanOrgs: "JICA • Japan Fund for Poverty Reduction",
  japanServices: "Feasibility studies, JICA ESCS, Build Back Better, DRR",

  koreaName: "Republic of Korea",
  koreaOrgs: "KOICA • KDB • K-Exim",
  koreaServices: "ODA projects, Smart City, Digital Government, Green Growth",

  chinaName: "Asian Institutions",
  chinaOrgs: "AIIB • ADB • Silk Road Fund",
  chinaServices: "ESF Assessment, Investment DD, Debt Sustainability Analysis",

  esiaLabel: "ESIA / EIA",
  cbamLabel: "CBAM",
  rdnaLabel: "RDNA / DaLA",
  fidicLabel: "FIDIC Claims",
  meLabel: "M&E",
  feasibilityLabel: "Feasibility",

  advantage1: "40-60% lower cost than Big 4",
  advantage2: "Local presence in all regions of Ukraine",
  advantage3: "Bilingual reports UA/EN",
  advantage4: "Scientific weight in courts & arbitration",

  cta: "Partner inquiry",
};

export default function InternationalSection() {
  const params = useParams();
  const locale = params.locale as string;
  const t = locale === "uk" ? uk : en;

  const partnerData = [
    { ...partners[0], name: t.euName, orgs: t.euOrgs, svc: t.euServices },
    { ...partners[1], name: t.japanName, orgs: t.japanOrgs, svc: t.japanServices },
    { ...partners[2], name: t.koreaName, orgs: t.koreaOrgs, svc: t.koreaServices },
    { ...partners[3], name: t.chinaName, orgs: t.chinaOrgs, svc: t.chinaServices },
  ];

  const advantages = [t.advantage1, t.advantage2, t.advantage3, t.advantage4];

  return (
    <section id="international" className="section-padding bg-slate-50 relative overflow-hidden">
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
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Partner cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {partnerData.map((partner) => {
            const Icon = partner.icon;
            return (
              <div
                key={partner.region}
                className="group relative bg-white rounded-xl border border-slate-200 p-6
                  transition-all duration-500 ease-out
                  hover:shadow-xl hover:shadow-navy-900/5
                  hover:-translate-y-1 hover:border-gold-500/50
                  overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-navy-900/0 to-gold-500/0
                  group-hover:from-navy-900/[0.02] group-hover:to-gold-500/[0.04]
                  transition-all duration-500 rounded-xl" />

                <div className="relative flex gap-4">
                  <div className={`shrink-0 w-12 h-12 bg-gradient-to-br ${partner.gradient} rounded-xl
                    flex items-center justify-center shadow-lg
                    group-hover:scale-110 group-hover:rotate-3
                    transition-all duration-500`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif font-bold text-navy-900 mb-1">{partner.name}</h3>
                    <p className="text-xs text-slate-400 mb-2">{partner.orgs}</p>
                    <p className="text-sm text-slate-500 leading-relaxed">{partner.svc}</p>
                  </div>
                </div>

                <div className="accent-line" />
              </div>
            );
          })}
        </div>

        {/* Services we provide */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-12">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div key={svc.key} className="text-center bg-white rounded-xl border border-slate-200 p-4 hover:border-gold-500/50 transition-colors">
                <Icon className="h-5 w-5 text-gold-500 mx-auto mb-2" />
                <div className="text-xs font-medium text-navy-900">{t[`${svc.key}Label` as keyof typeof t]}</div>
              </div>
            );
          })}
        </div>

        {/* Advantages + CTA */}
        <div className="bg-gradient-to-br from-navy-900 to-navy-800 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-serif text-xl font-bold text-white mb-6">
                {locale === "uk" ? "Чому обирають нас" : "Why choose us"}
              </h3>
              <div className="space-y-3">
                {advantages.map((adv, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="shrink-0 w-6 h-6 bg-gold-500/20 rounded-full flex items-center justify-center">
                      <ShieldCheck className="h-3 w-3 text-gold-400" />
                    </div>
                    <span className="text-sm text-white/80">{adv}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center md:text-right">
              <Link href={`/${locale}/contacts`}>
                <Button size="lg" className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-bold text-base px-8 h-14 shadow-gold-glow transition-all duration-300 hover:scale-105">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  {t.cta}
                </Button>
              </Link>
              <p className="text-xs text-white/50 mt-4">
                {locale === "uk"
                  ? "З питань співпраці звертайтесь через форму"
                  : "For partnership inquiries, use the contact form"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
