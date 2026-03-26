import type { ExactSizePreset } from "@/types";

export const exactSizePresets: ExactSizePreset[] = [
  {
    dimensions: "1080x1080",
    width: 1080,
    height: 1080,
    title: "Resize image to 1080x1080",
    metaDescription:
      "Resize images to exactly 1080x1080 in your browser. Great for square social posts, catalog tiles, and simple campaign assets.",
    intro:
      "1080x1080 is still the most dependable square format when you need consistent cropping across social platforms and content libraries.",
    useCase:
      "Use this size for Instagram feed posts, simple product cards, catalog thumbnails, and evergreen square graphics.",
    relatedSlugs: ["instagram-post", "pinterest-pin", "facebook-ad"],
  },
  {
    dimensions: "1200x628",
    width: 1200,
    height: 628,
    title: "Resize image to 1200x628",
    metaDescription:
      "Resize images to 1200x628 for ads, sharing cards, and campaign creatives. Fast local processing with no default upload.",
    intro:
      "1200x628 is a classic wide asset size for paid social creatives and link-sharing previews where tight composition matters.",
    useCase:
      "Use this format for Facebook ads, Open Graph preview graphics, and simple branded promotion cards.",
    relatedSlugs: ["facebook-ad", "linkedin-banner", "youtube-thumbnail"],
  },
  {
    dimensions: "1920x1080",
    width: 1920,
    height: 1080,
    title: "Resize image to 1920x1080",
    metaDescription:
      "Resize images to 1920x1080 for presentations, backgrounds, and video stills without sending files off device.",
    intro:
      "1920x1080 is the default full HD canvas when you need clean widescreen assets for decks, hero visuals, or video workflows.",
    useCase:
      "Use this size for presentation slides, website hero art, video frame exports, and desktop wallpapers.",
    relatedSlugs: ["youtube-thumbnail", "linkedin-banner", "shopify-product-image"],
  },
  {
    dimensions: "820x312",
    width: 820,
    height: 312,
    title: "Resize image to 820x312",
    metaDescription:
      "Resize images to 820x312 for social cover images and campaign headers with quick browser-based processing.",
    intro:
      "820x312 is a tight banner format that needs careful cropping if you want logos and copy to stay centered on both desktop and mobile.",
    useCase:
      "Use this size for Facebook page cover graphics, campaign headers, and lightweight brand banners.",
    relatedSlugs: ["linkedin-banner", "facebook-ad", "youtube-thumbnail"],
  },
  {
    dimensions: "1280x720",
    width: 1280,
    height: 720,
    title: "Resize image to 1280x720",
    metaDescription:
      "Resize images to 1280x720 for thumbnails, lightweight video stills, and widescreen exports. Local and fast.",
    intro:
      "1280x720 is a practical HD size for thumbnails and video-adjacent creative where file weight matters but clarity still needs to hold up.",
    useCase:
      "Use this size for YouTube thumbnails, blog hero images, social video covers, and campaign previews.",
    relatedSlugs: ["youtube-thumbnail", "facebook-ad", "instagram-story"],
  },
];
