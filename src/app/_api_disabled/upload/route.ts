import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { createServerSupabase } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  // Rate limit: 20 uploads per minute per IP
  const ip = getClientIp(request);
  const rl = rateLimit(`upload:${ip}`, { limit: 20, windowSeconds: 60 });
  if (!rl.success) {
    return NextResponse.json(
      { error: "Too many uploads. Try again later." },
      { status: 429, headers: { "Retry-After": String(rl.resetIn) } },
    );
  }

  try {
    const supabase = createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const channel = formData.get("channel") as string || "standard";
    const orderId = formData.get("orderId") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/tiff",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "File type not allowed" }, { status: 400 });
    }

    // Validate size (100 MB)
    if (file.size > 100 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large (max 100 MB)" }, { status: 400 });
    }

    const fileId = randomUUID();
    const ext = file.name.split(".").pop() || "bin";
    const storagePath = `${orderId || "general"}/${fileId}.${ext}`;

    // Upload to Supabase Storage
    const bytes = await file.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from("documents")
      .upload(storagePath, Buffer.from(bytes), {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      // Fallback: save locally if storage bucket not configured
      const { writeFile, mkdir } = await import("fs/promises");
      const { join } = await import("path");
      const UPLOAD_DIR = process.env.UPLOAD_DIR || "/tmp/iirdu-uploads";
      const uploadPath = join(UPLOAD_DIR, orderId || "general");
      await mkdir(uploadPath, { recursive: true });
      const filePath = join(uploadPath, `${fileId}.${ext}`);
      await writeFile(filePath, Buffer.from(bytes));
    }

    // Create document record in database
    if (orderId) {
      await supabase.from("documents").insert({
        id: fileId,
        order_id: orderId,
        file_name: file.name,
        file_size: file.size,
        mime_type: file.type,
        storage_path: storagePath,
        upload_channel: channel,
        ocr_status: "pending",
      });
    }

    // If SimpleX channel — send via SimpleX bridge
    if (channel === "simplex") {
      try {
        const { getSimplexBridge } = await import("@/services/simplex-bridge");
        const bridge = getSimplexBridge();
        await bridge.connect();
        await bridge.sendNotification(
          `New file uploaded: ${file.name} (${(file.size / 1024 / 1024).toFixed(1)} MB) for order ${orderId || "N/A"}`
        );
      } catch (simplexError) {
        console.error("[Upload] SimpleX notification failed:", simplexError);
      }
    }

    return NextResponse.json({
      success: true,
      fileId,
      fileName: file.name,
      fileSize: file.size,
      channel,
      storagePath,
    });
  } catch (error) {
    console.error("[Upload] Error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
