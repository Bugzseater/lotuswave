import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { Journey } from "@/types";

/**
 * Poster card: the photograph fills it, a purple gradient rises from the
 * bottom, and everything a visitor compares sits on that gradient — length,
 * who it suits, the price from, and a white pill that reads as the CTA.
 *
 * The title link stretches over the whole card, so one tab stop and one link
 * per journey; the pill is decoration that echoes it.
 *
 * The theme chip is label only. Both `agro` and `wellness` get the same glass
 * treatment — theme never changes colour.
 */
export function JourneyCard({
  slug,
  title,
  durationDays,
  bestFor,
  startingPrice,
  theme,
  image,
}: Journey) {
  return (
    <article className="group relative isolate flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-card transition-shadow duration-300 ease-out hover:shadow-header has-[a:focus-visible]:outline-2 has-[a:focus-visible]:-outline-offset-2 has-[a:focus-visible]:outline-brand">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 1024px) 24vw, (min-width: 640px) 50vw, 85vw"
        className="-z-20 object-cover transition-transform duration-300 ease-out group-hover:scale-[1.05]"
      />
      {/* Two layers. The first is always there, just deep enough at the foot
          to keep the white type legible; the second is the full purple wash,
          which fades in on hover and on keyboard focus. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-dark/90 via-brand-dark/30 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-brand-dark/55 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-has-[a:focus-visible]:opacity-100"
      />

      <span className="absolute top-4 left-4 rounded-pill bg-white/15 px-3 py-1 text-xs font-medium text-white capitalize backdrop-blur-sm">
        {theme}
      </span>

      <div className="p-5">
        <h3 className="font-display text-xl leading-snug font-medium text-balance text-white sm:text-[1.375rem]">
          <Link
            href={`/journeys/${slug}`}
            className="outline-none after:absolute after:inset-0 after:content-['']"
          >
            {title}
          </Link>
        </h3>

        <p className="mt-2 text-sm text-white/80">
          {durationDays} Days / {durationDays - 1} Nights
        </p>
        <p className="mt-1 line-clamp-1 text-sm text-white/80">{bestFor}</p>

        <p className="mt-3 text-white">
          {startingPrice === null ? (
            <span className="text-lg font-semibold">Price on request</span>
          ) : (
            <>
              <span className="text-sm text-white/70">From </span>
              <span className="text-2xl font-semibold">
                {formatPrice(startingPrice)}
              </span>
            </>
          )}
        </p>

        <span
          aria-hidden="true"
          className="mt-4 flex h-11 items-center justify-center rounded-pill bg-white text-sm font-medium text-brand transition-colors duration-200 ease-out group-hover:bg-brand-light"
        >
          Explore Journey
        </span>
      </div>
    </article>
  );
}
