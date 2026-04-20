import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();

  // Fetch order (verify ownership)
  const { data: order, error: orderError } = await admin
    .from("orders")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", user.id)
    .single();

  if (orderError || !order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  // Fetch documents
  const { data: documents } = await admin
    .from("documents")
    .select("*")
    .eq("order_id", params.id)
    .order("created_at", { ascending: false });

  // Fetch reports
  const { data: reports } = await admin
    .from("reports")
    .select("id")
    .eq("order_id", params.id)
    .order("created_at", { ascending: false })
    .limit(1);

  return NextResponse.json({
    order,
    documents: documents || [],
    reportId: reports && reports.length > 0 ? reports[0].id : null,
  });
}
