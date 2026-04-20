"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Globe, CheckCircle, ArrowRight,
  Scale, BarChart3, Leaf,
  AlertCircle, HelpCircle, ShieldCheck, Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export default function InternationalPage() {
  const params = useParams();
  const locale = params.locale as string;
  const uk = locale === "uk";

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-navy-900 to-navy-800 pt-32 pb-20">
        <div className="absolute inset-0 bg-grid-gold bg-grid-64 opacity-10" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-400/40 rounded-full mb-6">
                <Globe className="h-4 w-4 text-emerald-300" />
                <span className="text-sm font-medium text-emerald-200">{uk ? "Для міжнародних партнерів" : "For International Partners"}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-tight mb-4">
                {uk ? (
                  <><span className="text-gradient-gold">Due Diligence</span> та відповідність для відновлення України</>
                ) : (
                  <><span className="text-gradient-gold">Due Diligence</span> & Compliance for Ukraine&apos;s Reconstruction</>
                )}
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-lg">
                {uk
                  ? "CSRD/ESG, DORA/NIS2, CSDDD, ESIA, CBAM — комплексна перевірка відповідності для інвесторів, DFI та компаній, що беруть участь у відновленні."
                  : "CSRD/ESG, DORA/NIS2, CSDDD, ESIA, CBAM — comprehensive compliance verification for investors, DFIs, and companies participating in reconstruction."}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={`/${locale}/register`}>
                  <Button size="lg" className="bg-gradient-to-r from-gold-500 to-gold-600 text-navy-900 font-bold px-8 h-14 w-full sm:w-auto">
                    {uk ? "Подати заявку" : "Submit Application"} <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Due Diligence inquiry — international partner")}`}>
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 h-14 w-full sm:w-auto">
                    {uk ? "Зв'язатися" : "Contact Us"}
                  </Button>
                </a>
              </div>
            </div>
            <div className="glass rounded-2xl p-8">
              <h3 className="font-serif text-xl font-bold text-white mb-6">{uk ? "Регуляторні фреймворки" : "Regulatory Frameworks"}</h3>
              {[
                { code: "CSRD / ESG", desc: uk ? "Корпоративна звітність сталого розвитку" : "Corporate Sustainability Reporting Directive" },
                { code: "DORA / NIS2", desc: uk ? "Цифрова операційна стійкість, кібербезпека" : "Digital Operational Resilience, Cybersecurity" },
                { code: "CSDDD", desc: uk ? "Due Diligence ланцюгів постачання" : "Supply Chain Due Diligence" },
                { code: "CBAM", desc: uk ? "Транскордонне регулювання вуглецю" : "Carbon Border Adjustment Mechanism" },
                { code: "ESIA", desc: uk ? "Оцінка впливу на довкілля та суспільство" : "Environmental & Social Impact Assessment" },
                { code: "EU AI Act", desc: uk ? "Оцінка ризиків AI-систем" : "AI System Risk Assessment" },
              ].map((fw, i) => (
                <div key={i} className="flex items-center gap-4 py-2.5 border-b border-white/10 last:border-0">
                  <span className="text-xs font-mono font-bold text-gold-400 w-24 shrink-0">{fw.code}</span>
                  <span className="text-xs text-white/60">{fw.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full"><path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="white" /></svg>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="font-serif font-bold text-2xl text-navy-900 mb-8">{uk ? "Послуги для міжнародних партнерів" : "Services for International Partners"}</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {(uk ? [
            { icon: ShieldCheck, title: "Due Diligence для реконструкції", desc: "Комплексна перевірка проєктів відновлення: антикорупційні ризики, прозорість фінансування, відповідність стандартам донорів.", color: "emerald" },
            { icon: Leaf, title: "ESIA для донорських проєктів", desc: "Environmental & Social Impact Assessment для EBRD, EIB, JICA. Обов'язкова умова фінансування. Включає план мінімізації впливу.", color: "green" },
            { icon: Scale, title: "Оцінка ризиків (ISO 31000)", desc: "Ризики проєкту за ISO 31000, COSO ERM, FAIR. Кількісна оцінка фінансових ризиків для інвесторів.", color: "blue" },
            { icon: BarChart3, title: "ESG / CSRD звітність", desc: "Підготовка звітів відповідності CSRD/ESG для європейських інвесторів та материнських компаній.", color: "violet" },
            { icon: Globe, title: "Доступ до ринку ЄС", desc: "CBAM верифікація, CSDDD ланцюги постачання, EUDR, PPWR, EU Battery Regulation для українських експортерів.", color: "sky" },
            { icon: Briefcase, title: "Аналіз контрактів", desc: "Міжнародні контракти реконструкції, угоди з донорами, government-to-government agreements.", color: "indigo" },
          ] : [
            { icon: ShieldCheck, title: "Reconstruction Due Diligence", desc: "Comprehensive verification of reconstruction projects: anti-corruption risks, funding transparency, donor standard compliance.", color: "emerald" },
            { icon: Leaf, title: "ESIA for Donor Projects", desc: "Environmental & Social Impact Assessment for EBRD, EIB, JICA. Required for financing. Includes impact mitigation plan.", color: "green" },
            { icon: Scale, title: "Risk Assessment (ISO 31000)", desc: "Project risks per ISO 31000, COSO ERM, FAIR. Quantitative financial risk assessment for investors.", color: "blue" },
            { icon: BarChart3, title: "ESG / CSRD Reporting", desc: "CSRD/ESG compliance report preparation for European investors and parent companies.", color: "violet" },
            { icon: Globe, title: "EU Market Access", desc: "CBAM verification, CSDDD supply chains, EUDR, PPWR, EU Battery Regulation for Ukrainian exporters.", color: "sky" },
            { icon: Briefcase, title: "Contract Analysis", desc: "International reconstruction contracts, donor agreements, government-to-government agreements.", color: "indigo" },
          ]).map((svc, i) => (
            <div key={i} className={`p-6 rounded-xl border border-slate-200 bg-white hover:shadow-lg transition-shadow border-l-4 border-l-${svc.color}-500`}>
              <svc.icon className={`h-8 w-8 text-${svc.color}-500 mb-3`} />
              <h3 className="font-serif font-bold text-navy-900 mb-2">{svc.title}</h3>
              <p className="text-sm text-slate-600">{svc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Documents */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif font-bold text-2xl text-navy-900 mb-8">{uk ? "Необхідні документи" : "Required Documents"}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-navy-900 mb-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" /> {uk ? "Обов'язкові" : "Required"}
              </h3>
              {(uk ? [
                "Реєстраційні документи організації",
                "Опис проєкту відновлення / інвестиції",
                "Фінансова звітність (останні 3 роки)",
                "Опис ланцюга постачання (для CSDDD)",
                "Контракти та угоди з партнерами",
              ] : [
                "Organization registration documents",
                "Reconstruction project / investment description",
                "Financial statements (last 3 years)",
                "Supply chain description (for CSDDD)",
                "Contracts and partner agreements",
              ]).map((doc, i) => (
                <div key={i} className="flex items-start gap-2 mb-3 text-sm text-slate-700">
                  <CheckCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" /> <span>{doc}</span>
                </div>
              ))}
            </div>
            <div>
              <h3 className="font-semibold text-navy-900 mb-4 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-slate-400" /> {uk ? "Бажані" : "Desired"}
              </h3>
              {(uk ? [
                "Попередні ESG звіти",
                "Оцінка ризиків (ISO 31000)",
                "Стратегія сталого розвитку",
                "Дані про викиди CO₂ (для CBAM)",
                "Звіти попередніх аудитів",
              ] : [
                "Previous ESG reports",
                "Risk assessment (ISO 31000)",
                "Sustainability strategy",
                "CO₂ emissions data (for CBAM)",
                "Previous audit reports",
              ]).map((doc, i) => (
                <div key={i} className="flex items-start gap-2 mb-3 text-sm text-slate-500">
                  <CheckCircle className="h-4 w-4 text-slate-300 shrink-0 mt-0.5" /> <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-900 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif font-bold text-2xl text-white mb-4">
            {uk ? "Працюємо з міжнародними стандартами" : "Working with International Standards"}
          </h2>
          <p className="text-slate-300 mb-4">
            {uk
              ? "ISO 31000, COSO ERM, FAIR, CSRD, DORA, NIS2, CSDDD, CBAM, ESIA — всі актуальні фреймворки для відновлення та інвестування в Україну."
              : "ISO 31000, COSO ERM, FAIR, CSRD, DORA, NIS2, CSDDD, CBAM, ESIA — all current frameworks for Ukraine reconstruction and investment."}
          </p>
          <p className="text-sm text-white/40 mb-8">
            {uk
              ? "Мови звітів: українська, англійська, німецька (за запитом)"
              : "Report languages: Ukrainian, English, German (on request)"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/register`}>
              <Button size="lg" className="bg-gradient-to-r from-gold-500 to-gold-600 text-navy-900 font-bold px-8 h-14">
                {uk ? "Зареєструватися" : "Register"} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href={`mailto:${siteConfig.email}?subject=Due Diligence inquiry`}>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 h-14">
                <Globe className="mr-2 h-5 w-5" /> {uk ? "Зв'язатися" : "Contact Us"}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
