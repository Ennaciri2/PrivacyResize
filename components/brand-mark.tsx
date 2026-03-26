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
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <path
        d="M32 3 49.5 8.8a4.3 4.3 0 0 1 3 4.1v14.9c0 12.2-7.1 23.2-18.3 28.2a5.7 5.7 0 0 1-4.4 0C18.6 51 11.5 40 11.5 27.8V12.9a4.3 4.3 0 0 1 3-4.1L32 3Z"
        fill="#0B2D55"
      />
      <path
        d="M14 14.4c0-1.5 1-2.9 2.5-3.4L32 6l15.5 5a3.5 3.5 0 0 1 2.5 3.4v8.1c-6.7 5.2-15 8-24.4 8.1-4.6 0-8.5-.7-11.6-2.1V14.4Z"
        fill="#13D6D7"
      />
      <path
        d="M15.2 29.8c3.3 1.4 7 2.1 11.2 2.1 9.4-.1 17.3-2.9 23.6-8.2v4.1c0 11.1-6.4 21.2-16.6 25.8a4 4 0 0 1-3 0c-7.2-3.2-12.5-9.4-15.2-16.7V29.8Z"
        fill="#147EEF"
      />
      <rect fill="none" height="18" rx="2.8" stroke="#FFF" strokeWidth="3.5" width="27" x="17" y="18" />
      <circle cx="23.5" cy="24.3" fill="#FFF" r="3.1" />
      <path d="M20 34.3h21v-1.7l-6.3-7.2-6.1 6-4.9-3.8-3.7 3.6v3.1Z" fill="#FFF" />
      <path
        d="m22.2 33.1 9.1 3-2.8 1.8 4.8 4.9-3.6 3.4-4.8-5-1.9 2.6-2.7-10.7Z"
        fill="#FFF"
        stroke="#0B2D55"
        strokeLinejoin="round"
        strokeWidth="1.3"
      />
      <path d="M41.2 22.8h3.3a4.5 4.5 0 0 1 4.5 4.5v8.5H36.7v-8.5a4.5 4.5 0 0 1 4.5-4.5Z" fill="#FFF" />
      <path d="M40.2 22.8v-1.4a2.7 2.7 0 1 1 5.4 0v1.4" fill="none" stroke="#FFF" strokeWidth="2" />
      <path d="M42.6 29.8a2.2 2.2 0 1 1 3.9 1.4l-.4.5v1.8h-1.8v-1.8l-.4-.5a2.1 2.1 0 0 1-.4-1.4Z" fill="#0B2D55" />
    </svg>
  );
}
