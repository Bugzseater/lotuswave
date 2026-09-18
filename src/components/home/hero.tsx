import Link from "next/link";

import { HeroMedia } from "@/components/home/hero-media";
import { HeroPathways } from "@/components/home/hero-pathways";
import { Container } from "@/components/ui/container";
import { HERO_CONTENT } from "@/lib/constants";

const { media, headline, subtitle, actions, pathways, scrollHint } =
  HERO_CONTENT;

/**
 * Home hero — the "agro + wellness" story told over a split background still.
 *
 * The still does the work: agro on the left, wellness on the right, sunrise sky
 * across the top. So the layout stays out of its way — the type block is
 * centred high on the sky, the two pathway cards sit over their own half of the
 * image, and the middle of the frame is left empty.
 *
 * Overlays are top-down plus a bottom vignette rather than the usual left-heavy
 * scrim, which would have buried the agro half. Neither tints the whole image:
 * the golden sunrise is the reason this photograph works.
 */
export function Hero() {
  return (
    <section className="bg-white">
      {/*
       * Full-bleed and full-height. The header floats over this section rather
       * than sitting above it, so the still owns the whole viewport and the
       * content block below carries the top padding that clears it.
       *
       * `min-h` rather than `h` — on a short phone the stacked pathway cards are
       * allowed to push the frame taller instead of being clipped. `svh` keeps
       * mobile browser chrome from cropping them on first paint.
       */}
      <div className="relative flex min-h-[100svh] flex-col overflow-hidden">
        <HeroMedia image={media.image} />

        {/* Headline legibility: dark at the sky, gone by mid-frame. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-b from-brand-dark/70 from-0% via-brand-dark/25 via-30% to-transparent to-55%"
        />
        {/* Soft vignette so the frosted cards have something to sit on. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-ink/35 from-0% via-ink/12 via-22% to-transparent to-48%"
        />

        {/*
         * Top padding clears the floating header (4.5rem) and no more. The
         * whole column is budgeted to fit inside one viewport on a laptop —
         * headline, copy, buttons and the four cards — so nothing lands under
         * the fold on a 100svh hero.
         */}
        <Container className="relative flex flex-1 flex-col pt-28 pb-10 sm:pt-30 lg:pt-32 lg:pb-12">
          {/* Hairline rule down the left of the type block. */}
          <div className="w-full max-w-[46rem] border-l border-white/25 pl-5 sm:pl-8 xl:max-w-[52rem]">
            <h1
              className="font-display text-[2.75rem] leading-[1.05] text-white sm:text-6xl lg:text-7xl motion-safe:animate-rise"
              style={{ animationDelay: "0ms" }}
            >
              {headline.lead}{" "}
              <em className="font-light italic">{headline.emphasis}</em>
            </h1>

            <p
              className="mx-auto mt-6 max-w-2xl text-base text-white/90 sm:text-lg motion-safe:animate-rise"
              style={{ animationDelay: "100ms" }}
            >
              {subtitle}
            </p>

            <div
              className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 motion-safe:animate-rise"
              style={{ animationDelay: "200ms" }}
            >
              <Link
                href={actions.secondary.href}
                className="hover:text-brand inline-flex h-13 w-full items-center justify-center rounded-pill border border-white px-8 text-base font-medium text-white transition-colors duration-200 hover:bg-white focus-visible:outline-white sm:w-auto"
              >
                {actions.secondary.label}
              </Link>
              <Link
                href={actions.primary.href}
                className="bg-brand hover:bg-brand-dark inline-flex h-13 w-full items-center justify-center rounded-pill px-8 text-base font-medium text-white transition-colors duration-200 sm:w-auto"
              >
                {actions.primary.label}
              </Link>
            </div>
          </div>

          <HeroPathways
            pathways={pathways}
            scrollHint={scrollHint}
            className="mt-12 sm:mt-auto sm:pt-16"
          />
        </Container>
      </div>
    </section>
  );
}
