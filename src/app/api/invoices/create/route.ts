import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { createInvoice, generateInvoiceHtml } from "@/services/invoice";

/**
 * POST /api/invoices/create
 * Generate an invoice for an order.
 * Body: { orderId }
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { orderId } = await request.json();
    if (!orderId) {
      return NextResponse.json({ error: "orderId required" }, { status: 400 });
    }

    // Fetch order with profile
    const { data: order } = await supabase
      .from("orders")
      .select("*, profiles(full_name, company_name, email)")
      .eq("id", orderId)
      .single();

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Build buyer info from profile
    const profileArr = order.profiles as { full_name: string; company_name: string; email: string }[] | null;
    const profile = profileArr?.[0];
    const buyerName = profile?.company_name || profile?.full_name || user.email || "Замовник";

    // Determine price based on order data
    const amount = order.total_amount || 5000;
    const currency = order.currency || "EUR";

    const invoice = createInvoice({
      orderId,
      buyerName,
      items: [
        {
          description: `Науково-правовий висновок: ${order.report_subtype || order.report_type || "Загальний"}`,
          quantity: 1,
          unit: "послуга",
          pricePerUnit: amount,
        },
        ...(order.include_lost_profits ? [{
          description: "Розрахунок упущеної вигоди (DCF-моделювання)",
          quantity: 1,
          unit: "послуга",
          pricePerUnit: 5000,
        }] : []),
      ],
      currency: currency as "UAH" | "USD" | "EUR",
    });

    const html = generateInvoiceHtml(invoice);

    // Store invoice reference in order
    await supabase
      .from("orders")
      .update({ invoice_number: invoice.number })
      .eq("id", orderId);

    return NextResponse.json({
      invoiceId: invoice.id,
      invoiceNumber: invoice.number,
      totalAmount: invoice.totalAmount,
      currency: invoice.currency,
      html,
    });
  } catch (error) {
    console.error("Invoice creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
