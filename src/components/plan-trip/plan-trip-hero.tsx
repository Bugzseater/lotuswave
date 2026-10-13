import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { ArrowDown, Clock, HandHeart, ShieldCheck, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { WaveEdge } from "@/components/ui/wave-edge";
import { cn } from "@/lib/utils";

const HERO_IMAGE = {
  src: "/bg/planTrip/hero.png",
  alt: "Travellers and a local guide on a rocky viewpoint above misty tea-covered hills at sunrise in Sri Lanka's hill country",
};

/**
 * The foreground subject alone on a transparent canvas, same size as the
 * photo — it lays over the wordmark so the text reads as sitting behind it.
 */
const HERO_CUTOUT_SRC = "/bg/planTrip/hero-cutout.png";

/**
 * Shared by the photo and the cutout — they must line up exactly. Phones pan
 * to the subject (about 70% across the frame); wider screens show it all.
 */
const FRAME = "object-cover object-[70%_center] lg:object-center";

const PROMISES: { icon: LucideIcon; label: string }[] = [
  { icon: HandHeart, label: "Free to plan" },
  { icon: Clock, label: "Reply within one working day" },
  { icon: ShieldCheck, label: "No obligation to book" },
];

const inPublic = (src: string) => existsSync(path.join(process.cwd(), "public", src));

/**
 * Plan-your-trip opener, built like the About and Contact heroes: the photo
 * runs full-bleed with an oversized "PLAN YOUR TRIP" wordmark across the sky,
 * the headline sits bottom-left over a brand-dark veil. Until the photo is in
 * `public/`, it falls back to a plain brand background (rule 5).
 */
export function PlanTripHero() {
  const hasPhoto = inPublic(HERO_IMAGE.src);
  const hasCutout = hasPhoto && inPublic(HERO_CUTOUT_SRC);

  return (
    <section className={cn("relative isolate h-svh min-h-[40rem] overflow-hidden", !hasPhoto && "bg-brand")}>
      {/* Layers, back to front: photo → wordmark → cutout → veils. */}
      {hasPhoto && (
        <Image
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          fill
          priority
          sizes="100vw"
          className={`-z-30 ${FRAME}`}
        />
      )}

      {/* Decorative wordmark — the real heading is the h1 below. Placed so the
          three figures on the rock (about 30–50% down the photo) cut across
          its lower half once the cutout lays over it. */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[30svh] -z-20 text-center font-sans text-[11vw] leading-none font-black tracking-tight whitespace-nowrap text-white/75 select-none animate-wordmark-in [animation-delay:0.2s] lg:top-[24svh] lg:text-[10vw]"
      >
        PLAN YOUR TRIP
      </p>

      {hasCutout && (
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

      {/* Brand-dark veil on the copy side, plus a top shade for the nav and a
          foot shade for the copy. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-dark/75 via-brand-dark/35 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/35 via-transparent to-ink/50"
      />

      <Container className="relative z-20 h-full max-w-[80rem]">
        {/* Static copy — no entrance or scroll animation. */}
        <div className="flex h-full flex-col justify-end pt-28 pb-36 sm:pb-40 lg:pb-48">
          <h1 className="font-display text-4xl leading-[1.08] font-semibold text-balance text-white sm:text-5xl lg:text-6xl">
            <span className="sr-only">Plan Your Trip: </span>
            <span className="block">Design Your</span>
            <span className="block">
              {/* Gold on the brand-dark veil, at 36px+ — allowed by rule 7. */}
              <span className="text-accent-gold">Sri Lanka Journey</span>.
            </span>
          </h1>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
            {PROMISES.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm text-white">
                <Icon aria-hidden="true" className="size-4 text-accent-gold" strokeWidth={1.75} />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {/* White wave closing the photo into the form section. Nudged 1px past
          the edge to hide any sub-pixel seam. */}
      <WaveEdge position="bottom" flat className="-bottom-px z-10 fill-white" />

      <a
        href="#plan-form"
        className="group absolute bottom-16 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1.5 text-white focus-visible:outline-white sm:bottom-20 lg:bottom-28"
      >
        <span className="flex h-11 w-7 items-center justify-center rounded-pill border border-white/70 transition-transform duration-300 ease-out group-hover:translate-y-1">
          <ArrowDown aria-hidden="true" className="size-4" />
        </span>
        <span className="text-[0.65rem] tracking-[0.3em] uppercase">Start planning</span>
      </a>
    </section>
  );
}
