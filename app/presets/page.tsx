import Link from "next/link";

import { Card } from "@/components/ui/card";
import { exactSizePresets } from "@/data/exact-sizes";
import { seoPresets } from "@/data/seo-presets";
import { buildPageMetadata, buildPresetPath, buildSizePath } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Preset Library",
  description:
    "Browse PrivacyResize preset pages for Instagram, LinkedIn, YouTube, ecommerce marketplaces, and common exact dimensions.",
  path: "/presets",
  keywords: ["image size presets", "instagram resize presets", "exact image sizes"],
});

export default function PresetsPage() {
  return (
    <section className="section-shell space-y-12 py-16">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Preset library</p>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Browse launch-ready landing pages for social, video, and ecommerce image sizes
        </h1>
        <p className="text-base leading-8 text-foreground/68">
          Each preset page includes unique copy, exact dimensions, related links, embedded tool access, and metadata
          designed for long-tail search intent.
        </p>
      </div>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground">Platform presets</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {seoPresets.map((preset) => (
            <Link href={buildPresetPath(preset.slug)} key={preset.slug}>
              <Card className="flex h-full flex-col justify-between gap-4 transition hover:-translate-y-1 hover:border-accent/24">
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{preset.category}</p>
                  <h3 className="text-xl font-semibold text-foreground">{preset.title}</h3>
                  <p className="text-sm leading-7 text-foreground/68">{preset.metaDescription}</p>
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/48">
                  {preset.width} x {preset.height}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground">Exact-size landing pages</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {exactSizePresets.map((preset) => (
            <Link href={buildSizePath(preset.dimensions)} key={preset.dimensions}>
              <Card className="space-y-3 transition hover:-translate-y-1 hover:border-accent/24">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Exact size</p>
                <h3 className="text-xl font-semibold text-foreground">{preset.dimensions}</h3>
                <p className="text-sm leading-7 text-foreground/68">{preset.useCase}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
