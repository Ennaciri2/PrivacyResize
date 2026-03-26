import type { Metadata, Route } from "next";

import { SITE_DESCRIPTION, SITE_NAME } from "@/data/site";
import type { FaqItem } from "@/types";
import { getSiteUrl } from "@/lib/env";

export function buildAbsoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}

export function buildPresetPath(slug: string): Route {
  return `/resize-image-for-${slug}` as Route;
}

export function buildSizePath(dimensions: string): Route {
  return `/resize-image-${dimensions}` as Route;
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [],
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const absoluteUrl = buildAbsoluteUrl(path);
  const metadataTitle: Metadata["title"] = title.includes(SITE_NAME)
    ? { absolute: title }
    : title;

  return {
    title: metadataTitle,
    description,
    keywords,
    alternates: {
      canonical: absoluteUrl,
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl,
      siteName: SITE_NAME,
      type: "website",
      images: [
        {
          url: buildAbsoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [buildAbsoluteUrl("/opengraph-image")],
    },
  };
}

export function buildSoftwareApplicationSchema(url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    alternateName: "PrivacyResize",
    applicationCategory: "MultimediaApplication",
    applicationSubCategory: "Online image resizer",
    operatingSystem: "Any",
    slogan: "Privacy-first online image resizer",
    description: SITE_DESCRIPTION,
    url,
    isAccessibleForFree: true,
    featureList: [
      "Resize, crop, and compress images directly in the browser",
      "Batch export JPG, PNG, and WebP files as a ZIP",
      "Use social media, marketplace, and exact-size presets",
      "Keep source images on-device by default",
    ],
    privacyPolicy: buildAbsoluteUrl("/privacy"),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export function buildFaqSchema(faq: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema(
  items: Array<{
    name: string;
    path: string;
  }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: buildAbsoluteUrl(item.path),
    })),
  };
}
