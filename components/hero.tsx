import Link from "next/link";
import { ArrowRight, LockKeyhole, Sparkles, Zap } from "lucide-react";

import { HOME_STATS, SITE_TAGLINE } from "@/data/site";

export function Hero() {
  return (
    <section className="noise-mask relative overflow-hidden border-b border-border/70 py-16 sm:py-24">
      <div className="hero-grid absolute inset-0 opacity-60" />
      <div className="section-shell relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="fade-in-up space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            <LockKeyhole className="size-3.5" />
            Privacy-first browser tool
          </div>
          <div className="space-y-5">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              The privacy-first online image resizer for social, ecommerce, and batch exports.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-foreground/72">{SITE_TAGLINE}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_20px_50px_rgba(18,122,107,0.24)] transition hover:bg-accent-strong"
              href="/tool"
            >
              Open the tool
              <ArrowRight className="ml-2 size-4" />
            </Link>
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-border-strong bg-white/80 px-6 py-3 text-sm font-semibold text-foreground transition hover:border-accent/30"
              href="/presets"
            >
              Explore presets
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {HOME_STATS.map((item) => (
              <div className="glass-card rounded-[1.4rem] p-4" key={item.label}>
                <p className="text-2xl font-semibold text-foreground">{item.value}</p>
                <p className="mt-1 text-sm text-foreground/62">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card fade-in-up rounded-[2rem] p-6 sm:p-8">
          <div className="grid gap-4">
            <div className="rounded-[1.6rem] border border-border bg-white/80 p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-2xl bg-accent-soft p-3 text-accent">
                  <Zap className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Batch exports</p>
                  <p className="text-sm text-foreground/58">Resize multiple files and export a ZIP in one pass.</p>
                </div>
              </div>
              <div className="h-2 rounded-full bg-accent-soft">
                <div className="h-2 w-[76%] rounded-full bg-accent" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.6rem] border border-border bg-white/80 p-5">
                <p className="mb-2 text-sm font-semibold text-foreground">Social presets</p>
                <p className="text-sm leading-6 text-foreground/62">
                  Instagram, LinkedIn, YouTube, TikTok, Pinterest, and exact-size landing pages.
                </p>
              </div>
              <div className="rounded-[1.6rem] border border-border bg-white/80 p-5">
                <p className="mb-2 text-sm font-semibold text-foreground">Protected originals</p>
                <p className="text-sm leading-6 text-foreground/62">
                  Standard resizing stays on-device. No server upload is required for the core workflow.
                </p>
              </div>
            </div>
            <div className="rounded-[1.6rem] border border-accent/18 bg-accent-soft/70 p-5">
              <div className="flex items-start gap-3">
                <Sparkles className="mt-1 size-5 text-accent" />
                <p className="text-sm leading-6 text-foreground/72">
                  Built for founders, creators, agencies, and ecommerce teams who need a reliable image prep tool with
                  SEO-ready landing pages around it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
