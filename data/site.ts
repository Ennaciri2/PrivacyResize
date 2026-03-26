import type { FaqItem } from "@/types";

export const SITE_NAME = "PrivacyResize";
export const SITE_TAGLINE =
  "Secure image resizer with privacy-first local processing for social, ecommerce, and exact-size exports.";
export const SITE_DESCRIPTION =
  "PrivacyResize is a secure, privacy-first image resizer that lets you resize, crop, compress, and batch export images for social media, marketplaces, and exact dimensions in the browser without uploading originals by default.";
export const SITE_EMAIL = "hello@privacyresize.com";

export const NAV_LINKS = [
  { href: "/tool", label: "Tool" },
  { href: "/presets", label: "Presets" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const FEATURED_PRESET_SLUGS = [
  "instagram-post",
  "linkedin-banner",
  "youtube-thumbnail",
  "amazon-product-image",
  "shopify-product-image",
] as const;

export const HOME_FAQ: FaqItem[] = [
  {
    question: "Does PrivacyResize upload my images?",
    answer:
      "No. The default workflow runs entirely in your browser. Images stay on your device unless you explicitly choose a future feature that says otherwise.",
  },
  {
    question: "Can I resize multiple images at once?",
    answer:
      "Yes. You can drag in a batch, apply one configuration, process them locally, and download the full output as a ZIP archive.",
  },
  {
    question: "Is this useful for social media and marketplaces?",
    answer:
      "That is the core use case. PrivacyResize ships with ready-made presets for social posts, banners, thumbnails, marketplace product images, and exact dimensions.",
  },
  {
    question: "Do I need an account to use the tool?",
    answer:
      "No. The main tool works without login. Sign in with Google or continue as an anonymous guest only when you want to save presets or see usage history.",
  },
] as const;

export const HOME_STATS = [
  { value: "100%", label: "No default image uploads" },
  { value: "10+", label: "Launch-ready preset landing pages" },
  { value: "3", label: "Output formats: JPG, PNG, WebP" },
] as const;

export const PRODUCT_PILLARS = [
  {
    title: "Privacy-first by default",
    copy:
      "Your originals stay in the browser. PrivacyResize is designed for founders, marketers, and sellers who do not want routine resizing jobs to touch a backend.",
  },
  {
    title: "SEO-ready landing page system",
    copy:
      "Every preset page ships with unique copy, structured data, related links, and canonical metadata so you can scale long-tail acquisition cleanly.",
  },
  {
    title: "Practical batch workflow",
    copy:
      "Drag in multiple files, apply one preset or exact size, tune quality, and export a ZIP without juggling three different tools.",
  },
] as const;

export const FUTURE_BLOG_TOPICS = [
  "Instagram image sizes that still crop safely in 2026",
  "How to compress marketplace images without softening product edges",
  "YouTube thumbnail sizing tips for sharper text overlays",
  "Shopify product image workflows for faster catalog launches",
] as const;
