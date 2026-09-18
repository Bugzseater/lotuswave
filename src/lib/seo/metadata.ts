import type { Metadata } from "next";

import { SITE_URL } from "@/lib/constants";
import type { ImageAsset, SeoFields } from "@/types";

/** Turn a route into an absolute URL. */
export function absoluteUrl(path = "/") {
  return new URL(path, `${SITE_URL}/`).toString();
}

interface BuildMetadataArgs {
  title: string;
  description: string;
  /** Route path, e.g. "/journeys/ceylon-tea-trail". */
  path: string;
  images?: ImageAsset[];
  seo?: SeoFields;
  /** "article" for stories, "website" for everything else. */
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * Single place where page metadata is assembled, so every route gets a
 * canonical URL, an OG image and consistent titles.
 */
export function buildMetadata({
  title,
  description,
  path,
  images = [],
  seo,
  type = "website",
  publishedTime,
  modifiedTime,
}: BuildMetadataArgs): Metadata {
  const resolvedTitle = seo?.metaTitle ?? title;
  const resolvedDescription = seo?.metaDescription ?? description;
  const ogImage = seo?.ogImage ?? images[0];
  const canonical = seo?.canonicalUrl ?? absoluteUrl(path);

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    keywords: seo?.keywords,
    alternates: { canonical },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type,
      url: canonical,
      title: resolvedTitle,
      description: resolvedDescription,
      siteName: "LotusWave Lanka Tours",
      locale: "en_GB",
      publishedTime,
      modifiedTime,
      images: ogImage
        ? [
            {
              url: ogImage.url,
              width: ogImage.width,
              height: ogImage.height,
              alt: ogImage.alt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: ogImage ? [ogImage.url] : undefined,
    },
  };
}
