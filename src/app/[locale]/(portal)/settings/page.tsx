"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/client";

interface ProfileData {
  full_name: string;
  email: string;
  phone: string;
  company_name: string;
  notify_email: boolean;
  notify_simplex: boolean;
}

export default function SettingsPage() {
  const params = useParams();
  const locale = params.locale as string;
  const isUk = locale === "uk";

  const [profile, setProfile] = useState<ProfileData>({
    full_name: "",
    email: "",
    phone: "",
    company_name: "",
    notify_email: true,
    notify_simplex: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");

  const fetchProfile = useCallback(async () => {
    // Fetch profile via API route (uses admin client, bypasses broken RLS)
    try {
      const res = await fetch("/api/profile");
      if (res.ok) {
        const data = await res.json();
        setProfile({
          full_name: data.full_name || "",
          email: data.email || "",
          phone: data.phone || "",
          company_name: data.company_name || "",
          notify_email: data.notify_email ?? true,
          notify_simplex: data.notify_simplex ?? false,
        });
      }
    } catch {
      // Profile fetch failed
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchProfile(); }, [fetchProfile]);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);

    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: profile.full_name,
          phone: profile.phone,
          company_name: profile.company_name,
        }),
      });

      setSaving(false);
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword.length < 8) {
      setPasswordMsg(isUk ? "Мінімум 8 символів" : "Minimum 8 characters");
      return;
    }
    setChangingPassword(true);
    setPasswordMsg("");
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setChangingPassword(false);
    if (error) {
      setPasswordMsg(error.message);
    } else {
      setPasswordMsg(isUk ? "Пароль змінено" : "Password changed");
      setNewPassword("");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-[#0f172a]">
        {isUk ? "Налаштування" : "Settings"}
      </h1>

      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{isUk ? "Профіль" : "Profile"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{isUk ? "Повне ім'я" : "Full name"}</Label>
            <Input
              value={profile.full_name}
              onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={profile.email} disabled type="email" className="bg-gray-50" />
            <p className="text-xs text-muted-foreground">
              {isUk ? "Email не можна змінити" : "Email cannot be changed"}
            </p>
          </div>
          <div className="space-y-2">
            <Label>{isUk ? "Телефон" : "Phone"}</Label>
            <Input
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              type="tel"
              placeholder="+380 50 123 4567"
            />
          </div>
          <div className="space-y-2">
            <Label>{isUk ? "Організація" : "Organization"}</Label>
            <Input
              value={profile.company_name}
              onChange={(e) => setProfile({ ...profile, company_name: e.target.value })}
              placeholder={isUk ? "Назва компанії (за бажанням)" : "Company name (optional)"}
            />
          </div>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#0f172a] hover:bg-[#1e293b]"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {saved
              ? (isUk ? "Збережено!" : "Saved!")
              : (isUk ? "Зберегти" : "Save")}
          </Button>
        </CardContent>
      </Card>

      {/* Change password */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{isUk ? "Зміна пароля" : "Change Password"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{isUk ? "Новий пароль" : "New password"}</Label>
            <Input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              placeholder={isUk ? "Мінімум 8 символів" : "Minimum 8 characters"}
            />
          </div>
          {passwordMsg && (
            <p className={`text-sm ${passwordMsg.includes("змінено") || passwordMsg.includes("changed") ? "text-green-600" : "text-red-600"}`}>
              {passwordMsg}
            </p>
          )}
          <Button
            onClick={handleChangePassword}
            disabled={changingPassword || !newPassword}
            variant="outline"
          >
            {changingPassword && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {isUk ? "Змінити пароль" : "Change password"}
          </Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{isUk ? "Сповіщення" : "Notifications"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{isUk ? "Email сповіщення" : "Email notifications"}</p>
                <p className="text-xs text-muted-foreground">
                  {isUk ? "Отримувати оновлення щодо замовлень" : "Receive order status updates"}
                </p>
              </div>
              <input
                type="checkbox"
                checked={profile.notify_email}
                onChange={(e) => setProfile({ ...profile, notify_email: e.target.checked })}
                className="h-4 w-4"
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{isUk ? "SimpleX сповіщення" : "SimpleX notifications"}</p>
                <p className="text-xs text-muted-foreground">
                  {isUk ? "Захищені повідомлення через SimpleX Chat" : "Secure messages via SimpleX Chat"}
                </p>
              </div>
              <input
                type="checkbox"
                checked={profile.notify_simplex}
                onChange={(e) => setProfile({ ...profile, notify_simplex: e.target.checked })}
                className="h-4 w-4"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
