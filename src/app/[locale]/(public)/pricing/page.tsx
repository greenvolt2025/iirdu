"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowRight,
  Home,
  Building2,
  FileText,
  MessageCircle,
  CheckCircle,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { generateServiceSchema } from "@/config/seo";

// ── Content ─────────────────────────────────────────────────────────────────

const uk = {
  heroBadge: "Тарифи",
  heroTitle: "Вартість науково-правових висновків",
  heroSubtitle:
    "Прозорі ціни на оцінку збитків для приватних осіб. Для бізнесу, держави та міжнародних партнерів — індивідуальний розрахунок залежно від обсягу та складності.",

  mainBadge: "Для фізичних осіб",
  mainTitle: "Базові тарифи",
  mainDescription:
    "Фіксована ціна для житлової нерухомості. Оплата після підтвердження замовлення. Термін виконання 7–14 робочих днів.",

  apartmentTitle: "Квартира",
  apartmentPrice: `${siteConfig.pricing.apartment} ${siteConfig.pricing.currency}`,
  apartmentDesc: "Однокімнатна, багатокімнатна, студія",
  apartmentFeatures: [
    "Оцінка пошкоджень за методикою RDNA/DaLA",
    "Розрахунок вартості відновлення",
    "Висновок для RD4U та ICC (PDF)",
    "Супровід при поданні документів",
  ],

  houseTitle: "Будинок",
  housePrice: `${siteConfig.pricing.house} ${siteConfig.pricing.currency}`,
  houseDesc: "Приватний будинок, дача, котедж",
  houseFeatures: [
    "Оцінка пошкоджень за методикою RDNA/DaLA",
    "Розрахунок вартості відновлення",
    "Висновок для RD4U та ICC (PDF)",
    "Додаток із фотофіксацією",
  ],

  additionalBadge: "Додаткові послуги",
  additionalTitle: "Індивідуальні звіти",
  additionalDescription:
    "Вартість залежить від складності об'єкта, обсягу документів та термінів. Безкоштовна консультація для розрахунку остаточної ціни.",

  consultationLabel: "Консультація",
  consultationPrice: `${siteConfig.pricing.consultation.min}–${siteConfig.pricing.consultation.max} ${siteConfig.pricing.currency}`,
  consultationDesc: "Попередня оцінка, роз'яснення порядку",

  simpleLabel: "Простий звіт",
  simplePrice: `${siteConfig.pricing.simpleReport.min}–${siteConfig.pricing.simpleReport.max} ${siteConfig.pricing.currency}`,
  simpleDesc: "Транспорт, обладнання, меблі",

  complexLabel: "Комплексний звіт",
  complexPrice: `${siteConfig.pricing.complexReport.min}–${siteConfig.pricing.complexReport.max} ${siteConfig.pricing.currency}`,
  complexDesc: "Комерційна нерухомість, бізнес",

  expertLabel: "Експертний звіт",
  expertPrice: `${siteConfig.pricing.expertReport.min}–${siteConfig.pricing.expertReport.max} ${siteConfig.pricing.currency}`,
  expertDesc: "Інфраструктура, промисловість, складні активи",

  lostProfitLabel: siteConfig.pricing.lostProfitAddon.label,
  lostProfitPrice: `${siteConfig.pricing.lostProfitAddon.min}–${siteConfig.pricing.lostProfitAddon.max} ${siteConfig.pricing.currency}`,

  infoBadge: "Важливо",
  infoTitle: "Порядок оплати та гарантії",
  infoPoints: [
    "Оплата 50% при підтвердженні замовлення, 50% після отримання висновку",
    "Оплата через WayForPay (UAH/USD/EUR) або LiqPay",
    "Банківський переказ для юридичних осіб та міжнародних клієнтів (SWIFT)",
    "Гарантія відповідності вимогам RD4U та ICC",
    "Безкоштовні правки протягом 14 днів після отримання",
  ],

  ctaTitle: "Готові замовити висновок?",
  ctaDescription:
    "Залиште заявку — наш фахівець зв'яжеться з вами протягом робочого дня для уточнення деталей та підтвердження вартості.",
  ctaButton: "Завантажити документи",
  ctaSecondary: "Запитати ціну",
};

const en = {
  heroBadge: "Pricing",
  heroTitle: "Scientific-Legal Conclusion Costs",
  heroSubtitle:
    "Transparent pricing for damage assessment for individuals. For businesses, government, and international partners — individual calculation based on scope and complexity.",

  mainBadge: "For Individuals",
  mainTitle: "Base Rates",
  mainDescription:
    "Fixed price for residential property. Payment after order confirmation. Delivery time 7–14 business days.",

  apartmentTitle: "Apartment",
  apartmentPrice: `${siteConfig.pricing.apartment} ${siteConfig.pricing.currency}`,
  apartmentDesc: "One-room, multi-room, studio",
  apartmentFeatures: [
    "RDNA/DaLA damage assessment",
    "Restoration cost calculation",
    "Conclusion for RD4U and ICC (PDF)",
    "Document submission support",
  ],

  houseTitle: "House",
  housePrice: `${siteConfig.pricing.house} ${siteConfig.pricing.currency}`,
  houseDesc: "Private house, cottage, dacha",
  houseFeatures: [
    "RDNA/DaLA damage assessment",
    "Restoration cost calculation",
    "Conclusion for RD4U and ICC (PDF)",
    "Photo documentation appendix",
  ],

  additionalBadge: "Additional Services",
  additionalTitle: "Custom Reports",
  additionalDescription:
    "Cost depends on object complexity, document volume, and deadlines. Free consultation for final price calculation.",

  consultationLabel: "Consultation",
  consultationPrice: `${siteConfig.pricing.consultation.min}–${siteConfig.pricing.consultation.max} ${siteConfig.pricing.currency}`,
  consultationDesc: "Preliminary assessment, process explanation",

  simpleLabel: "Simple Report",
  simplePrice: `${siteConfig.pricing.simpleReport.min}–${siteConfig.pricing.simpleReport.max} ${siteConfig.pricing.currency}`,
  simpleDesc: "Vehicles, equipment, furniture",

  complexLabel: "Complex Report",
  complexPrice: `${siteConfig.pricing.complexReport.min}–${siteConfig.pricing.complexReport.max} ${siteConfig.pricing.currency}`,
  complexDesc: "Commercial property, business",

  expertLabel: "Expert Report",
  expertPrice: `${siteConfig.pricing.expertReport.min}–${siteConfig.pricing.expertReport.max} ${siteConfig.pricing.currency}`,
  expertDesc: "Infrastructure, industry, complex assets",

  lostProfitLabel: "Lost Profits Calculation — Additional",
  lostProfitPrice: `${siteConfig.pricing.lostProfitAddon.min}–${siteConfig.pricing.lostProfitAddon.max} ${siteConfig.pricing.currency}`,

  infoBadge: "Important",
  infoTitle: "Payment Terms and Guarantees",
  infoPoints: [
    "50% payment upon order confirmation, 50% after receiving conclusion",
    "Payment via WayForPay (UAH/USD/EUR) or LiqPay",
    "Bank transfer for legal entities and international clients (SWIFT)",
    "Guarantee of compliance with RD4U and ICC requirements",
    "Free revisions within 14 days after delivery",
  ],

  ctaTitle: "Ready to order a conclusion?",
  ctaDescription:
    "Submit a request — our specialist will contact you within one business day to clarify details and confirm the cost.",
  ctaButton: "Upload Documents",
  ctaSecondary: "Request a Quote",
};

// ── Component ───────────────────────────────────────────────────────────────

export default function PricingPage() {
  const params = useParams();
  const locale = (params.locale as string) === "en" ? "en" : "uk";
  const t = locale === "uk" ? uk : en;

  // JSON-LD structured data for pricing
  const apartmentService = generateServiceSchema(
    t.apartmentTitle,
    t.apartmentDesc,
    { min: siteConfig.pricing.apartment, currency: siteConfig.pricing.currency },
    locale
  );

  const houseService = generateServiceSchema(
    t.houseTitle,
    t.houseDesc,
    { min: siteConfig.pricing.house, currency: siteConfig.pricing.currency },
    locale
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(apartmentService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(houseService) }}
      />
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-radial-gold">
        <div className="absolute inset-0 bg-grid-gold bg-grid-64 opacity-40" />
        <div className="absolute top-20 right-[15%] w-72 h-72 bg-gold-500/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 left-[10%] w-96 h-96 bg-navy-600/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/10 border border-gold-500/30 rounded-full mb-8">
              <FileText className="h-4 w-4 text-gold-400" />
              <span className="text-sm font-medium text-gold-400">
                {t.heroBadge}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.1] mb-6">
              {t.heroTitle}
            </h1>

            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
              {t.heroSubtitle}
            </p>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ── Base Pricing ──────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-50 border border-gold-200 rounded-full text-xs font-medium text-gold-700 mb-4">
              {t.mainBadge}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-900 mb-4">
              {t.mainTitle}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto mb-6 rounded-full" />
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              {t.mainDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Apartment Card */}
            <Card className="group border-slate-200 hover:shadow-2xl hover:shadow-navy-900/10 hover:-translate-y-1 hover:border-gold-500/50 transition-all duration-500 overflow-hidden">
              <CardHeader className="bg-gradient-to-br from-navy-900 to-navy-800 text-white pb-8">
                <div className="w-14 h-14 bg-gold-500/10 rounded-xl flex items-center justify-center mb-4">
                  <Home className="h-7 w-7 text-gold-400" />
                </div>
                <CardTitle className="font-serif text-2xl mb-2">
                  {t.apartmentTitle}
                </CardTitle>
                <p className="text-white/60 text-sm">{t.apartmentDesc}</p>
                <div className="mt-6">
                  <div className="text-4xl font-serif font-bold text-white">
                    {t.apartmentPrice}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-8">
                <ul className="space-y-3">
                  {t.apartmentFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* House Card */}
            <Card className="group border-slate-200 hover:shadow-2xl hover:shadow-navy-900/10 hover:-translate-y-1 hover:border-gold-500/50 transition-all duration-500 overflow-hidden">
              <CardHeader className="bg-gradient-to-br from-gold-600 to-gold-700 text-white pb-8">
                <div className="w-14 h-14 bg-navy-900/10 rounded-xl flex items-center justify-center mb-4">
                  <Building2 className="h-7 w-7 text-navy-900" />
                </div>
                <CardTitle className="font-serif text-2xl mb-2 text-navy-900">
                  {t.houseTitle}
                </CardTitle>
                <p className="text-navy-900/70 text-sm">{t.houseDesc}</p>
                <div className="mt-6">
                  <div className="text-4xl font-serif font-bold text-navy-900">
                    {t.housePrice}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-8">
                <ul className="space-y-3">
                  {t.houseFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Additional Services ───────────────────────────────────────── */}
      <section className="section-padding bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-gold bg-dot-32 opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-50 border border-gold-200 rounded-full text-xs font-medium text-gold-700 mb-4">
              {t.additionalBadge}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-900 mb-4">
              {t.additionalTitle}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto mb-6 rounded-full" />
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              {t.additionalDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: t.consultationLabel, price: t.consultationPrice, desc: t.consultationDesc },
              { label: t.simpleLabel, price: t.simplePrice, desc: t.simpleDesc },
              { label: t.complexLabel, price: t.complexPrice, desc: t.complexDesc },
              { label: t.expertLabel, price: t.expertPrice, desc: t.expertDesc },
              { label: t.lostProfitLabel, price: t.lostProfitPrice, desc: "" },
            ].map((item, i) => (
              <Card
                key={i}
                className="group border-slate-200 hover:shadow-2xl hover:shadow-navy-900/10 hover:-translate-y-1 hover:border-gold-500/50 transition-all duration-500"
              >
                <CardHeader>
                  <CardTitle className="font-serif text-navy-900 text-lg">
                    {item.label}
                  </CardTitle>
                  {item.desc && (
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-serif font-bold text-gold-600">
                    {item.price}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Payment Info ──────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-50 border border-gold-200 rounded-full text-xs font-medium text-gold-700 mb-4">
              <Info className="h-3.5 w-3.5" />
              {t.infoBadge}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-900 mb-4">
              {t.infoTitle}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto rounded-full" />
          </div>

          <div className="max-w-3xl mx-auto bg-slate-50 rounded-2xl border border-slate-200 p-8 md:p-12">
            <ul className="space-y-4">
              {t.infoPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-gold-500/20 rounded-full flex items-center justify-center mt-0.5">
                    <CheckCircle className="h-4 w-4 text-gold-600" />
                  </div>
                  <p className="text-slate-600 leading-relaxed">{point}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 relative">
          <div className="absolute inset-0 bg-grid-gold bg-grid-64 opacity-20" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-6">
                {t.ctaTitle}
              </h2>
              <p className="text-lg text-slate-300 mb-10 max-w-xl mx-auto">
                {t.ctaDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/${locale}/orders/new`}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-bold text-base px-10 h-14 shadow-gold-glow transition-all duration-300 hover:scale-105"
                  >
                    {t.ctaButton}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href={`/${locale}/contacts`}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 text-base px-10 h-14"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    {t.ctaSecondary}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
