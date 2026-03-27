"use client";

import type { ToolConfig } from "@/types";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface OutputSettingsProps {
  config: ToolConfig;
  onConfigChange: (nextConfig: Partial<ToolConfig>) => void;
}

const formatOptions = [
  { label: "JPG", value: "image/jpeg" },
  { label: "PNG", value: "image/png" },
  { label: "WebP", value: "image/webp" },
] as const;

export function OutputSettings({ config, onConfigChange }: OutputSettingsProps) {
  return (
    <Card className="space-y-5">
      <div className="space-y-1">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Output settings</p>
        <h2 className="text-xl font-semibold text-foreground">Choose export quality and format</h2>
      </div>
      <div className="space-y-3">
        <p className="text-sm font-semibold text-foreground">Format</p>
        <div className="grid grid-cols-3 gap-2">
          {formatOptions.map((option) => (
            <button
              className={cn(
                "rounded-[1.15rem] border px-4 py-3 text-sm font-semibold transition",
                config.outputFormat === option.value
                  ? "border-brand-cyan/60 bg-[linear-gradient(135deg,rgba(18,122,107,0.14),rgba(19,214,215,0.16))] text-brand-navy shadow-[inset_0_1px_0_rgba(255,255,255,0.82)]"
                  : "border-border bg-white/84 text-foreground/68 hover:border-brand-cyan/40 hover:text-foreground",
              )}
              key={option.value}
              onClick={() => onConfigChange({ outputFormat: option.value })}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <label className="space-y-2 text-sm text-foreground/68">
        <span className="flex items-center justify-between font-semibold text-foreground">
          Compression quality
          <span className="rounded-full bg-accent-soft px-3 py-1 text-xs text-brand-navy">{config.quality}</span>
        </span>
        <input
          className="w-full accent-[var(--brand-blue)]"
          max={100}
          min={10}
          onChange={(event) => onConfigChange({ quality: Number(event.target.value) })}
          type="range"
          value={config.quality}
        />
      </label>
      <label className="space-y-2 text-sm text-foreground/68">
        <span className="font-semibold text-foreground">Background color</span>
        <div className="flex items-center gap-3 rounded-[1.2rem] border border-border bg-white/84 px-3 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.82)]">
          <input
            className="h-11 w-14 rounded-xl border border-border bg-transparent"
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
    </Card>
  );
}
