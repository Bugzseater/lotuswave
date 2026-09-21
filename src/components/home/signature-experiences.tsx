import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ExperienceRow } from "@/components/experiences/experience-row";
import { Container } from "@/components/ui/container";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Section } from "@/components/ui/section";
import { getExperiences } from "@/lib/data";

/**
 * Section 03 — the six ways into Sri Lanka, set as an editorial index rather
 * than a card grid: one ruled line per experience, title large, photograph as
 * a pill at the end of the line. Sits on the tint so the page alternates
 * white → tint after the brand intro. Each line opens its experience page.
 */
export async function SignatureExperiences() {
  const experiences = await getExperiences();

  return (
    <Section id="experiences" aria-labelledby="experiences-heading" className="bg-section">
      <Container>
        <ScrollReveal>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">
              <p
                data-reveal
                className="flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-brand uppercase"
              >
                <span aria-hidden="true" className="h-px w-10 bg-brand" />
                Signature Experiences
              </p>
              <h2
                id="experiences-heading"
                data-reveal
                className="mt-5 font-display text-4xl leading-[1.08] text-balance text-ink sm:text-5xl lg:text-6xl"
              >
                Discover Sri Lanka{" "}
                <em className="block font-medium text-brand">Differently.</em>
              </h2>
            </div>

            <div data-reveal className="lg:col-span-5 lg:pb-2">
              <p className="text-base leading-relaxed text-pretty text-muted sm:text-lg">
                Six ways into the island — each one shaped around the land, its
                people and the pace you want to travel at.
              </p>
              <Link
                href="/experiences"
                className="group mt-6 inline-flex items-center gap-3 text-sm font-semibold tracking-[0.14em] text-brand uppercase"
              >
                View all experiences
                <span className="grid size-9 place-items-center rounded-pill border border-brand transition-colors duration-200 ease-out group-hover:bg-brand group-hover:text-white">
                  <ArrowRight aria-hidden="true" className="size-4" />
                </span>
              </Link>
            </div>
          </div>

          <ul className="mt-12 border-t border-line sm:mt-16">
            {experiences.map((experience, i) => (
              <li key={experience.slug} data-reveal-step>
                <ExperienceRow {...experience} index={i} />
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
