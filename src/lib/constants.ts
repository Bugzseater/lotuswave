export const SITE = {
  name: "LotusWave Lanka Tours",
  tagline: "Experience Sri Lanka From Its Roots.",
  /** International format, digits only — used to build the wa.me link. */
  whatsappNumber: "94771234567",
} as const;

export const WHATSAPP_URL = `https://wa.me/${SITE.whatsappNumber}`;

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
