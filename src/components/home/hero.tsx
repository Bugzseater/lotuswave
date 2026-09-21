import { HeroMedia } from "@/components/home/hero-media";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { WaveDivider } from "@/components/ui/wave-divider";

const HERO_IMAGE = {
  src: "/bg/hero.png",
  alt: "Sunrise over Sri Lankan tea terraces and paddy fields, with harvested spices and Ayurveda oils laid out on a wooden table",
};

/** Doubles as the still's replacement once it has buffered. */
const HERO_VIDEO = { src: "/bg/bgvideo.mp4" };

/**
 * Section 01 — full-bleed cinematic opener. The backdrop carries the design,
 * so the copy stays to a headline, one supporting line and two calls to action.
 *
 * Ranged left against a rule, low in the frame. Footage changes composition
 * every second, so the copy holds one corner and the scrim is weighted to that
 * corner — nothing here depends on what the backdrop happens to be showing.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden">
      <HeroMedia image={HERO_IMAGE} video={HERO_VIDEO} />

      {/* Two scrims rather than one flat veil: the first anchors the left
          column whatever the backdrop does, the second seats the copy at the
          foot of the frame. The middle and right stay close to untouched. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/75 via-ink/30 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/55 via-transparent to-ink/25"
      />

      {/* Wider than the page container so the column sits closer to the edge
          of the frame than the rest of the site's content does. */}
      <Container className="relative z-20 max-w-[96rem] pt-32 pb-44 sm:pb-52 lg:pb-[35vh]">
        <div className="max-w-xl animate-rise-in border-l border-white/25 pl-5 sm:max-w-2xl sm:pl-8">


          {/* White falling into accent-green across the diagonal. The green is
              mixed back towards white rather than used neat — #1F3D2B on this
              scrim would sink out of sight; at 40% it still clears 3:1 for
              display sizes. */}
          <h1 className="mt-5 bg-gradient-to-br from-white via-white to-[color-mix(in_srgb,var(--color-accent-green)_40%,var(--color-white))] bg-clip-text font-display text-5xl leading-[1.04] font-bold text-balance text-transparent sm:mt-6 sm:text-6xl lg:text-7xl">
            Experience Sri Lanka From Its Roots.
          </h1>

          <p className="mt-4 max-w-lg text-[15px] font-light tracking-wide text-pretty text-white/80 sm:mt-5 sm:text-base">
            Authentic journeys through agriculture, wellness, nature and local
            communities—personally designed around you.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row">
            <ButtonLink href="/plan-your-trip" className="w-full sm:w-auto">
              Plan My Journey
            </ButtonLink>
            <ButtonLink
              href="/journeys"
              variant="onBrand"
              className="w-full sm:w-auto"
            >
              Explore Our Journeys
            </ButtonLink>
          </div>
        </div>
      </Container>

      {/* Swap for <CloudDivider /> to put the mist back. */}
      <WaveDivider />
    </section>
  );
}
