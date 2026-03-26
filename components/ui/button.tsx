import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white shadow-[0_12px_24px_rgba(18,122,107,0.24)] hover:bg-accent-strong focus-visible:outline-accent",
  secondary:
    "bg-surface-strong text-foreground border border-border-strong hover:border-accent/40 hover:bg-white focus-visible:outline-accent",
  ghost: "bg-transparent text-foreground hover:bg-accent-soft focus-visible:outline-accent",
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
        "inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
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
