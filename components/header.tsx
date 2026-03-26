import Link from "next/link";

import { AuthButton } from "@/components/auth-button";
import { BrandMark } from "@/components/brand-mark";
import { SITE_NAME } from "@/data/site";
import { NAV_LINKS } from "@/data/site";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="section-shell flex min-h-18 items-center justify-between gap-6">
        <Link className="flex items-center gap-3 text-sm font-semibold tracking-[0.12em] text-foreground" href="/">
          <BrandMark className="size-11" />
          <span className="hidden sm:inline">{SITE_NAME}</span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-foreground/72 md:flex">
          {NAV_LINKS.map((link) => (
            <Link className="transition hover:text-foreground" href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <AuthButton />
      </div>
    </header>
  );
}
