import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ExperienceCategory } from "@/types";
import { cn } from "@/lib/utils";

/**
 * A slide in the experiences carousel: photograph on top, then a centred
 * title, summary and call to action on white.
 *
 * With a `cutout` PNG the card drops its box — no white surface, shadow or
 * rounded frame — and the PNG sits loose above the same text.
 *
 * The whole card is clickable, but only the title is a link: its `::after`
 * stretches over the card, so screen readers hear one descriptive link.
 */
export function ExperienceCard({ slug, title, summary, image, cutout }: ExperienceCategory) {
  return (
    <article
      className={cn(
        "group relative isolate flex h-full flex-col",
        !cutout && "overflow-hidden rounded-card bg-white shadow-header",
      )}
    >
      {cutout ? (
        // Bottom edge fades out into the text, which rides up over it — the
        // image sits at -z-10 so the text paints on top. The mask only reads
        // alpha — `black` here is not a palette colour.
        <div className="relative -z-10 aspect-[4/3] [mask-image:linear-gradient(to_bottom,black_82%,transparent)]">
          <Image
            src={cutout.src}
            alt={cutout.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw"
            className="object-contain object-bottom transition-transform duration-300 ease-out group-hover:scale-[1.05]"
          />
        </div>
      ) : (
        <div className="relative aspect-[4/3] overflow-hidden bg-brand-light">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.05]"
          />
        </div>
      )}

      <div
        className={cn(
          "flex flex-1 flex-col items-center px-4 pb-8 text-center sm:px-5",
          cutout ? "-mt-4 sm:-mt-5" : "pt-8",
        )}
      >
        {/* Sized so the longest title ("Food & Culinary Experiences") holds
            one line at the carousel's card widths. */}
        <h3 className="font-display text-[1.375rem] leading-tight font-medium text-balance text-ink transition-colors duration-200 ease-out group-hover:text-brand sm:text-2xl">
          <Link
            href={`/experiences/${slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:rounded-card focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-brand"
          >
            {title}
          </Link>
        </h3>
        <p className="mt-4 line-clamp-3 text-base leading-relaxed text-pretty text-muted">
          {summary}
        </p>
        <span
          aria-hidden="true"
          className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold tracking-[0.14em] text-brand uppercase"
        >
          Discover more
          <ArrowRight className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
