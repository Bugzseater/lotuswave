import { CACHE_TAGS, SITE_URL } from "@/lib/constants";
import type { SiteSettings } from "@/types";

/**
 * Site settings.
 *
 * Currently a single hard-coded document. To move to Firestore, read
 * `settings/site` and tag it with `CACHE_TAGS.settings` — the exported
 * signature must not change.
 */

const MOCK_SETTINGS: SiteSettings = {
  id: "site",
  siteName: "LotusWave Lanka Tours",
  tagline: "Agro & wellness journeys through Sri Lanka",
  description:
    "Small-group and private journeys across Sri Lanka's tea estates, spice gardens, farms and Ayurvedic traditions — designed slowly, run responsibly.",
  url: SITE_URL,
  /**
   * The supplied artwork, used as-is. This feeds Organization JSON-LD, where
   * search engines want the logo as the brand actually presents it — not the
   * keyed-out variants the header and footer render.
   */
  logo: {
    url: "/logo/logo.jpg",
    alt: "LotusWave Lanka Tours",
    width: 1937,
    height: 2048,
  },
  contact: {
    email: "hello@lotuswavelankatours.com",
    phone: "+94 77 123 4567",
    whatsapp: "94771234567",
    addressLines: ["No. 42, Peradeniya Road"],
    city: "Kandy",
    country: "Sri Lanka",
  },
  social: {
    instagram: "https://instagram.com/lotuswavelankatours",
    facebook: "https://facebook.com/lotuswavelankatours",
    youtube: "https://youtube.com/@lotuswavelankatours",
    tripadvisor: "https://tripadvisor.com/lotuswavelankatours",
  },
  seo: {
    metaTitle: "LotusWave Lanka Tours — Agro & Wellness Travel in Sri Lanka",
    metaDescription:
      "Tea estates, spice gardens, farm stays and Ayurvedic retreats across Sri Lanka. Private and small-group journeys, designed around how you want to travel.",
    keywords: [
      "Sri Lanka agro tourism",
      "Sri Lanka wellness retreat",
      "Ayurveda Sri Lanka",
      "tea estate tour",
    ],
  },
};

export async function getSettings(): Promise<SiteSettings> {
  // TODO(firestore): db.collection("settings").doc("site").get()
  void CACHE_TAGS.settings;
  return MOCK_SETTINGS;
}
