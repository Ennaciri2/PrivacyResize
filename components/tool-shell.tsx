"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import JSZip from "jszip";
import { useEffect, useRef, useState } from "react";

import { BatchQueue } from "@/components/batch-queue";
import { DownloadPanel } from "@/components/download-panel";
import { PresetSelector } from "@/components/preset-selector";
import { ResizeControls } from "@/components/resize-controls";
import { UploadZone } from "@/components/upload-zone";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { exactSizePresets } from "@/data/exact-sizes";
import { seoPresets } from "@/data/seo-presets";
import { useAuth } from "@/components/providers/auth-provider";
import { getImageDimensions, processImage } from "@/lib/browser-image";
import { savePresetForUser, trackToolUsage } from "@/lib/firebase/firestore";
import { clamp, triggerDownload } from "@/lib/utils";
import type { ToolConfig, ToolImageItem } from "@/types";

const Cropper = dynamic(() => import("react-easy-crop"), { ssr: false }) as unknown as typeof import("react-easy-crop").default;

const RECENT_PRESETS_KEY = "privacyresize:recent-presets";

function getInitialConfig(defaultPresetSlug?: string, defaultDimensions?: string): ToolConfig {
  const preset = defaultPresetSlug ? seoPresets.find((item) => item.slug === defaultPresetSlug) : undefined;
  const exact = defaultDimensions
    ? exactSizePresets.find((item) => item.dimensions === defaultDimensions)
    : undefined;

  return {
    presetSlug: preset?.slug,
    width: preset?.width ?? exact?.width ?? 1080,
    height: preset?.height ?? exact?.height ?? 1080,
    resizeMode: "fit",
    lockAspectRatio: false,
    quality: 90,
    outputFormat: "image/jpeg",
    backgroundColor: "#ffffff",
  };
}

function getPresetLabel(config: ToolConfig) {
  const preset = seoPresets.find((item) => item.slug === config.presetSlug);
  return preset ? preset.shortLabel : `${config.width}x${config.height}`;
}

interface ToolShellProps {
  defaultDimensions?: string;
  defaultPresetSlug?: string;
  sourceLabel?: string;
}

interface RecentPreset {
  label: string;
  config: ToolConfig;
}

export function ToolShell({
  defaultDimensions,
  defaultPresetSlug,
  sourceLabel = "tool-page",
}: ToolShellProps) {
  const initialConfig = getInitialConfig(defaultPresetSlug, defaultDimensions);
  const [config, setConfig] = useState<ToolConfig>(initialConfig);
  const [items, setItems] = useState<ToolImageItem[]>([]);
  const [activeImageId, setActiveImageId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [recentPresets, setRecentPresets] = useState<RecentPreset[]>([]);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const createdUrls = useRef(new Set<string>());
  const { continueAsGuest, isConfigured, user } = useAuth();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const raw = window.localStorage.getItem(RECENT_PRESETS_KEY);

    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw) as RecentPreset[];
      setRecentPresets(parsed.slice(0, 4));
    } catch {
      window.localStorage.removeItem(RECENT_PRESETS_KEY);
    }
  }, []);

  useEffect(() => {
    const urls = createdUrls.current;

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
      urls.clear();
    };
  }, []);

  const activeItem = items.find((item) => item.id === activeImageId) ?? null;

  function updateConfig(nextConfig: Partial<ToolConfig>) {
    setConfig((current) => ({
      ...current,
      ...nextConfig,
    }));
  }

  function rememberPresetLocally(nextConfig: ToolConfig) {
    if (typeof window === "undefined") {
      return;
    }

    const nextEntry = {
      label: getPresetLabel(nextConfig),
      config: nextConfig,
    };
    const nextRecentPresets = [
      nextEntry,
      ...recentPresets.filter(
        (item) =>
          item.config.width !== nextConfig.width ||
          item.config.height !== nextConfig.height ||
          item.config.outputFormat !== nextConfig.outputFormat ||
          item.config.resizeMode !== nextConfig.resizeMode,
      ),
    ].slice(0, 4);

    setRecentPresets(nextRecentPresets);
    window.localStorage.setItem(RECENT_PRESETS_KEY, JSON.stringify(nextRecentPresets));
  }

  function updateDimensions(field: "width" | "height", value: number) {
    setConfig((current) => {
      const safeValue = clamp(Math.round(value), 32, 12_000);

      if (!current.lockAspectRatio || !current.width || !current.height) {
        return {
          ...current,
          [field]: safeValue,
          presetSlug: undefined,
        };
      }

      const ratio = current.width / current.height;

      return field === "width"
        ? {
            ...current,
            width: safeValue,
            height: clamp(Math.round(safeValue / ratio), 32, 12_000),
            presetSlug: undefined,
          }
        : {
            ...current,
            width: clamp(Math.round(safeValue * ratio), 32, 12_000),
            height: safeValue,
            presetSlug: undefined,
          };
    });
  }

  async function addFiles(files: File[]) {
    setNotice(null);

    const nextItems = await Promise.all(
      files.map(async (file) => {
        const previewUrl = URL.createObjectURL(file);
        createdUrls.current.add(previewUrl);
        const dimensions = await getImageDimensions(previewUrl);

        return {
          id: crypto.randomUUID(),
          file,
          fileName: file.name,
          previewUrl,
          width: dimensions.width,
          height: dimensions.height,
          crop: { x: 0, y: 0 },
          zoom: 1,
          status: "idle",
        } satisfies ToolImageItem;
      }),
    );

    setItems((current) => [...current, ...nextItems]);
    setActiveImageId((current) => current ?? nextItems[0]?.id ?? null);
  }

  function removeImage(id: string) {
    setItems((current) => {
      const item = current.find((entry) => entry.id === id);

      if (item) {
        URL.revokeObjectURL(item.previewUrl);
        createdUrls.current.delete(item.previewUrl);

        if (item.processedUrl) {
          URL.revokeObjectURL(item.processedUrl);
          createdUrls.current.delete(item.processedUrl);
        }
      }

      const nextItems = current.filter((entry) => entry.id !== id);

      if (activeImageId === id) {
        setActiveImageId(nextItems[0]?.id ?? null);
      }

      return nextItems;
    });
  }

  function clearAll() {
    items.forEach((item) => {
      URL.revokeObjectURL(item.previewUrl);
      createdUrls.current.delete(item.previewUrl);

      if (item.processedUrl) {
        URL.revokeObjectURL(item.processedUrl);
        createdUrls.current.delete(item.processedUrl);
      }
    });

    setItems([]);
    setActiveImageId(null);
    setProgress({ current: 0, total: 0 });
    setNotice(null);
  }

  function resetAll() {
    clearAll();
    setConfig(getInitialConfig(defaultPresetSlug, defaultDimensions));
  }

  function applyPreset(value: string) {
    if (!value) {
      setConfig((current) => ({ ...current, presetSlug: undefined }));
      return;
    }

    if (value.startsWith("size:")) {
      const exact = exactSizePresets.find((item) => item.dimensions === value.replace("size:", ""));

      if (exact) {
        const nextConfig = {
          ...config,
          presetSlug: undefined,
          width: exact.width,
          height: exact.height,
        };

        setConfig(nextConfig);
        rememberPresetLocally(nextConfig);
      }

      return;
    }

    const preset = seoPresets.find((item) => item.slug === value);

    if (!preset) {
      return;
    }

    const nextConfig = {
      ...config,
      presetSlug: preset.slug,
      width: preset.width,
      height: preset.height,
    };

    setConfig(nextConfig);
    rememberPresetLocally(nextConfig);
  }

  async function processAllImages() {
    if (!items.length) {
      setNotice("Add at least one image before processing.");
      return;
    }

    setIsProcessing(true);
    setNotice(null);
    setProgress({ current: 0, total: items.length });

    for (const item of items) {
      setItems((current) =>
        current.map((entry) =>
          entry.id === item.id
            ? { ...entry, status: "processing", errorMessage: undefined }
            : entry,
        ),
      );

      try {
        const result = await processImage({
          config,
          cropSelection: item.croppedAreaPixels,
          fileName: item.fileName,
          sourceUrl: item.previewUrl,
        });
        const processedUrl = URL.createObjectURL(result.blob);
        createdUrls.current.add(processedUrl);

        setItems((current) =>
          current.map((entry) =>
            entry.id === item.id
              ? {
                  ...entry,
                  processedBlob: result.blob,
                  processedName: result.fileName,
                  processedSize: result.blob.size,
                  processedUrl,
                  status: "done",
                }
              : entry,
          ),
        );
      } catch (error) {
        const message = error instanceof Error ? error.message : "Image processing failed.";
        setItems((current) =>
          current.map((entry) =>
            entry.id === item.id
              ? {
                  ...entry,
                  status: "error",
                  errorMessage: message,
                }
              : entry,
          ),
        );
      } finally {
        setProgress((current) => ({ ...current, current: current.current + 1 }));
      }
    }

    if (user?.uid) {
      await trackToolUsage(user.uid, "process", sourceLabel, items.length);
    }

    setIsProcessing(false);
    rememberPresetLocally(config);
  }

  function downloadSingleImage(id: string) {
    const item = items.find((entry) => entry.id === id);

    if (!item?.processedUrl || !item.processedName) {
      return;
    }

    triggerDownload(item.processedUrl, item.processedName);

    if (user?.uid) {
      void trackToolUsage(user.uid, "download", sourceLabel, 1);
    }
  }

  async function downloadAllAsZip() {
    const readyItems = items.filter((item) => item.processedBlob && item.processedName);

    if (!readyItems.length) {
      setNotice("Process at least one image before downloading a ZIP.");
      return;
    }

    const zip = new JSZip();

    readyItems.forEach((item) => {
      zip.file(item.processedName!, item.processedBlob!);
    });

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const zipUrl = URL.createObjectURL(zipBlob);
    createdUrls.current.add(zipUrl);
    triggerDownload(zipUrl, "privacyresize-export.zip");

    if (user?.uid) {
      await trackToolUsage(user.uid, "download", sourceLabel, readyItems.length);
    }
  }

  async function savePreset() {
    setIsSaving(true);
    setNotice(null);

    try {
      rememberPresetLocally(config);

      if (!isConfigured) {
        setNotice("Preset saved locally. Add Firebase config to sync presets across sessions.");
        return;
      }

      const persistenceUser = user ?? (await continueAsGuest());

      if (!persistenceUser) {
        setNotice("Preset saved locally. Sign in later to sync it to Firestore.");
        return;
      }

      await savePresetForUser(persistenceUser.uid, getPresetLabel(config), config);
      await trackToolUsage(persistenceUser.uid, "save-preset", sourceLabel, items.length || 1);
      setNotice("Preset saved to your account and stored locally for quick reuse.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Could not save the preset right now.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-accent/18 bg-accent-soft/65">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Local-first workflow</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
              Resize and export right in the browser
            </h2>
          </div>
          {progress.total ? (
            <div className="min-w-56 space-y-2 rounded-[1.4rem] border border-accent/16 bg-white/70 p-4">
              <div className="flex items-center justify-between text-sm text-foreground/68">
                <span>Batch progress</span>
                <span className="font-semibold text-foreground">
                  {progress.current}/{progress.total}
                </span>
              </div>
              <div className="h-2 rounded-full bg-accent-soft">
                <div
                  className="h-2 rounded-full bg-accent transition-all"
                  style={{ width: `${(progress.current / progress.total) * 100}%` }}
                />
              </div>
            </div>
          ) : null}
        </div>
      </Card>
      <UploadZone disabled={isProcessing} onFilesAdded={(files) => void addFiles(files)} />
      <div className="grid gap-6 xl:grid-cols-[1.15fr_1.1fr_0.95fr]">
        <div className="space-y-6">
          <PresetSelector
            exactSizes={exactSizePresets}
            onPresetSelect={applyPreset}
            onRecentPresetApply={(nextConfig) => setConfig(nextConfig)}
            presets={seoPresets}
            recentPresets={recentPresets}
            selectedPresetSlug={config.presetSlug}
          />
          <BatchQueue
            activeImageId={activeImageId}
            items={items}
            onClearAll={clearAll}
            onRemoveImage={removeImage}
            onSelectImage={setActiveImageId}
          />
        </div>
        <div className="space-y-6">
          <Card className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Preview</p>
              <h2 className="text-xl font-semibold text-foreground">Crop and frame the active image</h2>
            </div>
            {activeItem ? (
              <div className="space-y-4">
                <div className="relative min-h-[420px] overflow-hidden rounded-[1.5rem] border border-border bg-[#0f1819]">
                  {config.resizeMode === "crop" ? (
                    <Cropper
                      aspect={config.width / config.height}
                      crop={activeItem.crop}
                      image={activeItem.previewUrl}
                      onCropChange={(crop) => {
                        setItems((current) =>
                          current.map((entry) => (entry.id === activeItem.id ? { ...entry, crop } : entry)),
                        );
                      }}
                      onCropComplete={(_, croppedAreaPixels) => {
                        setItems((current) =>
                          current.map((entry) =>
                            entry.id === activeItem.id
                              ? {
                                  ...entry,
                                  croppedAreaPixels: {
                                    x: croppedAreaPixels.x,
                                    y: croppedAreaPixels.y,
                                    width: croppedAreaPixels.width,
                                    height: croppedAreaPixels.height,
                                  },
                                }
                              : entry,
                          ),
                        );
                      }}
                      onZoomChange={(zoom) => {
                        setItems((current) =>
                          current.map((entry) => (entry.id === activeItem.id ? { ...entry, zoom } : entry)),
                        );
                      }}
                      zoom={activeItem.zoom}
                    />
                  ) : (
                    <Image
                      alt={activeItem.fileName}
                      className="object-contain"
                      fill
                      sizes="(min-width: 1280px) 40vw, 100vw"
                      src={activeItem.previewUrl}
                      unoptimized
                    />
                  )}
                </div>
                {config.resizeMode === "crop" ? (
                  <label className="space-y-2 text-sm text-foreground/68">
                    <span className="flex items-center justify-between font-semibold text-foreground">
                      Zoom
                      <span>{activeItem.zoom.toFixed(1)}x</span>
                    </span>
                    <input
                      className="w-full accent-[var(--accent)]"
                      max={3}
                      min={1}
                      onChange={(event) => {
                        const zoom = Number(event.target.value);
                        setItems((current) =>
                          current.map((entry) => (entry.id === activeItem.id ? { ...entry, zoom } : entry)),
                        );
                      }}
                      step={0.1}
                      type="range"
                      value={activeItem.zoom}
                    />
                  </label>
                ) : null}
              </div>
            ) : (
              <div className="rounded-[1.5rem] border border-dashed border-border-strong bg-white/75 px-6 py-12 text-center text-sm leading-7 text-foreground/62">
                Upload a few images to unlock preview, queue management, crop mode, and ZIP export.
              </div>
            )}
          </Card>
          <div className="rounded-[1.4rem] border border-border bg-white/75 px-5 py-4 text-sm leading-7 text-foreground/68">
            Tip: use <strong>fit</strong> when you want the whole image preserved, <strong>fill</strong> when you want
            automatic edge-to-edge framing, and <strong>crop</strong> when you want manual control over the final cut.
          </div>
        </div>
        <div className="space-y-6">
          <ResizeControls
            busy={isProcessing}
            config={config}
            onConfigChange={updateConfig}
            onDimensionChange={updateDimensions}
            onReset={resetAll}
          />
          <DownloadPanel
            busy={isProcessing}
            configSummary={{
              format: config.outputFormat,
              quality: config.quality,
              width: config.width,
              height: config.height,
            }}
            isSaving={isSaving}
            items={items}
            notice={notice}
            onDownloadAll={() => void downloadAllAsZip()}
            onDownloadSingle={downloadSingleImage}
            onProcessAll={() => void processAllImages()}
            onSavePreset={() => void savePreset()}
          />
          {!items.length ? (
            <Button fullWidth onClick={() => applyPreset(config.presetSlug ?? "instagram-post")} variant="secondary">
              Try the Instagram preset
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
