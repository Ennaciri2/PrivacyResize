import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AdPlaceholder } from "@/components/ad-placeholder";
import { EmbeddedTool } from "@/components/embedded-tool";
import { FAQSection } from "@/components/faq-section";
import { RelatedPresets } from "@/components/related-presets";
import { SeoContentBlock } from "@/components/seo-content-block";
import { StructuredData } from "@/components/structured-data";
import { seoPresets } from "@/data/seo-presets";
import { getRelatedPresets, resolveSeoPreset } from "@/lib/content";
import {
  buildAbsoluteUrl,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildPageMetadata,
  buildPresetPath,
  buildSoftwareApplicationSchema,
} from "@/lib/seo";

export function generateStaticParams() {
  return seoPresets.map((preset) => ({ slug: preset.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const preset = await resolveSeoPreset(slug);

  if (!preset) {
    return {};
  }

  return buildPageMetadata({
    title: preset.metaTitle,
    description: preset.metaDescription,
    path: buildPresetPath(slug),
    keywords: preset.tags,
  });
}

export default async function PresetDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const preset = await resolveSeoPreset(slug);

  if (!preset) {
    notFound();
  }

  const relatedPresets = getRelatedPresets(preset.relatedSlugs);
  const pagePath = buildPresetPath(preset.slug);

  return (
    <>
      <StructuredData
        data={[
          buildSoftwareApplicationSchema(buildAbsoluteUrl(pagePath)),
          buildFaqSchema(preset.faq),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Presets", path: "/presets" },
            { name: preset.shortLabel, path: pagePath },
          ]),
        ]}
      />
      <section className="section-shell space-y-6 py-16">
        <div className="max-w-4xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{preset.category}</p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{preset.h1}</h1>
          <p className="text-base leading-8 text-foreground/68">{preset.metaDescription}</p>
        </div>
        <EmbeddedTool defaultPresetSlug={preset.slug} sourceLabel={`preset-${preset.slug}`} />
      </section>
      <AdPlaceholder label="Preset page rail" />
      <SeoContentBlock intro={preset.intro} label="Preset details" preset={preset} />
      <FAQSection eyebrow="FAQ" items={preset.faq} title={`Questions about the ${preset.shortLabel} preset`} />
      <RelatedPresets items={relatedPresets} />
    </>
  );
}
