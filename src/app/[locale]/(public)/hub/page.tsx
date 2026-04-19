"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowRight,
  Lightbulb,
  Building2,
  Zap,
  Home,
  GraduationCap,
  HeartPulse,
  Wheat,
  Monitor,
  Leaf,
  TrendingUp,
  Scale,
  Clock,
  Eye,
  CheckCircle,
  Users,
  FileText,
  BarChart3,
  Handshake,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ── Translations ────────────────────────────────────────────────────────────

const uk = {
  heroBadge: "Хаб розвитку",
  heroTitle: "Ініціативи відновлення та розвитку",
  heroSubtitle:
    "Відкрита платформа для подання пропозицій, ідей, наукових досліджень та ініціатив, пов'язаних з відновленням і розвитком України. Кожен може зробити свій внесок.",
  categoriesBadge: "Сектори",
  categoriesTitle: "Напрямки ініціатив",
  proposalsBadge: "Пропозиції",
  proposalsTitle: "Подані ініціативи",
  filterAll: "Всі",
  sortDate: "За датою",
  sortPopularity: "За популярністю",
  statusNew: "Нова",
  statusReview: "На розгляді",
  statusAccepted: "Прийнята",
  statsBadge: "Статистика",
  statsTitle: "Платформа у цифрах",
  statsProposals: "Подано пропозицій",
  statsReview: "На розгляді",
  statsSectors: "Секторів охоплено",
  statsPartners: "Партнерів залучено",
  ctaTitle: "Маєте ідею для відновлення?",
  ctaSubtitle:
    "Подайте свою пропозицію, дослідження або проєкт — експерти інституту розглянуть кожну ініціативу та нададуть зворотний зв'язок.",
  ctaButton: "Подати пропозицію",
  anonymous: "Анонімний автор",
  readMore: "Детальніше",
};

const en = {
  heroBadge: "Development Hub",
  heroTitle: "Reconstruction & Development Initiatives",
  heroSubtitle:
    "An open platform for submitting proposals, ideas, research papers, and initiatives related to Ukraine's reconstruction and development. Everyone can contribute.",
  categoriesBadge: "Sectors",
  categoriesTitle: "Initiative Areas",
  proposalsBadge: "Proposals",
  proposalsTitle: "Submitted Initiatives",
  filterAll: "All",
  sortDate: "By date",
  sortPopularity: "By popularity",
  statusNew: "New",
  statusReview: "Under Review",
  statusAccepted: "Accepted",
  statsBadge: "Statistics",
  statsTitle: "Platform in Numbers",
  statsProposals: "Proposals submitted",
  statsReview: "Under review",
  statsSectors: "Sectors covered",
  statsPartners: "Partners involved",
  ctaTitle: "Have an idea for recovery?",
  ctaSubtitle:
    "Submit your proposal, research, or project — the institute's experts will review every initiative and provide feedback.",
  ctaButton: "Submit a Proposal",
  anonymous: "Anonymous author",
  readMore: "Read more",
};

// ── Categories ──────────────────────────────────────────────────────────────

const categories = [
  { id: "infrastructure", icon: Building2, color: "from-blue-500 to-blue-600", uk: "Інфраструктура", en: "Infrastructure" },
  { id: "energy", icon: Zap, color: "from-amber-500 to-orange-500", uk: "Енергетика", en: "Energy" },
  { id: "housing", icon: Home, color: "from-emerald-500 to-green-600", uk: "Житлове будівництво", en: "Housing" },
  { id: "education", icon: GraduationCap, color: "from-purple-500 to-violet-600", uk: "Освіта", en: "Education" },
  { id: "healthcare", icon: HeartPulse, color: "from-red-500 to-rose-600", uk: "Охорона здоров'я", en: "Healthcare" },
  { id: "agriculture", icon: Wheat, color: "from-lime-500 to-green-500", uk: "Агросектор", en: "Agriculture" },
  { id: "it", icon: Monitor, color: "from-cyan-500 to-blue-500", uk: "ІТ та цифровізація", en: "IT & Digital" },
  { id: "environment", icon: Leaf, color: "from-teal-500 to-emerald-600", uk: "Екологія", en: "Environment" },
  { id: "economy", icon: TrendingUp, color: "from-indigo-500 to-blue-600", uk: "Економіка", en: "Economy" },
  { id: "legal", icon: Scale, color: "from-slate-500 to-slate-700", uk: "Правова сфера", en: "Legal" },
];

// ── Mock proposals ──────────────────────────────────────────────────────────

const mockProposals = [
  {
    id: "1",
    category: "energy",
    status: "new" as const,
    date: "2026-02-15",
    author: { uk: "Олена Коваленко", en: "Olena Kovalenko" },
    title: {
      uk: "Децентралізована сонячна енергетика для відновлених громад",
      en: "Decentralized Solar Energy for Recovered Communities",
    },
    excerpt: {
      uk: "Впровадження мікро-сонячних електростанцій у кожній відновленій громаді для забезпечення енергетичної незалежності та стійкості до подальших обстрілів інфраструктури.",
      en: "Implementing micro-solar power plants in every recovered community to ensure energy independence and resilience against further infrastructure attacks.",
    },
  },
  {
    id: "2",
    category: "infrastructure",
    status: "review" as const,
    date: "2026-02-12",
    author: { uk: "Андрій Мельник", en: "Andrii Melnyk" },
    title: {
      uk: "Модульне будівництво мостів за технологією швидкого монтажу",
      en: "Modular Bridge Construction with Rapid Assembly Technology",
    },
    excerpt: {
      uk: "Пропозиція застосування модульних конструкцій для швидкого відновлення зруйнованих мостів з використанням стандартизованих елементів європейського виробництва.",
      en: "Proposal for using modular structures for rapid restoration of destroyed bridges using standardized European-manufactured elements.",
    },
  },
  {
    id: "3",
    category: "education",
    status: "accepted" as const,
    date: "2026-02-10",
    author: null,
    title: {
      uk: "Цифрова платформа дистанційного навчання для віддалених регіонів",
      en: "Digital Remote Learning Platform for Remote Regions",
    },
    excerpt: {
      uk: "Створення єдиної платформи дистанційного навчання з офлайн-режимом для шкіл у віддалених регіонах, де інтернет-з'єднання нестабільне.",
      en: "Creating a unified remote learning platform with offline capabilities for schools in remote regions where internet connectivity is unstable.",
    },
  },
  {
    id: "4",
    category: "healthcare",
    status: "review" as const,
    date: "2026-02-08",
    author: { uk: "Марія Петренко", en: "Mariia Petrenko" },
    title: {
      uk: "Мобільні медичні комплекси для прифронтових районів",
      en: "Mobile Medical Complexes for Frontline Areas",
    },
    excerpt: {
      uk: "Розгортання мобільних медичних модулів на базі контейнерних рішень з повним оснащенням для надання первинної та вторинної медичної допомоги.",
      en: "Deployment of mobile medical modules based on container solutions fully equipped for providing primary and secondary healthcare.",
    },
  },
  {
    id: "5",
    category: "it",
    status: "new" as const,
    date: "2026-02-06",
    author: { uk: "Денис Бондаренко", en: "Denys Bondarenko" },
    title: {
      uk: "Реєстр збитків на блокчейні для прозорого обліку",
      en: "Blockchain-based Damage Registry for Transparent Accounting",
    },
    excerpt: {
      uk: "Впровадження блокчейн-технології для створення незмінного та прозорого реєстру збитків, що забезпечить довіру міжнародних партнерів та запобігатиме подвійним зверненням.",
      en: "Implementing blockchain technology to create an immutable and transparent damage registry that ensures international partner trust and prevents duplicate claims.",
    },
  },
  {
    id: "6",
    category: "agriculture",
    status: "new" as const,
    date: "2026-02-04",
    author: { uk: "Ігор Шевченко", en: "Ihor Shevchenko" },
    title: {
      uk: "Дронова система моніторингу мінних полів на сільськогосподарських землях",
      en: "Drone-based Monitoring System for Minefields on Agricultural Land",
    },
    excerpt: {
      uk: "Розробка автоматизованої дронової системи з мультиспектральними сенсорами для виявлення та картографування мінних полів на сільськогосподарських угіддях.",
      en: "Development of an automated drone system with multispectral sensors for detecting and mapping minefields on agricultural land.",
    },
  },
  {
    id: "7",
    category: "housing",
    status: "accepted" as const,
    date: "2026-02-01",
    author: null,
    title: {
      uk: "Енергоефективне соціальне житло з переробленого бетону",
      en: "Energy-efficient Social Housing from Recycled Concrete",
    },
    excerpt: {
      uk: "Проєкт будівництва соціального житла з використанням перероблених будівельних матеріалів зі зруйнованих будівель, що зменшить вартість та екологічний вплив.",
      en: "Social housing construction project using recycled building materials from destroyed structures, reducing costs and environmental impact.",
    },
  },
  {
    id: "8",
    category: "economy",
    status: "review" as const,
    date: "2026-01-28",
    author: { uk: "Наталія Козак", en: "Nataliia Kozak" },
    title: {
      uk: "Мікрокредитна програма для малого бізнесу постраждалих регіонів",
      en: "Microcredit Program for Small Businesses in Affected Regions",
    },
    excerpt: {
      uk: "Створення спеціальної мікрокредитної програми з пільговими ставками та менторською підтримкою для підприємців, що відновлюють бізнес у постраждалих регіонах.",
      en: "Creating a special microcredit program with preferential rates and mentoring support for entrepreneurs restoring businesses in affected regions.",
    },
  },
];

// ── Stats data ──────────────────────────────────────────────────────────────

const stats = [
  { value: "120+", keyUk: "statsProposals", keyEn: "statsProposals", icon: FileText },
  { value: "34", keyUk: "statsReview", keyEn: "statsReview", icon: Eye },
  { value: "10", keyUk: "statsSectors", keyEn: "statsSectors", icon: BarChart3 },
  { value: "15+", keyUk: "statsPartners", keyEn: "statsPartners", icon: Handshake },
];

// ── Status helpers ──────────────────────────────────────────────────────────

function getStatusStyle(status: "new" | "review" | "accepted") {
  switch (status) {
    case "new":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "review":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "accepted":
      return "bg-blue-50 text-blue-700 border-blue-200";
  }
}

function getStatusIcon(status: "new" | "review" | "accepted") {
  switch (status) {
    case "new":
      return Lightbulb;
    case "review":
      return Eye;
    case "accepted":
      return CheckCircle;
  }
}

// ── Component ───────────────────────────────────────────────────────────────

export default function HubPage() {
  const params = useParams();
  const locale = (params.locale as string) === "en" ? "en" : "uk";
  const t = locale === "uk" ? uk : en;

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"date" | "popularity">("date");

  const filteredProposals = activeCategory
    ? mockProposals.filter((p) => p.category === activeCategory)
    : mockProposals;

  const statusLabel = (status: "new" | "review" | "accepted") => {
    switch (status) {
      case "new":
        return t.statusNew;
      case "review":
        return t.statusReview;
      case "accepted":
        return t.statusAccepted;
    }
  };

  return (
    <>
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
              <Lightbulb className="h-4 w-4 text-gold-400" />
              <span className="text-sm font-medium text-gold-400">
                {t.heroBadge}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.1] mb-6">
              {t.heroTitle}
            </h1>

            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10">
              {t.heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/hub/submit`}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-bold text-base px-10 h-14 shadow-gold-glow transition-all duration-300 hover:scale-105"
                >
                  {t.ctaButton}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="#proposals">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 text-base px-10 h-14"
                >
                  <Search className="mr-2 h-4 w-4" />
                  {locale === "uk" ? "Переглянути ініціативи" : "Browse Initiatives"}
                </Button>
              </a>
            </div>
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

      {/* ── Categories Grid ──────────────────────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-50 border border-gold-200 rounded-full text-xs font-medium text-gold-700 mb-4">
              {t.categoriesBadge}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-900 mb-4">
              {t.categoriesTitle}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 lg:gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() =>
                    setActiveCategory(isActive ? null : cat.id)
                  }
                  className={`group relative bg-white rounded-xl border p-6
                    transition-all duration-500 ease-out text-center
                    hover:shadow-2xl hover:shadow-navy-900/10
                    hover:-translate-y-1 overflow-hidden
                    ${
                      isActive
                        ? "border-gold-500/50 shadow-xl shadow-navy-900/10 -translate-y-1 ring-2 ring-gold-500/20"
                        : "border-slate-200 hover:border-gold-500/50"
                    }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-navy-900/0 to-gold-500/0 group-hover:from-navy-900/[0.02] group-hover:to-gold-500/[0.04] transition-all duration-500 rounded-xl" />
                  <div
                    className={`relative mx-auto mb-3 inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${cat.color} rounded-xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <p className="relative text-sm font-semibold text-navy-900">
                    {cat[locale]}
                  </p>
                  <div className="accent-line" />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Proposals List ───────────────────────────────────────────── */}
      <section
        id="proposals"
        className="section-padding bg-slate-50 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-dot-gold bg-dot-32 opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-50 border border-gold-200 rounded-full text-xs font-medium text-gold-700 mb-4">
              {t.proposalsBadge}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-900 mb-4">
              {t.proposalsTitle}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto mb-6 rounded-full" />
          </div>

          {/* Filters row */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-slate-400" />
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 ${
                  !activeCategory
                    ? "bg-navy-900 text-white border-navy-900"
                    : "bg-white text-slate-600 border-slate-200 hover:border-gold-500/50"
                }`}
              >
                {t.filterAll}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() =>
                    setActiveCategory(
                      activeCategory === cat.id ? null : cat.id
                    )
                  }
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 ${
                    activeCategory === cat.id
                      ? "bg-navy-900 text-white border-navy-900"
                      : "bg-white text-slate-600 border-slate-200 hover:border-gold-500/50"
                  }`}
                >
                  {cat[locale]}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSortBy("date")}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 ${
                  sortBy === "date"
                    ? "bg-gold-50 text-gold-700 border-gold-200"
                    : "bg-white text-slate-500 border-slate-200"
                }`}
              >
                <Clock className="inline h-3 w-3 mr-1" />
                {t.sortDate}
              </button>
              <button
                onClick={() => setSortBy("popularity")}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 ${
                  sortBy === "popularity"
                    ? "bg-gold-50 text-gold-700 border-gold-200"
                    : "bg-white text-slate-500 border-slate-200"
                }`}
              >
                <Users className="inline h-3 w-3 mr-1" />
                {t.sortPopularity}
              </button>
            </div>
          </div>

          {/* Proposal cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProposals.map((proposal) => {
              const category = categories.find(
                (c) => c.id === proposal.category
              );
              const StatusIcon = getStatusIcon(proposal.status);
              return (
                <Card
                  key={proposal.id}
                  className="group border-slate-200 hover:shadow-2xl hover:shadow-navy-900/10 hover:-translate-y-1 hover:border-gold-500/50 transition-all duration-500 overflow-hidden"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      {category && (
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-gradient-to-r ${category.color} text-white`}
                        >
                          {category[locale]}
                        </span>
                      )}
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${getStatusStyle(
                          proposal.status
                        )}`}
                      >
                        <StatusIcon className="h-3 w-3" />
                        {statusLabel(proposal.status)}
                      </span>
                    </div>
                    <CardTitle className="font-serif text-navy-900 text-lg leading-tight group-hover:text-navy-800 transition-colors duration-300">
                      {proposal.title[locale]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3">
                      {proposal.excerpt[locale]}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Users className="h-3.5 w-3.5" />
                        <span>
                          {proposal.author
                            ? proposal.author[locale]
                            : t.anonymous}
                        </span>
                        <span className="text-slate-300">|</span>
                        <Clock className="h-3.5 w-3.5" />
                        <span>{proposal.date}</span>
                      </div>
                      <span className="flex items-center text-gold-600 font-semibold text-xs group-hover:text-gold-700 transition-colors duration-300">
                        {t.readMore}
                        <ArrowRight className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────── */}
      <section className="section-padding bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-gold bg-grid-64 opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-500/30 rounded-full text-xs font-medium text-gold-400 mb-4">
              {t.statsBadge}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
              {t.statsTitle}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.keyUk}
                  className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center
                    hover:bg-white/[0.08] hover:border-gold-500/30 transition-all duration-500"
                >
                  <div className="mx-auto mb-4 w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center">
                    <Icon className="h-6 w-6 text-gold-400" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-serif font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <p className="text-white/60 text-sm">
                    {t[stat.keyUk as keyof typeof uk]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 relative">
          <div className="absolute inset-0 bg-grid-gold bg-grid-64 opacity-20" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold-500/5 rounded-full blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-6">
                {t.ctaTitle}
              </h2>
              <p className="text-lg text-slate-300 mb-10 max-w-xl mx-auto leading-relaxed">
                {t.ctaSubtitle}
              </p>
              <Link href={`/${locale}/hub/submit`}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-bold text-base px-10 h-14 shadow-gold-glow transition-all duration-300 hover:scale-105"
                >
                  {t.ctaButton}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
