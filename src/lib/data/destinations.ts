import { CACHE_TAGS } from "@/lib/constants";
import type { Destination, Region } from "@/types";

/**
 * Destination reads.
 *
 * Currently backed by the MOCK_DESTINATIONS array below. To move to Firestore,
 * replace the body of each function with a query against the `destinations`
 * collection and tag it with `CACHE_TAGS.destinations` — the exported
 * signatures must not change.
 */

const MOCK_DESTINATIONS: Destination[] = [
  {
    id: "dest-kandy",
    slug: "kandy",
    title: "Kandy",
    excerpt:
      "The last royal capital of Sri Lanka, wrapped around a lake and ringed by tea-covered hills.",
    category: "heritage",
    region: "hill-country",
    highlights: [
      "Temple of the Sacred Tooth Relic",
      "Royal Botanical Gardens, Peradeniya",
      "Kandy Lake at dusk",
      "Traditional Kandyan dance",
    ],
    bestMonths: [1, 2, 3, 4, 7, 8, 9],
    coordinates: { lat: 7.2906, lng: 80.6337 },
    duration: { value: 2, unit: "days", label: "2 days" },
    images: [
      {
        url: "https://images.unsplash.com/photo-1586686621438-1c2b2f4a0d1b",
        alt: "Mist over the hills surrounding Kandy Lake at sunrise",
        width: 1600,
        height: 1067,
      },
    ],
    seo: {
      metaTitle: "Kandy — Sri Lanka's Hill Capital | LotusWave Lanka Tours",
      metaDescription:
        "Discover Kandy: sacred temples, botanical gardens and the gateway to Sri Lanka's tea country.",
      keywords: ["Kandy", "Sri Lanka hill country", "Temple of the Tooth"],
    },
    publishedAt: "2025-11-04T09:00:00.000Z",
    updatedAt: "2026-06-12T09:00:00.000Z",
  },
  {
    id: "dest-ella",
    slug: "ella",
    title: "Ella",
    excerpt:
      "A small mountain town of tea estates, waterfalls and the walk out to Little Adam's Peak.",
    category: "highland",
    region: "hill-country",
    highlights: [
      "Nine Arch Bridge",
      "Little Adam's Peak at sunrise",
      "Ravana Falls",
      "Tea estate walks",
    ],
    bestMonths: [1, 2, 3, 4, 5, 8, 9],
    coordinates: { lat: 6.8667, lng: 81.0466 },
    duration: { value: 2, unit: "days", label: "2 days" },
    images: [
      {
        url: "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9",
        alt: "Train crossing the Nine Arch Bridge through jungle near Ella",
        width: 1600,
        height: 1067,
      },
    ],
    seo: {
      metaDescription:
        "Ella travel guide: Nine Arch Bridge, Little Adam's Peak, tea estate walks and where to stay.",
      keywords: ["Ella Sri Lanka", "Nine Arch Bridge", "Little Adam's Peak"],
    },
    publishedAt: "2025-11-04T09:00:00.000Z",
    updatedAt: "2026-05-30T09:00:00.000Z",
  },
  {
    id: "dest-sigiriya",
    slug: "sigiriya",
    title: "Sigiriya",
    excerpt:
      "A fifth-century rock fortress rising two hundred metres out of the surrounding forest.",
    category: "heritage",
    region: "cultural-triangle",
    highlights: [
      "Sigiriya Rock Fortress",
      "The mirror wall and frescoes",
      "Water gardens at the base",
      "Pidurangala at sunrise",
    ],
    bestMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    coordinates: { lat: 7.957, lng: 80.7603 },
    duration: { value: 1, unit: "days", label: "1 day" },
    images: [
      {
        url: "https://images.unsplash.com/photo-1586509337395-b58e21ef0e6e",
        alt: "Sigiriya rock fortress rising above the surrounding forest",
        width: 1600,
        height: 1067,
      },
    ],
    seo: {
      metaDescription:
        "Sigiriya Rock Fortress: how to climb it, when to go, and what to see in the surrounding gardens.",
      keywords: ["Sigiriya", "Lion Rock", "Cultural Triangle"],
    },
    publishedAt: "2025-11-04T09:00:00.000Z",
    updatedAt: "2026-04-18T09:00:00.000Z",
  },
  {
    id: "dest-nuwara-eliya",
    slug: "nuwara-eliya",
    title: "Nuwara Eliya",
    excerpt:
      "Sri Lanka's coolest town, where colonial-era bungalows sit among working tea factories.",
    category: "highland",
    region: "hill-country",
    highlights: [
      "Pedro and Mackwoods tea factories",
      "Gregory Lake",
      "Horton Plains and World's End",
      "Strawberry and vegetable farms",
    ],
    bestMonths: [1, 2, 3, 4, 8, 9],
    coordinates: { lat: 6.9497, lng: 80.7891 },
    duration: { value: 2, unit: "days", label: "2 days" },
    images: [
      {
        url: "https://images.unsplash.com/photo-1544986581-efac024faf62",
        alt: "Tea pickers working a terraced estate near Nuwara Eliya",
        width: 1600,
        height: 1067,
      },
    ],
    seo: {
      metaDescription:
        "Nuwara Eliya: tea factory tours, Horton Plains treks and the cool heart of Sri Lanka's hill country.",
      keywords: ["Nuwara Eliya", "Ceylon tea", "Horton Plains"],
    },
    publishedAt: "2025-11-04T09:00:00.000Z",
    updatedAt: "2026-06-02T09:00:00.000Z",
  },
  {
    id: "dest-galle",
    slug: "galle",
    title: "Galle",
    excerpt:
      "A Dutch-built fort on the south coast, full of ramparts, courtyards and sea air.",
    category: "coastal",
    region: "south-coast",
    highlights: [
      "Galle Fort ramparts at sunset",
      "Dutch Reformed Church",
      "Independent galleries and cafés",
      "Unawatuna and Jungle Beach nearby",
    ],
    bestMonths: [11, 12, 1, 2, 3, 4],
    coordinates: { lat: 6.0329, lng: 80.2168 },
    duration: { value: 2, unit: "days", label: "2 days" },
    images: [
      {
        url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96",
        alt: "Galle Fort ramparts with the Indian Ocean beyond",
        width: 1600,
        height: 1067,
      },
    ],
    seo: {
      metaDescription:
        "Galle Fort travel guide: ramparts, colonial streets, galleries and the beaches just outside.",
      keywords: ["Galle Fort", "south coast Sri Lanka", "Unawatuna"],
    },
    publishedAt: "2025-11-04T09:00:00.000Z",
    updatedAt: "2026-03-22T09:00:00.000Z",
  },
  {
    id: "dest-anuradhapura",
    slug: "anuradhapura",
    title: "Anuradhapura",
    excerpt:
      "Sri Lanka's first capital — stupas, monastery ruins and the oldest planted tree on record.",
    category: "heritage",
    region: "cultural-triangle",
    highlights: [
      "Sri Maha Bodhi",
      "Ruwanwelisaya stupa",
      "Abhayagiri monastery complex",
      "Ancient irrigation tanks",
    ],
    bestMonths: [1, 2, 3, 4, 5, 6, 7, 8],
    coordinates: { lat: 8.3114, lng: 80.4037 },
    duration: { value: 1, unit: "days", label: "1 day" },
    images: [
      {
        url: "https://images.unsplash.com/photo-1600100397608-f010cb1acbb0",
        alt: "White stupa of Ruwanwelisaya in Anuradhapura under a clear sky",
        width: 1600,
        height: 1067,
      },
    ],
    seo: {
      metaDescription:
        "Anuradhapura: the sacred city of stupas, monasteries and ancient reservoirs in the Cultural Triangle.",
      keywords: ["Anuradhapura", "Sri Maha Bodhi", "ancient Sri Lanka"],
    },
    publishedAt: "2025-11-04T09:00:00.000Z",
    updatedAt: "2026-02-09T09:00:00.000Z",
  },
  {
    id: "dest-dambulla",
    slug: "dambulla",
    title: "Dambulla",
    excerpt:
      "Cave temples painted floor to ceiling, above one of the island's busiest produce markets.",
    category: "heritage",
    region: "cultural-triangle",
    highlights: [
      "Golden Cave Temple",
      "Dambulla wholesale vegetable market",
      "Ironwood Forest",
      "Kandalama reservoir",
    ],
    bestMonths: [1, 2, 3, 4, 5, 6, 7, 8],
    coordinates: { lat: 7.8731, lng: 80.6511 },
    images: [
      {
        url: "https://images.unsplash.com/photo-1552055568-f8c4fdb88f3f",
        alt: "Painted ceiling and reclining Buddha inside the Dambulla cave temple",
        width: 1600,
        height: 1067,
      },
    ],
    seo: {
      metaDescription:
        "Dambulla cave temples and the island's largest produce market, in the heart of the Cultural Triangle.",
    },
    publishedAt: "2025-11-04T09:00:00.000Z",
    updatedAt: "2026-01-16T09:00:00.000Z",
  },
  {
    id: "dest-mirissa",
    slug: "mirissa",
    title: "Mirissa",
    excerpt:
      "A crescent bay on the south coast, known for blue whales offshore and slow mornings.",
    category: "coastal",
    region: "south-coast",
    highlights: [
      "Blue whale watching",
      "Coconut Tree Hill",
      "Secret Beach",
      "Stilt fishing at Weligama",
    ],
    bestMonths: [11, 12, 1, 2, 3, 4],
    coordinates: { lat: 5.9483, lng: 80.4589 },
    images: [
      {
        url: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3",
        alt: "Palm-fringed crescent beach at Mirissa in early morning light",
        width: 1600,
        height: 1067,
      },
    ],
    seo: {
      metaDescription:
        "Mirissa: whale watching season, quiet beaches and the best of Sri Lanka's south coast.",
    },
    publishedAt: "2025-11-04T09:00:00.000Z",
    updatedAt: "2026-05-11T09:00:00.000Z",
  },
];

export async function getDestinations(): Promise<Destination[]> {
  // TODO(firestore): db.collection("destinations").orderBy("title").get()
  void CACHE_TAGS.destinations;
  return MOCK_DESTINATIONS;
}

export async function getDestinationBySlug(
  slug: string,
): Promise<Destination | null> {
  const destinations = await getDestinations();
  return destinations.find((destination) => destination.slug === slug) ?? null;
}

export async function getDestinationsByRegion(
  region: Region,
): Promise<Destination[]> {
  const destinations = await getDestinations();
  return destinations.filter((destination) => destination.region === region);
}

export async function getFeaturedDestinations(
  limit = 6,
): Promise<Destination[]> {
  const destinations = await getDestinations();
  return destinations.slice(0, limit);
}

/** Slugs for `generateStaticParams`. */
export async function getDestinationSlugs(): Promise<string[]> {
  const destinations = await getDestinations();
  return destinations.map((destination) => destination.slug);
}
