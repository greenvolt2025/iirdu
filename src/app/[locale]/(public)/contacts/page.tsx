"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Phone, Mail, MapPin, Send, Clock, Shield, MessageCircle, CheckCircle, AlertCircle } from "lucide-react";
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
import { siteConfig } from "@/config/site";

export default function ContactsPage() {
  const t = useTranslations("contacts");
  const params = useParams();
  const locale = params.locale as string;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    messageType: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Build email subject and body
    const typeLabels: Record<string, { uk: string; en: string }> = {
      consultation: { uk: "Консультація", en: "Consultation" },
      question: { uk: "Питання", en: "Question" },
      partnership: { uk: "Партнерство", en: "Partnership" },
    };

    const typeLabel = formData.messageType
      ? (locale === "uk" ? typeLabels[formData.messageType]?.uk : typeLabels[formData.messageType]?.en) || formData.messageType
      : (locale === "uk" ? "Загальне звернення" : "General Inquiry");

    const subject = `[${typeLabel}] ${formData.name}`;

    const body = `
${locale === "uk" ? "Ім'я:" : "Name:"} ${formData.name}
${locale === "uk" ? "Email:" : "Email:"} ${formData.email}
${locale === "uk" ? "Телефон:" : "Phone:"} ${formData.phone || (locale === "uk" ? "Не вказано" : "Not specified")}
${locale === "uk" ? "Тип звернення:" : "Message type:"} ${typeLabel}

${locale === "uk" ? "Повідомлення:" : "Message:"}
${formData.message}
    `.trim();

    // Open email client
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Show success message
    setSubmitStatus({
      type: "success",
      message:
        locale === "uk"
          ? "Відкривається ваш поштовий клієнт. Будь ласка, надішліть лист."
          : "Opening your email client. Please send the email.",
    });

    // Reset form after a delay
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        messageType: "",
        message: "",
      });
      setSubmitStatus({ type: null, message: "" });
    }, 3000);
  };

  const contactCards = [
    {
      icon: Phone,
      label: t("phone"),
      value: siteConfig.phone,
      href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Mail,
      label: t("email"),
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      color: "from-gold-500 to-gold-600",
    },
    {
      icon: MapPin,
      label: t("address"),
      value: t("addressValue"),
      href: null,
      color: "from-emerald-500 to-green-600",
    },
    {
      icon: MessageCircle,
      label: t("telegram"),
      value: t("telegramHandle"),
      href: siteConfig.social.telegram,
      color: "from-sky-500 to-blue-500",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
        <div className="absolute inset-0 bg-grid-gold bg-grid-64 opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-navy-600/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
              {t("heroTitle")}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
              {t("heroSubtitle")}
            </p>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactCards.map((card) => {
              const Icon = card.icon;
              const content = (
                <div className="group relative h-full bg-white rounded-xl border border-slate-200 p-6
                  transition-all duration-500 ease-out
                  hover:shadow-2xl hover:shadow-navy-900/10
                  hover:-translate-y-2 hover:border-gold-500/50
                  overflow-hidden text-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-navy-900/0 to-gold-500/0
                    group-hover:from-navy-900/[0.02] group-hover:to-gold-500/[0.04]
                    transition-all duration-500 rounded-xl" />

                  <div className={`relative mb-4 inline-flex items-center justify-center w-14 h-14
                    bg-gradient-to-br ${card.color} rounded-xl
                    shadow-lg group-hover:scale-110
                    transition-all duration-500`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>

                  <h3 className="relative text-sm font-medium text-slate-500 mb-1">{card.label}</h3>
                  <p className="relative text-navy-900 font-semibold">{card.value}</p>

                  <div className="accent-line" />
                </div>
              );

              return card.href ? (
                <a key={card.label} href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                  {content}
                </a>
              ) : (
                <div key={card.label}>{content}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form + Working Hours + SimpleX */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <h2 className="text-2xl font-serif font-bold text-navy-900 mb-8">
                  {t("formTitle")}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-navy-900 font-medium">
                        {t("formName")}
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder={t("formNamePlaceholder")}
                        className="h-11 border-slate-300 focus:border-gold-500 focus:ring-gold-500"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-navy-900 font-medium">
                        {t("formEmail")}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder={t("formEmailPlaceholder")}
                        className="h-11 border-slate-300 focus:border-gold-500 focus:ring-gold-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-navy-900 font-medium">
                        {t("formPhone")}
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder={t("formPhonePlaceholder")}
                        className="h-11 border-slate-300 focus:border-gold-500 focus:ring-gold-500"
                      />
                    </div>

                    {/* Message Type */}
                    <div className="space-y-2">
                      <Label className="text-navy-900 font-medium">
                        {t("formType")}
                      </Label>
                      <Select
                        value={formData.messageType}
                        onValueChange={(value) =>
                          setFormData({ ...formData, messageType: value })
                        }
                      >
                        <SelectTrigger className="h-11 border-slate-300 focus:border-gold-500 focus:ring-gold-500">
                          <SelectValue placeholder={t("formTypePlaceholder")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="consultation">{t("formTypeConsultation")}</SelectItem>
                          <SelectItem value="question">{t("formTypeQuestion")}</SelectItem>
                          <SelectItem value="partnership">{t("formTypePartnership")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-navy-900 font-medium">
                      {t("formMessage")}
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder={t("formMessagePlaceholder")}
                      rows={5}
                      className="border-slate-300 focus:border-gold-500 focus:ring-gold-500 resize-none"
                      required
                    />
                  </div>

                  {/* Status Message */}
                  {submitStatus.type && (
                    <div
                      className={`flex items-start gap-3 p-4 rounded-lg ${
                        submitStatus.type === "success"
                          ? "bg-emerald-50 border border-emerald-200"
                          : "bg-red-50 border border-red-200"
                      }`}
                    >
                      {submitStatus.type === "success" ? (
                        <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                      )}
                      <p
                        className={`text-sm ${
                          submitStatus.type === "success"
                            ? "text-emerald-800"
                            : "text-red-800"
                        }`}
                      >
                        {submitStatus.message}
                      </p>
                    </div>
                  )}

                  {/* Submit */}
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-bold text-base px-8 h-12 shadow-gold-glow transition-all duration-300 hover:scale-105"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {locale === "uk" ? "Відкрити пошту" : "Open Email"}
                  </Button>
                </form>
              </div>
            </div>

            {/* Sidebar: Working Hours + SimpleX */}
            <div className="space-y-6">
              {/* Working Hours */}
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-lg">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-navy-900">
                    {t("workingHours")}
                  </h3>
                </div>
                <p className="text-slate-600 text-lg font-medium">
                  {t("workingHoursValue")}
                </p>
              </div>

              {/* SimpleX Secure Channel */}
              <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 rounded-2xl p-8 shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-gold bg-grid-64 opacity-10" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-xl">
                      <Shield className="h-6 w-6 text-green-400" />
                    </div>
                    <h3 className="text-lg font-serif font-bold text-white">
                      {t("simplexTitle")}
                    </h3>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {t("simplexDesc")}
                  </p>
                  <a
                    href={siteConfig.social.simplex}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 hover:border-green-400/50 rounded-lg text-green-300 hover:text-green-200 text-sm font-medium transition-all duration-300"
                  >
                    <Shield className="h-4 w-4" />
                    {locale === "uk" ? "Написати в SimpleX" : "Message via SimpleX"}
                  </a>
                  <div className="mt-3 flex items-center gap-2 text-xs text-green-400/70">
                    <Shield className="h-3 w-3" />
                    <span>SimpleX Protocol</span>
                    <span className="text-slate-500">|</span>
                    <span>{locale === "uk" ? "Без метаданих" : "No metadata"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
