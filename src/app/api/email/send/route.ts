import { NextRequest, NextResponse } from "next/server";
import { sendEmail, reportEmailTemplate } from "@/services/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      toEmail,
      toName,
      subject,
      bodyHtml,
      attachmentPath,
      attachmentName,
      // Optional: generate template instead of custom HTML
      useTemplate,
      reportTitle,
      orderId,
    } = body;

    if (!toEmail) {
      return NextResponse.json(
        { success: false, message: "toEmail is required" },
        { status: 400 }
      );
    }

    const html = useTemplate && reportTitle
      ? reportEmailTemplate(reportTitle, orderId || "N/A")
      : bodyHtml;

    if (!html) {
      return NextResponse.json(
        { success: false, message: "bodyHtml or useTemplate+reportTitle is required" },
        { status: 400 }
      );
    }

    const result = await sendEmail({
      toEmail,
      toName: toName || "",
      subject: subject || "Науково-правовий висновок — МІВРУ",
      bodyHtml: html,
      attachmentPath,
      attachmentName,
    });

    return NextResponse.json(result, {
      status: result.success ? 200 : 500,
    });
  } catch (error) {
    console.error("[Email API] Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
