"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { FileText, Clock, CheckCircle, AlertCircle, Plus } from "lucide-react";
import { useRealtimeOrders } from "@/hooks/use-realtime-orders";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

export default function DashboardPage() {
  const t = useTranslations("portal");
  const params = useParams();
  const locale = (params.locale as string) || "uk";
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | undefined>();

  const fetchOrders = useCallback(async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    setUserId(user.id);

    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(5);

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
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Real-time order status updates
  const handleRealtimeUpdate = useCallback(() => {
    fetchOrders();
  }, [fetchOrders]);

  useRealtimeOrders(userId, handleRealtimeUpdate);

  const totalOrders = orders.length;
  const inProgress = orders.filter((o) =>
    ["processing", "expert_review", "revision"].includes(o.status)
  ).length;
  const completed = orders.filter((o) => o.status === "completed").length;
  const actionRequired = orders.filter((o) =>
    ["pending_payment", "draft"].includes(o.status)
  ).length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalOrders}</p>
              <p className="text-sm text-muted-foreground">{t("orders")}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{inProgress}</p>
              <p className="text-sm text-muted-foreground">
                {locale === "uk" ? "В обробці" : "In Progress"}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{completed}</p>
              <p className="text-sm text-muted-foreground">
                {locale === "uk" ? "Завершено" : "Completed"}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{actionRequired}</p>
              <p className="text-sm text-muted-foreground">
                {locale === "uk" ? "Потребує дій" : "Action Required"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{t("orders")}</CardTitle>
            <CardDescription>
              {locale === "uk" ? "Останні замовлення" : "Recent orders"}
            </CardDescription>
          </div>
          <Link href={`/${locale}/orders/new`}>
            <Button size="sm" className="bg-gold-500 hover:bg-gold-600 text-navy-900">
              <Plus className="h-4 w-4 mr-1" />
              {t("newOrder")}
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              {locale === "uk" ? "Завантаження..." : "Loading..."}
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground mb-4">
                {locale === "uk"
                  ? "У вас ще немає замовлень"
                  : "You don't have any orders yet"}
              </p>
              <Link href={`/${locale}/orders/new`}>
                <Button className="bg-gold-500 hover:bg-gold-600 text-navy-900">
                  <Plus className="h-4 w-4 mr-2" />
                  {t("newOrder")}
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <Link
                  key={order.id}
                  href={`/${locale}/orders/${order.id}`}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-navy-900/5 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-navy-900" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{order.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString(locale === "uk" ? "uk-UA" : "en-US")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium hidden sm:block">
                      {order.totalAmount.toLocaleString()} {locale === "uk" ? "грн" : "UAH"}
                    </span>
                    <Badge variant="secondary" className={statusColors[order.status]}>
                      {statusLabels[locale]?.[order.status] || order.status}
                    </Badge>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
