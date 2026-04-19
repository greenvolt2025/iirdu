import { NextRequest, NextResponse } from "next/server";
import { verifyCallbackSignature, generateCallbackResponse } from "@/services/payment";
import { createServerSupabase } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const {
      merchantSignature,
      orderReference,
      transactionStatus,
      amount,
      currency,
      reasonCode,
    } = data;

    // Verify signature
    if (!verifyCallbackSignature(data, merchantSignature)) {
      console.error("[WayForPay] Invalid signature for order:", orderReference);
      return NextResponse.json(
        generateCallbackResponse(orderReference, "refuse"),
        { status: 400 }
      );
    }

    console.log(`[WayForPay] Payment callback: order=${orderReference} status=${transactionStatus} amount=${amount} ${currency}`);

    const supabase = createServerSupabase();

    if (transactionStatus === "Approved") {
      // Update order status to "paid"
      const { error: orderError } = await supabase
        .from("orders")
        .update({
          status: "paid",
          paid_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", orderReference);

      if (orderError) {
        console.error("[WayForPay] Failed to update order:", orderError);
      }

      // Record payment in payments table
      const { error: paymentError } = await supabase
        .from("payments")
        .insert({
          order_id: orderReference,
          amount: parseFloat(amount),
          currency,
          status: "success",
          transaction_id: data.transactionId || null,
          card_pan: data.cardPan || null,
          auth_code: data.authCode || null,
          provider: "wayforpay",
          raw_data: JSON.stringify(data),
        });

      if (paymentError) {
        console.error("[WayForPay] Failed to insert payment:", paymentError);
      }

      console.log(`[WayForPay] Payment approved for order: ${orderReference}`);
    } else if (transactionStatus === "Declined" || transactionStatus === "Expired") {
      // Record failed payment
      await supabase
        .from("payments")
        .insert({
          order_id: orderReference,
          amount: parseFloat(amount),
          currency,
          status: "failed",
          provider: "wayforpay",
          raw_data: JSON.stringify(data),
        });

      console.log(`[WayForPay] Payment ${transactionStatus} for order: ${orderReference}, reason: ${reasonCode}`);
    } else {
      console.log(`[WayForPay] Payment ${transactionStatus} for order: ${orderReference}, reason: ${reasonCode}`);
    }

    // Respond to WayForPay
    return NextResponse.json(generateCallbackResponse(orderReference, "accept"));
  } catch (error) {
    console.error("[WayForPay] Webhook error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
