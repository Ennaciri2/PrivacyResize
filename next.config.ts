import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  typedRoutes: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async rewrites() {
    return [
      {
        source: "/resize-image-for-:slug",
        destination: "/presets/:slug",
      },
      {
        source: "/resize-image-:dimensions((?:\\d+)x(?:\\d+))",
        destination: "/sizes/:dimensions",
      },
    ];
  },
};

export default nextConfig;
