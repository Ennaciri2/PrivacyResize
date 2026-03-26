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

export const metadata = buildPageMetadata({
  title: "Image Resizer Tool",
  description:
    "Resize, crop, compress, and batch export images directly in your browser with PrivacyResize.",
  path: "/tool",
  keywords: ["image resizer tool", "browser image compressor", "batch image zip export"],
});

export default function ToolPage() {
  return (
    <>
      <StructuredData data={buildSoftwareApplicationSchema(buildAbsoluteUrl("/tool"))} />
      <section className="section-shell space-y-8 py-16">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Main tool</p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Resize image batches locally and export a ZIP
          </h1>
          <p className="text-base leading-8 text-foreground/68">
            PrivacyResize keeps the core workflow in the browser: upload, crop, compress, convert, and export without
            routing source images to a backend by default.
          </p>
        </div>
        <ToolShell sourceLabel="main-tool" />
      </section>
      <section className="section-shell py-12">
        <Card className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Use cases</p>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Social teams</h2>
              <p className="mt-2 text-sm leading-7 text-foreground/68">
                Prep campaign variants for Instagram, YouTube, and LinkedIn from a single source folder.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Ecommerce ops</h2>
              <p className="mt-2 text-sm leading-7 text-foreground/68">
                Batch standardize product images for Amazon, Shopify, Etsy, and catalog clean-up tasks.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Agencies</h2>
              <p className="mt-2 text-sm leading-7 text-foreground/68">
                Move faster on handoff requests without passing brand assets through a disposable third-party tool.
              </p>
            </div>
          </div>
        </Card>
      </section>
      <FAQSection eyebrow="Tool FAQ" items={[...toolFaq]} title="How the in-browser workflow works" />
    </>
  );
}
