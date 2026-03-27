"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn, formatBytes } from "@/lib/utils";
import type { ToolImageItem } from "@/types";

interface BatchQueueProps {
  activeImageId: string | null;
  items: ToolImageItem[];
  onClearAll: () => void;
  onRemoveImage: (id: string) => void;
  onSelectImage: (id: string) => void;
}

export function BatchQueue({
  activeImageId,
  items,
  onClearAll,
  onRemoveImage,
  onSelectImage,
}: BatchQueueProps) {
  const readyCount = items.filter((item) => item.status === "done").length;
  const errorCount = items.filter((item) => item.status === "error").length;
  const queuedCount = Math.max(items.length - readyCount - errorCount, 0);

  return (
    <Card className="space-y-5 rounded-[1.8rem] p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Batch queue</p>
            <h2 className="mt-1 text-xl font-semibold text-foreground">{items.length} image(s) loaded</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-navy">
              {readyCount} ready
            </span>
            <span className="rounded-full border border-border bg-white/84 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-foreground/62">
              {queuedCount} queued
            </span>
            {errorCount ? (
              <span className="rounded-full bg-danger/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-danger">
                {errorCount} issue{errorCount > 1 ? "s" : ""}
              </span>
            ) : null}
          </div>
        </div>
        {items.length ? (
          <Button onClick={onClearAll} variant="ghost">
            Clear all
          </Button>
        ) : null}
      </div>
      <div className="grid gap-3">
        {items.length ? (
          items.map((item, index) => (
            <button
              className={cn(
                "group queue-entry-in interactive-card grid grid-cols-[64px_1fr_auto] items-center gap-4 rounded-[1.5rem] border bg-white/80 p-3 text-left",
                activeImageId === item.id
                  ? "border-brand-cyan/40 bg-[linear-gradient(135deg,rgba(18,122,107,0.1),rgba(19,214,215,0.14))] shadow-[0_18px_45px_rgba(11,45,85,0.08)]"
                  : "border-border hover:border-brand-cyan/35 hover:bg-white hover:shadow-[0_16px_36px_rgba(11,45,85,0.07)]",
              )}
              key={item.id}
              onClick={() => onSelectImage(item.id)}
              style={{ animationDelay: `${index * 38}ms` }}
              type="button"
            >
              <div className="relative size-16 overflow-hidden rounded-2xl border border-border bg-surface-muted">
                <Image
                  alt={item.fileName}
                  className="object-cover transition duration-300 group-hover:scale-[1.03]"
                  fill
                  sizes="64px"
                  src={item.previewUrl}
                  unoptimized
                />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">{item.fileName}</p>
                <p className="mt-1 text-xs text-foreground/58">
                  {item.width} x {item.height}
                  {item.processedSize ? ` • ${formatBytes(item.processedSize)}` : ""}
                </p>
                <p
                  className={cn(
                    "mt-2 text-xs font-medium",
                    item.status === "error" ? "text-danger" : "text-accent",
                  )}
                >
                  {item.status === "done"
                    ? "Ready to download"
                    : item.status === "processing"
                      ? "Processing..."
                      : item.status === "error"
                        ? item.errorMessage ?? "Error"
                        : "Queued"}
                </p>
              </div>
              <Button
                aria-label={`Remove ${item.fileName}`}
                className="h-10 px-3"
                onClick={(event) => {
                  event.stopPropagation();
                  onRemoveImage(item.id);
                }}
                variant="ghost"
              >
                <Trash2 className="size-4" />
              </Button>
            </button>
          ))
        ) : (
          <div className="rounded-[1.5rem] border border-border bg-white/74 px-5 py-6 text-sm leading-7 text-foreground/62">
            Drop a small batch to build momentum fast. You will get file previews, active-image crop control, and a
            clean export list as soon as processing finishes.
          </div>
        )}
      </div>
    </Card>
  );
}
