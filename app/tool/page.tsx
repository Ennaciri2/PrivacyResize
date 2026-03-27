import { LockKeyhole, Sparkles, Zap } from "lucide-react";

import { AdPlaceholder } from "@/components/ad-placeholder";
import { BrandBadge } from "@/components/brand-badge";
import { FAQSection } from "@/components/faq-section";
import { StructuredData } from "@/components/structured-data";
import { ToolShell } from "@/components/tool-shell";
import { Card } from "@/components/ui/card";
import { buildAbsoluteUrl, buildPageMetadata, buildSoftwareApplicationSchema } from "@/lib/seo";

const toolFaq = [
  {
    question: "Can I use PrivacyResize without signing in?",
    answer:
      "Yes. The main tool works without login. Authentication only kicks in if you want to save presets or view synced usage history.",
  },
  {
    question: "What formats can I export?",
    answer: "You can export JPG, PNG, or WebP files, then bundle the full batch into a ZIP download.",
  },
  {
    question: "How do fit, fill, and crop differ?",
    answer:
      "Fit preserves the whole image inside the target box, fill auto-crops to cover the frame, and crop gives you manual framing control.",
  },
] as const;

const useCases = [
  {
    title: "Social teams",
    copy: "Prep campaign variants for Instagram, YouTube, TikTok, and LinkedIn from a single source folder.",
    icon: Sparkles,
  },
  {
    title: "Ecommerce operations",
    copy: "Normalize product images for Amazon, Shopify, Etsy, and internal catalog cleanup without extra friction.",
    icon: Zap,
  },
  {
    title: "Privacy-sensitive workflows",
    copy: "Handle routine resize jobs without pushing source images to a backend just to get a new file size.",
    icon: LockKeyhole,
  },
] as const;

export const metadata = buildPageMetadata({
  title: "Image Resizer Tool",
  description:
    "Resize, crop, compress, and batch export images directly in your browser with PrivacyResize.",
  path: "/tool",
  keywords: ["image resizer tool", "resize image without upload", "batch image zip export"],
});

export default function ToolPage() {
  return (
    <>
      <StructuredData data={buildSoftwareApplicationSchema(buildAbsoluteUrl("/tool"))} />

      <section className="section-shell space-y-8 py-16">
        <div className="max-w-3xl space-y-4">
          <BrandBadge icon={<LockKeyhole className="size-3.5 text-accent" />}>Tool-first workflow</BrandBadge>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Resize image batches locally and export a ZIP without the usual friction
          </h1>
          <p className="text-base leading-8 text-foreground/68">
            PrivacyResize keeps the core workflow in the browser: upload, crop, compress, convert, and export without
            routing source images to a backend by default.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {["No login required", "On-device by default", "Built for repeat use"].map((item) => (
              <span
                className="rounded-full border border-border bg-white/84 px-4 py-2 text-sm font-medium text-foreground/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.82)]"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <ToolShell sourceLabel="main-tool" />
      </section>

      <AdPlaceholder label="Tool page lower content" />

      <section className="section-shell space-y-8 py-16">
        <div className="space-y-3">
          <p className="section-kicker">Use cases</p>
          <h2 className="max-w-3xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Built for the image work teams repeat every week
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {useCases.map((useCase) => {
            const Icon = useCase.icon;

            return (
              <Card className="rounded-[1.7rem] p-6" key={useCase.title}>
                <div className="space-y-4">
                  <div className="inline-flex rounded-[1.2rem] bg-[linear-gradient(135deg,rgba(18,122,107,0.14),rgba(19,214,215,0.18))] p-3 text-brand-navy">
                    <Icon className="size-5" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-foreground">{useCase.title}</h2>
                    <p className="text-sm leading-7 text-foreground/66">{useCase.copy}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <FAQSection eyebrow="Tool FAQ" items={[...toolFaq]} title="How the in-browser workflow works" />
    </>
  );
}
