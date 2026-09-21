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
  /** Sri Lanka Tourism Development Authority registration. Hidden while null. */
  sltdaRegistration: null as string | null,
} as const;

export const telHref = (phone: string) => `tel:${phone.replace(/\s+/g, "")}`;

/** Legal and policy pages, in footer order. */
export const POLICY_LINKS: readonly NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
  { label: "Booking Conditions", href: "/booking-conditions" },
  { label: "Cancellation and Refund Policy", href: "/cancellation-refund-policy" },
  { label: "Responsible Travel Policy", href: "/responsible-travel-policy" },
] as const;

/*
 * Official profiles only. An entry with an empty href is hidden, so a guessed
 * handle never points guests at someone else's account.
 */
export const SOCIAL_LINKS: readonly NavLink[] = [
  { label: "Facebook", href: "" },
  { label: "Instagram", href: "" },
  { label: "YouTube", href: "" },
  { label: "TikTok", href: "" },
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
