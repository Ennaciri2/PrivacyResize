import { Card } from "@/components/ui/card";
import { FUTURE_BLOG_TOPICS } from "@/data/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Blog",
  description: "Editorial scaffold for future PrivacyResize guides and image sizing articles.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <section className="section-shell space-y-10 py-16">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Blog scaffold</p>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Editorial space for future image sizing and workflow guides
        </h1>
        <p className="text-base leading-8 text-foreground/68">
          This launch keeps the blog intentionally light: a real index page, a Firestore draft collection scaffold, and
          clear room for future editorial SEO without shipping thin placeholder articles.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {FUTURE_BLOG_TOPICS.map((topic) => (
          <Card className="space-y-3" key={topic}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Planned article</p>
            <h2 className="text-xl font-semibold text-foreground">{topic}</h2>
            <p className="text-sm leading-7 text-foreground/68">
              The blog scaffold is ready for future editorial publishing once you want to expand content beyond preset
              landing pages.
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
