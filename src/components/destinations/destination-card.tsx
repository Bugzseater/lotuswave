import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Destination } from "@/types";
import { IslandMap } from "./island-map";
import {
  bestMonths,
  DESTINATION_CATEGORY,
  FACT_ICON,
} from "./destination-category";

/**
 * Poster card. The photograph fills it; a brand-dark wash deepens at the top
 * and foot so white type always reads. From top to bottom: a glass category
 * pill and the plate number, the region on a hairline, the name large in
 * Fraunces, the tagline in tracked capitals, a glass strip of three facts
 * (two from the record, the best months worked out from the season data),
 * and an Explore pill beside a thumbnail of the island with this place lit.
 *
 * Gold is used only for the strip's icons — rule 7 allows icons on dark.
 * The name link stretches over the whole card; the pill is decoration.
 */
export function DestinationCard({
  destination,
  number,
  headingLevel = "h3",
  className,
}: {
  destination: Destination;
  number: number;
  headingLevel?: "h2" | "h3";
  className?: string;
}) {
  const { slug, name, region, category, tagline, image, coordinates, facts, bestTime } =
    destination;
  const { label, icon: CategoryIcon } = DESTINATION_CATEGORY[category];
  const Heading = headingLevel;
  // The strip has room for one range; a "+" says there is a second season.
  const [firstRange, ...moreRanges] = bestMonths(bestTime.months).split(", ");

  const stats = [
    ...facts.map(({ icon, value, label }) => ({ Icon: FACT_ICON[icon], value, label })),
    ...(firstRange
      ? [
          {
            Icon: CalendarDays,
            value: moreRanges.length ? `${firstRange} +` : firstRange,
            label: "Best months",
          },
        ]
      : []),
  ];

  return (
    <article
      className={cn(
        "group relative isolate flex h-full min-h-[30rem] flex-col overflow-hidden rounded-card bg-ink text-white transition-shadow duration-300 ease-out hover:shadow-card has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-brand",
        className,
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
        className="-z-20 object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
      />
      {/* Neutral, not purple: an even dark veil over the whole photo, then a
          deeper fall at the foot where the type sits. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/35" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-ink/30 via-transparent to-ink/70"
      />

      {/* Top row */}
      <div className="flex items-start justify-between gap-3 p-5 sm:p-6">
        <span className="inline-flex items-center gap-2 rounded-pill border border-white/30 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.22em] uppercase backdrop-blur-md">
          <CategoryIcon aria-hidden="true" className="size-3.5" />
          {label}
        </span>
        <span
          aria-hidden="true"
          className="grid size-12 shrink-0 place-items-center rounded-pill border border-white/30 bg-white/10 font-display text-lg italic backdrop-blur-md"
        >
          {String(number).padStart(2, "0")}
        </span>
      </div>

      <div className="mt-auto p-5 sm:p-6">
        <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.28em] text-white/85 uppercase">
          <span className="shrink-0">{region}</span>
          <span aria-hidden="true" className="h-px flex-1 bg-white/35" />
        </p>

        <Heading className="mt-3 font-display text-[1.75rem] leading-tight font-semibold text-white sm:text-3xl">
          <Link
            href={`/destinations/${slug}`}
            className="outline-none after:absolute after:inset-0 after:content-['']"
          >
            {name}
          </Link>
        </Heading>

        <p className="mt-3 text-[11px] leading-relaxed font-semibold tracking-[0.2em] text-white uppercase">
          {tagline}
        </p>

        {/* Stats and Explore open on hover or keyboard focus. Rows animate
            0fr → 1fr so the name glides up rather than jumping. Touch screens
            can't hover, so they always show it. */}
        <div className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-300 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100 group-has-[a:focus-visible]:grid-rows-[1fr] group-has-[a:focus-visible]:opacity-100 [@media(hover:none)]:grid-rows-[1fr] [@media(hover:none)]:opacity-100">
        <div className="min-h-0 overflow-hidden">
        <dl className="mt-5 grid grid-cols-3 divide-x divide-white/20 rounded-card border border-white/20 bg-white/10 py-3 backdrop-blur-md">
          {stats.map(({ Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1 px-1.5 text-center">
              <Icon aria-hidden="true" className="size-4 text-accent-gold" strokeWidth={1.75} />
              <dt className="order-2 text-[9px] leading-tight font-semibold tracking-[0.14em] text-white/75 uppercase sm:text-[10px]">
                {label}
              </dt>
              <dd className="order-1 text-sm leading-tight font-semibold sm:text-base">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 flex items-center justify-between gap-4">
          <span
            aria-hidden="true"
            className="inline-flex h-12 items-center gap-4 rounded-pill bg-white pr-1.5 pl-5 text-xs font-semibold tracking-[0.24em] text-brand uppercase transition-colors duration-200 ease-out group-hover:bg-brand-light"
          >
            Explore
            <span className="grid size-9 place-items-center rounded-pill bg-brand text-white">
              <ArrowRight className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
            </span>
          </span>

          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="text-right text-[9px] leading-tight font-semibold tracking-[0.16em] text-white/75 uppercase"
            >
              {coordinates.lat.toFixed(1)}° N
              <br />
              {coordinates.lng.toFixed(1)}° E
            </span>
            <IslandMap
              pins={[{ slug, name, coordinates, number }]}
              activeSlug={slug}
              minimal
              label={`${name} marked on a map of Sri Lanka`}
              className="w-9 shrink-0"
            />
          </div>
        </div>
        </div>
        </div>
      </div>
    </article>
  );
}
