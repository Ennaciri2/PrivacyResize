export type ResizeMode = "fit" | "fill" | "crop";

export type OutputFormat = "image/jpeg" | "image/png" | "image/webp";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SeoPreset {
  slug: string;
  title: string;
  shortLabel: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  useCase: string;
  bestFor: string;
  steps: string[];
  faq: FaqItem[];
  width: number;
  height: number;
  category: string;
  relatedSlugs: string[];
  tags: string[];
}

export interface ExactSizePreset {
  dimensions: string;
  width: number;
  height: number;
  title: string;
  metaDescription: string;
  intro: string;
  useCase: string;
  relatedSlugs: string[];
}

export interface ToolConfig {
  presetSlug?: string;
  width: number;
  height: number;
  resizeMode: ResizeMode;
  lockAspectRatio: boolean;
  quality: number;
  outputFormat: OutputFormat;
  backgroundColor: string;
}

export interface CropSelection {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ToolImageItem {
  id: string;
  file: File;
  fileName: string;
  previewUrl: string;
  width: number;
  height: number;
  crop: { x: number; y: number };
  zoom: number;
  croppedAreaPixels?: CropSelection;
  status: "idle" | "processing" | "done" | "error";
  processedBlob?: Blob;
  processedUrl?: string;
  processedName?: string;
  processedSize?: number;
  errorMessage?: string;
}

export interface SavedPreset {
  id: string;
  name: string;
  userId: string;
  isFavorite: boolean;
  config: ToolConfig;
  createdAt: string;
  updatedAt: string;
}

export interface ToolUsageEvent {
  id: string;
  userId: string;
  action: "process" | "download" | "save-preset" | "open-dashboard";
  source: string;
  itemCount: number;
  createdAt: string;
}

export interface FeedbackFormData {
  name: string;
  email: string;
  message: string;
  page: string;
}

export interface UserProfile {
  id: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  isAnonymous: boolean;
  favoritePresetSlugs: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AdminSeoPresetInput {
  slug: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  useCase: string;
  bestFor: string;
  steps: string[];
  faq: FaqItem[];
  width: number;
  height: number;
  category: string;
  relatedSlugs: string[];
  tags: string[];
}
