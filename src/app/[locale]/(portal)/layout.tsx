"use client";

import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { LayoutDashboard, FileText, FolderOpen, Settings, LogOut, Menu, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useUser } from "@/hooks/use-user";
import { createClient } from "@/lib/supabase/client";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations("portal");
  const tNav = useTranslations("nav");
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const locale = params.locale as string;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useUser();

  const navItems = [
    { href: `/${locale}/dashboard`, icon: LayoutDashboard, label: t("dashboard") },
    { href: `/${locale}/orders`, icon: FileText, label: t("orders") },
    { href: `/${locale}/documents`, icon: FolderOpen, label: t("documents") },
    { href: `/${locale}/settings`, icon: Settings, label: t("settings") },
    ...(user?.role === "admin"
      ? [{ href: `/${locale}/admin`, icon: Shield, label: "Адмін" }]
      : []),
  ];

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push(`/${locale}/login`);
  };

  const initials = user?.fullName
    ? user.fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <Link href={`/${locale}`} className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
        <div className="w-8 h-8 bg-gold-500 rounded-lg flex items-center justify-center">
          <span className="text-navy-900 font-bold">М</span>
        </div>
        <span className="font-bold text-lg text-white">МІВРУ</span>
      </Link>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-gold-500 text-navy-900"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* New order button */}
      <div className="p-4 border-t border-white/10">
        <Link href={`/${locale}/orders/new`}>
          <Button className="w-full bg-gold-500 hover:bg-gold-600 text-navy-900 font-semibold">
            + {t("newOrder")}
          </Button>
        </Link>
      </div>

      {/* User info & Logout */}
      <div className="p-4 border-t border-white/10">
        {user && (
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 bg-gold-500/20 rounded-full flex items-center justify-center">
              <span className="text-xs text-gold-400 font-medium">{initials}</span>
            </div>
            <div className="min-w-0">
              <p className="text-sm text-white truncate">{user.fullName}</p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors w-full"
        >
          <LogOut className="h-4 w-4" />
          <span>{tNav("logout")}</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 bg-navy-900 flex-col shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64 bg-navy-900 border-none">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b px-4 md:px-6 h-14 flex items-center justify-between shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="text-sm text-muted-foreground">
            {user?.fullName || t("dashboard")}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-navy-900 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-medium">{initials}</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
