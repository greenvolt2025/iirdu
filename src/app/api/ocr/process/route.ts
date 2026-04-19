import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { z } from "zod";
import path from "path";

/**
 * POST /api/ocr/process
 * Process a document for OCR text extraction.
 * Body: { documentId }
 *
 * Uses Google Cloud Vision API if GOOGLE_VISION_API_KEY is set,
 * otherwise falls back to basic text extraction for PDFs.
 */
// Define upload directory constant
const UPLOAD_DIR = process.env.UPLOAD_DIR || "/tmp/rd4u-uploads";

// Input validation schema
const requestSchema = z.object({
  documentId: z.string().uuid("Invalid document ID format"),
});

/**
 * Safely resolve and validate file path to prevent directory traversal
 */
function safeFilePath(storagePath: string): string {
  // Get basename only (removes any directory components)
  const basename = path.basename(storagePath);

  // Join with upload directory
  const safePath = path.join(UPLOAD_DIR, basename);

  // Verify the resolved path is still within UPLOAD_DIR
  const resolvedPath = path.resolve(safePath);
  const resolvedUploadDir = path.resolve(UPLOAD_DIR);

  if (!resolvedPath.startsWith(resolvedUploadDir)) {
    throw new Error("Invalid file path: directory traversal detected");
  }

  return resolvedPath;
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validate input
    const body = await request.json();
    const validationResult = requestSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({
        error: "Invalid input",
        details: validationResult.error.issues
      }, { status: 400 });
    }
    const { documentId } = validationResult.data;

    // Fetch document
    const { data: doc, error: docError } = await supabase
      .from("documents")
      .select("id, file_name, storage_path, mime_type, ocr_status")
      .eq("id", documentId)
      .single();

    if (docError || !doc) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    if (doc.ocr_status === "completed") {
      return NextResponse.json({ message: "Already processed", status: "completed" });
    }

    // Mark as processing
    await supabase
      .from("documents")
      .update({ ocr_status: "processing" })
      .eq("id", documentId);

    let ocrText = "";
    const googleApiKey = process.env.GOOGLE_VISION_API_KEY;

    if (googleApiKey && doc.mime_type.startsWith("image/")) {
      // Use Google Cloud Vision for images
      try {
        const fs = await import("fs");
        // Use safe file path to prevent directory traversal
        const filePath = safeFilePath(doc.storage_path);

        if (fs.existsSync(filePath)) {
          const fileBuffer = fs.readFileSync(filePath);
          const base64 = fileBuffer.toString("base64");

          const visionResp = await fetch(
            `https://vision.googleapis.com/v1/images:annotate?key=${googleApiKey}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                requests: [{
                  image: { content: base64 },
                  features: [{ type: "TEXT_DETECTION" }],
                }],
              }),
            }
          );

          if (visionResp.ok) {
            const visionData = await visionResp.json();
            const annotations = visionData.responses?.[0]?.textAnnotations;
            if (annotations && annotations.length > 0) {
              ocrText = annotations[0].description || "";
            }
          }
        }
      } catch (e) {
        console.error("Google Vision OCR error:", e);
      }
    }

    // Fallback: extract basic metadata
    if (!ocrText) {
      ocrText = `[OCR pending — ${doc.file_name}]\nFile type: ${doc.mime_type}\nManual review required.`;
    }

    // Update document with OCR result
    const finalStatus = ocrText.startsWith("[OCR pending") ? "pending" : "completed";
    await supabase
      .from("documents")
      .update({
        ocr_text: ocrText,
        ocr_status: finalStatus,
      })
      .eq("id", documentId);

    return NextResponse.json({
      status: finalStatus,
      textLength: ocrText.length,
      preview: ocrText.slice(0, 200),
    });
  } catch (error) {
    console.error("OCR error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
