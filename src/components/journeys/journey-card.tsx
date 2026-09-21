import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, Users } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Journey } from "@/types";

/**
 * Poster card: the photograph fills the card and the details sit on a
 * brand-dark scrim at its foot. The title link stretches over the whole card,
 * so one tab stop and one link per journey — the arrow is decoration.
 *
 * Height comes from the parent grid; `min-h` keeps it a poster on phones.
 */
export function JourneyCard({
  slug,
  title,
  durationDays,
  bestFor,
  summary,
  startingPrice,
  image,
  index,
}: Journey & { index?: number }) {
  return (
    <article className="group relative isolate flex h-full min-h-[30rem] flex-col justify-between overflow-hidden rounded-card bg-brand-dark text-white has-[a:focus-visible]:outline-2 has-[a:focus-visible]:-outline-offset-4 has-[a:focus-visible]:outline-white sm:min-h-[34rem]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 85vw"
        className="-z-10 object-cover transition-transform duration-300 ease-out group-hover:scale-[1.05]"
      />

      {/* Weighted to the foot, where the copy sits; the top stays photograph. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-dark/95 via-brand-dark/40 to-brand-dark/10"
      />

      <div className="flex items-start justify-between p-5 sm:p-7">
        {index !== undefined && (
          <span
            aria-hidden="true"
            className="font-display text-4xl leading-none font-medium text-white/80 sm:text-5xl"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <p className="ml-auto inline-flex items-center gap-1.5 rounded-pill bg-white/15 px-3.5 py-1.5 text-xs font-semibold text-white ring-1 ring-white/30 backdrop-blur-md">
          <Clock aria-hidden="true" className="size-3.5" />
          {durationDays} Days
        </p>
      </div>

      <div className="p-5 sm:p-7">
        <p className="flex items-center gap-2 text-xs font-medium tracking-wide text-white/80">
          <Users aria-hidden="true" className="size-4 shrink-0" />
          <span>
            <span className="sr-only">Best for: </span>
            {bestFor}
          </span>
        </p>

        <h3 className="mt-3 font-display text-3xl leading-[1.05] font-semibold text-balance text-white sm:text-4xl">
          <Link
            href={`/journeys/${slug}`}
            className="outline-none after:absolute after:inset-0 after:content-['']"
          >
            {title}
          </Link>
        </h3>

        <p className="mt-3 line-clamp-2 max-w-md text-sm leading-relaxed text-white/80">
          {summary}
        </p>

        <div className="mt-5 flex items-end justify-between gap-4 border-t border-white/20 pt-5">
          {startingPrice === null ? (
            <p>
              <span className="block text-[11px] font-semibold tracking-[0.16em] text-white/70 uppercase">
                Tailored pricing
              </span>
              <span className="font-display text-2xl font-semibold">Request Price</span>
            </p>
          ) : (
            <p>
              <span className="block text-[11px] font-semibold tracking-[0.16em] text-white/70 uppercase">
                Starting from
              </span>
              <span className="font-display text-2xl font-semibold sm:text-3xl">
                {formatPrice(startingPrice)}
              </span>
              <span className="text-xs text-white/70"> / person</span>
            </p>
          )}

          <span
            aria-hidden="true"
            className="grid size-12 shrink-0 place-items-center rounded-pill bg-white text-brand transition-transform duration-300 ease-out group-hover:rotate-45"
          >
            <ArrowUpRight className="size-5" />
          </span>
        </div>
      </div>
    </article>
  );
}
