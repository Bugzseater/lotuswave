import Image from "next/image";
import { Compass, Flower2, HandHeart, Sprout, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

type Pillar = {
  title: string;
  line: string;
  icon: LucideIcon;
  image: { src: string; alt: string };
};

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;

const PILLARS: Pillar[] = [
  {
    title: "Grow",
    line: "Plant, harvest and cook on working family farms.",
    icon: Sprout,
    image: {
      src: unsplash("1466692476868-aef1dfb1e735"),
      alt: "Young green seedlings rising from dark soil in a nursery tray",
    },
  },
  {
    title: "Heal",
    line: "Ayurveda, herbal remedies and slow, restorative days.",
    icon: Flower2,
    image: {
      src: unsplash("1544161515-4ab6ce6db874"),
      alt: "A therapist pouring warm herbal oil for a traditional Ayurveda massage",
    },
  },
  {
    title: "Explore",
    line: "Ancient rock fortresses, rainforest and hill country.",
    icon: Compass,
    image: {
      src: unsplash("1588598198321-9735fd52455b"),
      alt: "Sigiriya rock fortress rising above green jungle plains",
    },
  },
  {
    title: "Connect",
    line: "Share kitchens, stories and traditions with local hosts.",
    icon: HandHeart,
    image: {
      src: unsplash("1528712306091-ed0763094c98"),
      alt: "Hands stirring a home-cooked meal in a pan by a sunlit window",
    },
  },
];

/**
 * Section 02 — what the company is, in one line, then the four ideas every
 * journey is built from. The photographs do the talking; each card carries a
 * single word and a single line.
 *
 * On large screens the second and fourth cards drop half a step so the row
 * reads as a loose sequence rather than a rigid grid.
 */
export function BrandIntro() {
  return (
    <Section aria-labelledby="brand-intro-heading">
      <Container>
        <ScrollReveal>
        <div className="mx-auto max-w-3xl text-center">
          <p
            data-reveal
            className="text-xs font-semibold tracking-[0.2em] text-brand uppercase"
          >
            Who We Are
          </p>
          <h2
            id="brand-intro-heading"
            data-reveal
            className="mt-4 font-display text-4xl leading-[1.08] text-balance text-ink sm:text-5xl lg:text-6xl"
          >
            More Than a Holiday.{" "}
            <em className="font-medium text-brand">A Deeper Connection.</em>
          </h2>
          <p
            data-reveal
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-pretty text-muted sm:text-lg"
          >
            We create meaningful journeys that connect you with Sri Lanka’s land,
            people, food, traditions and natural healing culture.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-5 lg:mt-20 lg:grid-cols-4 lg:gap-6">
          {PILLARS.map((pillar, i) => (
            <li key={pillar.title} className={cn(i % 2 === 1 && "lg:translate-y-12")}>
              {/* Animated on this wrapper, not the li, so the reveal's
                  transform never touches the stagger offset. */}
              <div data-reveal-card>
                <PillarCard {...pillar} />
              </div>
            </li>
          ))}
        </ul>
        </ScrollReveal>
      </Container>
    </Section>
  );
}

function PillarCard({ title, line, icon: Icon, image }: Pillar) {
  return (
    <article className="group relative isolate aspect-[3/4] overflow-hidden rounded-card bg-brand-light">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 1024px) 22vw, 50vw"
        className="-z-10 object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
      />

      {/* Weighted to the foot of the card so the copy always has ground under
          it; the top of the photograph stays clean. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-dark/85 via-brand-dark/20 to-transparent"
      />

      <div className="flex h-full flex-col justify-end p-4 text-white sm:p-6">
        <Icon aria-hidden="true" className="size-5 text-white/90 sm:size-6" strokeWidth={1.5} />
        <h3 className="mt-2 font-display text-2xl leading-none font-semibold text-white sm:mt-3 sm:text-3xl lg:text-4xl">
          {title}
        </h3>
        <p className="mt-2 hidden text-sm leading-snug text-white/85 sm:block">{line}</p>
      </div>
    </article>
  );
}
