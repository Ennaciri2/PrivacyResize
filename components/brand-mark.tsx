import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
  style?: CSSProperties;
  title?: string;
}

export function BrandMark({ className, style, title = "PrivacyResize" }: BrandMarkProps) {
  return (
    <svg
      aria-label={title}
      className={cn("size-10 shrink-0", className)}
      role="img"
      style={style}
      viewBox="0 0 240 240"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <defs>
        <linearGradient id="pr-bg" x1="28" x2="210" y1="24" y2="216" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#148978" />
          <stop offset="0.5" stopColor="#0F5F54" />
          <stop offset="1" stopColor="#0B2D55" />
        </linearGradient>
        <linearGradient id="pr-frame" x1="47" x2="194" y1="42" y2="198" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#13D6D7" />
          <stop offset="1" stopColor="#18F0E1" />
        </linearGradient>
        <linearGradient id="pr-screen" x1="81" x2="167" y1="78" y2="162" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0D7164" />
          <stop offset="0.5" stopColor="#0C6358" />
          <stop offset="1" stopColor="#0B2D55" />
        </linearGradient>
        <linearGradient id="pr-image" x1="82" x2="154" y1="110" y2="164" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#17E8E6" />
          <stop offset="1" stopColor="#127A6B" />
        </linearGradient>
        <linearGradient id="pr-arrow" x1="97" x2="157" y1="126" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#13D6D7" />
          <stop offset="1" stopColor="#147EEF" />
        </linearGradient>
      </defs>

      <rect
        fill="url(#pr-bg)"
        height="232"
        rx="42"
        stroke="#083D37"
        strokeWidth="4"
        width="232"
        x="4"
        y="4"
      />
      <rect
        fill="none"
        height="216"
        opacity="0.16"
        rx="36"
        stroke="#8BF8EF"
        strokeWidth="2"
        width="216"
        x="12"
        y="12"
      />

      <path
        d="M48 73V54c0-5.52 4.48-10 10-10h19"
        fill="none"
        stroke="url(#pr-frame)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="12"
      />
      <path
        d="M191 73V54c0-5.52-4.48-10-10-10h-19"
        fill="none"
        stroke="url(#pr-frame)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="12"
      />
      <path
        d="M48 167v19c0 5.52 4.48 10 10 10h19"
        fill="none"
        stroke="url(#pr-frame)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="12"
      />
      <path
        d="M191 167v19c0 5.52-4.48 10-10 10h-19"
        fill="none"
        stroke="url(#pr-frame)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="12"
      />

      <rect
        fill="url(#pr-screen)"
        height="96"
        rx="16"
        stroke="#093F48"
        strokeWidth="5"
        width="108"
        x="68"
        y="76"
      />
      <rect
        fill="none"
        height="84"
        opacity="0.5"
        rx="12"
        stroke="#84F3EC"
        strokeWidth="2"
        width="96"
        x="74"
        y="82"
      />
      <rect fill="url(#pr-image)" height="60" rx="11" width="78" x="82" y="100" />
      <circle cx="101" cy="123" fill="#B7FFF7" r="10" />
      <path d="M82 153v-12l20-18 18 14 17-16 23 21v11H82Z" fill="#0B5B50" opacity="0.95" />
      <path
        d="m112 136 29-30M132 106h21v21"
        fill="none"
        stroke="url(#pr-arrow)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="10"
      />

      <g transform="translate(142 104)">
        <path
          d="M11 23v-6c0-8.28 6.72-15 15-15s15 6.72 15 15v6"
          fill="none"
          stroke="#FFFFFF"
          strokeLinecap="round"
          strokeWidth="9"
        />
        <rect fill="#FFFFFF" height="54" rx="12" width="56" x="2" y="21" />
        <path
          d="M31 39a7.5 7.5 0 0 1 4.37 13.6v8.9h-8.74v-8.9A7.5 7.5 0 0 1 31 39Z"
          fill="#0B5B50"
        />
      </g>
    </svg>
  );
}
