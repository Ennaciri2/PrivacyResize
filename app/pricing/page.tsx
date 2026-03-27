import { Coins, Rocket, ShieldCheck } from "lucide-react";

import Link from "next/link";

import { BrandBadge } from "@/components/brand-badge";
import { Card } from "@/components/ui/card";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Pricing",
  description: "PrivacyResize is free to use today, with room for future premium workflow features.",
  path: "/pricing",
});

const pricingNotes = [
  {
    title: "Free today",
    copy: "The launch version gives users the core workflow immediately: local image resizing, presets, and ZIP export.",
    icon: Coins,
  },
  {
    title: "Premium-ready foundation",
    copy: "The product structure can expand into branded workspaces, advanced exports, and team features later.",
    icon: Rocket,
  },
  {
    title: "Trust remains central",
    copy: "Even future upgrades should preserve the product’s privacy-first posture and clear local-first messaging.",
    icon: ShieldCheck,
  },
] as const;

export default function PricingPage() {
  return (
    <section className="section-shell space-y-10 py-16">
      <div className="max-w-3xl space-y-4">
        <BrandBadge icon={<Coins className="size-3.5 text-accent" />}>Pricing</BrandBadge>
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Free now, with a product structure ready for future premium layers
        </h1>
        <p className="text-base leading-8 text-foreground/68">
          The launch version is free and focused on proving the core workflow: privacy-first resizing, real preset
          pages, and optional saved presets when you want them.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {pricingNotes.map((note) => {
          const Icon = note.icon;

          return (
            <Card className="rounded-[1.7rem] p-6" key={note.title}>
              <div className="space-y-4">
                <div className="inline-flex rounded-[1.2rem] bg-[linear-gradient(135deg,rgba(18,122,107,0.14),rgba(19,214,215,0.18))] p-3 text-brand-navy">
                  <Icon className="size-5" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-foreground">{note.title}</h2>
                  <p className="text-sm leading-7 text-foreground/66">{note.copy}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      <Card className="flex flex-col gap-5 rounded-[2rem] p-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p className="section-kicker">Current plan</p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">Free</h2>
          <p className="max-w-2xl text-sm leading-7 text-foreground/66">
            Start with the complete local-first workflow and expand only if you decide to add premium product layers.
          </p>
        </div>
        <Link
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-cta-gradient px-6 py-3 text-sm font-semibold text-white shadow-[0_22px_55px_rgba(11,45,85,0.24)] transition hover:brightness-[1.03] hover:shadow-[0_28px_68px_rgba(11,45,85,0.3)]"
          href="/tool"
        >
          Use the free plan
        </Link>
      </Card>
    </section>
  );
}
