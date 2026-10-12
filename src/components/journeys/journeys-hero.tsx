import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { WaveEdge } from "@/components/ui/wave-edge";
import { JOURNEY_CATEGORIES } from "@/lib/constants";

/** Exported so the page can reuse it for the OG image. */
export const JOURNEYS_HERO_IMAGE = {
  src: "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&w=2400&q=80",
  alt: "A blue train crossing the stone Nine Arches Bridge through dense forest",
};

/**
 * Journeys opener, built like the Experiences and Destinations heroes:
 * full-bleed photograph, an oversized "JOURNEYS" wordmark across the sky,
 * headline and category links bottom-left over a brand-dark veil. Each
 * category link opens the finder below with that category chosen.
 */
export function JourneysHero() {
  return (
    <section className="relative isolate h-svh min-h-[40rem] overflow-hidden">
      <Image
        src={JOURNEYS_HERO_IMAGE.src}
        alt={JOURNEYS_HERO_IMAGE.alt}
        fill
        priority
        sizes="100vw"
        className="-z-30 object-cover"
      />

      {/* Decorative wordmark — the real heading is the h1 below. */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-24 -z-20 text-center font-sans text-[15vw] leading-none font-black tracking-tight text-white/60 select-none animate-wordmark-in [animation-delay:0.2s] lg:top-[16svh] lg:text-[13vw]"
      >
        JOURNEYS
      </p>

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-dark/75 via-brand-dark/35 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/35 via-transparent to-ink/50"
      />

      <Container className="relative z-20 flex h-full max-w-[80rem] flex-col justify-end pt-28 pb-16 sm:pb-20 lg:pb-24">
        <h1 className="max-w-2xl font-display text-4xl leading-[1.08] font-semibold text-balance text-white sm:text-5xl lg:text-6xl">
          <span className="block">Sri Lanka Journeys,</span>
          <span className="block">
            Shaped by the{" "}
            {/* Gold on the brand-dark veil, at 36px+ — allowed by rule 7. */}
            <span className="text-accent-gold">Land</span>.
          </span>
        </h1>
        {/* One row of compact pills; scrolls sideways where it can't fit. */}
        <nav aria-label="Journey categories" className="mt-6">
          <ul className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
            {JOURNEY_CATEGORIES.map(({ key, title }) => (
              <li key={key} className="shrink-0">
                <Link
                  href={`/journeys?category=${key}#finder`}
                  className="inline-flex h-9 items-center rounded-pill border border-white/40 bg-white/10 px-3 text-xs font-medium whitespace-nowrap text-white backdrop-blur-sm transition-colors duration-200 ease-out hover:bg-white hover:text-brand focus-visible:outline-white"
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <WaveEdge position="bottom" flat className="-bottom-px z-10 fill-white" />
    </section>
  );
}
