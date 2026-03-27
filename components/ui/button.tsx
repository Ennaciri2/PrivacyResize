import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-cta-gradient text-white shadow-[0_18px_42px_rgba(11,45,85,0.22)] hover:brightness-[1.03] hover:shadow-[0_22px_54px_rgba(11,45,85,0.28)] focus-visible:outline-brand-blue active:translate-y-px",
  secondary:
    "border border-border-strong bg-white/88 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] hover:border-brand-cyan/60 hover:bg-white hover:text-brand-navy focus-visible:outline-accent",
  ghost: "bg-transparent text-foreground hover:bg-accent-soft/80 hover:text-brand-navy focus-visible:outline-accent",
  danger: "bg-danger text-white hover:opacity-90 focus-visible:outline-danger",
};

export function Button({
  children,
  className,
  fullWidth = false,
  type = "button",
  variant = "primary",
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={cn(
        "inline-flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-sm font-semibold tracking-[0.01em] transition focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
        variantClasses[variant],
        fullWidth && "w-full",
        className,
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
