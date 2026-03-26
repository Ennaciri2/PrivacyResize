import { describe, expect, it } from "vitest";

import { buildExactSizePreset, listSeedPresets } from "@/lib/content";

describe("content library", () => {
  it("ships with the launch preset library", () => {
    expect(listSeedPresets()).toHaveLength(10);
  });

  it("builds common exact-size pages", () => {
    const preset = buildExactSizePreset("1080x1080");

    expect(preset).not.toBeNull();
    expect(preset?.width).toBe(1080);
    expect(buildExactSizePreset("oops")).toBeNull();
  });
});
