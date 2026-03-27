import Link from "next/link";

import { Card } from "@/components/ui/card";
import { buildPresetPath } from "@/lib/seo";
import type { SeoPreset } from "@/types";

interface PresetsGridProps {
  description?: string;
  eyebrow?: string;
  items: SeoPreset[];
  title: string;
}

export function PresetsGrid({ description, eyebrow, items, title }: PresetsGridProps) {
  return (
    <section className="section-shell space-y-8 py-18">
      <div className="space-y-3">
        {eyebrow ? <p className="section-kicker">{eyebrow}</p> : null}
        <h2 className="max-w-3xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h2>
        {description ? <p className="max-w-2xl text-base leading-8 text-foreground/68">{description}</p> : null}
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((preset) => (
          <Link href={buildPresetPath(preset.slug)} key={preset.slug}>
            <Card className="group h-full rounded-[1.7rem] p-5 transition hover:-translate-y-1 hover:border-brand-cyan/40 hover:shadow-[0_26px_70px_rgba(11,45,85,0.14)]">
              <div className="flex h-full flex-col justify-between gap-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-accent-soft px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-navy">
                      {preset.category}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/46">
                      {preset.width} x {preset.height}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-brand-navy">{preset.shortLabel}</h3>
                  <p className="text-sm leading-7 text-foreground/66">{preset.useCase}</p>
                </div>
                <p className="text-sm font-semibold text-accent">Use preset</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
