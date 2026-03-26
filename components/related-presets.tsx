import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buildPresetPath } from "@/lib/seo";
import type { SeoPreset } from "@/types";
import { Card } from "@/components/ui/card";

interface RelatedPresetsProps {
  items: SeoPreset[];
}

export function RelatedPresets({ items }: RelatedPresetsProps) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="section-shell space-y-8 py-12">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Related presets</p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">Keep the workflow moving</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((preset) => (
          <Card className="flex h-full flex-col justify-between gap-4" key={preset.slug}>
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{preset.category}</p>
              <h3 className="text-xl font-semibold text-foreground">{preset.shortLabel}</h3>
              <p className="text-sm leading-7 text-foreground/68">{preset.metaDescription}</p>
            </div>
            <Link
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:text-accent-strong"
              href={buildPresetPath(preset.slug)}
            >
              Open preset
              <ArrowRight className="size-4" />
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
