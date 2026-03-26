"use client";

import Pica from "pica";

import type { CropSelection, ToolConfig } from "@/types";
import { clamp, outputExtension, sanitizeFileBaseName } from "@/lib/utils";

const pica = Pica();

function loadImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Could not load the selected image."));
    image.src = url;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, type: ToolConfig["outputFormat"], quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("The browser could not create an output file."));
          return;
        }

        resolve(blob);
      },
      type,
      quality / 100,
    );
  });
}

function getCenteredCrop(
  sourceWidth: number,
  sourceHeight: number,
  targetWidth: number,
  targetHeight: number,
): CropSelection {
  const targetRatio = targetWidth / targetHeight;
  const sourceRatio = sourceWidth / sourceHeight;

  if (sourceRatio > targetRatio) {
    const width = sourceHeight * targetRatio;
    return {
      width,
      height: sourceHeight,
      x: (sourceWidth - width) / 2,
      y: 0,
    };
  }

  const height = sourceWidth / targetRatio;

  return {
    width: sourceWidth,
    height,
    x: 0,
    y: (sourceHeight - height) / 2,
  };
}

function drawCroppedCanvas(
  image: HTMLImageElement,
  crop: CropSelection,
  backgroundColor: string,
  fillBackground: boolean,
) {
  const sourceCanvas = document.createElement("canvas");
  sourceCanvas.width = Math.round(crop.width);
  sourceCanvas.height = Math.round(crop.height);
  const sourceContext = sourceCanvas.getContext("2d");

  if (!sourceContext) {
    throw new Error("Canvas is not available in this browser.");
  }

  if (fillBackground) {
    sourceContext.fillStyle = backgroundColor;
    sourceContext.fillRect(0, 0, sourceCanvas.width, sourceCanvas.height);
  }

  sourceContext.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    sourceCanvas.width,
    sourceCanvas.height,
  );

  return sourceCanvas;
}

export async function getImageDimensions(url: string) {
  const image = await loadImage(url);

  return {
    width: image.naturalWidth,
    height: image.naturalHeight,
  };
}

export async function processImage({
  config,
  cropSelection,
  fileName,
  sourceUrl,
}: {
  config: ToolConfig;
  cropSelection?: CropSelection;
  fileName: string;
  sourceUrl: string;
}) {
  const image = await loadImage(sourceUrl);
  const targetWidth = Math.round(config.width);
  const targetHeight = Math.round(config.height);
  const fillBackground = config.outputFormat !== "image/png";

  const finalCanvas = document.createElement("canvas");
  finalCanvas.width = targetWidth;
  finalCanvas.height = targetHeight;
  const finalContext = finalCanvas.getContext("2d");

  if (!finalContext) {
    throw new Error("Canvas rendering is not available in this browser.");
  }

  if (fillBackground) {
    finalContext.fillStyle = config.backgroundColor;
    finalContext.fillRect(0, 0, targetWidth, targetHeight);
  }

  if (config.resizeMode === "fit") {
    const sourceCanvas = drawCroppedCanvas(
      image,
      {
        width: image.naturalWidth,
        height: image.naturalHeight,
        x: 0,
        y: 0,
      },
      config.backgroundColor,
      fillBackground,
    );
    const sourceRatio = image.naturalWidth / image.naturalHeight;
    const targetRatio = targetWidth / targetHeight;
    const fitWidth = Math.round(targetRatio > sourceRatio ? targetHeight * sourceRatio : targetWidth);
    const fitHeight = Math.round(targetRatio > sourceRatio ? targetHeight : targetWidth / sourceRatio);
    const resizedCanvas = document.createElement("canvas");
    resizedCanvas.width = clamp(fitWidth, 1, targetWidth);
    resizedCanvas.height = clamp(fitHeight, 1, targetHeight);
    await pica.resize(sourceCanvas, resizedCanvas, { quality: 3, alpha: true });
    finalContext.drawImage(
      resizedCanvas,
      Math.round((targetWidth - resizedCanvas.width) / 2),
      Math.round((targetHeight - resizedCanvas.height) / 2),
    );
  } else {
    const crop =
      config.resizeMode === "crop" && cropSelection
        ? cropSelection
        : getCenteredCrop(image.naturalWidth, image.naturalHeight, targetWidth, targetHeight);
    const sourceCanvas = drawCroppedCanvas(image, crop, config.backgroundColor, fillBackground);
    await pica.resize(sourceCanvas, finalCanvas, { quality: 3, alpha: true });
  }

  const blob = await canvasToBlob(finalCanvas, config.outputFormat, config.quality);
  const extension = outputExtension(config.outputFormat);
  const nextFileName = `${sanitizeFileBaseName(fileName)}-${targetWidth}x${targetHeight}.${extension}`;

  return {
    blob,
    fileName: nextFileName,
  };
}
