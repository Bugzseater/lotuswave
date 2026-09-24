import type { Journey } from "@/types";

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

/** Mock collection — replaced by Firestore later; the getters below stay put. */
const JOURNEYS: Journey[] = [
  {
    slug: "grow-and-heal-sri-lanka",
    title: "Grow & Heal Sri Lanka",
    durationDays: 10,
    bestFor: "Couples and curious travellers",
    summary:
      "Farm stays and paddy fields in the heartland, then restorative Ayurveda days in the hills — our signature blend of land and healing.",
    description:
      "Ten days that join the two sides of Sri Lanka we love most: hands-on days with farming families in the Cultural Triangle, followed by a gentle Ayurveda programme in the green, cool hill country.",
    highlights: [
      "Two nights on a working family farm near Dambulla",
      "Paddy planting, spice-garden walks and village cooking",
      "Tea-country stay with daily Ayurveda treatments",
      "Private driver-guide throughout",
    ],
    startingPrice: 1890,
    theme: "agro",
    featured: true,
    image: {
      src: unsplash("1466692476868-aef1dfb1e735"),
      alt: "Young green seedlings rising from dark soil in a nursery tray",
    },
    seo: {
      title: "Grow & Heal Sri Lanka — 10-Day Agro & Wellness Journey",
      description:
        "A 10-day Sri Lanka journey combining family farm stays, village cooking and restorative Ayurveda in the hill country.",
    },
  },
  {
    slug: "roots-of-sri-lanka",
    title: "Roots of Sri Lanka",
    durationDays: 7,
    bestFor: "First-time visitors and families",
    summary:
      "Ancient cities, village kitchens and tea country in one unhurried week — Sri Lanka's story told by the people who live it.",
    description:
      "A week through the island's heritage and everyday life: royal cities and rock temples, village homes and markets, and the hill-country estates where Ceylon tea began.",
    highlights: [
      "Sigiriya, Dambulla and the ancient city of Polonnaruwa",
      "Cooking lunch in a village home",
      "Scenic hill-country train ride",
      "Tea-estate visit and tasting",
    ],
    startingPrice: 1250,
    theme: "agro",
    featured: true,
    image: {
      src: unsplash("1528712306091-ed0763094c98"),
      alt: "Hands stirring a home-cooked meal in a pan by a sunlit window",
    },
    seo: {
      title: "Roots of Sri Lanka — 7-Day Culture & Village Journey",
      description:
        "A 7-day Sri Lanka itinerary through ancient cities, village kitchens and hill-country tea estates.",
    },
  },
  {
    slug: "wellness-reset",
    title: "Wellness Reset",
    durationDays: 7,
    bestFor: "Solo travellers and anyone needing rest",
    summary:
      "A quiet week of Ayurveda, yoga and nourishing food, shaped around your own consultation with a physician.",
    description:
      "Seven days to slow right down. Your programme is built after a consultation with a qualified Ayurveda physician, with daily treatments, yoga and meals prepared for your constitution.",
    highlights: [
      "Personal consultation and tailored treatment plan",
      "Daily herbal therapies and yoga",
      "Ayurvedic meals prepared for you",
      "Stay in a small garden retreat",
    ],
    startingPrice: null,
    theme: "wellness",
    featured: true,
    image: {
      src: unsplash("1544161515-4ab6ce6db874"),
      alt: "A therapist pouring warm herbal oil for a traditional Ayurveda massage",
    },
    seo: {
      title: "Wellness Reset — 7-Day Ayurveda Retreat in Sri Lanka",
      description:
        "A 7-day Ayurveda and yoga retreat in Sri Lanka, tailored after a personal consultation with a physician.",
    },
  },
  {
    slug: "complete-sri-lanka",
    title: "Complete Sri Lanka",
    durationDays: 14,
    bestFor: "Travellers wanting the whole island",
    summary:
      "Heritage, hill country, wildlife and the south coast — two weeks that take in everything, without rushing any of it.",
    description:
      "Two weeks around the whole island: the Cultural Triangle, misty tea country, a wildlife safari and slow days on the south coast, with farm and wellness experiences woven through.",
    highlights: [
      "Cultural Triangle and ancient cities",
      "Hill country by scenic train",
      "Safari in Yala or Udawalawe",
      "Unhurried final days on the south coast",
    ],
    startingPrice: 2450,
    theme: "wellness",
    featured: true,
    image: {
      src: unsplash("1506905925346-21bda4d32df4"),
      alt: "Mountain peaks rising above a sea of morning cloud",
    },
    seo: {
      title: "Complete Sri Lanka — 14-Day Island Journey",
      description:
        "A 14-day Sri Lanka tour covering ancient cities, the hill country, wildlife safaris and the south coast.",
    },
  },
  {
    slug: "tea-country-trails",
    title: "Tea Country Trails",
    durationDays: 5,
    bestFor: "Walkers and tea lovers",
    summary:
      "Five cool, green days in the hills — estate walks, a morning with the tea pluckers and the slow blue train to Ella.",
    description:
      "A short escape into Sri Lanka's hill country: stays on working tea estates, guided walks between the terraces, a morning plucking and processing tea with the estate's own families, and the famous train ride through the mountains.",
    highlights: [
      "Two nights on a working tea estate near Nuwara Eliya",
      "Tea plucking and a factory visit with the estate team",
      "Scenic train ride from Nanu Oya to Ella",
      "Easy guided walks to Little Adam's Peak and the Nine Arches Bridge",
    ],
    startingPrice: 890,
    theme: "agro",
    featured: true,
    image: {
      src: unsplash("1544015759-237f87d55ef3"),
      alt: "Terraced green tea plantations curving over the hills",
    },
    seo: {
      title: "Tea Country Trails — 5-Day Hill Country Journey in Sri Lanka",
      description:
        "A 5-day Sri Lanka hill-country journey with tea-estate stays, tea plucking with local families and the scenic train to Ella.",
    },
  },
  {
    slug: "wild-sri-lanka",
    title: "Wild Sri Lanka",
    durationDays: 6,
    bestFor: "Wildlife lovers and photographers",
    summary:
      "Leopards in Yala, elephant herds at Udawalawe and birdlife on the wetlands, with nights in quiet bush camps.",
    description:
      "Six days built around the island's wildlife: game drives in Yala and Udawalawe with experienced naturalist guides, wetland birding by boat, and evenings in small camps at the edge of the parks.",
    highlights: [
      "Morning and afternoon game drives in Yala National Park",
      "Elephant herds at Udawalawe",
      "Wetland birding by boat",
      "Nights in a small tented bush camp",
    ],
    startingPrice: 1390,
    theme: "agro",
    featured: true,
    image: {
      src: unsplash("1456926631375-92c8ce872def"),
      alt: "A leopard resting on a fallen tree trunk",
    },
    seo: {
      title: "Wild Sri Lanka — 6-Day Wildlife Safari Journey",
      description:
        "A 6-day Sri Lanka wildlife journey with leopard safaris in Yala, elephants at Udawalawe and wetland birding.",
    },
  },
  {
    slug: "slow-south-coast",
    title: "Slow South Coast",
    durationDays: 6,
    bestFor: "Couples and anyone wanting to unwind",
    summary:
      "Sea-view yoga, Galle Fort's old streets and long lazy afternoons on quiet southern beaches.",
    description:
      "Six unhurried days on the south coast: a small beach stay with morning yoga, a walk through the ramparts and lanes of Galle Fort, a cooking class with a local family and plenty of time to do nothing at all.",
    highlights: [
      "Morning yoga sessions overlooking the sea",
      "Guided walk through Galle Fort",
      "Home cooking class with a coastal family",
      "Free days on quiet southern beaches",
    ],
    startingPrice: 1090,
    theme: "wellness",
    featured: true,
    image: {
      src: unsplash("1580910527739-556eb89f9d65"),
      alt: "Coconut palms on a red-earth headland above a turquoise sea",
    },
    seo: {
      title: "Slow South Coast — 6-Day Beach & Wellness Journey in Sri Lanka",
      description:
        "A 6-day Sri Lanka south-coast journey with sea-view yoga, Galle Fort and quiet beach days.",
    },
  },
];

export async function getJourneys(): Promise<Journey[]> {
  return JOURNEYS;
}

export async function getFeaturedJourneys(): Promise<Journey[]> {
  return JOURNEYS.filter((journey) => journey.featured);
}

export async function getJourneyBySlug(slug: string): Promise<Journey | undefined> {
  return JOURNEYS.find((journey) => journey.slug === slug);
}
