import Link from "next/link";

import { FAQSection } from "@/components/faq-section";
import { Hero } from "@/components/hero";
import { StructuredData } from "@/components/structured-data";
import { Card } from "@/components/ui/card";
import { FEATURED_PRESET_SLUGS, HOME_FAQ, PRODUCT_PILLARS, SITE_DESCRIPTION } from "@/data/site";
import { seoPresets } from "@/data/seo-presets";
import {
  buildAbsoluteUrl,
  buildPageMetadata,
  buildPresetPath,
  buildSoftwareApplicationSchema,
} from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "PrivacyResize | Secure Image Resizer",
  description: SITE_DESCRIPTION,
  path: "/",
  keywords: [
    "privacy-first image resizer",
    "online image resizer",
    "instagram image resizer",
    "local image compressor",
    "browser image crop tool",
  ],
});

export default function HomePage() {
  const featuredPresets = seoPresets.filter((preset) => FEATURED_PRESET_SLUGS.includes(preset.slug as never));

  return (
    <>
      <StructuredData data={buildSoftwareApplicationSchema(buildAbsoluteUrl("/"))} />
      <Hero />
      <section className="section-shell space-y-8 py-16">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Why teams use it</p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            A practical image workflow, not another bloated editor
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {PRODUCT_PILLARS.map((pillar) => (
            <Card className="space-y-3" key={pillar.title}>
              <h3 className="text-xl font-semibold text-foreground">{pillar.title}</h3>
              <p className="text-sm leading-7 text-foreground/68">{pillar.copy}</p>
            </Card>
          ))}
        </div>
      </section>
      <section className="section-shell space-y-8 py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Featured presets</p>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Launch-ready landing pages around real workflows
            </h2>
          </div>
          <Link className="text-sm font-semibold text-accent transition hover:text-accent-strong" href="/presets">
            View all preset pages
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {featuredPresets.map((preset) => (
            <Link
              className="glass-card flex flex-col justify-between rounded-[1.5rem] border border-border p-5 transition hover:-translate-y-1 hover:border-accent/24"
              href={buildPresetPath(preset.slug)}
              key={preset.slug}
            >
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{preset.category}</p>
                <h3 className="text-lg font-semibold text-foreground">{preset.shortLabel}</h3>
                <p className="text-sm leading-7 text-foreground/66">{preset.metaDescription}</p>
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/45">
                {preset.width} x {preset.height}
              </p>
            </Link>
          ))}
        </div>
      </section>
      <section className="section-shell py-16">
        <Card className="grid gap-6 rounded-[2rem] p-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Local-first promise</p>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Privacy is a feature, not a buried sentence in the footer.
            </h2>
            <p className="text-sm leading-7 text-foreground/68">
              PrivacyResize is built for routine image prep, which means the default workflow should not require a server
              hop. Upload, crop, resize, compress, and export without sending originals anywhere first.
            </p>
          </div>
          <div className="rounded-[1.6rem] border border-border bg-white/80 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">What gets stored</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-foreground/68">
              <li>Saved preset configurations when you choose to sync them</li>
              <li>Usage metadata, not source image files</li>
              <li>Admin-managed SEO content and demo assets only</li>
            </ul>
          </div>
        </Card>
      </section>
      <FAQSection eyebrow="FAQ" items={HOME_FAQ} title="Questions founders and creators ask before switching tools" />
      <section className="section-shell py-16">
        <Card className="flex flex-col items-start gap-6 rounded-[2rem] p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Start now</p>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Open the tool and resize your first batch in minutes
            </h2>
          </div>
          <Link
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-strong"
            href="/tool"
          >
            Launch PrivacyResize
          </Link>
        </Card>
      </section>
    </>
  );
}
