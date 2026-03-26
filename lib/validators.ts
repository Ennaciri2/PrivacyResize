import { z } from "zod";

export const outputFormatSchema = z.enum(["image/jpeg", "image/png", "image/webp"]);
export const resizeModeSchema = z.enum(["fit", "fill", "crop"]);

export const toolConfigSchema = z.object({
  presetSlug: z.string().optional(),
  width: z.coerce.number().int().min(32).max(12_000),
  height: z.coerce.number().int().min(32).max(12_000),
  resizeMode: resizeModeSchema,
  lockAspectRatio: z.boolean(),
  quality: z.coerce.number().int().min(10).max(100),
  outputFormat: outputFormatSchema,
  backgroundColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
});

export const feedbackSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.email(),
  message: z.string().min(20).max(2_000),
  page: z.string().min(1).max(200),
});

export const faqItemSchema = z.object({
  question: z.string().min(6).max(160),
  answer: z.string().min(12).max(500),
});

export const seoPresetFormSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(10).max(120),
  h1: z.string().min(10).max(140),
  metaTitle: z.string().min(10).max(60),
  metaDescription: z.string().min(30).max(160),
  intro: z.string().min(40).max(600),
  useCase: z.string().min(20).max(400),
  bestFor: z.string().min(20).max(240),
  steps: z.array(z.string().min(8).max(180)).min(3).max(5),
  faq: z.array(faqItemSchema).min(2).max(5),
  width: z.coerce.number().int().min(32).max(12_000),
  height: z.coerce.number().int().min(32).max(12_000),
  category: z.string().min(2).max(40),
  relatedSlugs: z.array(z.string().regex(/^[a-z0-9-]+$/)).min(1).max(6),
  tags: z.array(z.string().min(2).max(60)).min(2).max(10),
});

export const dimensionsSchema = z
  .string()
  .regex(/^\d{2,5}x\d{2,5}$/)
  .transform((value) => {
    const [rawWidth, rawHeight] = value.split("x");
    const width = Number(rawWidth ?? 0);
    const height = Number(rawHeight ?? 0);

    return {
      dimensions: value,
      width,
      height,
    };
  });
