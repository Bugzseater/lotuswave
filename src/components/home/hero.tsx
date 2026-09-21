import { HeroIntro } from "@/components/home/hero-intro";
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

      {/* Full-bleed rather than centred, so the column hugs the left edge of
          the frame instead of the site's content width. */}
      <Container className="relative z-20 max-w-none lg:px-12 xl:px-20 pt-32 pb-44 sm:pb-52 lg:pb-[35vh]">
        <HeroIntro className="relative max-w-xl pl-5 sm:max-w-2xl sm:pl-8 lg:max-w-4xl xl:max-w-6xl">
          {/* The rule is its own element so it can draw in on entrance. */}
          <span
            aria-hidden="true"
            data-hero-rule
            className="absolute inset-y-0 left-0 w-px bg-white/25"
          />

          {/* White falling into accent-green across the diagonal. The green is
              mixed back towards white rather than used neat — #1F3D2B on this
              scrim would sink out of sight; at 40% it still clears 3:1 for
              display sizes. The gradient sits on each line rather than the h1:
              a transformed child of a bg-clip-text element stops painting. */}
          <h1 className="mt-5 font-display text-5xl leading-[1.04] font-bold text-balance sm:mt-6 sm:text-6xl lg:text-7xl xl:text-8xl">
            {/* Each line rises out of its own mask. The padding keeps
                ascenders, descenders and the stroke clear of the clip. */}
            <span className="-my-[0.08em] block overflow-hidden py-[0.08em]">
              {/* One line each from lg up; smaller screens wrap naturally. */}
              {/* The gradient wraps "Experience" only: with the animated accent
                  inside a bg-clip-text element, Chrome paints a ghost copy of
                  it at the start of the line. */}
              <span data-hero-line className="block lg:whitespace-nowrap">
                <span className="bg-gradient-to-br from-white via-white to-[color-mix(in_srgb,var(--color-accent-green)_40%,var(--color-white))] bg-clip-text text-transparent">
                  Experience
                </span>{" "}
                {/* Stroke painted under the fill, so only its outer half shows
                    and the letterforms keep their weight. */}
                <span
                  data-hero-accent
                  className="inline-block text-brand [-webkit-text-stroke:2px_var(--color-white)] [paint-order:stroke_fill]"
                >
                  Sri Lanka
                </span>
              </span>
            </span>
            <span className="-my-[0.08em] block overflow-hidden py-[0.08em]">
              <span
                data-hero-line
                className="block bg-gradient-to-br from-white via-white to-[color-mix(in_srgb,var(--color-accent-green)_40%,var(--color-white))] bg-clip-text text-transparent lg:whitespace-nowrap"
              >
                From Its Roots.
              </span>
            </span>
          </h1>

          <p
            data-hero-fade
            className="mt-4 max-w-xl text-base font-light tracking-wide text-pretty text-white/80 sm:mt-5 sm:text-lg lg:max-w-2xl lg:text-xl"
          >
            Authentic journeys through agriculture, wellness, nature and local
            communities—personally designed around you.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row">
            <div data-hero-fade>
              <ButtonLink href="/plan-your-trip" className="w-full sm:w-auto">
                Plan My Journey
              </ButtonLink>
            </div>
            <div data-hero-fade>
              <ButtonLink
                href="/journeys"
                variant="onBrand"
                className="w-full sm:w-auto"
              >
                Explore Our Journeys
              </ButtonLink>
            </div>
          </div>
        </HeroIntro>
      </Container>

      {/* Swap for <CloudDivider /> to put the mist back. */}
      <WaveDivider />

      {/* Settles the foot of the frame into the white page below. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-white to-transparent sm:h-32"
      />
    </section>
  );
}
