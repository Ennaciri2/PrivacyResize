"use client";

import { ImagePlus, UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";

import { cn } from "@/lib/utils";

interface UploadZoneProps {
  disabled?: boolean;
  onFilesAdded: (files: File[]) => void;
}

export function UploadZone({ disabled = false, onFilesAdded }: UploadZoneProps) {
  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    disabled,
    multiple: true,
    onDrop: (acceptedFiles) => {
      onFilesAdded(acceptedFiles);
    },
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "spotlight-outline interactive-card group rounded-[1.95rem] border border-dashed px-6 py-10 text-center sm:px-8 sm:py-12",
        isDragActive
          ? "border-brand-cyan bg-[linear-gradient(135deg,rgba(18,122,107,0.12),rgba(19,214,215,0.16),rgba(20,126,239,0.14))] shadow-[0_18px_50px_rgba(11,45,85,0.1)]"
          : "border-border-strong bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(255,255,255,0.82))] hover:border-brand-cyan/45 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,255,255,0.88))] hover:shadow-[0_20px_55px_rgba(11,45,85,0.09)]",
        disabled && "cursor-not-allowed opacity-60",
      )}
    >
      <input {...getInputProps()} />
      <div className="mx-auto flex max-w-md flex-col items-center gap-4">
        <div
          className={cn(
            "rounded-[1.6rem] bg-[linear-gradient(135deg,rgba(18,122,107,0.14),rgba(19,214,215,0.22),rgba(20,126,239,0.18))] p-4 text-brand-navy shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] transition duration-300 group-hover:-translate-y-0.5 group-hover:scale-[1.03]",
            isDragActive && "pulse-soft",
          )}
        >
          {isDragActive ? <UploadCloud className="size-8" /> : <ImagePlus className="size-8" />}
        </div>
        <div className="space-y-2">
          <p className="text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-brand-navy">
            Drop images here or click to browse
          </p>
          <p className="text-sm leading-6 text-foreground/62">
            Bulk upload is supported. No login required. Files stay on your device during the default workflow.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-navy/78">
          <span className="rounded-full bg-white/74 px-3 py-2">JPG</span>
          <span className="rounded-full bg-white/74 px-3 py-2">PNG</span>
          <span className="rounded-full bg-white/74 px-3 py-2">WebP</span>
          <span className="rounded-full bg-white/74 px-3 py-2">Bulk ZIP export</span>
        </div>
      </div>
    </div>
  );
}
