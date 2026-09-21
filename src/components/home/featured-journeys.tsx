import { JourneyCard } from "@/components/journeys/journey-card";
import { Container } from "@/components/ui/container";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Section } from "@/components/ui/section";
import { getFeaturedJourneys } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Wide/narrow, then narrow/wide on desktop, so the grid reads as a sequence
 * of posters rather than four equal tiles. Repeats past four.
 */
const SPANS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

/**
 * Section 04 — the packaged journeys, back on white after the tinted
 * experiences section. Each poster carries the facts a visitor compares
 * first: length, who it suits, and price.
 */
export async function FeaturedJourneys() {
  const journeys = await getFeaturedJourneys();

  return (
    <Section id="journeys" aria-labelledby="journeys-heading">
      <Container>
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p
              data-reveal
              className="text-xs font-semibold tracking-[0.2em] text-brand uppercase"
            >
              Featured Journeys
            </p>
            <h2
              id="journeys-heading"
              data-reveal
              className="mt-4 font-display text-4xl leading-[1.08] text-balance text-ink sm:text-5xl lg:text-6xl"
            >
              Journeys Designed Around{" "}
              <em className="font-medium text-brand">Meaningful Experiences.</em>
            </h2>
            <p
              data-reveal
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-pretty text-muted sm:text-lg"
            >
              Start from one of our favourite itineraries, then shape every day
              of it around you.
            </p>
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 lg:mt-14 lg:grid-cols-12 lg:gap-6">
            {journeys.map((journey, i) => (
              <li
                key={journey.slug}
                data-reveal-card
                className={cn(SPANS[i % SPANS.length])}
              >
                <JourneyCard {...journey} index={i} />
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
