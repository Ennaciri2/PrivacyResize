"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";

import type { ToolImageItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn, formatBytes } from "@/lib/utils";

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
  return (
    <Card className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Batch queue</p>
          <h2 className="mt-1 text-xl font-semibold text-foreground">{items.length} image(s) loaded</h2>
        </div>
        {items.length ? (
          <Button onClick={onClearAll} variant="ghost">
            Clear all
          </Button>
        ) : null}
      </div>
      <div className="grid gap-3">
        {items.length ? (
          items.map((item) => (
            <button
              className={cn(
                "grid grid-cols-[64px_1fr_auto] items-center gap-4 rounded-[1.4rem] border bg-white/76 p-3 text-left transition",
                activeImageId === item.id ? "border-accent bg-accent-soft/50" : "border-border hover:border-accent/30",
              )}
              key={item.id}
              onClick={() => onSelectImage(item.id)}
              type="button"
            >
              <div className="relative size-16 overflow-hidden rounded-2xl border border-border bg-surface-muted">
                <Image alt={item.fileName} className="object-cover" fill sizes="64px" src={item.previewUrl} unoptimized />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">{item.fileName}</p>
                <p className="mt-1 text-xs text-foreground/58">
                  {item.width} x {item.height}
                  {item.processedSize ? ` • ${formatBytes(item.processedSize)}` : ""}
                </p>
                <p className="mt-2 text-xs font-medium text-accent">
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
          <div className="rounded-[1.4rem] border border-border bg-white/70 px-5 py-6 text-sm leading-7 text-foreground/62">
            Add a few images to start. The queue gives you per-file previews, manual crop selection for the active
            item, and a clean batch export once processing finishes.
          </div>
        )}
      </div>
    </Card>
  );
}
