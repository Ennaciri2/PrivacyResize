import type { SeoPreset } from "@/types";

import { Card } from "@/components/ui/card";

interface SeoContentBlockProps {
  intro: string;
  label: string;
  preset: Pick<SeoPreset, "bestFor" | "steps" | "useCase" | "width" | "height">;
}

export function SeoContentBlock({ intro, label, preset }: SeoContentBlockProps) {
  return (
    <section className="section-shell space-y-6 py-12">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{label}</p>
        <div className="prose-copy max-w-3xl space-y-3 text-base">
          <p>{intro}</p>
          <p>{preset.useCase}</p>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <Card className="space-y-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">How to use it</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
              Resize for {preset.width} x {preset.height}
            </h2>
          </div>
          <ol className="space-y-3 text-sm leading-7 text-foreground/72">
            {preset.steps.map((step, index) => (
              <li className="flex gap-3" key={step}>
                <span className="mt-1 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </Card>
        <Card className="space-y-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Best for</p>
            <p className="mt-3 text-base leading-7 text-foreground/72">{preset.bestFor}</p>
          </div>
          <div className="rounded-[1.25rem] border border-border bg-white/80 p-4">
            <p className="text-sm text-foreground/64">Exact canvas</p>
            <p className="mt-2 text-2xl font-semibold text-foreground">
              {preset.width} x {preset.height}
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}
