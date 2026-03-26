import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type { OutputFormat } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function formatBytes(bytes: number) {
  if (bytes === 0) {
    return "0 B";
  }

  const units = ["B", "KB", "MB", "GB"];
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** exponent;

  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[exponent]}`;
}

export function outputFormatLabel(format: OutputFormat) {
  switch (format) {
    case "image/png":
      return "PNG";
    case "image/webp":
      return "WebP";
    default:
      return "JPG";
  }
}

export function outputExtension(format: OutputFormat) {
  switch (format) {
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    default:
      return "jpg";
  }
}

export function sanitizeFileBaseName(name: string) {
  return name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "privacyresize-image";
}

export function triggerDownload(url: string, fileName: string) {
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
}
