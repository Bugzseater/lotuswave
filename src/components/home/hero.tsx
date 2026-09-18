import Link from "next/link";

import { HeroMedia } from "@/components/home/hero-media";
import { HeroPathways } from "@/components/home/hero-pathways";
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

        {/*
         * Flat darkening pass across the whole frame. Neutral ink rather than
         * brand purple, so the golden sunrise survives — it just gets quieter.
         */}
        <div aria-hidden className="bg-ink/40 absolute inset-0" />

        {/* Headline legibility: dark at the sky, gone by mid-frame. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-b from-brand-dark/60 from-0% via-brand-dark/25 via-30% to-transparent to-55%"
        />
        {/* Soft vignette so the frosted cards have something to sit on. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-ink/50 from-0% via-ink/18 via-22% to-transparent to-48%"
        />

        {/*
         * Top padding clears the floating header (4.5rem) and no more. The
         * whole column is budgeted to fit inside one viewport on a laptop —
         * headline, copy, buttons and the four cards — so nothing lands under
         * the fold on a 100svh hero.
         */}
        {/*
         * Not `Container`: the hero sits further left than the rest of the
         * site's 72rem column, close to the frame edge, while the header keeps
         * its own alignment. The max-width only bites on very wide screens, to
         * stop the block drifting away from the headline on an ultrawide.
         */}
        <div className="relative mx-auto flex w-full max-w-[112rem] flex-1 flex-col px-5 pt-28 pb-10 sm:px-8 sm:pt-30 lg:px-12 lg:pt-32 lg:pb-12 xl:px-16">
          {/* Hairline rule down the left of the type block. */}
          <div className="w-full max-w-[46rem] border-l border-white/25 pl-5 sm:pl-8 xl:max-w-[58rem]">
            <h1
              className="font-display text-[2.9rem] leading-[1.02] text-white sm:text-[3.75rem] lg:text-[4.5rem] xl:text-[5.25rem] motion-safe:animate-rise"
              style={{ animationDelay: "0ms" }}
            >
              {/* One unbroken line from `sm` up — the phrase should not split
                  across "Sri" and "Lanka". A phone is too narrow to promise it. */}
              <span className="block font-bold sm:whitespace-nowrap">
                {headline.lead}
              </span>
              <em className="mt-1 block font-normal italic">
                {headline.emphasis}
              </em>
            </h1>

            <p
              className="mt-5 max-w-xl text-base text-white/90 sm:text-lg motion-safe:animate-rise"
              style={{ animationDelay: "100ms" }}
            >
              {subtitle}
            </p>

            <div
              className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4 motion-safe:animate-rise"
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
            className="mt-10 sm:mt-auto sm:pt-10"
          />
        </div>
      </div>
    </section>
  );
}
