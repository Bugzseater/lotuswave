"use client";

import { useActionState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { submitContact, type ContactField, type ContactState } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { CONTACT_INTERESTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const INITIAL: ContactState = { status: "idle" };

const FIELD =
  "mt-1.5 block w-full border border-white/80 bg-white/60 px-5 text-sm text-ink " +
  "placeholder:text-muted/70 transition-colors duration-200 ease-out " +
  "hover:border-brand/40 focus:border-brand focus:bg-white/90 focus:outline-none focus-visible:outline-none " +
  "focus:ring-2 focus:ring-brand/20 aria-invalid:border-brand-dark";

/** Single-line inputs are pills; the message box keeps the card radius. */
const INPUT = cn(FIELD, "h-11 rounded-pill");

/**
 * Compact contact form: the three contact fields share one row, the topic is
 * a row of pill chips (radio buttons underneath), and the message box opens
 * short and grows if the guest drags it.
 */
export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, INITIAL);

  if (state.status === "success") {
    return (
      <div role="status" className="flex flex-col items-center py-8 text-center">
        <span className="grid size-14 place-items-center rounded-pill bg-brand-light text-brand">
          <CheckCircle2 aria-hidden="true" className="size-7" strokeWidth={1.5} />
        </span>
        <h3 className="mt-5 font-display text-2xl text-ink">Message sent</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/75">{state.message}</p>
      </div>
    );
  }

  const error = (field: ContactField) => state.errors?.[field];
  const value = (field: ContactField) => state.values?.[field];
  const describe = (field: ContactField) => (error(field) ? `${field}-error` : undefined);

  // Keyed on the echoed values so the uncontrolled fields pick them up again
  // after a failed submit.
  return (
    <form
      key={JSON.stringify(state.values ?? {})}
      action={action}
      noValidate
      className="grid gap-5 sm:grid-cols-3 sm:gap-x-4"
    >
      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-card bg-brand-light px-4 py-2.5 text-sm font-medium text-brand-dark sm:col-span-3">
          {state.message}
        </p>
      )}

      <Field id="name" label="Full name" error={error("name")}>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          defaultValue={value("name")}
          aria-invalid={!!error("name")}
          aria-describedby={describe("name")}
          placeholder="Your name"
          className={INPUT}
        />
      </Field>

      <Field id="email" label="Email" error={error("email")}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={value("email")}
          aria-invalid={!!error("email")}
          aria-describedby={describe("email")}
          placeholder="you@example.com"
          className={INPUT}
        />
      </Field>

      <Field id="phone" label="WhatsApp" optional error={error("phone")}>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          defaultValue={value("phone")}
          aria-invalid={!!error("phone")}
          aria-describedby={describe("phone")}
          placeholder="+44 7700 900000"
          className={INPUT}
        />
      </Field>

      <fieldset
        aria-describedby={describe("interest")}
        className="sm:col-span-3"
      >
        <legend className="text-sm font-medium text-ink">I&rsquo;d like to talk about</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {CONTACT_INTERESTS.map((option) => (
            <label
              key={option}
              className="cursor-pointer rounded-pill border border-white/80 bg-white/60 px-4 py-2 text-sm text-ink transition-colors duration-200 ease-out select-none hover:border-brand/50 has-checked:border-brand has-checked:bg-brand has-checked:text-white has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand"
            >
              <input
                type="radio"
                name="interest"
                value={option}
                required
                defaultChecked={value("interest") === option}
                className="sr-only"
              />
              {option}
            </label>
          ))}
        </div>
        {error("interest") && (
          <p id="interest-error" className="mt-1.5 text-sm text-brand-dark">
            {error("interest")}
          </p>
        )}
      </fieldset>

      <Field id="message" label="Your message" error={error("message")} className="sm:col-span-3">
        <textarea
          id="message"
          name="message"
          rows={3}
          required
          maxLength={3000}
          defaultValue={value("message")}
          aria-invalid={!!error("message")}
          aria-describedby={describe("message")}
          placeholder="Travel dates, who's coming, what you'd love to see or feel…"
          className={cn(FIELD, "resize-y rounded-card py-3")}
        />
      </Field>

      {/* Honeypot — hidden from people and assistive tech, left for bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col-reverse items-center gap-3 sm:col-span-3 sm:flex-row sm:justify-between">
        <p className="text-xs text-muted">
          Free to plan, no obligation to book. We never share your details.
        </p>
        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
          {pending ? "Sending…" : "Send Message"}
          <Send aria-hidden="true" className="size-4" strokeWidth={1.75} />
        </Button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  optional = false,
  error,
  className,
  children,
}: {
  id: ContactField;
  label: string;
  optional?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="pl-1 text-sm font-medium text-ink">
        {label}
        {optional && <span className="ml-1 font-normal text-muted">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 pl-1 text-sm text-brand-dark">
          {error}
        </p>
      )}
    </div>
  );
}
