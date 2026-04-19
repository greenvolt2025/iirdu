"use client";

import { useParams } from "next/navigation";
import { Star, Quote, Building2, ArrowLeft, ArrowRight, Award, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    nameUk: "Олександр Коваль",
    nameEn: "Oleksandr Koval",
    companyUk: "ТОВ «БудТехПром»",
    companyEn: "BudTechProm LLC",
    positionUk: "Генеральний директор",
    positionEn: "CEO",
    textUk: "Отримали науково-правовий висновок щодо збитків від воєнних дій за 10 днів. Господарський суд Києва прийняв без зауважень. Професійність команди МІВРУ вразила. Рекомендую!",
    textEn: "Received a scientific-legal conclusion on war damages in 10 days. Kyiv Commercial Court accepted without comments. IIRDU team's professionalism impressed us. Highly recommended!",
    rating: 5,
    amountUk: "€2.3M компенсації",
    amountEn: "€2.3M compensation",
    categoryUk: "Оцінка збитків",
    categoryEn: "Damage Assessment",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: 2,
    nameUk: "Марія Петренко",
    nameEn: "Mariia Petrenko",
    companyUk: "ПрАТ «ЕнергоІнвест»",
    companyEn: "EnergoInvest PJSC",
    positionUk: "Фінансовий директор",
    positionEn: "CFO",
    textUk: "Комплексна оцінка ризиків для проєкту EBRD виконана на найвищому рівні. Квантові обчислення дали нам конкурентну перевагу в тендері. Дякуємо за професіоналізм!",
    textEn: "Comprehensive risk assessment for EBRD project executed at the highest level. Quantum computing gave us a competitive edge in the tender. Thank you for professionalism!",
    rating: 5,
    amountUk: "€12M проєкт схвалено",
    amountEn: "€12M project approved",
    categoryUk: "Оцінка ризиків",
    categoryEn: "Risk Assessment",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: 3,
    nameUk: "John Smith",
    nameEn: "John Smith",
    companyUk: "European Bank (EBRD)",
    companyEn: "European Bank (EBRD)",
    positionUk: "Senior Investment Officer",
    positionEn: "Senior Investment Officer",
    textUk: "ESIA звіт для нашого проєкту в Україні відповідав всім міжнародним стандартам. Локальна експертиза, міжнародна якість, прийнятна ціна. Будемо співпрацювати далі.",
    textEn: "ESIA report for our project in Ukraine met all international standards. Local expertise, international quality, reasonable price. We will continue cooperation.",
    rating: 5,
    amountUk: "€8M інвестицій",
    amountEn: "€8M investment",
    categoryUk: "ESIA / Due Diligence",
    categoryEn: "ESIA / Due Diligence",
    color: "from-emerald-500 to-green-600",
  },
  {
    id: 4,
    nameUk: "Ірина Сидоренко",
    nameEn: "Iryna Sydorenko",
    companyUk: "ТОВ «АгроЕкспорт»",
    companyEn: "AgroExport LLC",
    positionUk: "Директор з експорту",
    positionEn: "Export Director",
    textUk: "CBAM верифікація для експорту до ЄС виконана швидко та якісно. Наші партнери в Німеччині прийняли звіт без питань. Ціна на 50% нижча за Big 4. Чудова робота!",
    textEn: "CBAM verification for EU export completed quickly and professionally. Our German partners accepted the report without questions. Price 50% lower than Big 4. Excellent work!",
    rating: 5,
    amountUk: "€450K економії",
    amountEn: "€450K savings",
    categoryUk: "EU Compliance",
    categoryEn: "EU Compliance",
    color: "from-violet-500 to-purple-600",
  },
];

const stats = [
  { numberUk: "500+", numberEn: "500+", labelUk: "Звітів підготовлено", labelEn: "Reports prepared" },
  { numberUk: "100%", numberEn: "100%", labelUk: "Прийнято з першого разу", labelEn: "Accepted first time" },
  { numberUk: "€50M+", numberEn: "€50M+", labelUk: "Компенсацій отримано", labelEn: "Compensations secured" },
  { numberUk: "40+", numberEn: "40+", labelUk: "Міжнародних партнерів", labelEn: "International partners" },
];

export default function TestimonialsSection() {
  const params = useParams();
  const locale = (params.locale as string) === "en" ? "en" : "uk";
  const [activeIndex, setActiveIndex] = useState(0);

  const t = {
    uk: {
      badge: "Відгуки клієнтів",
      title: "Що кажуть наші клієнти",
      subtitle: "Реальні результати від реальних компаній",
      prev: "Попередній",
      next: "Наступний",
    },
    en: {
      badge: "Client Testimonials",
      title: "What our clients say",
      subtitle: "Real results from real companies",
      prev: "Previous",
      next: "Next",
    },
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section className="section-padding bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-gold bg-grid-64 opacity-5" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-500/30 rounded-full text-xs font-medium text-gold-400 mb-4">
            <Award className="h-3.5 w-3.5" />
            {t[locale].badge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
            {t[locale].title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto mb-6 rounded-full" />
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            {t[locale].subtitle}
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6
                hover:bg-white/10 hover:border-gold-500/30 transition-all duration-500"
            >
              <div className="text-3xl lg:text-4xl font-bold text-gold-400 mb-2">
                {stat[`number${locale === "uk" ? "Uk" : "En"}` as keyof typeof stat]}
              </div>
              <div className="text-sm text-white/60">
                {stat[`label${locale === "uk" ? "Uk" : "En"}` as keyof typeof stat]}
              </div>
            </div>
          ))}
        </div>

        {/* Main testimonial carousel */}
        <div className="relative max-w-5xl mx-auto">
          {/* Quote icon */}
          <Quote className="absolute -top-8 -left-4 h-24 w-24 text-gold-500/10" />

          {/* Testimonial card */}
          <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 lg:p-12
            transition-all duration-700 ease-out">

            {/* Category badge */}
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
              bg-gradient-to-r ${activeTestimonial.color} text-white mb-6`}>
              {activeTestimonial[`category${locale === "uk" ? "Uk" : "En"}` as keyof typeof activeTestimonial]}
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(activeTestimonial.rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-gold-500 text-gold-500" />
              ))}
            </div>

            {/* Testimonial text */}
            <blockquote className="text-xl lg:text-2xl font-serif text-white/90 leading-relaxed mb-8 italic">
              &ldquo;{activeTestimonial[`text${locale === "uk" ? "Uk" : "En"}` as keyof typeof activeTestimonial]}&rdquo;
            </blockquote>

            {/* Author info */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                {/* Avatar with initials */}
                <div className="w-14 h-14 bg-gradient-to-br from-gold-500 to-gold-600 rounded-full
                  flex items-center justify-center text-navy-900 font-bold text-xl shadow-lg">
                  {String(activeTestimonial[`name${locale === "uk" ? "Uk" : "En"}` as keyof typeof activeTestimonial])
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </div>

                <div>
                  <div className="text-white font-bold text-lg">
                    {activeTestimonial[`name${locale === "uk" ? "Uk" : "En"}` as keyof typeof activeTestimonial]}
                  </div>
                  <div className="text-white/60 text-sm">
                    {activeTestimonial[`position${locale === "uk" ? "Uk" : "En"}` as keyof typeof activeTestimonial]}
                  </div>
                  <div className="text-white/40 text-sm flex items-center gap-2">
                    <Building2 className="h-3.5 w-3.5" />
                    {activeTestimonial[`company${locale === "uk" ? "Uk" : "En"}` as keyof typeof activeTestimonial]}
                  </div>
                </div>
              </div>

              {/* Result badge */}
              <div className="flex items-center gap-2 px-4 py-2 bg-gold-500/20 border border-gold-500/30 rounded-lg">
                <TrendingUp className="h-5 w-5 text-gold-400" />
                <span className="text-gold-400 font-bold">
                  {activeTestimonial[`amount${locale === "uk" ? "Uk" : "En"}` as keyof typeof activeTestimonial]}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="lg"
              onClick={handlePrev}
              className="border-white/20 text-white hover:bg-white/10 hover:border-gold-500/50
                transition-all duration-300 group"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              {t[locale].prev}
            </Button>

            {/* Dots indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "bg-gold-500 w-8"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="lg"
              onClick={handleNext}
              className="border-white/20 text-white hover:bg-white/10 hover:border-gold-500/50
                transition-all duration-300 group"
            >
              {t[locale].next}
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
