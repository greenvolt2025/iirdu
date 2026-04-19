import { NextRequest, NextResponse } from "next/server";
import { getSimplexBridge } from "@/services/simplex-bridge";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { filePath, contact, message } = body;

    if (!filePath && !message) {
      return NextResponse.json(
        { success: false, message: "filePath or message is required" },
        { status: 400 }
      );
    }

    const bridge = getSimplexBridge();

    if (!bridge.isConnected()) {
      try {
        await bridge.connect();
      } catch {
        return NextResponse.json(
          {
            success: false,
            message: "SimpleX Chat не підключений. Запустіть: simplex-chat -p 5225 -d ~/.simplex/iirdu",
          },
          { status: 503 }
        );
      }
    }

    // Send file if provided
    if (filePath) {
      await bridge.sendFile(filePath, contact);
    }

    // Send text message if provided
    if (message) {
      await bridge.sendNotification(message, contact);
    }

    return NextResponse.json({
      success: true,
      message: filePath
        ? `Файл ${filePath} надіслано${contact ? ` контакту ${contact}` : ""}`
        : `Повідомлення надіслано${contact ? ` контакту ${contact}` : ""}`,
    });
  } catch (error) {
    console.error("[SimpleX Send] Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: `Помилка SimpleX: ${error instanceof Error ? error.message : String(error)}`,
      },
      { status: 500 }
    );
  }
}
