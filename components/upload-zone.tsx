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
        "rounded-[1.8rem] border border-dashed px-6 py-10 text-center transition",
        isDragActive
          ? "border-accent bg-accent-soft/60 shadow-[0_18px_50px_rgba(18,122,107,0.12)]"
          : "border-border-strong bg-white/72",
        disabled && "cursor-not-allowed opacity-60",
      )}
    >
      <input {...getInputProps()} />
      <div className="mx-auto flex max-w-md flex-col items-center gap-4">
        <div className="rounded-3xl bg-accent-soft p-4 text-accent">
          {isDragActive ? <UploadCloud className="size-8" /> : <ImagePlus className="size-8" />}
        </div>
        <div className="space-y-2">
          <p className="text-lg font-semibold text-foreground">
            Drag images here or click to browse
          </p>
          <p className="text-sm leading-6 text-foreground/62">
            Multi-image upload supported. Files stay on your device during the default workflow.
          </p>
        </div>
      </div>
    </div>
  );
}
