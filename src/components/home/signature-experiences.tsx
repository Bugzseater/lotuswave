import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ExperienceCard } from "@/components/experiences/experience-card";
import { JourneySlider } from "@/components/journeys/journey-slider";
import { Container } from "@/components/ui/container";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Section } from "@/components/ui/section";
import { getExperiences } from "@/lib/data";

/**
 * Section 03 — the six ways into Sri Lanka. A centred heading, then the
 * experiences as photo cards in a snap-scrolling carousel with manual
 * previous / next controls. Sits on the tint so the page alternates
 * white → tint after the brand intro. Each card opens its experience page.
 */
export async function SignatureExperiences() {
  const experiences = await getExperiences();

  return (
    <Section id="experiences" aria-labelledby="experiences-heading" className="bg-section pt-10 pb-6 sm:pt-14 sm:pb-8 lg:pt-16 lg:pb-10">
      <Container>
        <ScrollReveal disabled>
          <div className="mx-auto max-w-3xl text-center">
            <p
              data-reveal
              className="flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.2em] text-brand uppercase"
            >
              <span aria-hidden="true" className="h-px w-10 bg-brand" />
              Signature Experiences
              <span aria-hidden="true" className="h-px w-10 bg-brand" />
            </p>
            <h2
              id="experiences-heading"
              data-reveal
              className="mt-5 font-display text-4xl leading-[1.08] text-balance text-ink sm:text-5xl lg:text-6xl"
            >
              Discover Sri Lanka{" "}
              <em className="block font-medium text-brand">Differently.</em>
            </h2>
            <p
              data-reveal
              className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-lg"
            >
              Six ways into the island — each one shaped around the land, its
              people and the pace you want to travel at.
            </p>
          </div>

          <div className="mt-0">
            <JourneySlider
              label="Signature experiences"
              itemName="experience"
              controlClassName="size-10 lg:top-[32%] [&_svg]:size-4"
            >
              {experiences.map((experience) => (
                <li
                  key={experience.slug}
                  data-reveal-card
                  className="w-[85%] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-3rem)/3)]"
                >
                  <ExperienceCard {...experience} />
                </li>
              ))}
            </JourneySlider>
          </div>

          <div data-reveal className="mt-2 flex justify-center">
            <Link
              href="/experiences"
              className="group inline-flex items-center gap-3 text-sm font-semibold tracking-[0.14em] text-brand uppercase"
            >
              View all experiences
              <span className="grid size-9 place-items-center rounded-pill border border-brand transition-colors duration-200 ease-out group-hover:bg-brand group-hover:text-white">
                <ArrowRight aria-hidden="true" className="size-4" />
              </span>
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
