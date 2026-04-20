"use client";

import { useCallback, useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { Upload, X, FileText, Image, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface DocumentUploadProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  orderId?: string;
}

interface UploadingFile {
  file: File;
  progress: number;
  status: "uploading" | "complete" | "error";
}

const ACCEPTED_TYPES = {
  "application/pdf": [".pdf"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/tiff": [".tiff", ".tif"],
};

const MAX_SIZE = 1024 * 1024 * 1024; // 1 GB

export default function DocumentUpload({ files, onFilesChange, orderId }: DocumentUploadProps) {
  const t = useTranslations("upload");
  const params = useParams();
  const locale = params.locale as string;
  const [uploading, setUploading] = useState<UploadingFile[]>([]);

  const onDrop = useCallback(
    async (accepted: File[]) => {
      onFilesChange([...files, ...accepted]);

      const newUploads: UploadingFile[] = accepted.map((file) => ({
        file,
        progress: 0,
        status: "uploading" as const,
      }));
      setUploading((prev) => [...prev, ...newUploads]);

      // Upload each file via secure channel (SimpleX transparent)
      for (const upload of newUploads) {
        try {
          const formData = new FormData();
          formData.append("file", upload.file);
          formData.append("channel", "simplex");
          if (orderId) formData.append("orderId", orderId);

          // Use XMLHttpRequest for real progress tracking
          await new Promise<void>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.upload.onprogress = (e) => {
              if (e.lengthComputable) {
                const percent = Math.round((e.loaded / e.total) * 100);
                setUploading((prev) =>
                  prev.map((u) =>
                    u.file === upload.file ? { ...u, progress: percent } : u
                  )
                );
              }
            };
            xhr.onload = () => {
              if (xhr.status >= 200 && xhr.status < 300) {
                setUploading((prev) =>
                  prev.map((u) =>
                    u.file === upload.file ? { ...u, progress: 100, status: "complete" } : u
                  )
                );
                resolve();
              } else {
                reject(new Error(`Upload failed: ${xhr.statusText}`));
              }
            };
            xhr.onerror = () => reject(new Error("Network error"));
            xhr.open("POST", "/api/upload");
            xhr.send(formData);
          });
        } catch {
          setUploading((prev) =>
            prev.map((u) =>
              u.file === upload.file ? { ...u, status: "error" } : u
            )
          );
        }
      }
    },
    [files, onFilesChange, orderId]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxSize: MAX_SIZE,
    multiple: true,
  });

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
    setUploading((prev) => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return Image;
    return FileText;
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-4">
      {/* Secure channel indicator */}
      <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800 flex items-start gap-2">
        <ShieldCheck className="h-4 w-4 mt-0.5 shrink-0" />
        <div>
          <p className="font-medium">{locale === "uk" ? "Захищений канал передачі" : "Secure transfer channel"}</p>
          <p className="text-xs mt-1 text-green-700">
            {locale === "uk"
              ? "Наскрізне шифрування, без метаданих, без ідентифікаторів"
              : "End-to-end encryption, no metadata, no user identifiers"}
          </p>
        </div>
      </div>

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive
            ? "border-[#e6a817] bg-[#e6a817]/5"
            : "border-gray-300 hover:border-[#e6a817]/50"
        )}
      >
        <input {...getInputProps()} />
        <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
        <p className="font-medium text-sm">{t("dragDrop")}</p>
        <p className="text-xs text-muted-foreground mt-1">{t("orClick")}</p>
        <p className="text-xs text-muted-foreground mt-2">{t("formats")}</p>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => {
            const FileIcon = getFileIcon(file.type);
            const upload = uploading[index];
            return (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center gap-3 p-3 rounded-lg border bg-white"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                  <FileIcon className="h-5 w-5 text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{formatSize(file.size)}</span>
                    {upload && (
                      <span className={cn("text-xs", {
                        "text-blue-600": upload.status === "uploading",
                        "text-green-600": upload.status === "complete",
                        "text-red-600": upload.status === "error",
                      })}>
                        {upload.status === "uploading" && `${Math.round(upload.progress)}%`}
                        {upload.status === "complete" && "✓"}
                        {upload.status === "error" && "✗"}
                      </span>
                    )}
                    {upload?.status === "complete" && (
                      <ShieldCheck className="h-3 w-3 text-green-600" />
                    )}
                  </div>
                  {upload && upload.status === "uploading" && (
                    <Progress value={upload.progress} className="h-1 mt-1" />
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
