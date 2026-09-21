import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ExperienceIcon } from "@/components/experiences/experience-icon";
import type { ExperienceCategory } from "@/types";

/**
 * The whole card is clickable, but only the title is a link: its `::after`
 * stretches over the card, so screen readers hear one descriptive link rather
 * than a card-sized blob of text.
 */
export function ExperienceCard({ slug, title, summary, icon, image }: ExperienceCategory) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card bg-white transition-shadow duration-300 ease-out hover:shadow-header">
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-light">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <ExperienceIcon icon={icon} className="size-6 text-brand" />
        <h3 className="mt-3 font-display text-2xl leading-tight font-semibold text-ink sm:text-[1.7rem]">
          <Link
            href={`/experiences/${slug}`}
            className="after:absolute after:inset-0 after:rounded-card focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-3 focus-visible:after:outline-brand"
          >
            {title}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[15px]">{summary}</p>

        <span
          aria-hidden="true"
          className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand"
        >
          Explore
          <ArrowUpRight className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </article>
  );
}
