import type { MetadataRoute } from "next";
import { EXPERIENCE_CATEGORIES } from "@/lib/constants";
import { getDestinations, getJourneys, getPolicies, getStories } from "@/lib/data";
import { absoluteUrl } from "@/lib/utils";

/** Pages that are not driven by a collection. Add each new route here. */
const PAGES = [
  "/",
  "/about",
  "/journeys",
  "/destinations",
  "/experiences",
  "/travel-stories",
  "/plan-your-trip",
  "/contact",
];

/*
 * `lastModified` only where the record carries a real date — a guessed one
 * teaches crawlers to ignore the field. When Firestore lands, journeys and
 * destinations get theirs from an `updatedAt` field.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [journeys, destinations, stories, policies] = await Promise.all([
    getJourneys(),
    getDestinations(),
    getStories(),
    getPolicies(),
  ]);

  return [
    ...PAGES.map((path) => ({ url: absoluteUrl(path) })),
    ...journeys.map(({ slug }) => ({ url: absoluteUrl(`/journeys/${slug}`) })),
    ...destinations.map(({ slug }) => ({ url: absoluteUrl(`/destinations/${slug}`) })),
    ...EXPERIENCE_CATEGORIES.map(({ slug }) => ({ url: absoluteUrl(`/experiences/${slug}`) })),
    ...stories.map(({ slug, publishedAt, updatedAt }) => ({
      url: absoluteUrl(`/travel-stories/${slug}`),
      lastModified: updatedAt ?? publishedAt,
    })),
    ...policies.map(({ slug, updatedAt }) => ({
      url: absoluteUrl(`/${slug}`),
      lastModified: updatedAt,
    })),
  ];
}
