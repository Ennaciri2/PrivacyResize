"use client";

import { Download, Save, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { outputFormatLabel } from "@/lib/utils";
import type { ToolImageItem } from "@/types";

interface DownloadPanelProps {
  busy: boolean;
  configSummary: {
    format: string;
    quality: number;
    width: number;
    height: number;
  };
  isSaving: boolean;
  items: ToolImageItem[];
  notice: string | null;
  onDownloadAll: () => void;
  onDownloadSingle: (id: string) => void;
  onProcessAll: () => void;
  onSavePreset: () => void;
}

export function DownloadPanel({
  busy,
  configSummary,
  isSaving,
  items,
  notice,
  onDownloadAll,
  onDownloadSingle,
  onProcessAll,
  onSavePreset,
}: DownloadPanelProps) {
  const processedItems = items.filter((item) => item.processedBlob);
  const queuedCount = Math.max(items.length - processedItems.length, 0);

  return (
    <Card className="space-y-5 rounded-[1.85rem] p-5 sm:p-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Processing + export</p>
        <h2 className="text-xl font-semibold text-foreground">Run locally, then export</h2>
        <p className="text-sm leading-7 text-foreground/62">
          The export panel stays visually separate from the editing controls so the main action is easy to scan.
        </p>
      </div>

      <div className="rounded-[1.5rem] border border-accent/18 bg-[linear-gradient(135deg,rgba(18,122,107,0.12),rgba(19,214,215,0.12))] p-4 text-sm leading-7 text-foreground/72">
        <div className="mb-2 flex items-center gap-2 font-semibold text-foreground">
          <ShieldCheck className="size-4 text-accent" />
          Local-only notice
        </div>
        PrivacyResize processes the default workflow entirely in your browser. Your uploaded images are not sent to a
        backend just to resize or compress them.
      </div>

      <div className="grid gap-3 rounded-[1.5rem] border border-border bg-white/78 p-4 text-sm text-foreground/68">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-[1.2rem] border border-border bg-surface-muted/60 px-4 py-3">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-foreground/46">Target size</p>
            <p className="mt-2 text-base font-semibold text-foreground">
              {configSummary.width} x {configSummary.height}
            </p>
          </div>
          <div className="rounded-[1.2rem] border border-border bg-surface-muted/60 px-4 py-3">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-foreground/46">Format</p>
            <p className="mt-2 text-base font-semibold text-foreground">
              {outputFormatLabel(configSummary.format as never)}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-[1.2rem] border border-border bg-surface-muted/60 px-4 py-3">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-foreground/46">Compression</p>
            <p className="mt-2 text-base font-semibold text-foreground">{configSummary.quality}</p>
          </div>
          <div className="text-right">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-foreground/46">Batch state</p>
            <p className="mt-2 text-base font-semibold text-foreground">
              {processedItems.length} ready
              {queuedCount ? ` / ${queuedCount} pending` : ""}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-3">
        <Button disabled={busy || !items.length} fullWidth onClick={onProcessAll}>
          {busy ? "Processing..." : "Process locally"}
        </Button>
        <Button disabled={!processedItems.length} fullWidth onClick={onDownloadAll} variant="secondary">
          <Download className="mr-2 size-4" />
          Download ZIP
        </Button>
        <Button disabled={isSaving} fullWidth onClick={onSavePreset} variant="ghost">
          <Save className="mr-2 size-4" />
          {isSaving ? "Saving..." : "Save preset"}
        </Button>
      </div>

      {notice ? (
        <div className="rounded-[1.5rem] border border-border bg-white/80 px-4 py-3 text-sm leading-7 text-foreground/68">
          {notice}
        </div>
      ) : null}

      {processedItems.length ? (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">Downloads ready</p>
          <div className="grid gap-2">
            {processedItems.map((item) => (
              <button
                className="flex items-center justify-between rounded-[1.2rem] border border-border bg-white/82 px-4 py-3 text-sm text-foreground transition hover:border-brand-cyan/40 hover:shadow-[0_18px_45px_rgba(11,45,85,0.08)]"
                key={item.id}
                onClick={() => onDownloadSingle(item.id)}
                type="button"
              >
                <span className="truncate pr-3">{item.processedName ?? item.fileName}</span>
                <span className="font-semibold text-accent">Download</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </Card>
  );
}
