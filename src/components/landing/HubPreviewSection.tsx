"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowRight,
  Lightbulb,
  Eye,
  CheckCircle,
  Clock,
  Users,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ── Translations ────────────────────────────────────────────────────────────

const uk = {
  badge: "Хаб відновлення",
  title: "Ініціативи спільноти",
  subtitle:
    "Відкрита платформа, де кожен може подати пропозицію для відновлення та розвитку України",
  viewAll: "Переглянути всі",
  submitCta: "Подати ініціативу",
  statusNew: "Нова",
  statusReview: "На розгляді",
  statusAccepted: "Прийнята",
  anonymous: "Анонімний автор",
};

const en = {
  badge: "Recovery Hub",
  title: "Community Initiatives",
  subtitle:
    "An open platform where everyone can submit a proposal for Ukraine's reconstruction and development",
  viewAll: "View All",
  submitCta: "Submit Initiative",
  statusNew: "New",
  statusReview: "Under Review",
  statusAccepted: "Accepted",
  anonymous: "Anonymous author",
};

// ── Preview proposals (mock) ────────────────────────────────────────────────

const previewProposals = [
  {
    id: "1",
    category: { uk: "Енергетика", en: "Energy", color: "from-amber-500 to-orange-500" },
    status: "new" as const,
    date: "2026-02-15",
    author: { uk: "Олена Коваленко", en: "Olena Kovalenko" },
    title: {
      uk: "Децентралізована сонячна енергетика для відновлених громад",
      en: "Decentralized Solar Energy for Recovered Communities",
    },
    excerpt: {
      uk: "Впровадження мікро-сонячних електростанцій у кожній відновленій громаді для енергетичної незалежності.",
      en: "Implementing micro-solar power plants in every recovered community for energy independence.",
    },
  },
  {
    id: "2",
    category: { uk: "Інфраструктура", en: "Infrastructure", color: "from-blue-500 to-blue-600" },
    status: "review" as const,
    date: "2026-02-12",
    author: { uk: "Андрій Мельник", en: "Andrii Melnyk" },
    title: {
      uk: "Модульне будівництво мостів за технологією швидкого монтажу",
      en: "Modular Bridge Construction with Rapid Assembly Technology",
    },
    excerpt: {
      uk: "Застосування модульних конструкцій для швидкого відновлення зруйнованих мостів.",
      en: "Using modular structures for rapid restoration of destroyed bridges.",
    },
  },
  {
    id: "3",
    category: { uk: "Освіта", en: "Education", color: "from-purple-500 to-violet-600" },
    status: "accepted" as const,
    date: "2026-02-10",
    author: null,
    title: {
      uk: "Цифрова платформа дистанційного навчання для віддалених регіонів",
      en: "Digital Remote Learning Platform for Remote Regions",
    },
    excerpt: {
      uk: "Єдина платформа дистанційного навчання з офлайн-режимом для шкіл у віддалених регіонах України.",
      en: "Unified remote learning platform with offline capabilities for schools in remote regions of Ukraine.",
    },
  },
  {
    id: "4",
    category: { uk: "Охорона здоров'я", en: "Healthcare", color: "from-red-500 to-rose-600" },
    status: "review" as const,
    date: "2026-02-08",
    author: { uk: "Марія Петренко", en: "Mariia Petrenko" },
    title: {
      uk: "Мобільні медичні комплекси для прифронтових районів",
      en: "Mobile Medical Complexes for Frontline Areas",
    },
    excerpt: {
      uk: "Розгортання мобільних медичних модулів для надання первинної та вторинної медичної допомоги.",
      en: "Deployment of mobile medical modules for providing primary and secondary healthcare.",
    },
  },
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

export default function HubPreviewSection() {
  const params = useParams();
  const locale = (params.locale as string) === "en" ? "en" : "uk";
  const t = locale === "uk" ? uk : en;

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
    <section className="section-padding bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-gold bg-dot-32 opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-50 border border-gold-200 rounded-full text-xs font-medium text-gold-700 mb-4">
            <Lightbulb className="h-3.5 w-3.5" />
            {t.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-900 mb-4">
            {t.title}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-500 to-gold-600 mx-auto mb-6 rounded-full" />
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Proposal cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {previewProposals.map((proposal) => {
            const StatusIcon = getStatusIcon(proposal.status);
            return (
              <Card
                key={proposal.id}
                className="group border-slate-200 hover:shadow-2xl hover:shadow-navy-900/10 hover:-translate-y-1 hover:border-gold-500/50 transition-all duration-500 overflow-hidden"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-gradient-to-r ${proposal.category.color} text-white`}
                    >
                      {proposal.category[locale]}
                    </span>
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
                  <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
                    {proposal.excerpt[locale]}
                  </p>
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
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/${locale}/hub`}>
            <Button
              size="lg"
              variant="outline"
              className="border-navy-900/20 text-navy-900 hover:bg-navy-900/5 text-base px-8 h-12"
            >
              {t.viewAll}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href={`/${locale}/hub/submit`}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-bold text-base px-8 h-12 shadow-gold-glow transition-all duration-300 hover:scale-105"
            >
              <Send className="mr-2 h-4 w-4" />
              {t.submitCta}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
