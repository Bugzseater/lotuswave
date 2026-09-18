import type {
  DestinationCategory,
  ExperienceCategory,
  ImageAsset,
  JourneyCategory,
  Region,
  StoryCategory,
  Theme,
} from "@/types";

/** Slug → human label, for filters, breadcrumbs and page headings. */
export interface TaxonomyItem<T extends string> {
  slug: T;
  label: string;
  /** Categorisation only — drives iconography, never colour. */
  theme?: Theme;
}

export const EXPERIENCE_CATEGORIES: TaxonomyItem<ExperienceCategory>[] = [
  { slug: "tea-plantation", label: "Tea Plantations", theme: "agro" },
  { slug: "spice-garden", label: "Spice Gardens", theme: "agro" },
  { slug: "farm-stay", label: "Farm Stays", theme: "agro" },
  { slug: "cooking", label: "Cooking & Harvest", theme: "agro" },
  { slug: "village-life", label: "Village Life", theme: "agro" },
  { slug: "ayurveda", label: "Ayurveda", theme: "wellness" },
  { slug: "yoga-meditation", label: "Yoga & Meditation", theme: "wellness" },
  { slug: "herbal-wellness", label: "Herbal Wellness", theme: "wellness" },
];

/**
 * `agro` and `wellness` are themes rather than categories, but they are the two
 * doors the home hero opens — so `/experiences/category/[category]` resolves
 * them alongside the categories above. Still categorisation only: no colour.
 */
export const EXPERIENCE_THEMES: TaxonomyItem<Theme>[] = [
  { slug: "agro", label: "Agro Experiences", theme: "agro" },
  { slug: "wellness", label: "Wellness Experiences", theme: "wellness" },
];

export const JOURNEY_CATEGORIES: TaxonomyItem<JourneyCategory>[] = [
  { slug: "agro-trail", label: "Agro Trails", theme: "agro" },
  { slug: "wellness-retreat", label: "Wellness Retreats", theme: "wellness" },
  { slug: "cultural-heritage", label: "Cultural Heritage", theme: "agro" },
  { slug: "nature-escape", label: "Nature Escapes", theme: "agro" },
  { slug: "honeymoon", label: "Honeymoon", theme: "wellness" },
  { slug: "family", label: "Family Journeys", theme: "agro" },
];

export const DESTINATION_CATEGORIES: TaxonomyItem<DestinationCategory>[] = [
  { slug: "highland", label: "Highlands" },
  { slug: "heritage", label: "Heritage" },
  { slug: "coastal", label: "Coastal" },
  { slug: "wildlife", label: "Wildlife" },
  { slug: "rural", label: "Rural" },
];

export const STORY_CATEGORIES: TaxonomyItem<StoryCategory>[] = [
  { slug: "travel-guide", label: "Travel Guides" },
  { slug: "wellness", label: "Wellness" },
  { slug: "food-and-farming", label: "Food & Farming" },
  { slug: "culture", label: "Culture" },
  { slug: "sustainability", label: "Sustainability" },
];

export const REGIONS: TaxonomyItem<Region>[] = [
  { slug: "cultural-triangle", label: "Cultural Triangle" },
  { slug: "hill-country", label: "Hill Country" },
  { slug: "south-coast", label: "South Coast" },
  { slug: "east-coast", label: "East Coast" },
  { slug: "west-coast", label: "West Coast" },
  { slug: "northern", label: "Northern Province" },
  { slug: "wet-zone", label: "Wet Zone" },
];

export interface NavItem {
  href: string;
  label: string;
  children?: NavItem[];
}

export const MAIN_NAV: NavItem[] = [
  { href: "/experiences", label: "Experiences" },
  { href: "/journeys", label: "Journeys" },
  { href: "/destinations", label: "Destinations" },
  { href: "/travel-stories", label: "Travel Stories" },
  {
    href: "/about",
    label: "About",
    children: [
      { href: "/about/why-travel-with-us", label: "Why Travel With Us" },
      { href: "/about/our-team", label: "Our Team" },
      { href: "/about/responsible-travel", label: "Responsible Travel" },
    ],
  },
  { href: "/contact", label: "Contact" },
];

export const FOOTER_LEGAL_NAV: NavItem[] = [
  { href: "/legal/privacy-policy", label: "Privacy Policy" },
  { href: "/legal/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/legal/booking-conditions", label: "Booking Conditions" },
];

/* ---------------------------------------------------------------------------
 * Home hero
 * ------------------------------------------------------------------------ */

/** Keys the card's icon. Kept a string so this file stays free of components. */
export type HeroPathwayIcon =
  | "agriculture"
  | "wellness"
  | "nature"
  | "culture";

/** One of the four small image cards along the bottom of the hero. */
export interface HeroPathway {
  icon: HeroPathwayIcon;
  /** Also the card's link text, so keep it descriptive. */
  label: string;
  image: ImageAsset;
  href: string;
}

/**
 * Copy and media for the home hero. Headline, supporting text and button labels
 * come from the content guide verbatim — the hero carries no other copy.
 *
 * The background still is split left/right on purpose: the agro side (farmer,
 * fields, harvest baskets) sits left, the wellness side (towel, hot stones,
 * lotus, yoga mat) sits right, and the sunrise sky runs across the top. The
 * layout works with that split — headline centred on the sky, one pathway card
 * over each half, the middle of the frame left open.
 */
export const HERO_CONTENT = {
  media: {
    /*
     * The guide calls for a cinematic clip cutting between farm harvesting, a
     * tea estate, an Ayurvedic treatment, yoga in nature, local cooking and
     * landscape. `HeroMedia` already takes a `video` prop and falls back to
     * this still as its poster — add the source when the footage exists.
     */
    image: {
      url: "/bg/hero.png",
      alt: "Sunrise over Sri Lankan hill country: a farmer working terraced paddy fields beside baskets of harvested fruit and spices on one side, and an Ayurvedic treatment table with rolled towels, hot stones and lotus flowers on the other.",
      width: 1908,
      height: 812,
    },
  },
  headline: {
    lead: "Experience Sri Lanka",
    /** Set in display italic — the second half of the line, not extra copy. */
    emphasis: "From Its Roots.",
  },
  subtitle:
    "Authentic journeys through agriculture, wellness, nature and local communities—personally designed around you.",
  /**
   * Rendered in this order, per the content guide. "Plan My Journey" is still
   * the primary of the two and stays the filled pill — the guide sets the
   * order, CLAUDE.md sets the hierarchy.
   */
  actions: {
    secondary: { href: "/journeys", label: "Explore Our Journeys" },
    primary: { href: "/plan-your-trip", label: "Plan My Journey" },
  },
  /**
   * The four ways into the site, as small image cards along the bottom of the
   * frame. Photography rather than copy — the hero stays light on text.
   */
  pathways: [
    {
      icon: "agriculture",
      label: "Agriculture",
      href: "/experiences/category/agro",
      image: {
        url: "https://images.unsplash.com/photo-1544986581-efac024faf62",
        alt: "Tea pickers working a terraced estate near Nuwara Eliya",
        width: 1200,
        height: 800,
      },
    },
    {
      icon: "wellness",
      label: "Wellness",
      href: "/experiences/category/wellness",
      image: {
        url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef",
        alt: "Warm oil being poured during a traditional Ayurvedic shirodhara treatment",
        width: 1200,
        height: 800,
      },
    },
    {
      icon: "nature",
      label: "Nature",
      href: "/journeys/category/nature-escape",
      image: {
        url: "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9",
        alt: "Train crossing the Nine Arch Bridge through jungle near Ella",
        width: 1200,
        height: 800,
      },
    },
    {
      icon: "culture",
      label: "Local Culture",
      href: "/journeys/category/cultural-heritage",
      image: {
        url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641",
        alt: "Clay pots of Sri Lankan curries laid out on a wooden table",
        width: 1200,
        height: 800,
      },
    },
  ],
  /** Desktop-only cue sitting in the open space between the two cards. */
  scrollHint: {
    href: "#featured-experiences",
    label: "Skip to featured experiences",
  },
} as const satisfies {
  media: { image: ImageAsset };
  headline: { lead: string; emphasis: string };
  subtitle: string;
  actions: Record<"primary" | "secondary", { href: string; label: string }>;
  pathways: readonly HeroPathway[];
  scrollHint: { href: string; label: string };
};

/**
 * Cache tags used by `src/lib/data/*` and invalidated from
 * `POST /api/revalidate` when content changes in the admin.
 */
export const CACHE_TAGS = {
  experiences: "experiences",
  journeys: "journeys",
  destinations: "destinations",
  stories: "stories",
  settings: "settings",
} as const;

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS];

/** Fallback used before `NEXT_PUBLIC_SITE_URL` is configured. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://lotuswavelankatours.com"
).replace(/\/$/, "");
