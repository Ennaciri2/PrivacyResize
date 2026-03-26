import Link from "next/link";

import { Card } from "@/components/ui/card";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Pricing",
  description: "PrivacyResize is free to use today, with room for future premium workflow features.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <section className="section-shell space-y-10 py-16">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Pricing</p>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Free now, structured for premium later
        </h1>
        <p className="text-base leading-8 text-foreground/68">
          The launch version is free and built to prove the core workflow: privacy-first resizing, real preset pages,
          and account-based saved presets when you want them.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Card className="space-y-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Current plan</p>
            <h2 className="mt-2 text-3xl font-semibold text-foreground">Free</h2>
          </div>
          <ul className="space-y-3 text-sm leading-7 text-foreground/68">
            <li>Local image resizing, cropping, compression, and batch ZIP export</li>
            <li>Launch preset library for social, video, and marketplace formats</li>
            <li>Optional Google sign-in or anonymous guest mode for saved presets</li>
            <li>Dashboard with saved preset and usage history scaffolding</li>
          </ul>
          <Link
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-strong"
            href="/tool"
          >
            Use the free plan
          </Link>
        </Card>
        <Card className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Premium-ready structure</p>
          <p className="text-sm leading-7 text-foreground/68">
            The product and codebase are already set up for future premium upgrades like branded workspace settings,
            advanced export templates, team sharing, or gated Storage-backed asset packs.
          </p>
        </Card>
      </div>
    </section>
  );
}
