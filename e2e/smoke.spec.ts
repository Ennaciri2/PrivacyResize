import { expect, test } from "@playwright/test";

test("home page renders", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/PrivacyResize/i);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Resize, crop, compress");
});

test("preset pages render", async ({ page }) => {
  await page.goto("/resize-image-for-instagram-post");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Instagram");
});

test("exact-size pages render", async ({ page }) => {
  await page.goto("/resize-image-1080x1080");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("1080x1080");
});

test("dashboard is noindex", async ({ page }) => {
  await page.goto("/dashboard");
  const robotsMeta = page.locator('meta[name="robots"]');
  await expect(robotsMeta).toHaveAttribute("content", /noindex/);
});
