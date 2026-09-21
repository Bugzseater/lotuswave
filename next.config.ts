import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Unsplash carries placeholder photography until the R2 library is in.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
