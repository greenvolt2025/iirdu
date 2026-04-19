"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const params = useParams();
  const locale = params.locale as string;
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const isUk = locale === "uk";

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/${locale}/reset-password`,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <CardTitle>
              {isUk ? "Перевірте пошту" : "Check your email"}
            </CardTitle>
            <CardDescription>
              {isUk
                ? `Ми надіслали інструкції для відновлення пароля на ${email}`
                : `We sent password reset instructions to ${email}`}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col gap-4">
            <Link href={`/${locale}/login`} className="w-full">
              <Button variant="outline" className="w-full">
                {isUk ? "Повернутися до входу" : "Back to login"}
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link href={`/${locale}`} className="inline-flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-[#0f172a] rounded-lg flex items-center justify-center">
              <span className="text-[#e6a817] font-bold text-lg">М</span>
            </div>
            <span className="font-bold text-xl text-[#0f172a]">МІВРУ</span>
          </Link>
          <CardTitle>
            {isUk ? "Відновлення пароля" : "Reset password"}
          </CardTitle>
          <CardDescription>
            {isUk
              ? "Введіть email, і ми надішлемо інструкції"
              : "Enter your email and we'll send you instructions"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleReset}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-700">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">
                {isUk ? "Електронна пошта" : "Email"}
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
                autoFocus
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full bg-[#0f172a] hover:bg-[#1e293b]"
              disabled={loading || !email.trim()}
            >
              {loading
                ? "..."
                : isUk ? "Надіслати інструкції" : "Send instructions"}
            </Button>
            <Link
              href={`/${locale}/login`}
              className="text-sm text-muted-foreground hover:underline"
            >
              {isUk ? "Повернутися до входу" : "Back to login"}
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
