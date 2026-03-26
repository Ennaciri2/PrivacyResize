import { Card } from "@/components/ui/card";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Terms",
  description: "Terms of use for PrivacyResize.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <section className="section-shell space-y-8 py-16">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Terms</p>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Simple launch terms</h1>
      </div>
      <Card className="prose-copy space-y-4">
        <p>
          PrivacyResize is provided as a software tool for resizing, cropping, compressing, and exporting images. You are
          responsible for the content you process and for complying with the terms of any platform where you publish the
          final assets.
        </p>
        <p>
          The product is offered on an as-is basis during the free launch period. Features, storage policies, pricing,
          and supported integrations may change as the product evolves.
        </p>
        <p>
          You may not use PrivacyResize to process or distribute unlawful content, violate third-party rights, or attempt
          to abuse the service, its Firebase backend, or any deployment infrastructure built around this codebase.
        </p>
      </Card>
    </section>
  );
}
