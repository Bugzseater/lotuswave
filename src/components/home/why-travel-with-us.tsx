import type { CSSProperties } from "react";
import Image from "next/image";
import {
  CarFront,
  Handshake,
  Headset,
  MapPin,
  Receipt,
  Route,
  Sprout,
  Users,
  type LucideIcon,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Section } from "@/components/ui/section";

type TrustPoint = {
  title: string;
  icon: LucideIcon;
};

const POINTS: TrustPoint[] = [
  { title: "Local Sri Lankan expertise", icon: MapPin },
  { title: "Personally designed itineraries", icon: Route },
  { title: "Carefully selected partners", icon: Handshake },
  { title: "Licensed guides, trusted transport", icon: CarFront },
  { title: "24/7 in-country assistance", icon: Headset },
  { title: "Responsible local tourism", icon: Sprout },
  { title: "Transparent pricing", icon: Receipt },
  { title: "Small-group experiences", icon: Users },
];

/** One lap of the loop, in seconds. */
const LOOP_S = 9;

/*
 * Where each icon sits along the loop, in percent of its length, in POINTS
 * order. Measured at the list's full 1024px width: the path starts at the top
 * left end of the straight, runs clockwise, and the stops fall 11.8% apart —
 * the top row left to right, then the bottom row right to left. Narrower
 * desktop widths drift by a percent or so, which the glow's width absorbs.
 */
const STOP_AT = [2.5, 14.3, 26.1, 37.9, 87.9, 76.1, 64.3, 52.5];
/**
 * Section 08 — the reasons to book with us. Centred heading, the eight trust
 * points as a compact icon grid, and the island itself as the closing band:
 * an illustrated panorama (Nine Arches, Sigiriya, the Temple of the Tooth)
 * running full width along the section's foot.
 *
 * The panorama is a transparent PNG whose top third is empty sky, so the band
 * is pulled up under the CTA by roughly that much — the margin is a
 * percentage because vertical margins resolve against width, which keeps the
 * overlap matched to the image at every breakpoint.
 */
export function WhyTravelWithUs() {
  return (
    <Section
      id="why-us"
      aria-labelledby="why-us-heading"
      // The wellness band above ends in its own white haze, so the usual top
      // padding would read as one long empty stretch. The section drops its
      // top padding and lifts into that haze instead; the panorama is the
      // bottom edge, so no bottom padding either.
      className="relative isolate -mt-16 overflow-hidden pt-0 pb-0 sm:-mt-28 lg:-mt-44"
    >
      <Container>
        <ScrollReveal disabled className="mx-auto max-w-5xl text-center">
          <p
            data-reveal
            className="flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.2em] text-brand uppercase"
          >
            <span aria-hidden="true" className="h-px w-10 bg-brand" />
            Why LotusWave
            <span aria-hidden="true" className="h-px w-10 bg-brand" />
          </p>
          <h2
            id="why-us-heading"
            data-reveal
            className="mt-4 font-display text-4xl leading-[1.08] text-balance text-ink sm:text-5xl"
          >
            Why Travel <em className="font-medium text-brand">With Us?</em>
          </h2>
          <p
            data-reveal
            className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted"
          >
            A small Sri Lankan team that plans every journey personally — and
            stays with you from the first message to the flight home.
          </p>

          <ul
            className="relative isolate mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-8 lg:grid-cols-4"
            style={{ "--loop-duration": `${LOOP_S}s` } as CSSProperties}
          >
            {/* Desktop only: one rounded loop threading all eight icons —
                along the first row, down the right, back along the second and
                up the left. It runs through the icon centres (top 1.375rem =
                half of size-11) and relies on each row being a fixed 6.5rem,
                so the second row's centre sits 6.5rem + gap-y-8 lower. The
                opaque icon discs sit over it and break the line at each stop.
                A faint dashed track, and over it one solid dash circling
                clockwise; each icon lights up as the dash reaches it. */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-2 top-[1.375rem] -z-10 hidden h-[8.5rem] w-[calc(100%+1rem)] overflow-visible lg:block"
            >
              <rect
                width="100%"
                height="100%"
                rx="68"
                fill="none"
                strokeWidth="2"
                strokeDasharray="6 8"
                strokeLinecap="round"
                className="stroke-brand/25"
              />
              <rect
                width="100%"
                height="100%"
                rx="68"
                fill="none"
                pathLength="100"
                strokeWidth="3.5"
                strokeLinecap="round"
                className="animate-comet stroke-brand"
              />
            </svg>
            {POINTS.map(({ title, icon: Icon }, i) => (
              <li
                key={title}
                data-reveal-step
                className="group flex flex-col items-center lg:h-[6.5rem]"
              >
                {/* Hover stays for phones; on desktop the loop drives it. */}
                <span
                  className="grid size-11 place-items-center rounded-pill bg-brand-light text-brand transition-colors duration-300 ease-out group-hover:bg-brand group-hover:text-white lg:animate-stop-glow"
                  style={{ animationDelay: `${((STOP_AT[i] - 5) / 100) * LOOP_S}s` }}
                >
                  <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
                </span>
                <h3 className="mt-3 max-w-[12rem] font-sans text-[15px] leading-snug font-medium text-balance text-ink">
                  {title}
                </h3>
              </li>
            ))}
          </ul>

          <div data-reveal className="mt-10">
            <ButtonLink href="/contact" variant="secondary" className="w-full sm:w-auto">
              Talk to Our Team
            </ButtonLink>
          </div>
        </ScrollReveal>
      </Container>

      {/* `-z-10` keeps the band's empty sky behind the CTA above it. */}
      <div className="relative -z-10 -mt-[48%] aspect-[1672/941] w-full">
        <Image
          src="/bg/whyUs.png"
          alt="An illustrated Sri Lankan landscape: a blue train on the Nine Arches Bridge, Sigiriya rock, elephants bathing in a river and the Temple of the Tooth by the lake"
          fill
          sizes="100vw"
          className="object-contain object-bottom opacity-15"
        />
        {/* Fades the panorama's foot into the white page below. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/6 bg-linear-to-t from-white to-transparent"
        />
      </div>
    </Section>
  );
}
