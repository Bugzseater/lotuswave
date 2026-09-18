"use server";

import { redirect } from "next/navigation";

import { planTripSchema } from "@/lib/validations";
import type { ActionResult } from "@/types";

/**
 * "Plan Your Trip" submission.
 *
 * Validates, then hands off to storage. Persistence is stubbed until the
 * Firestore `enquiries` collection exists — see the TODOs below.
 */
export async function submitEnquiry(
  _prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = planTripSchema.safeParse({
    ...Object.fromEntries(formData),
    interests: formData.getAll("interests"),
    consent:
      formData.get("consent") === "on" || formData.get("consent") === "true",
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please check the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  // Honeypot hits are accepted silently so bots get no signal.
  if (!parsed.data.website) {
    // TODO(firestore): requireDb().collection("enquiries").add({ ...parsed.data, createdAt })
    // TODO(email): notify the journey designers and send the traveller a receipt.
  }

  redirect("/plan-your-trip/thank-you");
}
