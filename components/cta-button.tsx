import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps, PropsWithChildren } from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

type CTAButtonVariant = "primary" | "secondary";

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  href?: ComponentProps<typeof Link>["href"];
  showArrow?: boolean;
  variant?: CTAButtonVariant;
}

const variantStyles: Record<CTAButtonVariant, string> = {
  primary:
    "bg-cta-gradient text-white shadow-[0_22px_55px_rgba(11,45,85,0.24)] hover:brightness-[1.03] hover:shadow-[0_28px_68px_rgba(11,45,85,0.3)]",
  secondary:
    "border border-border-strong bg-white/88 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.82)] hover:border-brand-cyan/60 hover:bg-white hover:text-brand-navy",
};

const baseClassName =
  "inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-[0.01em] transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue";

export function CTAButton({
  children,
  className,
  href,
  showArrow = false,
  type = "button",
  variant = "primary",
  ...props
}: PropsWithChildren<CTAButtonProps>) {
  const content = (
    <>
      <span>{children}</span>
      {showArrow ? <ArrowRight className="ml-2 size-4" /> : null}
    </>
  );

  if (href) {
    return (
      <Link className={cn(baseClassName, variantStyles[variant], className)} href={href}>
        {content}
      </Link>
    );
  }

  return (
    <button className={cn(baseClassName, variantStyles[variant], className)} type={type} {...props}>
      {content}
    </button>
  );
}
