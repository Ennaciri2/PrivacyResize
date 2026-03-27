import Link from "next/link";
import { Grid2x2Plus, Sparkles } from "lucide-react";

import { BrandBadge } from "@/components/brand-badge";
import { CTAButton } from "@/components/cta-button";
import { PresetsGrid } from "@/components/presets-grid";
import { Card } from "@/components/ui/card";
import { exactSizePresets } from "@/data/exact-sizes";
import { seoPresets } from "@/data/seo-presets";
import { buildPageMetadata, buildSizePath } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Preset Library",
  description:
    "Browse PrivacyResize preset pages for Instagram, LinkedIn, YouTube, ecommerce marketplaces, and common exact dimensions.",
  path: "/presets",
  keywords: ["image size presets", "instagram resize presets", "exact image sizes"],
});

export default function PresetsPage() {
  return (
    <>
      <section className="section-shell space-y-8 py-16">
        <div className="max-w-3xl space-y-4">
          <BrandBadge icon={<Grid2x2Plus className="size-3.5 text-accent" />}>Preset library</BrandBadge>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Preset pages for social, video, marketplaces, and exact image dimensions
          </h1>
          <p className="text-base leading-8 text-foreground/68">
            Each preset page is built to be useful on its own: exact dimensions, focused copy, internal links, and a
            configured version of the tool so users can act immediately.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="rounded-[1.7rem] p-6">
            <p className="text-3xl font-semibold text-brand-navy">{seoPresets.length}+</p>
            <p className="mt-2 text-sm leading-7 text-foreground/66">Launch-ready preset landing pages</p>
          </Card>
          <Card className="rounded-[1.7rem] p-6">
            <p className="text-3xl font-semibold text-brand-navy">{exactSizePresets.length}</p>
            <p className="mt-2 text-sm leading-7 text-foreground/66">Common exact-size routes for search-driven use</p>
          </Card>
          <Card className="rounded-[1.7rem] p-6">
            <p className="text-3xl font-semibold text-brand-navy">1 click</p>
            <p className="mt-2 text-sm leading-7 text-foreground/66">From preset page to configured tool state</p>
          </Card>
        </div>
      </section>

      <PresetsGrid
        description="Useful presets reduce decision time. They also make it easier for users to trust that the output will match the platform they are targeting."
        eyebrow="Platform presets"
        items={seoPresets}
        title="Clickable presets for creators, marketers, and sellers"
      />

      <section className="section-shell space-y-8 py-16">
        <div className="space-y-3">
          <BrandBadge icon={<Sparkles className="size-3.5 text-accent" />}>Exact sizes</BrandBadge>
          <h2 className="max-w-3xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Exact dimension pages for workflows that start with width and height
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {exactSizePresets.map((preset) => (
            <Link href={buildSizePath(preset.dimensions)} key={preset.dimensions}>
              <Card className="group h-full rounded-[1.6rem] p-5 transition hover:-translate-y-1 hover:border-brand-cyan/40 hover:shadow-[0_24px_60px_rgba(11,45,85,0.12)]">
                <div className="space-y-4">
                  <span className="rounded-full bg-accent-soft px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-navy">
                    Exact size
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-brand-navy">
                      {preset.dimensions}
                    </h3>
                    <p className="text-sm leading-7 text-foreground/66">{preset.useCase}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-shell py-16">
        <Card className="flex flex-col gap-5 rounded-[2rem] p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <p className="section-kicker">Ready to use one now?</p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground">
              Open the tool and start from a preset instead of a blank setup
            </h2>
          </div>
          <CTAButton href="/tool" showArrow>
            Open the tool
          </CTAButton>
        </Card>
      </section>
    </>
  );
}
