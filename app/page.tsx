import { LockKeyhole, Sparkles, Zap } from "lucide-react";

import { AdPlaceholder } from "@/components/ad-placeholder";
import { BrandBadge } from "@/components/brand-badge";
import { CTAButton } from "@/components/cta-button";
import { FAQSection } from "@/components/faq-section";
import { Hero } from "@/components/hero";
import { PresetsGrid } from "@/components/presets-grid";
import { StructuredData } from "@/components/structured-data";
import { ToolShell } from "@/components/tool-shell";
import { TrustSection } from "@/components/trust-section";
import { Card } from "@/components/ui/card";
import { FEATURED_PRESET_SLUGS, HOME_FAQ, PRODUCT_PILLARS } from "@/data/site";
import { seoPresets } from "@/data/seo-presets";
import {
  buildAbsoluteUrl,
  buildPageMetadata,
  buildSoftwareApplicationSchema,
} from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "PrivacyResize – Free Image Resizer (No Upload, 100% Private)",
  description:
    "Resize images instantly with PrivacyResize. Bulk image resizer for Instagram, YouTube, Amazon, and more. No upload required, 100% private and fast.",
  path: "/",
  keywords: [
    "privacy-first image resizer",
    "resize image without upload",
    "online image resizer",
    "local image compressor",
    "batch image resizer",
  ],
});

const workflowCards = [
  {
    title: "Creators move faster",
    copy: "Prep Instagram posts, Stories, thumbnails, and banners from one source folder without opening a heavier design tool.",
    icon: Sparkles,
  },
  {
    title: "Sellers keep assets consistent",
    copy: "Standardize Amazon, Shopify, and marketplace product images in bulk while keeping the workflow predictable.",
    icon: Zap,
  },
  {
    title: "Privacy stays explicit",
    copy: "The product says what happens to your files right where decisions are made, not buried in a footer disclaimer.",
    icon: LockKeyhole,
  },
] as const;

export default function HomePage() {
  const featuredPresets = seoPresets.filter((preset) => FEATURED_PRESET_SLUGS.includes(preset.slug as never));

  return (
    <>
      <StructuredData data={buildSoftwareApplicationSchema(buildAbsoluteUrl("/"))} />
      <Hero />

      <section className="section-shell space-y-8 py-16" id="tool">
        <div className="max-w-3xl space-y-4">
          <BrandBadge icon={<Zap className="size-3.5 text-accent" />}>Start in seconds</BrandBadge>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            The upload action is immediate. The privacy promise is visible. The export path is obvious.
          </h2>
          <p className="text-base leading-8 text-foreground/68">
            PrivacyResize is built to remove hesitation fast. Drop images, pick a preset or exact size, process them
            locally, and download ready files without creating an account first.
          </p>
        </div>
        <ToolShell sourceLabel="home-embed" />
      </section>

      <AdPlaceholder label="Homepage mid-content" />

      <section className="section-shell space-y-8 py-18">
        <div className="space-y-3">
          <p className="section-kicker">Product advantages</p>
          <h2 className="max-w-3xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            A sharper SaaS workflow for everyday image preparation
          </h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {PRODUCT_PILLARS.map((pillar) => (
            <Card className="spotlight-outline space-y-4 rounded-[1.7rem] p-6" key={pillar.title}>
              <div className="inline-flex rounded-[1.2rem] bg-[linear-gradient(135deg,rgba(18,122,107,0.14),rgba(19,214,215,0.18))] px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-navy">
                Core value
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">{pillar.title}</h3>
                <p className="text-sm leading-7 text-foreground/66">{pillar.copy}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <TrustSection />

      <PresetsGrid
        description="Clickable preset pages make the value proposition concrete immediately. They also create useful entry points for long-tail search and repeat usage."
        eyebrow="Popular presets"
        items={featuredPresets}
        title="Preset pages built around real social, video, and ecommerce workflows"
      />

      <section className="section-shell space-y-8 py-18">
        <div className="space-y-3">
          <p className="section-kicker">Who it is for</p>
          <h2 className="max-w-3xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Designed for repeat work, not one-off experiments
          </h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {workflowCards.map((card) => {
            const Icon = card.icon;

            return (
              <Card className="rounded-[1.7rem] p-6" key={card.title}>
                <div className="space-y-4">
                  <div className="inline-flex rounded-[1.2rem] bg-[linear-gradient(135deg,rgba(11,45,85,0.1),rgba(20,126,239,0.16))] p-3 text-brand-navy">
                    <Icon className="size-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">{card.title}</h3>
                    <p className="text-sm leading-7 text-foreground/66">{card.copy}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <FAQSection eyebrow="FAQ" items={HOME_FAQ} title="Questions users ask before they switch tools" />

      <section className="section-shell py-18">
        <Card
          className="overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,rgba(11,45,85,0.98),rgba(18,122,107,0.94)_56%,rgba(20,126,239,0.92))] p-8 text-white sm:p-10"
          variant="plain"
        >
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/76">Launch the tool</p>
              <h2 className="max-w-3xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Make the first resize feel instant and safe
              </h2>
              <p className="max-w-2xl text-base leading-8 text-white/78">
                Start with the free workflow, test it on a real batch, and keep the upload-to-export path short enough
                that teams come back without retraining themselves.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <CTAButton href="/tool" >
                Open the tool
              </CTAButton>
                <CTAButton
                className="border-green-500/24 bg-green-500/12 text-white hover:border-green-400/40 hover:bg-green-500/18 hover:text-white"
                href="/presets"
                variant="secondary"
                >
                Browse presets
                </CTAButton>
            </div>
          </div>
        </Card>
      </section>
    </>
  );
}
