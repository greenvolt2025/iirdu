"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, Globe, Phone, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export default function Header() {
  const t = useTranslations("nav");
  const params = useParams();
  const locale = params.locale as string;
  const otherLocale = locale === "uk" ? "en" : "uk";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const serviceSubItems = [
    { href: `/${locale}/individuals`, label: locale === "uk" ? "Фізичним особам" : "For Individuals" },
    { href: `/${locale}/business`, label: locale === "uk" ? "Для бізнесу" : "For Business" },
    { href: `/${locale}/government`, label: locale === "uk" ? "Для держави та громад" : "For Government" },
    { href: `/${locale}/international`, label: locale === "uk" ? "Міжнародним партнерам" : "International Partners" },
    { href: `/${locale}#services`, label: locale === "uk" ? "Усі послуги" : "All Services" },
  ];

  const navItems = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/how-to-apply`, label: locale === "uk" ? "Як подати заявку" : "How to Apply" },
    { href: `/${locale}/pricing`, label: locale === "uk" ? "Ціни" : "Pricing" },
    { href: `/${locale}#about`, label: t("about") },
    { href: `/${locale}/contacts`, label: t("contacts") },
  ];

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${
      scrolled
        ? "bg-white/95 backdrop-blur-lg shadow-premium"
        : "bg-transparent"
    }`}>
      {/* Top bar */}
      <div className={`transition-all duration-500 overflow-hidden ${
        scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100"
      }`}>
        <div className="bg-navy-900/80 backdrop-blur-sm text-white text-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center h-9">
            <div className="flex items-center gap-5">
              <a href="tel:+380753698799" className="flex items-center gap-1.5 hover:text-gold-400 transition-colors">
                <Phone className="h-3 w-3" />
                <span>+380 75 369 8799</span>
              </a>
              <a href="mailto:iirdu@proton.me" className="hidden sm:flex items-center gap-1.5 hover:text-gold-400 transition-colors">
                <Mail className="h-3 w-3" />
                <span>iirdu@proton.me</span>
              </a>
            </div>
            <Link
              href={`/${otherLocale}`}
              className="flex items-center gap-1.5 hover:text-gold-400 transition-colors"
              aria-label={locale === "uk" ? "Змінити мову на English" : "Change language to Українська"}
            >
              <Globe className="h-3 w-3" />
              <span className="font-medium">{otherLocale === "uk" ? "Українська" : "English"}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl flex items-center justify-center shadow-gold-glow group-hover:scale-105 transition-transform duration-300">
              <span className="text-navy-900 font-serif font-bold text-lg">М</span>
            </div>
            <div className="hidden sm:block">
              <div className={`font-serif font-bold text-lg leading-tight transition-colors duration-300 ${scrolled ? "text-navy-900" : "text-white"}`}>
                МІВРУ
              </div>
              <div className={`text-[10px] leading-tight transition-colors duration-300 ${scrolled ? "text-slate-500" : "text-white/50"}`}>
                {locale === "uk" ? "Відновлення та розвиток" : "Reconstruction & Development"}
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {/* Home */}
            <Link
              href={navItems[0].href}
              className={`text-sm font-medium transition-colors relative group/nav ${
                scrolled ? "text-slate-600 hover:text-navy-900" : "text-white/80 hover:text-white"
              }`}
            >
              {navItems[0].label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover/nav:w-full" />
            </Link>

            {/* Services dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={`text-sm font-medium transition-colors relative group/nav flex items-center gap-1 ${
                  scrolled ? "text-slate-600 hover:text-navy-900" : "text-white/80 hover:text-white"
                }`}
              >
                {t("services")}
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover/nav:w-full" />
              </button>

              {/* Dropdown */}
              <div className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
                servicesOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
              }`}>
                <div className="bg-white rounded-xl shadow-2xl border border-slate-200 py-2 min-w-[220px]">
                  {serviceSubItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm text-slate-600 hover:text-navy-900 hover:bg-gold-50 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Hub, About, Contacts */}
            {navItems.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors relative group/nav ${
                  scrolled ? "text-slate-600 hover:text-navy-900" : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover/nav:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href={`/${locale}/register`} className="hidden sm:block">
              <Button size="sm" className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-semibold shadow-gold-glow transition-all duration-300 hover:scale-105">
                {locale === "uk" ? "Подати заявку" : "Apply Now"}
              </Button>
            </Link>
            {scrolled && (
              <Link
                href={`/${otherLocale}`}
                className="hidden md:flex items-center gap-1 text-xs text-slate-500 hover:text-navy-900 transition-colors"
                aria-label={locale === "uk" ? "Змінити мову на English" : "Change language to Українська"}
              >
                <Globe className="h-3.5 w-3.5" />
                {otherLocale === "uk" ? "UA" : "EN"}
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              className={`lg:hidden ${scrolled ? "" : "text-white hover:bg-white/10"}`}
              onClick={() => setOpen(true)}
              aria-label={locale === "uk" ? "Відкрити меню навігації" : "Open navigation menu"}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetContent side="right" className="w-[300px] bg-navy-900 border-none text-white p-6">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl flex items-center justify-center">
                    <span className="text-navy-900 font-serif font-bold text-lg">М</span>
                  </div>
                  <span className="font-serif font-bold text-lg">МІВРУ</span>
                </div>
                <nav className="flex flex-col gap-2">
                  {/* Home */}
                  <Link href={navItems[0].href} onClick={() => setOpen(false)} className="text-lg text-white/80 hover:text-gold-400 transition-colors py-2">
                    {navItems[0].label}
                  </Link>

                  {/* Services group */}
                  <div className="py-2">
                    <span className="text-lg text-white/80 font-medium">{t("services")}</span>
                    <div className="ml-4 mt-2 flex flex-col gap-1">
                      {serviceSubItems.map((item) => (
                        <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="text-sm text-white/60 hover:text-gold-400 transition-colors py-1.5">
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Hub, About, Contacts */}
                  {navItems.slice(1).map((item) => (
                    <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="text-lg text-white/80 hover:text-gold-400 transition-colors py-2">
                      {item.label}
                    </Link>
                  ))}

                  <hr className="border-white/10 my-4" />
                  <Link href={`/${locale}/login`} onClick={() => setOpen(false)}>
                    <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">{t("login")}</Button>
                  </Link>
                  <Link href={`/${locale}/orders/new`} onClick={() => setOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-navy-900 font-semibold mt-2">
                      {locale === "uk" ? "Залишити заявку" : "Submit Request"}
                    </Button>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
