import { ExperienceCard } from "@/components/experiences/experience-card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { WaveEdge } from "@/components/ui/wave-edge";
import { getExperiences } from "@/lib/data";

/**
 * Section 03 — the six ways into Sri Lanka. Sits on the tinted section
 * background so the white cards lift off it, and so the page alternates
 * white → tint after the brand intro. Each card opens its experience page.
 */
export async function SignatureExperiences() {
  const experiences = await getExperiences();

  return (
    <Section
      id="experiences"
      aria-labelledby="experiences-heading"
      // Extra top and bottom room so the content clears the waves.
      className="relative overflow-hidden bg-section pt-28 pb-28 sm:pt-36 sm:pb-36 lg:pt-44 lg:pb-44"
    >
      <WaveEdge position="top" />
      <WaveEdge position="bottom" />

      <Container className="max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
            Signature Experiences
          </p>
          <h2
            id="experiences-heading"
            className="mt-4 font-display text-4xl leading-[1.08] text-balance text-ink sm:text-5xl lg:text-6xl"
          >
            Discover Sri Lanka{" "}
            <em className="font-medium text-brand">Differently.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-pretty text-muted sm:text-lg">
            Six ways into the island — each one shaped around the land, its
            people and the pace you want to travel at.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-5">
          {experiences.map((experience) => (
            <li key={experience.slug}>
              <ExperienceCard {...experience} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
