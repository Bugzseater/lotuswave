"use client";

import { useActionState } from "react";

import { submitEnquiry } from "@/actions/enquiries";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import type { ActionResult } from "@/types";

/**
 * Placeholder "Plan Your Trip" form — wires the Server Action and validation
 * end to end. Field layout and copy come with the page work.
 */
export function PlanTripForm() {
  const [state, formAction, pending] = useActionState<
    ActionResult | null,
    FormData
  >(submitEnquiry, null);

  const errors = state?.ok === false ? state.fieldErrors : undefined;

  return (
    <form action={formAction} className="space-y-6">
      {/* Honeypot — hidden from people, tempting to bots. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <div className="space-y-2">
        <Label htmlFor="name">Your name</Label>
        <Input id="name" name="name" required autoComplete="name" />
        {errors?.name ? <p role="alert">{errors.name[0]}</p> : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required autoComplete="email" />
        {errors?.email ? <p role="alert">{errors.email[0]}</p> : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="country">Travelling from</Label>
        <Input id="country" name="country" required autoComplete="country-name" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="travellers">Travellers</Label>
        <Input
          id="travellers"
          name="travellers"
          type="number"
          min={1}
          defaultValue={2}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Tell us about the trip</Label>
        <Textarea id="message" name="message" required />
        {errors?.message ? <p role="alert">{errors.message[0]}</p> : null}
      </div>

      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" name="consent" required className="mt-1" />
        <span>I accept the privacy policy.</span>
      </label>

      {state?.ok === false ? <p role="alert">{state.message}</p> : null}

      <Button type="submit" disabled={pending}>
        {pending ? "Sending…" : "Send enquiry"}
      </Button>
    </form>
  );
}
