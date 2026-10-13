import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { PlanTripForm } from "@/components/forms/plan-trip-form";
import { Container } from "@/components/ui/container";

/** Dedicated backdrop for the form. Falls back to the hero photo until it is in `public/`. */
const FORM_BG = "/bg/planTrip/form-bg.png";
const FALLBACK_BG = "/bg/planTrip/hero.png";

/**
 * The stepped glass form over a full-bleed photograph. A brand
 * tint and a white fade at top and foot keep it calm and let it join the
 * white page around it. The bottom padding leaves room for the scenic footer.
 */
export function PlanTripSection({ sources }: { sources: Record<string, string> }) {
  const bg = existsSync(path.join(process.cwd(), "public", FORM_BG)) ? FORM_BG : FALLBACK_BG;

  return (
    <section
      id="plan-form"
      aria-labelledby="plan-form-heading"
      className="relative isolate scroll-mt-20 overflow-hidden pt-16 pb-32 sm:pt-24 sm:pb-40 lg:pt-28 lg:pb-52"
    >
      <Image src={bg} alt="" aria-hidden="true" fill sizes="100vw" className="-z-30 object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-brand-dark/45" />
      {/* White fades so the photo melts into the page above and the footer below. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-transparent via-20% to-white to-95%"
      />

      <Container className="max-w-[80rem]">
        <div className="text-center">
          <h2
            id="plan-form-heading"
            className="font-display text-3xl leading-[1.08] text-balance text-ink sm:text-4xl lg:text-5xl"
          >
            Tell Us About <em className="font-medium text-brand">Your Trip</em>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-ink/75">
            Four short steps. The more you share, the closer our first draft
            will be.
          </p>
        </div>

        {/* The form is the glass card itself — rail and steps side by side. */}
        <div className="mx-auto mt-10 max-w-6xl">
          <PlanTripForm sources={sources} />
        </div>
      </Container>
    </section>
  );
}
