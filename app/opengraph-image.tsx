import { ImageResponse } from "next/og";

import { BrandMark } from "@/components/brand-mark";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background:
            "linear-gradient(135deg, rgba(18,122,107,0.95) 0%, rgba(11,91,80,0.96) 55%, rgba(15,24,25,0.96) 100%)",
          color: "white",
          fontFamily: "sans-serif",
          padding: "64px",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 24,
            textTransform: "uppercase",
            letterSpacing: "0.3em",
          }}
        >
          <BrandMark style={{ height: 64, width: 64 }} title="PrivacyResize" />
          PrivacyResize
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 68, lineHeight: 1.04, fontWeight: 700, maxWidth: "80%" }}>
            Resize, crop, compress, and export image batches locally.
          </div>
          <div style={{ fontSize: 28, opacity: 0.86, maxWidth: "72%" }}>
            Secure image resizing with privacy-first local processing.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
