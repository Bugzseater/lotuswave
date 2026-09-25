import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { HeroIntro } from "@/components/home/hero-intro";
import { Container } from "@/components/ui/container";

const HERO_IMAGE = {
  src: "/bg/contactUs/hero-peak.png",
  alt: "A lone mountain peak rising from a sea of morning mist at sunrise, with tea terraces below and a traveller and local host beside a thatched pavilion in Sri Lanka's hill country",
};

/**
 * The photo's foreground subject alone on a transparent canvas, same size as
 * the photo — it lays over the wordmark so the text reads as sitting behind
 * the hills and the peak. Null drops the layer and the wordmark sits on top.
 */
const HERO_CUTOUT_SRC: string | null = "/bg/contactUs/hero-peak-cutout.png";

/**
 * Shared by the photo and the cutout — they must line up exactly. Phones pan
 * to the peak (about 65% across the frame); wider screens show it all.
 */
const FRAME = "object-cover object-[65%_center] lg:object-center";

/**
 * Contact page opener, built like the About hero: the photo runs full-bleed
 * with an oversized "CONTACT US" wordmark set translucent across the sky,
 * the headline and intro sit bottom-left over a brand-dark veil.
 */
export function ContactHero() {
  return (
    <section className="relative isolate h-svh overflow-hidden">
      {/* Layers, back to front: photo → wordmark → cutout → veils. */}
      <Image
        src={HERO_IMAGE.src}
        alt={HERO_IMAGE.alt}
        fill
        priority
        sizes="100vw"
        className={`-z-30 ${FRAME}`}
      />

      {/* Decorative wordmark — the real heading is the h1 below. Its top is
          worked out from the cover crop so the letters sit on the skyline and
          the peak and hills cut across their lower half: portrait screens
          scale the photo to the viewport height, wide ones to its width. */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[calc(38svh-7.7vw)] -z-20 text-center font-sans text-[14vw] leading-none font-black tracking-tight whitespace-nowrap text-white/60 select-none animate-wordmark-in [animation-delay:0.2s] lg:top-[calc(50svh-13.6vw)] lg:text-[12.5vw]"
      >
        CONTACT US
      </p>

      {HERO_CUTOUT_SRC && (
        <Image
          src={HERO_CUTOUT_SRC}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className={`pointer-events-none -z-20 ${FRAME}`}
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

      <Container className="relative z-20 h-full max-w-[80rem]">
        <HeroIntro className="flex h-full flex-col justify-end pt-28 pb-36 sm:pb-40 lg:pb-48">
          <h1 className="font-display text-4xl leading-[1.08] font-semibold text-balance text-white sm:text-5xl lg:text-6xl">
            <span className="sr-only">Contact LotusWave Lanka Tours: </span>
            <span className="-my-[0.08em] block overflow-hidden py-[0.08em]">
              <span data-hero-line className="block">
                Let&rsquo;s Talk About
              </span>
            </span>
            <span className="-my-[0.08em] block overflow-hidden py-[0.08em]">
              <span data-hero-line className="block">
                {/* Gold on the brand-dark veil, at 36px+ — allowed by rule 7. */}
                <span data-hero-accent className="inline-block text-accent-gold">
                  Your Sri Lanka
                </span>
                .
              </span>
            </span>
          </h1>

          <p
            data-hero-fade
            className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-white/90 sm:text-lg"
          >
            Questions, ideas or a half-formed dream of tea hills and Ayurveda —
            our local team replies personally, usually within one working day.
          </p>
        </HeroIntro>
      </Container>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-white from-5% via-white/45 via-40% to-transparent sm:h-36 lg:h-44"
      />

      <a
        href="#get-in-touch"
        className="group absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1.5 text-brand"
      >
        <span className="flex h-11 w-7 items-center justify-center rounded-pill border border-brand/70 transition-transform duration-300 ease-out group-hover:translate-y-1">
          <ArrowDown aria-hidden="true" className="size-4" />
        </span>
        <span className="text-[0.65rem] tracking-[0.3em] uppercase">
          Contact details
        </span>
      </a>
    </section>
  );
}
