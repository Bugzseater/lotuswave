import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import type { Experience } from "@/types";

/**
 * One experience on the experiences page: photograph, type label, title,
 * promise and the two facts people compare first — how long and where.
 *
 * The title link stretches over the card, so there is one tab stop and one
 * descriptive link per experience.
 */
export function ExperienceTile({ slug, title, type, promise, duration, location, image }: Experience) {
  return (
    <article className="group relative isolate flex h-full flex-col overflow-hidden rounded-card bg-white shadow-header has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-brand">
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-light">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.05]"
        />
        <span className="absolute top-4 left-4 rounded-pill bg-white/90 px-3 py-1 text-xs font-medium text-ink backdrop-blur-sm">
          {type}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl leading-snug font-medium text-balance text-ink transition-colors duration-200 ease-out group-hover:text-brand sm:text-2xl">
          <Link
            href={`/experiences/${slug}`}
            className="outline-none after:absolute after:inset-0 after:content-['']"
          >
            {title}
          </Link>
        </h3>
        <p className="mt-3 text-base leading-relaxed text-pretty text-muted">{promise}</p>

        <ul className="mt-5 space-y-1.5 border-t border-line pt-4 text-sm text-ink">
          <li className="flex items-center gap-2">
            <Clock aria-hidden="true" className="size-4 shrink-0 text-brand" strokeWidth={1.75} />
            {duration}
          </li>
          <li className="flex items-center gap-2">
            <MapPin aria-hidden="true" className="size-4 shrink-0 text-brand" strokeWidth={1.75} />
            {location}
          </li>
        </ul>

        <span
          aria-hidden="true"
          className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold tracking-[0.14em] text-brand uppercase"
        >
          View experience
          <ArrowRight className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
