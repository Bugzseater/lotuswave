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

/** One of the signature experience categories shown on the home page. */
export type ExperienceCategory = {
  slug: string;
  title: string;
  /** One line for the card. */
  summary: string;
  /** Opening paragraph on the detail page. */
  description: string;
  highlights: string[];
  icon: ExperienceIcon;
  image: ImageAsset;
  seo: SeoFields;
};
