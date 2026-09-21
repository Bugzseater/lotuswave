import { JourneyCard } from "@/components/journeys/journey-card";
import { JourneySlider } from "@/components/journeys/journey-slider";
import { Container } from "@/components/ui/container";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Section } from "@/components/ui/section";
import { getFeaturedJourneys } from "@/lib/data";

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

          <div className="mt-10 sm:mt-12 lg:mt-14">
            <JourneySlider label="Featured journeys">
              {journeys.map((journey, i) => (
                <li
                  key={journey.slug}
                  data-reveal-card
                  // One card-width everywhere: most of the screen on phones so
                  // the next card peeks in, then two, then three across.
                  className="w-[85%] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-3rem)/3)]"
                >
                  <JourneyCard {...journey} index={i} />
                </li>
              ))}
            </JourneySlider>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
