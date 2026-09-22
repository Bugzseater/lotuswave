import type { ExperienceCategory } from "@/types";

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

/** Mock collection — replaced by Firestore later; the getters below stay put. */
const EXPERIENCES: ExperienceCategory[] = [
  {
    slug: "agro-farm-experiences",
    title: "Agro & Farm Experiences",
    summary: "Plant rice, pick tea and cook what you harvest with farming families.",
    description:
      "Spend your days on working Sri Lankan farms — paddy fields, spice gardens and hill-country tea estates — learning the rhythms of the land from the families who tend it.",
    highlights: [
      "Plant and harvest in traditional paddy fields",
      "Pluck and roll tea with estate workers in the hill country",
      "Walk spice gardens and cook with what you pick",
    ],
    icon: "agro",
    image: {
      src: unsplash("1500382017468-9049fed747ef"),
      alt: "Golden farmland glowing under a low morning sun",
    },
    cutout: {
      src: "/bg/card_experience/farming.png",
      alt: "Two travellers planting rice seedlings in a flooded paddy field",
    },
    seo: {
      title: "Agro & Farm Experiences in Sri Lanka",
      description:
        "Hands-on farm stays, paddy planting, tea plucking and spice-garden cooking with Sri Lankan farming families.",
    },
  },
  {
    slug: "ayurveda-wellness",
    title: "Ayurveda & Wellness",
    summary: "Ancient healing, herbal remedies and slow, restorative days.",
    description:
      "Rest and restore through Sri Lanka's living Ayurveda tradition — consultations with qualified physicians, herbal treatments, yoga and meals prepared for your constitution.",
    highlights: [
      "Personal consultation with an Ayurveda physician",
      "Herbal oil treatments and steam therapies",
      "Yoga and meditation in quiet garden settings",
    ],
    icon: "wellness",
    image: {
      src: unsplash("1540555700478-4be289fbecef"),
      alt: "A calm spa setting prepared for a restorative treatment",
    },
    cutout: {
      src: "/bg/card_experience/village.png",
      alt: "A woman holding a yoga pose on a bamboo deck above terraced rice fields",
    },
    seo: {
      title: "Ayurveda & Wellness Retreats in Sri Lanka",
      description:
        "Authentic Ayurveda treatments, herbal therapies, yoga and restorative stays across Sri Lanka.",
    },
  },
  {
    slug: "culture-local-life",
    title: "Culture & Local Life",
    summary: "Ancient cities, village traditions and the people who keep them alive.",
    description:
      "Walk through two and a half thousand years of history in the Cultural Triangle, then step into village life — crafts, temples and festivals shared by the people who live them.",
    highlights: [
      "Climb Sigiriya and explore the ancient royal cities",
      "Learn traditional crafts from village artisans",
      "Join temple rituals and local festivals",
    ],
    icon: "culture",
    image: {
      src: unsplash("1588598198321-9735fd52455b"),
      alt: "Sigiriya rock fortress rising above green jungle plains",
    },
    cutout: {
      src: "/bg/card_experience/papa.png",
      alt: "Two travellers riding an elephant across a meadow below Sigiriya rock",
    },
    seo: {
      title: "Culture & Local Life Experiences in Sri Lanka",
      description:
        "Ancient cities, village crafts, temples and festivals — Sri Lankan culture experienced alongside local hosts.",
    },
  },
  {
    slug: "nature-wildlife",
    title: "Nature & Wildlife",
    summary: "Rainforest trails, elephant plains and misty hill-country walks.",
    description:
      "From elephant herds in the dry-zone parks to the endemic birds of Sinharaja rainforest, discover an island where remarkable wildlife lives within a few hours of everywhere.",
    highlights: [
      "Safaris to see elephants and leopards in national parks",
      "Guided treks through Sinharaja rainforest",
      "Sunrise walks across the misty hill country",
    ],
    icon: "nature",
    image: {
      src: unsplash("1441974231531-c6227db76b6e"),
      alt: "Sunlight filtering through tall trees in a green forest",
    },
    cutout: {
      src: "/bg/card_experience/card_wild_life.png",
      alt: "A Sri Lankan leopard resting on a tree branch",
    },
    seo: {
      title: "Nature & Wildlife Experiences in Sri Lanka",
      description:
        "Wildlife safaris, rainforest treks and hill-country walks across Sri Lanka's national parks and reserves.",
    },
  },
  {
    slug: "food-culinary-experiences",
    title: "Food & Culinary Experiences",
    summary: "Market mornings, clay-pot curries and recipes from family kitchens.",
    description:
      "Taste Sri Lanka the way its families do — shop the morning markets, cook rice and curry over wood fire and learn recipes handed down through generations.",
    highlights: [
      "Morning market tours with a local cook",
      "Hands-on cooking classes in family kitchens",
      "Tea tastings and street-food walks",
    ],
    icon: "food",
    image: {
      src: unsplash("1504674900247-0877df9cc836"),
      alt: "A freshly cooked dish served on a plate",
    },
    cutout: {
      src: "/bg/card_experience/foog.png",
      alt: "Curry and rice served beside a clay bowl of vegetable curry",
    },
    seo: {
      title: "Food & Culinary Experiences in Sri Lanka",
      description:
        "Cooking classes, market tours and home-style Sri Lankan food shared with local families.",
    },
  },
  {
    slug: "beach-slow-travel",
    title: "Beach & Slow Travel",
    summary: "Quiet shores, long lunches and days with nowhere to be.",
    description:
      "Slow down on Sri Lanka's quieter coasts — palm-lined bays, fishing villages and small, characterful stays where the only schedule is the tide.",
    highlights: [
      "Stays on quiet bays away from the resort strips",
      "Sunrise with the stilt fishermen of the south coast",
      "Whale watching and gentle coastal walks",
    ],
    icon: "beach",
    image: {
      src: unsplash("1507525428034-b723cf961d3e"),
      alt: "Clear turquoise water washing onto a quiet sandy beach",
    },
    cutout: {
      src: "/bg/card_experience/gall.png",
      alt: "A white lighthouse among coconut palms above a turquoise sea",
    },
    seo: {
      title: "Beach & Slow Travel in Sri Lanka",
      description:
        "Quiet beaches, fishing villages and unhurried coastal stays along Sri Lanka's shores.",
    },
  },
];

export async function getExperiences(): Promise<ExperienceCategory[]> {
  return EXPERIENCES;
}

export async function getExperienceBySlug(
  slug: string,
): Promise<ExperienceCategory | undefined> {
  return EXPERIENCES.find((experience) => experience.slug === slug);
}
