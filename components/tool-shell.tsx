"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import JSZip from "jszip";
import { useEffect, useRef, useState } from "react";

import { BatchQueue } from "@/components/batch-queue";
import { DownloadPanel } from "@/components/download-panel";
import { OutputSettings } from "@/components/output-settings";
import { PresetSelector } from "@/components/preset-selector";
import { useAuth } from "@/components/providers/auth-provider";
import { ResizeControls } from "@/components/resize-controls";
import { UploadZone } from "@/components/upload-zone";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { exactSizePresets } from "@/data/exact-sizes";
import { seoPresets } from "@/data/seo-presets";
import { getImageDimensions, processImage } from "@/lib/browser-image";
import { savePresetForUser, trackToolUsage } from "@/lib/firebase/firestore";
import { clamp, triggerDownload } from "@/lib/utils";
import type { ToolConfig, ToolImageItem } from "@/types";

const Cropper = dynamic(() => import("react-easy-crop"), {
  ssr: false,
}) as unknown as typeof import("react-easy-crop").default;

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
  const processedItems = items.filter((item) => item.status === "done");
  const progressRatio = progress.total ? Math.min((progress.current / progress.total) * 100, 100) : 0;

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
      <Card className="overflow-hidden rounded-[2rem] border-border/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(255,255,255,0.76))] p-6 sm:p-7">
        <div className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr] xl:items-center">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Local-first workflow</p>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-[2rem]">
                Upload, choose a target, process locally, export clean files fast
              </h2>
            </div>
            <p className="max-w-3xl text-sm leading-7 text-foreground/66 sm:text-[0.96rem]">
              The layout keeps the first action obvious, keeps privacy visible, and keeps export controls separate from
              editing so the path from upload to ZIP stays easy to scan.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {[
                "No login required to start",
                "Images stay on-device by default",
                "Presets, exact sizes, JPG, PNG, WebP",
              ].map((item) => (
                <span
                  className="rounded-full border border-border bg-white/84 px-4 py-2 text-sm font-medium text-foreground/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.82)]"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            <div className="rounded-[1.5rem] border border-border bg-white/82 px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.82)]">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-foreground/46">Preset</p>
              <p className="mt-2 text-lg font-semibold text-foreground">{getPresetLabel(config)}</p>
            </div>
            <div className="rounded-[1.5rem] border border-border bg-white/82 px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.82)]">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-foreground/46">Queue</p>
              <p className="mt-2 text-lg font-semibold text-foreground">{items.length} loaded</p>
            </div>
            <div className="rounded-[1.5rem] border border-border bg-white/82 px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.82)]">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-foreground/46">Exports</p>
              <p className="mt-2 text-lg font-semibold text-foreground">{processedItems.length} ready</p>
            </div>
          </div>
        </div>
        {progress.total ? (
          <div className="mt-5 rounded-[1.5rem] border border-brand-cyan/24 bg-[linear-gradient(135deg,rgba(18,122,107,0.09),rgba(19,214,215,0.12))] p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">Batch progress</p>
                <p className="text-sm text-foreground/62">
                  {progress.current} of {progress.total} image{progress.total > 1 ? "s" : ""} processed
                </p>
              </div>
              <span className="text-sm font-semibold text-brand-navy">{Math.round(progressRatio)}%</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-accent-soft">
              <div
                className="h-2 rounded-full bg-[linear-gradient(90deg,var(--color-accent),var(--color-brand-cyan),var(--color-brand-blue))] transition-all"
                style={{ width: `${progressRatio}%` }}
              />
            </div>
          </div>
        ) : null}
      </Card>

      <UploadZone disabled={isProcessing} onFilesAdded={(files) => void addFiles(files)} />

      <div className="grid gap-6 xl:grid-cols-[1fr_1.08fr_0.94fr]">
        <div className="space-y-6">
          <PresetSelector
            exactSizes={exactSizePresets}
            onPresetSelect={applyPreset}
            onRecentPresetApply={(nextConfig) => setConfig(nextConfig)}
            presets={seoPresets}
            recentPresets={recentPresets}
            selectedPresetSlug={config.presetSlug}
          />
          <ResizeControls
            busy={isProcessing}
            config={config}
            onConfigChange={updateConfig}
            onDimensionChange={updateDimensions}
            onReset={resetAll}
          />
          <OutputSettings config={config} onConfigChange={updateConfig} />
        </div>

        <div className="space-y-6">
          <Card className="space-y-5 rounded-[1.9rem] p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-1">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Live preview</p>
                <h2 className="text-xl font-semibold text-foreground">Check framing before export</h2>
                <p className="text-sm leading-7 text-foreground/62">
                  Crop mode gives manual framing. Fit and fill keep straightforward batches fast.
                </p>
              </div>
              <div className="rounded-full border border-border bg-white/84 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-navy">
                {config.width} x {config.height}
              </div>
            </div>
            {activeItem ? (
              <div className="preview-swap-in space-y-4" key={activeItem.id}>
                <div className="relative min-h-[420px] overflow-hidden rounded-[1.65rem] border border-border bg-[#0f1819] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
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
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[1.2rem] border border-border bg-white/82 px-4 py-3">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-foreground/46">Active file</p>
                    <p className="mt-2 truncate text-sm font-semibold text-foreground">{activeItem.fileName}</p>
                  </div>
                  <div className="rounded-[1.2rem] border border-border bg-white/82 px-4 py-3">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-foreground/46">Source size</p>
                    <p className="mt-2 text-sm font-semibold text-foreground">
                      {activeItem.width} x {activeItem.height}
                    </p>
                  </div>
                  <div className="rounded-[1.2rem] border border-border bg-white/82 px-4 py-3">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-foreground/46">Mode</p>
                    <p className="mt-2 text-sm font-semibold capitalize text-foreground">{config.resizeMode}</p>
                  </div>
                </div>
                {config.resizeMode === "crop" ? (
                  <label className="space-y-2 rounded-[1.4rem] border border-border bg-white/80 p-4 text-sm text-foreground/68">
                    <span className="flex items-center justify-between font-semibold text-foreground">
                      Zoom
                      <span className="rounded-full bg-accent-soft px-3 py-1 text-xs text-brand-navy">
                        {activeItem.zoom.toFixed(1)}x
                      </span>
                    </span>
                    <input
                      className="w-full accent-[var(--brand-blue)]"
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
                Upload a few images to unlock preview, crop mode, queue management, and one-click ZIP export.
              </div>
            )}
          </Card>

          <BatchQueue
            activeImageId={activeImageId}
            items={items}
            onClearAll={clearAll}
            onRemoveImage={removeImage}
            onSelectImage={setActiveImageId}
          />
        </div>

        <div className="space-y-6 xl:sticky xl:top-24 xl:self-start">
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
          <Card className="rounded-[1.8rem] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Quick guide</p>
            <ol className="mt-4 space-y-3 text-sm leading-7 text-foreground/66">
              <li>1. Drop one image or a full batch.</li>
              <li>2. Pick a preset or type an exact size.</li>
              <li>3. Process locally and download ready files.</li>
            </ol>
          </Card>
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
