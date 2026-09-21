import Image from "next/image";
import { Clock, Users } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { Journey } from "@/types";

/**
 * Package card. Stacks on phones; from `sm` the photograph takes the left
 * two-fifths and the details run beside it, so four cards sit as a 2×2 block
 * on desktop without turning into tall towers.
 */
export function JourneyCard({
  slug,
  title,
  durationDays,
  bestFor,
  summary,
  startingPrice,
  image,
}: Journey) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card bg-white ring-1 ring-line transition-shadow duration-300 ease-out hover:shadow-header sm:flex-row">
      <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-brand-light sm:aspect-auto sm:w-2/5">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 40vw, 100vw"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.05]"
        />
        <p className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-pill bg-white/90 px-3 py-1 text-xs font-semibold text-ink backdrop-blur-sm">
          <Clock aria-hidden="true" className="size-3.5 text-brand" />
          {durationDays} Days
        </p>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-2xl leading-tight font-semibold text-ink sm:text-[1.65rem]">
          {title}
        </h3>

        <p className="mt-2 flex items-start gap-2 text-[13px] leading-snug text-muted">
          <Users aria-hidden="true" className="mt-px size-4 shrink-0 text-brand" />
          <span>
            <span className="font-semibold text-ink">Best for:</span> {bestFor}
          </span>
        </p>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{summary}</p>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-line pt-4 sm:pt-5">
          {startingPrice === null ? (
            <p>
              <span className="block text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
                Price
              </span>
              <span className="font-display text-xl font-semibold text-ink">Request Price</span>
            </p>
          ) : (
            <p>
              <span className="block text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
                Starting from
              </span>
              <span className="font-display text-2xl font-semibold text-ink">
                {formatPrice(startingPrice)}
              </span>
              <span className="text-xs text-muted"> / person</span>
            </p>
          )}

          <ButtonLink href={`/journeys/${slug}`} variant="secondary" size="sm" className="shrink-0">
            View Journey<span className="sr-only">: {title}</span>
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
