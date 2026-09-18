import type { MetadataRoute } from "next";

import { getSettings } from "@/lib/data";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const settings = await getSettings();

  return {
    name: settings.siteName,
    short_name: "LotusWave",
    description: settings.description,
    start_url: "/",
    display: "standalone",
    // The browser reads this outside any stylesheet, so it cannot use the
    // tokens. Kept in sync with --color-white and --color-brand.
    background_color: "#ffffff",
    theme_color: "#652d90",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
