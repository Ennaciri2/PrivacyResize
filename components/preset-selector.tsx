"use client";

import type { ExactSizePreset, SeoPreset, ToolConfig } from "@/types";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface RecentPreset {
  label: string;
  config: ToolConfig;
}

interface PresetSelectorProps {
  exactSizes: ExactSizePreset[];
  presets: SeoPreset[];
  recentPresets: RecentPreset[];
  selectedPresetSlug?: string;
  onPresetSelect: (value: string) => void;
  onRecentPresetApply: (config: ToolConfig) => void;
}

export function PresetSelector({
  exactSizes,
  presets,
  recentPresets,
  selectedPresetSlug,
  onPresetSelect,
  onRecentPresetApply,
}: PresetSelectorProps) {
  const featuredPresets = presets.slice(0, 8);

  return (
    <Card className="space-y-4">
      <div className="space-y-1">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Preset selection</p>
        <h2 className="text-xl font-semibold text-foreground">Pick a preset and move fast</h2>
        <p className="text-sm leading-7 text-foreground/62">
          Start with a proven target, then tweak dimensions or export settings only if needed.
        </p>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {featuredPresets.map((preset) => (
          <button
            className={selectedPresetSlug === preset.slug
              ? "rounded-[1.2rem] border border-brand-cyan/60 bg-[linear-gradient(135deg,rgba(18,122,107,0.12),rgba(19,214,215,0.16))] px-4 py-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.82)]"
              : "rounded-[1.2rem] border border-border bg-white/86 px-4 py-3 text-left transition hover:border-brand-cyan/40 hover:bg-white"}
            key={preset.slug}
            onClick={() => onPresetSelect(preset.slug)}
            type="button"
          >
            <p className="text-sm font-semibold text-foreground">{preset.shortLabel}</p>
            <p className="mt-1 text-xs text-foreground/58">
              {preset.width} x {preset.height}
            </p>
          </button>
        ))}
      </div>
      <label className="space-y-2 text-sm text-foreground/68">
        <span className="font-semibold text-foreground">Browse all presets and exact sizes</span>
        <select
          className="w-full rounded-[1.2rem] border border-border bg-white/86 px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand-cyan/50 focus:ring-4 focus:ring-accent-soft"
          onChange={(event) => onPresetSelect(event.target.value)}
          value={selectedPresetSlug ?? ""}
        >
          <option value="">Custom size</option>
          {presets.map((preset) => (
            <option key={preset.slug} value={preset.slug}>
              {preset.shortLabel} ({preset.width} x {preset.height})
            </option>
          ))}
          {exactSizes.map((preset) => (
            <option key={preset.dimensions} value={`size:${preset.dimensions}`}>
              Exact size {preset.dimensions}
            </option>
          ))}
        </select>
      </label>
      {recentPresets.length ? (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">Recent local presets</p>
          <div className="flex flex-wrap gap-2">
            {recentPresets.map((preset) => (
              <Button
                className="rounded-full px-4 py-2 text-xs"
                key={`${preset.label}-${preset.config.width}-${preset.config.height}`}
                onClick={() => onRecentPresetApply(preset.config)}
                variant="secondary"
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>
      ) : null}
    </Card>
  );
}
