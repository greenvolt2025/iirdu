"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Upload, Search, UserCheck, Download, FileText, Camera,
  Shield, CheckCircle, AlertCircle, ArrowRight, Phone,
  Mail, ClipboardList, Building2, Home, Globe, Users,
  CreditCard, Clock, HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

const STEPS = [
  {
    icon: ClipboardList,
    titleUk: "1. Зареєструйтесь в особистому кабінеті",
    titleEn: "1. Register in your personal account",
    descUk: "Оберіть тип клієнта (фізична особа, юридична особа або міжнародний партнер), заповніть форму реєстрації та увійдіть до кабінету.",
    descEn: "Select your client type (individual, legal entity, or international partner), fill in the registration form, and sign in to your account.",
    detailsUk: [
      "Перейдіть на сторінку реєстрації",
      "Оберіть один з трьох типів клієнта",
      "Для юросіб — вкажіть код ЄДРПОУ",
      "Для міжнародних партнерів — країну та тип організації",
      "Встановіть пароль (мінімум 8 символів)",
    ],
    detailsEn: [
      "Go to the registration page",
      "Select one of three client types",
      "For legal entities — provide EDRPOU code",
      "For international partners — country and organization type",
      "Set your password (minimum 8 characters)",
    ],
  },
  {
    icon: FileText,
    titleUk: "2. Створіть замовлення",
    titleEn: "2. Create an order",
    descUk: "В кабінеті натисніть «Нове замовлення». Оберіть тип висновку, вкажіть адресу об'єкта та опишіть ситуацію.",
    descEn: "In your account click 'New Order'. Select the conclusion type, enter the object address, and describe the situation.",
    detailsUk: [
      "Оберіть категорію послуги (оцінка збитків, правова підтримка тощо)",
      "Оберіть конкретний вид висновку",
      "Вкажіть адресу об'єкта (будинок, квартира, офіс)",
      "Опишіть ситуацію: що сталося, коли, які пошкодження",
    ],
    detailsEn: [
      "Select the service category (damage assessment, legal support, etc.)",
      "Choose the specific conclusion type",
      "Enter the object address (house, apartment, office)",
      "Describe the situation: what happened, when, what damage occurred",
    ],
  },
  {
    icon: Upload,
    titleUk: "3. Завантажте документи",
    titleEn: "3. Upload documents",
    descUk: "Завантажте всі наявні документи через захищений канал. Навіть неповний пакет — достатньо для початку роботи.",
    descEn: "Upload all available documents through the secure channel. Even an incomplete package is enough to start working.",
    detailsUk: [
      "Перетягніть файли або натисніть для вибору",
      "Формати: PDF, JPG, PNG, TIFF (до 100 МБ кожен)",
      "Документи передаються через захищений канал із шифруванням",
      "Якщо чогось не вистачає — ми повідомимо, що ще потрібно",
    ],
    detailsEn: [
      "Drag and drop files or click to browse",
      "Formats: PDF, JPG, PNG, TIFF (up to 100 MB each)",
      "Documents are transferred via an encrypted secure channel",
      "If something is missing — we'll let you know what else is needed",
    ],
  },
  {
    icon: Search,
    titleUk: "4. Ми аналізуємо та готуємо висновок",
    titleEn: "4. We analyze and prepare the conclusion",
    descUk: "Наші фахівці аналізують ваші документи, збирають додаткові дані та готують проєкт науково-правового висновку за методикою RDNA/DaLA.",
    descEn: "Our experts analyze your documents, gather additional data, and prepare a draft scientific-legal conclusion using the RDNA/DaLA methodology.",
    detailsUk: [
      "Аналіз правовстановлюючих документів",
      "Документування та фіксація пошкоджень",
      "Розрахунок вартості відновлення за довоєнними цінами",
      "Визначення втрат (порушених економічних потоків)",
      "Розрахунок упущеної вигоди (за запитом, DCF-модель)",
    ],
    detailsEn: [
      "Analysis of title and ownership documents",
      "Damage documentation and recording",
      "Restoration cost calculation at pre-war prices",
      "Loss determination (disrupted economic flows)",
      "Lost profits calculation (on request, DCF model)",
    ],
  },
  {
    icon: UserCheck,
    titleUk: "5. Верифікація та контроль якості",
    titleEn: "5. Verification and quality control",
    descUk: "Незалежний науковий співробітник перевіряє висновок на відповідність ДСТУ 3008:2015, методиці RDNA та вимогам RD4U/ICC.",
    descEn: "An independent scientific researcher verifies the conclusion for compliance with DSTU 3008:2015, RDNA methodology, and RD4U/ICC requirements.",
    detailsUk: [
      "Перевірка структури звіту за ДСТУ 3008:2015",
      "Верифікація розрахунків за методикою DaLA",
      "Перевірка доказової бази",
      "Оформлення відповідно до вимог RD4U та ICC",
    ],
    detailsEn: [
      "Report structure verification per DSTU 3008:2015",
      "Calculation verification using DaLA methodology",
      "Evidence base review",
      "Formatting per RD4U and ICC requirements",
    ],
  },
  {
    icon: Download,
    titleUk: "6. Отримайте висновок",
    titleEn: "6. Receive your conclusion",
    descUk: "Готовий науково-правовий висновок у PDF. Можна завантажити з кабінету або отримати друкований оригінал Новою Поштою.",
    descEn: "The finished scientific-legal conclusion in PDF. Download from your account or receive a printed original via Nova Poshta.",
    detailsUk: [
      "Завантажте PDF з особистого кабінету",
      "Або отримайте друкований оригінал Новою Поштою",
      "Висновок можна подати до RD4U, ICC або ЄСПЛ",
      "Ми супроводжуємо процес подання за потреби",
    ],
    detailsEn: [
      "Download PDF from your personal account",
      "Or receive a printed original via Nova Poshta",
      "The conclusion can be submitted to RD4U, ICC, or ECHR",
      "We provide submission process support if needed",
    ],
  },
];

const DOCS_INDIVIDUAL = {
  titleUk: "Фізичні особи — Категорії A1 (житло) та A3.6 (окупація)",
  titleEn: "Individuals — Categories A1 (residential) and A3.6 (occupation)",
  requiredUk: [
    "Документ на право власності (свідоцтво, договір купівлі, витяг з реєстру)",
    "Паспорт або ID-картка власника",
    "ІПН (індивідуальний податковий номер)",
    "Фото пошкоджень (поточний стан об'єкта)",
    "Акт обстеження (ДСНС, поліція, ОВА — якщо є)",
  ],
  requiredEn: [
    "Ownership document (certificate, purchase agreement, registry extract)",
    "Owner's passport or ID card",
    "Tax identification number (TIN)",
    "Damage photos (current condition of the property)",
    "Inspection report (emergency services, police — if available)",
  ],
  optionalUk: [
    "Фото об'єкта до пошкодження",
    "Технічний паспорт об'єкта",
    "Кошторис ремонтних робіт (якщо є)",
    "Для окупованих територій — будь-які підтвердження окупації",
  ],
  optionalEn: [
    "Photos of the property before damage",
    "Technical passport of the property",
    "Repair cost estimate (if available)",
    "For occupied territories — any evidence of occupation",
  ],
};

const DOCS_BUSINESS = {
  titleUk: "Юридичні особи — Категорія A3 (бізнес)",
  titleEn: "Legal Entities — Category A3 (business)",
  requiredUk: [
    "Документи на власність або оренду приміщень",
    "Реєстраційні документи підприємства (виписка з ЄДР)",
    "Фінансова звітність за останні 3 роки (до війни)",
    "Фото пошкоджень (приміщення, обладнання, інвентар)",
    "Інвентаризаційний опис активів",
  ],
  requiredEn: [
    "Property ownership or lease documents",
    "Company registration documents (state registry extract)",
    "Financial statements for the last 3 years (pre-war)",
    "Damage photos (premises, equipment, inventory)",
    "Asset inventory list",
  ],
  optionalUk: [
    "Контракти з контрагентами (порушені через війну)",
    "Акти списання обладнання",
    "Бізнес-план або фінансова модель",
    "Страхові поліси (якщо є)",
  ],
  optionalEn: [
    "Contracts with counterparties (disrupted by war)",
    "Equipment write-off acts",
    "Business plan or financial model",
    "Insurance policies (if available)",
  ],
};

const DOCS_INTERNATIONAL = {
  titleUk: "Міжнародні партнери — Due Diligence та відповідність",
  titleEn: "International Partners — Due Diligence and Compliance",
  requiredUk: [
    "Реєстраційні документи організації",
    "Опис проєкту відновлення / інвестиції",
    "Фінансова звітність (останні 3 роки)",
    "Опис ланцюга постачання (для CSDDD)",
  ],
  requiredEn: [
    "Organization registration documents",
    "Reconstruction project / investment description",
    "Financial statements (last 3 years)",
    "Supply chain description (for CSDDD)",
  ],
  optionalUk: [
    "ESG звіти (попередні, якщо є)",
    "Оцінка ризиків (ISO 31000, якщо проводилась)",
    "Стратегія сталого розвитку компанії",
  ],
  optionalEn: [
    "ESG reports (previous, if available)",
    "Risk assessment (ISO 31000, if conducted)",
    "Company sustainability strategy",
  ],
};

export default function HowToApplyPage() {
  const params = useParams();
  const locale = params.locale as string;
  const isUk = locale === "uk";

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 pt-32 pb-16">
        <div className="absolute inset-0 bg-grid-gold bg-grid-64 opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/20 border border-gold-500/50 rounded-full mb-6 backdrop-blur-sm">
            <ClipboardList className="h-4 w-4 text-gold-300" />
            <span className="text-sm font-medium text-gold-200">
              {isUk ? "Покрокова інструкція" : "Step-by-Step Guide"}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-tight mb-4">
            {isUk ? (
              <>Як подати заявку на <span className="text-gradient-gold">науково-правовий висновок</span></>
            ) : (
              <>How to apply for a <span className="text-gradient-gold">scientific-legal conclusion</span></>
            )}
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            {isUk
              ? "Від завантаження документів до отримання готового висновку для RD4U, ICC або ЄСПЛ. Весь процес — онлайн, через захищений канал."
              : "From uploading documents to receiving a finished conclusion for RD4U, ICC, or ECHR. The entire process is online, through a secure channel."}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Quick start */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="p-6 bg-gold-500/10 border border-gold-200 rounded-2xl">
          <h2 className="font-serif font-bold text-xl text-navy-900 mb-2">
            {isUk ? "Швидкий старт" : "Quick Start"}
          </h2>
          <p className="text-sm text-slate-600 mb-4">
            {isUk
              ? "Не знаєте з чого почати? Надішліть нам все, що є — навіть фото на телефон. Ми проаналізуємо та підкажемо, що ще потрібно."
              : "Not sure where to start? Send us everything you have — even phone photos. We'll analyze and tell you what else is needed."}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href={`/${locale}/register`}>
              <Button className="bg-navy-900 hover:bg-navy-800 text-white font-semibold">
                {isUk ? "Зареєструватися" : "Register"} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(isUk ? "Запит на консультацію" : "Consultation Request")}`}>
              <Button variant="outline" className="border-navy-900/20">
                <Mail className="mr-2 h-4 w-4" />
                {isUk ? "Або напишіть нам" : "Or email us"}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <h2 className="font-serif font-bold text-2xl text-navy-900 mb-8">
          {isUk ? "Етапи отримання висновку" : "Steps to Receive Your Conclusion"}
        </h2>
        <div className="space-y-8">
          {STEPS.map((step, i) => (
            <div key={i} className="relative pl-16">
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="absolute left-[23px] top-14 bottom-0 w-0.5 bg-gold-200" />
              )}
              {/* Icon */}
              <div className="absolute left-0 top-0 w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl flex items-center justify-center shadow-lg">
                <step.icon className="h-6 w-6 text-navy-900" />
              </div>
              {/* Content */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                <h3 className="font-serif font-bold text-lg text-navy-900 mb-2">
                  {isUk ? step.titleUk : step.titleEn}
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  {isUk ? step.descUk : step.descEn}
                </p>
                <ul className="space-y-2">
                  {(isUk ? step.detailsUk : step.detailsEn).map((detail, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle className="h-4 w-4 text-gold-500 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Documents by segment */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif font-bold text-2xl text-navy-900 mb-2">
            {isUk ? "Які документи потрібні" : "Required Documents"}
          </h2>
          <p className="text-sm text-slate-500 mb-8">
            {isUk
              ? "Перелік залежить від типу клієнта та категорії заявки. Надсилайте все, що є — ми підкажемо, якщо чогось бракує."
              : "The list depends on client type and claim category. Send everything you have — we'll let you know if something is missing."}
          </p>

          {[
            { data: DOCS_INDIVIDUAL, icon: Home, color: "blue" },
            { data: DOCS_BUSINESS, icon: Building2, color: "amber" },
            { data: DOCS_INTERNATIONAL, icon: Globe, color: "emerald" },
          ].map(({ data, icon: Icon, color }, idx) => (
            <div key={idx} className="mb-8 bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className={`px-6 py-4 bg-${color}-50 border-b border-slate-200 flex items-center gap-3`}>
                <div className={`w-10 h-10 bg-${color}-100 rounded-lg flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 text-${color}-600`} />
                </div>
                <h3 className="font-semibold text-navy-900">
                  {isUk ? data.titleUk : data.titleEn}
                </h3>
              </div>
              <div className="p-6 grid sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-navy-900 mb-3 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    {isUk ? "Обов'язкові" : "Required"}
                  </h4>
                  <ul className="space-y-2">
                    {(isUk ? data.requiredUk : data.requiredEn).map((doc, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-navy-900 mb-3 flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-slate-400" />
                    {isUk ? "Бажані (якщо є)" : "Desired (if available)"}
                  </h4>
                  <ul className="space-y-2">
                    {(isUk ? data.optionalUk : data.optionalEn).map((doc, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-slate-500">
                        <CheckCircle className="h-4 w-4 text-slate-300 shrink-0 mt-0.5" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}

          <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
            <Camera className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-900">
                {isUk ? "Фото на телефон — це нормально!" : "Phone photos are perfectly fine!"}
              </p>
              <p className="text-xs text-green-700 mt-1">
                {isUk
                  ? "Зробіть фото документів та пошкоджень на телефон. Ми приймаємо JPG, PNG. Головне — щоб текст був читабельний, а пошкодження видно."
                  : "Take photos of documents and damage with your phone. We accept JPG, PNG. The main thing is that text is readable and damage is visible."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing summary */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="font-serif font-bold text-2xl text-navy-900 mb-8">
          {isUk ? "Вартість та оплата" : "Pricing and Payment"}
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-6 rounded-xl border-2 border-navy-900 bg-navy-900/5">
            <div className="flex items-center gap-3 mb-3">
              <Home className="h-5 w-5 text-navy-900" />
              <h3 className="font-semibold text-navy-900">{isUk ? "Фізичні особи" : "Individuals"}</h3>
            </div>
            <div className="text-2xl font-bold text-navy-900 mb-1">
              {isUk ? "від 1 000 грн" : "from 1,000 UAH"}
            </div>
            <p className="text-xs text-slate-500 mb-3">
              {isUk ? "Квартира — 1 000 грн, будинок — 1 500 грн" : "Apartment — 1,000 UAH, house — 1,500 UAH"}
            </p>
            <p className="text-xs text-slate-500">
              {isUk ? "Упущена вигода — від 5 000 грн (окремо)" : "Lost profits — from 5,000 UAH (separate)"}
            </p>
          </div>
          <div className="p-6 rounded-xl border-2 border-amber-500 bg-amber-50">
            <div className="flex items-center gap-3 mb-3">
              <Building2 className="h-5 w-5 text-amber-600" />
              <h3 className="font-semibold text-navy-900">{isUk ? "Юридичні особи" : "Legal Entities"}</h3>
            </div>
            <div className="text-2xl font-bold text-navy-900 mb-1">
              {isUk ? "від €8 000" : "from €8,000"}
            </div>
            <p className="text-xs text-slate-500">
              {isUk ? "Залежить від складності та обсягу" : "Depends on complexity and scope"}
            </p>
          </div>
          <div className="p-6 rounded-xl border-2 border-emerald-500 bg-emerald-50">
            <div className="flex items-center gap-3 mb-3">
              <Globe className="h-5 w-5 text-emerald-600" />
              <h3 className="font-semibold text-navy-900">{isUk ? "Міжнародні партнери" : "International Partners"}</h3>
            </div>
            <div className="text-2xl font-bold text-navy-900 mb-1">
              {isUk ? "Індивідуально" : "Custom pricing"}
            </div>
            <p className="text-xs text-slate-500">
              {isUk ? "Due Diligence, CSRD/ESG, ESIA" : "Due Diligence, CSRD/ESG, ESIA"}
            </p>
          </div>
        </div>
        <div className="mt-6 p-4 bg-slate-50 rounded-xl border flex items-start gap-3">
          <CreditCard className="h-5 w-5 text-navy-900 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-navy-900">
              {isUk ? "Оплата: 50% при замовленні, 50% при отриманні висновку" : "Payment: 50% on order, 50% on receiving the conclusion"}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {isUk
                ? "WayForPay (карта), LiqPay, банківський переказ (SWIFT для іноземних клієнтів)"
                : "WayForPay (card), LiqPay, bank transfer (SWIFT for international clients)"}
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-navy-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif font-bold text-2xl text-white mb-8">
            {isUk ? "Терміни виконання" : "Turnaround Time"}
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <Clock className="h-8 w-8 text-gold-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white text-lg">{isUk ? "Стандартний" : "Standard"}</h3>
              <p className="text-3xl font-bold text-gold-400 my-2">{isUk ? "до 30 днів" : "up to 30 days"}</p>
              <p className="text-sm text-white/60">
                {isUk ? "Робочих днів з моменту отримання всіх документів" : "Business days from receiving all documents"}
              </p>
            </div>
            <div className="p-6 bg-gold-500/20 backdrop-blur-sm rounded-xl border border-gold-500/30">
              <Clock className="h-8 w-8 text-gold-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white text-lg">{isUk ? "Терміновий" : "Urgent"}</h3>
              <p className="text-3xl font-bold text-gold-400 my-2">{isUk ? "до 10 днів" : "up to 10 days"}</p>
              <p className="text-sm text-white/60">
                {isUk ? "Коефіцієнт ×1.5 до базової вартості" : "×1.5 coefficient to base price"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="font-serif font-bold text-2xl text-navy-900 mb-8">
          {isUk ? "Часті запитання щодо подачі" : "Application FAQ"}
        </h2>
        <div className="space-y-4">
          {[
            {
              qUk: "Чи можу я подати заявку, якщо не маю всіх документів?",
              qEn: "Can I apply if I don't have all documents?",
              aUk: "Так. Надішліть все, що є — навіть фото на телефон. Ми проаналізуємо та підкажемо, які документи ще потрібні і як їх отримати.",
              aEn: "Yes. Send everything you have — even phone photos. We'll analyze and advise which documents are still needed and how to obtain them.",
            },
            {
              qUk: "Чи потрібна мені ліцензія оцінювача?",
              qEn: "Do I need an appraiser's license?",
              aUk: "Ні. МІВРУ готує науково-правові висновки (не «оцінку майна»). Ми працюємо як наукова установа за Законом «Про наукову діяльність». Ліцензія оцінювача не потрібна.",
              aEn: "No. IIRDU prepares scientific-legal conclusions (not 'property appraisal'). We operate as a scientific institution under the Law on Scientific Activity. An appraiser's license is not required.",
            },
            {
              qUk: "Чи приймає RD4U ваші висновки?",
              qEn: "Does RD4U accept your conclusions?",
              aUk: "RD4U приймає будь-які докази. Офіційна позиція Ради Європи: подання професійної оцінки збитків є «бажаним» (desirable). Наші висновки відповідають вимогам RD4U та ICC.",
              aEn: "RD4U accepts any evidence. The official Council of Europe position: submitting professional damage assessment is 'desirable'. Our conclusions meet RD4U and ICC requirements.",
            },
            {
              qUk: "Як захищені мої документи?",
              qEn: "How are my documents protected?",
              aUk: "Документи передаються через захищений канал із наскрізним шифруванням. Ми не передаємо ваші дані третім особам. Зберігання — на захищених серверах Supabase (Європа).",
              aEn: "Documents are transferred through a secure channel with end-to-end encryption. We do not share your data with third parties. Storage — on protected Supabase servers (Europe).",
            },
            {
              qUk: "Що робити, якщо моє майно на окупованій території?",
              qEn: "What if my property is in an occupied territory?",
              aUk: "Категорія A3.6 RD4U — для втрати доступу до майна. Навіть якщо фізично не пошкоджене — можна подавати. Потрібні: документи власності + підтвердження окупації (новини, карти, ваші свідчення).",
              aEn: "RD4U Category A3.6 covers loss of access to property. Even if not physically damaged — you can file a claim. Needed: ownership documents + proof of occupation (news, maps, your testimony).",
            },
          ].map((faq, i) => (
            <details key={i} className="group bg-slate-50 rounded-xl border border-slate-200">
              <summary className="cursor-pointer p-5 flex items-center gap-3 font-medium text-navy-900 list-none">
                <div className="w-8 h-8 bg-gold-500/20 rounded-lg flex items-center justify-center shrink-0 group-open:bg-gold-500 group-open:text-navy-900 transition-colors">
                  <span className="text-sm font-bold text-gold-600 group-open:text-navy-900">{i + 1}</span>
                </div>
                <span className="text-sm">{isUk ? faq.qUk : faq.qEn}</span>
              </summary>
              <div className="px-5 pb-5 pl-16 text-sm text-slate-600">
                {isUk ? faq.aUk : faq.aEn}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif font-bold text-2xl text-white mb-4">
            {isUk ? "Готові подати заявку?" : "Ready to apply?"}
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            {isUk
              ? "Зареєструйтесь в кабінеті, завантажте документи — і ми підготуємо висновок для RD4U, ICC або ЄСПЛ."
              : "Register in your account, upload documents — and we'll prepare a conclusion for RD4U, ICC, or ECHR."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/register`}>
              <Button size="lg" className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-bold text-base px-8 h-14 shadow-gold-glow">
                {isUk ? "Зареєструватися" : "Register Now"} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href={`tel:${siteConfig.phone}`}>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 text-base px-8 h-14">
                <Phone className="mr-2 h-5 w-5" />
                {siteConfig.phone}
              </Button>
            </a>
          </div>
          <div className="mt-6 flex flex-wrap gap-6 justify-center">
            {[
              { icon: Shield, text: isUk ? "Захищений канал" : "Secure channel" },
              { icon: Clock, text: isUk ? "Відповідь за 24 год" : "Response in 24h" },
              { icon: Users, text: isUk ? "Безкоштовна консультація" : "Free consultation" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                <item.icon className="h-4 w-4 text-gold-400" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
