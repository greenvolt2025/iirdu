"use client";

import { useParams } from "next/navigation";
import {
  Landmark, ArrowRight,
  Phone, Scale, Building2, Users,
  BookOpen, Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export default function GovernmentPage() {
  const params = useParams();
  const locale = params.locale as string;
  const uk = locale === "uk";

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-navy-900 to-navy-800 pt-32 pb-20">
        <div className="absolute inset-0 bg-grid-gold bg-grid-64 opacity-10" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 border border-indigo-400/40 rounded-full mb-6">
                <Landmark className="h-4 w-4 text-indigo-300" />
                <span className="text-sm font-medium text-indigo-200">{uk ? "Для держави та громад" : "For Government & Communities"}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-tight mb-4">
                {uk ? (
                  <><span className="text-gradient-gold">Оцінка збитків</span> інфраструктури та комунального майна</>
                ) : (
                  <><span className="text-gradient-gold">Damage assessment</span> of infrastructure and public property</>
                )}
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-lg">
                {uk
                  ? "Підготовка комплексних звітів RDNA для органів місцевого самоврядування, ОВА, державних підприємств. Методика Світового банку для донорських програм."
                  : "Preparation of comprehensive RDNA reports for local governments, regional administrations, state enterprises. World Bank methodology for donor programs."}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(uk ? "Запит від державної установи" : "Government entity inquiry")}`}>
                  <Button size="lg" className="bg-gradient-to-r from-gold-500 to-gold-600 text-navy-900 font-bold px-8 h-14 w-full sm:w-auto">
                    {uk ? "Надіслати запит" : "Send Inquiry"} <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <a href={`tel:${siteConfig.phone}`}>
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 h-14 w-full sm:w-auto">
                    <Phone className="mr-2 h-5 w-5" /> {siteConfig.phone}
                  </Button>
                </a>
              </div>
            </div>
            <div className="glass rounded-2xl p-8">
              <h3 className="font-serif text-xl font-bold text-white mb-6">{uk ? "Типи об'єктів" : "Object Types"}</h3>
              {(uk ? [
                { icon: Building2, title: "Адмінбудівлі та школи", desc: "Обласні, районні адмінцентри, навчальні заклади" },
                { icon: Briefcase, title: "Комунальна інфраструктура", desc: "Водопостачання, теплопостачання, енергомережі" },
                { icon: Scale, title: "Дороги та мости", desc: "Автошляхи, мости, транспортна інфраструктура" },
                { icon: Users, title: "Лікарні та соцоб'єкти", desc: "Медичні установи, центри соціального захисту" },
                { icon: BookOpen, title: "Культурна спадщина", desc: "Музеї, бібліотеки, пам'ятки архітектури" },
              ] : [
                { icon: Building2, title: "Admin buildings & schools", desc: "Regional centers, educational institutions" },
                { icon: Briefcase, title: "Communal infrastructure", desc: "Water supply, heating, power grids" },
                { icon: Scale, title: "Roads & bridges", desc: "Highways, bridges, transport infrastructure" },
                { icon: Users, title: "Hospitals & social facilities", desc: "Medical institutions, social protection centers" },
                { icon: BookOpen, title: "Cultural heritage", desc: "Museums, libraries, architectural monuments" },
              ]).map((item, i) => (
                <div key={i} className="flex items-center gap-4 py-3 border-b border-white/10 last:border-0">
                  <item.icon className="h-5 w-5 text-gold-400 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="text-xs text-white/50">{item.desc}</p>
                  </div>
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
        <h2 className="font-serif font-bold text-2xl text-navy-900 mb-8">{uk ? "Послуги для державних установ" : "Services for Government Institutions"}</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {(uk ? [
            { title: "Комплексний звіт RDNA", desc: "Оцінка збитків за секторами: житло, транспорт, енергетика, освіта, охорона здоров'я. Формат, сумісний з донорськими програмами (World Bank, EBRD, EIB).", price: "Індивідуально" },
            { title: "ESIA для донорських проєктів", desc: "Environmental & Social Impact Assessment для EBRD, EIB, JICA, Ukraine Facility. Обов'язковий для отримання фінансування відновлення.", price: "від €15 000" },
            { title: "Оцінка ризиків", desc: "Ризики реконструкції за ISO 31000, COSO ERM. Антикорупційний аудит, Due Diligence для прозорості відновлення.", price: "від €10 000" },
            { title: "Кошториси відновлення", desc: "Техніко-економічне обґрунтування відновлювальних робіт. Build Back Better — сучасні стандарти та енергоефективність.", price: "від €8 000" },
          ] : [
            { title: "Comprehensive RDNA Report", desc: "Damage assessment by sector: housing, transport, energy, education, healthcare. Format compatible with donor programs (World Bank, EBRD, EIB).", price: "Custom" },
            { title: "ESIA for Donor Projects", desc: "Environmental & Social Impact Assessment for EBRD, EIB, JICA, Ukraine Facility. Required for reconstruction financing.", price: "from €15,000" },
            { title: "Risk Assessment", desc: "Reconstruction risks per ISO 31000, COSO ERM. Anti-corruption audit, Due Diligence for reconstruction transparency.", price: "from €10,000" },
            { title: "Restoration Estimates", desc: "Feasibility study for restoration works. Build Back Better — modern standards and energy efficiency.", price: "from €8,000" },
          ]).map((svc, i) => (
            <div key={i} className="p-6 rounded-xl border border-slate-200 bg-white hover:shadow-lg transition-shadow">
              <h3 className="font-serif font-bold text-navy-900 mb-2">{svc.title}</h3>
              <p className="text-sm text-slate-600 mb-3">{svc.desc}</p>
              <p className="text-sm font-bold text-gold-600">{svc.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-900 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif font-bold text-2xl text-white mb-4">
            {uk ? "Працюємо з донорськими програмами" : "We work with donor programs"}
          </h2>
          <p className="text-slate-300 mb-4">
            {uk
              ? "Наші звіти сумісні з вимогами World Bank, EBRD, EIB, JICA та EU Ukraine Facility. Зв'яжіться з нами для обговорення вашого проєкту."
              : "Our reports are compatible with World Bank, EBRD, EIB, JICA, and EU Ukraine Facility requirements. Contact us to discuss your project."}
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {["World Bank", "EBRD", "EIB", "JICA", "EU Ukraine Facility"].map((org) => (
              <span key={org} className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm text-white/80">{org}</span>
            ))}
          </div>
          <a href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(uk ? "Запит від державної установи" : "Government inquiry")}`}>
            <Button size="lg" className="bg-gradient-to-r from-gold-500 to-gold-600 text-navy-900 font-bold px-8 h-14">
              {uk ? "Надіслати запит" : "Send Inquiry"} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
