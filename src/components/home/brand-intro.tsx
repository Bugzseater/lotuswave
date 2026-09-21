import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Compass,
  Flower2,
  HandHeart,
  Sprout,
  type LucideIcon,
} from "lucide-react";
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
 * Section 02 — what the company is, then the four ideas every journey is
 * built from. Set like an editorial spread: headline ranged left, the
 * standfirst and a link opposite it across a hairline.
 *
 * The pillars are framed as arches — the shape of temple and colonial
 * doorways across the island — each with an offset outline behind it. On
 * large screens the second and fourth drop half a step so the row reads as a
 * loose sequence rather than a rigid grid.
 */
export function BrandIntro() {
  return (
    <Section aria-labelledby="brand-intro-heading">
      <Container>
        <ScrollReveal>
          <div className="grid gap-8 border-b border-line pb-12 sm:pb-16 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">
              <p
                data-reveal
                className="flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-brand uppercase"
              >
                <span aria-hidden="true" className="h-px w-10 bg-brand" />
                Who We Are
              </p>
              <h2
                id="brand-intro-heading"
                data-reveal
                className="mt-5 font-display text-4xl leading-[1.08] text-balance text-ink sm:text-5xl lg:text-6xl"
              >
                More Than a Holiday.{" "}
                <em className="block font-medium text-brand">A Deeper Connection.</em>
              </h2>
            </div>

            <div data-reveal className="lg:col-span-5 lg:pb-2">
              <p className="text-base leading-relaxed text-pretty text-muted sm:text-lg">
                We create meaningful journeys that connect you with Sri
                Lanka&rsquo;s land, people, food, traditions and natural healing
                culture.
              </p>
              <Link
                href="/about"
                className="group mt-6 inline-flex items-center gap-3 text-sm font-semibold tracking-[0.14em] text-brand uppercase"
              >
                Discover our story
                <span className="grid size-9 place-items-center rounded-pill border border-brand transition-colors duration-200 ease-out group-hover:bg-brand group-hover:text-white">
                  <ArrowRight aria-hidden="true" className="size-4" />
                </span>
              </Link>
            </div>
          </div>

          <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 sm:mt-16 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
            {PILLARS.map((pillar, i) => (
              // Offset by padding, not transform, so the reveal's transform
              // never fights it.
              <li key={pillar.title} className={cn(i % 2 === 1 && "lg:pt-16")}>
                <div data-reveal-card>
                  <PillarCard {...pillar} index={i} />
                </div>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </Container>
    </Section>
  );
}

function PillarCard({ title, line, icon: Icon, image, index }: Pillar & { index: number }) {
  return (
    <article className="group">
      <div className="relative pt-2 pr-2">
        {/* Offset outline, sitting behind the arch like a second doorway. */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 bottom-2 left-2 rounded-t-full rounded-b-card border border-brand/30 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
        />
        <div className="relative aspect-[3/4] overflow-hidden rounded-t-full rounded-b-card bg-brand-light">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 22vw, 50vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.05]"
          />
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3 text-brand">
        <span className="font-display text-sm font-semibold tracking-widest">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
        <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
      </div>
      <h3 className="mt-3 font-display text-2xl leading-none font-medium text-ink sm:text-3xl">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{line}</p>
    </article>
  );
}
