import type { MetadataRoute } from "next";

import {
  DESTINATION_CATEGORIES,
  EXPERIENCE_CATEGORIES,
  EXPERIENCE_THEMES,
  JOURNEY_CATEGORIES,
  REGIONS,
  STORY_CATEGORIES,
} from "@/lib/constants";
import {
  getDestinations,
  getExperiences,
  getJourneys,
  getStories,
} from "@/lib/data";
import { absoluteUrl } from "@/lib/seo/metadata";

const STATIC_ROUTES = [
  "/",
  "/experiences",
  "/journeys",
  "/destinations",
  "/travel-stories",
  "/plan-your-trip",
  "/about",
  "/about/our-team",
  "/about/responsible-travel",
  "/about/why-travel-with-us",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [experiences, journeys, destinations, stories] = await Promise.all([
    getExperiences(),
    getJourneys(),
    getDestinations(),
    getStories(),
  ]);

  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: absoluteUrl(route),
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.8,
  }));

  for (const experience of experiences) {
    entries.push({
      url: absoluteUrl(`/experiences/${experience.slug}`),
      lastModified: experience.updatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const journey of journeys) {
    entries.push({
      url: absoluteUrl(`/journeys/${journey.slug}`),
      lastModified: journey.updatedAt,
      changeFrequency: "monthly",
      priority: 0.9,
    });
  }

  for (const destination of destinations) {
    entries.push({
      url: absoluteUrl(`/destinations/${destination.slug}`),
      lastModified: destination.updatedAt,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const story of stories) {
    entries.push({
      url: absoluteUrl(`/travel-stories/${story.slug}`),
      lastModified: story.updatedAt,
      changeFrequency: "yearly",
      priority: 0.5,
    });
  }

  for (const category of [...EXPERIENCE_CATEGORIES, ...EXPERIENCE_THEMES]) {
    entries.push({
      url: absoluteUrl(`/experiences/category/${category.slug}`),
      // The two theme pages are linked straight from the home hero.
      priority: category.slug === category.theme ? 0.6 : 0.5,
    });
  }

  for (const category of JOURNEY_CATEGORIES) {
    entries.push({
      url: absoluteUrl(`/journeys/category/${category.slug}`),
      priority: 0.5,
    });
  }

  for (const category of STORY_CATEGORIES) {
    entries.push({
      url: absoluteUrl(`/travel-stories/category/${category.slug}`),
      priority: 0.4,
    });
  }

  for (const region of REGIONS) {
    entries.push({
      url: absoluteUrl(`/destinations/region/${region.slug}`),
      priority: 0.4,
    });
  }

  // Referenced so the taxonomy stays in one place even before the filters ship.
  void DESTINATION_CATEGORIES;

  return entries;
}
