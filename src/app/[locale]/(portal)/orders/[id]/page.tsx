"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { ArrowLeft, Download, Upload, FileText, ShieldCheck, CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/client";

interface OrderData {
  id: string;
  title: string;
  report_type: string;
  report_subtype: string;
  status: string;
  object_address: string;
  description: string;
  total_amount: number | null;
  currency: string;
  created_at: string;
  paid_at: string | null;
}

interface DocumentData {
  id: string;
  file_name: string;
  file_size: number;
  channel: string;
  created_at: string;
}

const statusLabels: Record<string, string> = {
  draft: "Чернетка",
  pending_payment: "Очікує оплати",
  paid: "Оплачено",
  document_collection: "Збір документів",
  ai_processing: "AI обробка",
  expert_review: "Перевірка експерта",
  completed: "Завершено",
  cancelled: "Скасовано",
};

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

const STEPS = ["pending_payment", "paid", "document_collection", "ai_processing", "expert_review", "completed"];

function getProgress(status: string): number {
  const idx = STEPS.indexOf(status);
  if (idx < 0) return 0;
  return Math.round(((idx + 1) / STEPS.length) * 100);
}

function formatSize(bytes: number): string {
  if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(1)} MB`;
  return `${(bytes / 1024).toFixed(0)} KB`;
}

export default function OrderDetailPage() {
  const params = useParams();
  const locale = params.locale as string;
  const orderId = params.id as string;
  const isUk = locale === "uk";

  const [order, setOrder] = useState<OrderData | null>(null);
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [paying, setPaying] = useState(false);
  const [reportId, setReportId] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const loadOrder = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (data) {
      setOrder(data as OrderData);
    }

    const { data: docs } = await supabase
      .from("documents")
      .select("*")
      .eq("order_id", orderId)
      .order("created_at", { ascending: false });

    setDocuments((docs || []) as DocumentData[]);

    // Check for existing report
    const { data: reports } = await supabase
      .from("reports")
      .select("id")
      .eq("order_id", orderId)
      .order("created_at", { ascending: false })
      .limit(1);

    if (reports && reports.length > 0) {
      setReportId(reports[0].id);
    }

    setLoading(false);
  }, [orderId]);

  useEffect(() => {
    loadOrder();
  }, [loadOrder]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("orderId", orderId);
      formData.append("channel", "standard");

      try {
        await fetch("/api/upload", { method: "POST", body: formData });
      } catch (err) {
        console.error("Upload error:", err);
      }
    }
    setUploading(false);
    loadOrder();
    e.target.value = "";
  };

  const handlePay = async () => {
    setPaying(true);
    try {
      const resp = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, locale }),
      });
      const data = await resp.json();
      if (data.actionUrl && data.formData) {
        // Create and submit WayForPay form
        const form = document.createElement("form");
        form.method = "POST";
        form.action = data.actionUrl;
        for (const [key, value] of Object.entries(data.formData)) {
          if (Array.isArray(value)) {
            value.forEach((v: string | number) => {
              const input = document.createElement("input");
              input.type = "hidden";
              input.name = `${key}[]`;
              input.value = String(v);
              form.appendChild(input);
            });
          } else {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = String(value);
            form.appendChild(input);
          }
        }
        document.body.appendChild(form);
        form.submit();
      }
    } catch (err) {
      console.error("Payment error:", err);
    }
    setPaying(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-muted-foreground">{isUk ? "Завантаження..." : "Loading..."}</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Link href={`/${locale}/orders`} className="inline-flex items-center text-sm text-muted-foreground hover:text-[#0f172a]">
          <ArrowLeft className="h-4 w-4 mr-1" />
          {isUk ? "До замовлень" : "Back to orders"}
        </Link>
        <div className="text-center py-12">
          <p className="text-lg font-medium text-muted-foreground">
            {isUk ? "Замовлення не знайдено" : "Order not found"}
          </p>
        </div>
      </div>
    );
  }

  const progress = getProgress(order.status);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back */}
      <Link href={`/${locale}/orders`} className="inline-flex items-center text-sm text-muted-foreground hover:text-[#0f172a]">
        <ArrowLeft className="h-4 w-4 mr-1" />
        {isUk ? "До замовлень" : "Back to orders"}
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">{order.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {order.id.slice(0, 8)} &middot; {new Date(order.created_at).toLocaleDateString(locale)}
          </p>
        </div>
        <Badge className={statusColors[order.status] || "bg-gray-100 text-gray-700"}>
          {statusLabels[order.status] || order.status}
        </Badge>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              {isUk ? "Прогрес обробки" : "Processing progress"}
            </span>
            <span className="text-sm font-bold text-[#e6a817]">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-3 text-xs text-muted-foreground">
            {STEPS.map((step) => (
              <span
                key={step}
                className={order.status === step ? "font-medium text-purple-600" : ""}
              >
                {statusLabels[step]?.split(" ")[0] || step}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {isUk ? "Деталі замовлення" : "Order Details"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground">{isUk ? "Тип" : "Type"}</p>
              <p className="text-sm font-medium">{order.report_subtype || order.report_type}</p>
            </div>
            <Separator />
            {order.object_address && (
              <>
                <div>
                  <p className="text-xs text-muted-foreground">{isUk ? "Адреса" : "Address"}</p>
                  <p className="text-sm">{order.object_address}</p>
                </div>
                <Separator />
              </>
            )}
            {order.description && (
              <>
                <div>
                  <p className="text-xs text-muted-foreground">{isUk ? "Опис" : "Description"}</p>
                  <p className="text-sm">{order.description}</p>
                </div>
                <Separator />
              </>
            )}
            <div className="flex justify-between">
              <span className="text-sm font-medium">{isUk ? "Вартість" : "Amount"}</span>
              <span className="text-lg font-bold">
                {order.total_amount
                  ? `${order.total_amount.toLocaleString(locale)} ${order.currency || "EUR"}`
                  : isUk ? "Не визначено" : "TBD"}
              </span>
            </div>
            {order.paid_at && (
              <>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{isUk ? "Оплачено" : "Paid"}</span>
                  <span className="text-green-600 font-medium">
                    {new Date(order.paid_at).toLocaleDateString(locale)}
                  </span>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Documents */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">
              {isUk ? "Документи" : "Documents"} ({documents.length})
            </CardTitle>
            <label>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.tiff"
                onChange={handleUpload}
                className="hidden"
              />
              <Button size="sm" variant="outline" asChild>
                <span className="cursor-pointer">
                  <Upload className="h-4 w-4 mr-1" />
                  {uploading ? "..." : isUk ? "Додати" : "Add"}
                </span>
              </Button>
            </label>
          </CardHeader>
          <CardContent className="space-y-2">
            {documents.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                {isUk ? "Немає документів" : "No documents"}
              </p>
            ) : (
              documents.map((doc) => (
                <div key={doc.id} className="flex items-center gap-3 p-3 rounded-lg border">
                  <FileText className="h-5 w-5 text-gray-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{doc.file_name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{formatSize(doc.file_size)}</span>
                      {doc.channel === "simplex" && (
                        <span className="inline-flex items-center gap-1 text-xs text-green-600">
                          <ShieldCheck className="h-3 w-3" /> SimpleX
                        </span>
                      )}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Payment section */}
      {order.status === "pending_payment" && order.total_amount && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="font-medium">
                {isUk ? "Очікує оплати" : "Awaiting payment"}
              </p>
              <p className="text-sm text-muted-foreground">
                {order.total_amount.toLocaleString(locale)} {order.currency || "UAH"}
              </p>
            </div>
            <Button
              onClick={handlePay}
              disabled={paying}
              className="bg-green-600 hover:bg-green-700"
            >
              {paying ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <CreditCard className="h-4 w-4 mr-2" />
              )}
              {isUk ? "Оплатити" : "Pay now"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Generate report button (when paid) */}
      {(order.status === "paid" || order.status === "document_collection") && !reportId && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="font-medium">
                {isUk ? "Генерація звіту" : "Report Generation"}
              </p>
              <p className="text-sm text-muted-foreground">
                {isUk ? "Запустити AI-генерацію науково-правового висновку" : "Start AI generation of scientific-legal conclusion"}
              </p>
            </div>
            <Button
              onClick={async () => {
                setGenerating(true);
                try {
                  const resp = await fetch("/api/reports/generate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ orderId }),
                  });
                  const data = await resp.json();
                  if (data.reportId) {
                    setReportId(data.reportId);
                  }
                } catch (err) {
                  console.error("Report generation error:", err);
                }
                setGenerating(false);
                loadOrder();
              }}
              disabled={generating}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {generating ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <FileText className="h-4 w-4 mr-2" />
              )}
              {isUk ? "Генерувати" : "Generate"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Report section (when ready) */}
      {(order.status === "completed" || reportId) && reportId && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-lg">
              {isUk ? "Готовий звіт" : "Completed Report"}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex gap-3">
            <Button
              className="bg-[#0f172a] hover:bg-[#1e293b]"
              onClick={() => {
                window.open(`/api/reports/download?reportId=${reportId}`, "_blank");
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              {isUk ? "Переглянути / Друк PDF" : "View / Print PDF"}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
