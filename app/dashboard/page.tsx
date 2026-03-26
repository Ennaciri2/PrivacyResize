import type { Metadata } from "next";

import { DashboardShell } from "@/components/dashboard-shell";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Dashboard",
    description: "Private dashboard for saved presets and usage history.",
    path: "/dashboard",
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardPage() {
  return (
    <section className="section-shell py-16">
      <DashboardShell />
    </section>
  );
}
