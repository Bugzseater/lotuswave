"use client";

import { useActionState } from "react";

import { submitContact } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import type { ActionResult } from "@/types";

/** Placeholder contact form — action and validation wired, styling to come. */
export function ContactForm() {
  const [state, formAction, pending] = useActionState<
    ActionResult | null,
    FormData
  >(submitContact, null);

  const errors = state?.ok === false ? state.fieldErrors : undefined;

  return (
    <form action={formAction} className="space-y-6">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <div className="space-y-2">
        <Label htmlFor="contact-name">Your name</Label>
        <Input id="contact-name" name="name" required autoComplete="name" />
        {errors?.name ? <p role="alert">{errors.name[0]}</p> : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-email">Email</Label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
        {errors?.email ? <p role="alert">{errors.email[0]}</p> : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-subject">Subject</Label>
        <Input id="contact-subject" name="subject" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea id="contact-message" name="message" required />
        {errors?.message ? <p role="alert">{errors.message[0]}</p> : null}
      </div>

      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" name="consent" required className="mt-1" />
        <span>I accept the privacy policy.</span>
      </label>

      {state?.ok === true ? (
        <p role="status">Thank you — we will be in touch shortly.</p>
      ) : null}
      {state?.ok === false ? <p role="alert">{state.message}</p> : null}

      <Button type="submit" disabled={pending}>
        {pending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
