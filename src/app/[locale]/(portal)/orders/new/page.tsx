"use client";

import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Loader2, Upload, CheckCircle2, Circle, FileText, Building2, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SERVICE_CATEGORIES } from "@/config/services-catalog";
import { createClient } from "@/lib/supabase/client";
import DocumentUpload from "@/components/upload/DocumentUpload";

type Step = "type" | "details" | "documents" | "review";

const categoryToReportType: Record<string, string> = {
  "damage-assessment": "damage_assessment",
  "risk-assessment": "risk_assessment",
  "eu-compliance": "eu_compliance",
  "economic-analysis": "economic_analysis",
  "legal-support": "legal_support",
  "contract-analysis": "contract_analysis",
  "consulting": "consulting",
};

/** Required documents checklist per category */
const requiredDocsByCategory: Record<string, { uk: string; en: string; required: boolean }[]> = {
  "damage-assessment": [
    { uk: "Право власності (витяг з реєстру / свідоцтво)", en: "Proof of ownership (registry extract / certificate)", required: true },
    { uk: "Фото пошкоджень (поточний стан)", en: "Damage photos (current condition)", required: true },
    { uk: "Фото до пошкодження (якщо є)", en: "Pre-damage photos (if available)", required: false },
    { uk: "Акт обстеження ДСНС / поліції / ОВА", en: "SESU / police / CMA inspection act", required: true },
    { uk: "Технічний паспорт об'єкта", en: "Technical passport of the object", required: true },
    { uk: "Паспорт / ID-картка власника", en: "Owner's passport / ID card", required: true },
    { uk: "ІПН (податковий номер)", en: "Tax identification number (TIN)", required: true },
    { uk: "Оцінка майна (якщо проводилась)", en: "Property valuation (if conducted)", required: false },
    { uk: "Кадастровий номер земельної ділянки", en: "Land plot cadastral number", required: false },
    { uk: "Реєстрація в Дії (Реєстр пошкодженого майна)", en: "Diia registration (Damaged Property Register)", required: false },
  ],
  "legal-support": [
    { uk: "Право власності на активи", en: "Proof of asset ownership", required: true },
    { uk: "Докази пошкодження / збитків", en: "Evidence of damage / losses", required: true },
    { uk: "Документи для RD4U / ЄСПЛ / ICC (якщо є)", en: "RD4U / ECHR / ICC documents (if available)", required: false },
    { uk: "Попередні висновки або оцінки (якщо є)", en: "Previous conclusions or assessments (if available)", required: false },
    { uk: "Паспорт / ID-картка", en: "Passport / ID card", required: true },
    { uk: "Довіреність (якщо представник)", en: "Power of attorney (if representative)", required: false },
  ],
  "risk-assessment": [
    { uk: "Опис проєкту / об'єкта", en: "Project / object description", required: true },
    { uk: "Фінансова документація", en: "Financial documentation", required: true },
    { uk: "Бізнес-план (якщо є)", en: "Business plan (if available)", required: false },
    { uk: "Дані про ринок / конкурентів", en: "Market / competitor data", required: false },
  ],
  "eu-compliance": [
    { uk: "Реєстраційні документи підприємства", en: "Company registration documents", required: true },
    { uk: "Фінансова звітність (останні 3 роки)", en: "Financial statements (last 3 years)", required: true },
    { uk: "Опис ланцюга постачання", en: "Supply chain description", required: false },
    { uk: "Дані про викиди / ESG-звіти (якщо є)", en: "Emissions data / ESG reports (if available)", required: false },
  ],
  "economic-analysis": [
    { uk: "Опис проєкту", en: "Project description", required: true },
    { uk: "Фінансова модель / бізнес-план", en: "Financial model / business plan", required: true },
    { uk: "Дані ринкового аналізу (якщо є)", en: "Market analysis data (if available)", required: false },
  ],
  "contract-analysis": [
    { uk: "Контракт / проєкт договору", en: "Contract / draft agreement", required: true },
    { uk: "Додатки до контракту (якщо є)", en: "Contract appendices (if available)", required: false },
    { uk: "Кошторисна документація (якщо є)", en: "Cost estimate (if available)", required: false },
    { uk: "Попередня переписка сторін (якщо є)", en: "Previous correspondence between parties (if available)", required: false },
  ],
  "consulting": [
    { uk: "Опис запиту / проблеми", en: "Request / problem description", required: true },
    { uk: "Супутні документи (якщо є)", en: "Supporting documents (if available)", required: false },
  ],
};

/** Bank details for payment */
const BANK_DETAILS = {
  nameUk: 'ПНУ "Міжнародний інститут відновлення та розвитку України"',
  nameEn: 'PSI "International Institute for Reconstruction and Development of Ukraine"',
  edrpou: "45681824",
  iban: process.env.NEXT_PUBLIC_IIRDU_IBAN || "UA000000000000000000000000000",
  bank: "АТ КБ «ПриватБанк»",
  purpose: {
    uk: "За науково-правовий висновок згідно рахунку №",
    en: "For scientific-legal conclusion per invoice No.",
  },
};

export default function NewOrderPage() {
  const t = useTranslations("order");
  const tCommon = useTranslations("common");
  const tUpload = useTranslations("upload");
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;

  const [step, setStep] = useState<Step>("type");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubtype, setSelectedSubtype] = useState("");
  const [objectAddress, setObjectAddress] = useState("");
  const [description, setDescription] = useState("");
  const [includeLostProfits, setIncludeLostProfits] = useState(false);
  const [turnaround, setTurnaround] = useState<"standard" | "urgent">("standard");
  const [delivery, setDelivery] = useState<"pdf" | "nova_poshta">("pdf");
  const [novaPoshtaDept, setNovaPoshtaDept] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const category = SERVICE_CATEGORIES.find((c) => c.id === selectedCategory);
  const requiredDocs = requiredDocsByCategory[selectedCategory] || [];

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push(`/${locale}/login`);
      return;
    }

    const reportType = categoryToReportType[selectedCategory] || selectedCategory;
    const title = selectedSubtype;

    const { data: order, error: insertError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        report_type: reportType,
        report_subtype: selectedSubtype,
        title,
        description: description || null,
        object_address: objectAddress || null,
        status: "draft",
        currency: "EUR",
        turnaround,
        delivery_method: delivery,
        delivery_details: delivery === "nova_poshta" ? JSON.stringify({ recipientName, novaPoshtaDept }) : null,
        include_lost_profits: includeLostProfits,
      })
      .select()
      .single();

    if (insertError) {
      setError(insertError.message);
      setSubmitting(false);
      return;
    }

    if (order) {
      router.push(`/${locale}/orders/${order.id}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-bold text-navy-900">
          {locale === "uk" ? "Отримати науково-правовий висновок" : "Get a Scientific-Legal Conclusion"}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {locale === "uk"
            ? "Завантажте документи — отримайте висновок за методикою RDNA/DaLA Світового банку"
            : "Upload documents — receive a conclusion using World Bank RDNA/DaLA methodology"}
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {(["type", "details", "documents", "review"] as Step[]).map((s, i) => {
          const labels = {
            type: locale === "uk" ? "Напрямок" : "Direction",
            details: locale === "uk" ? "Деталі" : "Details",
            documents: locale === "uk" ? "Документи" : "Documents",
            review: locale === "uk" ? "Підтвердження" : "Confirmation",
          };
          const stepIdx = ["type", "details", "documents", "review"].indexOf(step);
          return (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step === s ? "bg-gold-500 text-navy-900" :
                  stepIdx > i ? "bg-navy-900 text-white" : "bg-gray-200 text-gray-500"
                }`}>
                  {stepIdx > i ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                </div>
                <span className="text-[10px] text-muted-foreground hidden sm:block">{labels[s]}</span>
              </div>
              {i < 3 && <div className="flex-1 h-0.5 bg-gray-200 mb-4 sm:mb-5" />}
            </div>
          );
        })}
      </div>

      {/* Step 1: Select type */}
      {step === "type" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-gold-500" />
              {t("selectType")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SERVICE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSelectedSubtype("");
                  }}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    selectedCategory === cat.id
                      ? "border-gold-500 bg-gold-500/5 ring-1 ring-gold-500"
                      : "hover:border-gray-400"
                  }`}
                >
                  <p className="font-medium text-sm">
                    {locale === "uk" ? cat.nameUk : cat.nameEn}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {cat.services.length} {locale === "uk" ? "видів висновків" : "conclusion types"}
                  </p>
                </button>
              ))}
            </div>

            {category && (
              <div className="mt-6">
                <Label className="mb-3 block">{t("selectSubtype")}</Label>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {category.services.map((svc) => (
                    <button
                      key={svc.id}
                      onClick={() => setSelectedSubtype(locale === "uk" ? svc.nameUk : svc.nameEn)}
                      className={`w-full p-3 rounded-lg border text-left text-sm transition-all ${
                        selectedSubtype === (locale === "uk" ? svc.nameUk : svc.nameEn)
                          ? "border-gold-500 bg-gold-500/5 ring-1 ring-gold-500"
                          : "hover:border-gray-400"
                      }`}
                    >
                      <span className="font-medium">{locale === "uk" ? svc.nameUk : svc.nameEn}</span>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                        {locale === "uk" ? svc.descriptionUk : svc.descriptionEn}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span>€{svc.priceRange.min.toLocaleString()} – €{svc.priceRange.max.toLocaleString()}</span>
                        <span>{Math.ceil(svc.turnaroundDays.min / 7)}–{Math.ceil(svc.turnaroundDays.max / 7)} {locale === "uk" ? "тижн." : "wks"}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end mt-6">
              <Button
                onClick={() => setStep("details")}
                disabled={!selectedSubtype}
                className="bg-navy-900 hover:bg-navy-800"
              >
                {tCommon("next")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Details */}
      {step === "details" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-gold-500" />
              {locale === "uk" ? "Деталі замовлення" : "Order Details"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-gold-500/10 rounded-lg text-sm space-y-1">
              <div>
                <span className="font-medium">{locale === "uk" ? "Тип висновку:" : "Conclusion type:"}</span>{" "}
                {selectedSubtype}
              </div>
              <div className="text-xs text-muted-foreground">
                {locale === "uk"
                  ? "Документ: Науково-правовий висновок (НПВ) за методикою RDNA/DaLA"
                  : "Document: Scientific-Legal Conclusion per RDNA/DaLA methodology"}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">{t("objectAddress")}</Label>
              <Input
                id="address"
                value={objectAddress}
                onChange={(e) => setObjectAddress(e.target.value)}
                placeholder={locale === "uk" ? "м. Київ, вул. Хрещатик, 1" : "Kyiv, Khreshchatyk St., 1"}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">{t("description")}</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t("descriptionPlaceholder")}
                rows={4}
              />
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setStep("type")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {tCommon("back")}
              </Button>
              <Button onClick={() => setStep("documents")} className="bg-navy-900 hover:bg-navy-800">
                {tCommon("next")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Documents */}
      {step === "documents" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-gold-500" />
              {tUpload("title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Required documents checklist */}
            {requiredDocs.length > 0 && (
              <div className="mb-6 p-4 bg-slate-50 rounded-lg border">
                <h4 className="text-sm font-semibold text-navy-900 mb-3">
                  {locale === "uk" ? "Необхідні документи:" : "Required documents:"}
                </h4>
                <div className="space-y-2">
                  {requiredDocs.map((doc, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      {doc.required ? (
                        <CheckCircle2 className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="h-4 w-4 text-gray-300 shrink-0 mt-0.5" />
                      )}
                      <span className={doc.required ? "text-navy-900" : "text-muted-foreground"}>
                        {locale === "uk" ? doc.uk : doc.en}
                        {doc.required && <span className="text-red-500 ml-1">*</span>}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  {locale === "uk"
                    ? "* Обов'язкові документи. Якщо документів недостатньо — ми повідомимо, які ще потрібні."
                    : "* Required documents. If documents are insufficient — we'll notify you which additional ones are needed."}
                </p>
              </div>
            )}

            <DocumentUpload files={files} onFilesChange={setFiles} />

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setStep("details")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {tCommon("back")}
              </Button>
              <Button onClick={() => setStep("review")} className="bg-navy-900 hover:bg-navy-800">
                {tCommon("next")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Review & Submit */}
      {step === "review" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-gold-500" />
              {locale === "uk" ? "Підтвердження та оплата" : "Confirmation & Payment"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-sm text-muted-foreground">{locale === "uk" ? "Тип висновку" : "Conclusion type"}</span>
                <span className="text-sm font-medium text-right max-w-[60%]">{selectedSubtype}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-sm text-muted-foreground">{t("objectAddress")}</span>
                <span className="text-sm font-medium">{objectAddress || "—"}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-sm text-muted-foreground">{locale === "uk" ? "Документів" : "Documents"}</span>
                <span className="text-sm font-medium">{files.length}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-sm text-muted-foreground">{locale === "uk" ? "Методика" : "Methodology"}</span>
                <span className="text-sm font-medium">RDNA / DaLA</span>
              </div>

              {/* Turnaround time */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  {locale === "uk" ? "Термін виконання" : "Turnaround Time"}
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setTurnaround("standard")}
                    className={`p-3 rounded-lg border text-left text-sm transition-all ${
                      turnaround === "standard"
                        ? "border-gold-500 bg-gold-500/5 ring-1 ring-gold-500"
                        : "hover:border-gray-400"
                    }`}
                  >
                    <p className="font-medium">{locale === "uk" ? "Стандартний" : "Standard"}</p>
                    <p className="text-xs text-muted-foreground">
                      {locale === "uk" ? "до 30 робочих днів" : "up to 30 business days"}
                    </p>
                  </button>
                  <button
                    onClick={() => setTurnaround("urgent")}
                    className={`p-3 rounded-lg border text-left text-sm transition-all ${
                      turnaround === "urgent"
                        ? "border-gold-500 bg-gold-500/5 ring-1 ring-gold-500"
                        : "hover:border-gray-400"
                    }`}
                  >
                    <p className="font-medium">{locale === "uk" ? "Терміновий" : "Urgent"}</p>
                    <p className="text-xs text-muted-foreground">
                      {locale === "uk" ? "до 10 робочих днів (×1.5)" : "up to 10 business days (×1.5)"}
                    </p>
                  </button>
                </div>
              </div>

              {/* Delivery method */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  {locale === "uk" ? "Спосіб отримання" : "Delivery Method"}
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDelivery("pdf")}
                    className={`p-3 rounded-lg border text-left text-sm transition-all ${
                      delivery === "pdf"
                        ? "border-gold-500 bg-gold-500/5 ring-1 ring-gold-500"
                        : "hover:border-gray-400"
                    }`}
                  >
                    <p className="font-medium">PDF</p>
                    <p className="text-xs text-muted-foreground">
                      {locale === "uk" ? "Електронний документ" : "Electronic document"}
                    </p>
                  </button>
                  <button
                    onClick={() => setDelivery("nova_poshta")}
                    className={`p-3 rounded-lg border text-left text-sm transition-all ${
                      delivery === "nova_poshta"
                        ? "border-gold-500 bg-gold-500/5 ring-1 ring-gold-500"
                        : "hover:border-gray-400"
                    }`}
                  >
                    <p className="font-medium">{locale === "uk" ? "Нова Пошта" : "Nova Poshta"}</p>
                    <p className="text-xs text-muted-foreground">
                      {locale === "uk" ? "Друкований оригінал" : "Printed original"}
                    </p>
                  </button>
                </div>
                {delivery === "nova_poshta" && (
                  <div className="space-y-2 mt-2 p-3 bg-slate-50 rounded-lg">
                    <Input
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder={locale === "uk" ? "ПІБ отримувача" : "Recipient full name"}
                    />
                    <Input
                      value={novaPoshtaDept}
                      onChange={(e) => setNovaPoshtaDept(e.target.value)}
                      placeholder={locale === "uk" ? "Місто, № відділення Нової Пошти" : "City, Nova Poshta department No."}
                    />
                  </div>
                )}
              </div>

              {/* Lost profits add-on */}
              <div className="p-3 bg-gold-500/5 border border-gold-200 rounded-lg">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeLostProfits}
                    onChange={(e) => setIncludeLostProfits(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-gold-600 focus:ring-gold-500"
                  />
                  <div>
                    <p className="text-sm font-medium text-navy-900">
                      {locale === "uk" ? "Розрахунок упущеної вигоди" : "Lost Profits Calculation"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {locale === "uk"
                        ? "Додатковий розрахунок (DCF-моделювання). Від €5 000"
                        : "Additional calculation (DCF modeling). From €5,000"}
                    </p>
                  </div>
                </label>
              </div>

              {(() => {
                const svc = category?.services.find((s) => (locale === "uk" ? s.nameUk : s.nameEn) === selectedSubtype);
                return svc ? (
                  <div className="flex justify-between py-3 bg-gray-50 rounded-lg px-3">
                    <span className="font-semibold">{t("totalAmount")}</span>
                    <span className="font-bold text-lg">
                      {locale === "uk" ? "від" : "from"} €{svc.priceRange.min.toLocaleString()}
                      {includeLostProfits ? " + €5,000" : ""}
                    </span>
                  </div>
                ) : (
                  <div className="flex justify-between py-3 bg-gray-50 rounded-lg px-3">
                    <span className="font-semibold">{t("totalAmount")}</span>
                    <span className="font-bold text-lg">
                      {locale === "uk" ? "за домовленістю" : "by agreement"}
                    </span>
                  </div>
                );
              })()}
            </div>

            {/* Payment: Bank Transfer */}
            <div className="p-4 bg-navy-900/5 rounded-lg border border-navy-900/10">
              <h4 className="text-sm font-semibold text-navy-900 mb-2">
                {locale === "uk" ? "Оплата банківським переказом" : "Payment by bank transfer"}
              </h4>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div><span className="font-medium text-navy-900">{locale === "uk" ? "Отримувач:" : "Recipient:"}</span> {locale === "uk" ? BANK_DETAILS.nameUk : BANK_DETAILS.nameEn}</div>
                <div><span className="font-medium text-navy-900">{locale === "uk" ? "ЄДРПОУ:" : "EDRPOU:"}</span> {BANK_DETAILS.edrpou}</div>
                <div><span className="font-medium text-navy-900">IBAN:</span> {BANK_DETAILS.iban}</div>
                <div><span className="font-medium text-navy-900">{locale === "uk" ? "Банк:" : "Bank:"}</span> {BANK_DETAILS.bank}</div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 italic">
                {locale === "uk"
                  ? "Після подання заявки ви отримаєте рахунок на оплату з точною сумою на електронну пошту."
                  : "After submission, you will receive an invoice with the exact amount by email."}
              </p>
            </div>

            <p className="text-xs text-muted-foreground">
              {locale === "uk"
                ? "Науково-правовий висновок базується на методиках RDNA/DaLA Світового банку."
                : "The scientific-legal conclusion is based on World Bank RDNA/DaLA methodologies."}
            </p>

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setStep("documents")} disabled={submitting}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {tCommon("back")}
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={submitting}
                className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-semibold"
              >
                {submitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    {locale === "uk" ? "Подати заявку" : "Submit Request"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
