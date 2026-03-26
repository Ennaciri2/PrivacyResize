import { ImageResponse } from "next/og";

import { BrandMark } from "@/components/brand-mark";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(180deg, #0d1720 0%, #112735 100%)",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <BrandMark style={{ height: 56, width: 56 }} title="PrivacyResize icon" />
      </div>
    ),
    size,
  );
}
