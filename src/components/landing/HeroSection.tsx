"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Shield, FileText, CheckCircle, Users, Building2, Landmark, Globe, Award, Sparkles, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVICE_CATEGORIES } from "@/config/services-catalog";
import { siteConfig } from "@/config/site";

export default function HeroSection() {
  const t = useTranslations("hero");
  const params = useParams();
  const locale = params.locale as string;

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-gold bg-grid-64 opacity-20" />

      {/* Floating orbs */}
      <div className="absolute top-20 right-[15%] w-72 h-72 bg-gold-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-[10%] w-96 h-96 bg-navy-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-40 md:pb-28">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div className="animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/20 border border-gold-500/50 rounded-full mb-8 backdrop-blur-sm">
              <Shield className="h-4 w-4 text-gold-300" />
              <span className="text-sm font-medium text-gold-200">
                {locale === "uk" ? "Приватна наукова установа • ЄДРПОУ 45681824" : "Private Scientific Institution • EDRPOU 45681824"}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.1] mb-4">
              {locale === "uk" ? (
                <>
                  Науково-правові{" "}
                  <span className="text-gradient-gold">висновки</span> для{" "}
                  <span className="text-gradient-gold">відшкодування</span> збитків
                </>
              ) : (
                <>
                  Scientific-Legal{" "}
                  <span className="text-gradient-gold">Conclusions</span> for Damage{" "}
                  <span className="text-gradient-gold">Compensation</span>
                </>
              )}
            </h1>
            <p className="text-sm text-white/40 mb-4 font-medium">
              {locale === "uk" ? "МІВРУ — Міжнародний інститут відновлення та розвитку України" : "IIRDU — International Institute for Reconstruction & Development of Ukraine"}
            </p>

            <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed mb-8 sm:mb-10 max-w-xl">
              {t("subtitle")}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
              <a href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(locale === "uk" ? "Запит на науково-правовий висновок" : "Request for Scientific-Legal Conclusion")}&body=${encodeURIComponent(locale === "uk" ? "Доброго дня!\n\nПрошу підготувати науково-правовий висновок.\n\nТип об'єкта: [квартира/будинок/інше]\nАдреса: \nОпис ситуації: \n\nДякую!" : "Hello,\n\nI would like to request a scientific-legal conclusion.\n\nProperty type: [apartment/house/other]\nAddress: \nDescription: \n\nThank you!")}`}>
                <Button size="lg" className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-bold text-base px-8 h-14 shadow-gold-glow transition-all duration-300 hover:scale-105 hover:shadow-xl w-full sm:w-auto relative overflow-hidden group">
                  <span className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Sparkles className="mr-2 h-5 w-5 relative z-10 animate-pulse" />
                  <span className="relative z-10">{locale === "uk" ? "Написати лист" : "Send Email"}</span>
                </Button>
              </a>
              <Link href={`/${locale}#services`}>
                <Button size="lg" variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/15 backdrop-blur-sm text-base px-8 h-14 transition-all duration-300 w-full sm:w-auto font-semibold">
                  {t("ctaSecondary")}
                </Button>
              </Link>
            </div>

            {/* Value proposition under CTA */}
            <div className="flex flex-wrap items-center gap-4 mb-8 sm:mb-10">
              {[
                { icon: Clock, text: locale === "uk" ? "Відповідь за 24 год" : "Response in 24h" },
                { icon: CheckCircle, text: locale === "uk" ? "100% прийнято" : "100% accepted" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-white/70">
                  <item.icon className="h-4 w-4 text-gold-400" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Award, text: "ISO 31000", color: "from-blue-500 to-indigo-600" },
                { icon: Globe, text: "World Bank RDNA", color: "from-emerald-500 to-green-600" },
                { icon: Shield, text: locale === "uk" ? "500+ звітів" : "500+ reports", color: "from-violet-500 to-purple-600" },
                { icon: CheckCircle, text: locale === "uk" ? "Прийнято в ICC" : "Accepted by ICC", color: "from-amber-500 to-orange-500" },
              ].map((badge, i) => (
                <div
                  key={i}
                  className={`group px-4 py-2 bg-gradient-to-r ${badge.color} bg-opacity-10 backdrop-blur-sm
                    border border-white/20 rounded-lg flex items-center gap-2
                    hover:border-gold-500/50 hover:scale-105 transition-all duration-300 cursor-default`}
                >
                  <badge.icon className="h-4 w-4 text-gold-400 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="text-white/90 text-sm font-medium">{badge.text}</span>
                </div>
              ))}
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6">
              {[
                { icon: FileText, text: locale === "uk" ? `${SERVICE_CATEGORIES.reduce((sum, c) => sum + c.services.length, 0)}+ видів висновків` : `${SERVICE_CATEGORIES.reduce((sum, c) => sum + c.services.length, 0)}+ conclusion types` },
                { icon: Shield, text: locale === "uk" ? "Методика RDNA/DaLA" : "RDNA/DaLA methodology" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-sm text-white/60">
                  <item.icon className="h-4 w-4 text-gold-500" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Target audience */}
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { icon: Users, text: locale === "uk" ? "Фізичним особам" : "Individuals" },
                { icon: Building2, text: locale === "uk" ? "Бізнесу" : "Businesses" },
                { icon: Landmark, text: locale === "uk" ? "Державі" : "Government" },
                { icon: Globe, text: locale === "uk" ? "Міжнародним партнерам" : "International Partners" },
              ].map((item) => (
                <div key={item.text} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-white/50">
                  <item.icon className="h-3 w-3" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Glass card — How it works */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              {/* Main glass card */}
              <div className="glass rounded-2xl p-8 shadow-2xl">
                <h3 className="font-serif text-xl font-bold text-white mb-6">
                  {locale === "uk" ? "Як отримати висновок" : "How to get a conclusion"}
                </h3>
                <div className="space-y-5">
                  {[
                    {
                      step: "01",
                      titleUk: "Завантажте документи",
                      titleEn: "Upload documents",
                      descUk: "Фото, скани, акти, договори — через захищений канал",
                      descEn: "Photos, scans, acts, contracts — via secure channel",
                    },
                    {
                      step: "02",
                      titleUk: "Аналіз документів",
                      titleEn: "Document analysis",
                      descUk: "Наші фахівці аналізують та готують проєкт висновку",
                      descEn: "Our experts analyze and prepare a draft conclusion",
                    },
                    {
                      step: "03",
                      titleUk: "Верифікація",
                      titleEn: "Verification",
                      descUk: "Науковий співробітник верифікує за ДСТУ 3008:2015",
                      descEn: "Scientific researcher verifies per DSTU 3008:2015",
                    },
                    {
                      step: "04",
                      titleUk: "Отримайте НПВ",
                      titleEn: "Receive the conclusion",
                      descUk: "Науково-правовий висновок за ДСТУ 3008:2015 у PDF",
                      descEn: "Scientific-legal conclusion per DSTU 3008:2015 in PDF",
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="shrink-0 w-10 h-10 bg-gold-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold text-gold-400">{item.step}</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">
                          {locale === "uk" ? item.titleUk : item.titleEn}
                        </h4>
                        <p className="text-xs text-white/50 mt-0.5">
                          {locale === "uk" ? item.descUk : item.descEn}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gold-400">{SERVICE_CATEGORIES.reduce((sum, c) => sum + c.services.length, 0)}+</div>
                    <div className="text-xs text-white/50">{locale === "uk" ? "висновків" : "conclusions"}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gold-400">{SERVICE_CATEGORIES.length}</div>
                    <div className="text-xs text-white/50">{locale === "uk" ? "напрямків" : "areas"}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gold-400">AI</div>
                    <div className="text-xs text-white/50">{locale === "uk" ? "генерація" : "generation"}</div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 glass rounded-xl px-4 py-3 shadow-xl animate-float" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Shield className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">SimpleX</div>
                    <div className="text-[10px] text-white/50">{locale === "uk" ? "Захищений канал" : "Secure channel"}</div>
                  </div>
                </div>
              </div>
            </div>
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
  );
}
