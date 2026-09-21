import type { FounderIntro, Testimonial } from "@/types";

/*
 * REAL CONTENT ONLY.
 *
 * These start empty on purpose. The home page renders each block only when it
 * has entries, so nothing invented ever reaches the site. Add a quote only
 * with the person's written permission, in their own words, lightly edited
 * for length at most.
 *
 * Example shape (do not uncomment with made-up text):
 *   {
 *     quote: "…",
 *     name: "Anna K.",
 *     context: "Pilot tour, March 2026",
 *     source: "pilot",
 *     country: "Germany",
 *   }
 */
const REAL_TESTIMONIALS: Testimonial[] = [];

/*
 * DESIGN PREVIEW ONLY — `npm run dev` with no real entries above. Each card is
 * badged "Sample", and a production build never sees these, so the invented
 * text cannot reach the live site. Delete once real feedback exists.
 */
const SAMPLE_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We spent a morning picking tea with the women who have worked that slope for thirty years, then ate lunch in their kitchen. Nothing about it felt staged.",
    name: "Sample Guest",
    context: "Pilot tour",
    source: "pilot",
    country: "Germany",
    sample: true,
  },
  {
    quote:
      "The Ayurveda days were paced for rest, not for a checklist. I came home slower in the best way.",
    name: "Sample Guest",
    context: "Pilot tour",
    source: "pilot",
    country: "United Kingdom",
    sample: true,
  },
  {
    quote:
      "They visited the farm twice before sending anyone, and asked what a fair day's payment looks like for us.",
    name: "Sample Partner",
    context: "Organic farm owner",
    source: "partner",
    country: "Sri Lanka",
    sample: true,
  },
  {
    quote:
      "Every question we asked got a straight answer — including the ones where the answer was 'that's not worth your time'.",
    name: "Sample Guest",
    context: "Pilot tour",
    source: "pilot",
    country: "Australia",
    sample: true,
  },
];

const TESTIMONIALS =
  REAL_TESTIMONIALS.length === 0 && process.env.NODE_ENV === "development"
    ? SAMPLE_TESTIMONIALS
    : REAL_TESTIMONIALS;

/** Pilot and partner quotes together, in the order they were added. */
export async function getAllFeedback(): Promise<Testimonial[]> {
  return TESTIMONIALS;
}

/*
 * Fill in with the founder's real name, photo (upload to /public or R2) and
 * their own words. Stays hidden while null.
 */
const FOUNDER: FounderIntro | null = null;

export async function getPilotFeedback(): Promise<Testimonial[]> {
  return TESTIMONIALS.filter((t) => t.source === "pilot");
}

export async function getPartnerEndorsements(): Promise<Testimonial[]> {
  return TESTIMONIALS.filter((t) => t.source === "partner");
}

export async function getFounderIntro(): Promise<FounderIntro | null> {
  return FOUNDER;
}
