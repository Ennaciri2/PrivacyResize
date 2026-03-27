import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-[1.15rem] border border-border bg-white/88 px-4 py-3 text-sm text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.82)] outline-none transition placeholder:text-foreground/45 focus:border-brand-cyan/50 focus:ring-4 focus:ring-accent-soft",
        className,
      )}
      {...props}
    />
  );
}
