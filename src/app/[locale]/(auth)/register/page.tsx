"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { User, Building2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import type { ClientType } from "@/types";

const SEGMENT_ICONS = { User, Building2, Globe } as const;

const SEGMENTS: {
  id: ClientType;
  icon: keyof typeof SEGMENT_ICONS;
  color: string;
}[] = [
  { id: "individual", icon: "User", color: "blue" },
  { id: "legal_entity", icon: "Building2", color: "amber" },
  { id: "international_partner", icon: "Globe", color: "emerald" },
];

export default function RegisterPage() {
  const t = useTranslations("auth");
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;

  const [clientType, setClientType] = useState<ClientType>("individual");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    companyEdrpou: "",
    organizationCountry: "",
    organizationType: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError(locale === "uk" ? "Паролі не збігаються" : "Passwords don't match");
      return;
    }

    setLoading(true);
    setError("");

    // 1. Create user server-side (auto-confirms email)
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
        metadata: {
          full_name: form.fullName,
          phone: form.phone,
          company_name: form.companyName,
          role: "client",
          client_type: clientType,
          company_edrpou: form.companyEdrpou || null,
          organization_country: form.organizationCountry || null,
          organization_type: form.organizationType || null,
        },
      }),
    });

    const result = await res.json();
    if (!res.ok) {
      setError(result.error || (locale === "uk" ? "Помилка реєстрації" : "Registration failed"));
      setLoading(false);
      return;
    }

    // 2. Sign in to get a session
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push(`/${locale}/dashboard`);
  };

  const segmentLabels: Record<ClientType, { uk: string; en: string; descUk: string; descEn: string }> = {
    individual: {
      uk: "Фізична особа",
      en: "Individual",
      descUk: "Власник житла, постраждалий від збитків",
      descEn: "Property owner affected by damage",
    },
    legal_entity: {
      uk: "Юридична особа",
      en: "Legal Entity",
      descUk: "Підприємство, компанія, організація",
      descEn: "Business, company, organization",
    },
    international_partner: {
      uk: "Міжнародний партнер",
      en: "International Partner",
      descUk: "Міжнародна організація, DFI, донор",
      descEn: "International org, DFI, donor",
    },
  };

  const colorMap: Record<string, { ring: string; bg: string; icon: string }> = {
    blue: { ring: "ring-blue-500", bg: "bg-blue-50", icon: "text-blue-600" },
    amber: { ring: "ring-amber-500", bg: "bg-amber-50", icon: "text-amber-600" },
    emerald: { ring: "ring-emerald-500", bg: "bg-emerald-50", icon: "text-emerald-600" },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <Link href={`/${locale}`} className="inline-flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-[#0f172a] rounded-lg flex items-center justify-center">
              <span className="text-[#e6a817] font-bold text-lg">М</span>
            </div>
            <span className="font-bold text-xl text-[#0f172a]">МІВРУ</span>
          </Link>
          <CardTitle>{t("register")}</CardTitle>
          <CardDescription>
            {locale === "uk"
              ? "Створіть акаунт для замовлення науково-правових висновків"
              : "Create an account for ordering scientific-legal reports"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleRegister}>
          <CardContent className="space-y-5">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Client Type Selector */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                {locale === "uk" ? "Тип клієнта" : "Client Type"}
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {SEGMENTS.map((seg) => {
                  const Icon = SEGMENT_ICONS[seg.icon];
                  const colors = colorMap[seg.color];
                  const labels = segmentLabels[seg.id];
                  const selected = clientType === seg.id;

                  return (
                    <button
                      key={seg.id}
                      type="button"
                      onClick={() => setClientType(seg.id)}
                      className={`relative p-3 rounded-lg border-2 text-center transition-all duration-200 ${
                        selected
                          ? `${colors.ring} ring-2 ${colors.bg} border-transparent`
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <Icon className={`h-5 w-5 mx-auto mb-1.5 ${selected ? colors.icon : "text-slate-400"}`} />
                      <p className={`text-xs font-medium leading-tight ${selected ? "text-slate-900" : "text-slate-600"}`}>
                        {locale === "uk" ? labels.uk : labels.en}
                      </p>
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-slate-500">
                {locale === "uk"
                  ? segmentLabels[clientType].descUk
                  : segmentLabels[clientType].descEn}
              </p>
            </div>

            {/* Common fields */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="fullName">{t("fullName")}</Label>
                <Input id="fullName" value={form.fullName} onChange={update("fullName")} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t("phone")}</Label>
                <Input id="phone" type="tel" value={form.phone} onChange={update("phone")} placeholder="+380" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input id="email" type="email" value={form.email} onChange={update("email")} required />
            </div>

            {/* Segment-specific fields */}
            {clientType !== "individual" && (
              <div className="space-y-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="space-y-2">
                  <Label htmlFor="companyName">
                    {clientType === "legal_entity"
                      ? (locale === "uk" ? "Назва компанії" : "Company Name")
                      : (locale === "uk" ? "Назва організації" : "Organization Name")}
                  </Label>
                  <Input
                    id="companyName"
                    value={form.companyName}
                    onChange={update("companyName")}
                    required
                  />
                </div>

                {clientType === "legal_entity" && (
                  <div className="space-y-2">
                    <Label htmlFor="companyEdrpou">
                      {locale === "uk" ? "Код ЄДРПОУ" : "EDRPOU Code"}
                    </Label>
                    <Input
                      id="companyEdrpou"
                      value={form.companyEdrpou}
                      onChange={update("companyEdrpou")}
                      placeholder="12345678"
                      required
                    />
                  </div>
                )}

                {clientType === "international_partner" && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="organizationCountry">
                        {locale === "uk" ? "Країна" : "Country"}
                      </Label>
                      <Input
                        id="organizationCountry"
                        value={form.organizationCountry}
                        onChange={update("organizationCountry")}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="organizationType">
                        {locale === "uk" ? "Тип (DFI / донор)" : "Type (DFI / donor)"}
                      </Label>
                      <Input
                        id="organizationType"
                        value={form.organizationType}
                        onChange={update("organizationType")}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Password */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="password">{t("password")}</Label>
                <Input id="password" type="password" value={form.password} onChange={update("password")} required minLength={8} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
                <Input id="confirmPassword" type="password" value={form.confirmPassword} onChange={update("confirmPassword")} required />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full bg-[#0f172a] hover:bg-[#1e293b]" disabled={loading}>
              {loading ? "..." : t("register")}
            </Button>
            <p className="text-sm text-muted-foreground">
              {t("hasAccount")}{" "}
              <Link href={`/${locale}/login`} className="text-[#e6a817] hover:underline font-medium">
                {t("login")}
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
