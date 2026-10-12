import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Flower2, MapPin, Sprout, Users } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { JourneySummary } from "@/types";

/**
 * Full-photo journey card. The photograph fills the card; only a black fade
 * rises from the foot (and a light one at the top for the chip) — no brand
 * tint over the picture. On the fade: places, name, length and who it suits,
 * then a glass panel with the price and the CTA. A soft
 * wave closes the foot of the card.
 *
 * The title link stretches over the whole card, so one tab stop and one link
 * per journey; the CTA pill is decoration that echoes it.
 *
 * Theme shows only as the chip's icon and label — never as colour.
 */
export function JourneyCard({
  slug,
  title,
  durationDays,
  bestFor,
  startingPrice,
  theme,
  image,
  route,
}: Pick<
  JourneySummary,
  "slug" | "title" | "durationDays" | "bestFor" | "startingPrice" | "theme" | "image" | "route"
>) {
  const ThemeIcon = theme === "agro" ? Sprout : Flower2;

  return (
    <article className="group relative isolate flex h-full min-h-[25rem] w-full flex-col justify-end overflow-hidden rounded-card bg-ink shadow-card transition-shadow duration-300 ease-out hover:shadow-header has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-brand">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 1280px) 26vw, (min-width: 1024px) 24vw, (min-width: 640px) 50vw, 85vw"
        className="-z-20 object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
      />
      {/* Black fades only: deep at the foot for the copy, light at the top
          for the chip. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/95 via-ink/50 via-50% to-transparent"
      />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-24 bg-gradient-to-b from-ink/40 to-transparent" />

      <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-pill border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-medium text-white capitalize backdrop-blur-md">
        <ThemeIcon aria-hidden="true" className="size-4" strokeWidth={1.75} />
        {theme}
      </span>

      <div className="relative px-5 pb-6">
        <p className="flex items-center gap-1.5 text-xs font-medium text-white/80">
          <MapPin aria-hidden="true" className="size-3.5 shrink-0" strokeWidth={1.75} />
          <span className="line-clamp-1">{route.map(({ name }) => name).join(" · ")}</span>
        </p>

        <h3 className="mt-2 font-display text-2xl leading-tight font-semibold text-balance text-white sm:text-[1.625rem]">
          <Link
            href={`/journeys/${slug}`}
            className="outline-none after:absolute after:inset-0 after:z-20 after:content-['']"
          >
            {title}
          </Link>
        </h3>
        <span aria-hidden="true" className="mt-2.5 block h-0.5 w-10 rounded-pill bg-white/80" />

        <dl className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-white">
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Duration</dt>
            <CalendarDays aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.75} />
            <dd>
              {durationDays} Days / {durationDays - 1} Nights
            </dd>
          </div>
          <span aria-hidden="true" className="h-4 w-px bg-white/40" />
          <div className="flex min-w-0 items-center gap-1.5">
            <dt className="sr-only">Best for</dt>
            <Users aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.75} />
            <dd className="line-clamp-1">{bestFor}</dd>
          </div>
        </dl>

        {/* Glass panel: price and CTA. On a narrow card the CTA wraps
            under the price and fills the row. */}
        <div className="mt-5 flex flex-wrap items-center gap-3 rounded-card border border-white/15 bg-white/10 p-3 pl-4 backdrop-blur-md">
          <p className="shrink-0 whitespace-nowrap text-white">
            {startingPrice === null ? (
              <span className="block text-base leading-tight font-semibold">Price on request</span>
            ) : (
              <>
                <span className="block text-xs text-white/70">From</span>
                <span className="block font-display text-xl leading-tight font-semibold">
                  {formatPrice(startingPrice)}
                </span>
              </>
            )}
          </p>
          <span
            aria-hidden="true"
            className="ml-auto inline-flex h-11 grow items-center justify-center gap-2 rounded-pill bg-white px-4 text-sm font-semibold whitespace-nowrap text-brand transition-colors duration-200 ease-out group-hover:bg-brand-light"
          >
            Explore Journey
            <ArrowRight
              className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </span>
        </div>
      </div>

      {/* Soft waves along the foot of the card. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 400 40"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-8 w-full"
      >
        <path d="M0 14C70 4 130 6 190 20S320 40 400 22V40H0Z" className="fill-white/10" />
        <path d="M0 30C90 36 160 40 230 30S340 16 400 26V40H0Z" className="fill-brand/50" />
      </svg>
    </article>
  );
}
