import { LockKeyhole, Sparkles, Zap } from "lucide-react";

import { BrandBadge } from "@/components/brand-badge";
import { BrandMark } from "@/components/brand-mark";
import { BrandWordmark } from "@/components/brand-wordmark";
import { CTAButton } from "@/components/cta-button";
import { HOME_STATS, SITE_TAGLINE } from "@/data/site";

const trustBullets = [
  "Your images never leave your device by default",
  "Bulk export as ZIP in one pass",
  "No login required to start",
] as const;

export function HeroSection() {
  return (
    <section className="noise-mask relative overflow-hidden border-b border-border/70 py-14 sm:py-20">
      <div className="hero-grid absolute inset-0 opacity-60" />
      <div className="section-shell relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="fade-in-up space-y-8">
          <BrandBadge icon={<LockKeyhole className="size-3.5 text-accent" />}>
            Privacy-first image workflow
          </BrandBadge>
          <div className="space-y-5">
            <h1 className="max-w-4xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[4.35rem] lg:leading-[0.94]">
              Resize whole image batches in seconds. No upload by default.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-foreground/72">
              {SITE_TAGLINE} Built for creators, marketers, ecommerce sellers, and social teams who need clean outputs
              fast without handing source files to a third-party service.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <CTAButton href="#tool" showArrow>
              Start resizing now
            </CTAButton>
            <CTAButton href="/presets" variant="secondary">
              Explore presets
            </CTAButton>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {trustBullets.map((item) => (
              <span
                className="rounded-full border border-border bg-white/84 px-4 py-2 text-sm font-medium text-foreground/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.82)]"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {HOME_STATS.map((item) => (
              <div className="premium-panel rounded-[1.5rem] px-5 py-4" key={item.label}>
                <p className="text-2xl font-semibold text-brand-navy">{item.value}</p>
                <p className="mt-1 text-sm text-foreground/62">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="fade-in-up rounded-[2rem] border border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.93),rgba(255,255,255,0.8))] p-5 shadow-[0_26px_90px_rgba(11,45,85,0.14)] sm:p-7">
          <div className="rounded-[1.6rem] bg-[linear-gradient(160deg,rgba(11,45,85,0.98),rgba(18,122,107,0.98)_52%,rgba(20,126,239,0.92))] p-6 text-white">
            <div className="flex items-center gap-3">
              <BrandMark className="size-12" />
              <BrandWordmark subtitle="Secure by default" tone="inverse" />
            </div>
            <div className="mt-8 space-y-4">
              <div className="rounded-[1.5rem] bg-white/12 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-white/14 p-3">
                    <Zap className="size-5 text-brand-cyan" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Drop files, pick a preset, export a ZIP</p>
                    <p className="mt-1 text-sm text-white/72">The first action is obvious, the workflow stays short.</p>
                  </div>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.4rem] bg-white/10 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">Trust signal</p>
                  <p className="mt-2 text-lg font-semibold">On-device processing</p>
                  <p className="mt-2 text-sm text-white/72">Source files stay local unless you explicitly enable something else.</p>
                </div>
                <div className="rounded-[1.4rem] bg-white/10 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">Fast path</p>
                  <p className="mt-2 text-lg font-semibold">Bulk social presets</p>
                  <p className="mt-2 text-sm text-white/72">Instagram, LinkedIn, YouTube, Amazon, Shopify, TikTok, Pinterest.</p>
                </div>
              </div>
              <div className="rounded-[1.4rem] bg-white/10 p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 size-5 text-brand-cyan" />
                  <p className="text-sm leading-7 text-white/78">
                    Clear controls, strong trust cues, and conversion-focused landing pages make the product feel fast
                    before the user even uploads a first file.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
