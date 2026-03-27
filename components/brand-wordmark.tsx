import { cn } from "@/lib/utils";

interface BrandWordmarkProps {
  className?: string;
  compact?: boolean;
  showSubtitle?: boolean;
  subtitle?: string;
  tone?: "default" | "inverse";
}

export function BrandWordmark({
  className,
  compact = false,
  showSubtitle = true,
  subtitle = "Secure image resizer",
  tone = "default",
}: BrandWordmarkProps) {
  const privacyClassName = tone === "inverse" ? "text-white/92" : "text-foreground";
  const resizeClassName =
    tone === "inverse"
      ? "bg-[linear-gradient(135deg,#13d6d7_0%,#8bf8ef_58%,#ffffff_100%)]"
      : "bg-[linear-gradient(135deg,#0b5b50_0%,#127a6b_44%,#13d6d7_100%)]";
  const subtitleClassName = tone === "inverse" ? "text-white/62" : "text-foreground/48";

  return (
    <div className={cn("flex min-w-0 flex-col", className)}>
      <div
        className={cn(
          "flex items-baseline gap-0 font-semibold tracking-[-0.04em]",
          compact ? "text-base sm:text-lg" : "text-lg sm:text-[1.35rem]",
        )}
      >
        <span className={privacyClassName}>Privacy</span>
        <span className={cn("bg-clip-text text-transparent", resizeClassName)}>Resize</span>
      </div>
      {showSubtitle ? (
        <span className={cn("text-[0.68rem] uppercase tracking-[0.18em]", subtitleClassName)}>{subtitle}</span>
      ) : null}
    </div>
  );
}
