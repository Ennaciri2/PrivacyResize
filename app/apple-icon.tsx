import { ImageResponse } from "next/og";

import { BrandMark } from "@/components/brand-mark";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "transparent",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <BrandMark style={{ height: 180, width: 180 }} title="PrivacyResize icon" />
      </div>
    ),
    size,
  );
}
