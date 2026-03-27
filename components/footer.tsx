import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { BrandWordmark } from "@/components/brand-wordmark";
import { SITE_EMAIL, SITE_TAGLINE } from "@/data/site";

const footerLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
  { href: "/presets", label: "Presets" },
] as const;

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border/80 bg-white/60">
      <div className="section-shell grid gap-10 py-14 md:grid-cols-[1.5fr_1fr]">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <BrandMark className="size-11" />
            <BrandWordmark />
          </div>
          <p className="max-w-xl text-sm leading-7 text-foreground/72">{SITE_TAGLINE}</p>
          <p className="max-w-xl text-sm leading-7 text-foreground/58">
            Resize images instantly, in bulk, with no upload by default. Built for repeat workflows that need trust and speed.
          </p>
          <p className="text-sm text-foreground/56">Support: {SITE_EMAIL}</p>
        </div>
        <div className="grid gap-3 text-sm text-foreground/72 sm:grid-cols-2">
          {footerLinks.map((link) => (
            <Link className="transition hover:text-foreground" href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
