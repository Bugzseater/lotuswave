import Image from "next/image";
import { Container } from "@/components/ui/container";
import { WaveEdge } from "@/components/ui/wave-edge";
import type { ImageAsset } from "@/types";

/** Exported so the page can reuse it for the OG image. */
export const STORIES_HERO_IMAGE: ImageAsset = {
  src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2400&q=80",
  alt: "Mountain peaks rising above a sea of morning cloud",
};

/**
 * Travel stories opener, built like the Journeys hero: full-bleed photo, an
 * oversized "STORIES" wordmark across the sky and the headline bottom-left
 * over a brand-dark veil. Shorter than the other heroes — the reading starts
 * sooner. The category pages pass their own heading and intro.
 */
export function StoriesHero({
  eyebrow = "Travel Stories",
  title,
  intro,
  hideText = false,
  tagline,
}: {
  /** A short line shown at the foot when `hideText` is on. */
  tagline?: string;
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  /** Show only the photo and wordmark; the h1 becomes screen-reader only. */
  hideText?: boolean;
}) {
  return (
    <section className="relative isolate h-[80svh] min-h-[36rem] overflow-hidden">
      <Image
        src={STORIES_HERO_IMAGE.src}
        alt={STORIES_HERO_IMAGE.alt}
        fill
        priority
        sizes="100vw"
        className="-z-30 object-cover"
      />

      {/* Decorative wordmark — the real heading is the h1 below. */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-24 -z-20 text-center font-sans text-[17vw] leading-none font-black tracking-tight text-white/60 select-none animate-wordmark-in [animation-delay:0.2s] lg:top-[16svh] lg:text-[14vw]"
      >
        STORIES
      </p>

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-dark/75 via-brand-dark/35 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/35 via-transparent to-ink/50"
      />

      {hideText ? (
        // The photo and wordmark speak for themselves, with a short tagline
        // at the foot; the h1 stays for screen readers and search.
        <Container className="relative z-20 flex h-full max-w-[80rem] flex-col justify-end pt-28 pb-16 sm:pb-20 lg:pb-24">
          <h1 className="sr-only">{title}</h1>
          {tagline && (
            <p className="flex items-center gap-3 text-sm font-medium tracking-[0.2em] text-white uppercase sm:text-base animate-rise-in [animation-delay:0.6s]">
              <span aria-hidden="true" className="h-px w-10 bg-white/70" />
              {tagline}
            </p>
          )}
        </Container>
      ) : (
        <Container className="relative z-20 flex h-full max-w-[80rem] flex-col justify-end pt-28 pb-16 sm:pb-20 lg:pb-24">
          <p className="text-xs font-semibold tracking-[0.2em] text-white uppercase">{eyebrow}</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.08] font-semibold text-balance text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-white/90 sm:text-lg">
            {intro}
          </p>
        </Container>
      )}

      <WaveEdge position="bottom" flat className="-bottom-px z-10 fill-white" />
    </section>
  );
}
