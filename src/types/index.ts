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

/** The journeys page categories. See `JOURNEY_CATEGORIES`. */
export type JourneyCategoryKey =
  | "signature"
  | "agro"
  | "wellness"
  | "complete"
  | "short"
  | "luxury"
  | "family";

/** Travel-style filter keys. See `TRAVEL_STYLES`. */
export type TravelStyleKey = "agro" | "wellness" | "culture" | "wildlife" | "beach";

/** Accommodation standard. See `COMFORT_LEVELS`. */
export type ComfortLevel = "comfort" | "premium" | "luxury";

/** Who a journey is shaped for. See `GROUP_TYPES`. */
export type GroupType = "couple" | "family" | "small-group";

export type Meal = "breakfast" | "lunch" | "dinner";

/** A place the journey stays, in route order. Pinned on the route map. */
export type JourneyStop = {
  /** Unique within the journey; the map pin's key. */
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
  nights: number;
  /** The kind of stay, e.g. "Family-run farm lodge". */
  stay: string;
  /** Links the stop to its destination guide. */
  destinationSlug?: string;
};

/** One day — or a run of days in one place — of the itinerary. */
export type JourneyDay = {
  day: number;
  /** Last day of a run, e.g. `day: 5, toDay: 6` reads "Days 5–6". */
  toDay?: number;
  title: string;
  text: string;
  /** Where the night is spent; `null` on the departure day. */
  overnight: string | null;
  /** Meals included on each day of the run. */
  meals: Meal[];
};

export type Faq = {
  question: string;
  answer: string;
};

/** A packaged multi-day itinerary with its own page at `/journeys/[slug]`. */
export type Journey = {
  slug: string;
  title: string;
  durationDays: number;
  /** Who the journey suits, e.g. "Couples, families and slow travellers". */
  bestFor: string;
  /** The one-line promise under the title. */
  promise: string;
  /** Two or three lines for the card. */
  summary: string;
  /** Opening paragraph on the detail page. */
  description: string;
  /** Further overview paragraphs. */
  overview: string[];
  highlights: string[];
  /** "Who this is for", one reader per line. */
  whoFor: string[];
  /** Per person in USD. `null` shows "Request Price". */
  startingPrice: number | null;
  /** Content categorisation only — never changes colour. */
  theme: "agro" | "wellness";
  categories: JourneyCategoryKey[];
  travelStyles: TravelStyleKey[];
  comfort: ComfortLevel;
  groupTypes: GroupType[];
  featured: boolean;
  image: ImageAsset;
  /** Stops in travel order. Nights add up to `durationDays - 1`. */
  route: JourneyStop[];
  itinerary: JourneyDay[];
  /** What the accommodation standard means on this journey. */
  accommodation: string;
  /** Slugs of experiences built into the journey. */
  experiences: string[];
  /** A sentence on how meals work; the counts come from the itinerary. */
  meals: string;
  transport: string[];
  included: string[];
  notIncluded: string[];
  upgrades: { title: string; text: string }[];
  bestTime: {
    summary: string;
    /** Exactly twelve entries, January first. */
    months: MonthRating[];
  };
  /** Responsible-travel impact — who benefits and how. */
  impact: string[];
  gallery: ImageAsset[];
  faqs: Faq[];
  seo: SeoFields;
};

/** What a journey card and the journeys finder need — kept small for the client. */
export type JourneySummary = Pick<
  Journey,
  | "slug"
  | "title"
  | "durationDays"
  | "bestFor"
  | "startingPrice"
  | "theme"
  | "image"
  | "route"
  | "categories"
  | "travelStyles"
  | "comfort"
  | "groupTypes"
>;

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

/** The travel stories categories. See `STORY_CATEGORIES`. */
export type StoryCategoryKey =
  | "agro"
  | "wellness"
  | "guides"
  | "food"
  | "responsible"
  | "destinations"
  | "founder";

/** An article with its own page at `/travel-stories/[slug]`. */
export type Story = {
  slug: string;
  title: string;
  /** Two lines for the card and the article standfirst. */
  excerpt: string;
  category: StoryCategoryKey;
  /** As credited on the article, e.g. "LotusWave Travel Team". */
  author: string;
  /** ISO date, e.g. "2026-09-14". */
  publishedAt: string;
  /** ISO date of the last real revision. */
  updatedAt?: string;
  featured: boolean;
  image: ImageAsset;
  /**
   * The article text, one string per paragraph. May carry inline links
   * written `[label](/path)` and bold written `**text**`.
   */
  description: string[];
  /** Optional key points, shown as bullets after the description. Same markup. */
  points?: string[];
  /** The two photos that close the article. */
  images: [ImageAsset, ImageAsset];
  /** Slugs to link at the foot of the article, in this order. */
  relatedJourneys: string[];
  seo: SeoFields;
};

/** What a story card and the stories browser need — kept small for the client. */
export type StorySummary = Pick<
  Story,
  "slug" | "title" | "excerpt" | "category" | "publishedAt" | "image"
> & { readingMinutes: number };

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
  /** Where it happens, for the island map pin. */
  coordinates: { lat: number; lng: number };
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
