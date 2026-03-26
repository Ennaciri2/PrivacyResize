"use client";

import dynamic from "next/dynamic";

const LazyToolShell = dynamic(() => import("@/components/tool-shell").then((mod) => mod.ToolShell), {
  loading: () => (
    <div className="rounded-[1.8rem] border border-border bg-white/70 px-6 py-12 text-center text-sm text-foreground/62">
      Loading the in-browser tool...
    </div>
  ),
  ssr: false,
});

interface EmbeddedToolProps {
  defaultDimensions?: string;
  defaultPresetSlug?: string;
  sourceLabel?: string;
}

export function EmbeddedTool(props: EmbeddedToolProps) {
  return <LazyToolShell {...props} />;
}
