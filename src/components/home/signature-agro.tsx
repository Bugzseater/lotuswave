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

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=80`;

const IMAGES = {
  field: {
    src: unsplash("1500382017468-9049fed747ef"),
    alt: "Golden farmland glowing under a low morning sun",
  },
  table: {
    src: unsplash("1504674900247-0877df9cc836"),
    alt: "A freshly cooked dish served on a plate",
  },
};

/**
 * Section 05 — the site's differentiator, so it gets its own shape: the only
 * sage-green section on the page, cut into the white page by a wave at each
 * edge, with a two-photo collage (field → plate) and the experience told as a
 * five-step path from land to table.
 *
 * Green is this section's one accent. Brand purple sinks on it, so everything
 * on the green is white: headings solid, supporting copy at 90% (sage is
 * lighter than accent-green, so 75% would fail at body size), hairlines at
 * 25–30%. A faint light bloom top-right keeps the flat green from reading as
 * a slab.
 */
export function SignatureAgro() {
  return (
    <Section
      id="agro"
      aria-labelledby="agro-heading"
      // Extra top and bottom room so the content clears the waves.
      className="relative isolate overflow-hidden bg-accent-green-soft pt-28 pb-28 text-white sm:pt-36 sm:pb-36 lg:pt-44 lg:pb-44"
    >
      <div
        aria-hidden="true"
        className="absolute -top-1/4 -right-1/4 -z-10 aspect-square w-[80%] rounded-pill bg-radial from-white/12 to-transparent to-70%"
      />
      <WaveEdge position="top" flat className="fill-white" />
      {/* Filled with the wellness section's sand so the two sections meet
          on the wave, with no white strip between them. */}
      <WaveEdge position="bottom" flat className="fill-warm-sand" />
      <Container>
        <ScrollReveal className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          {/* Collage — field large, plate overlapping its lower corner. The
              plate rises further, so it trails the field into place. */}
          <div className="relative pr-10 pb-14 sm:pr-16 sm:pb-20">
            <div
              data-reveal-image
              className="relative aspect-[4/5] overflow-hidden rounded-card bg-white/10"
            >
              <Image
                src={IMAGES.field.src}
                alt={IMAGES.field.alt}
                fill
                sizes="(min-width: 1024px) 42vw, 90vw"
                className="object-cover"
              />
            </div>

            <div
              data-reveal-image="140"
              className="absolute right-0 bottom-0 aspect-square w-[46%] overflow-hidden rounded-card bg-white/10 ring-6 ring-accent-green-soft"
            >
              <Image
                src={IMAGES.table.src}
                alt={IMAGES.table.alt}
                fill
                sizes="(min-width: 1024px) 20vw, 42vw"
                className="object-cover"
              />
            </div>

            <p
              data-reveal-step
              className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-pill bg-white/90 px-4 py-2 text-xs font-semibold text-ink backdrop-blur-sm sm:text-sm"
            >
              <Sprout aria-hidden="true" className="size-4 text-accent-green" strokeWidth={1.75} />
              Only with LotusWave
            </p>
          </div>

          <div>
            <p
              data-reveal
              className="text-xs font-semibold tracking-[0.2em] text-white/90 uppercase"
            >
              Signature Agro Experience
            </p>
            <h2
              id="agro-heading"
              data-reveal
              className="mt-4 font-display text-4xl leading-[1.08] text-balance text-white sm:text-5xl lg:text-6xl"
            >
              From the Land{" "}
              <em className="font-medium text-white/85">to Your Table.</em>
            </h2>
            <p data-reveal className="mt-6 max-w-xl text-sm leading-relaxed text-pretty text-white/90 sm:text-base">
              A full day on a working Sri Lankan farm — from the first step into
              the field to the last bite of a meal you helped grow and cook.
            </p>

            <ol className="mt-9 space-y-6">
              {STEPS.map(({ title, line, icon: Icon }, i) => (
                <li
                  key={title}
                  data-reveal-step
                  className="relative pl-14 before:absolute before:top-11 before:bottom-[-1.5rem] before:left-[1.2rem] before:w-px before:bg-white/30 last:before:hidden"
                >
                  <span className="absolute top-0 left-0 grid size-10 place-items-center rounded-pill bg-white/15 text-white ring-1 ring-white/30">
                    <Icon aria-hidden="true" className="size-[18px]" strokeWidth={1.5} />
                  </span>
                  <p className="text-[10px] font-semibold tracking-[0.16em] text-white/85 uppercase">
                    Step {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 font-display text-lg leading-tight font-semibold text-white sm:text-xl">
                    {title}
                  </h3>
                  <p className="mt-1 max-w-md text-[13px] leading-relaxed text-white/90">{line}</p>
                </li>
              ))}
            </ol>

            <div data-reveal-step className="mt-10">
              <ButtonLink
                href="/experiences/agro-farm-experiences"
                size="lg"
                // Purple sinks on green, so the CTA inverts: solid white, green label.
                className="w-full bg-white text-accent-green hover:bg-white/85 focus-visible:outline-white sm:w-auto"
              >
                Explore Agro Experiences
              </ButtonLink>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
