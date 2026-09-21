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
const TESTIMONIALS: Testimonial[] = [];

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
