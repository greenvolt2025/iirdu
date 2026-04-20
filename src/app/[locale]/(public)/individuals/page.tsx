"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Home, Shield, CheckCircle, ArrowRight, FileText, Camera,
  Phone, CreditCard, AlertCircle, HelpCircle, Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export default function IndividualsPage() {
  const params = useParams();
  const locale = params.locale as string;
  const uk = locale === "uk";

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-900 via-navy-900 to-navy-800 pt-32 pb-20">
        <div className="absolute inset-0 bg-grid-gold bg-grid-64 opacity-10" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-400/40 rounded-full mb-6">
                <Home className="h-4 w-4 text-blue-300" />
                <span className="text-sm font-medium text-blue-200">
                  {uk ? "Для фізичних осіб" : "For Individuals"}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-tight mb-4">
                {uk ? (
                  <>Висновок для <span className="text-gradient-gold">вашого будинку</span> чи квартири</>
                ) : (
                  <>Conclusion for <span className="text-gradient-gold">your house</span> or apartment</>
                )}
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-lg">
                {uk
                  ? "Підготуємо науково-правовий висновок для подачі до RD4U, ICC або ЄСПЛ. Фіксована ціна: квартира — 1 000 грн, будинок — 1 500 грн."
                  : "We'll prepare a scientific-legal conclusion for submission to RD4U, ICC, or ECHR. Fixed price: apartment — 1,000 UAH, house — 1,500 UAH."}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={`/${locale}/register`}>
                  <Button size="lg" className="bg-gradient-to-r from-gold-500 to-gold-600 text-navy-900 font-bold px-8 h-14 w-full sm:w-auto">
                    {uk ? "Подати заявку" : "Submit Application"} <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href={`/${locale}/how-to-apply`}>
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 h-14 w-full sm:w-auto">
                    {uk ? "Як це працює" : "How it works"}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="glass rounded-2xl p-8">
              <h3 className="font-serif text-xl font-bold text-white mb-4">
                {uk ? "Фіксовані ціни" : "Fixed Prices"}
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white/10 rounded-xl">
                  <div>
                    <p className="font-semibold text-white">{uk ? "Квартира" : "Apartment"}</p>
                    <p className="text-xs text-white/50">{uk ? "Категорія A1 RD4U" : "Category A1 RD4U"}</p>
                  </div>
                  <div className="text-2xl font-bold text-gold-400">1 000 ₴</div>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/10 rounded-xl">
                  <div>
                    <p className="font-semibold text-white">{uk ? "Приватний будинок" : "Private House"}</p>
                    <p className="text-xs text-white/50">{uk ? "Категорія A1 RD4U" : "Category A1 RD4U"}</p>
                  </div>
                  <div className="text-2xl font-bold text-gold-400">1 500 ₴</div>
                </div>
                <div className="flex justify-between items-center p-4 bg-gold-500/20 rounded-xl border border-gold-500/30">
                  <div>
                    <p className="font-semibold text-white">{uk ? "Упущена вигода" : "Lost Profits"}</p>
                    <p className="text-xs text-white/50">{uk ? "DCF-модель, окремо" : "DCF model, separate"}</p>
                  </div>
                  <div className="text-xl font-bold text-gold-400">{uk ? "від 5 000 ₴" : "from 5,000 ₴"}</div>
                </div>
              </div>
              <p className="text-xs text-white/40 mt-4">
                {uk ? "Оплата: 50% при замовленні, 50% при отриманні" : "Payment: 50% on order, 50% on receiving"}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full"><path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="white" /></svg>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="font-serif font-bold text-2xl text-navy-900 mb-8">{uk ? "Категорії заявок RD4U" : "RD4U Claim Categories"}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              titleUk: "A1 — Житлова нерухомість", titleEn: "A1 — Residential Property",
              descUk: "Пошкоджені або зруйновані квартири, будинки, дачі. Якщо ви є власником або законним мешканцем — можете подати заявку.",
              descEn: "Damaged or destroyed apartments, houses, cottages. If you are the owner or legal resident — you can file a claim.",
              color: "blue",
            },
            {
              titleUk: "A3.6 — Окуповані території", titleEn: "A3.6 — Occupied Territories",
              descUk: "Втрата доступу або контролю над майном. Навіть якщо фізично не пошкоджене — ви маєте право на компенсацію за втрату доступу.",
              descEn: "Loss of access or control over property. Even if not physically damaged — you have the right to compensation for loss of access.",
              color: "amber",
            },
          ].map((cat, i) => (
            <div key={i} className={`p-6 rounded-xl border-2 border-${cat.color}-200 bg-${cat.color}-50/50`}>
              <h3 className="font-serif font-bold text-lg text-navy-900 mb-2">{uk ? cat.titleUk : cat.titleEn}</h3>
              <p className="text-sm text-slate-600">{uk ? cat.descUk : cat.descEn}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Documents */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif font-bold text-2xl text-navy-900 mb-2">{uk ? "Які документи надіслати" : "What Documents to Send"}</h2>
          <p className="text-sm text-slate-500 mb-8">{uk ? "Надсилайте все, що є. Якщо чогось бракує — ми підкажемо." : "Send everything you have. If something is missing — we'll advise."}</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-navy-900 mb-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                {uk ? "Обов'язкові" : "Required"}
              </h3>
              {(uk ? [
                "Документ на право власності (свідоцтво, договір, витяг з реєстру)",
                "Паспорт або ID-картка",
                "ІПН (податковий номер)",
                "Фото пошкоджень (навіть на телефон)",
                "Адреса об'єкта",
              ] : [
                "Ownership document (certificate, contract, registry extract)",
                "Passport or ID card",
                "Tax identification number",
                "Damage photos (even phone photos)",
                "Property address",
              ]).map((doc, i) => (
                <div key={i} className="flex items-start gap-2 mb-3 text-sm text-slate-700">
                  <CheckCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" /> <span>{doc}</span>
                </div>
              ))}
            </div>
            <div>
              <h3 className="font-semibold text-navy-900 mb-4 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-slate-400" />
                {uk ? "Бажані (якщо є)" : "Desired (if available)"}
              </h3>
              {(uk ? [
                "Акт обстеження (ДСНС, поліція, ОВА)",
                "Технічний паспорт об'єкта",
                "Фото до пошкодження",
                "Кошторис ремонтних робіт",
                "Для A3.6: будь-які підтвердження окупації",
              ] : [
                "Inspection report (SESU, police, CMA)",
                "Property technical passport",
                "Photos before damage",
                "Repair cost estimate",
                "For A3.6: any proof of occupation",
              ]).map((doc, i) => (
                <div key={i} className="flex items-start gap-2 mb-3 text-sm text-slate-500">
                  <CheckCircle className="h-4 w-4 text-slate-300 shrink-0 mt-0.5" /> <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
            <Camera className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
            <p className="text-sm text-green-800">
              {uk
                ? "Фото на телефон — це нормально! Зробіть кілька фото пошкоджень та документів. Головне — щоб текст читався та пошкодження були видні."
                : "Phone photos are perfectly fine! Take a few photos of the damage and documents. The key is that text is readable and damage is visible."}
            </p>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="font-serif font-bold text-2xl text-navy-900 mb-8">{uk ? "Що ви отримаєте" : "What You'll Receive"}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(uk ? [
            { icon: FileText, title: "Науково-правовий висновок", desc: "За ДСТУ 3008:2015, методика RDNA/DaLA" },
            { icon: Shield, title: "Доказова база", desc: "Документи власності, фото, розрахунки" },
            { icon: CreditCard, title: "Розрахунок вартості", desc: "Вартість відновлення за довоєнними цінами" },
            { icon: Upload, title: "Готовий для подачі", desc: "Відповідає вимогам RD4U та ICC" },
          ] : [
            { icon: FileText, title: "Scientific-Legal Conclusion", desc: "Per DSTU 3008:2015, RDNA/DaLA methodology" },
            { icon: Shield, title: "Evidence Base", desc: "Ownership docs, photos, calculations" },
            { icon: CreditCard, title: "Cost Calculation", desc: "Restoration cost at pre-war prices" },
            { icon: Upload, title: "Ready for Submission", desc: "Meets RD4U and ICC requirements" },
          ]).map((item, i) => (
            <div key={i} className="p-5 rounded-xl border border-slate-200 bg-white">
              <item.icon className="h-8 w-8 text-gold-500 mb-3" />
              <h3 className="font-semibold text-navy-900 text-sm mb-1">{item.title}</h3>
              <p className="text-xs text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-900 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif font-bold text-2xl text-white mb-4">
            {uk ? "Подайте заявку за 5 хвилин" : "Apply in 5 minutes"}
          </h2>
          <p className="text-slate-300 mb-8">
            {uk
              ? "Зареєструйтесь, завантажте документи — і ми почнемо працювати. Консультація — безкоштовна."
              : "Register, upload documents — and we'll start working. Consultation is free."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/register`}>
              <Button size="lg" className="bg-gradient-to-r from-gold-500 to-gold-600 text-navy-900 font-bold px-8 h-14">
                {uk ? "Зареєструватися" : "Register"} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href={`tel:${siteConfig.phone}`}>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 h-14">
                <Phone className="mr-2 h-5 w-5" /> {siteConfig.phone}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
