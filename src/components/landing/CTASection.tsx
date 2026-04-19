"use client";

import { useParams } from "next/navigation";
import {
  ArrowRight,
  MessageCircle,
  Shield,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const uk = {
  title: "Завантажте документи — отримайте висновок",
  subtitle:
    "Завантажте необхідні документи через захищений канал. Наші фахівці підготують науково-правовий висновок за методикою RDNA/DaLA Світового банку. Якщо документів недостатньо — повідомимо.",
  ctaPrimary: "Завантажити документи",
  ctaSecondary: "Переглянути напрямки",
  trustConfidential: "Конфіденційність гарантована",
  trustResponse: "Відповідь протягом 24 годин",
};

const en = {
  title: "Upload documents — get a conclusion",
  subtitle:
    "Upload necessary documents via a secure channel. Our experts will prepare a scientific-legal conclusion using the World Bank RDNA/DaLA methodology. If documents are insufficient — we'll let you know.",
  ctaPrimary: "Upload Documents",
  ctaSecondary: "View Directions",
  trustConfidential: "Confidentiality guaranteed",
  trustResponse: "Response within 24 hours",
};

const trustIndicators = [
  { key: "trustConfidential" as const, icon: Shield },
  { key: "trustResponse" as const, icon: Clock },
];

export default function CTASection() {
  const params = useParams();
  const locale = params.locale as string;
  const t = locale === "uk" ? uk : en;

  return (
    <section className="relative overflow-hidden">
      <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 relative">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-grid-gold bg-grid-64 opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-6">
              {t.title}
            </h2>

            {/* Subtitle */}
            <p className="text-lg text-slate-300 mb-10 max-w-xl mx-auto leading-relaxed">
              {t.subtitle}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href="mailto:iirdu@proton.me">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-bold text-base px-10 h-14 shadow-gold-glow transition-all duration-300 hover:scale-105"
                >
                  <ArrowRight className="mr-2 h-5 w-5" />
                  {t.ctaPrimary}
                </Button>
              </a>
              <a href="#contacts">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 text-base px-10 h-14"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {t.ctaSecondary}
                </Button>
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
              {trustIndicators.map((indicator) => {
                const Icon = indicator.icon;
                return (
                  <div
                    key={indicator.key}
                    className="flex items-center gap-2 text-sm text-white/60"
                  >
                    <Icon className="h-4 w-4 text-gold-500" />
                    <span>{t[indicator.key]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
