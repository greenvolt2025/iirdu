"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Plus, FileText, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import type { Order } from "@/types";

const statusColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700",
  pending_payment: "bg-yellow-100 text-yellow-700",
  paid: "bg-blue-100 text-blue-700",
  documents_uploaded: "bg-indigo-100 text-indigo-700",
  processing: "bg-purple-100 text-purple-700",
  expert_review: "bg-orange-100 text-orange-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const statusLabels: Record<string, Record<string, string>> = {
  uk: {
    draft: "Чернетка",
    pending_payment: "Очікує оплати",
    paid: "Оплачено",
    documents_uploaded: "Документи завантажено",
    processing: "В обробці",
    expert_review: "Перевірка фахівця",
    revision: "Доопрацювання",
    completed: "Завершено",
    cancelled: "Скасовано",
  },
  en: {
    draft: "Draft",
    pending_payment: "Pending Payment",
    paid: "Paid",
    documents_uploaded: "Documents Uploaded",
    processing: "Processing",
    expert_review: "Expert Review",
    revision: "Revision",
    completed: "Completed",
    cancelled: "Cancelled",
  },
};

const reportTypeLabels: Record<string, Record<string, string>> = {
  uk: {
    damage_assessment: "Оцінка збитків (RDNA)",
    due_diligence: "Due Diligence та відповідність",
    risk_assessment: "Оцінка ризиків",
    economic_analysis: "Економічний аналіз",
    legal_support: "Правова підтримка",
    consulting: "Консалтинг",
  },
  en: {
    damage_assessment: "Damage Assessment (RDNA)",
    due_diligence: "Due Diligence & Compliance",
    risk_assessment: "Risk Assessment",
    economic_analysis: "Economic Analysis",
    legal_support: "Legal Support",
    consulting: "Consulting",
  },
};

export default function OrdersPage() {
  const t = useTranslations("portal");
  const tCommon = useTranslations("common");
  const params = useParams();
  const locale = (params.locale as string) || "uk";
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (data) {
        setOrders(data.map((o) => ({
          id: o.id,
          userId: o.user_id,
          clientType: o.client_type || "individual",
          reportType: o.report_type,
          reportSubtype: o.report_subtype,
          status: o.status,
          title: o.title,
          description: o.description,
          objectAddress: o.object_address,
          totalAmount: o.total_amount || 0,
          currency: o.currency,
          paidAt: o.paid_at,
          assignedExpertId: o.assigned_expert_id,
          createdAt: o.created_at,
          updatedAt: o.updated_at,
        })));
      }
      setLoading(false);
    }

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((o) =>
    o.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-navy-900">{t("orders")}</h1>
        <Link href={`/${locale}/orders/new`}>
          <Button className="bg-gold-500 hover:bg-gold-600 text-navy-900">
            <Plus className="h-4 w-4 mr-2" />
            {t("newOrder")}
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={tCommon("search") + "..."}
          className="pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Orders list */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">
          {locale === "uk" ? "Завантаження..." : "Loading..."}
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-16">
          <FileText className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground mb-6">
            {orders.length === 0
              ? (locale === "uk" ? "У вас ще немає замовлень" : "You don't have any orders yet")
              : (locale === "uk" ? "Нічого не знайдено" : "Nothing found")}
          </p>
          {orders.length === 0 && (
            <Link href={`/${locale}/orders/new`}>
              <Button className="bg-gold-500 hover:bg-gold-600 text-navy-900">
                <Plus className="h-4 w-4 mr-2" />
                {t("newOrder")}
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredOrders.map((order) => (
            <Link key={order.id} href={`/${locale}/orders/${order.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer mb-3">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-navy-900/5 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-navy-900" />
                    </div>
                    <div>
                      <p className="font-medium">{order.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {reportTypeLabels[locale]?.[order.reportType] || order.reportType}
                        {" · "}
                        {new Date(order.createdAt).toLocaleDateString(locale === "uk" ? "uk-UA" : "en-US")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold hidden sm:block">
                      {order.totalAmount.toLocaleString()} {locale === "uk" ? "грн" : "UAH"}
                    </span>
                    <Badge variant="secondary" className={statusColors[order.status]}>
                      {statusLabels[locale]?.[order.status] || order.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
