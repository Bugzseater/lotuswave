import Image from "next/image";
import { Container } from "@/components/ui/container";
import { WaveEdge } from "@/components/ui/wave-edge";
import type { ExperienceIcon as ExperienceIconKey } from "@/types";
import { ExperienceIcon } from "./experience-icon";

/** Exported so the page can reuse it for the OG image. */
export const EXPERIENCES_HERO_IMAGE = {
  src: "/bg/experiences/hero.png",
  alt: "A tea plucker walking between terraced tea rows in Sri Lanka's hill country at golden hour",
};

/**
 * The subject alone on a transparent canvas, same size as the photo, so the
 * wordmark reads as sitting behind it. Set to the PNG's path once it exists;
 * `null` leaves the wordmark in front.
 */
const HERO_CUTOUT_SRC: string | null = null;

/**
 * Experiences opener, built like the Destinations hero: full-bleed
 * photograph, an oversized "EXPERIENCES" wordmark across the sky, headline,
 * intro and category links bottom-left over a brand-dark veil.
 */
export function ExperiencesHero({
  categories,
}: {
  categories: readonly { key: ExperienceIconKey; title: string }[];
}) {
  return (
    <section className="relative isolate h-svh min-h-[40rem] overflow-hidden">
      {/* Layers, back to front: photo → wordmark → cutout → veils. */}
      <Image
        src={EXPERIENCES_HERO_IMAGE.src}
        alt={EXPERIENCES_HERO_IMAGE.alt}
        fill
        priority
        sizes="100vw"
        className="-z-30 object-cover object-[65%_center]"
      />

      {/* Decorative wordmark — the real heading is the h1 below. */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-24 -z-20 text-center font-sans text-[13vw] leading-none font-black tracking-tight text-white/60 select-none animate-wordmark-in [animation-delay:0.2s] lg:top-[16svh] lg:text-[12vw]"
      >
        EXPERIENCES
      </p>

      {HERO_CUTOUT_SRC && (
        <Image
          src={HERO_CUTOUT_SRC}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="pointer-events-none -z-20 object-cover object-[65%_center]"
        />
      )}

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-dark/75 via-brand-dark/35 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/35 via-transparent to-ink/50"
      />

      <Container className="relative z-20 flex h-full max-w-[80rem] flex-col justify-end pt-28 pb-16 sm:pb-20 lg:pb-24">
        {/* Static copy — no entrance or scroll animation. */}
        <h1 className="max-w-2xl font-display text-4xl leading-[1.08] font-semibold text-balance text-white sm:text-5xl lg:text-6xl">
          <span className="block">Sri Lanka Experiences,</span>
          <span className="block">
            From Its{" "}
            {/* Gold on the brand-dark veil, at 36px+ — allowed by rule 7. */}
            <span className="text-accent-gold">Roots</span>.
          </span>
        </h1>

        {/* One row of compact pills; scrolls sideways where it can't fit. */}
        <nav aria-label="Experience categories" className="mt-6">
          <ul className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
            {categories.map(({ key, title }) => (
              <li key={key} className="shrink-0">
                <a
                  href={`#${key}`}
                  className="inline-flex h-9 items-center gap-1.5 rounded-pill border border-white/40 bg-white/10 px-3 text-xs font-medium whitespace-nowrap text-white backdrop-blur-sm transition-colors duration-200 ease-out hover:bg-white hover:text-brand focus-visible:outline-white"
                >
                  <ExperienceIcon icon={key} className="size-3.5" />
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      {/* White wave closing the photo into the white sections below. */}
      <WaveEdge position="bottom" flat className="-bottom-px z-10 fill-white" />
    </section>
  );
}
