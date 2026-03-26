import type { MetadataRoute } from "next";

import { exactSizePresets } from "@/data/exact-sizes";
import { listPublicSeoPresetSlugs } from "@/lib/content";
import { buildAbsoluteUrl, buildPresetPath, buildSizePath } from "@/lib/seo";

const staticPaths = [
  "/",
  "/tool",
  "/pricing",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/blog",
  "/presets",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const presetSlugs = await listPublicSeoPresetSlugs();

  return [
    ...staticPaths.map((path) => ({
      url: buildAbsoluteUrl(path),
      lastModified: new Date(),
    })),
    ...presetSlugs.map((slug) => ({
      url: buildAbsoluteUrl(buildPresetPath(slug)),
      lastModified: new Date(),
    })),
    ...exactSizePresets.map((preset) => ({
      url: buildAbsoluteUrl(buildSizePath(preset.dimensions)),
      lastModified: new Date(),
    })),
  ];
}
