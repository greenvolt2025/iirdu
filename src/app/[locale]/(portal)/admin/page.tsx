"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/hooks/use-user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface OrderRow {
  id: string;
  title: string;
  status: string;
  report_type: string;
  total_amount: number | null;
  currency: string;
  created_at: string;
  user_id: string;
  assigned_expert_id: string | null;
  profiles?: { full_name: string; email: string } | null;
}

interface ExpertOption {
  id: string;
  full_name: string;
  email: string;
}

interface Stats {
  totalOrders: number;
  totalRevenue: number;
  activeOrders: number;
  totalUsers: number;
}

const statusColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700",
  pending_payment: "bg-yellow-100 text-yellow-700",
  paid: "bg-blue-100 text-blue-700",
  document_collection: "bg-orange-100 text-orange-700",
  ai_processing: "bg-purple-100 text-purple-700",
  expert_review: "bg-indigo-100 text-indigo-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const statusLabels: Record<string, { uk: string; en: string }> = {
  draft: { uk: "Чернетка", en: "Draft" },
  pending_payment: { uk: "Очікує оплати", en: "Pending payment" },
  paid: { uk: "Оплачено", en: "Paid" },
  document_collection: { uk: "Збір документів", en: "Collecting docs" },
  ai_processing: { uk: "AI обробка", en: "AI processing" },
  expert_review: { uk: "Експерт", en: "Expert review" },
  completed: { uk: "Завершено", en: "Completed" },
  cancelled: { uk: "Скасовано", en: "Cancelled" },
};

export default function AdminPage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const isUk = locale === "uk";
  const { user, loading: userLoading } = useUser();
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [experts, setExperts] = useState<ExpertOption[]>([]);
  const [stats, setStats] = useState<Stats>({ totalOrders: 0, totalRevenue: 0, activeOrders: 0, totalUsers: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!userLoading && user?.role !== "admin") {
      router.push(`/${locale}/dashboard`);
      return;
    }
    if (user?.role === "admin") {
      loadData();
    }
  }, [user, userLoading]);

  const loadData = async () => {
    const supabase = createClient();

    const [ordersRes, usersRes, expertsRes] = await Promise.all([
      supabase
        .from("orders")
        .select("*, profiles(full_name, email)")
        .order("created_at", { ascending: false })
        .limit(100),
      supabase
        .from("profiles")
        .select("id", { count: "exact", head: true }),
      supabase
        .from("profiles")
        .select("id, full_name, email")
        .in("role", ["expert", "admin"]),
    ]);

    const allOrders = (ordersRes.data || []) as OrderRow[];
    setOrders(allOrders);
    setExperts((expertsRes.data || []) as ExpertOption[]);

    const revenue = allOrders
      .filter((o) => o.status === "paid" || o.status === "completed")
      .reduce((sum, o) => sum + (o.total_amount || 0), 0);

    const active = allOrders.filter((o) =>
      ["paid", "ai_processing", "expert_review", "document_collection"].includes(o.status)
    ).length;

    setStats({
      totalOrders: allOrders.length,
      totalRevenue: revenue,
      activeOrders: active,
      totalUsers: usersRes.count || 0,
    });

    setLoading(false);
  };

  const updateStatus = async (orderId: string, newStatus: string) => {
    const supabase = createClient();
    await supabase
      .from("orders")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", orderId);

    // Send notification on status change
    try {
      await fetch("/api/notifications/order-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, newStatus }),
      });
    } catch {
      // notification is non-critical
    }

    loadData();
  };

  const assignExpert = async (orderId: string, expertId: string) => {
    const supabase = createClient();
    await supabase
      .from("orders")
      .update({
        assigned_expert_id: expertId || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId);
    loadData();
  };

  if (userLoading || loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (user?.role !== "admin") {
    return null;
  }

  const filtered = search.trim()
    ? orders.filter((o) =>
        o.title?.toLowerCase().includes(search.toLowerCase()) ||
        o.id?.toLowerCase().includes(search.toLowerCase()) ||
        o.profiles?.full_name?.toLowerCase().includes(search.toLowerCase()) ||
        o.profiles?.email?.toLowerCase().includes(search.toLowerCase())
      )
    : orders;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {isUk ? "Адмін-панель" : "Admin Panel"}
        </h1>
        <Badge variant="outline" className="text-xs">
          {user.email}
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {isUk ? "Замовлень" : "Orders"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.totalOrders}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {isUk ? "Активних" : "Active"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">{stats.activeOrders}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {isUk ? "Дохід" : "Revenue"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              {stats.totalRevenue.toLocaleString("uk-UA")} EUR
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {isUk ? "Користувачів" : "Users"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{stats.totalUsers}</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Input
        placeholder={isUk ? "Пошук замовлень, клієнтів..." : "Search orders, clients..."}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      {/* Orders table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {isUk ? "Замовлення" : "Orders"} ({filtered.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 font-medium text-muted-foreground">ID</th>
                  <th className="pb-3 font-medium text-muted-foreground">
                    {isUk ? "Назва" : "Title"}
                  </th>
                  <th className="pb-3 font-medium text-muted-foreground">
                    {isUk ? "Клієнт" : "Client"}
                  </th>
                  <th className="pb-3 font-medium text-muted-foreground">
                    {isUk ? "Статус" : "Status"}
                  </th>
                  <th className="pb-3 font-medium text-muted-foreground">
                    {isUk ? "Експерт" : "Expert"}
                  </th>
                  <th className="pb-3 font-medium text-muted-foreground">
                    {isUk ? "Сума" : "Amount"}
                  </th>
                  <th className="pb-3 font-medium text-muted-foreground">
                    {isUk ? "Дата" : "Date"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => (
                  <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-3 font-mono text-xs">{order.id?.slice(0, 8)}</td>
                    <td className="py-3 max-w-[200px] truncate">{order.title}</td>
                    <td className="py-3 text-muted-foreground">
                      {order.profiles?.full_name || "—"}
                    </td>
                    <td className="py-3">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className={`text-xs border rounded px-2 py-1 font-medium ${statusColors[order.status] || "bg-gray-100"}`}
                      >
                        {Object.entries(statusLabels).map(([key, label]) => (
                          <option key={key} value={key}>
                            {isUk ? label.uk : label.en}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3">
                      <select
                        value={order.assigned_expert_id || ""}
                        onChange={(e) => assignExpert(order.id, e.target.value)}
                        className="text-xs border rounded px-1 py-0.5 bg-white max-w-[120px]"
                      >
                        <option value="">{isUk ? "— не призначено —" : "— not assigned —"}</option>
                        {experts.map((exp) => (
                          <option key={exp.id} value={exp.id}>
                            {exp.full_name || exp.email}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3">
                      {order.total_amount ? `${order.total_amount} ${order.currency || "EUR"}` : "—"}
                    </td>
                    <td className="py-3 text-xs text-muted-foreground">
                      {order.created_at ? new Date(order.created_at).toLocaleDateString(locale) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <p className="text-center py-8 text-muted-foreground">
                {isUk ? "Немає замовлень" : "No orders"}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
