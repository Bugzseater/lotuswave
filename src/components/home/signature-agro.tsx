import Image from "next/image";
import {
  CookingPot,
  HandHeart,
  Sprout,
  UtensilsCrossed,
  Wheat,
  type LucideIcon,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { WaveEdge } from "@/components/ui/wave-edge";

type Step = {
  title: string;
  line: string;
  icon: LucideIcon;
};

/** In the order a guest lives them — field first, table last. */
const STEPS: Step[] = [
  {
    title: "Meet local farmers",
    line: "Spend the morning with a farming family and hear how their land has fed them for generations.",
    icon: HandHeart,
  },
  {
    title: "Plant or harvest seasonal crops",
    line: "Step into the paddy, the spice garden or the vegetable plots — whatever the season asks for.",
    icon: Sprout,
  },
  {
    title: "Learn traditional agricultural methods",
    line: "Buffalo ploughing, natural fertilisers and the old ways of reading rain and soil.",
    icon: Wheat,
  },
  {
    title: "Prepare a local meal",
    line: "Carry the harvest to the kitchen and cook rice and curry over a wood fire.",
    icon: CookingPot,
  },
  {
    title: "Enjoy a farm-to-table dining experience",
    line: "Sit down together to a meal that was growing in the ground that morning.",
    icon: UtensilsCrossed,
  },
];

/**
 * Section 05 — the site's differentiator. On white: a centred heading, the
 * rice terraces full-bleed beneath it with the five steps floating over the
 * paddies as a row of equal, see-through glass cards. The
 * photograph's sky is transparent and its foot fades to mist, so it melts
 * into the white above and meets the wellness section's sand on the wave.
 */
export function SignatureAgro() {
  return (
    <Section
      id="agro"
      aria-labelledby="agro-heading"
      className="relative isolate overflow-hidden bg-white pt-6 pb-0 sm:pt-8 sm:pb-0 lg:pt-10 lg:pb-0"
    >
      <Container>
        <ScrollReveal disabled>
          <div className="mx-auto max-w-3xl text-center">
            <p
              data-reveal
              className="flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.2em] text-brand uppercase"
            >
              <span aria-hidden="true" className="h-px w-10 bg-brand" />
              Signature Agro Experience
              <span aria-hidden="true" className="h-px w-10 bg-brand" />
            </p>
            <h2
              id="agro-heading"
              data-reveal
              className="mt-5 font-display text-4xl leading-[1.08] text-balance text-ink sm:text-5xl lg:text-6xl"
            >
              From the Land{" "}
              <em className="block font-medium text-brand">to Your Table.</em>
            </h2>
            <p
              data-reveal
              className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-lg"
            >
              A full day on a working Sri Lankan farm — from the first step into
              the field to the last bite of a meal you helped grow and cook.
            </p>
          </div>
        </ScrollReveal>
      </Container>

      {/* The stage: rice terraces full-bleed, the steps floating over the
          paddies as glass cards and the CTA resting in the mist. The PNG's
          sky is transparent, so the top of the stage is the page's white —
          pulled up under the intro so that empty sky doesn't open a gap. */}
      <div className="relative isolate -mt-10 sm:-mt-20 lg:-mt-32">
        <Image
          src="/bg/Vila.png"
          alt="Terraced rice paddies flooded with water beneath a line of coconut palms"
          fill
          sizes="100vw"
          className="-z-10 object-cover object-bottom"
        />

        <Container className="pt-56 pb-24 sm:pt-72 sm:pb-28 lg:pt-104 lg:pb-32">
          <ScrollReveal disabled>
            <ol className="grid gap-12 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-5 lg:gap-5">
              {STEPS.map(({ title, line, icon: Icon }, i) => (
                <li
                  key={title}
                  data-reveal-step
                  className="flex"
                >
                  <div className="relative flex w-full flex-col items-center rounded-card bg-white/45 px-5 pt-10 pb-7 text-center shadow-header ring-1 ring-white/60 backdrop-blur-sm">
                    <span className="absolute -top-7 left-1/2 grid size-14 -translate-x-1/2 place-items-center rounded-pill bg-brand text-white ring-4 ring-white">
                      <Icon aria-hidden="true" className="size-6" strokeWidth={1.5} />
                    </span>
                    <p className="text-xs font-semibold tracking-[0.16em] text-brand uppercase">
                      Step {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 font-display text-xl leading-tight font-medium text-balance text-ink">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-pretty text-ink/80">
                      {line}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-14 flex justify-center sm:mt-20">
              <ButtonLink
                href="/experiences/agro-farm-experiences"
                size="lg"
                className="w-full shadow-header sm:w-auto"
              >
                Explore Agro Experiences
              </ButtonLink>
            </div>
          </ScrollReveal>
        </Container>
      </div>

      {/* Meets the wellness section's sand on the wave, with no white strip. */}
      <WaveEdge position="bottom" flat className="fill-warm-sand" />
    </Section>
  );
}
