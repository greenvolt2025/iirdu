"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Lock, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const isUk = locale === "uk";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError(isUk ? "Мінімум 8 символів" : "Minimum 8 characters");
      return;
    }
    if (password !== confirm) {
      setError(isUk ? "Паролі не співпадають" : "Passwords do not match");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (updateError) {
      setError(updateError.message);
    } else {
      setSuccess(true);
      setTimeout(() => router.push(`/${locale}/dashboard`), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-[#0f172a] rounded-xl flex items-center justify-center mx-auto mb-4">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-xl">
            {isUk ? "Новий пароль" : "New Password"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="text-center space-y-4">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
              <p className="text-green-700 font-medium">
                {isUk ? "Пароль успішно змінено!" : "Password changed successfully!"}
              </p>
              <p className="text-sm text-muted-foreground">
                {isUk ? "Перенаправляємо..." : "Redirecting..."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>{isUk ? "Новий пароль" : "New password"}</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isUk ? "Мінімум 8 символів" : "Minimum 8 characters"}
                  required
                  minLength={8}
                />
              </div>
              <div className="space-y-2">
                <Label>{isUk ? "Підтвердити пароль" : "Confirm password"}</Label>
                <Input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder={isUk ? "Повторіть пароль" : "Repeat password"}
                  required
                  minLength={8}
                />
              </div>
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0f172a] hover:bg-[#1e293b]"
              >
                {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {isUk ? "Зберегти пароль" : "Save password"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
