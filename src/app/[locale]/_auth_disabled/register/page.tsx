"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const t = useTranslations("auth");
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
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

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.fullName,
          phone: form.phone,
          company_name: form.companyName,
          role: "client",
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push(`/${locale}/dashboard`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <Card className="w-full max-w-md">
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
              ? "Створіть акаунт для замовлення науково-технічних звітів"
              : "Create an account for ordering scientific reports"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleRegister}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-700">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="fullName">{t("fullName")}</Label>
              <Input id="fullName" value={form.fullName} onChange={update("fullName")} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input id="email" type="email" value={form.email} onChange={update("email")} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{t("phone")}</Label>
              <Input id="phone" type="tel" value={form.phone} onChange={update("phone")} placeholder="+380" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName">{t("companyName")}</Label>
              <Input id="companyName" value={form.companyName} onChange={update("companyName")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t("password")}</Label>
              <Input id="password" type="password" value={form.password} onChange={update("password")} required minLength={8} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
              <Input id="confirmPassword" type="password" value={form.confirmPassword} onChange={update("confirmPassword")} required />
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
