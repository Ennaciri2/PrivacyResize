import { LockKeyhole, ShieldCheck, Sparkles, UserRoundCheck } from "lucide-react";

import { Card } from "@/components/ui/card";

const trustCards = [
  {
    title: "No default upload path",
    copy: "Standard resizing, cropping, compression, and ZIP export happen on-device in the browser.",
    icon: LockKeyhole,
  },
  {
    title: "Built for fast first use",
    copy: "Users see the upload action immediately and can try the tool without creating an account.",
    icon: Sparkles,
  },
  {
    title: "Sync only what matters",
    copy: "When Firebase is enabled, the app stores presets and usage metadata, not source images.",
    icon: ShieldCheck,
  },
  {
    title: "Trusted by repeat workflows",
    copy: "Presets, exact sizes, and recent configurations help teams come back without retraining themselves.",
    icon: UserRoundCheck,
  },
] as const;

export function TrustSection() {
  return (
    <section className="section-shell space-y-8 py-18">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl space-y-3">
          <p className="section-kicker">Why users trust us</p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Privacy cues are explicit. The workflow feels safe before the first click.
          </h2>
          <p className="text-base leading-8 text-foreground/68">
            The interface is designed to remove doubt fast: local-first processing, visible trust microcopy, and
            sharply separated product actions so users can start immediately.
          </p>
        </div>
        <div className="rounded-full border border-border bg-white/80 px-4 py-2 text-sm font-medium text-brand-navy shadow-[inset_0_1px_0_rgba(255,255,255,0.82)]">
          Your images never leave your device by default
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {trustCards.map((card) => {
          const Icon = card.icon;

          return (
            <Card className="spotlight-outline space-y-4 rounded-[1.65rem] p-6" key={card.title}>
              <div className="inline-flex rounded-[1.2rem] bg-[linear-gradient(135deg,rgba(18,122,107,0.16),rgba(19,214,215,0.18))] p-3 text-brand-navy">
                <Icon className="size-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>
                <p className="text-sm leading-7 text-foreground/66">{card.copy}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
