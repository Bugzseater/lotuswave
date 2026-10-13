import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { StorySummary } from "@/types";
import { STORY_CATEGORY_ICON, storyCategory } from "./story-category";

/** Concave corner that rounds the notch into the photo's edge. */
const NOTCH_CORNER =
  "pointer-events-none absolute size-5 bg-[radial-gradient(circle_at_0_0,transparent_1.25rem,var(--color-white)_calc(1.25rem+0.5px))]";

/**
 * Article card, built like a postcard: the photo sits inset in a white frame
 * with the category and a date stamp on it, and a curved notch cut into its
 * bottom-right corner holds the arrow. Below, reading time, title and a
 * two-line excerpt. The card lifts and the arrow turns on hover.
 *
 * The title link stretches over the whole card — one tab stop per story;
 * the arrow is decoration that echoes it.
 */
export function StoryCard({
  story,
  headingLevel = "h3",
}: {
  story: StorySummary;
  headingLevel?: "h2" | "h3";
}) {
  const { slug, title, excerpt, category, publishedAt, image, readingMinutes } = story;
  const Icon = STORY_CATEGORY_ICON[category];
  const Heading = headingLevel;
  const date = new Date(publishedAt);
  const day = date.getUTCDate();
  const month = date.toLocaleString("en-GB", { month: "short", timeZone: "UTC" });

  return (
    <article className="group relative flex h-full flex-col rounded-card border border-line bg-white p-2 transition duration-300 ease-out hover:-translate-y-1 hover:border-brand/20 hover:shadow-card has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-brand">
      {/* ── Photo ── */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-[0.875rem] bg-line">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink/45 to-transparent"
        />

        {/* Category — frosted glass, top left. */}
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-pill border border-white/30 bg-white/15 px-3 py-1.5 text-[11px] font-semibold tracking-[0.12em] text-white uppercase backdrop-blur-md">
          <Icon aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
          {storyCategory(category).title}
        </span>

        {/* Date stamp — top right. */}
        <time
          dateTime={publishedAt}
          title={formatDate(publishedAt)}
          className="absolute top-3 right-3 grid w-12 place-items-center rounded-[0.75rem] bg-white/90 py-1.5 text-ink backdrop-blur-md"
        >
          <span className="font-display text-xl leading-none font-semibold tabular-nums">{day}</span>
          <span className="mt-0.5 text-[10px] font-semibold tracking-[0.14em] text-brand uppercase">
            {month}
          </span>
        </time>

        {/* The notch: a white bite out of the corner, rounded into the photo
            by two concave corners, holding the arrow. */}
        <div aria-hidden="true" className="absolute right-0 bottom-0 rounded-tl-[1.25rem] bg-white pt-2 pl-2">
          <span className={`${NOTCH_CORNER} right-0 bottom-full`} />
          <span className={`${NOTCH_CORNER} right-full bottom-0`} />
          <span className="grid size-12 place-items-center rounded-pill bg-brand text-white transition-colors duration-300 ease-out group-hover:bg-brand-dark">
            <ArrowUpRight
              className="size-5 transition-transform duration-300 ease-out group-hover:rotate-45"
              strokeWidth={2}
            />
          </span>
        </div>
      </div>

      {/* ── Copy ── */}
      <div className="flex flex-1 flex-col px-3 pt-4 pb-4 sm:px-4">
        <p className="flex items-center gap-1.5 text-xs font-medium text-muted">
          <Clock aria-hidden="true" className="size-3.5" strokeWidth={1.75} />
          {readingMinutes} min read
        </p>

        <Heading className="mt-2 font-display text-xl leading-snug text-balance text-ink transition-colors duration-200 ease-out group-hover:text-brand sm:text-[1.375rem]">
          <Link
            href={`/travel-stories/${slug}`}
            className="outline-none after:absolute after:inset-0 after:rounded-card after:content-['']"
          >
            {title}
          </Link>
        </Heading>

        <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-pretty text-muted">{excerpt}</p>

        {/* A hairline that draws across on hover. */}
        <span aria-hidden="true" className="mt-auto block pt-5">
          <span className="block h-px w-full bg-line">
            <span className="block h-px w-0 bg-brand transition-[width] duration-500 ease-out group-hover:w-full" />
          </span>
        </span>
      </div>
    </article>
  );
}
