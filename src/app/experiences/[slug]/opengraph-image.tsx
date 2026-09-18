import { ImageResponse } from "next/og";

import { getExperienceBySlug } from "@/lib/data";

export const alt = "LotusWave Lanka Tours experience";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Satori cannot read CSS variables, so the brand values are literal here.
 * Agro and wellness share one card treatment — the theme is not a colour.
 */
const BRAND = "#652D90";
const WHITE = "#FFFFFF";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const experience = await getExperienceBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "80px",
          background: BRAND,
          color: WHITE,
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 4, opacity: 0.85 }}>
          EXPERIENCE
        </div>
        <div style={{ fontSize: 64, marginTop: 16, lineHeight: 1.1 }}>
          {experience?.title ?? "LotusWave Lanka Tours"}
        </div>
      </div>
    ),
    size,
  );
}
