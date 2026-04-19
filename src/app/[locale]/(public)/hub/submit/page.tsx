"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  Upload,
  X,
  CheckCircle,
  FileText,
  Lightbulb,
  Send,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ── Translations ────────────────────────────────────────────────────────────

const uk = {
  heroBadge: "Подати ініціативу",
  heroTitle: "Форма подання пропозиції",
  heroSubtitle:
    "Заповніть форму нижче, щоб подати свою ініціативу на розгляд експертам інституту. Всі поля, позначені *, обов'язкові.",
  backToHub: "Повернутися до хабу",
  // Form sections
  sectionInitiative: "Про ініціативу",
  sectionDetails: "Деталі реалізації",
  sectionFiles: "Документи",
  sectionContact: "Контактна інформація",
  // Fields
  typeLabel: "Тип ініціативи",
  typePlaceholder: "Оберіть тип",
  typeProposal: "Пропозиція",
  typeResearch: "Дослідження",
  typeProject: "Проєкт",
  typeAnalytical: "Аналітична записка",
  typeOther: "Інше",
  titleLabel: "Назва",
  titlePlaceholder: "Введіть назву вашої ініціативи",
  sectorLabel: "Сектор",
  sectorPlaceholder: "Оберіть сектор",
  regionLabel: "Регіон",
  regionPlaceholder: "Оберіть регіон",
  descriptionLabel: "Опис",
  descriptionPlaceholder:
    "Детально опишіть вашу ініціативу, її мету, шляхи реалізації та очікуваний вплив (500-5000 символів)",
  descriptionHint: "символів",
  outcomeLabel: "Очікуваний результат",
  outcomePlaceholder:
    "Опишіть конкретні результати, які очікуються від реалізації ініціативи",
  budgetLabel: "Орієнтовний бюджет",
  budgetPlaceholder: "Оберіть діапазон (необов'язково)",
  budgetNone: "Не визначено",
  budget10k: "До $10,000",
  budget50k: "$10,000 – $50,000",
  budget200k: "$50,000 – $200,000",
  budget1m: "$200,000 – $1,000,000",
  budget1mPlus: "Понад $1,000,000",
  timelineLabel: "Термін реалізації",
  timelinePlaceholder: "Оберіть термін",
  timeline3m: "1–3 місяці",
  timeline6m: "3–6 місяців",
  timeline12m: "6–12 місяців",
  timeline3y: "1–3 роки",
  timeline3yPlus: "Понад 3 роки",
  filesLabel: "Файли",
  filesHint:
    "PDF, DOC, DOCX, XLS, XLSX, JPG, PNG. Максимум 10 МБ на файл, до 5 файлів.",
  filesDragDrop: "Перетягніть файли сюди або",
  filesButton: "оберіть файли",
  nameLabel: "Ім'я",
  namePlaceholder: "Ваше повне ім'я",
  emailLabel: "Email",
  emailPlaceholder: "your@email.com",
  orgLabel: "Організація",
  orgPlaceholder: "Назва організації (необов'язково)",
  phoneLabel: "Телефон",
  phonePlaceholder: "+380 XX XXX XX XX (необов'язково)",
  anonymousLabel: "Анонімна подача",
  anonymousHint:
    "Ваші контактні дані не будуть опубліковані, але будуть доступні експертам для зв'язку.",
  consentLabel: "Згода на обробку персональних даних",
  consentHint:
    "Я надаю згоду на обробку персональних даних відповідно до Закону України «Про захист персональних даних».",
  submitButton: "Надіслати пропозицію",
  // Success
  successTitle: "Пропозицію надіслано!",
  successMessage:
    "Дякуємо за вашу ініціативу. Експерти інституту розглянуть вашу пропозицію та зв'яжуться з вами протягом 5 робочих днів.",
  successBack: "Повернутися до хабу",
  successAnother: "Подати ще одну",
  // Validation
  required: "Обов'язкове поле",
  minChars: "Мінімум 500 символів",
  maxChars: "Максимум 5000 символів",
  consentRequired: "Необхідно надати згоду",
};

const en = {
  heroBadge: "Submit Initiative",
  heroTitle: "Proposal Submission Form",
  heroSubtitle:
    "Fill out the form below to submit your initiative for review by the institute's experts. All fields marked with * are required.",
  backToHub: "Back to Hub",
  // Form sections
  sectionInitiative: "About the Initiative",
  sectionDetails: "Implementation Details",
  sectionFiles: "Documents",
  sectionContact: "Contact Information",
  // Fields
  typeLabel: "Initiative Type",
  typePlaceholder: "Select type",
  typeProposal: "Proposal",
  typeResearch: "Research",
  typeProject: "Project",
  typeAnalytical: "Analytical Note",
  typeOther: "Other",
  titleLabel: "Title",
  titlePlaceholder: "Enter the title of your initiative",
  sectorLabel: "Sector",
  sectorPlaceholder: "Select sector",
  regionLabel: "Region",
  regionPlaceholder: "Select region",
  descriptionLabel: "Description",
  descriptionPlaceholder:
    "Describe your initiative in detail — its purpose, implementation approach, and expected impact (500-5000 characters)",
  descriptionHint: "characters",
  outcomeLabel: "Expected Outcome",
  outcomePlaceholder:
    "Describe the specific results expected from the implementation of this initiative",
  budgetLabel: "Estimated Budget",
  budgetPlaceholder: "Select range (optional)",
  budgetNone: "Not specified",
  budget10k: "Under $10,000",
  budget50k: "$10,000 – $50,000",
  budget200k: "$50,000 – $200,000",
  budget1m: "$200,000 – $1,000,000",
  budget1mPlus: "Over $1,000,000",
  timelineLabel: "Timeline",
  timelinePlaceholder: "Select timeline",
  timeline3m: "1–3 months",
  timeline6m: "3–6 months",
  timeline12m: "6–12 months",
  timeline3y: "1–3 years",
  timeline3yPlus: "3+ years",
  filesLabel: "Files",
  filesHint:
    "PDF, DOC, DOCX, XLS, XLSX, JPG, PNG. Max 10 MB per file, up to 5 files.",
  filesDragDrop: "Drag & drop files here or",
  filesButton: "browse files",
  nameLabel: "Name",
  namePlaceholder: "Your full name",
  emailLabel: "Email",
  emailPlaceholder: "your@email.com",
  orgLabel: "Organization",
  orgPlaceholder: "Organization name (optional)",
  phoneLabel: "Phone",
  phonePlaceholder: "+380 XX XXX XX XX (optional)",
  anonymousLabel: "Anonymous submission",
  anonymousHint:
    "Your contact details will not be published but will be available to experts for communication.",
  consentLabel: "Data processing consent",
  consentHint:
    'I consent to the processing of personal data in accordance with Ukrainian law "On the Protection of Personal Data."',
  submitButton: "Submit Proposal",
  // Success
  successTitle: "Proposal Submitted!",
  successMessage:
    "Thank you for your initiative. The institute's experts will review your proposal and contact you within 5 business days.",
  successBack: "Back to Hub",
  successAnother: "Submit Another",
  // Validation
  required: "Required field",
  minChars: "Minimum 500 characters",
  maxChars: "Maximum 5000 characters",
  consentRequired: "Consent is required",
};

// ── Data ────────────────────────────────────────────────────────────────────

const sectors = [
  { id: "infrastructure", uk: "Інфраструктура", en: "Infrastructure" },
  { id: "energy", uk: "Енергетика", en: "Energy" },
  { id: "housing", uk: "Житлове будівництво", en: "Housing" },
  { id: "education", uk: "Освіта", en: "Education" },
  { id: "healthcare", uk: "Охорона здоров'я", en: "Healthcare" },
  { id: "agriculture", uk: "Агросектор", en: "Agriculture" },
  { id: "it", uk: "ІТ та цифровізація", en: "IT & Digital" },
  { id: "environment", uk: "Екологія", en: "Environment" },
  { id: "economy", uk: "Економіка", en: "Economy" },
  { id: "legal", uk: "Правова сфера", en: "Legal" },
];

const regions = [
  { id: "all", uk: "Вся Україна", en: "All of Ukraine" },
  { id: "vinnytsia", uk: "Вінницька область", en: "Vinnytsia Oblast" },
  { id: "volyn", uk: "Волинська область", en: "Volyn Oblast" },
  { id: "dnipro", uk: "Дніпропетровська область", en: "Dnipropetrovsk Oblast" },
  { id: "donetsk", uk: "Донецька область", en: "Donetsk Oblast" },
  { id: "zhytomyr", uk: "Житомирська область", en: "Zhytomyr Oblast" },
  { id: "zakarpattia", uk: "Закарпатська область", en: "Zakarpattia Oblast" },
  { id: "zaporizhzhia", uk: "Запорізька область", en: "Zaporizhzhia Oblast" },
  { id: "ivano-frankivsk", uk: "Івано-Франківська область", en: "Ivano-Frankivsk Oblast" },
  { id: "kyiv-oblast", uk: "Київська область", en: "Kyiv Oblast" },
  { id: "kyiv-city", uk: "м. Київ", en: "Kyiv City" },
  { id: "kirovohrad", uk: "Кіровоградська область", en: "Kirovohrad Oblast" },
  { id: "luhansk", uk: "Луганська область", en: "Luhansk Oblast" },
  { id: "lviv", uk: "Львівська область", en: "Lviv Oblast" },
  { id: "mykolaiv", uk: "Миколаївська область", en: "Mykolaiv Oblast" },
  { id: "odesa", uk: "Одеська область", en: "Odesa Oblast" },
  { id: "poltava", uk: "Полтавська область", en: "Poltava Oblast" },
  { id: "rivne", uk: "Рівненська область", en: "Rivne Oblast" },
  { id: "sumy", uk: "Сумська область", en: "Sumy Oblast" },
  { id: "ternopil", uk: "Тернопільська область", en: "Ternopil Oblast" },
  { id: "kharkiv", uk: "Харківська область", en: "Kharkiv Oblast" },
  { id: "kherson", uk: "Херсонська область", en: "Kherson Oblast" },
  { id: "khmelnytskyi", uk: "Хмельницька область", en: "Khmelnytskyi Oblast" },
  { id: "cherkasy", uk: "Черкаська область", en: "Cherkasy Oblast" },
  { id: "chernivtsi", uk: "Чернівецька область", en: "Chernivtsi Oblast" },
  { id: "chernihiv", uk: "Чернігівська область", en: "Chernihiv Oblast" },
  { id: "crimea", uk: "АР Крим", en: "Crimea" },
];

const ACCEPTED_TYPES = ".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png";
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_FILES = 5;

// ── Component ───────────────────────────────────────────────────────────────

export default function HubSubmitPage() {
  const params = useParams();
  const locale = (params.locale as string) === "en" ? "en" : "uk";
  const t = locale === "uk" ? uk : en;

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    sector: "",
    region: "",
    description: "",
    outcome: "",
    budget: "",
    timeline: "",
    name: "",
    email: "",
    organization: "",
    phone: "",
    anonymous: false,
    consent: false,
  });
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleFileAdd = (newFiles: FileList | null) => {
    if (!newFiles) return;
    const added: File[] = [];
    for (let i = 0; i < newFiles.length && files.length + added.length < MAX_FILES; i++) {
      if (newFiles[i].size <= MAX_FILE_SIZE) {
        added.push(newFiles[i]);
      }
    }
    setFiles((prev) => [...prev, ...added]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.type) errs.type = t.required;
    if (!formData.title.trim()) errs.title = t.required;
    if (!formData.sector) errs.sector = t.required;
    if (!formData.region) errs.region = t.required;
    if (formData.description.length < 500) errs.description = t.minChars;
    if (formData.description.length > 5000) errs.description = t.maxChars;
    if (!formData.outcome.trim()) errs.outcome = t.required;
    if (!formData.timeline) errs.timeline = t.required;
    if (!formData.name.trim()) errs.name = t.required;
    if (!formData.email.trim()) errs.email = t.required;
    if (!formData.consent) errs.consent = t.consentRequired;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleReset = () => {
    setFormData({
      type: "",
      title: "",
      sector: "",
      region: "",
      description: "",
      outcome: "",
      budget: "",
      timeline: "",
      name: "",
      email: "",
      organization: "",
      phone: "",
      anonymous: false,
      consent: false,
    });
    setFiles([]);
    setErrors({});
    setSubmitted(false);
  };

  // ── Success state ─────────────────────────────────────────────────
  if (submitted) {
    return (
      <>
        <section className="relative overflow-hidden bg-gradient-radial-gold">
          <div className="absolute inset-0 bg-grid-gold bg-grid-64 opacity-40" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-20 md:pt-40 md:pb-28">
            <div className="max-w-2xl mx-auto text-center animate-fade-in-up">
              <div className="mx-auto mb-8 w-20 h-20 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-emerald-400" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-6">
                {t.successTitle}
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed mb-10 max-w-xl mx-auto">
                {t.successMessage}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/${locale}/hub`}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-bold text-base px-10 h-14 shadow-gold-glow transition-all duration-300 hover:scale-105"
                  >
                    {t.successBack}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 text-base px-10 h-14"
                  onClick={handleReset}
                >
                  {t.successAnother}
                </Button>
              </div>
            </div>
          </div>

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
        <div className="h-20 bg-white" />
      </>
    );
  }

  // ── Form render ───────────────────────────────────────────────────
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
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
              <Send className="h-4 w-4 text-gold-400" />
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

      {/* ── Form ──────────────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Back link */}
          <Link
            href={`/${locale}/hub`}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-gold-600 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.backToHub}
          </Link>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* ── Section: About Initiative ────────────────────────── */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 hover:border-gold-500/30 transition-all duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Lightbulb className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-serif font-bold text-navy-900">
                  {t.sectionInitiative}
                </h2>
              </div>

              <div className="space-y-5">
                {/* Type */}
                <div>
                  <Label className="text-navy-900 font-medium mb-1.5 block">
                    {t.typeLabel} <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.type}
                    onValueChange={(v) => updateField("type", v)}
                  >
                    <SelectTrigger
                      className={`h-11 ${errors.type ? "border-red-400" : ""}`}
                    >
                      <SelectValue placeholder={t.typePlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="proposal">{t.typeProposal}</SelectItem>
                      <SelectItem value="research">{t.typeResearch}</SelectItem>
                      <SelectItem value="project">{t.typeProject}</SelectItem>
                      <SelectItem value="analytical">
                        {t.typeAnalytical}
                      </SelectItem>
                      <SelectItem value="other">{t.typeOther}</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.type && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.type}
                    </p>
                  )}
                </div>

                {/* Title */}
                <div>
                  <Label className="text-navy-900 font-medium mb-1.5 block">
                    {t.titleLabel} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    placeholder={t.titlePlaceholder}
                    className={`h-11 ${errors.title ? "border-red-400" : ""}`}
                  />
                  {errors.title && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.title}
                    </p>
                  )}
                </div>

                {/* Sector + Region */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <Label className="text-navy-900 font-medium mb-1.5 block">
                      {t.sectorLabel} <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.sector}
                      onValueChange={(v) => updateField("sector", v)}
                    >
                      <SelectTrigger
                        className={`h-11 ${errors.sector ? "border-red-400" : ""}`}
                      >
                        <SelectValue placeholder={t.sectorPlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {sectors.map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            {s[locale]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.sector && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.sector}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="text-navy-900 font-medium mb-1.5 block">
                      {t.regionLabel} <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.region}
                      onValueChange={(v) => updateField("region", v)}
                    >
                      <SelectTrigger
                        className={`h-11 ${errors.region ? "border-red-400" : ""}`}
                      >
                        <SelectValue placeholder={t.regionPlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((r) => (
                          <SelectItem key={r.id} value={r.id}>
                            {r[locale]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.region && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.region}
                      </p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <Label className="text-navy-900 font-medium mb-1.5 block">
                    {t.descriptionLabel} <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    placeholder={t.descriptionPlaceholder}
                    rows={8}
                    className={`resize-none ${errors.description ? "border-red-400" : ""}`}
                  />
                  <div className="flex items-center justify-between mt-1.5">
                    {errors.description ? (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.description}
                      </p>
                    ) : (
                      <span />
                    )}
                    <span
                      className={`text-xs ${
                        formData.description.length < 500
                          ? "text-slate-400"
                          : formData.description.length > 5000
                          ? "text-red-500"
                          : "text-emerald-600"
                      }`}
                    >
                      {formData.description.length} / 5000 {t.descriptionHint}
                    </span>
                  </div>
                </div>

                {/* Expected outcome */}
                <div>
                  <Label className="text-navy-900 font-medium mb-1.5 block">
                    {t.outcomeLabel} <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    value={formData.outcome}
                    onChange={(e) => updateField("outcome", e.target.value)}
                    placeholder={t.outcomePlaceholder}
                    rows={4}
                    className={`resize-none ${errors.outcome ? "border-red-400" : ""}`}
                  />
                  {errors.outcome && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.outcome}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ── Section: Details ─────────────────────────────────── */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 hover:border-gold-500/30 transition-all duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-serif font-bold text-navy-900">
                  {t.sectionDetails}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Budget */}
                <div>
                  <Label className="text-navy-900 font-medium mb-1.5 block">
                    {t.budgetLabel}
                  </Label>
                  <Select
                    value={formData.budget}
                    onValueChange={(v) => updateField("budget", v)}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder={t.budgetPlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">{t.budgetNone}</SelectItem>
                      <SelectItem value="10k">{t.budget10k}</SelectItem>
                      <SelectItem value="50k">{t.budget50k}</SelectItem>
                      <SelectItem value="200k">{t.budget200k}</SelectItem>
                      <SelectItem value="1m">{t.budget1m}</SelectItem>
                      <SelectItem value="1m+">{t.budget1mPlus}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Timeline */}
                <div>
                  <Label className="text-navy-900 font-medium mb-1.5 block">
                    {t.timelineLabel} <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.timeline}
                    onValueChange={(v) => updateField("timeline", v)}
                  >
                    <SelectTrigger
                      className={`h-11 ${errors.timeline ? "border-red-400" : ""}`}
                    >
                      <SelectValue placeholder={t.timelinePlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3m">{t.timeline3m}</SelectItem>
                      <SelectItem value="6m">{t.timeline6m}</SelectItem>
                      <SelectItem value="12m">{t.timeline12m}</SelectItem>
                      <SelectItem value="3y">{t.timeline3y}</SelectItem>
                      <SelectItem value="3y+">{t.timeline3yPlus}</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.timeline && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.timeline}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ── Section: Files ───────────────────────────────────── */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 hover:border-gold-500/30 transition-all duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Upload className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-serif font-bold text-navy-900">
                  {t.sectionFiles}
                </h2>
              </div>

              <div
                className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center
                  hover:border-gold-500/50 transition-colors duration-300 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.add("border-gold-500/50", "bg-gold-50/30");
                }}
                onDragLeave={(e) => {
                  e.currentTarget.classList.remove("border-gold-500/50", "bg-gold-50/30");
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove("border-gold-500/50", "bg-gold-50/30");
                  handleFileAdd(e.dataTransfer.files);
                }}
              >
                <Upload className="h-8 w-8 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-500">
                  {t.filesDragDrop}{" "}
                  <span className="text-gold-600 font-medium underline">
                    {t.filesButton}
                  </span>
                </p>
                <p className="text-xs text-slate-400 mt-2">{t.filesHint}</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={ACCEPTED_TYPES}
                  multiple
                  className="hidden"
                  onChange={(e) => handleFileAdd(e.target.files)}
                />
              </div>

              {/* File list */}
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-2.5 border border-slate-100"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <FileText className="h-4 w-4 text-gold-500 shrink-0" />
                        <span className="text-sm text-slate-700 truncate">
                          {file.name}
                        </span>
                        <span className="text-xs text-slate-400 shrink-0">
                          {(file.size / 1024 / 1024).toFixed(1)} MB
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── Section: Contact ─────────────────────────────────── */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 hover:border-gold-500/30 transition-all duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Send className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-serif font-bold text-navy-900">
                  {t.sectionContact}
                </h2>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <Label className="text-navy-900 font-medium mb-1.5 block">
                      {t.nameLabel} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder={t.namePlaceholder}
                      className={`h-11 ${errors.name ? "border-red-400" : ""}`}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <Label className="text-navy-900 font-medium mb-1.5 block">
                      {t.emailLabel} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder={t.emailPlaceholder}
                      className={`h-11 ${errors.email ? "border-red-400" : ""}`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Organization */}
                  <div>
                    <Label className="text-navy-900 font-medium mb-1.5 block">
                      {t.orgLabel}
                    </Label>
                    <Input
                      value={formData.organization}
                      onChange={(e) =>
                        updateField("organization", e.target.value)
                      }
                      placeholder={t.orgPlaceholder}
                      className="h-11"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <Label className="text-navy-900 font-medium mb-1.5 block">
                      {t.phoneLabel}
                    </Label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder={t.phonePlaceholder}
                      className="h-11"
                    />
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-4 pt-2">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.anonymous}
                      onChange={(e) =>
                        updateField("anonymous", e.target.checked)
                      }
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-gold-600 focus:ring-gold-500"
                    />
                    <div>
                      <span className="text-sm font-medium text-navy-900 group-hover:text-gold-600 transition-colors">
                        {t.anonymousLabel}
                      </span>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {t.anonymousHint}
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.consent}
                      onChange={(e) =>
                        updateField("consent", e.target.checked)
                      }
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-gold-600 focus:ring-gold-500"
                    />
                    <div>
                      <span className="text-sm font-medium text-navy-900 group-hover:text-gold-600 transition-colors">
                        {t.consentLabel}{" "}
                        <span className="text-red-500">*</span>
                      </span>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {t.consentHint}
                      </p>
                    </div>
                  </label>
                  {errors.consent && (
                    <p className="text-xs text-red-500 flex items-center gap-1 ml-7">
                      <AlertCircle className="h-3 w-3" />
                      {errors.consent}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ── Submit button ────────────────────────────────────── */}
            <div className="flex justify-end">
              <Button
                type="submit"
                size="lg"
                className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-bold text-base px-12 h-14 shadow-gold-glow transition-all duration-300 hover:scale-105"
              >
                {t.submitButton}
                <Send className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
