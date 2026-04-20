"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Building2, CheckCircle, ArrowRight, FileText,
  AlertCircle, HelpCircle, TrendingUp,
  BarChart3, Scale,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export default function BusinessPage() {
  const params = useParams();
  const locale = params.locale as string;
  const uk = locale === "uk";

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-amber-900 via-navy-900 to-navy-800 pt-32 pb-20">
        <div className="absolute inset-0 bg-grid-gold bg-grid-64 opacity-10" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-400/40 rounded-full mb-6">
                <Building2 className="h-4 w-4 text-amber-300" />
                <span className="text-sm font-medium text-amber-200">{uk ? "Для бізнесу" : "For Business"}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-tight mb-4">
                {uk ? (
                  <>Оцінка збитків <span className="text-gradient-gold">бізнесу</span> та упущеної вигоди</>
                ) : (
                  <>Business <span className="text-gradient-gold">damage assessment</span> and lost profits</>
                )}
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-lg">
                {uk
                  ? "Комплексний звіт для подачі до RD4U/ICC: пошкодження приміщень, обладнання, упущений прибуток. Методика RDNA/DaLA Світового банку."
                  : "Comprehensive report for RD4U/ICC: premises damage, equipment, lost profits. World Bank RDNA/DaLA methodology."}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={`/${locale}/register`}>
                  <Button size="lg" className="bg-gradient-to-r from-gold-500 to-gold-600 text-navy-900 font-bold px-8 h-14 w-full sm:w-auto">
                    {uk ? "Подати заявку" : "Submit Application"} <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(uk ? "Запит від юридичної особи" : "Legal entity inquiry")}`}>
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 h-14 w-full sm:w-auto">
                    {uk ? "Отримати КП" : "Get a Quote"}
                  </Button>
                </a>
              </div>
            </div>
            <div className="glass rounded-2xl p-8">
              <h3 className="font-serif text-xl font-bold text-white mb-6">{uk ? "Послуги для бізнесу" : "Business Services"}</h3>
              {(uk ? [
                { icon: FileText, title: "Оцінка збитків (RDNA)", desc: "Приміщення, обладнання, інфраструктура", price: "від €8 000" },
                { icon: TrendingUp, title: "Упущена вигода", desc: "DCF-модель, аналіз грошових потоків", price: "від €5 000" },
                { icon: Scale, title: "Правова підтримка", desc: "Документи для RD4U, ICC, ЄСПЛ", price: "від €3 000" },
                { icon: BarChart3, title: "Економічний аналіз", desc: "ТЕО, аналіз витрат і вигод", price: "від €10 000" },
              ] : [
                { icon: FileText, title: "Damage Assessment (RDNA)", desc: "Premises, equipment, infrastructure", price: "from €8,000" },
                { icon: TrendingUp, title: "Lost Profits", desc: "DCF model, cash flow analysis", price: "from €5,000" },
                { icon: Scale, title: "Legal Support", desc: "Documents for RD4U, ICC, ECHR", price: "from €3,000" },
                { icon: BarChart3, title: "Economic Analysis", desc: "Feasibility, cost-benefit analysis", price: "from €10,000" },
              ]).map((svc, i) => (
                <div key={i} className="flex items-center gap-4 py-3 border-b border-white/10 last:border-0">
                  <svc.icon className="h-5 w-5 text-gold-400 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{svc.title}</p>
                    <p className="text-xs text-white/50">{svc.desc}</p>
                  </div>
                  <span className="text-sm font-bold text-gold-400 whitespace-nowrap">{svc.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full"><path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="white" /></svg>
        </div>
      </section>

      {/* What we analyze */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="font-serif font-bold text-2xl text-navy-900 mb-8">{uk ? "Що ми аналізуємо" : "What We Analyze"}</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {(uk ? [
            { title: "Збитки (Damage)", desc: "Вартість заміщення або відновлення пошкоджених активів за довоєнними цінами. Приміщення, обладнання, транспорт, інвентар.", color: "red" },
            { title: "Втрати (Losses)", desc: "Порушені економічні потоки: упущений прибуток, зниження доходів, додаткові витрати, переривання бізнес-процесів.", color: "amber" },
            { title: "Потреби (Needs)", desc: "Збитки + Втрати + Build Back Better. Відновлення з покращенням: сучасні стандарти, енергоефективність.", color: "emerald" },
          ] : [
            { title: "Damage", desc: "Replacement or restoration cost of damaged assets at pre-war prices. Premises, equipment, transport, inventory.", color: "red" },
            { title: "Losses", desc: "Disrupted economic flows: lost profits, revenue decline, additional costs, business process interruption.", color: "amber" },
            { title: "Needs", desc: "Damage + Losses + Build Back Better. Restoration with improvement: modern standards, energy efficiency.", color: "emerald" },
          ]).map((item, i) => (
            <div key={i} className={`p-6 rounded-xl border-l-4 border-${item.color}-500 bg-${item.color}-50/50`}>
              <h3 className="font-serif font-bold text-navy-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Documents */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif font-bold text-2xl text-navy-900 mb-8">{uk ? "Документи для юридичних осіб" : "Documents for Legal Entities"}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-navy-900 mb-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" /> {uk ? "Обов'язкові" : "Required"}
              </h3>
              {(uk ? [
                "Виписка з ЄДР (реєстраційні документи)",
                "Документи на власність або оренду приміщень",
                "Фінансова звітність (до війни, останні 3 роки)",
                "Фото пошкоджень приміщень та обладнання",
                "Інвентаризаційний опис активів",
                "Код ЄДРПОУ",
              ] : [
                "State registry extract (registration documents)",
                "Property ownership or lease documents",
                "Financial statements (pre-war, last 3 years)",
                "Photos of damage to premises and equipment",
                "Asset inventory list",
                "EDRPOU code",
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
                "Контракти з контрагентами (порушені через війну)",
                "Акти списання обладнання",
                "Бізнес-план або фінансова модель",
                "Страхові поліси",
                "Кошторис ремонтних/відновлювальних робіт",
                "Докази форс-мажору (сертифікат ТПП)",
              ] : [
                "Contracts with counterparties (disrupted by war)",
                "Equipment write-off acts",
                "Business plan or financial model",
                "Insurance policies",
                "Repair/restoration cost estimates",
                "Force majeure evidence (CCI certificate)",
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
            {uk ? "Отримайте індивідуальну пропозицію" : "Get a custom proposal"}
          </h2>
          <p className="text-slate-300 mb-8">
            {uk
              ? "Надішліть документи — ми підготуємо комерційну пропозицію з точною вартістю та термінами протягом 48 годин."
              : "Send your documents — we'll prepare a commercial proposal with exact pricing and timeline within 48 hours."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/register`}>
              <Button size="lg" className="bg-gradient-to-r from-gold-500 to-gold-600 text-navy-900 font-bold px-8 h-14">
                {uk ? "Зареєструватися" : "Register"} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(uk ? "Запит КП від юридичної особи" : "Quote request from legal entity")}`}>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 h-14">
                {uk ? "Запит на КП" : "Request Quote"}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
