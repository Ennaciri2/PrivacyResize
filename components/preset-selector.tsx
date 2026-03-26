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
  return (
    <Card className="space-y-4">
      <div className="space-y-1">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Preset selection</p>
        <h2 className="text-xl font-semibold text-foreground">Start from a proven target size</h2>
      </div>
      <label className="space-y-2 text-sm text-foreground/68">
        <span className="font-semibold text-foreground">Choose a preset</span>
        <select
          className="w-full rounded-2xl border border-border bg-white/85 px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent/50 focus:ring-4 focus:ring-accent-soft"
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
