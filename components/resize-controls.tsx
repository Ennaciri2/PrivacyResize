"use client";

import type { ChangeEvent } from "react";

import type { ToolConfig } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface ResizeControlsProps {
  busy: boolean;
  config: ToolConfig;
  onConfigChange: (nextConfig: Partial<ToolConfig>) => void;
  onDimensionChange: (field: "width" | "height", value: number) => void;
  onReset: () => void;
}

export function ResizeControls({
  busy,
  config,
  onConfigChange,
  onDimensionChange,
  onReset,
}: ResizeControlsProps) {
  const handleNumberChange =
    (field: "width" | "height") => (event: ChangeEvent<HTMLInputElement>) => {
      const nextValue = Number(event.target.value);

      if (Number.isFinite(nextValue)) {
        onDimensionChange(field, nextValue);
      }
    };

  return (
    <Card className="space-y-5">
      <div className="space-y-1">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Resize controls</p>
        <h2 className="text-xl font-semibold text-foreground">Tune the output</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-foreground/68">
          <span className="font-semibold text-foreground">Width</span>
          <Input min={32} onChange={handleNumberChange("width")} type="number" value={config.width} />
        </label>
        <label className="space-y-2 text-sm text-foreground/68">
          <span className="font-semibold text-foreground">Height</span>
          <Input min={32} onChange={handleNumberChange("height")} type="number" value={config.height} />
        </label>
      </div>
      <label className="flex items-center gap-3 rounded-2xl border border-border bg-white/75 px-4 py-3 text-sm text-foreground/72">
        <input
          checked={config.lockAspectRatio}
          className="size-4 accent-[var(--accent)]"
          onChange={(event) => onConfigChange({ lockAspectRatio: event.target.checked })}
          type="checkbox"
        />
        Lock aspect ratio while editing dimensions
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-foreground/68">
          <span className="font-semibold text-foreground">Resize mode</span>
          <select
            className="w-full rounded-2xl border border-border bg-white/85 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent/50 focus:ring-4 focus:ring-accent-soft"
            onChange={(event) => onConfigChange({ resizeMode: event.target.value as ToolConfig["resizeMode"] })}
            value={config.resizeMode}
          >
            <option value="fit">Fit</option>
            <option value="fill">Fill</option>
            <option value="crop">Crop</option>
          </select>
        </label>
        <label className="space-y-2 text-sm text-foreground/68">
          <span className="font-semibold text-foreground">Output format</span>
          <select
            className="w-full rounded-2xl border border-border bg-white/85 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent/50 focus:ring-4 focus:ring-accent-soft"
            onChange={(event) =>
              onConfigChange({ outputFormat: event.target.value as ToolConfig["outputFormat"] })
            }
            value={config.outputFormat}
          >
            <option value="image/jpeg">JPG</option>
            <option value="image/png">PNG</option>
            <option value="image/webp">WebP</option>
          </select>
        </label>
      </div>
      <label className="space-y-2 text-sm text-foreground/68">
        <span className="flex items-center justify-between font-semibold text-foreground">
          Compression quality
          <span>{config.quality}</span>
        </span>
        <input
          className="w-full accent-[var(--accent)]"
          max={100}
          min={10}
          onChange={(event) => onConfigChange({ quality: Number(event.target.value) })}
          type="range"
          value={config.quality}
        />
      </label>
      <label className="space-y-2 text-sm text-foreground/68">
        <span className="font-semibold text-foreground">Background color</span>
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-white/75 px-3 py-2.5">
          <input
            className="h-10 w-14 rounded-xl border border-border bg-transparent"
            onChange={(event) => onConfigChange({ backgroundColor: event.target.value })}
            type="color"
            value={config.backgroundColor}
          />
          <Input
            className="border-none bg-transparent px-0 shadow-none focus:ring-0"
            onChange={(event) => onConfigChange({ backgroundColor: event.target.value })}
            value={config.backgroundColor}
          />
        </div>
      </label>
      <Button disabled={busy} fullWidth onClick={onReset} variant="ghost">
        Reset all
      </Button>
    </Card>
  );
}
