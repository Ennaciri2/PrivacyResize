import { describe, expect, it } from "vitest";

import { buildPageMetadata, buildPresetPath, buildSizePath, buildSoftwareApplicationSchema } from "@/lib/seo";

describe("seo helpers", () => {
  it("builds preset and size paths", () => {
    expect(buildPresetPath("instagram-post")).toBe("/resize-image-for-instagram-post");
    expect(buildSizePath("1080x1080")).toBe("/resize-image-1080x1080");
  });

  it("builds metadata with canonical URLs", () => {
    const metadata = buildPageMetadata({
      title: "Resize image for Instagram posts",
      description: "Resize locally",
      path: "/resize-image-for-instagram-post",
    });

    expect(metadata.alternates?.canonical).toContain("/resize-image-for-instagram-post");
    expect(metadata.openGraph?.title).toBe("Resize image for Instagram posts");
  });

  it("keeps branded titles absolute to avoid duplicate suffixes", () => {
    const metadata = buildPageMetadata({
      title: "Resize Image for Instagram Posts (1080x1080) | PrivacyResize",
      description: "Resize locally",
      path: "/resize-image-for-instagram-post",
    });

    expect(metadata.title).toEqual({
      absolute: "Resize Image for Instagram Posts (1080x1080) | PrivacyResize",
    });
  });

  it("builds software application schema with privacy-first positioning", () => {
    const schema = buildSoftwareApplicationSchema("https://privacyresize.com/tool");

    expect(schema.alternateName).toBe("PrivacyResize");
    expect(schema.featureList).toContain("Keep source images on-device by default");
    expect(schema.privacyPolicy).toContain("/privacy");
  });
});
