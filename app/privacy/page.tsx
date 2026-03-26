import { Card } from "@/components/ui/card";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for PrivacyResize and its local-first image processing workflow.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <section className="section-shell space-y-8 py-16">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Privacy policy</p>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Privacy-first by design</h1>
      </div>
      <Card className="prose-copy space-y-4">
        <p>
          PrivacyResize is designed so that standard image resizing, cropping, compression, and ZIP export happen locally
          in your browser. Your image files are not uploaded to our servers by default to complete those core actions.
        </p>
        <p>
          If you connect Firebase features, PrivacyResize may store account metadata such as saved preset configurations,
          favorite preset slugs, usage history metadata, feedback submissions, and admin-managed SEO content. These
          records do not include your original uploaded image files unless you explicitly use a future feature that
          clearly states otherwise.
        </p>
        <p>
          Firebase Auth supports Google sign-in and anonymous guest sessions for persistence features. Firestore is used
          for metadata only. Firebase Storage is reserved for optional site assets or admin demo files, not for default
          user uploads.
        </p>
        <p>
          You are responsible for setting your own Firebase project, access controls, retention settings, and legal
          notices when you deploy this codebase.
        </p>
      </Card>
    </section>
  );
}
