"use server";

import { TRAVEL_MONTHS } from "@/lib/constants";
import { getJourneyBySlug } from "@/lib/data";

export type JourneyInquiryField =
  | "name"
  | "email"
  | "phone"
  | "month"
  | "adults"
  | "children"
  | "message";

export type JourneyInquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<JourneyInquiryField, string>>;
  /** Echoed back on error so the form keeps what the guest typed. */
  values?: Partial<Record<JourneyInquiryField, string>>;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const count = (value: string, min: number, max: number) => {
  const n = Number(value);
  return Number.isInteger(n) && n >= min && n <= max;
};

/**
 * Journey enquiry from the form at the foot of `/journeys/[slug]`.
 * Validation is hand-rolled until Zod is added.
 *
 * TODO: deliver the enquiry (Firestore `enquiries` collection and/or email)
 * once the backend is wired up. Until then it is only logged on the server.
 */
export async function submitJourneyInquiry(
  _prev: JourneyInquiryState,
  formData: FormData,
): Promise<JourneyInquiryState> {
  // Honeypot — real guests never see or fill this field.
  if (String(formData.get("company") ?? "").trim()) {
    return { status: "success", message: "Thank you — we'll be in touch soon." };
  }

  const journey = await getJourneyBySlug(String(formData.get("journey") ?? ""));
  if (!journey) {
    return { status: "error", message: "Sorry, we couldn't tell which journey this is. Please reload and try again." };
  }

  const values = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    month: String(formData.get("month") ?? "").trim(),
    adults: String(formData.get("adults") ?? "").trim(),
    children: String(formData.get("children") ?? "0").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  const errors: JourneyInquiryState["errors"] = {};
  if (values.name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL.test(values.email)) errors.email = "Please enter a valid email address.";
  if (values.phone && !/^[+\d\s()-]{6,20}$/.test(values.phone))
    errors.phone = "Please enter a valid phone number, or leave it blank.";
  if (!TRAVEL_MONTHS.includes(values.month as (typeof TRAVEL_MONTHS)[number])) errors.month = "Please choose when you'd like to travel.";
  if (!count(values.adults, 1, 20)) errors.adults = "Please choose how many adults are travelling.";
  if (!count(values.children, 0, 10)) errors.children = "Please choose how many children are travelling.";
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

  console.info("[journey-inquiry] new enquiry", {
    journey: journey.slug,
    ...values,
    receivedAt: new Date().toISOString(),
  });

  return {
    status: "success",
    message: `Thank you, ${values.name.split(" ")[0]} — your enquiry about ${journey.title} is with our team. A travel designer will reply personally, usually within one working day.`,
  };
}
