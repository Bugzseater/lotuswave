"use client";

import { useActionState } from "react";
import { CheckCircle2, ChevronDown, Send } from "lucide-react";
import {
  submitJourneyInquiry,
  type JourneyInquiryField,
  type JourneyInquiryState,
} from "@/actions/journey-inquiry";
import { Button } from "@/components/ui/button";
import { TRAVEL_MONTHS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const INITIAL: JourneyInquiryState = { status: "idle" };

/* Same field treatment as the contact form. */
const FIELD =
  "mt-1.5 block w-full border border-brand/40 bg-white px-5 text-sm text-ink " +
  "placeholder:text-muted/70 transition-colors duration-200 ease-out " +
  "hover:border-brand/70 focus:border-brand focus:outline-none focus-visible:outline-none " +
  "focus:ring-2 focus:ring-brand/20 aria-invalid:border-brand-dark";

const INPUT = cn(FIELD, "h-11 rounded-pill");
/* The wrapper carries the top margin so the chevron centres on the box. */
const SELECT = cn(INPUT, "mt-0 appearance-none pr-10");

const ADULTS = Array.from({ length: 12 }, (_, i) => String(i + 1));
const CHILDREN = Array.from({ length: 7 }, (_, i) => String(i));

/**
 * Booking enquiry for one journey. The journey travels as a hidden field;
 * dates and party size are the two things a travel designer needs first.
 */
export function JourneyInquiryForm({ journey }: { journey: { slug: string; title: string } }) {
  const [state, action, pending] = useActionState(submitJourneyInquiry, INITIAL);

  if (state.status === "success") {
    return (
      <div role="status" className="flex flex-col items-center py-8 text-center">
        <span className="grid size-14 place-items-center rounded-pill bg-brand-light text-brand">
          <CheckCircle2 aria-hidden="true" className="size-7" strokeWidth={1.5} />
        </span>
        <h3 className="mt-5 font-display text-2xl text-ink">Enquiry sent</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/75">{state.message}</p>
      </div>
    );
  }

  const error = (field: JourneyInquiryField) => state.errors?.[field];
  const value = (field: JourneyInquiryField) => state.values?.[field];
  const describe = (field: JourneyInquiryField) => (error(field) ? `inquiry-${field}-error` : undefined);
  const field = (name: JourneyInquiryField) => ({
    id: `inquiry-${name}`,
    name,
    defaultValue: value(name),
    "aria-invalid": !!error(name),
    "aria-describedby": describe(name),
  });

  // Keyed on the echoed values so the uncontrolled fields pick them up again
  // after a failed submit.
  return (
    <form
      key={JSON.stringify(state.values ?? {})}
      action={action}
      noValidate
      className="grid gap-5 sm:grid-cols-2 sm:gap-x-4"
    >
      <input type="hidden" name="journey" value={journey.slug} />

      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-card bg-brand-light px-4 py-2.5 text-sm font-medium text-brand-dark sm:col-span-2">
          {state.message}
        </p>
      )}

      <Field name="name" label="Full name" error={error("name")}>
        <input {...field("name")} type="text" autoComplete="name" required placeholder="Your name" className={INPUT} />
      </Field>

      <Field name="email" label="Email" error={error("email")}>
        <input
          {...field("email")}
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          className={INPUT}
        />
      </Field>

      <Field name="phone" label="WhatsApp" optional error={error("phone")}>
        <input
          {...field("phone")}
          type="tel"
          autoComplete="tel"
          placeholder="+44 7700 900000"
          className={INPUT}
        />
      </Field>

      <Field name="month" label="When would you like to travel?" error={error("month")}>
        <SelectWrap>
          <select {...field("month")} defaultValue={value("month") ?? ""} required className={SELECT}>
            <option value="" disabled>
              Choose a month
            </option>
            {TRAVEL_MONTHS.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </SelectWrap>
      </Field>

      <Field name="adults" label="Adults" error={error("adults")}>
        <SelectWrap>
          <select {...field("adults")} defaultValue={value("adults") ?? "2"} className={SELECT}>
            {ADULTS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </SelectWrap>
      </Field>

      <Field name="children" label="Children (under 12)" error={error("children")}>
        <SelectWrap>
          <select {...field("children")} defaultValue={value("children") ?? "0"} className={SELECT}>
            {CHILDREN.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </SelectWrap>
      </Field>

      <Field name="message" label="Anything we should know?" optional error={error("message")} className="sm:col-span-2">
        <textarea
          {...field("message")}
          rows={3}
          maxLength={3000}
          placeholder={`Exact dates, changes you'd like to ${journey.title}, dietary needs…`}
          className={cn(FIELD, "resize-y rounded-card py-3")}
        />
      </Field>

      {/* Honeypot — hidden from people and assistive tech, left for bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="inquiry-company">Company</label>
        <input id="inquiry-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col-reverse items-center gap-3 sm:col-span-2 sm:flex-row sm:justify-between">
        <p className="text-xs text-muted">Free to plan, no obligation to book. We never share your details.</p>
        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
          {pending ? "Sending…" : "Send Enquiry"}
          <Send aria-hidden="true" className="size-4" strokeWidth={1.75} />
        </Button>
      </div>
    </form>
  );
}

function SelectWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mt-1.5">
      {children}
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-brand"
      />
    </div>
  );
}

function Field({
  name,
  label,
  optional = false,
  error,
  className,
  children,
}: {
  name: JourneyInquiryField;
  label: string;
  optional?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={`inquiry-${name}`} className="pl-1 text-sm font-medium text-ink">
        {label}
        {optional && <span className="ml-1 font-normal text-muted">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`inquiry-${name}-error`} className="mt-1.5 pl-1 text-sm text-brand-dark">
          {error}
        </p>
      )}
    </div>
  );
}
