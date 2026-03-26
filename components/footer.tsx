import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { SITE_EMAIL, SITE_NAME, SITE_TAGLINE } from "@/data/site";

const footerLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
  { href: "/presets", label: "Presets" },
] as const;

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border/80 bg-white/65">
      <div className="section-shell grid gap-10 py-12 md:grid-cols-[1.6fr_1fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <BrandMark className="size-11" />
            <p className="text-sm font-semibold tracking-[0.12em] text-accent">{SITE_NAME}</p>
          </div>
          <p className="max-w-xl text-sm leading-7 text-foreground/72">{SITE_TAGLINE}</p>
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
