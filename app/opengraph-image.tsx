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
          alignItems: "stretch",
          background:
            "radial-gradient(circle at 72% 22%, rgba(19,214,215,0.18), transparent 18%), radial-gradient(circle at 14% 12%, rgba(18,122,107,0.16), transparent 24%), linear-gradient(180deg, rgba(255,255,255,0.78), rgba(245,244,239,1) 62%)",
          color: "#132125",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          fontFamily: "sans-serif",
          justifyContent: "space-between",
          padding: "58px 70px",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            gap: 18,
            opacity: 0.88,
          }}
        >
          <BrandMark style={{ height: 74, width: 74 }} title="PrivacyResize" />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div
              style={{
                color: "rgba(19,33,37,0.62)",
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
              }}
            >
              Secure image resizer
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 34,
                fontWeight: 700,
                letterSpacing: "-0.04em",
              }}
            >
              <span style={{ color: "#132125" }}>Privacy</span>
              <span style={{ color: "#127A6B", textShadow: "0 0 22px rgba(19,214,215,0.22)" }}>Resize</span>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: "76%" }}>
          <div style={{ color: "#132125", fontSize: 68, fontWeight: 700, letterSpacing: "-0.05em", lineHeight: 1.02 }}>
            Resize, crop, and export image batches without default uploads.
          </div>
          <div style={{ color: "rgba(19,33,37,0.72)", fontSize: 28, lineHeight: 1.35 }}>
            PrivacyResize keeps the core workflow in the browser, then gives creators and teams clean files fast.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
