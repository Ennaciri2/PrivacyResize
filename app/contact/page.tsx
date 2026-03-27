import { LifeBuoy, Mail, MessageSquareMore } from "lucide-react";

import { BrandBadge } from "@/components/brand-badge";
import { ContactForm } from "@/components/contact-form";
import { Card } from "@/components/ui/card";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Contact",
  description: "Contact PrivacyResize for feature requests, feedback, partnerships, or deployment help.",
  path: "/contact",
});

const requestTypes = [
  "New long-tail preset pages you want added to the library",
  "Feedback on the local-first workflow or saved preset experience",
  "Questions about Firebase Auth, Firestore rules, or App Hosting rollout",
] as const;

export default function ContactPage() {
  return (
    <section className="section-shell space-y-10 py-16">
      <div className="max-w-3xl space-y-4">
        <BrandBadge icon={<MessageSquareMore className="size-3.5 text-accent" />}>Contact</BrandBadge>
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Send feedback, request a preset, or ask about deployment
        </h1>
        <p className="text-base leading-8 text-foreground/68">
          The product is intentionally focused. If you need another preset, a premium workflow, or help deploying App
          Hosting cleanly, send a note here.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_0.92fr]">
        <Card className="rounded-[1.9rem] p-6 sm:p-8">
          <ContactForm />
        </Card>
        <div className="space-y-6">
          <Card className="rounded-[1.9rem] p-6">
            <div className="space-y-4">
              <div className="inline-flex rounded-[1.2rem] bg-[linear-gradient(135deg,rgba(18,122,107,0.14),rgba(19,214,215,0.18))] p-3 text-brand-navy">
                <LifeBuoy className="size-5" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-foreground">Good requests</h2>
                <ul className="space-y-3 text-sm leading-7 text-foreground/66">
                  {requestTypes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
          <Card className="rounded-[1.9rem] p-6">
            <div className="space-y-4">
              <div className="inline-flex rounded-[1.2rem] bg-[linear-gradient(135deg,rgba(11,45,85,0.1),rgba(20,126,239,0.16))] p-3 text-brand-navy">
                <Mail className="size-5" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-foreground">Direct contact</h2>
                <p className="text-sm leading-7 text-foreground/66">
                  If the form is unavailable, you can also reach the project directly at
                  {" "}
                  <span className="font-semibold text-foreground">hello@privacyresize.com</span>.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
