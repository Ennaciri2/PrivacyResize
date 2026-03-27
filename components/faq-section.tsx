import type { FaqItem } from "@/types";

import { Card } from "@/components/ui/card";

interface FAQSectionProps {
  eyebrow?: string;
  items: FaqItem[];
  title: string;
}

export function FAQSection({ eyebrow, items, title }: FAQSectionProps) {
  return (
    <section className="section-shell space-y-8 py-16">
      <div className="space-y-3">
        {eyebrow ? <p className="section-kicker">{eyebrow}</p> : null}
        <h2 className="max-w-3xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <Card className="rounded-[1.65rem] p-0" key={item.question}>
            <details className="group px-6 py-5" open>
              <summary className="cursor-pointer list-none text-lg font-semibold text-foreground">
                <span className="flex items-start justify-between gap-4">
                  <span>{item.question}</span>
                  <span className="text-brand-navy transition group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-4 text-sm leading-7 text-foreground/68">{item.answer}</p>
            </details>
          </Card>
        ))}
      </div>
    </section>
  );
}
