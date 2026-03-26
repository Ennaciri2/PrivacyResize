import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EmbeddedTool } from "@/components/embedded-tool";
import { FAQSection } from "@/components/faq-section";
import { RelatedPresets } from "@/components/related-presets";
import { SeoContentBlock } from "@/components/seo-content-block";
import { StructuredData } from "@/components/structured-data";
import { exactSizePresets } from "@/data/exact-sizes";
import { buildExactSizePreset, getRelatedPresets } from "@/lib/content";
import {
  buildAbsoluteUrl,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildPageMetadata,
  buildSizePath,
  buildSoftwareApplicationSchema,
} from "@/lib/seo";

export function generateStaticParams() {
  return exactSizePresets.map((preset) => ({ dimensions: preset.dimensions }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ dimensions: string }>;
}): Promise<Metadata> {
  const { dimensions } = await params;
  const preset = buildExactSizePreset(dimensions);

  if (!preset) {
    return {};
  }

  return buildPageMetadata({
    title: preset.title,
    description: preset.metaDescription,
    path: buildSizePath(dimensions),
    keywords: [preset.dimensions, "resize image exact size", "custom image dimensions"],
  });
}

export default async function ExactSizePage({
  params,
}: {
  params: Promise<{ dimensions: string }>;
}) {
  const { dimensions } = await params;
  const preset = buildExactSizePreset(dimensions);

  if (!preset) {
    notFound();
  }

  const faq = [
    {
      question: `What does ${preset.dimensions} mean?`,
      answer: `It means the final export is exactly ${preset.width} pixels wide by ${preset.height} pixels tall.`,
    },
    {
      question: "Can I crop manually before exporting this exact size?",
      answer:
        "Yes. Switch the main tool to crop mode to control the framing of the active image before you export.",
    },
    {
      question: "Will my files be uploaded to resize them?",
      answer:
        "No. The default exact-size workflow runs in the browser, so your source image does not need to be uploaded to a backend.",
    },
  ];
  const relatedPresets = getRelatedPresets(preset.relatedSlugs);
  const path = buildSizePath(preset.dimensions);

  return (
    <>
      <StructuredData
        data={[
          buildSoftwareApplicationSchema(buildAbsoluteUrl(path)),
          buildFaqSchema(faq),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Presets", path: "/presets" },
            { name: preset.dimensions, path },
          ]),
        ]}
      />
      <section className="section-shell space-y-6 py-16">
        <div className="max-w-4xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Exact size</p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{preset.title}</h1>
          <p className="text-base leading-8 text-foreground/68">{preset.metaDescription}</p>
        </div>
        <EmbeddedTool defaultDimensions={preset.dimensions} sourceLabel={`size-${preset.dimensions}`} />
      </section>
      <SeoContentBlock
        intro={preset.intro}
        label="Exact-size workflow"
        preset={{
          bestFor: preset.useCase,
          steps: [
            "Upload your images into the in-browser workflow.",
            `Keep the exact-size target set to ${preset.dimensions} and adjust crop or quality if needed.`,
            "Export one image or a full batch ZIP without leaving the page.",
          ],
          useCase: preset.useCase,
          width: preset.width,
          height: preset.height,
        }}
      />
      <FAQSection eyebrow="FAQ" items={faq} title={`Questions about resizing to ${preset.dimensions}`} />
      <RelatedPresets items={relatedPresets} />
    </>
  );
}
