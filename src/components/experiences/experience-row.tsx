import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ExperienceCategory } from "@/types";

/**
 * One line of an editorial index: number, title set large, the summary, a
 * pill-shaped photograph and an arrow, ruled off from its neighbours.
 *
 * The whole row is clickable, but only the title is a link: its `::after`
 * stretches over the row, so screen readers hear one descriptive link.
 */
export function ExperienceRow({
  slug,
  title,
  summary,
  image,
  index,
}: ExperienceCategory & { index: number }) {
  return (
    <article className="group relative grid grid-cols-[2rem_1fr_auto] items-center gap-x-4 border-b border-line py-6 sm:grid-cols-[3rem_1fr_auto] sm:gap-x-6 sm:py-8 lg:grid-cols-[3rem_minmax(0,1fr)_minmax(0,20rem)_11rem_3rem] lg:gap-x-10">
      <span className="self-start pt-2 font-display text-sm font-semibold tracking-widest text-brand lg:self-center lg:pt-0">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div>
        <h3 className="font-display text-2xl leading-tight font-medium text-ink transition-colors duration-200 ease-out group-hover:text-brand sm:text-3xl lg:text-4xl">
          <Link
            href={`/experiences/${slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-brand"
          >
            {title}
          </Link>
        </h3>
        {/* Below the title until lg, where it takes its own column. */}
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted lg:hidden">
          {summary}
        </p>
      </div>

      <p className="hidden text-sm leading-relaxed text-muted lg:block">{summary}</p>

      <div className="relative h-16 w-24 overflow-hidden rounded-pill bg-brand-light sm:h-20 sm:w-36 lg:h-24 lg:w-44">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 11rem, 9rem"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.12]"
        />
      </div>

      <span
        aria-hidden="true"
        className="hidden size-12 place-items-center rounded-pill border border-line text-brand transition-colors duration-200 ease-out group-hover:border-brand group-hover:bg-brand group-hover:text-white lg:grid"
      >
        <ArrowUpRight className="size-5 transition-transform duration-200 ease-out group-hover:rotate-45" />
      </span>
    </article>
  );
}
