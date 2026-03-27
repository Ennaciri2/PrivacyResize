import type { HTMLAttributes, PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  variant = "premium",
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement> & { variant?: "premium" | "plain" }>) {
  return (
    <div
      className={cn(
        variant === "premium" ? "premium-panel" : "panel-shell",
        "rounded-[1.75rem] px-5 py-5",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
