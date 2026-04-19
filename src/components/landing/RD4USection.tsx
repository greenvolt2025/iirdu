"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Quote, FileCheck, ArrowRight, Globe, ClipboardList, FileText, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const quotes = [
  { key: "quote1", sourceKey: "quote1Source" },
  { key: "quote2", sourceKey: "quote2Source" },
  { key: "quote3", sourceKey: "quote3Source" },
] as const;

const facts = [
  { key: "fact1", icon: FileCheck },
  { key: "fact2", icon: Globe },
  { key: "fact3", icon: ClipboardList },
  { key: "fact4", icon: FileText },
] as const;

export default function RD4USection() {
  const t = useTranslations("rd4u");
  const params = useParams();
  const locale = params.locale as string;

  return (
    <section id="rd4u" className="section-padding bg-navy-900 text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-gold bg-grid-64 opacity-10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-500/30 rounded-full text-xs font-medium text-gold-400 mb-4">
            {locale === "uk" ? "Реєстр збитків" : "Register of Damage"}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
            {t("title")}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto mb-6 rounded-full" />
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Evidence importance highlight */}
        <div className="relative bg-gradient-to-r from-gold-500/10 to-gold-600/10 border border-gold-500/30 rounded-2xl p-8 md:p-10 mb-12">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-gold-400" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-white text-lg mb-3">{t("evidenceTitle")}</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-3">{t("evidenceDesc")}</p>
              <cite className="text-gold-400 text-xs font-medium not-italic">— {t("evidenceSource")}</cite>
            </div>
          </div>
        </div>

        {/* Quotes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {quotes.map((q) => (
            <div
              key={q.key}
              className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6
                hover:bg-white/[0.08] hover:border-gold-500/30 transition-all duration-500"
            >
              <Quote className="h-8 w-8 text-gold-500/30 mb-4" />
              <blockquote className="text-white/80 text-sm leading-relaxed mb-4 italic">
                &ldquo;{t(q.key)}&rdquo;
              </blockquote>
              <cite className="text-gold-400 text-xs font-medium not-italic">
                — {t(q.sourceKey)}
              </cite>
            </div>
          ))}
        </div>

        {/* Facts grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {facts.map((fact) => {
            const Icon = fact.icon;
            return (
              <div
                key={fact.key}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6
                  hover:bg-white/[0.08] hover:border-gold-500/30 transition-all duration-500"
              >
                <div className="w-10 h-10 bg-gold-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-gold-400" />
                </div>
                <h4 className="font-serif font-bold text-white mb-2 text-sm">
                  {t(`${fact.key}Title`)}
                </h4>
                <p className="text-white/50 text-xs leading-relaxed">
                  {t(`${fact.key}Desc`)}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a href="mailto:iirdu@proton.me">
            <Button
              size="lg"
              className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700
                text-navy-900 font-bold text-base px-8 h-14
                shadow-gold-glow transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {t("cta")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
