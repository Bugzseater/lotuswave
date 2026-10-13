import Image from "next/image";
import { CalendarDays, PenLine } from "lucide-react";
import { readingMinutes } from "@/lib/data";
import { cn, formatDate } from "@/lib/utils";
import type { Story } from "@/types";
import { GLASS, GlassSheen } from "./glass";
import { RichText } from "./rich-text";
import { STORY_CATEGORY_ICON, storyCategory } from "./story-category";

/**
 * The article. A story-facts bar opens it; the first paragraph reads as a
 * serif lede behind a large purple initial, any key points follow as a plain
 * bulleted list, and the two photos close it as an overlapping collage.
 */
export function StoryBody({ story }: { story: Story }) {
  const { author, publishedAt, updatedAt, category, description, points, images } = story;
  const [lede, ...paragraphs] = description;
  const date = updatedAt ?? publishedAt;
  const CategoryIcon = STORY_CATEGORY_ICON[category];
  const { title: categoryTitle } = storyCategory(category);

  return (
    <div className="max-w-[46rem] text-base leading-[1.8] text-pretty text-ink sm:text-lg sm:leading-[1.8]">
      {/* ── Story facts ── */}
      <div className={cn(GLASS, "flex items-center gap-5 p-5 sm:gap-8 sm:p-6")}>
        <GlassSheen />
        <CategoryIcon
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 -bottom-10 hidden size-36 text-brand/[0.06] sm:block"
          strokeWidth={1.25}
        />

        <p className="relative shrink-0 border-r border-brand/10 pr-5 leading-none sm:pr-8">
          <span className="block font-display text-5xl leading-[0.85] font-light text-brand tabular-nums sm:text-6xl">
            {readingMinutes(story)}
          </span>
          <span className="mt-2 block text-xs font-semibold tracking-[0.2em] text-muted uppercase">min read</span>
        </p>

        <dl className="relative grid min-w-0 gap-2.5 text-sm leading-snug text-ink sm:flex sm:flex-wrap sm:gap-x-6 sm:gap-y-3">
          <div>
            <dt className="sr-only">Written by</dt>
            <dd className="flex items-center gap-2.5 font-semibold">
              <span className="grid size-7 shrink-0 place-items-center rounded-pill bg-brand text-white">
                <PenLine aria-hidden="true" className="size-3.5" strokeWidth={2} />
              </span>
              {author}
            </dd>
          </div>
          <div>
            <dt className="sr-only">{updatedAt ? "Updated" : "Published"}</dt>
            <dd className="flex items-center gap-2.5 text-muted">
              <span className="grid size-7 shrink-0 place-items-center rounded-pill bg-white text-brand shadow-sm">
                <CalendarDays aria-hidden="true" className="size-3.5" strokeWidth={2} />
              </span>
              <span>
                {updatedAt && "Updated "}
                <time dateTime={date}>{formatDate(date)}</time>
              </span>
            </dd>
          </div>
          <div>
            <dt className="sr-only">Category</dt>
            <dd className="flex items-center gap-2.5 text-muted">
              <span className="grid size-7 shrink-0 place-items-center rounded-pill bg-white text-brand shadow-sm">
                <CategoryIcon aria-hidden="true" className="size-3.5" strokeWidth={2} />
              </span>
              {categoryTitle}
            </dd>
          </div>
        </dl>
      </div>

      {/* ── Description ── */}
      {lede && (
        <p className="mt-10 font-display text-xl leading-[1.6] text-ink first-letter:float-left first-letter:mt-1 first-letter:mr-3 first-letter:text-7xl first-letter:leading-[0.8] first-letter:font-semibold first-letter:text-brand sm:first-letter:mr-4 sm:first-letter:text-8xl sm:mt-12 sm:text-2xl sm:leading-[1.55]">
          <RichText text={lede} />
        </p>
      )}
      {paragraphs.map((paragraph, i) => (
        <p key={i} className="mt-7">
          <RichText text={paragraph} />
        </p>
      ))}

      {/* ── Key points ── only on stories that have them. */}
      {points && points.length > 0 && (
        <ul className="mt-8 space-y-3">
          {points.map((point) => (
            <li key={point} className="flex gap-3.5">
              <span aria-hidden="true" className="mt-[0.72em] size-2 shrink-0 rounded-pill bg-brand" />
              <span>
                <RichText text={point} />
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* ── In pictures ── the second photo overlaps the first's corner. */}
      <div className="relative mt-14 aspect-square sm:mt-16 sm:aspect-[6/5]">
        <div className="absolute top-0 left-0 h-[78%] w-[62%] overflow-hidden rounded-card bg-line">
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            sizes="(min-width: 768px) 460px, 62vw"
            className="object-cover transition-transform duration-300 ease-out hover:scale-[1.03]"
          />
        </div>

        <div aria-hidden="true" className="absolute top-0 right-0 w-[33%] pt-1">
          <p className="font-display text-lg leading-tight text-ink italic sm:text-3xl">In pictures</p>
          <span className="mt-3 block h-px w-12 bg-brand sm:mt-4" />
        </div>

        <div className="absolute right-0 bottom-0 h-[52%] w-1/2 overflow-hidden rounded-card bg-line shadow-xl ring-8 ring-white">
          <Image
            src={images[1].src}
            alt={images[1].alt}
            fill
            sizes="(min-width: 768px) 370px, 50vw"
            className="object-cover transition-transform duration-300 ease-out hover:scale-[1.03]"
          />
        </div>
      </div>
    </div>
  );
}
