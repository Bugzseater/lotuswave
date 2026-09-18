import type { NextConfig } from "next";

/**
 * Production imagery is served from a Cloudflare R2 bucket behind a public URL.
 * The hostname is derived from NEXT_PUBLIC_R2_PUBLIC_URL so the same config
 * works across environments; if it is unset or malformed we simply skip it.
 */
function r2RemotePattern() {
  const publicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;
  if (!publicUrl) return [];

  try {
    const { hostname, protocol } = new URL(publicUrl);
    return [
      {
        protocol: protocol.replace(":", "") as "http" | "https",
        hostname,
      },
    ];
  } catch {
    console.warn(
      `[next.config] NEXT_PUBLIC_R2_PUBLIC_URL is not a valid URL: ${publicUrl}`,
    );
    return [];
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      ...r2RemotePattern(),
      // Placeholder imagery while the site runs on mock data.
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
