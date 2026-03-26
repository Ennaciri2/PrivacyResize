import type { Metadata } from "next";

import { AdminPresetManager } from "@/components/admin-preset-manager";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Admin SEO Presets",
    description: "Private admin area for shared Firestore-backed SEO preset management.",
    path: "/admin/seo-presets",
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminSeoPresetsPage() {
  return (
    <section className="section-shell py-16">
      <AdminPresetManager />
    </section>
  );
}
