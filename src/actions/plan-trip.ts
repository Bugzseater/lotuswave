"use server";

import { COMFORT_LEVELS, TRIP_BUDGETS, TRIP_INTERESTS } from "@/lib/constants";
import { getDestinationBySlug, getExperienceBySlug, getJourneyBySlug } from "@/lib/data";

export type PlanTripField =
  | "name"
  | "email"
  | "phone"
  | "country"
  | "arrival"
  | "departure"
  | "flexible"
  | "adults"
  | "children"
  | "interests"
  | "comfort"
  | "budget"
  | "dietary"
  | "health"
  | "occasion"
  | "message";

export type PlanTripState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<PlanTripField, string>>;
  /**
   * Echoed back on error so the form keeps what the guest typed. Interests
   * travel as a comma-joined list.
   */
  values?: Partial<Record<PlanTripField, string>>;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const DAY_MS = 24 * 60 * 60 * 1000;

const count = (value: string, min: number, max: number) => {
  const n = Number(value);
  return Number.isInteger(n) && n >= min && n <= max;
};

/** Midnight UTC of a `YYYY-MM-DD` string, or NaN. */
const dayOf = (value: string) => (ISO_DATE.test(value) ? Date.parse(`${value}T00:00:00Z`) : NaN);

/**
 * Resolves the page the guest came from (`?experience=`, `?destination=` or
 * `?journey=`) to a readable label. Unknown slugs are dropped silently.
 */
async function resolveSource(kind: string, slug: string): Promise<string | undefined> {
  if (!slug) return undefined;
  if (kind === "experience") return (await getExperienceBySlug(slug))?.title;
  if (kind === "destination") return (await getDestinationBySlug(slug))?.name;
  if (kind === "journey") return (await getJourneyBySlug(slug))?.title;
  return undefined;
}

/**
 * Plan-your-trip submission — the site's main conversion.
 * Validation is hand-rolled until Zod is added.
 *
 * TODO: deliver the enquiry (Firestore `enquiries` collection and/or email)
 * once the backend is wired up. Until then it is only logged on the server.
 */
export async function submitPlanTrip(
  _prev: PlanTripState,
  formData: FormData,
): Promise<PlanTripState> {
  // Honeypot — real guests never see or fill this field.
  if (String(formData.get("company") ?? "").trim()) {
    return { status: "success", message: "Thank you — we'll be in touch soon." };
  }

  const text = (key: string) => String(formData.get(key) ?? "").trim();

  const interests = formData
    .getAll("interests")
    .map(String)
    .filter((v) => TRIP_INTERESTS.includes(v as (typeof TRIP_INTERESTS)[number]));

  const values = {
    name: text("name"),
    email: text("email"),
    phone: text("phone"),
    country: text("country"),
    arrival: text("arrival"),
    departure: text("departure"),
    flexible: text("flexible"),
    adults: text("adults"),
    children: text("children") || "0",
    interests: interests.join(","),
    comfort: text("comfort"),
    budget: text("budget"),
    dietary: text("dietary"),
    health: text("health"),
    occasion: text("occasion"),
    message: text("message"),
  };

  const errors: PlanTripState["errors"] = {};
  if (values.name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL.test(values.email)) errors.email = "Please enter a valid email address.";
  if (!/^[+\d\s()-]{6,20}$/.test(values.phone))
    errors.phone = "Please enter your WhatsApp number, with the country code.";
  if (values.country.length < 2) errors.country = "Please tell us which country you live in.";

  const arrival = dayOf(values.arrival);
  const departure = dayOf(values.departure);
  // A day of slack so a guest a timezone ahead can still pick "today".
  const today = Date.now() - DAY_MS;
  if (Number.isNaN(arrival)) errors.arrival = "Please choose your arrival date.";
  else if (arrival < today) errors.arrival = "Your arrival date is in the past.";
  if (Number.isNaN(departure)) errors.departure = "Please choose your departure date.";
  else if (!Number.isNaN(arrival) && departure <= arrival)
    errors.departure = "Your departure date should be after your arrival.";

  if (values.flexible !== "yes" && values.flexible !== "no")
    errors.flexible = "Please tell us whether your dates are flexible.";
  if (!count(values.adults, 1, 20)) errors.adults = "Please choose how many adults are travelling.";
  if (!count(values.children, 0, 10)) errors.children = "Please choose how many children are travelling.";
  if (interests.length === 0) errors.interests = "Please choose at least one thing you'd love to do.";
  if (!COMFORT_LEVELS.some((level) => level.key === values.comfort))
    errors.comfort = "Please choose a travel style.";
  if (values.budget && !TRIP_BUDGETS.includes(values.budget as (typeof TRIP_BUDGETS)[number]))
    errors.budget = "Please choose a budget from the list.";

  for (const key of ["dietary", "health", "occasion"] as const) {
    if (values[key].length > 500) errors[key] = "Please keep this under 500 characters.";
  }
  if (values.message.length > 3000)
    errors.message = "Please keep your message under 3,000 characters.";

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors,
      values,
    };
  }

  const source = await resolveSource(text("sourceType"), text("sourceSlug"));

  console.info("[plan-trip] new enquiry", {
    ...values,
    interests,
    source: source ? { type: text("sourceType"), slug: text("sourceSlug"), title: source } : null,
    receivedAt: new Date().toISOString(),
  });

  return {
    status: "success",
    message: `Thank you, ${values.name.split(" ")[0]} — your journey request is with our team. A travel designer will reply personally by email or WhatsApp, usually within one working day, with a first draft of your route.`,
  };
}
