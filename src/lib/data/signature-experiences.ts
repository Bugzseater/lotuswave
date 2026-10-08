import type { SignatureExperience } from "@/types";

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

/**
 * The home page carousel. Each card opens its category on the experiences
 * page. Beach & Slow Travel has no category of its own yet, so it opens the
 * page top.
 */
const SIGNATURE_EXPERIENCES: SignatureExperience[] = [
  {
    title: "Agro & Farm Experiences",
    summary: "Plant rice, pick tea and cook what you harvest with farming families.",
    icon: "agro",
    image: {
      src: unsplash("1500382017468-9049fed747ef"),
      alt: "Golden farmland glowing under a low morning sun",
    },
    cutout: {
      src: "/bg/card_experience/farming.png",
      alt: "Two travellers planting rice seedlings in a flooded paddy field",
    },
    href: "/experiences#agro",
  },
  {
    title: "Ayurveda & Wellness",
    summary: "Ancient healing, herbal remedies and slow, restorative days.",
    icon: "wellness",
    image: {
      src: unsplash("1540555700478-4be289fbecef"),
      alt: "A calm spa setting prepared for a restorative treatment",
    },
    cutout: {
      src: "/bg/card_experience/village.png",
      alt: "A woman holding a yoga pose on a bamboo deck above terraced rice fields",
    },
    href: "/experiences#wellness",
  },
  {
    title: "Culture & Local Life",
    summary: "Ancient cities, village traditions and the people who keep them alive.",
    icon: "culture",
    image: {
      src: unsplash("1588598198321-9735fd52455b"),
      alt: "Sigiriya rock fortress rising above green jungle plains",
    },
    cutout: {
      src: "/bg/card_experience/papa.png",
      alt: "Two travellers riding an elephant across a meadow below Sigiriya rock",
    },
    href: "/experiences#culture",
  },
  {
    title: "Nature & Wildlife",
    summary: "Rainforest trails, elephant plains and misty hill-country walks.",
    icon: "nature",
    image: {
      src: unsplash("1441974231531-c6227db76b6e"),
      alt: "Sunlight filtering through tall trees in a green forest",
    },
    cutout: {
      src: "/bg/card_experience/card_wild_life.png",
      alt: "A Sri Lankan leopard resting on a tree branch",
    },
    href: "/experiences#nature",
  },
  {
    title: "Food & Culinary Experiences",
    summary: "Market mornings, clay-pot curries and recipes from family kitchens.",
    icon: "food",
    image: {
      src: unsplash("1504674900247-0877df9cc836"),
      alt: "A freshly cooked dish served on a plate",
    },
    cutout: {
      src: "/bg/card_experience/foog.png",
      alt: "Curry and rice served beside a clay bowl of vegetable curry",
    },
    href: "/experiences#food",
  },
  {
    title: "Beach & Slow Travel",
    summary: "Quiet shores, long lunches and days with nowhere to be.",
    icon: "beach",
    image: {
      src: unsplash("1507525428034-b723cf961d3e"),
      alt: "Clear turquoise water washing onto a quiet sandy beach",
    },
    cutout: {
      src: "/bg/card_experience/gall.png",
      alt: "A white lighthouse among coconut palms above a turquoise sea",
    },
    href: "/experiences",
  },
];

export async function getSignatureExperiences(): Promise<SignatureExperience[]> {
  return SIGNATURE_EXPERIENCES;
}
