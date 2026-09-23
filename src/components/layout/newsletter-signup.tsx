"use client";

import { useState } from "react";
import { ArrowRight, SendHorizontal } from "lucide-react";
import { COMPANY, SITE } from "@/lib/constants";

/**
 * Footer sign-up field — one pill input with a round send button, and below it
 * the direct line for guests who would rather just write to us. Sits on the
 * footer's white card: ink type, purple on the button and the inquiry link.
 *
 * There is no mailing-list backend yet, so submitting opens the guest's mail
 * client with a pre-filled subscribe request to the team inbox. Nothing is
 * stored or promised here. Swap the handler for a Server Action once the list
 * lives in Firestore; the markup does not need to change.
 */
export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = encodeURIComponent("Travel inspirations — please add me");
    const body = encodeURIComponent(
      `Hello ${SITE.name},\n\nPlease add ${email} to your travel inspirations list.\n\nThank you.`,
    );
    window.location.href = `mailto:${COMPANY.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const inquiryHref = `mailto:${COMPANY.email}?subject=${encodeURIComponent(
    "Trip inquiry",
  )}`;

  return (
    <div>
      <h2 className="font-sans text-xs font-semibold tracking-[0.2em] text-ink uppercase">
        Receive travel inspirations
      </h2>
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
        Seasonal harvests, quiet coastlines and new wellness retreats — a few
        times a year, never more.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 flex max-w-md items-center gap-3">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            Your email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="Your email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-12 w-full rounded-pill border border-line bg-white px-5 text-sm text-ink transition-colors duration-200 ease-out placeholder:text-muted focus:border-brand"
          />
        </div>
        <button
          type="submit"
          aria-label="Subscribe to travel inspirations"
          className="inline-flex size-12 shrink-0 items-center justify-center rounded-pill bg-brand text-white transition-colors duration-200 ease-out hover:bg-brand-dark"
        >
          <SendHorizontal aria-hidden="true" className="size-4" strokeWidth={1.75} />
        </button>
      </form>

      <p aria-live="polite" className="mt-3 min-h-4 text-xs text-muted">
        {sent ? "Your mail app is open — send the message and you are on the list." : ""}
      </p>

      <p className="mt-5 text-sm text-muted">
        Planning something specific?{" "}
        <a
          href={inquiryHref}
          className="inline-flex items-center gap-1 font-medium text-brand underline underline-offset-4 decoration-brand/40 transition-colors duration-200 ease-out hover:decoration-brand"
        >
          Send us an email inquiry
          <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
        </a>
      </p>
    </div>
  );
}
