import { FileStack, PenTool, Search } from "lucide-react";

import { BrandBadge } from "@/components/brand-badge";
import { Card } from "@/components/ui/card";
import { FUTURE_BLOG_TOPICS } from "@/data/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Blog",
  description: "Editorial scaffold for future PrivacyResize guides and image sizing articles.",
  path: "/blog",
});

const blogNotes = [
  {
    title: "No thin placeholder posts",
    copy: "The launch keeps editorial intentionally light until there is enough depth to publish useful articles.",
    icon: FileStack,
  },
  {
    title: "Built for future search demand",
    copy: "The structure is ready for high-intent guides around image sizes, compression workflows, and channel-specific prep.",
    icon: Search,
  },
  {
    title: "Connected to the product",
    copy: "Future articles can link directly into relevant preset pages and the live tool to keep content actionable.",
    icon: PenTool,
  },
] as const;

export default function BlogPage() {
  return (
    <section className="section-shell space-y-10 py-16">
      <div className="max-w-3xl space-y-4">
        <BrandBadge icon={<FileStack className="size-3.5 text-accent" />}>Blog scaffold</BrandBadge>
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Editorial space for future image sizing and workflow guides
        </h1>
        <p className="text-base leading-8 text-foreground/68">
          PrivacyResize ships with a real blog index, a Firestore draft model, and room for future editorial SEO
          without publishing shallow placeholder articles on day one.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {blogNotes.map((note) => {
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
      <div className="grid gap-4 md:grid-cols-2">
        {FUTURE_BLOG_TOPICS.map((topic) => (
          <Card className="rounded-[1.7rem] p-6" key={topic}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Planned article</p>
            <h2 className="mt-3 text-xl font-semibold text-foreground">{topic}</h2>
            <p className="mt-3 text-sm leading-7 text-foreground/68">
              This topic is a strong candidate for future editorial expansion once the blog moves beyond scaffold mode.
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
