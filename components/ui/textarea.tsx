import type { TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full rounded-3xl border border-border bg-white/85 px-4 py-3 text-sm text-foreground shadow-sm outline-none transition placeholder:text-foreground/45 focus:border-accent/50 focus:ring-4 focus:ring-accent-soft",
        className,
      )}
      {...props}
    />
  );
}
