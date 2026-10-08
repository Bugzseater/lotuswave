import Image from "next/image";
import { Container } from "@/components/ui/container";
import { WaveEdge } from "@/components/ui/wave-edge";
import type { Destination } from "@/types";
import { bestMonths, formatCoordinates } from "./destination-category";
import { IslandMap, type MapPin } from "./island-map";

/**
 * Guide-page opener, in the same vibe as the destinations and About heroes:
 * full-bleed photograph with the place's name as an oversized translucent
 * wordmark across the sky — which is also the page's h1 — then the tagline
 * bottom-left over a brand-dark veil, and a glass locator panel bottom-right
 * with this place lit on the island.
 */
export function DestinationHero({
  destination,
  pins,
}: {
  destination: Destination;
  pins: MapPin[];
}) {
  const { slug, name, tagline, image, coordinates, bestTime } = destination;
  const best = bestMonths(bestTime.months);

  // Long names ("Yala National Park") shrink so the wordmark stays on one line.
  const wordmarkSize = `${Math.min(13, 108 / name.length)}vw`;

  return (
    <section className="relative isolate h-svh min-h-[40rem] overflow-hidden">
      {/* Layers, back to front: photo → wordmark → veils. */}
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="-z-30 object-cover"
      />

      {/* The wordmark is the page's one h1 — the place's name, set in
          capitals by CSS so the heading text itself stays "Sigiriya". */}
      <h1
        style={{ fontSize: wordmarkSize }}
        // Above the veils (they would otherwise dim it) and mostly opaque, so
        // the name reads clearly over any photo.
        className="pointer-events-none absolute inset-x-0 top-24 z-0 text-center font-sans leading-none font-black tracking-tight whitespace-nowrap text-white/80 uppercase select-none animate-wordmark-in [animation-delay:0.2s] lg:top-[16svh]"
      >
        {name}
      </h1>

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-dark/75 via-brand-dark/35 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/35 via-transparent to-ink/50"
      />

      <Container className="relative z-20 flex h-full max-w-[80rem] items-end pt-28 pb-20 sm:pb-28 lg:pb-32">
        {/* White on the brand-dark veil. Static: no entrance animation. */}
        <p className="max-w-3xl font-display text-3xl leading-tight text-pretty text-white italic sm:text-4xl lg:text-5xl">
          {tagline}
        </p>
      </Container>

      {/* Locator panel, bottom-right — wide screens only. */}
      <aside
        aria-label={`Where ${name} is`}
        className="absolute right-16 bottom-28 z-20 hidden w-52 animate-rise-in rounded-card border border-white/20 bg-brand-dark/45 p-4 text-white backdrop-blur-md [animation-delay:1.2s] lg:block xl:right-24"
      >
        <IslandMap
          pins={pins}
          activeSlug={slug}
          label={`Map of Sri Lanka marking ${name}`}
          className="mx-auto w-24"
        />
        <dl className="mt-4 space-y-2.5 border-t border-white/20 pt-4 text-sm">
          <div>
            <dt className="text-[10px] font-semibold tracking-[0.16em] text-white/70 uppercase">Coordinates</dt>
            <dd className="mt-0.5 tabular-nums">{formatCoordinates(coordinates)}</dd>
          </div>
          {best && (
            <div>
              <dt className="text-[10px] font-semibold tracking-[0.16em] text-white/70 uppercase">Best months</dt>
              <dd className="mt-0.5">{best}</dd>
            </div>
          )}
        </dl>
      </aside>

      {/* White wave closing the photo into the white band below. */}
      <WaveEdge position="bottom" flat className="-bottom-px z-10 fill-white" />
    </section>
  );
}
