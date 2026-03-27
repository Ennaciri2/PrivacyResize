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
        "premium-panel rounded-[1.75rem] px-5 py-5",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
