import type {
  ComfortLevel,
  DestinationAreaKey,
  ExperienceCategoryKey,
  GroupType,
  JourneyCategoryKey,
  StoryCategoryKey,
  TravelStyleKey,
} from "@/types";

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

/** "When would you like to travel?" options on the journey enquiry form. */
export const TRAVEL_MONTHS = [
  "Flexible",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

/** "What draws you to Sri Lanka?" options on the plan-your-trip form. */
export const TRIP_INTERESTS = [
  "Agro",
  "Wellness",
  "Ayurveda",
  "Yoga",
  "Culture",
  "Wildlife",
  "Food",
  "Beach",
  "Adventure",
] as const;

/** Budget bands on the plan-your-trip form, per person, excluding flights. */
export const TRIP_BUDGETS = [
  "Under US$1,500",
  "US$1,500 – 2,500",
  "US$2,500 – 4,000",
  "US$4,000 – 6,000",
  "Over US$6,000",
  "Not sure yet",
] as const;

/**
 * The experiences page taxonomy, in page order. `key` is both the section
 * anchor (`/experiences#agro`) and the icon. `slug` is the category's own
 * page, `/experiences/agro-experience`; it shares the `[slug]` route with
 * the experiences, so it must never equal an experience slug. `types` are
 * the kinds of experience each category covers; every `Experience.type` is
 * one of them.
 */
export const EXPERIENCE_CATEGORIES: readonly {
  key: ExperienceCategoryKey;
  slug: string;
  title: string;
  intro: string;
  types: readonly string[];
}[] = [
  {
    key: "agro",
    slug: "agro-experience",
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
    slug: "wellness-experience",
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
    slug: "culture-and-community",
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
    slug: "nature-and-wildlife",
    title: "Nature & Wildlife",
    intro:
      "Elephant plains, leopard country, rainforest and waterfalls — with naturalist guides who know when to speak and when to let the place do it.",
    types: ["Safaris", "Bird watching", "Rainforest walks", "Hiking", "Waterfalls"],
  },
  {
    key: "food",
    slug: "food-experience",
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

/**
 * The journeys page categories, in tab order. `key` is the `?category=`
 * value on `/journeys`. A journey can sit in several.
 */
export const JOURNEY_CATEGORIES: readonly {
  key: JourneyCategoryKey;
  title: string;
  intro: string;
}[] = [
  {
    key: "signature",
    title: "Signature Journeys",
    intro:
      "The journeys we built the company around — farm days, healing days and the island's heritage, joined in the order we would travel them ourselves.",
  },
  {
    key: "agro",
    title: "Agro Journeys",
    intro:
      "Working farms, tea estates and paddy fields, opened to you by the families who tend them. Plant, pick and cook your way across the island.",
  },
  {
    key: "wellness",
    title: "Wellness Journeys",
    intro:
      "Ayurveda with qualified physicians, yoga in quiet places and food cooked to nourish — journeys paced for rest.",
  },
  {
    key: "complete",
    title: "Complete Sri Lanka Tours",
    intro:
      "Ancient cities, hill country, wildlife and the coast in one trip — for travellers who want to see the whole island properly.",
  },
  {
    key: "short",
    title: "Short Escapes",
    intro:
      "Five or six days, one region done well. Easy to add to a business trip, a Maldives stay or a longer journey of your own.",
  },
  {
    key: "luxury",
    title: "Luxury Private Tours",
    intro:
      "Boutique villas, heritage bungalows and a private driver-guide throughout, with every day shaped around you.",
  },
  {
    key: "family",
    title: "Family Journeys",
    intro:
      "Shorter drives, hands-on days and stays with room to run — journeys children remember and parents enjoy too.",
  },
] as const;

/**
 * The travel stories categories, in filter order. `slug` is the `?category=`
 * value on `/travel-stories`, e.g. `/travel-stories?category=agro-tourism`.
 */
export const STORY_CATEGORIES: readonly {
  key: StoryCategoryKey;
  slug: string;
  title: string;
  intro: string;
}[] = [
  {
    key: "agro",
    slug: "agro-tourism",
    title: "Agro Tourism",
    intro:
      "Farm stays, tea estates, spice gardens and paddy fields — what it is really like to spend your days on a working Sri Lankan farm.",
  },
  {
    key: "wellness",
    slug: "wellness-and-ayurveda",
    title: "Wellness & Ayurveda",
    intro:
      "Ayurveda, yoga and slow, restorative travel — how Sri Lanka's healing traditions work, and how to choose the right kind of rest.",
  },
  {
    key: "guides",
    slug: "sri-lanka-travel-guides",
    title: "Sri Lanka Travel Guides",
    intro:
      "Practical planning: when to go, how long to stay, how to get around and how to build a route that is not all driving.",
  },
  {
    key: "food",
    slug: "food-and-culture",
    title: "Food & Culture",
    intro:
      "Rice and curry, village kitchens, festivals and the people who keep the island's traditions alive.",
  },
  {
    key: "responsible",
    slug: "responsible-travel",
    title: "Responsible Travel",
    intro:
      "How to travel in a way that pays farmers, protects wildlife and leaves the places you visit better off.",
  },
  {
    key: "destinations",
    slug: "destinations",
    title: "Destinations",
    intro:
      "Ancient cities, hill country, rainforest and two coasts — where to go in Sri Lanka and what to do once you are there.",
  },
  {
    key: "founder",
    slug: "founders-journey",
    title: "Founder’s Journey",
    intro:
      "Why LotusWave exists — notes from our founder on building a travel company around Sri Lanka's farms and healing traditions.",
  },
] as const;

/** Travel-style filter on `/journeys`, in display order. */
export const TRAVEL_STYLES: readonly { key: TravelStyleKey; label: string }[] = [
  { key: "agro", label: "Agro" },
  { key: "wellness", label: "Wellness" },
  { key: "culture", label: "Culture" },
  { key: "wildlife", label: "Wildlife" },
  { key: "beach", label: "Beach" },
] as const;

/** Duration filter bands on `/journeys`. `max` is inclusive. */
export const JOURNEY_DURATIONS: readonly {
  key: "short" | "week" | "long";
  label: string;
  min: number;
  max: number;
}[] = [
  { key: "short", label: "Up to 6 days", min: 1, max: 6 },
  { key: "week", label: "7 – 9 days", min: 7, max: 9 },
  { key: "long", label: "10 days or more", min: 10, max: Infinity },
] as const;

/** Accommodation standard, lowest first. */
export const COMFORT_LEVELS: readonly {
  key: ComfortLevel;
  label: string;
  text: string;
}[] = [
  {
    key: "comfort",
    label: "Comfort",
    text: "Characterful, well-run guesthouses, farm lodges and small hotels — clean, warm and personally checked by our team.",
  },
  {
    key: "premium",
    label: "Premium",
    text: "Boutique hotels, tea-estate bungalows and four-star retreats with more space, better views and a pool most nights.",
  },
  {
    key: "luxury",
    label: "Luxury",
    text: "The island's finest small hotels and private villas — five-star service, exceptional settings and nothing left to chance.",
  },
] as const;

/** "Travelling as" filter on `/journeys`. */
export const GROUP_TYPES: readonly { key: GroupType; label: string }[] = [
  { key: "couple", label: "Couple" },
  { key: "family", label: "Family" },
  { key: "small-group", label: "Small group" },
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
