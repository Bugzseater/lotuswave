import { ImageResponse } from "next/og";

import { getSettings } from "@/lib/data";

export const alt = "LotusWave Lanka Tours — agro & wellness travel in Sri Lanka";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Site-wide social card.
 *
 * `next/og` renders with Satori, which cannot read CSS variables, so the brand
 * values are repeated here as literals. This file, the other
 * `opengraph-image.tsx` routes, `src/app/manifest.ts` and
 * `src/styles/globals.css` are the only places a hex code belongs.
 */
const BRAND = "#652D90";
const WHITE = "#FFFFFF";

export default async function Image() {
  const settings = await getSettings();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: BRAND,
          color: WHITE,
          fontSize: 64,
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 4, opacity: 0.85 }}>
          SRI LANKA
        </div>
        <div style={{ marginTop: 24, lineHeight: 1.1 }}>
          {settings.siteName}
        </div>
        <div style={{ marginTop: 24, fontSize: 32, opacity: 0.9 }}>
          {settings.tagline}
        </div>
      </div>
    ),
    size,
  );
}
