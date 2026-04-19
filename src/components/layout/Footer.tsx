"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Phone, Mail, MapPin, Send, Shield, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Footer() {
  const t = useTranslations();
  const params = useParams();
  const locale = params.locale as string;

  const services = [
    "damageAssessment",
    "euCompliance",
    "riskAssessment",
    "economicAnalysis",
    "legalSupport",
  ];

  return (
    <footer className="relative bg-navy-900 text-white overflow-hidden" id="contacts">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-gold bg-grid-64 opacity-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 py-16 md:py-20">
          {/* About */}
          <div className="lg:col-span-2 lg:pr-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl flex items-center justify-center shadow-gold-glow">
                <span className="text-navy-900 font-serif font-bold text-lg">М</span>
              </div>
              <div>
                <div className="font-serif font-bold text-lg">МІВРУ</div>
                <div className="text-xs text-white/40">
                  {locale === "uk"
                    ? "Відновлення та розвиток"
                    : "Reconstruction & Development"}
                </div>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-md mb-6">
              {locale === "uk"
                ? "Міжнародний інститут відновлення та розвитку України. Комплексні звіти за методикою RDNA для RD4U та ICC. ЄДРПОУ 45681824."
                : "International Institute for Reconstruction and Development of Ukraine. Comprehensive RDNA reports for RD4U and ICC. EDRPOU 45681824."}
            </p>
            <div className="flex items-center gap-2 text-xs text-white/40">
              <Shield className="h-3.5 w-3.5 text-green-400" />
              <span>{locale === "uk" ? "E2E шифрування через SimpleX" : "E2E encryption via SimpleX"}</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif font-bold text-gold-400 mb-5 text-sm uppercase tracking-wider">
              {t("nav.services")}
            </h3>
            <ul className="space-y-3">
              {services.map((key) => (
                <li key={key}>
                  <Link
                    href={`/${locale}#services`}
                    className="group/link flex items-center gap-1.5 text-sm text-white/50 hover:text-gold-400 transition-colors duration-300"
                  >
                    <span>{t(`services.${key}`)}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover/link:opacity-100 group-hover/link:translate-y-0 group-hover/link:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-serif font-bold text-gold-400 mb-5 text-sm uppercase tracking-wider">
              {t("nav.contacts")}
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors duration-300"
                  aria-label={locale === "uk" ? "Подзвонити" : "Call us"}
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <Phone className="h-3.5 w-3.5 text-gold-500" />
                  </div>
                  <span>{siteConfig.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors duration-300"
                  aria-label={locale === "uk" ? "Написати email" : "Send email"}
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <Mail className="h-3.5 w-3.5 text-gold-500" />
                  </div>
                  <span>{siteConfig.email}</span>
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/50">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <MapPin className="h-3.5 w-3.5 text-gold-500" />
                </div>
                <span>{locale === "uk" ? "м. Київ, Україна" : "Kyiv, Ukraine"}</span>
              </li>
              <li>
                <a
                  href={siteConfig.social.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors duration-300"
                  aria-label={locale === "uk" ? "Telegram канал (відкривається в новому вікні)" : "Telegram channel (opens in new window)"}
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                    <Send className="h-3.5 w-3.5 text-gold-500" />
                  </div>
                  <span>@iirdu_org</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} МІВРУ. {t("footer.rights")}.
          </p>
          <div className="flex gap-6">
            <Link href={`/${locale}/privacy`} className="text-xs text-white/30 hover:text-gold-400 transition-colors duration-300">
              {t("footer.privacy")}
            </Link>
            <Link href={`/${locale}/terms`} className="text-xs text-white/30 hover:text-gold-400 transition-colors duration-300">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
