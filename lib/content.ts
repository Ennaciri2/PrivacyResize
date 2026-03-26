import { exactSizePresets } from "@/data/exact-sizes";
import { seoPresets } from "@/data/seo-presets";
import type { ExactSizePreset, SeoPreset } from "@/types";
import { listRemoteSeoPresets, getRemoteSeoPreset } from "@/lib/firebase/admin";
import { dimensionsSchema } from "@/lib/validators";

const presetMap = new Map(seoPresets.map((preset) => [preset.slug, preset] as const));
const exactSizeMap = new Map(exactSizePresets.map((preset) => [preset.dimensions, preset] as const));

export function listSeedPresets() {
  return seoPresets;
}

export function listExactSizes() {
  return exactSizePresets;
}

export function getSeedPreset(slug: string) {
  return presetMap.get(slug) ?? null;
}

export function getRelatedPresets(slugs: string[]) {
  return slugs.map((slug) => presetMap.get(slug)).filter((preset): preset is SeoPreset => Boolean(preset));
}

export async function resolveSeoPreset(slug: string) {
  const remotePreset = await getRemoteSeoPreset(slug);

  if (remotePreset) {
    return remotePreset;
  }

  return getSeedPreset(slug);
}

export async function listPublicSeoPresetSlugs() {
  const remotePresets = await listRemoteSeoPresets();
  const slugs = new Set<string>(seoPresets.map((preset) => preset.slug));

  for (const preset of remotePresets) {
    slugs.add(preset.slug);
  }

  return Array.from(slugs).sort();
}

export function buildExactSizePreset(dimensions: string): ExactSizePreset | null {
  const parsed = dimensionsSchema.safeParse(dimensions);

  if (!parsed.success) {
    return null;
  }

  const exactPreset = exactSizeMap.get(dimensions);

  if (exactPreset) {
    return exactPreset;
  }

  const { width, height } = parsed.data;

  return {
    dimensions,
    width,
    height,
    title: `Resize image to ${dimensions}`,
    metaDescription: `Resize images to exactly ${dimensions} in your browser with local cropping, compression, and export tools.`,
    intro: `${dimensions} is a practical exact-size target when you need consistency across a campaign, storefront, or internal content workflow.`,
    useCase: `Use this exact-size page when you already know the final dimensions and want a fast local resize without sending files to a server.`,
    relatedSlugs: ["instagram-post", "facebook-ad", "youtube-thumbnail"],
  };
}
