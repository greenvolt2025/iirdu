import { NextRequest, NextResponse } from "next/server";
import { createPaymentFormData } from "@/services/payment";
import { createServerSupabase } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { orderId, locale } = body;

    if (!orderId) {
      return NextResponse.json({ error: "orderId is required" }, { status: 400 });
    }

    // Fetch order with user verification
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("id, title, total_amount, currency, user_id, status")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.user_id !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (order.status !== "pending_payment") {
      return NextResponse.json({ error: "Order is not in pending_payment status" }, { status: 400 });
    }

    if (!order.total_amount || order.total_amount <= 0) {
      return NextResponse.json({ error: "Order amount not set" }, { status: 400 });
    }

    // Fetch user profile for payment form
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, email, phone")
      .eq("id", user.id)
      .single();

    // Create payment record
    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .insert({
        order_id: orderId,
        amount: order.total_amount,
        currency: order.currency,
        method: "wayforpay",
        status: "pending",
      })
      .select()
      .single();

    if (paymentError) {
      return NextResponse.json({ error: "Failed to create payment" }, { status: 500 });
    }

    // Generate WayForPay form data
    const formData = createPaymentFormData(
      {
        orderId: orderId,
        amount: order.total_amount,
        currency: order.currency as "UAH" | "USD" | "EUR",
        productName: order.title,
        productCount: 1,
        clientName: profile?.full_name || "Client",
        clientEmail: profile?.email || user.email || "",
        clientPhone: profile?.phone || undefined,
      },
      locale || "uk"
    );

    return NextResponse.json({
      formData,
      paymentId: payment.id,
      actionUrl: "https://secure.wayforpay.com/pay",
    });
  } catch (error) {
    console.error("Payment create error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
