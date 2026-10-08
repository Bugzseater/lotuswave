import type { DestinationAreaKey, ExperienceCategoryKey } from "@/types";

export const SITE = {
  name: "LotusWave Lanka Tours",
  tagline: "Experience Sri Lanka From Its Roots.",
  /** International format, digits only — used to build the wa.me link. */
  whatsappNumber: "94771234567",
} as const;

export const WHATSAPP_URL = `https://wa.me/${SITE.whatsappNumber}`;

/*
 * Business details shown in the footer. EVERY VALUE BELOW IS A PLACEHOLDER —
 * replace with the registered details before launch.
 */
export const COMPANY = {
  legalName: "LotusWave Lanka Tours (Pvt) Ltd",
  address: ["No. 00, Street Name", "City 00000", "Sri Lanka"],
  /** Display format; the tel: link strips spaces. */
  phone: "+94 77 123 4567",
  email: "hello@lotuswavelankatours.com",
  /** Line guests call while travelling, answered 24/7. */
  emergencyPhone: "+94 77 123 4567",
  /** Office hours, Sri Lanka time. */
  hours: "Monday – Saturday, 8:30 AM – 5:30 PM (GMT +5:30)",
  /** Sri Lanka Tourism Development Authority registration. Hidden while null. */
  sltdaRegistration: null as string | null,
} as const;

/** "What would you like to talk about?" options on the contact form. */
export const CONTACT_INTERESTS = [
  "General question",
  "Agro experiences",
  "Wellness & Ayurveda",
  "A tailor-made journey",
  "Something else",
] as const;

/**
 * The experiences page taxonomy, in page order. `key` is both the section
 * anchor (`/experiences#agro`) and the icon. `types` are the kinds of
 * experience each category covers; every `Experience.type` is one of them.
 */
export const EXPERIENCE_CATEGORIES: readonly {
  key: ExperienceCategoryKey;
  title: string;
  intro: string;
  types: readonly string[];
}[] = [
  {
    key: "agro",
    title: "Agro Experiences",
    intro:
      "Working farms, tea estates and spice gardens, opened to you by the families who tend them. Plant, pick, process and cook — then eat what the land gave that morning.",
    types: [
      "Organic farm visits",
      "Tea journeys",
      "Cinnamon experiences",
      "Spice-garden experiences",
      "Paddy cultivation",
      "Village farming",
      "Farm-to-table",
      "Chilli cultivation and product making",
    ],
  },
  {
    key: "wellness",
    title: "Wellness Experiences",
    intro:
      "Slow, restorative days drawn from Sri Lanka's living traditions — Ayurveda with qualified physicians, yoga in quiet places and food that is cooked to nourish.",
    types: [
      "Ayurveda",
      "Yoga",
      "Meditation",
      "Herbal wellness",
      "Healthy cooking",
      "Digital detox",
      "Nature healing",
    ],
  },
  {
    key: "culture",
    title: "Culture & Community",
    intro:
      "Village life, craft and heritage, hosted by the people who keep them alive. Every visit is arranged with the community and pays the hosts directly.",
    types: [
      "Village life",
      "Traditional crafts",
      "Local cooking",
      "Cultural heritage",
      "Community-hosted experiences",
    ],
  },
  {
    key: "nature",
    title: "Nature & Wildlife",
    intro:
      "Elephant plains, leopard country, rainforest and waterfalls — with naturalist guides who know when to speak and when to let the place do it.",
    types: ["Safaris", "Bird watching", "Rainforest walks", "Hiking", "Waterfalls"],
  },
  {
    key: "food",
    title: "Food Experiences",
    intro:
      "Morning markets, wood-fire kitchens and tea from the estate it grew on. Sri Lanka tasted the way its families eat it.",
    types: [
      "Market-to-table",
      "Traditional cooking",
      "Tea tasting",
      "Spice tasting",
      "Local food trails",
    ],
  },
] as const;

/**
 * The destinations page groups, in page order. `key` is the section anchor
 * (`/destinations#highlands`) and `Destination.area`.
 */
export const DESTINATION_AREAS: readonly {
  key: DestinationAreaKey;
  title: string;
  intro: string;
}[] = [
  {
    key: "ancient",
    title: "The Ancient North",
    intro:
      "Royal capitals, rock fortresses and cave temples on the dry plains — two thousand years of kingdoms, with paddy fields and village farms all around them.",
  },
  {
    key: "highlands",
    title: "The Hill Country",
    intro:
      "Cool air, tea on every slope and the slow blue train. The island's highlands, where Ayurveda, yoga and the estates that grow its tea are all close at hand.",
  },
  {
    key: "wild",
    title: "Wild Sri Lanka",
    intro:
      "Leopard country, elephant plains and the last great rainforest — wild places reached with naturalists who know when to stay quiet.",
  },
  {
    key: "coast",
    title: "The Coasts",
    intro:
      "Two coasts and two seasons. The south and west are at their best in winter, the east in summer — so there is always a beach in the sun.",
  },
] as const;

export const telHref =(phone: string) => `tel:${phone.replace(/\s+/g, "")}`;

/** Legal and policy pages, in footer order. */
export const POLICY_LINKS: readonly NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
  { label: "Booking Conditions", href: "/booking-conditions" },
  { label: "Cancellation and Refund Policy", href: "/cancellation-refund-policy" },
  { label: "Responsible Travel Policy", href: "/responsible-travel-policy" },
] as const;

/*
 * !! PLACEHOLDER HANDLES — guessed, not verified. Replace every URL below with
 * the official profile before launch, or an entry will send guests to someone
 * else's account. An entry with an empty href is hidden, so clearing one is
 * the safe way to drop a network we do not have.
 */
export const SOCIAL_LINKS: readonly NavLink[] = [
  { label: "Facebook", href: "https://facebook.com/lotuswavelankatours" },
  { label: "Instagram", href: "https://instagram.com/lotuswavelankatours" },
  { label: "YouTube", href: "https://youtube.com/@lotuswavelankatours" },
  { label: "TikTok", href: "https://tiktok.com/@lotuswavelankatours" },
] as const;

export type NavLink = {
  label: string;
  href: string;
};

/** Main navigation, in header order. */
export const NAV_LINKS: readonly NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Experiences", href: "/experiences" },
  { label: "Journeys", href: "/journeys" },
  { label: "Destinations", href: "/destinations" },
  { label: "Plan Your Trip", href: "/plan-your-trip" },
  { label: "About Us", href: "/about" },
  { label: "Travel Stories", href: "/travel-stories" },
  { label: "Contact", href: "/contact" },
] as const;
