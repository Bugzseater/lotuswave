/** Every image carries alt text — the type makes it impossible to forget. */
export type ImageAsset = {
  src: string;
  alt: string;
};

export type SeoFields = {
  title: string;
  description: string;
};

/** Keys into the icon map in `components/experiences/experience-icon.tsx`. */
export type ExperienceIcon = "agro" | "wellness" | "culture" | "nature" | "food" | "beach";

/**
 * A real quote from a real person, published with their permission. Never
 * write one of these by hand for placeholder content.
 *
 * `pilot` and `partner` cover the launch stage. Once real bookings start,
 * add `guest`, `video`, `google` and `tripadvisor` sources here.
 */
export type Testimonial = {
  quote: string;
  /** As the person agreed to be credited, e.g. "Anna K." */
  name: string;
  /** "Pilot tour, March 2026" or "Owner, Sigiriya Organic Farm". */
  context: string;
  source: "pilot" | "partner";
  country?: string;
  /** Dev-only design preview. The card is labelled and never ships. */
  sample?: boolean;
};

export type FounderIntro = {
  name: string;
  role: string;
  /** First person, a few sentences. */
  message: string;
  photo: ImageAsset;
};

/** A packaged multi-day itinerary. */
export type Journey = {
  slug: string;
  title: string;
  durationDays: number;
  /** Who the journey suits, e.g. "Couples, families and slow travellers". */
  bestFor: string;
  /** Two or three lines for the card. */
  summary: string;
  /** Opening paragraph on the detail page. */
  description: string;
  highlights: string[];
  /** Per person in USD. `null` shows "Request Price". */
  startingPrice: number | null;
  /** Content categorisation only — never changes colour. */
  theme: "agro" | "wellness";
  featured: boolean;
  image: ImageAsset;
  seo: SeoFields;
};

/** The four groups the destinations page is arranged in. See `DESTINATION_AREAS`. */
export type DestinationAreaKey = "ancient" | "highlands" | "wild" | "coast";

/**
 * How a month suits a visit. `off` covers monsoon rain and, for Yala, the
 * annual dry-season closure.
 */
export type MonthRating = "best" | "good" | "off";

/** An agro or wellness experience available in or near a destination. */
export type DestinationActivity = {
  title: string;
  text: string;
  /** Links the item to its own page when we run it as an experience. */
  experienceSlug?: string;
};

/** Keys into the icon map in `components/destinations/destination-category.ts`. */
export type DestinationFactIcon =
  | "altitude"
  | "time"
  | "history"
  | "area"
  | "wildlife"
  | "heritage"
  | "season"
  | "distance"
  | "temperature"
  | "nature";

/** A short, checkable number for the card's stats strip, e.g. "1,868 m" / "Altitude". */
export type DestinationFact = {
  icon: DestinationFactIcon;
  /** Keep to about 9 characters. */
  value: string;
  /** Keep to about 15 characters. */
  label: string;
};

/** A place worth the time, tagged by kind for its icon. */
export type DestinationHighlight = {
  kind: "culture" | "nature";
  title: string;
  text: string;
};

/**
 * A kind of stay we book there — a style, not a named property, until the
 * partner list is signed off.
 */
export type DestinationStay = {
  style: string;
  text: string;
  /** 1 = simple and characterful, 3 = luxury. Shown as $ to $$$. */
  priceBand: 1 | 2 | 3;
};

/** A place on the map, with its own guide page at `/destinations/[slug]`. */
export type Destination = {
  slug: string;
  name: string;
  /** Province or coast, e.g. "Central Province". */
  region: string;
  area: DestinationAreaKey;
  /** Short label for the chip, e.g. "Heritage". */
  category: "heritage" | "hills" | "wildlife" | "coast" | "tea" | "city" | "rainforest";
  /** One line under the name. */
  tagline: string;
  image: ImageAsset;
  /** Decimal degrees, used to place the pin on the island map. */
  coordinates: { lat: number; lng: number };
  /** Two facts for the card; the best months are added as a third. */
  facts: [DestinationFact, DestinationFact];
  /** Places to see there, in a sensible visiting order. Shown numbered. */
  sights: string[];
  /** Opening paragraph of the guide. */
  intro: string;
  whyVisit: { title: string; text: string }[];
  bestTime: {
    summary: string;
    /** Exactly twelve entries, January first. */
    months: MonthRating[];
  };
  agro: DestinationActivity[];
  wellness: DestinationActivity[];
  highlights: DestinationHighlight[];
  stays: DestinationStay[];
  /** Slugs of journeys that pass through. */
  relatedJourneys: string[];
  tips: string[];
  seo: SeoFields;
};

/** A card in the home page signature experiences carousel. */
export type SignatureExperience = {
  title: string;
  /** One line for the card. */
  summary: string;
  icon: ExperienceIcon;
  image: ImageAsset;
  /** Optional frameless PNG for the card — replaces the boxed photo there. */
  cutout?: ImageAsset;
  /** Usually a category anchor on the experiences page, e.g. `/experiences#agro`. */
  href: string;
};

/** The five sections of the experiences page. Each is also an icon key. */
export type ExperienceCategoryKey = "agro" | "wellness" | "culture" | "nature" | "food";

/** A single bookable experience with its own page at `/experiences/[slug]`. */
export type Experience = {
  slug: string;
  title: string;
  category: ExperienceCategoryKey;
  /** One of the category's `types` in `EXPERIENCE_CATEGORIES`, e.g. "Farm-to-table". */
  type: string;
  /** The one-line promise under the title. */
  promise: string;
  /** Overview paragraphs. */
  overview: string[];
  /** "What you will do", in the order it happens. */
  activities: string[];
  included: string[];
  /** Display text, e.g. "Full day, about 7 hours". */
  duration: string;
  location: string;
  bestSeason: string;
  suitableFor: string;
  groupSize: string;
  whatToBring: string[];
  /** Safety and accessibility notes. */
  safety: string[];
  /** Responsible-travel impact — who benefits and how. */
  impact: string[];
  /** Hero still. Also the video poster and the reduced-motion fallback. */
  image: ImageAsset;
  /** Optional muted loop over the hero still, e.g. `/video/seed-to-plate.mp4`. */
  heroVideo?: string;
  gallery: ImageAsset[];
  /** Slugs of journeys this experience appears in. */
  relatedJourneys: string[];
  seo: SeoFields;
};
