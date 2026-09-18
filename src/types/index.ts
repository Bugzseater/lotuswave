/**
 * Shared content model for LotusWave Lanka Tours.
 *
 * These shapes are the contract between `src/lib/data/*` (mock today, Firestore
 * later) and the UI. Anything rendered on a page should be describable here.
 */

/* ---------------------------------------------------------------------------
 * Primitives
 * ------------------------------------------------------------------------ */

/**
 * Content categorisation only — which side of the offering something belongs
 * to. It does NOT change colours: the site has a single brand palette. Express
 * it with icons, imagery and copy, plus the accent-green badge on agro items.
 */
export type Theme = "agro" | "wellness";

export type Currency = "USD" | "EUR" | "GBP" | "LKR";

export type DurationUnit = "hours" | "days" | "nights";

export type Region =
  | "cultural-triangle"
  | "hill-country"
  | "south-coast"
  | "east-coast"
  | "west-coast"
  | "northern"
  | "wet-zone";

export type ExperienceCategory =
  | "tea-plantation"
  | "spice-garden"
  | "farm-stay"
  | "cooking"
  | "ayurveda"
  | "yoga-meditation"
  | "herbal-wellness"
  | "village-life";

export type JourneyCategory =
  | "agro-trail"
  | "wellness-retreat"
  | "cultural-heritage"
  | "nature-escape"
  | "honeymoon"
  | "family";

export type DestinationCategory =
  | "highland"
  | "heritage"
  | "coastal"
  | "wildlife"
  | "rural";

export type StoryCategory =
  | "travel-guide"
  | "wellness"
  | "food-and-farming"
  | "culture"
  | "sustainability";

export interface ImageAsset {
  /** Absolute URL — R2 in production, Unsplash while we are on mock data. */
  url: string;
  /** Required: every `next/image` on this site must carry meaningful alt text. */
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
  credit?: string;
}

export interface Price {
  amount: number;
  currency: Currency;
  /** e.g. "per person", "per couple", "per group of 4". */
  unit: string;
}

export interface Duration {
  value: number;
  unit: DurationUnit;
  /** Pre-formatted for display, e.g. "5 days / 4 nights". */
  label: string;
}

/* ---------------------------------------------------------------------------
 * SEO
 * ------------------------------------------------------------------------ */

export interface SeoFields {
  /** Falls back to `title` when omitted. */
  metaTitle?: string;
  /** Falls back to `excerpt` when omitted. */
  metaDescription?: string;
  keywords?: string[];
  ogImage?: ImageAsset;
  /** Absolute canonical URL; defaults to the page's own route. */
  canonicalUrl?: string;
  noIndex?: boolean;
}

/** Fields every piece of routable content shares. */
export interface ContentBase {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  images: ImageAsset[];
  seo: SeoFields;
  /** ISO 8601. */
  publishedAt: string;
  /** ISO 8601. */
  updatedAt: string;
}

/* ---------------------------------------------------------------------------
 * Content types
 * ------------------------------------------------------------------------ */

/** A single bookable activity — half a day to a couple of days. */
export interface Experience extends ContentBase {
  theme: Theme;
  category: ExperienceCategory;
  region: Region;
  duration: Duration;
  priceFrom: Price;
  highlights: string[];
  /** Slugs of the destinations this experience takes place in. */
  destinationSlugs: string[];
  featured: boolean;
}

export interface JourneyDay {
  day: number;
  title: string;
  description: string;
  /** Destination slugs visited on this day. */
  destinationSlugs: string[];
}

/** A multi-day itinerary stitched together from experiences and destinations. */
export interface Journey extends ContentBase {
  theme: Theme;
  category: JourneyCategory;
  /** A journey moves through several regions. */
  regions: Region[];
  duration: Duration;
  priceFrom: Price;
  highlights: string[];
  itinerary: JourneyDay[];
  /** Slugs of the experiences included in this journey. */
  experienceSlugs: string[];
  featured: boolean;
}

/** A place on the map. Destinations are shared by both themes. */
export interface Destination extends ContentBase {
  category: DestinationCategory;
  region: Region;
  highlights: string[];
  /** Months that are good to visit, 1 = January. */
  bestMonths: number[];
  coordinates: { lat: number; lng: number };
  /** Typical time spent here, used for itinerary planning. */
  duration?: Duration;
}

export interface Author {
  name: string;
  role?: string;
  avatar?: ImageAsset;
}

/** An editorial article. */
export interface Story extends ContentBase {
  category: StoryCategory;
  /** Optional — not every story is tied to one place. */
  region?: Region;
  author: Author;
  readingMinutes: number;
  tags: string[];
  featured: boolean;
}

/* ---------------------------------------------------------------------------
 * Site settings
 * ------------------------------------------------------------------------ */

export interface ContactDetails {
  email: string;
  phone: string;
  /** International format without "+", e.g. "94771234567". */
  whatsapp: string;
  addressLines: string[];
  city: string;
  country: string;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  youtube?: string;
  tripadvisor?: string;
  linkedin?: string;
}

export interface SiteSettings {
  id: string;
  siteName: string;
  tagline: string;
  description: string;
  /** Absolute site origin, no trailing slash. */
  url: string;
  logo: ImageAsset;
  contact: ContactDetails;
  social: SocialLinks;
  seo: SeoFields;
}

/* ---------------------------------------------------------------------------
 * Forms
 * ------------------------------------------------------------------------ */

/** Result shape returned by every Server Action in `src/actions`. */
export type ActionResult<T = undefined> =
  | { ok: true; data: T }
  | { ok: false; message: string; fieldErrors?: Record<string, string[]> };
