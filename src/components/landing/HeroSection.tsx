"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Shield, FileText, CheckCircle, Users, Building2, Landmark, Globe, Award, Sparkles, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVICE_CATEGORIES } from "@/config/services-catalog";

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
              <Link href={`/${locale}/register`}>
                <Button size="lg" className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-bold text-base px-8 h-14 shadow-gold-glow transition-all duration-300 hover:scale-105 hover:shadow-xl w-full sm:w-auto relative overflow-hidden group">
                  <span className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Sparkles className="mr-2 h-5 w-5 relative z-10 animate-pulse" />
                  <span className="relative z-10">{locale === "uk" ? "Подати заявку" : "Submit Application"}</span>
                </Button>
              </Link>
              <Link href={`/${locale}/how-to-apply`}>
                <Button size="lg" variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/15 backdrop-blur-sm text-base px-8 h-14 transition-all duration-300 w-full sm:w-auto font-semibold">
                  {locale === "uk" ? "Як це працює" : "How It Works"}
                </Button>
              </Link>
            </div>

            {/* Value proposition under CTA */}
            <div className="flex flex-wrap items-center gap-4 mb-8 sm:mb-10">
              {[
                { icon: Clock, text: locale === "uk" ? "Відповідь за 24 год" : "Response in 24h" },
                { icon: CheckCircle, text: locale === "uk" ? "Жодного відхилення" : "Zero rejections" },
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
                { icon: Shield, text: locale === "uk" ? "RDNA / DaLA" : "RDNA / DaLA", color: "from-violet-500 to-purple-600" },
                { icon: CheckCircle, text: locale === "uk" ? "Стандарти ICC" : "ICC Standards", color: "from-amber-500 to-orange-500" },
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
                { icon: Users, text: locale === "uk" ? "Фізичним особам" : "Individuals", href: `/${locale}/individuals` },
                { icon: Building2, text: locale === "uk" ? "Бізнесу" : "Businesses", href: `/${locale}/business` },
                { icon: Landmark, text: locale === "uk" ? "Державі" : "Government", href: `/${locale}/government` },
                { icon: Globe, text: locale === "uk" ? "Міжнародним партнерам" : "International Partners", href: `/${locale}/international` },
              ].map((item) => (
                <Link key={item.text} href={item.href} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-white/50 hover:bg-white/10 hover:border-gold-500/30 hover:text-white/70 transition-all duration-300">
                  <item.icon className="h-3 w-3" />
                  <span>{item.text}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Glass card — RD4U categories */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              {/* Main glass card */}
              <div className="glass rounded-2xl p-8 shadow-2xl">
                <h3 className="font-serif text-xl font-bold text-white mb-2">
                  {locale === "uk" ? "Категорії заяв RD4U" : "RD4U Claim Categories"}
                </h3>
                <p className="text-xs text-white/50 mb-6">
                  {locale === "uk" ? "Готуємо висновки для кожної категорії" : "We prepare conclusions for each category"}
                </p>
                <div className="space-y-5">
                  {[
                    {
                      icon: "A1",
                      titleUk: "Житлова нерухомість",
                      titleEn: "Residential property",
                      descUk: "Квартири, будинки, дачі — документи власності + фото пошкоджень",
                      descEn: "Apartments, houses — ownership docs + damage photos",
                    },
                    {
                      icon: "A3",
                      titleUk: "Комерційна нерухомість",
                      titleEn: "Commercial property",
                      descUk: "Офіси, склади, обладнання — фінзвітність + упущена вигода",
                      descEn: "Offices, warehouses, equipment — financials + lost profits",
                    },
                    {
                      icon: "A3.6",
                      titleUk: "Окуповані території",
                      titleEn: "Occupied territories",
                      descUk: "Втрата доступу до майна — навіть без фізичних пошкоджень",
                      descEn: "Loss of access — even without physical damage",
                    },
                    {
                      icon: "ICC",
                      titleUk: "Передача до панелей ICC",
                      titleEn: "Transfer to ICC panels",
                      descUk: "Заявки з RD4U розглядатимуться фахівцями з damage assessment",
                      descEn: "RD4U claims reviewed by damage assessment specialists",
                    },
                  ].map((item) => (
                    <div key={item.icon} className="flex gap-4">
                      <div className="shrink-0 w-10 h-10 bg-gold-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-[10px] font-bold text-gold-400">{item.icon}</span>
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
                    <div className="text-2xl font-bold text-gold-400">DaLA</div>
                    <div className="text-xs text-white/50">{locale === "uk" ? "методика" : "method"}</div>
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
