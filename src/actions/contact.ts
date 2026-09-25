"use server";

import { CONTACT_INTERESTS } from "@/lib/constants";

export type ContactField = "name" | "email" | "phone" | "interest" | "message";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<ContactField, string>>;
  /** Echoed back on error so the form keeps what the guest typed. */
  values?: Partial<Record<ContactField, string>>;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Contact form submission. Validation is hand-rolled until Zod is added.
 *
 * TODO: deliver the enquiry (Firestore `enquiries` collection and/or email)
 * once the backend is wired up. Until then it is only logged on the server.
 */
export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot — real guests never see or fill this field.
  if (String(formData.get("company") ?? "").trim()) {
    return { status: "success", message: "Thank you — we'll be in touch soon." };
  }

  const values = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    interest: String(formData.get("interest") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  const errors: ContactState["errors"] = {};
  if (values.name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL.test(values.email)) errors.email = "Please enter a valid email address.";
  if (values.phone && !/^[+\d\s()-]{6,20}$/.test(values.phone))
    errors.phone = "Please enter a valid phone number, or leave it blank.";
  if (!CONTACT_INTERESTS.includes(values.interest as (typeof CONTACT_INTERESTS)[number]))
    errors.interest = "Please choose what you'd like to talk about.";
  if (values.message.length < 10)
    errors.message = "Please write a little more about your trip (10+ characters).";
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

  console.info("[contact] new enquiry", { ...values, receivedAt: new Date().toISOString() });

  return {
    status: "success",
    message: `Thank you, ${values.name.split(" ")[0]} — your message is with our team. We usually reply within one working day.`,
  };
}
