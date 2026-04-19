"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { FileText, Image as ImageIcon, ShieldCheck, Shield, Search, Loader2, FolderOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

interface DocRow {
  id: string;
  order_id: string;
  file_name: string;
  file_size: number;
  upload_channel: string;
  uploaded_at: string;
  mime_type: string;
  orders: { title: string }[] | null;
}

function formatSize(bytes: number): string {
  if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(1)} MB`;
  return `${(bytes / 1024).toFixed(0)} KB`;
}

function getDocType(mime: string): "pdf" | "image" | "other" {
  if (mime.includes("pdf")) return "pdf";
  if (mime.startsWith("image/")) return "image";
  return "other";
}

export default function DocumentsPage() {
  const params = useParams();
  const locale = params.locale as string;
  const isUk = locale === "uk";

  const [documents, setDocuments] = useState<DocRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchDocuments() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const { data } = await supabase
        .from("documents")
        .select("id, order_id, file_name, file_size, upload_channel, uploaded_at, mime_type, orders(title)")
        .order("uploaded_at", { ascending: false });

      setDocuments((data || []) as DocRow[]);
      setLoading(false);
    }
    fetchDocuments();
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return documents;
    const q = search.toLowerCase();
    return documents.filter((d) =>
      d.file_name.toLowerCase().includes(q) ||
      d.order_id.slice(0, 8).includes(q) ||
      (d.orders?.[0]?.title || "").toLowerCase().includes(q)
    );
  }, [documents, search]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#0f172a]">
        {isUk ? "Документи" : "Documents"} ({documents.length})
      </h1>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={`${isUk ? "Пошук" : "Search"}...`}
          className="pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground">
            {documents.length === 0
              ? (isUk ? "Немає документів. Завантажте документи через замовлення." : "No documents. Upload documents via orders.")
              : (isUk ? "Нічого не знайдено" : "No results found")}
          </p>
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {filtered.map((doc) => {
                const docType = getDocType(doc.mime_type);
                return (
                  <div key={doc.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                      {docType === "image" ? (
                        <ImageIcon className="h-5 w-5 text-gray-500" />
                      ) : (
                        <FileText className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{doc.file_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {doc.orders?.[0]?.title || doc.order_id.slice(0, 8)} &middot; {formatSize(doc.file_size)} &middot; {new Date(doc.uploaded_at).toLocaleDateString(locale)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {doc.upload_channel === "simplex" ? (
                        <Badge variant="secondary" className="bg-green-50 text-green-700 gap-1">
                          <ShieldCheck className="h-3 w-3" />
                          SimpleX
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 gap-1">
                          <Shield className="h-3 w-3" />
                          TLS
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
