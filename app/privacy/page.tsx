import { Database, LockKeyhole, ShieldCheck } from "lucide-react";

import { BrandBadge } from "@/components/brand-badge";
import { Card } from "@/components/ui/card";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for PrivacyResize and its local-first image processing workflow.",
  path: "/privacy",
});

const privacyCards = [
  {
    title: "What stays local",
    copy: "Standard image resizing, cropping, compression, and ZIP export happen in your browser. Original image files are not uploaded by default.",
    icon: LockKeyhole,
  },
  {
    title: "What can be stored",
    copy: "When Firebase features are enabled, the app may store preset configurations, usage metadata, favorites, and feedback submissions.",
    icon: Database,
  },
  {
    title: "What Firebase is for",
    copy: "Firebase Auth supports sign-in. Firestore stores metadata. Storage is reserved for site assets or admin demo files, not default user uploads.",
    icon: ShieldCheck,
  },
] as const;

export default function PrivacyPage() {
  return (
    <section className="section-shell space-y-10 py-16">
      <div className="max-w-3xl space-y-4">
        <BrandBadge icon={<LockKeyhole className="size-3.5 text-accent" />}>Privacy policy</BrandBadge>
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Privacy-first by design, not as an afterthought
        </h1>
        <p className="text-base leading-8 text-foreground/68">
          PrivacyResize is structured so the core resizing workflow stays on-device by default. When you enable account
          features, the app stores metadata needed for those features, not your original images.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {privacyCards.map((card) => {
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
      <Card className="prose-copy rounded-[1.9rem] p-8">
        <p>
          If you deploy this codebase yourself, you are responsible for your Firebase configuration, retention settings,
          access controls, and any legal notices required for your jurisdiction or customers.
        </p>
        <p>
          If a future feature introduces uploads or storage of source files, that behavior should be made explicit in
          product UI before users enable it.
        </p>
      </Card>
    </section>
  );
}
