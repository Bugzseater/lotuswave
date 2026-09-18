import Link from "next/link";

import { Container, Section } from "@/components/ui/container";

/**
 * Placeholder closing CTA for the home page. Full brand background with white
 * text; the CTA itself inverts to white-on-purple so it still reads as primary.
 */
export function CustomJourneyCTA() {
  return (
    <Section className="bg-brand text-white">
      <Container>
        <h2 className="font-display text-3xl sm:text-4xl">
          Nothing here quite right?
        </h2>
        <p className="mt-4 max-w-xl">
          Tell us how you like to travel and we will design the journey around
          it.
        </p>
        <Link
          href="/plan-your-trip"
          className="bg-white text-brand hover:bg-brand-light focus-visible:outline-white mt-8 inline-flex h-11 items-center rounded-pill px-6 text-sm font-medium transition-colors"
        >
          Design My Journey
        </Link>
      </Container>
    </Section>
  );
}
