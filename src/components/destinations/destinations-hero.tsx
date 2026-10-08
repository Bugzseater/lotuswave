import Image from "next/image";
import { Container } from "@/components/ui/container";
import { WaveEdge } from "@/components/ui/wave-edge";
import { IslandMap, type MapPin } from "./island-map";

const HERO_IMAGE = {
  src: "/bg/destinations/hero.png",
  alt: "Sunrise over misty hill country and tea terraces in Sri Lanka, with Adam's Peak on the horizon",
};

/**
 * The peak alone on a transparent canvas, same size as the photo, so the
 * wordmark reads as sitting behind it (as Sigiriya does on About). Set to
 * the PNG's path once it exists; `null` leaves the wordmark in front.
 */
const HERO_CUTOUT_SRC: string | null = null;

/**
 * Destinations opener, built like the About hero: full-bleed photograph, an
 * oversized "DESTINATIONS" wordmark across the sky, headline and intro
 * bottom-left over a brand-dark veil. On wide screens the island map sits
 * bottom-right in a glass panel, every pin a link to its guide.
 */
export function DestinationsHero({
  pins,
  areas,
}: {
  pins: MapPin[];
  areas: readonly { key: string; title: string }[];
}) {
  return (
    <section className="relative isolate h-svh min-h-[40rem] overflow-hidden">
      {/* Layers, back to front: photo → wordmark → cutout → veils. */}
      <Image
        src={HERO_IMAGE.src}
        alt={HERO_IMAGE.alt}
        fill
        priority
        sizes="100vw"
        className="-z-30 object-cover object-[70%_center]"
      />

      {/* Decorative wordmark — the real heading is the h1 below. */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-24 -z-20 text-center font-sans text-[13vw] leading-none font-black tracking-tight text-white/60 select-none animate-wordmark-in [animation-delay:0.2s] lg:top-[16svh] lg:text-[12vw]"
      >
        DESTINATIONS
      </p>

      {HERO_CUTOUT_SRC && (
        <Image
          src={HERO_CUTOUT_SRC}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="pointer-events-none -z-20 object-cover object-[70%_center]"
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

      <Container className="relative z-20 flex h-full max-w-[80rem] items-end pt-28 pb-20 sm:pb-28 lg:pb-32">
        {/* Static copy — no entrance or scroll animation. */}
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl leading-[1.08] font-semibold text-balance text-white sm:text-5xl lg:text-6xl">
            <span className="block">Sri Lanka Destinations,</span>
            <span className="block">
              Coast to{" "}
              {/* Gold on the brand-dark veil, at 36px+ — allowed by rule 7. */}
              <span className="text-accent-gold">Cloud Forest</span>.
            </span>
          </h1>

          <nav aria-label="Destination regions" className="mt-8">
            <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
              {areas.map(({ key, title }) => (
                <li key={key} className="shrink-0">
                  <a
                    href={`#${key}`}
                    className="inline-flex h-11 items-center rounded-pill border border-white/40 bg-white/10 px-4 text-sm font-medium text-white backdrop-blur-sm transition-colors duration-200 ease-out hover:bg-white hover:text-brand focus-visible:outline-white"
                  >
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>

      {/* Map panel, pinned to the bottom-right corner of the hero — wide
          screens only; phones get it below the hero. */}
      <figure className="absolute right-16 bottom-28 z-20 hidden w-40 animate-rise-in rounded-card border border-white/20 bg-brand-dark/45 p-3 backdrop-blur-md [animation-delay:1.2s] lg:block xl:right-24 xl:w-44">
        <IslandMap
          pins={pins}
          linked
          labelScale={2}
          label="Map of Sri Lanka with numbered destination pins"
        />
        <figcaption className="mt-3 text-center text-[11px] tracking-[0.16em] text-white/80 uppercase">
          Hover a pin to see the place
        </figcaption>
      </figure>

      {/* White wave closing the photo into the white sections below. */}
      <WaveEdge position="bottom" flat className="-bottom-px z-10 fill-white" />
    </section>
  );
}
