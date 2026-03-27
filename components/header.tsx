"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

import { AuthButton } from "@/components/auth-button";
import { BrandMark } from "@/components/brand-mark";
import { BrandWordmark } from "@/components/brand-wordmark";
import { CTAButton } from "@/components/cta-button";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/data/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/84 backdrop-blur-xl">
      <div className="section-shell">
        <div className="flex min-h-18 items-center justify-between gap-3">
          <Link
            className="flex min-w-0 items-center gap-3 text-sm font-semibold tracking-[0.12em] text-foreground"
            href="/"
            onClick={() => setMobileMenuOpen(false)}
          >
            <BrandMark className="size-10 sm:size-11" />
            <BrandWordmark className="flex min-w-0" compact showSubtitle={false} />
          </Link>
          <nav className="hidden items-center gap-5 text-sm text-foreground/72 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                className={cn(
                  "transition hover:text-foreground",
                  pathname === link.href && "text-brand-navy",
                )}
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <CTAButton href="/tool">Use the tool</CTAButton>
            <AuthButton />
          </div>
          <Button
            aria-controls="mobile-site-menu"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="h-11 w-11 px-0 md:hidden"
            onClick={() => setMobileMenuOpen((current) => !current)}
            variant="secondary"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>

        <div
          className={cn(
            "fixed inset-0 z-40 bg-[rgba(19,33,37,0.26)] backdrop-blur-[2px] transition duration-300 md:hidden",
            mobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
          )}
          id="mobile-site-menu"
          onClick={() => setMobileMenuOpen(false)}
        />

        <div
          className={cn(
            "fixed inset-x-3 top-[5rem] z-50 md:hidden",
            mobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <div
            className={cn(
              "premium-panel pointer-events-auto rounded-[1.75rem] p-4 shadow-[0_28px_80px_rgba(11,45,85,0.18)] transition duration-300",
              mobileMenuOpen ? "translate-y-0 scale-100" : "-translate-y-3 scale-[0.98]",
            )}
            role="dialog"
            aria-modal="true"
          >
            <div className="mb-4 flex items-center justify-between gap-3 rounded-[1.35rem] border border-border bg-white/80 px-4 py-3">
              <div className="flex items-center gap-3">
                <BrandMark className="size-9" />
                <BrandWordmark compact showSubtitle={false} />
              </div>
              <Button
                aria-label="Close menu"
                className="h-10 w-10 px-0"
                onClick={() => setMobileMenuOpen(false)}
                variant="ghost"
              >
                <X className="size-[18px]" />
              </Button>
            </div>
            <div className="grid gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  className={cn(
                    "rounded-[1.15rem] border px-4 py-3.5 text-sm font-semibold transition",
                    pathname === link.href
                      ? "border-brand-cyan/30 bg-[linear-gradient(135deg,rgba(18,122,107,0.08),rgba(19,214,215,0.12))] text-brand-navy"
                      : "border-transparent bg-white/72 text-foreground/78 hover:border-brand-cyan/30 hover:bg-white hover:text-foreground",
                  )}
                  href={link.href}
                  key={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="feature-divider my-4" />
            <div className="space-y-3">
              <CTAButton className="w-full justify-center" href="/tool" showArrow>
                Use the tool
              </CTAButton>
              <AuthButton className="min-h-12" layout="mobile" onAction={() => setMobileMenuOpen(false)} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
