import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Journey } from "@/types";

/**
 * Journal-style card: the photograph clean on top, then a quiet white panel
 * with everything centred — a small meta line (length and price), the title
 * in the serif, a short summary and a letter-spaced text link.
 *
 * The title link stretches over the whole card, so one tab stop and one link
 * per journey; the "View journey" line is decoration that echoes it.
 */
export function JourneyCard({
  slug,
  title,
  durationDays,
  summary,
  startingPrice,
  image,
}: Journey) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-white transition-shadow duration-300 ease-out hover:shadow-header has-[a:focus-visible]:outline-2 has-[a:focus-visible]:-outline-offset-2 has-[a:focus-visible]:outline-brand">
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-light">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 85vw"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.05]"
        />
      </div>

      <div className="flex flex-1 flex-col items-center px-6 pt-8 pb-9 text-center sm:px-8">
        <p className="text-sm text-ink">
          {durationDays} Days
          <span aria-hidden="true" className="mx-2 text-line">
            |
          </span>
          {startingPrice === null
            ? "Price on request"
            : `From ${formatPrice(startingPrice)}`}
        </p>

        <h3 className="mt-4 font-display text-2xl leading-snug font-normal text-balance text-ink transition-colors duration-200 ease-out group-hover:text-brand sm:text-[1.75rem]">
          <Link
            href={`/journeys/${slug}`}
            className="outline-none after:absolute after:inset-0 after:content-['']"
          >
            {title}
          </Link>
        </h3>

        <p className="mt-4 line-clamp-3 text-[15px] leading-relaxed text-muted">{summary}</p>

        <span
          aria-hidden="true"
          className="mt-auto inline-flex items-center gap-2 pt-7 text-xs font-semibold tracking-[0.2em] text-brand uppercase"
        >
          View journey
          <ArrowRight className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
