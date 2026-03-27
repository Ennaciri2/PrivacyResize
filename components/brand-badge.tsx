import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface BrandBadgeProps {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

export function BrandBadge({ children, className, icon }: BrandBadgeProps) {
  return (
    <span
      className={cn(
        "section-kicker border-brand-cyan/20 bg-white/84 text-brand-navy shadow-[0_10px_30px_rgba(11,45,85,0.08)]",
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
