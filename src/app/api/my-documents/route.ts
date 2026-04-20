import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const supabase = createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();

  // Get user's orders first, then fetch documents for those orders
  const { data: orders } = await admin
    .from("orders")
    .select("id, title")
    .eq("user_id", user.id);

  if (!orders || orders.length === 0) {
    return NextResponse.json([]);
  }

  const orderIds = orders.map((o) => o.id);
  const orderMap = Object.fromEntries(orders.map((o) => [o.id, o.title]));

  const { data: documents } = await admin
    .from("documents")
    .select("id, order_id, file_name, file_size, upload_channel, created_at, mime_type")
    .in("order_id", orderIds)
    .order("created_at", { ascending: false });

  // Attach order title
  const result = (documents || []).map((d) => ({
    ...d,
    uploaded_at: d.created_at,
    orders: [{ title: orderMap[d.order_id] || "" }],
  }));

  return NextResponse.json(result);
}
