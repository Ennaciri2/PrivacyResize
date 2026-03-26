import type { HTMLAttributes, PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={cn(
        "glass-card rounded-[1.5rem] border border-border bg-surface px-5 py-5",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
