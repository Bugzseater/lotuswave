import { HeroIntro } from "@/components/home/hero-intro";
import { HeroMedia } from "@/components/home/hero-media";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const HERO_IMAGE = {
  src: "/bg/hero.png",
  alt: "Sunrise over Sri Lankan tea terraces and paddy fields, with harvested spices and Ayurveda oils laid out on a wooden table",
};

/** Doubles as the still's replacement once it has buffered. */
const HERO_VIDEO = { src: "/bg/bgvideo.mp4" };

/**
 * Section 01 — full-bleed cinematic opener, kept clean: the footage runs edge
 * to edge with no dividers over it. Headline centred in the frame with a
 * hairline under it; a short caption and the calls to action sit in the two
 * bottom corners, aligned to the nav's width.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <HeroMedia image={HERO_IMAGE} video={HERO_VIDEO} />

      {/* A light even veil for the centred headline, deepened at the top for
          the nav and at the foot for the corner copy. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/30" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/45 via-transparent to-ink/55"
      />

      <Container className="relative z-20 max-w-[80rem]">
        <HeroIntro className="flex min-h-[100svh] flex-col pt-28 pb-10 sm:pb-14">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <h1 className="font-display text-5xl leading-[1.04] font-semibold text-balance text-white sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
              {/* Each line rises out of its own mask. The padding keeps
                  ascenders, descenders and the stroke clear of the clip. */}
              <span className="-my-[0.08em] block overflow-hidden py-[0.08em]">
                <span data-hero-line className="block lg:whitespace-nowrap">
                  Experience{" "}
                  {/* Stroke painted under the fill, so only its outer half
                      shows and the letterforms keep their weight. */}
                  <span
                    data-hero-accent
                    className="inline-block text-brand [-webkit-text-stroke:2px_var(--color-white)] [paint-order:stroke_fill]"
                  >
                    Sri Lanka
                  </span>
                </span>
              </span>
              <span className="-my-[0.08em] block overflow-hidden py-[0.08em]">
                <span data-hero-line className="block lg:whitespace-nowrap">
                  From Its Roots.
                </span>
              </span>
            </h1>

            <p
              data-hero-fade
              className="mt-5 max-w-2xl text-base font-light tracking-wide text-pretty text-white/90 sm:text-lg lg:text-xl"
            >
              Authentic journeys through agriculture, wellness, nature and local
              communities personally designed around you.
            </p>

            <span
              aria-hidden="true"
              data-hero-rule
              className="mt-7 block h-px w-40 bg-white/60 sm:w-64"
            />
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p data-hero-fade className="max-w-sm text-sm leading-relaxed text-white/85">
              <span className="block text-base font-semibold text-white">
                Agro &amp; Wellness Journeys
              </span>
              Farm stays, Ayurveda retreats and village kitchens across the
              island.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
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
          </div>
        </HeroIntro>
      </Container>
    </section>
  );
}
