import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { HeroIntro } from "@/components/home/hero-intro";
import { Container } from "@/components/ui/container";

const HERO_IMAGE = {
  src: "/bg/aboutUs/hero.png",
  alt: "Sunrise over Sigiriya rock and misty forested valleys in Sri Lanka's cultural triangle",
};

/** Sigiriya alone on a transparent canvas, same size as the photo. */
const HERO_ROCK_SRC = "/bg/aboutUs/hero-rock.png";

/**
 * About page opener. The photograph runs full-bleed with an oversized
 * "ABOUT US" wordmark set translucent across the sky; the story headline and
 * intro sit bottom-left over a brand-dark veil.
 */
export function AboutHero() {
  return (
    <section className="relative isolate h-svh overflow-hidden">
      {/* Layers, back to front: photo → wordmark → Sigiriya cutout → veils.
          The cutout is the same frame with everything but the rock made
          transparent, so with identical fit and position it lands exactly on
          the photo and the wordmark reads as sitting behind the rock. The
          veils go over both, so the cutout picks up the same tint. */}
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
        className="pointer-events-none absolute inset-x-0 top-24 -z-20 text-center font-sans text-[22vw] leading-none font-black tracking-tight text-white/60 select-none animate-wordmark-in [animation-delay:0.2s] lg:top-[18svh] lg:text-[18vw]"
      >
        ABOUT US
      </p>

      <Image
        src={HERO_ROCK_SRC}
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="pointer-events-none -z-20 object-cover object-[70%_center]"
      />

      {/* Brand-dark veil on the copy side, fading out toward Sigiriya, plus a
          top shade for the nav and a foot shade for the copy. */}
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
            <span className="sr-only">About LotusWave Lanka Tours: </span>
            <span className="-my-[0.08em] block overflow-hidden py-[0.08em]">
              <span data-hero-line className="block">
                People, Nature
              </span>
            </span>
            <span className="-my-[0.08em] block overflow-hidden py-[0.08em]">
              <span data-hero-line className="block">
                and{" "}
                {/* Gold on the brand-dark veil, at 36px+ — allowed by rule 7. */}
                <span data-hero-accent className="inline-block text-accent-gold">
                  Meaningful Journeys
                </span>
                .
              </span>
            </span>
          </h1>

          <p
            data-hero-fade
            className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-white/90 sm:text-lg"
          >
            We are a Sri Lankan travel and wellness company dedicated to
            showcasing the island&rsquo;s natural beauty, rich culture and
            authentic experiences, while supporting local communities and
            sustainable travel.
          </p>
        </HeroIntro>
      </Container>

      {/* Soft white fade along the foot, so the photo melts into the white
          Who We Are section instead of ending on a hard line. Solid only at
          the very bottom, then a long, eased ramp. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-white from-5% via-white/45 via-40% to-transparent sm:h-36 lg:h-44"
      />

      {/* Sits in the white of the fade, so it takes brand, not white. */}
      <a
        href="#our-story"
        className="group absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1.5 text-brand"
      >
        <span className="flex h-11 w-7 items-center justify-center rounded-pill border border-brand/70 transition-transform duration-300 ease-out group-hover:translate-y-1">
          <ArrowDown aria-hidden="true" className="size-4" />
        </span>
        <span className="text-[0.65rem] tracking-[0.3em] uppercase">
          Scroll down
        </span>
      </a>
    </section>
  );
}
