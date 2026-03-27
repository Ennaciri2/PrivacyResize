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
        <h2 className="text-xl font-semibold text-foreground">Set the frame and behavior</h2>
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
      <div className="space-y-2 text-sm text-foreground/68">
        <span className="font-semibold text-foreground">Resize mode</span>
        <div className="grid grid-cols-3 gap-2">
          {(["fit", "fill", "crop"] as const).map((mode) => (
            <button
              className={
                config.resizeMode === mode
                  ? "rounded-[1.15rem] border border-brand-cyan/60 bg-[linear-gradient(135deg,rgba(18,122,107,0.12),rgba(19,214,215,0.16))] px-4 py-3 text-sm font-semibold capitalize text-brand-navy shadow-[inset_0_1px_0_rgba(255,255,255,0.82)]"
                  : "rounded-[1.15rem] border border-border bg-white/84 px-4 py-3 text-sm font-semibold capitalize text-foreground/66 transition hover:border-brand-cyan/40 hover:text-foreground"
              }
              key={mode}
              onClick={() => onConfigChange({ resizeMode: mode })}
              type="button"
            >
              {mode}
            </button>
          ))}
        </div>
      </div>
      <Button disabled={busy} fullWidth onClick={onReset} variant="ghost">
        Reset all
      </Button>
    </Card>
  );
}
