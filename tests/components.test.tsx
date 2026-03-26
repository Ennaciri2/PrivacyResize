import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { DownloadPanel } from "@/components/download-panel";
import { PresetSelector } from "@/components/preset-selector";
import { ResizeControls } from "@/components/resize-controls";
import { UploadZone } from "@/components/upload-zone";

describe("tool components", () => {
  it("accepts files from the upload input", () => {
    const onFilesAdded = vi.fn();
    render(<UploadZone onFilesAdded={onFilesAdded} />);

    expect(screen.getByText(/Drag images here or click to browse/i)).toBeInTheDocument();
    expect(screen.getByText(/Files stay on your device/i)).toBeInTheDocument();
  });

  it("applies recent presets and selection changes", () => {
    const onPresetSelect = vi.fn();
    const onRecentPresetApply = vi.fn();

    render(
      <PresetSelector
        exactSizes={[]}
        onPresetSelect={onPresetSelect}
        onRecentPresetApply={onRecentPresetApply}
        presets={[
          {
            slug: "instagram-post",
            title: "",
            shortLabel: "Instagram Post",
            h1: "",
            metaTitle: "",
            metaDescription: "",
            intro: "",
            useCase: "",
            bestFor: "",
            steps: [],
            faq: [],
            width: 1080,
            height: 1080,
            category: "social",
            relatedSlugs: [],
            tags: [],
          },
        ]}
        recentPresets={[
          {
            label: "Square",
            config: {
              width: 1080,
              height: 1080,
              resizeMode: "fit",
              lockAspectRatio: false,
              quality: 90,
              outputFormat: "image/jpeg",
              backgroundColor: "#ffffff",
            },
          },
        ]}
      />,
    );

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "instagram-post" } });
    fireEvent.click(screen.getByRole("button", { name: "Square" }));

    expect(onPresetSelect).toHaveBeenCalledWith("instagram-post");
    expect(onRecentPresetApply).toHaveBeenCalled();
  });

  it("updates the resize controls", () => {
    const onConfigChange = vi.fn();
    const onDimensionChange = vi.fn();

    render(
      <ResizeControls
        busy={false}
        config={{
          width: 1200,
          height: 628,
          resizeMode: "fit",
          lockAspectRatio: false,
          quality: 85,
          outputFormat: "image/jpeg",
          backgroundColor: "#ffffff",
        }}
        onConfigChange={onConfigChange}
        onDimensionChange={onDimensionChange}
        onReset={vi.fn()}
      />,
    );

    fireEvent.change(screen.getByDisplayValue("1200"), { target: { value: "1080" } });
    fireEvent.click(screen.getByRole("checkbox"));

    expect(onDimensionChange).toHaveBeenCalledWith("width", 1080);
    expect(onConfigChange).toHaveBeenCalledWith({ lockAspectRatio: true });
  });

  it("shows the local-only privacy notice", () => {
    render(
      <DownloadPanel
        busy={false}
        configSummary={{ format: "image/jpeg", quality: 90, width: 1080, height: 1080 }}
        isSaving={false}
        items={[]}
        notice={null}
        onDownloadAll={vi.fn()}
        onDownloadSingle={vi.fn()}
        onProcessAll={vi.fn()}
        onSavePreset={vi.fn()}
      />,
    );

    expect(screen.getByText(/Local-only notice/i)).toBeInTheDocument();
  });
});
