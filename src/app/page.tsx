import { CustomJourneyCTA } from "@/components/home/custom-journey-cta";
import { Hero } from "@/components/home/hero";
import { Container, Section } from "@/components/ui/container";
import {
  getFeaturedExperiences,
  getFeaturedJourneys,
  getLatestStories,
} from "@/lib/data";

export default async function HomePage() {
  const [experiences, journeys, stories] = await Promise.all([
    getFeaturedExperiences(6),
    getFeaturedJourneys(3),
    getLatestStories(3),
  ]);

  return (
    <>
      <Hero />

      {/* Placeholder section slots — real home sections come with the design work.
          The featured experience cards belong here, not in the hero. */}
      <Section id="featured-experiences" className="scroll-mt-24">
        <Container className="space-y-2">
          <h2 className="font-display text-2xl">Featured experiences</h2>
          <p className="text-sm">{experiences.length} loaded</p>
        </Container>
      </Section>

      <Section className="bg-section">
        <Container className="space-y-2">
          <h2 className="font-display text-2xl">Journeys</h2>
          <p className="text-sm">{journeys.length} loaded</p>
        </Container>
      </Section>

      <Section>
        <Container className="space-y-2">
          <h2 className="font-display text-2xl">Travel stories</h2>
          <p className="text-sm">{stories.length} loaded</p>
        </Container>
      </Section>

      <CustomJourneyCTA />
    </>
  );
}
