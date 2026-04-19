"use client";

import { useTranslations } from "next-intl";
import { Users, BookOpen, ShieldCheck, Award } from "lucide-react";

const features = [
  { key: "experience", icon: Users, gradient: "from-amber-500 to-orange-500" },
  { key: "methodology", icon: BookOpen, gradient: "from-blue-500 to-cyan-600" },
  { key: "security", icon: ShieldCheck, gradient: "from-emerald-500 to-green-600" },
  { key: "quality", icon: Award, gradient: "from-violet-500 to-purple-600" },
] as const;

export default function FeaturesSection() {
  const t = useTranslations("features");

  return (
    <section className="section-padding bg-slate-50 relative overflow-hidden" id="about">
      {/* Background */}
      <div className="absolute inset-0 bg-dot-gold bg-dot-32 opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-900 mb-4">
            {t("title")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={f.key} className="group text-center" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${f.gradient}
                  flex items-center justify-center shadow-lg
                  group-hover:scale-110 group-hover:rotate-6
                  transition-all duration-500`}>
                  <Icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-serif font-bold text-lg text-navy-900 mb-2">{t(f.key)}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{t(`${f.key}Desc`)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
