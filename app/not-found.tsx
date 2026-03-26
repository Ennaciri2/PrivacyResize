import Link from "next/link";

import { Card } from "@/components/ui/card";

export default function NotFound() {
  return (
    <section className="section-shell py-20">
      <Card className="mx-auto max-w-2xl space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Page not found</p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">That page is not in the library yet</h1>
        <p className="text-sm leading-7 text-foreground/68">
          Try the preset hub or go straight to the main tool while you explore the current launch pages.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-strong"
            href="/tool"
          >
            Open the tool
          </Link>
          <Link
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-border-strong bg-white/80 px-6 py-3 text-sm font-semibold text-foreground transition hover:border-accent/30"
            href="/presets"
          >
            Browse presets
          </Link>
        </div>
      </Card>
    </section>
  );
}
