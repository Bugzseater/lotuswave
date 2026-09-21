import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ExperienceIcon } from "@/components/experiences/experience-icon";
import type { ExperienceCategory } from "@/types";

/**
 * Compact card: the photograph sits inset inside a white frame, the icon rides
 * on it as a small glass chip, and a round arrow fills with brand on hover.
 *
 * The whole card is clickable, but only the title is a link: its `::after`
 * stretches over the card, so screen readers hear one descriptive link rather
 * than a card-sized blob of text.
 */
export function ExperienceCard({ slug, title, summary, icon, image }: ExperienceCategory) {
  return (
    <article className="group relative flex h-full flex-col rounded-card bg-white p-2 ring-1 ring-line transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:shadow-header">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[14px] bg-brand-light">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.05]"
        />
        <span className="absolute top-3 left-3 grid size-9 place-items-center rounded-pill bg-white/85 backdrop-blur-sm">
          <ExperienceIcon icon={icon} className="size-[18px] text-brand" />
        </span>
      </div>

      <div className="flex flex-1 items-end gap-4 px-3 pt-4 pb-3">
        <div className="flex-1">
          <h3 className="font-display text-xl leading-tight font-semibold text-ink sm:text-[1.4rem]">
            <Link
              href={`/experiences/${slug}`}
              className="after:absolute after:inset-0 after:rounded-card focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-3 focus-visible:after:outline-brand"
            >
              {title}
            </Link>
          </h3>
          <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted sm:text-sm">
            {summary}
          </p>
        </div>

        <span
          aria-hidden="true"
          className="grid size-9 shrink-0 place-items-center rounded-pill border border-line text-brand transition-colors duration-200 ease-out group-hover:border-brand group-hover:bg-brand group-hover:text-white"
        >
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </article>
  );
}
