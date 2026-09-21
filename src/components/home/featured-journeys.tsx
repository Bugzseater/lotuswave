import { JourneyCard } from "@/components/journeys/journey-card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getFeaturedJourneys } from "@/lib/data";

/**
 * Section 04 — the packaged journeys. Back on white after the tinted,
 * wave-edged experiences section; the cards carry the facts a visitor
 * compares first: length, who it suits, and price.
 */
export async function FeaturedJourneys() {
  const journeys = await getFeaturedJourneys();

  return (
    <Section id="journeys" aria-labelledby="journeys-heading">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
            Featured Journeys
          </p>
          <h2
            id="journeys-heading"
            className="mt-4 font-display text-4xl leading-[1.08] text-balance text-ink sm:text-5xl lg:text-6xl"
          >
            Journeys Designed Around{" "}
            <em className="font-medium text-brand">Meaningful Experiences.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-pretty text-muted sm:text-lg">
            Start from one of our favourite itineraries, then shape every day of
            it around you.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 lg:mt-14 lg:grid-cols-2 lg:gap-6">
          {journeys.map((journey) => (
            <li key={journey.slug}>
              <JourneyCard {...journey} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
