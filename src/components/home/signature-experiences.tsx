import { ExperienceCard } from "@/components/experiences/experience-card";
import { Container } from "@/components/ui/container";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Section } from "@/components/ui/section";
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
      className="bg-section"
    >
      <Container className="max-w-6xl">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p
              data-reveal
              className="text-xs font-semibold tracking-[0.2em] text-brand uppercase"
            >
              Signature Experiences
            </p>
            <h2
              id="experiences-heading"
              data-reveal
              className="mt-4 font-display text-4xl leading-[1.08] text-balance text-ink sm:text-5xl lg:text-6xl"
            >
              Discover Sri Lanka{" "}
              <em className="font-medium text-brand">Differently.</em>
            </h2>
            <p
              data-reveal
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-pretty text-muted sm:text-lg"
            >
              Six ways into the island — each one shaped around the land, its
              people and the pace you want to travel at.
            </p>
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-5">
            {experiences.map((experience) => (
              <li key={experience.slug} data-reveal-card>
                <ExperienceCard {...experience} />
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
