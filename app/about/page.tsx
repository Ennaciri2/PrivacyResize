import { Card } from "@/components/ui/card";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "About",
  description: "Why PrivacyResize exists and why privacy-first image prep matters for modern teams.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <section className="section-shell space-y-10 py-16">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">About PrivacyResize</p>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Built for the boring-but-important image work that still slows teams down
        </h1>
        <p className="text-base leading-8 text-foreground/68">
          PrivacyResize focuses on one practical job: getting images into the right shape fast, without turning every
          resize request into a privacy tradeoff or a full design-tool session.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Privacy-first</h2>
          <p className="text-sm leading-7 text-foreground/68">
            The default workflow runs locally in the browser, so founders and teams can prep assets without pushing
            source images to a server just to resize them.
          </p>
        </Card>
        <Card className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">SEO-aware</h2>
          <p className="text-sm leading-7 text-foreground/68">
            PrivacyResize is also a content engine: each preset page is designed to target real search demand with unique
            copy, metadata, and internal links.
          </p>
        </Card>
        <Card className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Founder-practical</h2>
          <p className="text-sm leading-7 text-foreground/68">
            The codebase is organized for growth, Firebase-backed persistence, and App Hosting deployment without
            creating server upload obligations for the main use case.
          </p>
        </Card>
      </div>
    </section>
  );
}
