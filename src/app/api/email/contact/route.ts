import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/services/email";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { siteConfig } from "@/config/site";

// Sanitize email headers to prevent injection
function sanitizeEmailHeader(value: string): string {
  return value.replace(/[\r\n"]/g, "").trim();
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 3 contact form submissions per hour per IP
    const clientIp = getClientIp(request);
    const rateLimitResult = rateLimit(clientIp, { limit: 3, windowSeconds: 3600 });

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: `Too many requests. Please try again in ${rateLimitResult.resetIn} seconds.`,
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, phone, messageType, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email address" },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const safeName = sanitizeEmailHeader(name);
    const safeEmail = sanitizeEmailHeader(email);
    const safePhone = phone ? sanitizeEmailHeader(phone) : "Не вказано";
    const safeMessageType = messageType ? sanitizeEmailHeader(messageType) : "Загальне";
    const safeMessage = message.replace(/[\r\n]/g, "<br>").trim();

    // Build email HTML
    const messageTypeLabels: Record<string, { uk: string; en: string }> = {
      consultation: { uk: "Консультація", en: "Consultation" },
      question: { uk: "Питання", en: "Question" },
      partnership: { uk: "Партнерство", en: "Partnership" },
    };

    const typeLabel =
      messageTypeLabels[safeMessageType]?.uk || safeMessageType;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background-color: #f8fafc;">
  <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(15, 23, 42, 0.08);">

    <!-- Header -->
    <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 32px 24px; text-align: center;">
      <div style="display: inline-block; width: 48px; height: 48px; background: linear-gradient(135deg, #e6a817 0%, #d97706 100%); border-radius: 12px; margin-bottom: 16px;">
        <span style="display: block; font-family: 'Playfair Display', serif; font-size: 24px; font-weight: bold; color: #0f172a; line-height: 48px;">М</span>
      </div>
      <h1 style="margin: 0; color: #ffffff; font-family: 'Playfair Display', serif; font-size: 24px; font-weight: bold;">
        Нове повідомлення з контактної форми
      </h1>
      <p style="margin: 8px 0 0; color: #cbd5e1; font-size: 14px;">
        ${new Date().toLocaleString("uk-UA", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>

    <!-- Body -->
    <div style="padding: 32px 24px;">

      <!-- Contact Info -->
      <div style="background-color: #f1f5f9; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
        <h2 style="margin: 0 0 16px; color: #0f172a; font-size: 16px; font-weight: 600;">
          Контактна інформація
        </h2>

        <table style="width: 100%; border-spacing: 0;">
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 100px;">Ім'я:</td>
            <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Email:</td>
            <td style="padding: 8px 0;">
              <a href="mailto:${safeEmail}" style="color: #e6a817; text-decoration: none; font-weight: 600;">${safeEmail}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Телефон:</td>
            <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${safePhone}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Тип:</td>
            <td style="padding: 8px 0;">
              <span style="display: inline-block; background-color: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 6px; font-size: 12px; font-weight: 600;">
                ${typeLabel}
              </span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Message -->
      <div>
        <h2 style="margin: 0 0 12px; color: #0f172a; font-size: 16px; font-weight: 600;">
          Повідомлення
        </h2>
        <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; color: #334155; font-size: 14px; line-height: 1.6;">
          ${safeMessage}
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #f8fafc; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0;">
      <p style="margin: 0 0 8px; color: #64748b; font-size: 12px;">
        Міжнародний інститут відновлення та розвитку України (МІВРУ)
      </p>
      <p style="margin: 0; color: #94a3b8; font-size: 12px;">
        ЄДРПОУ: ${siteConfig.edrpou}
      </p>
    </div>

  </div>
</body>
</html>
`;

    // Send email to institute
    const result = await sendEmail({
      toEmail: siteConfig.email, // iirdu@proton.me
      toName: "МІВРУ",
      subject: `[Контакт] ${typeLabel}: ${safeName}`,
      bodyHtml: html,
    });

    if (!result.success) {
      console.error("[Contact API] Failed to send email:", result.message);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send message. Please try again or contact us directly.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully. We will respond within 1 business day.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact API] Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
