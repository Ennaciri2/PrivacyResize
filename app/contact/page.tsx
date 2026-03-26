import { ContactForm } from "@/components/contact-form";
import { Card } from "@/components/ui/card";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Contact",
  description: "Contact PrivacyResize for feature requests, feedback, partnerships, or deployment help.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="section-shell space-y-10 py-16">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Contact</p>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Send feedback, request a preset, or ask about the Firebase deployment flow
        </h1>
        <p className="text-base leading-8 text-foreground/68">
          The launch product is intentionally tight. If you need another preset, a premium workflow, or help deploying
          App Hosting cleanly, send a note here.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Card>
          <ContactForm />
        </Card>
        <Card className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Good requests</p>
          <ul className="space-y-3 text-sm leading-7 text-foreground/68">
            <li>New long-tail preset pages you want added to the seed library</li>
            <li>Feedback on the local-first workflow or save-to-account flow</li>
            <li>Questions about Firebase Auth, Firestore rules, or App Hosting rollout</li>
          </ul>
        </Card>
      </div>
    </section>
  );
}
