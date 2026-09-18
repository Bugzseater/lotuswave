import { CACHE_TAGS } from "@/lib/constants";
import type { Story, StoryCategory } from "@/types";

/**
 * Travel story reads.
 *
 * Currently backed by the MOCK_STORIES array below. To move to Firestore,
 * replace the body of each function with a query against the `stories`
 * collection and tag it with `CACHE_TAGS.stories` — the exported signatures
 * must not change.
 */

const MOCK_STORIES: Story[] = [
  {
    id: "story-tea-grades",
    slug: "reading-a-ceylon-tea-label",
    title: "How to Read a Ceylon Tea Label",
    excerpt:
      "BOP, FBOPF, high grown, low grown — what the letters on the packet actually tell you about the leaf.",
    category: "food-and-farming",
    region: "hill-country",
    author: { name: "Nadeesha Perera", role: "Tea & Estates Editor" },
    readingMinutes: 7,
    tags: ["tea", "nuwara-eliya", "buying-guide"],
    featured: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2",
        alt: "Loose black tea leaves graded into small wooden trays",
        width: 1600,
        height: 1067,
      },
    ],
    seo: {
      metaDescription:
        "A plain-English guide to Ceylon tea grades, elevations and what they mean in the cup.",
      keywords: ["Ceylon tea grades", "BOP tea", "Sri Lanka tea guide"],
    },
    publishedAt: "2026-08-28T09:00:00.000Z",
    updatedAt: "2026-08-28T09:00:00.000Z",
  },
  {
    id: "story-monsoon-planning",
    slug: "two-monsoons-when-to-visit-sri-lanka",
    title: "Two Monsoons: When to Visit Sri Lanka",
    excerpt:
      "The island has a dry season somewhere almost year-round. Here is how to pick the right coast for your month.",
    category: "travel-guide",
    author: { name: "Ravindu Jayasuriya", role: "Journey Designer" },
    readingMinutes: 9,
    tags: ["planning", "weather", "seasons"],
    featured: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3",
        alt: "Rain clouds gathering over a green coastal headland",
        width: 1600,
        height: 1067,
      },
    ],
    seo: {
      metaTitle: "When to Visit Sri Lanka — A Month-by-Month Guide",
      metaDescription:
        "Sri Lanka's two monsoons explained, with the best month for each coast and the hill country.",
      keywords: ["best time to visit Sri Lanka", "Sri Lanka monsoon"],
    },
    publishedAt: "2026-08-12T09:00:00.000Z",
    updatedAt: "2026-09-02T09:00:00.000Z",
  },
  {
    id: "story-dosha",
    slug: "what-happens-in-an-ayurvedic-consultation",
    title: "What Actually Happens in an Ayurvedic Consultation",
    excerpt:
      "Pulse, tongue, sleep, digestion — a physician in Kandy walks through the first forty minutes.",
    category: "wellness",
    region: "hill-country",
    author: { name: "Dr. Iresha Bandara", role: "Consulting Physician" },
    readingMinutes: 6,
    tags: ["ayurveda", "kandy", "wellness"],
    featured: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c",
        alt: "Bowls of dried herbs and a brass mortar on a consulting room table",
        width: 1600,
        height: 1067,
      },
    ],
    seo: {
      metaDescription:
        "An Ayurvedic physician in Kandy explains what a first consultation covers and why.",
      keywords: ["Ayurvedic consultation", "dosha", "Sri Lanka Ayurveda"],
    },
    publishedAt: "2026-07-30T09:00:00.000Z",
    updatedAt: "2026-07-30T09:00:00.000Z",
  },
  {
    id: "story-tank-cascade",
    slug: "the-tank-cascade-system",
    title: "The Tank Cascade System, Still Working After 2,000 Years",
    excerpt:
      "Anuradhapura's farmers irrigate with a network designed before the common era. It has quiet lessons for the rest of us.",
    category: "sustainability",
    region: "cultural-triangle",
    author: { name: "Nadeesha Perera", role: "Tea & Estates Editor" },
    readingMinutes: 11,
    tags: ["anuradhapura", "farming", "heritage"],
    featured: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
        alt: "Still reservoir water reflecting palms and evening sky",
        width: 1600,
        height: 1067,
      },
    ],
    seo: {
      metaDescription:
        "How Sri Lanka's ancient tank cascade irrigation still feeds the Cultural Triangle today.",
      keywords: ["tank cascade", "ancient irrigation", "Anuradhapura farming"],
    },
    publishedAt: "2026-07-08T09:00:00.000Z",
    updatedAt: "2026-07-08T09:00:00.000Z",
  },
  {
    id: "story-galle-fort-morning",
    slug: "a-morning-inside-galle-fort",
    title: "A Morning Inside Galle Fort",
    excerpt:
      "Before the tour buses: the fish market, the ramparts, and a short black coffee on Pedlar Street.",
    category: "culture",
    region: "south-coast",
    author: { name: "Ravindu Jayasuriya", role: "Journey Designer" },
    readingMinutes: 5,
    tags: ["galle", "slow-travel", "south-coast"],
    featured: false,
    images: [
      {
        url: "https://images.unsplash.com/photo-1544806043-a9adf9ad0c65",
        alt: "Quiet colonial street inside Galle Fort in early morning light",
        width: 1600,
        height: 1067,
      },
    ],
    seo: {
      metaDescription:
        "How to spend an early morning inside Galle Fort before the crowds arrive.",
      keywords: ["Galle Fort", "Sri Lanka slow travel"],
    },
    publishedAt: "2026-06-19T09:00:00.000Z",
    updatedAt: "2026-06-19T09:00:00.000Z",
  },
];

export async function getStories(): Promise<Story[]> {
  // TODO(firestore): db.collection("stories").orderBy("publishedAt", "desc")
  void CACHE_TAGS.stories;
  return [...MOCK_STORIES].sort(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
  );
}

export async function getLatestStories(limit = 3): Promise<Story[]> {
  const stories = await getStories();
  return stories.slice(0, limit);
}

export async function getFeaturedStories(limit = 3): Promise<Story[]> {
  const stories = await getStories();
  return stories.filter((story) => story.featured).slice(0, limit);
}

export async function getStoryBySlug(slug: string): Promise<Story | null> {
  const stories = await getStories();
  return stories.find((story) => story.slug === slug) ?? null;
}

export async function getStoriesByCategory(
  category: StoryCategory,
): Promise<Story[]> {
  const stories = await getStories();
  return stories.filter((story) => story.category === category);
}

/** Slugs for `generateStaticParams`. */
export async function getStorySlugs(): Promise<string[]> {
  const stories = await getStories();
  return stories.map((story) => story.slug);
}
