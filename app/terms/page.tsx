import { BadgeCheck, Gauge, ShieldAlert } from "lucide-react";

import { BrandBadge } from "@/components/brand-badge";
import { Card } from "@/components/ui/card";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Terms",
  description: "Terms of use for PrivacyResize.",
  path: "/terms",
});

const termsCards = [
  {
    title: "Use the product lawfully",
    copy: "You are responsible for the content you process and for complying with the rules of any platform where you publish final assets.",
    icon: BadgeCheck,
  },
  {
    title: "Launch-stage product",
    copy: "The product is currently free. Features, pricing, storage policies, and integrations may change as the roadmap evolves.",
    icon: Gauge,
  },
  {
    title: "No abuse",
    copy: "Do not use PrivacyResize to distribute unlawful material, violate third-party rights, or abuse the Firebase infrastructure behind the app.",
    icon: ShieldAlert,
  },
] as const;

export default function TermsPage() {
  return (
    <section className="section-shell space-y-10 py-16">
      <div className="max-w-3xl space-y-4">
        <BrandBadge icon={<BadgeCheck className="size-3.5 text-accent" />}>Terms</BrandBadge>
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Simple terms for a focused launch product
        </h1>
        <p className="text-base leading-8 text-foreground/68">
          PrivacyResize is designed for resizing, cropping, compressing, and exporting images. These terms are meant
          to stay readable while still covering the essential boundaries of use.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {termsCards.map((card) => {
          const Icon = card.icon;

          return (
            <Card className="rounded-[1.7rem] p-6" key={card.title}>
              <div className="space-y-4">
                <div className="inline-flex rounded-[1.2rem] bg-[linear-gradient(135deg,rgba(18,122,107,0.14),rgba(19,214,215,0.18))] p-3 text-brand-navy">
                  <Icon className="size-5" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-foreground">{card.title}</h2>
                  <p className="text-sm leading-7 text-foreground/66">{card.copy}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
