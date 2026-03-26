import type { SeoPreset } from "@/types";

export const seoPresets: SeoPreset[] = [
  {
    slug: "instagram-post",
    title: "Resize image for Instagram posts",
    shortLabel: "Instagram Post",
    h1: "Resize images for Instagram posts without uploading your originals",
    metaTitle: "Resize Image for Instagram Posts (1080x1080) | PrivacyResize",
    metaDescription:
      "Resize, crop, and compress images for Instagram posts in your browser. Export 1080x1080 files locally with no default image upload.",
    intro:
      "Instagram square posts remain the safest default when you want predictable in-feed framing. PrivacyResize helps you prep campaign graphics, carousel covers, and simple product shots locally in the browser.",
    useCase:
      "Best when you need a clean square layout that stays centered across mobile feeds, creator collaborations, and evergreen product content.",
    bestFor: "Feed posts, carousel covers, quote graphics, and square catalog visuals.",
    steps: [
      "Upload one image or a full batch into the browser-only tool.",
      "Keep the Instagram post preset selected or fine-tune crop and quality.",
      "Export optimized 1080x1080 JPG, PNG, or WebP files individually or as a ZIP.",
    ],
    faq: [
      {
        question: "What Instagram size does this preset use?",
        answer: "This preset targets 1080x1080, which is the standard square format for most Instagram feed posts.",
      },
      {
        question: "Can I crop manually before exporting?",
        answer:
          "Yes. Switch to crop mode to adjust the framing for your selected image before processing the final output.",
      },
      {
        question: "Will my originals be uploaded to PrivacyResize?",
        answer:
          "No. The default Instagram workflow runs entirely in your browser, so the original files stay on your device.",
      },
    ],
    width: 1080,
    height: 1080,
    category: "social",
    relatedSlugs: ["instagram-story", "facebook-ad", "pinterest-pin"],
    tags: ["instagram post size", "1080x1080", "social media image resizer"],
  },
  {
    slug: "instagram-story",
    title: "Resize image for Instagram stories",
    shortLabel: "Instagram Story",
    h1: "Resize visuals for Instagram Stories in a local-first workflow",
    metaTitle: "Resize Image for Instagram Stories (1080x1920) | PrivacyResize",
    metaDescription:
      "Resize images for Instagram Stories at 1080x1920 with in-browser cropping, compression, and ZIP export.",
    intro:
      "Story creative needs vertical framing that keeps faces, offers, and UI-safe copy visible. PrivacyResize gives you a fast 1080x1920 workflow without shipping source files to a server.",
    useCase:
      "Use this preset when you need vertical assets for story promos, creator reposts, countdown graphics, or quick mobile-first announcements.",
    bestFor: "Stories, vertical ad cutdowns, launch promos, and event reminders.",
    steps: [
      "Drop in your images and choose the Instagram Story preset.",
      "Use fill for automatic framing or crop mode for manual control.",
      "Download crisp 1080x1920 assets individually or in a ZIP.",
    ],
    faq: [
      {
        question: "Why is the preset vertical?",
        answer: "Instagram Stories display best in a 9:16 format, so this preset uses 1080x1920.",
      },
      {
        question: "Can I process multiple story slides at once?",
        answer: "Yes. PrivacyResize supports batch processing and ZIP export for story sequences.",
      },
      {
        question: "What if my original is horizontal?",
        answer:
          "Use crop mode to pick the exact vertical framing you want, or use fill mode for a centered auto-crop.",
      },
    ],
    width: 1080,
    height: 1920,
    category: "social",
    relatedSlugs: ["instagram-post", "youtube-thumbnail", "tiktok-profile"],
    tags: ["instagram story size", "vertical story image", "1080x1920 resizer"],
  },
  {
    slug: "facebook-ad",
    title: "Resize image for Facebook ads",
    shortLabel: "Facebook Ad",
    h1: "Resize Facebook ad images with browser-side cropping and compression",
    metaTitle: "Resize Image for Facebook Ads (1200x628) | PrivacyResize",
    metaDescription:
      "Prepare Facebook ad creatives at 1200x628 with local resizing, crop control, and no default upload.",
    intro:
      "Paid social creatives often need a wide layout that balances subject focus, headline placement, and compressed delivery. PrivacyResize keeps that ad-prep workflow quick and local.",
    useCase:
      "Ideal for acquisition campaigns, retargeting graphics, simple brand promos, and link-click ads that need a wide composition.",
    bestFor: "Facebook ads, Open Graph promo images, and lightweight campaign cards.",
    steps: [
      "Upload ad creatives and apply the Facebook Ad preset.",
      "Adjust crop, quality, and output format for your channel requirements.",
      "Export one file or a ZIP ready for your ads manager workflow.",
    ],
    faq: [
      {
        question: "What dimensions does this preset use?",
        answer: "The preset uses 1200x628, a widely used format for Facebook ads and shared campaign cards.",
      },
      {
        question: "Can I reduce file size for faster ad loads?",
        answer:
          "Yes. Lower the quality slider or switch to WebP when you want smaller files without rebuilding the creative elsewhere.",
      },
      {
        question: "Will this work for link preview graphics too?",
        answer:
          "Yes. The same wide format is commonly used for Open Graph-style preview cards and promo banners.",
      },
    ],
    width: 1200,
    height: 628,
    category: "ads",
    relatedSlugs: ["linkedin-banner", "youtube-thumbnail", "instagram-post"],
    tags: ["facebook ad size", "1200x628 image", "paid social creative resizer"],
  },
  {
    slug: "linkedin-banner",
    title: "Resize image for LinkedIn banners",
    shortLabel: "LinkedIn Banner",
    h1: "Resize LinkedIn banner images with exact wide dimensions",
    metaTitle: "Resize Image for LinkedIn Banners (1584x396) | PrivacyResize",
    metaDescription:
      "Resize LinkedIn banner images to 1584x396 with local processing, crop controls, and share-ready exports.",
    intro:
      "LinkedIn banners need careful wide framing so branding and headlines stay visible across profile layouts. PrivacyResize helps you dial that in without leaving the browser.",
    useCase:
      "Use this preset for founder profiles, agency pages, recruiting visuals, webinar promos, and B2B thought leadership branding.",
    bestFor: "Personal profile banners, company page headers, and event promos.",
    steps: [
      "Choose the LinkedIn Banner preset after uploading your artwork.",
      "Use fit mode if you want to preserve edges or fill/crop to cover the full banner area.",
      "Export a polished 1584x396 file and keep the original safely on device.",
    ],
    faq: [
      {
        question: "Why is banner cropping tricky on LinkedIn?",
        answer:
          "LinkedIn compresses a very wide image area into a shallow banner, so logos and faces near the edges can disappear quickly.",
      },
      {
        question: "Can I prepare both profile and company banner drafts here?",
        answer:
          "Yes. The preset is a strong starting point, and you can tweak exact dimensions if your workflow needs a slightly different banner variant.",
      },
      {
        question: "Does PrivacyResize store my branded artwork?",
        answer:
          "No. Banner processing happens locally by default, so your source graphics are not uploaded as part of the resizing flow.",
      },
    ],
    width: 1584,
    height: 396,
    category: "social",
    relatedSlugs: ["facebook-ad", "youtube-thumbnail", "shopify-product-image"],
    tags: ["linkedin banner size", "linkedin cover image", "1584x396 resizer"],
  },
  {
    slug: "youtube-thumbnail",
    title: "Resize image for YouTube thumbnails",
    shortLabel: "YouTube Thumbnail",
    h1: "Resize YouTube thumbnails that stay sharp after compression",
    metaTitle: "Resize Image for YouTube Thumbnails (1280x720) | PrivacyResize",
    metaDescription:
      "Resize YouTube thumbnails to 1280x720 with high-quality local processing, crop control, and optimized exports.",
    intro:
      "Thumbnails need to hold strong contrast, readable text, and clean subject framing even after platform compression. PrivacyResize gives you a fast 1280x720 workflow with quality controls built in.",
    useCase:
      "Use this preset for long-form videos, shorts cover art, tutorial series, launch recaps, and creator-led campaign graphics.",
    bestFor: "YouTube thumbnails, video cover images, and blog hero visuals.",
    steps: [
      "Upload the image that will anchor your thumbnail.",
      "Choose crop mode if text and faces need manual placement within the 16:9 frame.",
      "Export a 1280x720 version in JPG, PNG, or WebP depending on your pipeline.",
    ],
    faq: [
      {
        question: "Why does this preset use 1280x720?",
        answer: "That is the common 16:9 thumbnail size for YouTube and similar video workflows.",
      },
      {
        question: "Should I use JPG or PNG for thumbnails?",
        answer:
          "JPG is usually a good default for photo-heavy thumbnails. PNG can help when you need sharper edges on large text or simple graphics.",
      },
      {
        question: "Can I batch process a full video series?",
        answer:
          "Yes. Drop in multiple files, keep one preset active, and export the full set as a ZIP to speed up episodic workflows.",
      },
    ],
    width: 1280,
    height: 720,
    category: "video",
    relatedSlugs: ["facebook-ad", "instagram-story", "linkedin-banner"],
    tags: ["youtube thumbnail size", "1280x720 image", "thumbnail resizer"],
  },
  {
    slug: "tiktok-profile",
    title: "Resize image for TikTok profile photos",
    shortLabel: "TikTok Profile",
    h1: "Resize TikTok profile images for a clean circular crop",
    metaTitle: "Resize Image for TikTok Profile Photos (200x200) | PrivacyResize",
    metaDescription:
      "Resize TikTok profile photos to 200x200 with local crop control and fast export for creator and brand accounts.",
    intro:
      "Profile images need a centered square source so the circular crop still reads clearly on mobile. PrivacyResize makes it easy to prep a clean avatar without extra apps.",
    useCase:
      "Use this preset for creator headshots, brand marks, product icons, and social account refreshes where clarity at small sizes matters.",
    bestFor: "Creator avatars, brand icons, and campaign profile refreshes.",
    steps: [
      "Drop in the source image and apply the TikTok Profile preset.",
      "Use crop mode to keep the subject centered inside a square export.",
      "Download a lightweight profile-ready image that survives circular cropping.",
    ],
    faq: [
      {
        question: "Why is the export square if TikTok shows a circle?",
        answer: "Most social profile photos start as square images and are then masked into a circle in the interface.",
      },
      {
        question: "Can I export larger than 200x200 if I want extra headroom?",
        answer:
          "Yes. You can use the preset as a guide and then enter a larger exact size while keeping the same square aspect ratio.",
      },
      {
        question: "Is this preset only for TikTok?",
        answer:
          "No. It also works well for any profile image workflow that ultimately crops to a centered circle or small square.",
      },
    ],
    width: 200,
    height: 200,
    category: "social",
    relatedSlugs: ["instagram-post", "etsy-listing-image", "amazon-product-image"],
    tags: ["tiktok profile photo size", "200x200 avatar", "social avatar resizer"],
  },
  {
    slug: "pinterest-pin",
    title: "Resize image for Pinterest pins",
    shortLabel: "Pinterest Pin",
    h1: "Resize Pinterest pins for vertical discovery layouts",
    metaTitle: "Resize Image for Pinterest Pins (1000x1500) | PrivacyResize",
    metaDescription:
      "Resize Pinterest pins to 1000x1500 with local crop control, better compression, and ZIP export.",
    intro:
      "Pinterest rewards strong vertical layouts that stay clear in discovery feeds and category searches. PrivacyResize helps you prepare those tall assets quickly without shipping originals anywhere.",
    useCase:
      "Use this preset for blog teasers, recipe graphics, product roundups, and evergreen discovery visuals that rely on a tall 2:3 canvas.",
    bestFor: "Pins, blog promo graphics, and vertical product inspiration content.",
    steps: [
      "Upload your images and select the Pinterest Pin preset.",
      "Use fit or crop mode depending on whether you want full-bleed coverage.",
      "Export polished 1000x1500 files in one pass.",
    ],
    faq: [
      {
        question: "What size does this preset target?",
        answer: "The preset uses 1000x1500, a common 2:3 ratio for Pinterest pin graphics.",
      },
      {
        question: "Can I prep multiple blog graphics at once?",
        answer:
          "Yes. Batch upload works well for Pinterest workflows where one article spawns several creative variants.",
      },
      {
        question: "Will tall images lose quality when resized?",
        answer:
          "PrivacyResize uses high-quality browser-side resizing, and you can fine-tune output quality before export.",
      },
    ],
    width: 1000,
    height: 1500,
    category: "social",
    relatedSlugs: ["instagram-story", "instagram-post", "etsy-listing-image"],
    tags: ["pinterest pin size", "1000x1500 image", "vertical pin resizer"],
  },
  {
    slug: "amazon-product-image",
    title: "Resize image for Amazon product listings",
    shortLabel: "Amazon Product",
    h1: "Resize Amazon product images with clean square framing",
    metaTitle: "Resize Image for Amazon Product Images (2000x2000) | PrivacyResize",
    metaDescription:
      "Resize product images for Amazon listings at 2000x2000 with browser-side processing and crisp export options.",
    intro:
      "Marketplace product images need predictable square framing, clean edges, and file sizes that stay practical at scale. PrivacyResize makes that cleanup process faster when you are preparing catalogs locally.",
    useCase:
      "Use this preset for hero product shots, catalog refreshes, SKU launches, and quick image QA before marketplace upload.",
    bestFor: "Catalog hero images, square product photos, and product gallery prep.",
    steps: [
      "Upload product images from your shoot or DAM export.",
      "Use fit mode if you want to preserve padding or fill/crop for edge-to-edge compositions.",
      "Export optimized square assets for Amazon listing workflows.",
    ],
    faq: [
      {
        question: "Why is the preset 2000x2000?",
        answer:
          "A large square source gives you enough detail for zoom-friendly marketplace workflows while staying easy to repurpose for other channels.",
      },
      {
        question: "Can I use this for plain-background product shots?",
        answer:
          "Yes. The preset works well for studio product images, especially when you want to keep a consistent square library.",
      },
      {
        question: "Does PrivacyResize send product images to cloud storage?",
        answer:
          "No. The default tool flow keeps product images local in the browser and does not upload them to a backend.",
      },
    ],
    width: 2000,
    height: 2000,
    category: "marketplace",
    relatedSlugs: ["shopify-product-image", "etsy-listing-image", "instagram-post"],
    tags: ["amazon image size", "2000x2000 product image", "marketplace resizer"],
  },
  {
    slug: "shopify-product-image",
    title: "Resize image for Shopify product pages",
    shortLabel: "Shopify Product",
    h1: "Resize Shopify product images for fast-loading storefronts",
    metaTitle: "Resize Image for Shopify Product Images (2048x2048) | PrivacyResize",
    metaDescription:
      "Resize Shopify product images to 2048x2048 with local compression, crop control, and batch export.",
    intro:
      "Shopify catalogs need a balance between clean zoomable detail and storefront performance. PrivacyResize helps you standardize square product imagery without routing assets through a server-first workflow.",
    useCase:
      "Use this preset for product detail pages, collection imagery, lookbook crops, and storefront refreshes where consistency matters.",
    bestFor: "Product grids, PDP galleries, catalog maintenance, and launch-week uploads.",
    steps: [
      "Upload product images and apply the Shopify Product preset.",
      "Adjust output quality to hit the right balance of clarity and file weight.",
      "Download a batch ZIP and move directly into your Shopify media workflow.",
    ],
    faq: [
      {
        question: "Is 2048x2048 a good Shopify default?",
        answer:
          "It is a strong high-resolution square starting point for many Shopify storefronts, especially when you want room for zoom.",
      },
      {
        question: "Can I export WebP for storefront performance?",
        answer:
          "Yes. PrivacyResize supports WebP output when your theme or asset pipeline can use it.",
      },
      {
        question: "Can I reuse the same output for other channels?",
        answer:
          "Yes. Large square exports are easy to repurpose for Amazon, Etsy, and social catalog posts after the initial resize.",
      },
    ],
    width: 2048,
    height: 2048,
    category: "marketplace",
    relatedSlugs: ["amazon-product-image", "etsy-listing-image", "linkedin-banner"],
    tags: ["shopify product image size", "2048x2048 resizer", "ecommerce image tool"],
  },
  {
    slug: "etsy-listing-image",
    title: "Resize image for Etsy listing photos",
    shortLabel: "Etsy Listing",
    h1: "Resize Etsy listing images for consistent storefront presentation",
    metaTitle: "Resize Image for Etsy Listing Images (2000x1600) | PrivacyResize",
    metaDescription:
      "Resize Etsy listing images to 2000x1600 with local cropping, high-quality browser resizing, and ZIP export.",
    intro:
      "Etsy visuals need enough room for product detail, styled context, and fast storefront browsing. PrivacyResize gives you a reliable listing workflow you can repeat across handmade or vintage catalogs.",
    useCase:
      "Use this preset for listing hero images, styled product shots, alternate views, and seasonal shop refreshes.",
    bestFor: "Listing galleries, handmade product photos, and storefront consistency.",
    steps: [
      "Upload listing photos and choose the Etsy Listing preset.",
      "Use crop mode when you need tighter framing on lifestyle shots or detail images.",
      "Export polished listing assets locally and keep the originals untouched.",
    ],
    faq: [
      {
        question: "Why is this preset slightly rectangular instead of square?",
        answer:
          "A wider layout can leave more room for styled scenes and product context while still staying marketplace-friendly.",
      },
      {
        question: "Can I use this for secondary gallery images too?",
        answer:
          "Yes. The same preset works for main listing photos and alternate angles when you want a consistent storefront rhythm.",
      },
      {
        question: "Does batch export help with catalog updates?",
        answer:
          "Yes. Batch resizing is one of the fastest ways to standardize multiple listings before a shop refresh or seasonal launch.",
      },
    ],
    width: 2000,
    height: 1600,
    category: "marketplace",
    relatedSlugs: ["amazon-product-image", "shopify-product-image", "pinterest-pin"],
    tags: ["etsy listing image size", "2000x1600 resizer", "etsy photo tool"],
  },
];
