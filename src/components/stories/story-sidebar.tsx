import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Journey, StorySummary } from "@/types";
import { GLASS, GlassSheen } from "./glass";

const CARD = cn(GLASS, "p-5 sm:p-6");

/**
 * The article's right rail: the journeys the story leads into, then more
 * stories to read. Compact rows so the whole rail fits on screen and can stay
 * pinned while the article scrolls; on phones it follows the article.
 */
export function StorySidebar({ journeys, stories }: { journeys: Journey[]; stories: StorySummary[] }) {
  return (
    <div className="space-y-6 lg:sticky lg:top-28">
      {journeys.length > 0 && (
        <section aria-labelledby="journeys-heading" className={CARD}>
          <GlassSheen />
          <h2 id="journeys-heading" className="font-display text-xl leading-snug font-medium text-ink">
            Journeys to go with this story
          </h2>
          <ul className="mt-5 space-y-2">
            {journeys.map(({ slug, title, image, durationDays, startingPrice }) => (
              <li key={slug}>
                <Row
                  href={`/journeys/${slug}`}
                  image={image}
                  title={title}
                  meta={`${durationDays} days · ${startingPrice === null ? "Request price" : `From ${formatPrice(startingPrice)}`}`}
                />
              </li>
            ))}
          </ul>
          <MoreLink href="/journeys">All Sri Lanka journeys</MoreLink>
        </section>
      )}

      {stories.length > 0 && (
        <section aria-labelledby="related-heading" className={CARD}>
          <GlassSheen />
          <h2 id="related-heading" className="font-display text-xl leading-snug font-medium text-ink">
            Keep reading
          </h2>
          <ul className="mt-5 space-y-2">
            {stories.map(({ slug, title, image, readingMinutes }) => (
              <li key={slug}>
                <Row href={`/travel-stories/${slug}`} image={image} title={title} meta={`${readingMinutes} min read`} />
              </li>
            ))}
          </ul>
          <MoreLink href="/travel-stories">All travel stories</MoreLink>
        </section>
      )}
    </div>
  );
}

function Row({
  href,
  image,
  title,
  meta,
}: {
  href: string;
  image: { src: string; alt: string };
  title: string;
  meta: string;
}) {
  return (
    <Link
      href={href}
      className="group -mx-2 flex items-center gap-4 rounded-[0.875rem] p-2 transition-colors duration-200 ease-out hover:bg-white/80"
    >
      <span className="relative size-[4.5rem] shrink-0 overflow-hidden rounded-[0.75rem] bg-line">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="72px"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        />
      </span>
      <span className="min-w-0">
        <span className="line-clamp-2 text-sm leading-snug font-semibold text-ink transition-colors duration-200 ease-out group-hover:text-brand">
          {title}
        </span>
        <span className="mt-1 block text-xs text-muted">{meta}</span>
      </span>
    </Link>
  );
}

function MoreLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand"
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
      />
    </Link>
  );
}
