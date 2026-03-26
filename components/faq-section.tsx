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
        {eyebrow ? <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{eyebrow}</p> : null}
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <Card className="space-y-3" key={item.question}>
            <h3 className="text-lg font-semibold text-foreground">{item.question}</h3>
            <p className="text-sm leading-7 text-foreground/68">{item.answer}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
