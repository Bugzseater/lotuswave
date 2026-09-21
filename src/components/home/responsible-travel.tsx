import Image from "next/image";
import {
  HandCoins,
  HeartHandshake,
  Landmark,
  PawPrint,
  Recycle,
  Store,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

type Commitment = {
  title: string;
  line: string;
  icon: LucideIcon;
};

/*
 * Commitments, not statistics. Add a number here only once it can be
 * evidenced — "40% less plastic" without a source is greenwashing.
 */
const COMMITMENTS: Commitment[] = [
  {
    title: "Local farmers receive fair value",
    line: "Farm hosts are paid properly for their time, their land and their knowledge.",
    icon: HandCoins,
  },
  {
    title: "Local communities benefit",
    line: "We hire local guides, cooks and hosts, so money stays in the villages you visit.",
    icon: HeartHandshake,
  },
  {
    title: "Small businesses are supported",
    line: "Family guesthouses, home kitchens and village artisans over large chains.",
    icon: Store,
  },
  {
    title: "Plastic and waste are reduced",
    line: "Refillable water, reusable bottles and less single-use plastic on the road.",
    icon: Recycle,
  },
  {
    title: "Wildlife is treated responsibly",
    line: "No elephant rides or animal shows — wildlife is watched in the wild, at a respectful distance.",
    icon: PawPrint,
  },
  {
    title: "Culture is respected",
    line: "Guests are briefed on dress, temples and customs before they arrive.",
    icon: Landmark,
  },
  {
    title: "Smaller groups create less impact",
    line: "Private and small-group travel treads lighter on farms, villages and trails.",
    icon: UsersRound,
  },
];

const IMAGE = {
  src: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1400&q=80",
  alt: "Young green seedlings rising from dark soil in a nursery tray",
};

/**
 * Section 09 — how the journeys give back. On the tinted section background
 * after the white Why Travel With Us. Photograph on the left, the seven
 * commitments on the right as an editorial list divided by hairlines, so it
 * reads as a promise rather than another grid of feature cards.
 */
export function ResponsibleTravel() {
  return (
    <Section id="responsible-travel" aria-labelledby="responsible-heading" className="bg-section">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
              Responsible Travel
            </p>
            <h2
              id="responsible-heading"
              className="mt-4 font-display text-4xl leading-[1.08] text-balance text-ink sm:text-5xl lg:text-6xl"
            >
              Travel That <em className="font-medium text-brand">Gives Back.</em>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-pretty text-muted sm:text-lg">
              The places you visit should be better for your being there. Every
              journey we design is built on these commitments.
            </p>

            <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-card bg-brand-light">
              <Image
                src={IMAGE.src}
                alt={IMAGE.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <ul className="divide-y divide-line border-y border-line">
              {COMMITMENTS.map(({ title, line, icon: Icon }) => (
                <li key={title} className="flex gap-5 py-6">
                  <span className="grid size-11 shrink-0 place-items-center rounded-pill bg-white text-brand ring-1 ring-brand/15">
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3 className="font-display text-2xl leading-tight font-semibold text-ink">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted sm:text-[15px]">
                      {line}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <ButtonLink
              href="/responsible-travel"
              variant="secondary"
              size="lg"
              className="mt-10 w-full sm:w-auto"
            >
              Our Responsible Travel Promise
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
