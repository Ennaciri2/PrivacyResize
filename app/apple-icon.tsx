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
          background: "linear-gradient(180deg, #0d1720 0%, #112735 100%)",
          borderRadius: 36,
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <BrandMark style={{ height: 152, width: 152 }} title="PrivacyResize icon" />
      </div>
    ),
    size,
  );
}
