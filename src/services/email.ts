/**
 * Email Service — server-side email sending for МІВРУ web platform.
 *
 * Uses nodemailer for SMTP transport with TLS.
 * Supports HTML body + file attachments (PDF, DOCX).
 */

import nodemailer from "nodemailer";

interface EmailConfig {
  smtpHost: string;
  smtpPort: number;
  username: string;
  password: string;
  fromName: string;
  fromEmail: string;
}

interface SendEmailRequest {
  toEmail: string;
  toName: string;
  subject: string;
  bodyHtml: string;
  attachmentPath?: string;
  attachmentName?: string;
}

interface EmailResult {
  success: boolean;
  message: string;
  messageId?: string;
}

function getConfig(): EmailConfig {
  return {
    smtpHost: process.env.SMTP_HOST || "smtp.gmail.com",
    smtpPort: parseInt(process.env.SMTP_PORT || "587"),
    username: process.env.SMTP_USERNAME || "",
    password: process.env.SMTP_PASSWORD || "",
    fromName: process.env.SMTP_FROM_NAME || "МІВРУ",
    fromEmail: process.env.SMTP_FROM_EMAIL || "",
  };
}

/**
 * Sanitize email header values to prevent injection attacks
 */
function sanitizeEmailHeader(value: string): string {
  // Remove CR, LF, and quotes that could be used for header injection
  return value.replace(/[\r\n"]/g, "").trim();
}

/**
 * Validate email address format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function sendEmail(
  request: SendEmailRequest,
  configOverride?: Partial<EmailConfig>
): Promise<EmailResult> {
  const config = { ...getConfig(), ...configOverride };

  if (!config.username || !config.password) {
    return {
      success: false,
      message: "SMTP не налаштований. Встановіть SMTP_USERNAME та SMTP_PASSWORD.",
    };
  }

  // Validate email address
  if (!isValidEmail(request.toEmail)) {
    return {
      success: false,
      message: "Невалідна email адреса отримувача.",
    };
  }

  // Sanitize all user-provided strings to prevent injection
  const sanitizedToName = sanitizeEmailHeader(request.toName);
  const sanitizedSubject = sanitizeEmailHeader(request.subject);
  const sanitizedFromName = sanitizeEmailHeader(config.fromName);

  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: config.smtpPort === 465,
    auth: {
      user: config.username,
      pass: config.password,
    },
  });

  const mailOptions: nodemailer.SendMailOptions = {
    from: `"${sanitizedFromName}" <${config.fromEmail || config.username}>`,
    to: sanitizedToName
      ? `"${sanitizedToName}" <${request.toEmail}>`
      : request.toEmail,
    subject: sanitizedSubject,
    html: request.bodyHtml,
  };

  if (request.attachmentPath) {
    mailOptions.attachments = [
      {
        filename: request.attachmentName || "document.pdf",
        path: request.attachmentPath,
      },
    ];
  }

  try {
    const info = await transporter.sendMail(mailOptions);
    return {
      success: true,
      message: `Лист надіслано на ${request.toEmail}`,
      messageId: info.messageId,
    };
  } catch (error) {
    return {
      success: false,
      message: `Помилка відправки: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

/**
 * Generate branded МІВРУ email template for report delivery.
 */
export function reportEmailTemplate(
  reportTitle: string,
  orderId: string
): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #0f172a; color: white; padding: 20px; border-radius: 12px 12px 0 0; text-align: center;">
    <h2 style="margin: 0; font-size: 18px;">МІВРУ</h2>
    <p style="margin: 4px 0 0; font-size: 12px; color: #9ca3af;">Міжнародний інститут відновлення та розвитку України</p>
  </div>
  <div style="border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 12px 12px;">
    <p>Шановний клієнте,</p>
    <p>Надсилаємо Вам підготовлений науково-правовий висновок:</p>
    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 16px 0;">
      <p style="margin: 0; font-weight: bold;">${reportTitle}</p>
      <p style="margin: 4px 0 0; font-size: 14px; color: #6b7280;">Замовлення: ${orderId}</p>
    </div>
    <p>Документ додано у вкладенні. Якщо маєте питання, зв'яжіться з нами.</p>
    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
    <p style="font-size: 12px; color: #9ca3af;">
      ПНУ «МІВРУ» · ЄДРПОУ 45681824<br>
      Цей лист та вкладення є конфіденційними.
    </p>
  </div>
</body>
</html>`;
}

export type { EmailConfig, SendEmailRequest, EmailResult };
