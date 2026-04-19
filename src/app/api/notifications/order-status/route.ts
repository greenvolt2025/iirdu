import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { sendEmail } from "@/services/email";

const STATUS_LABELS_UK: Record<string, string> = {
  draft: "Чернетка",
  pending_payment: "Очікує оплати",
  paid: "Оплачено",
  documents_uploaded: "Документи завантажено",
  processing: "В обробці",
  expert_review: "Перевірка фахівця",
  revision: "Доопрацювання",
  completed: "Завершено",
  cancelled: "Скасовано",
};

function statusEmailHtml(
  userName: string,
  orderTitle: string,
  orderId: string,
  newStatus: string,
  locale: string,
): string {
  const isUk = locale === "uk";
  const statusLabel = isUk
    ? STATUS_LABELS_UK[newStatus] || newStatus
    : newStatus.replace(/_/g, " ");

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #0f172a; color: white; padding: 20px; border-radius: 12px 12px 0 0; text-align: center;">
    <h2 style="margin: 0; font-size: 18px;">МІВРУ</h2>
    <p style="margin: 4px 0 0; font-size: 12px; color: #9ca3af;">Міжнародний інститут відновлення та розвитку України</p>
  </div>
  <div style="border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 12px 12px;">
    <p>${isUk ? "Шановний(а)" : "Dear"} ${userName},</p>
    <p>${isUk ? "Статус вашого замовлення змінено:" : "Your order status has been updated:"}</p>
    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 16px 0;">
      <p style="margin: 0; font-weight: bold;">${orderTitle}</p>
      <p style="margin: 8px 0 0; font-size: 14px;">
        ${isUk ? "Новий статус:" : "New status:"}
        <strong style="color: #e6a817;">${statusLabel}</strong>
      </p>
    </div>
    ${newStatus === "completed"
      ? `<p style="color: #16a34a; font-weight: bold;">${isUk ? "Ваш звіт готовий! Увійдіть в кабінет для завантаження." : "Your report is ready! Log in to download."}</p>`
      : ""}
    ${newStatus === "pending_payment"
      ? `<p>${isUk ? "Будь ласка, оплатіть замовлення для продовження обробки." : "Please complete payment to proceed."}</p>`
      : ""}
    <a href="https://iirdu.org/uk/orders/${orderId}"
       style="display: inline-block; background: #0f172a; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; margin-top: 12px;">
      ${isUk ? "Переглянути замовлення" : "View Order"}
    </a>
    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
    <p style="font-size: 12px; color: #9ca3af;">
      ПНУ «МІВРУ» · ЄДРПОУ 45681824<br>
      ${isUk ? "Цей лист надіслано автоматично." : "This email was sent automatically."}
    </p>
  </div>
</body>
</html>`;
}

/**
 * POST /api/notifications/order-status
 * Called internally when order status changes.
 * Body: { orderId, newStatus, locale? }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, newStatus, locale = "uk" } = body;

    if (!orderId || !newStatus) {
      return NextResponse.json({ error: "orderId and newStatus required" }, { status: 400 });
    }

    const supabase = createServerSupabase();

    // Fetch order with user profile
    const { data: order } = await supabase
      .from("orders")
      .select("id, title, user_id, profiles(full_name, email)")
      .eq("id", orderId)
      .single();

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const profile = order.profiles as unknown as { full_name: string; email: string } | null;
    if (!profile?.email) {
      return NextResponse.json({ error: "User has no email" }, { status: 400 });
    }

    const isUk = locale === "uk";
    const statusLabel = isUk
      ? STATUS_LABELS_UK[newStatus] || newStatus
      : newStatus.replace(/_/g, " ");

    // Insert notification record
    await supabase.from("notifications").insert({
      user_id: order.user_id,
      type: "order_status",
      title: isUk
        ? `Замовлення: ${statusLabel}`
        : `Order: ${statusLabel}`,
      body: isUk
        ? `Статус замовлення "${order.title}" змінено на "${statusLabel}"`
        : `Order "${order.title}" status changed to "${statusLabel}"`,
      link: `/${locale}/orders/${orderId}`,
    });

    // Send email
    const emailResult = await sendEmail({
      toEmail: profile.email,
      toName: profile.full_name,
      subject: isUk
        ? `МІВРУ — Замовлення: ${statusLabel}`
        : `IIRDU — Order: ${statusLabel}`,
      bodyHtml: statusEmailHtml(
        profile.full_name,
        order.title,
        orderId,
        newStatus,
        locale,
      ),
    });

    return NextResponse.json({
      notified: true,
      emailSent: emailResult.success,
    });
  } catch (error) {
    console.error("Notification error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
