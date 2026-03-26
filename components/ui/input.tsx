import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-2xl border border-border bg-white/85 px-4 py-3 text-sm text-foreground shadow-sm outline-none transition placeholder:text-foreground/45 focus:border-accent/50 focus:ring-4 focus:ring-accent-soft",
        className,
      )}
      {...props}
    />
  );
}
