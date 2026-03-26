import { adsEnabled } from "@/lib/env";

interface AdPlaceholderProps {
  label: string;
}

export function AdPlaceholder({ label }: AdPlaceholderProps) {
  if (!adsEnabled()) {
    return null;
  }

  return (
    <div className="section-shell py-6">
      <div className="rounded-[1.5rem] border border-dashed border-border-strong bg-white/55 px-6 py-7 text-center text-sm text-foreground/58">
        Ad slot reserved: {label}
      </div>
    </div>
  );
}
