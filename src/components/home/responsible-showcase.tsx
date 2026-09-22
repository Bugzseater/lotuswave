"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

type Commitment = {
  title: string;
  line: string;
  image: { src: string; alt: string };
};

const img = (name: string) => `/bg/responsibal_travel/${name}.png`;

/*
 * Commitments, not statistics. Add a number here only once it can be
 * evidenced — "40% less plastic" without a source is greenwashing.
 */
const COMMITMENTS: Commitment[] = [
  {
    title: "Local farmers receive fair value",
    line: "Farm hosts are paid properly for their time, their land and their knowledge.",
    image: {
      src: img("Local farmers"),
      alt: "A traveller shaking hands with a Sri Lankan farmer over a table of fresh produce at sunset",
    },
  },
  {
    title: "Local communities benefit",
    line: "We hire local guides, cooks and hosts, so money stays in the villages you visit.",
    image: {
      src: img("Local communities"),
      alt: "Villagers and travellers sharing a home-cooked meal on a hillside veranda",
    },
  },
  {
    title: "Small businesses are supported",
    line: "Family guesthouses, home kitchens and village artisans over large chains.",
    image: {
      src: img("Small businesses"),
      alt: "A family guesthouse host serving rice and curry to two guests",
    },
  },
  {
    title: "Plastic and waste are reduced",
    line: "Refillable water, reusable bottles and less single-use plastic on the road.",
    image: {
      src: img("Plastic and waste"),
      alt: "A traveller refilling a steel bottle at a village water station",
    },
  },
  {
    title: "Wildlife is treated responsibly",
    line: "No elephant rides or animal shows — wildlife is watched in the wild, at a respectful distance.",
    image: {
      src: img("Wildlife is treated"),
      alt: "Travellers watching wild elephants from a safari jeep, with Sigiriya rock on the horizon",
    },
  },
  {
    title: "Culture is respected",
    line: "Guests are briefed on dress, temples and customs before they arrive.",
    image: {
      src: img("Culture"),
      alt: "A local guide briefing travellers on temple dress and customs outside a stupa",
    },
  },
  {
    title: "Smaller groups create less impact",
    line: "Private and small-group travel treads lighter on farms, villages and trails.",
    image: {
      src: img("Smaller groups"),
      alt: "A small group of hikers following a guide along a village trail in the hills",
    },
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

/** How long each commitment stays up before the next fades in. */
const INTERVAL_MS = 6000;

/**
 * The interactive part of the Responsible Travel section, kept compact: a
 * centred heading, a soft-edged photograph and the commitment beside it over
 * a faded numeral, cycling through all seven on their own.
 *
 * The rotation pauses while the pointer or keyboard focus is inside, and
 * never starts for visitors who prefer reduced motion — they see the first
 * commitment. Every title and line is in the HTML (inactive ones are only
 * transparent and `aria-hidden`), so all seven stay indexable.
 */
export function ResponsibleShowcase({ headingId }: { headingId: string }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % COMMITMENTS.length),
      INTERVAL_MS,
    );
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <Container>
      <div className="mx-auto max-w-2xl text-center">
        <p className="flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.2em] text-brand uppercase">
          <span aria-hidden="true" className="h-px w-8 bg-brand" />
          Responsible Travel
          <span aria-hidden="true" className="h-px w-8 bg-brand" />
        </p>
        <h2
          id={headingId}
          className="mt-4 font-display text-3xl leading-[1.1] text-balance text-ink sm:text-4xl lg:text-5xl"
        >
          Travel That <em className="font-medium text-brand">Gives Back.</em>
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-pretty text-muted sm:text-base">
          The places you visit should be better for your being there. Every
          journey we design is built on these commitments.
        </p>
      </div>

      {/* The stage: the photograph keeps its rectangle but each edge fades
          into the white page (two gradients, intersected), the active
          commitment beside it over a faded numeral. */}
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        className="mt-10 grid items-center gap-8 sm:mt-12 lg:grid-cols-[1.7fr_1fr] lg:gap-6"
      >
        <div className="relative aspect-[16/10] w-full [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent),linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]">
          {COMMITMENTS.map(({ image }, i) => (
            <Image
              key={image.src}
              src={image.src}
              alt={i === active ? image.alt : ""}
              aria-hidden={i !== active}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className={cn(
                "object-cover transition-opacity duration-300 ease-out",
                i === active ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
        </div>

        <div className="flex flex-col">
          {/* All seven stacked in one cell, so the column keeps the height of
              the longest and nothing jumps as they fade in and out. */}
          <div className="grid">
            {COMMITMENTS.map(({ title, line }, i) => (
              <div
                key={title}
                aria-hidden={i !== active}
                className={cn(
                  "[grid-area:1/1] transition-opacity duration-300 ease-out",
                  i === active ? "opacity-100" : "pointer-events-none opacity-0",
                )}
              >
                <p
                  aria-hidden="true"
                  className="font-display text-7xl leading-none font-semibold text-brand/10 select-none sm:text-8xl"
                >
                  {pad(i + 1)}
                </p>
                <h3 className="-mt-8 font-display text-2xl leading-tight font-medium text-balance text-ink sm:-mt-10 sm:text-3xl lg:text-4xl">
                  {title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-pretty text-muted sm:text-base">
                  {line}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/responsible-travel"
            className="group mt-6 inline-flex items-center gap-2 self-start text-xs font-semibold tracking-[0.14em] text-brand uppercase sm:text-sm"
          >
            Our responsible travel promise
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </Container>
  );
}
