import type { ImageAsset, Story, StoryCategoryKey, StorySummary } from "@/types";

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

/*
 * Placeholder photography, one entry per picture so the alt text always
 * matches what is actually shown. Swap for R2 photos of our own farms,
 * hosts and stays before launch.
 */
const PHOTO = {
  seedlings: {
    src: unsplash("1466692476868-aef1dfb1e735"),
    alt: "Young green seedlings rising from dark soil in a nursery tray",
  },
  farmland: {
    src: unsplash("1500382017468-9049fed747ef"),
    alt: "Golden farmland glowing under a low morning sun",
  },
  homeCooking: {
    src: unsplash("1528712306091-ed0763094c98"),
    alt: "Hands stirring a home-cooked meal in a pan by a sunlit window",
  },
  riceAndCurry: {
    src: unsplash("1585937421612-70a008356fbe"),
    alt: "Small dishes of rice, greens and curry laid out on a table",
  },
  teaTerraces: {
    src: unsplash("1544015759-237f87d55ef3"),
    alt: "Terraced green tea plantations curving over the hills",
  },
  nineArches: {
    src: unsplash("1566296314736-6eaac1ca0cb9"),
    alt: "A blue train crossing the stone Nine Arches Bridge through dense forest",
  },
  herbalOil: {
    src: unsplash("1544161515-4ab6ce6db874"),
    alt: "A therapist pouring warm herbal oil for a traditional Ayurveda massage",
  },
  spa: {
    src: unsplash("1540555700478-4be289fbecef"),
    alt: "A calm spa setting prepared for a restorative treatment",
  },
  yoga: {
    src: unsplash("1506126613408-eca07ce68773"),
    alt: "A person holding a seated yoga pose on a mat at first light",
  },
  forest: {
    src: unsplash("1441974231531-c6227db76b6e"),
    alt: "Sunlight filtering through tall trees in a green forest",
  },
  sigiriya: {
    src: unsplash("1588598198321-9735fd52455b"),
    alt: "Sigiriya rock fortress rising above green jungle plains",
  },
  palmHeadland: {
    src: unsplash("1580910527739-556eb89f9d65"),
    alt: "Coconut palms on a red-earth headland above a turquoise sea",
  },
  quietBeach: {
    src: unsplash("1507525428034-b723cf961d3e"),
    alt: "Clear turquoise water washing onto a quiet sandy beach",
  },
} satisfies Record<string, ImageAsset>;

const TEAM = "LotusWave Travel Team";

/** Mock collection — replaced by Firestore later; the getters below stay put. */
const STORIES: Story[] = [
  {
    slug: "best-agro-tourism-experiences-sri-lanka",
    title: "The Best Agro Tourism Experiences in Sri Lanka",
    excerpt:
      "Tea plucking at dawn, cinnamon peeling, paddy planting and wood-fire cooking — eight farm experiences that show you the island from its roots.",
    category: "agro",
    author: TEAM,
    publishedAt: "2026-08-18",
    updatedAt: "2026-10-02",
    featured: true,
    image: PHOTO.farmland,
    description: [
      "Most visitors see Sri Lanka's farms through a car window: tea on every slope, paddy fields flashing green, spice stalls on the road to Kandy. Agro tourism turns that view around. You spend the morning with the family who works the land, do a little of the work yourself, and eat what came out of the ground a few hours earlier.",
      "It is also one of the most direct ways your travel money reaches rural households. Two or three farm days spread across a journey is the sweet spot — enough to understand the island's farming life without every day feeling like work. All of the experiences below can be built into a [tailor-made journey](/plan-your-trip).",
    ],
    points: [
      "**Leaf to cup on a tea estate** — pluck with the morning round and follow the leaf through the factory on our [Leaf-to-Cup Tea Estate Day](/experiences/leaf-to-cup-tea-estate-day).",
      "**Seed to plate on an organic farm** — plant, pick and cook a wood-fire lunch near [Sigiriya](/destinations/sigiriya) on the [Seed-to-Plate Farm Experience](/experiences/seed-to-plate-farm-experience).",
      "**Paddy cultivation in the dry zone** — prepare a field, transplant seedlings or join the harvest in the [Cultural Triangle](/destinations/cultural-triangle).",
      "**Cinnamon peeling in the south** — watch true cinnamon rolled into quills by hand inland from [Galle](/destinations/galle).",
      "**Spice gardens of Matale** — pepper, cardamom, nutmeg and vanilla in a working garden, not a roadside shop.",
      "**A day in village life** — bullock carts, canoes and a clay-hearth lunch on our [Day in Village Life](/experiences/a-day-in-village-life).",
      "**Kithul and coconut tapping** — taste kithul treacle the classic way, poured over buffalo curd.",
      "**Home-grown cooking class** — temper spices and balance a spread of curries in a [market-to-table cooking class](/experiences/market-to-table-cooking-class).",
    ],
    images: [
      PHOTO.seedlings,
      PHOTO.teaTerraces,
    ],
    relatedJourneys: ["roots-of-sri-lanka", "grow-and-heal-sri-lanka"],
    seo: {
      title: "Best Agro Tourism Experiences in Sri Lanka (2026 Guide)",
      description:
        "Tea plucking, organic farm days, paddy planting, cinnamon peeling and spice gardens — the best agro tourism experiences in Sri Lanka and how to fit them into your trip.",
    },
  },
  {
    slug: "wellness-travel-sri-lanka-guide",
    title: "The Complete Guide to Wellness Travel in Sri Lanka",
    excerpt:
      "Ayurveda, yoga, meditation and slow, nourishing food — how wellness travel works in Sri Lanka, where to go and how to plan a trip that actually restores you.",
    category: "wellness",
    author: TEAM,
    publishedAt: "2026-08-27",
    featured: false,
    image: PHOTO.herbalOil,
    description: [
      "Sri Lanka has been a place of healing for a very long time. Ayurveda and the island's own tradition of indigenous medicine are part of everyday life here, not a spa menu invented for visitors. Add quiet hill country, warm seas, Buddhist meditation traditions and food built on fresh vegetables and spices, and it is easy to see why wellness travellers keep coming back.",
      "A proper Ayurveda programme starts with a consultation: the doctor takes your pulse, asks about your health, sleep and digestion, and plans treatments and a matching diet around you. If you only have a day, our [Ayurveda Healing Day](/experiences/ayurveda-healing-day) is a good introduction.",
      "For setting, choose the cool hill country around [Kandy](/destinations/kandy) and [Ella](/destinations/ella), the established resorts of [Bentota](/destinations/bentota) and [Galle](/destinations/galle), or the deep quiet of the [Knuckles range](/destinations/knuckles). Our [Wellness Reset](/journeys/wellness-reset) journey is paced entirely for rest.",
    ],
    points: [
      "**Ayurveda** — consultation with a qualified doctor, herbal oil treatments, steam and a diet suited to your constitution.",
      "**Yoga** — sunrise and sunset classes, from gentle hatha to stronger vinyasa, often in open-air shalas.",
      "**Meditation** — guided sessions, sometimes with monks at forest monasteries.",
      "**Nature healing** — rainforest walks, tea-country hikes and time by the sea.",
      "**Nourishing food** — plant-rich Sri Lankan cooking, herbal porridges and fresh king coconut water.",
      "**Digital detox** — remote stays with little or no signal, by design.",
    ],
    images: [
      PHOTO.yoga,
      PHOTO.forest,
    ],
    relatedJourneys: ["wellness-reset", "grow-and-heal-sri-lanka"],
    seo: {
      title: "Wellness Travel in Sri Lanka: The Complete Guide",
      description:
        "Everything you need to plan a wellness trip to Sri Lanka — Ayurveda, yoga, meditation, the best places to go, how long to stay and when to travel.",
    },
  },
  {
    slug: "ayurveda-retreat-vs-wellness-holiday",
    title: "Ayurveda Retreat vs Wellness Holiday: Which Is Right for You?",
    excerpt:
      "One is a structured medical programme, the other a restful trip with treatments built in. How they differ — and how to choose.",
    category: "wellness",
    author: TEAM,
    publishedAt: "2026-09-08",
    featured: false,
    image: PHOTO.spa,
    description: [
      "Both promise rest, both involve Ayurveda, and both are easy to find in Sri Lanka. But an Ayurveda retreat and a wellness holiday are very different trips, and choosing the wrong one is the most common reason guests come home disappointed.",
      "An **Ayurveda retreat** is a structured programme run by qualified Ayurveda doctors. You stay in one place, usually for one to three weeks, with daily treatments, herbal medicines and a prescribed diet. A **wellness holiday** puts rest first but still lets you see the island — a few treatments and daily yoga woven into tea-country walks, heritage sites and nights by the sea.",
      "Can't decide? Many of our guests explore for a week and finish with five to seven nights at a retreat. [Tell us about your goals](/plan-your-trip) and we will suggest the right mix, or start with our [complete guide to wellness travel](/travel-stories/wellness-travel-sri-lanka-guide).",
    ],
    points: [
      "**Main goal** — retreat: healing a specific concern or a deep reset. Holiday: rest, balance and seeing Sri Lanka.",
      "**Length** — retreat: 7 nights minimum, ideally 14–21. Holiday: anything from 5 days up.",
      "**Daily rhythm** — retreat: treatments, rest, meals, early night. Holiday: morning yoga or a treatment, then a gentle outing.",
      "**Diet** — retreat: prescribed. Holiday: your choice.",
      "**Sightseeing** — retreat: very little, by design. Holiday: as much as you want.",
    ],
    images: [
      PHOTO.herbalOil,
      PHOTO.yoga,
    ],
    relatedJourneys: ["wellness-reset", "grow-and-heal-sri-lanka"],
    seo: {
      title: "Ayurveda Retreat vs Wellness Holiday in Sri Lanka — Which to Choose",
      description:
        "Ayurveda retreat or wellness holiday? Compare length, daily rhythm, diet and sightseeing to choose the right restorative trip to Sri Lanka.",
    },
  },
  {
    slug: "best-farm-stays-sri-lanka",
    title: "The Best Farm Stays in Sri Lanka",
    excerpt:
      "From tea-estate bungalows to paddy-field homesteads and spice-garden lodges — the kinds of farm stay Sri Lanka does best, and where to find them.",
    category: "agro",
    author: TEAM,
    publishedAt: "2026-09-15",
    featured: false,
    image: PHOTO.teaTerraces,
    description: [
      "A farm stay is the easiest way to slow a Sri Lanka trip down. Instead of a hotel by the highway, you wake to birdsong over the fields, eat breakfast that was picked that morning, and spend the day as part of the farm's rhythm — or doing nothing at all on the veranda.",
      "We work with family-run farms and estates across the island, where the farm is genuinely worked, meals use its own produce and the family earns directly from your stay. Stay at least two nights: one night is just a bed, but on the second day you start to feel part of the place.",
      "Want a farm stay or two in your itinerary? [Tell us how you like to travel](/plan-your-trip) and we will match you with the right farms.",
    ],
    points: [
      "**Tea-estate bungalows** — fireplaces and misty mornings around [Nuwara Eliya](/destinations/nuwara-eliya) and [Ella](/destinations/ella). Best for couples, walkers and tea lovers.",
      "**Paddy-field homesteads** — lodges among rice fields near [Sigiriya](/destinations/sigiriya). Best for families and first-time visitors.",
      "**Spice-garden and forest lodges** — pepper vines and cocoa under a canopy near the [Knuckles range](/destinations/knuckles). Best for hikers and slow travellers.",
      "**Coastal cinnamon and coconut farms** — farm life inland from [Galle](/destinations/galle), with the beach less than an hour away.",
    ],
    images: [
      PHOTO.forest,
      PHOTO.farmland,
    ],
    relatedJourneys: ["roots-of-sri-lanka", "tea-country-trails"],
    seo: {
      title: "Best Farm Stays in Sri Lanka — Tea Estates, Paddy Fields & Spice Gardens",
      description:
        "The best kinds of farm stay in Sri Lanka, from tea-estate bungalows to paddy-field homesteads and spice-garden lodges, with what to do at each.",
    },
  },
  {
    slug: "10-day-sri-lanka-itinerary",
    title: "A 10-Day Authentic Sri Lanka Itinerary",
    excerpt:
      "Ancient cities, a farm day, tea country, the train to Ella, a safari and the south coast — a ten-day route that sees the island properly without rushing it.",
    category: "guides",
    author: TEAM,
    publishedAt: "2026-09-24",
    featured: false,
    image: PHOTO.nineArches,
    description: [
      "Ten days is enough to see the best of Sri Lanka — if you plan the route well. The island is small, but roads are slow, so the secret is to travel in a loop, keep drives under four hours, and stay at least two nights in most places. This is the route we recommend to first-time visitors, with farm and wellness days built in.",
      "Travelling May to September? Swap the south coast for the [east coast](/destinations/east-coast), which is sunny and calm then. Got 14 days? See our [Complete Sri Lanka](/journeys/complete-sri-lanka) journey. Every journey we plan is private and tailor-made — [start planning yours](/plan-your-trip).",
    ],
    points: [
      "**Day 1** — arrive and rest in [Negombo](/destinations/colombo-negombo), twenty minutes from the airport.",
      "**Days 2–3** — climb [Sigiriya](/destinations/sigiriya) early, then a morning on a family farm and the ruins of Polonnaruwa.",
      "**Days 4–5** — a Matale spice garden, then [Kandy](/destinations/kandy) and the Temple of the Tooth.",
      "**Day 6** — tea country around [Nuwara Eliya](/destinations/nuwara-eliya) on our [Leaf-to-Cup Tea Estate Day](/experiences/leaf-to-cup-tea-estate-day).",
      "**Day 7** — the scenic hill-country train to [Ella](/destinations/ella).",
      "**Day 8** — a jeep safari in [Udawalawe](/destinations/udawalawe) or [Yala](/destinations/yala).",
      "**Days 9–10** — the south coast near [Galle](/destinations/galle), then the expressway to the airport.",
    ],
    images: [
      PHOTO.sigiriya,
      PHOTO.teaTerraces,
    ],
    relatedJourneys: ["roots-of-sri-lanka", "complete-sri-lanka"],
    seo: {
      title: "10-Day Sri Lanka Itinerary — An Authentic Route for First-Time Visitors",
      description:
        "A day-by-day 10-day Sri Lanka itinerary covering Sigiriya, Kandy, tea country, the train to Ella, a safari and the south coast, with farm and wellness days built in.",
    },
  },
  {
    slug: "best-time-to-visit-sri-lanka",
    title: "The Best Time to Visit Sri Lanka",
    excerpt:
      "Two monsoons, two coasts and always somewhere in the sun. A month-by-month guide to when — and where — to go.",
    category: "guides",
    author: TEAM,
    publishedAt: "2026-10-01",
    featured: false,
    image: PHOTO.quietBeach,
    description: [
      "There is no bad time to visit Sri Lanka — just better and worse places at different times of year. The island has two monsoons that hit different coasts in different seasons, so when one side is wet, the other is usually sunny.",
      "The **southwest monsoon** brings rain to the west and south coasts and the western hill country, roughly from May to September. The **northeast monsoon** brings rain to the north and east, roughly from November to February. In between, short tropical storms can come anywhere — usually in the afternoon, after a clear morning.",
      "Farms are active all year, and wellness travel works in any month as long as you follow the sun. Have dates in mind? [Tell us when you're travelling](/plan-your-trip), or start from our [10-day Sri Lanka itinerary](/travel-stories/10-day-sri-lanka-itinerary).",
    ],
    points: [
      "**December to April** — the best time for the south and west coasts, the hill country and the Cultural Triangle. Peak season.",
      "**May to September** — the best time for the [east coast](/destinations/east-coast) and the north. The southwest is wetter, but still very travelable.",
      "**October and November** — inter-monsoon; afternoon showers across much of the island, fewer visitors and lower prices.",
    ],
    images: [
      PHOTO.palmHeadland,
      PHOTO.sigiriya,
    ],
    relatedJourneys: ["complete-sri-lanka", "slow-south-coast"],
    seo: {
      title: "Best Time to Visit Sri Lanka — Month-by-Month Weather Guide",
      description:
        "When to visit Sri Lanka: how the two monsoons work, the best months for each coast, the hill country and national parks, and festivals worth planning around.",
    },
  },
  {
    slug: "farm-to-table-experience-sri-lanka",
    title: "What to Expect from a Farm-to-Table Experience in Sri Lanka",
    excerpt:
      "Picking vegetables, grinding coconut, cooking on a wood fire and eating with your hands — a step-by-step look at a Sri Lankan farm-to-table day.",
    category: "food",
    author: TEAM,
    publishedAt: "2026-10-08",
    featured: false,
    image: PHOTO.riceAndCurry,
    description: [
      "\"Farm-to-table\" means something very literal in rural Sri Lanka. The table may be a few steps from the field, the stove is often a clay hearth fed with wood, and lunch is whatever was ready to pick that morning.",
      "You start early, while it is cool, walking the home garden with your host and picking what is needed for lunch. Back in the kitchen you scrape coconut on a traditional stool grater, grind spices on a stone and learn to temper mustard seeds, curry leaves and onions in hot oil.",
      "Lunch is served on plates or banana leaves, and many families eat with the right hand — cutlery is always there if you prefer. Our [Seed-to-Plate Farm Experience](/experiences/seed-to-plate-farm-experience) near Sigiriya is our classic farm-to-table day.",
    ],
    points: [
      "Red or white rice, often from the family's own paddy",
      "Dhal curry with coconut milk",
      "Two or three vegetable curries from the garden",
      "Pol sambol — fresh coconut with chilli, lime and onion",
      "A mallung of shredded greens with grated coconut",
    ],
    images: [
      PHOTO.seedlings,
      PHOTO.homeCooking,
    ],
    relatedJourneys: ["roots-of-sri-lanka", "grow-and-heal-sri-lanka"],
    seo: {
      title: "Farm-to-Table Experience in Sri Lanka — What to Expect",
      description:
        "Picking from the garden, cooking on a wood fire and eating rice and curry with a farming family — what a Sri Lankan farm-to-table experience involves.",
    },
  },
];

/** Minutes to read at about 220 words a minute, never less than one. */
export function readingMinutes(story: Story): number {
  const words = [...story.description, ...(story.points ?? [])]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/** The card's slice of a story, safe to hand to client components. */
export function toStorySummary(story: Story): StorySummary {
  return {
    slug: story.slug,
    title: story.title,
    excerpt: story.excerpt,
    category: story.category,
    publishedAt: story.publishedAt,
    image: story.image,
    readingMinutes: readingMinutes(story),
  };
}

const byNewest =(a: Story, b: Story) => b.publishedAt.localeCompare(a.publishedAt);

/** Newest first. */
export async function getStories(): Promise<Story[]> {
  return [...STORIES].sort(byNewest);
}

export async function getStoryBySlug(slug: string): Promise<Story | undefined> {
  return STORIES.find((story) => story.slug === slug);
}

/** Newest first. */
export async function getStoriesByCategory(category: StoryCategoryKey): Promise<Story[]> {
  return STORIES.filter((story) => story.category === category).sort(byNewest);
}

/** Same category first, then the newest of the rest. */
export async function getRelatedStories(story: Story, count = 3): Promise<Story[]> {
  const others = STORIES.filter(({ slug }) => slug !== story.slug).sort(byNewest);
  return [
    ...others.filter(({ category }) => category === story.category),
    ...others.filter(({ category }) => category !== story.category),
  ].slice(0, count);
}
