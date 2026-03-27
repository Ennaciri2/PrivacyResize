import { LockKeyhole, Search, Wrench } from "lucide-react";

import { BrandBadge } from "@/components/brand-badge";
import { CTAButton } from "@/components/cta-button";
import { Card } from "@/components/ui/card";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "About",
  description: "Why PrivacyResize exists and why privacy-first image prep matters for modern teams.",
  path: "/about",
});

const pillars = [
  {
    title: "Privacy-first by default",
    copy: "The default workflow runs locally in the browser, so routine image prep does not start with a server upload.",
    icon: LockKeyhole,
  },
  {
    title: "Search-aware distribution",
    copy: "Preset pages are structured to match real search intent with unique content, metadata, and internal linking.",
    icon: Search,
  },
  {
    title: "Practical product scope",
    copy: "PrivacyResize focuses on the image work teams repeat often, then removes friction from that exact path.",
    icon: Wrench,
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <section className="section-shell space-y-10 py-16">
        <div className="max-w-3xl space-y-4">
          <BrandBadge icon={<LockKeyhole className="size-3.5 text-accent" />}>About PrivacyResize</BrandBadge>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Built for the image work teams need constantly, but never want to overcomplicate
          </h1>
          <p className="text-base leading-8 text-foreground/68">
            PrivacyResize focuses on one practical job: getting images into the right shape fast, without turning every
            resize request into a privacy compromise or a full editing session.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <Card className="rounded-[1.7rem] p-6" key={pillar.title}>
                <div className="space-y-4">
                  <div className="inline-flex rounded-[1.2rem] bg-[linear-gradient(135deg,rgba(18,122,107,0.14),rgba(19,214,215,0.18))] p-3 text-brand-navy">
                    <Icon className="size-5" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-foreground">{pillar.title}</h2>
                    <p className="text-sm leading-7 text-foreground/66">{pillar.copy}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="section-shell py-16">
        <Card className="flex flex-col gap-5 rounded-[2rem] p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <p className="section-kicker">See the product in action</p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground">
              Open the tool and test the workflow on a real batch
            </h2>
          </div>
          <CTAButton href="/tool" showArrow>
            Launch PrivacyResize
          </CTAButton>
        </Card>
      </section>
    </>
  );
}
