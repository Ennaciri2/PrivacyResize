"use client";

import { Download, Save, ShieldCheck } from "lucide-react";

import type { ToolImageItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { outputFormatLabel } from "@/lib/utils";

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

  return (
    <Card className="space-y-5">
      <div className="space-y-1">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Processing + export</p>
        <h2 className="text-xl font-semibold text-foreground">Run locally, then export</h2>
      </div>
      <div className="rounded-[1.4rem] border border-accent/18 bg-accent-soft/60 p-4 text-sm leading-7 text-foreground/72">
        <div className="mb-2 flex items-center gap-2 font-semibold text-foreground">
          <ShieldCheck className="size-4 text-accent" />
          Local-only notice
        </div>
        PrivacyResize processes the default workflow entirely in your browser. Your uploaded images are not sent to a
        backend just to resize or compress them.
      </div>
      <div className="grid gap-3 rounded-[1.4rem] border border-border bg-white/75 p-4 text-sm text-foreground/68">
        <p>
          Output: <span className="font-semibold text-foreground">{configSummary.width}</span> x{" "}
          <span className="font-semibold text-foreground">{configSummary.height}</span>
        </p>
        <p>
          Format: <span className="font-semibold text-foreground">{outputFormatLabel(configSummary.format as never)}</span>
        </p>
        <p>
          Quality: <span className="font-semibold text-foreground">{configSummary.quality}</span>
        </p>
      </div>
      <div className="grid gap-3">
        <Button disabled={busy || !items.length} fullWidth onClick={onProcessAll}>
          {busy ? "Processing..." : "Process images"}
        </Button>
        <Button
          disabled={!processedItems.length}
          fullWidth
          onClick={onDownloadAll}
          variant="secondary"
        >
          <Download className="mr-2 size-4" />
          Download ZIP
        </Button>
        <Button disabled={isSaving} fullWidth onClick={onSavePreset} variant="ghost">
          <Save className="mr-2 size-4" />
          {isSaving ? "Saving..." : "Save preset to account"}
        </Button>
      </div>
      {notice ? (
        <div className="rounded-[1.4rem] border border-border bg-white/80 px-4 py-3 text-sm leading-7 text-foreground/68">
          {notice}
        </div>
      ) : null}
      {processedItems.length ? (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">Downloads ready</p>
          <div className="grid gap-2">
            {processedItems.map((item) => (
              <button
                className="flex items-center justify-between rounded-[1.1rem] border border-border bg-white/80 px-4 py-3 text-sm text-foreground transition hover:border-accent/30"
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
