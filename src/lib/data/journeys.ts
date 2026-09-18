import { CACHE_TAGS } from "@/lib/constants";
import type { Journey, JourneyCategory, Theme } from "@/types";

/**
 * Journey reads.
 *
 * Currently backed by the MOCK_JOURNEYS array below. To move to Firestore,
 * replace the body of each function with a query against the `journeys`
 * collection and tag it with `CACHE_TAGS.journeys` — the exported signatures
 * must not change.
 */

const MOCK_JOURNEYS: Journey[] = [
  {
    id: "jrn-tea-trail",
    slug: "ceylon-tea-trail",
    title: "The Ceylon Tea Trail",
    excerpt:
      "Eight days following the leaf from Kandy up to Nuwara Eliya and down through Ella, staying on working estates.",
    theme: "agro",
    category: "agro-trail",
    regions: ["hill-country", "cultural-triangle"],
    duration: { value: 8, unit: "days", label: "8 days / 7 nights" },
    priceFrom: { amount: 1780, currency: "USD", unit: "per person" },
    highlights: [
      "Three working estates, three very different elevations",
      "Plucking, withering, rolling and cupping with estate staff",
      "The hill country train from Nanu Oya to Ella",
      "Two nights in a restored planter's bungalow",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive Kandy",
        description:
          "Transfer from Colombo, afternoon at the Temple of the Sacred Tooth Relic, dinner above the lake.",
        destinationSlugs: ["kandy"],
      },
      {
        day: 2,
        title: "Spices and mid-country gardens",
        description:
          "Spice garden walk near Matale, then the Royal Botanical Gardens at Peradeniya.",
        destinationSlugs: ["kandy"],
      },
      {
        day: 3,
        title: "Up to the high country",
        description:
          "Climb to Nuwara Eliya through the estates, settling into the bungalow by late afternoon.",
        destinationSlugs: ["nuwara-eliya"],
      },
      {
        day: 4,
        title: "Harvest morning",
        description:
          "Plucking with the estate team at first light, factory floor and a guided cupping after lunch.",
        destinationSlugs: ["nuwara-eliya"],
      },
      {
        day: 5,
        title: "Horton Plains",
        description:
          "Early start for the plateau and World's End, back down for a slow afternoon.",
        destinationSlugs: ["nuwara-eliya"],
      },
      {
        day: 6,
        title: "The hill country line",
        description:
          "The train from Nanu Oya to Ella, through tunnels and tea, arriving mid-afternoon.",
        destinationSlugs: ["ella"],
      },
      {
        day: 7,
        title: "Ella on foot",
        description:
          "Little Adam's Peak at sunrise, Nine Arch Bridge, and an estate lunch.",
        destinationSlugs: ["ella"],
      },
      {
        day: 8,
        title: "Departure",
        description: "Transfer to Colombo or onward to the south coast.",
        destinationSlugs: [],
      },
    ],
    experienceSlugs: [
      "pedro-estate-tea-harvest",
      "matale-spice-garden-walk",
      "sunrise-yoga-little-adams-peak",
    ],
    featured: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570",
        alt: "Terraced tea estate rolling into mist in the Sri Lankan hill country",
        width: 1600,
        height: 1067,
      },
    ],
    seo: {
      metaTitle: "The Ceylon Tea Trail — 8-Day Agro Journey | LotusWave",
      metaDescription:
        "Eight days across Sri Lanka's tea country: working estates, the hill country train and Ella.",
      keywords: ["Ceylon tea tour", "Sri Lanka agro tourism", "Ella train"],
    },
    publishedAt: "2026-01-05T09:00:00.000Z",
    updatedAt: "2026-08-01T09:00:00.000Z",
  },
  {
    id: "jrn-ayurveda-reset",
    slug: "ayurveda-reset-retreat",
    title: "Ayurveda Reset Retreat",
    excerpt:
      "Ten days of physician-led therapy, daily practice and quiet food, between the hills and the south coast.",
    theme: "wellness",
    category: "wellness-retreat",
    regions: ["hill-country", "south-coast"],
    duration: { value: 10, unit: "days", label: "10 days / 9 nights" },
    priceFrom: { amount: 2450, currency: "USD", unit: "per person" },
    highlights: [
      "Full dosha assessment and a plan built around it",
      "Daily abhyanga, shirodhara and steam",
      "Morning yoga and evening meditation throughout",
      "Ayurvedic kitchen, and the recipes to take home",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive Kandy",
        description:
          "Settle in, consultation and pulse diagnosis with the resident physician.",
        destinationSlugs: ["kandy"],
      },
      {
        day: 2,
        title: "Begin therapy",
        description:
          "First oil therapies, herb garden walk, and your personal decoction blend.",
        destinationSlugs: ["kandy"],
      },
      {
        day: 5,
        title: "Move to the coast",
        description:
          "Transfer south, continuing the daily rhythm beside the ocean.",
        destinationSlugs: ["galle"],
      },
      {
        day: 8,
        title: "Herbal apothecary",
        description:
          "Blend balms and oils in Galle Fort, then an open afternoon.",
        destinationSlugs: ["galle"],
      },
      {
        day: 10,
        title: "Closing consultation and departure",
        description:
          "Final assessment, a plan for home, and transfer to the airport.",
        destinationSlugs: [],
      },
    ],
    experienceSlugs: [
      "panchakarma-intro-kandy",
      "herbal-apothecary-workshop-galle",
    ],
    featured: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2",
        alt: "Quiet treatment pavilion opening onto a tropical garden",
        width: 1600,
        height: 1067,
      },
    ],
    seo: {
      metaTitle: "Ayurveda Reset Retreat — 10 Days in Sri Lanka | LotusWave",
      metaDescription:
        "A ten-day physician-led Ayurvedic retreat between the Kandyan hills and the south coast.",
      keywords: ["Ayurveda retreat Sri Lanka", "wellness holiday", "Panchakarma"],
    },
    publishedAt: "2026-01-22T09:00:00.000Z",
    updatedAt: "2026-08-10T09:00:00.000Z",
  },
  {
    id: "jrn-cultural-triangle-harvest",
    slug: "cultural-triangle-harvest",
    title: "Cultural Triangle Harvest",
    excerpt:
      "Six days among stupas, cave temples and tank-fed paddy, sleeping in the villages that farm them.",
    theme: "agro",
    category: "cultural-heritage",
    regions: ["cultural-triangle"],
    duration: { value: 6, unit: "days", label: "6 days / 5 nights" },
    priceFrom: { amount: 1290, currency: "USD", unit: "per person" },
    highlights: [
      "Sigiriya and Pidurangala at sunrise",
      "Two nights on a working paddy farm",
      "The Dambulla cave temples and the market below",
      "Anuradhapura's ancient irrigation tanks, explained by the people who use them",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive Dambulla",
        description: "Cave temples in the late afternoon light.",
        destinationSlugs: ["dambulla"],
      },
      {
        day: 2,
        title: "Sigiriya",
        description:
          "Pidurangala at dawn, the rock fortress and water gardens after breakfast.",
        destinationSlugs: ["sigiriya"],
      },
      {
        day: 3,
        title: "Village kitchen",
        description:
          "Cooking class below the rock, then transfer to the farm stay.",
        destinationSlugs: ["sigiriya", "anuradhapura"],
      },
      {
        day: 5,
        title: "Anuradhapura",
        description:
          "The sacred city by bicycle, ending at Sri Maha Bodhi at dusk.",
        destinationSlugs: ["anuradhapura"],
      },
      {
        day: 6,
        title: "Departure",
        description: "Transfer to Colombo or onward to the hill country.",
        destinationSlugs: [],
      },
    ],
    experienceSlugs: [
      "village-cooking-class-sigiriya",
      "paddy-field-farm-stay-anuradhapura",
    ],
    featured: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1566766188646-5d0310191714",
        alt: "Ancient stupa rising behind paddy fields in Sri Lanka's Cultural Triangle",
        width: 1600,
        height: 1067,
      },
    ],
    seo: {
      metaDescription:
        "Six days through Sri Lanka's Cultural Triangle, from cave temples to a working paddy farm.",
      keywords: ["Cultural Triangle tour", "Sigiriya", "Anuradhapura"],
    },
    publishedAt: "2026-02-11T09:00:00.000Z",
    updatedAt: "2026-07-27T09:00:00.000Z",
  },
  {
    id: "jrn-coast-and-calm",
    slug: "south-coast-and-calm",
    title: "South Coast & Calm",
    excerpt:
      "Seven unhurried days between Galle and Mirissa — sea, herbs, and nothing scheduled before nine.",
    theme: "wellness",
    category: "honeymoon",
    regions: ["south-coast"],
    duration: { value: 7, unit: "days", label: "7 days / 6 nights" },
    priceFrom: { amount: 1650, currency: "USD", unit: "per person" },
    highlights: [
      "Galle Fort ramparts at sunset",
      "Blue whale watching off Mirissa, in season",
      "Herbal apothecary workshop inside the fort",
      "Two spa afternoons and no fixed itinerary",
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrive Galle",
        description: "Transfer from Colombo, evening on the ramparts.",
        destinationSlugs: ["galle"],
      },
      {
        day: 3,
        title: "Apothecary and market",
        description: "Herb market walk and a blending workshop in the fort.",
        destinationSlugs: ["galle"],
      },
      {
        day: 4,
        title: "Move to Mirissa",
        description: "Short transfer east, afternoon on the bay.",
        destinationSlugs: ["mirissa"],
      },
      {
        day: 5,
        title: "Whales offshore",
        description:
          "Early boat out past the shelf, back by late morning. Seasonal, November to April.",
        destinationSlugs: ["mirissa"],
      },
      {
        day: 7,
        title: "Departure",
        description: "Transfer to Colombo.",
        destinationSlugs: [],
      },
    ],
    experienceSlugs: ["herbal-apothecary-workshop-galle"],
    featured: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        alt: "Empty tropical beach with clear shallow water and palm shade",
        width: 1600,
        height: 1067,
      },
    ],
    seo: {
      metaDescription:
        "Seven slow days on Sri Lanka's south coast, between Galle Fort and the bay at Mirissa.",
      keywords: ["Sri Lanka honeymoon", "Galle", "Mirissa whale watching"],
    },
    publishedAt: "2026-03-08T09:00:00.000Z",
    updatedAt: "2026-08-18T09:00:00.000Z",
  },
];

export async function getJourneys(): Promise<Journey[]> {
  // TODO(firestore): db.collection("journeys").orderBy("publishedAt", "desc")
  void CACHE_TAGS.journeys;
  return MOCK_JOURNEYS;
}

export async function getFeaturedJourneys(limit = 3): Promise<Journey[]> {
  const journeys = await getJourneys();
  return journeys.filter((journey) => journey.featured).slice(0, limit);
}

export async function getJourneyBySlug(slug: string): Promise<Journey | null> {
  const journeys = await getJourneys();
  return journeys.find((journey) => journey.slug === slug) ?? null;
}

export async function getJourneysByCategory(
  category: JourneyCategory,
): Promise<Journey[]> {
  const journeys = await getJourneys();
  return journeys.filter((journey) => journey.category === category);
}

export async function getJourneysByTheme(theme: Theme): Promise<Journey[]> {
  const journeys = await getJourneys();
  return journeys.filter((journey) => journey.theme === theme);
}

/** Slugs for `generateStaticParams`. */
export async function getJourneySlugs(): Promise<string[]> {
  const journeys = await getJourneys();
  return journeys.map((journey) => journey.slug);
}
