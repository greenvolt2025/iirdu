"use client";

import { useTranslations } from "next-intl";
import { Upload, Search, UserCheck, Download } from "lucide-react";

const steps = [
  { key: "step1", icon: Upload, num: "01" },
  { key: "step2", icon: Search, num: "02" },
  { key: "step3", icon: UserCheck, num: "03" },
  { key: "step4", icon: Download, num: "04" },
] as const;

export default function ProcessSection() {
  const t = useTranslations("process");

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-900 mb-4">
            {t("title")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto rounded-full" />
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:grid grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.key} className="relative group">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="absolute top-10 left-[calc(50%+28px)] right-0 h-0.5 bg-gradient-to-r from-gold-500/40 to-gold-500/10" />
                )}

                <div className="text-center">
                  {/* Icon circle */}
                  <div className="relative inline-flex items-center justify-center w-20 h-20 mb-5
                    bg-navy-900 rounded-2xl shadow-navy-xl
                    group-hover:bg-gradient-to-br group-hover:from-gold-500 group-hover:to-gold-600
                    transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="h-8 w-8 text-gold-400 group-hover:text-navy-900 transition-colors duration-500" />
                    <span className="absolute -top-2 -right-2 w-7 h-7 bg-gold-500 text-navy-900 rounded-full
                      text-xs font-bold flex items-center justify-center shadow-md">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-navy-900 mb-2">{t(step.key)}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{t(`${step.key}Desc`)}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden max-w-lg mx-auto">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.key} className="flex gap-5 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-navy-900 rounded-xl flex items-center justify-center shrink-0 shadow-navy-xl">
                    <Icon className="h-6 w-6 text-gold-400" />
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-gold-500/40 to-gold-500/10 mt-3" />
                  )}
                </div>
                <div className="pb-8 pt-2">
                  <span className="text-xs font-bold text-gold-600">{step.num}</span>
                  <h3 className="font-serif font-bold text-navy-900 mb-1">{t(step.key)}</h3>
                  <p className="text-sm text-slate-500">{t(`${step.key}Desc`)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
