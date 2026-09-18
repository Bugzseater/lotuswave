import { CACHE_TAGS } from "@/lib/constants";
import type { Experience, ExperienceCategory, Region, Theme } from "@/types";

/**
 * Experience reads.
 *
 * Currently backed by the MOCK_EXPERIENCES array below. To move to Firestore,
 * replace the body of each function with a query against the `experiences`
 * collection and tag it with `CACHE_TAGS.experiences` — the exported
 * signatures must not change.
 */

const MOCK_EXPERIENCES: Experience[] = [
  {
    id: "exp-pedro-tea-harvest",
    slug: "pedro-estate-tea-harvest",
    title: "Tea Harvest Morning at Pedro Estate",
    excerpt:
      "Pick with the plucking team at first light, then follow your basket through withering, rolling and tasting.",
    theme: "agro",
    category: "tea-plantation",
    region: "hill-country",
    duration: { value: 5, unit: "hours", label: "5 hours (morning)" },
    priceFrom: { amount: 65, currency: "USD", unit: "per person" },
    highlights: [
      "Plucking alongside an estate team above Nuwara Eliya",
      "Walk the factory floor from leaf to grade",
      "Guided cupping of four single-estate grades",
      "Hill country breakfast on the veranda",
    ],
    destinationSlugs: ["nuwara-eliya"],
    featured: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1582128970563-dbe0f3a1c1c4",
        alt: "Tea pluckers carrying baskets across a terraced estate at sunrise",
        width: 1600,
        height: 1067,
      },
    ],
    seo: {
      metaTitle: "Tea Harvest Morning at Pedro Estate, Nuwara Eliya",
      metaDescription:
        "Spend a morning plucking and tasting Ceylon tea on a working estate above Nuwara Eliya.",
      keywords: ["Ceylon tea experience", "Nuwara Eliya tea estate"],
    },
    publishedAt: "2026-01-10T09:00:00.000Z",
    updatedAt: "2026-07-03T09:00:00.000Z",
  },
  {
    id: "exp-matale-spice-garden",
    slug: "matale-spice-garden-walk",
    title: "Spice Garden Walk & Cook-Up, Matale",
    excerpt:
      "Cinnamon peeling, cardamom pods still on the stem, and a curry cooked from what you gathered.",
    theme: "agro",
    category: "spice-garden",
    region: "cultural-triangle",
    duration: { value: 4, unit: "hours", label: "4 hours" },
    priceFrom: { amount: 48, currency: "USD", unit: "per person" },
    highlights: [
      "Hand-peel true Ceylon cinnamon with a third-generation peeler",
      "Identify pepper, cardamom, nutmeg and turmeric in the ground",
      "Grind your own curry powder to take home",
      "Cook and eat a five-dish rice and curry",
    ],
    destinationSlugs: ["dambulla", "kandy"],
    featured: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d",
        alt: "Hands sorting fresh cinnamon bark and cardamom pods on a wooden tray",
        width: 1600,
        height: 1067,
      },
    ],
    seo: {
      metaDescription:
        "A working spice garden near Matale: peel cinnamon, blend curry powder and cook lunch.",
      keywords: ["Sri Lanka spice garden", "Ceylon cinnamon", "Matale"],
    },
    publishedAt: "2026-01-18T09:00:00.000Z",
    updatedAt: "2026-06-21T09:00:00.000Z",
  },
  {
    id: "exp-paddy-farm-stay",
    slug: "paddy-field-farm-stay-anuradhapura",
    title: "Paddy Field Farm Stay near Anuradhapura",
    excerpt:
      "Two nights with a farming family beside an ancient tank — buffalo at dawn, dinner cooked over firewood.",
    theme: "agro",
    category: "farm-stay",
    region: "cultural-triangle",
    duration: { value: 2, unit: "nights", label: "2 nights" },
    priceFrom: { amount: 120, currency: "USD", unit: "per person" },
    highlights: [
      "Transplanting or harvesting, depending on the season",
      "Tank-side birdwatching before breakfast",
      "Clay-pot cooking over an open hearth",
      "Bullock cart ride through the village",
    ],
    destinationSlugs: ["anuradhapura"],
    featured: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
        alt: "Green paddy fields stretching towards palm trees at golden hour",
        width: 1600,
        height: 1067,
      },
    ],
    seo: {
      metaDescription:
        "Stay with a farming family beside an ancient reservoir in Sri Lanka's Cultural Triangle.",
      keywords: ["Sri Lanka farm stay", "paddy field", "Anuradhapura"],
    },
    publishedAt: "2026-02-02T09:00:00.000Z",
    updatedAt: "2026-06-28T09:00:00.000Z",
  },
  {
    id: "exp-ayurveda-panchakarma",
    slug: "panchakarma-intro-kandy",
    title: "Panchakarma Introduction, Kandy",
    excerpt:
      "A physician-led consultation followed by three days of oil therapies matched to your constitution.",
    theme: "wellness",
    category: "ayurveda",
    region: "hill-country",
    duration: { value: 3, unit: "days", label: "3 days" },
    priceFrom: { amount: 390, currency: "USD", unit: "per person" },
    highlights: [
      "Pulse diagnosis and dosha assessment with a registered physician",
      "Abhyanga and shirodhara treatments",
      "Ayurvedic kitchen: eating for your constitution",
      "Herb garden walk and personal decoction blend",
    ],
    destinationSlugs: ["kandy"],
    featured: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef",
        alt: "Warm oil being poured during a traditional Ayurvedic shirodhara treatment",
        width: 1600,
        height: 1067,
      },
    ],
    seo: {
      metaTitle: "Panchakarma Introduction in Kandy | Ayurveda in Sri Lanka",
      metaDescription:
        "A three-day physician-led introduction to Panchakarma in the hills above Kandy.",
      keywords: ["Ayurveda Sri Lanka", "Panchakarma", "Kandy wellness"],
    },
    publishedAt: "2026-02-14T09:00:00.000Z",
    updatedAt: "2026-08-04T09:00:00.000Z",
  },
  {
    id: "exp-sunrise-yoga-ella",
    slug: "sunrise-yoga-little-adams-peak",
    title: "Sunrise Yoga on Little Adam's Peak",
    excerpt:
      "Climb in the dark, unroll the mat as the valley fills with light, and come down to a long breakfast.",
    theme: "wellness",
    category: "yoga-meditation",
    region: "hill-country",
    duration: { value: 4, unit: "hours", label: "4 hours (early morning)" },
    priceFrom: { amount: 42, currency: "USD", unit: "per person" },
    highlights: [
      "Guided ascent by head torch",
      "Ninety-minute hatha practice at the summit",
      "Seated meditation over the Ella Gap",
      "Estate breakfast on the walk down",
    ],
    destinationSlugs: ["ella"],
    featured: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
        alt: "Person seated in meditation on a hilltop above a misty valley at sunrise",
        width: 1600,
        height: 1067,
      },
    ],
    seo: {
      metaDescription:
        "Sunrise yoga and meditation above the Ella Gap, followed by breakfast on a tea estate.",
      keywords: ["yoga Sri Lanka", "Ella sunrise", "Little Adam's Peak"],
    },
    publishedAt: "2026-03-01T09:00:00.000Z",
    updatedAt: "2026-07-19T09:00:00.000Z",
  },
  {
    id: "exp-herbal-apothecary-galle",
    slug: "herbal-apothecary-workshop-galle",
    title: "Herbal Apothecary Workshop, Galle",
    excerpt:
      "Blend balms, oils and teas from coastal herbs in a workshop inside the fort walls.",
    theme: "wellness",
    category: "herbal-wellness",
    region: "south-coast",
    duration: { value: 3, unit: "hours", label: "3 hours" },
    priceFrom: { amount: 55, currency: "USD", unit: "per person" },
    highlights: [
      "Market walk for fresh and dried herbs",
      "Blend a balm and an infused oil to take home",
      "Tasting of six Sri Lankan herbal teas",
      "Notes on safe home use of each plant",
    ],
    destinationSlugs: ["galle"],
    featured: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1471943311424-646960669fbc",
        alt: "Dried herbs, glass bottles and mortar arranged on a workshop table",
        width: 1600,
        height: 1067,
      },
    ],
    seo: {
      metaDescription:
        "Make your own balms, oils and teas from Sri Lankan herbs inside Galle Fort.",
      keywords: ["herbal workshop Sri Lanka", "Galle Fort", "Ayurvedic herbs"],
    },
    publishedAt: "2026-03-20T09:00:00.000Z",
    updatedAt: "2026-08-15T09:00:00.000Z",
  },
  {
    id: "exp-village-cooking-sigiriya",
    slug: "village-cooking-class-sigiriya",
    title: "Village Cooking Class below Sigiriya",
    excerpt:
      "Pick from the home garden, grate the coconut yourself, and eat under the rock.",
    theme: "agro",
    category: "cooking",
    region: "cultural-triangle",
    duration: { value: 4, unit: "hours", label: "4 hours" },
    priceFrom: { amount: 38, currency: "USD", unit: "per person" },
    highlights: [
      "Harvest greens, gourds and chillies from the garden",
      "Scrape coconut and press first-extract milk",
      "Cook seven dishes on a clay hearth",
      "Lunch on the veranda with Sigiriya in view",
    ],
    destinationSlugs: ["sigiriya", "dambulla"],
    featured: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641",
        alt: "Clay pots of Sri Lankan curries laid out on a wooden table",
        width: 1600,
        height: 1067,
      },
    ],
    seo: {
      metaDescription:
        "A home cooking class below Sigiriya: garden to clay pot to shared table.",
      keywords: ["Sri Lankan cooking class", "Sigiriya", "rice and curry"],
    },
    publishedAt: "2026-04-05T09:00:00.000Z",
    updatedAt: "2026-08-22T09:00:00.000Z",
  },
];

export async function getExperiences(): Promise<Experience[]> {
  // TODO(firestore): db.collection("experiences").orderBy("publishedAt", "desc")
  void CACHE_TAGS.experiences;
  return MOCK_EXPERIENCES;
}

export async function getFeaturedExperiences(
  limit = 6,
): Promise<Experience[]> {
  const experiences = await getExperiences();
  return experiences.filter((experience) => experience.featured).slice(0, limit);
}

export async function getExperienceBySlug(
  slug: string,
): Promise<Experience | null> {
  const experiences = await getExperiences();
  return experiences.find((experience) => experience.slug === slug) ?? null;
}

export async function getExperiencesByCategory(
  category: ExperienceCategory,
): Promise<Experience[]> {
  const experiences = await getExperiences();
  return experiences.filter((experience) => experience.category === category);
}

export async function getExperiencesByTheme(
  theme: Theme,
): Promise<Experience[]> {
  const experiences = await getExperiences();
  return experiences.filter((experience) => experience.theme === theme);
}

export async function getExperiencesByRegion(
  region: Region,
): Promise<Experience[]> {
  const experiences = await getExperiences();
  return experiences.filter((experience) => experience.region === region);
}

/** Slugs for `generateStaticParams`. */
export async function getExperienceSlugs(): Promise<string[]> {
  const experiences = await getExperiences();
  return experiences.map((experience) => experience.slug);
}
