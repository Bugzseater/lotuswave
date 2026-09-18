"use server";

import { contactSchema } from "@/lib/validations";
import type { ActionResult } from "@/types";

/**
 * General contact form submission.
 *
 * Unlike the enquiry form this stays on the page and reports back inline, so
 * the visitor keeps their place.
 */
export async function submitContact(
  _prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = contactSchema.safeParse({
    ...Object.fromEntries(formData),
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

  if (!parsed.data.website) {
    // TODO(firestore): requireDb().collection("messages").add({ ...parsed.data, createdAt })
    // TODO(email): forward to hello@lotuswavelankatours.com
  }

  return { ok: true, data: undefined };
}
