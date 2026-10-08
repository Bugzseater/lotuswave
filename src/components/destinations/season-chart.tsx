import Link from "next/link";
import { Sun } from "lucide-react";
import { DESTINATION_AREAS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Destination, MonthRating } from "@/types";
import { MONTH_RATING_LABEL, MONTHS } from "./destination-category";

const FULL_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

/** One fill per rating, shared by the legend, the gauge and the ribbons. */
const FILL: Record<MonthRating, string> = {
  best: "bg-brand",
  good: "bg-brand/40",
  off: "bg-brand-light",
};

const BAR_HEIGHT: Record<MonthRating, string> = {
  best: "h-28 sm:h-36",
  good: "h-16 sm:h-20",
  off: "h-3",
};

const BAR_HEIGHT_COMPACT: Record<MonthRating, string> = {
  best: "h-20 sm:h-24",
  good: "h-10 sm:h-12",
  off: "h-2.5",
};

/** Key shared by both charts. */
export function SeasonLegend({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink", className)}>
      {(["best", "good", "off"] as const).map((rating) => (
        <li key={rating} className="flex items-center gap-2">
          <span aria-hidden="true" className={cn("h-2.5 w-6 rounded-pill", FILL[rating])} />
          {MONTH_RATING_LABEL[rating]}
        </li>
      ))}
    </ul>
  );
}

/**
 * Twelve bars rising from a baseline — tall and solid for the best months,
 * half-height for good, a stub for off-season. A sun sits over the best.
 */
export function SeasonGauge({
  months,
  compact = false,
}: {
  months: MonthRating[];
  /** Shorter bars, for a tile rather than a full section. */
  compact?: boolean;
}) {
  const heights = compact ? BAR_HEIGHT_COMPACT : BAR_HEIGHT;
  return (
    <div>
      <ol className="grid grid-cols-12 items-end gap-1.5 border-b border-line sm:gap-3">
        {months.map((rating, i) => (
          <li key={FULL_MONTHS[i]} className="flex flex-col items-center gap-2">
            <span className="sr-only">
              {FULL_MONTHS[i]}: {MONTH_RATING_LABEL[rating]}
            </span>
            {rating === "best" && (
              <Sun aria-hidden="true" className="size-4 text-brand" strokeWidth={1.75} />
            )}
            <span
              aria-hidden="true"
              className={cn("w-full rounded-t-pill", FILL[rating], heights[rating])}
            />
          </li>
        ))}
      </ol>
      <div aria-hidden="true" className="grid grid-cols-12 gap-1.5 sm:gap-3">
        {MONTHS.map((month) => (
          <span
            key={month}
            className="pt-2 text-center text-[10px] font-semibold tracking-wide text-muted uppercase sm:text-xs"
          >
            <span className="sm:hidden">{month[0]}</span>
            <span className="hidden sm:inline">{month}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * One circle per month: a solid disc for best, a half-filled disc for good
 * (a moon on the wane), a small hollow ring for off-season.
 */
const DOT: Record<MonthRating, string> = {
  best: "size-4 bg-brand",
  good: "size-4 border border-brand bg-linear-to-r from-brand from-50% to-transparent to-50%",
  off: "size-2 border border-brand/30",
};

/** Matching circles for the table's key. */
export function SeasonDotLegend({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink", className)}>
      {(["best", "good", "off"] as const).map((rating) => (
        <li key={rating} className="flex items-center gap-2">
          <span className="grid size-4 place-items-center">
            <span aria-hidden="true" className={cn("rounded-pill", DOT[rating])} />
          </span>
          {MONTH_RATING_LABEL[rating]}
        </li>
      ))}
    </ul>
  );
}

/** Just what a table row needs — small enough to hand to a client component. */
export type SeasonRow = {
  slug: string;
  name: string;
  area: Destination["area"];
  number: number;
  months: MonthRating[];
};

/**
 * Every destination against every month, grouped by region — a dot per
 * month. Hovering a row lifts its discs. Scrolls sideways on narrow phones
 * with the names pinned.
 *
 * `activeSlug` / `onActivate` let a parent follow which row is hovered or
 * focused (the seasons map does); without them it is a plain table.
 */
export function SeasonTable({
  rows,
  activeSlug,
  onActivate,
  className,
}: {
  rows: SeasonRow[];
  /** On the scroll box — e.g. a max height so the table scrolls in place. */
  className?: string;
  activeSlug?: string | null;
  onActivate?: (slug: string | null) => void;
}) {
  const groups = DESTINATION_AREAS.map((area) => ({
    ...area,
    rows: rows.filter((row) => row.area === area.key),
  })).filter((group) => group.rows.length > 0);

  return (
    <div className={cn("-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0", className)}>
      <table
        onMouseLeave={() => onActivate?.(null)}
        className="w-full min-w-[32rem] table-fixed border-separate border-spacing-0 text-sm"
      >
        <caption className="sr-only">
          Best months to visit each destination in Sri Lanka, grouped by region
        </caption>
        <colgroup>
          <col className="w-36 sm:w-48" />
          {MONTHS.map((month) => (
            <col key={month} />
          ))}
        </colgroup>
        <thead>
          <tr>
            <th scope="col" className="sticky top-0 left-0 z-30 bg-white pb-2 text-left">
              <span className="sr-only">Destination</span>
            </th>
            {MONTHS.map((month, i) => (
              <th
                key={month}
                scope="col"
                className="sticky top-0 z-20 bg-white pb-2 text-center text-[10px] font-semibold tracking-wider text-muted uppercase"
              >
                <abbr title={FULL_MONTHS[i]} className="no-underline">
                  <span className="sm:hidden">{month[0]}</span>
                  <span className="hidden sm:inline">{month}</span>
                </abbr>
              </th>
            ))}
          </tr>
        </thead>

        {groups.map((group) => (
          <tbody key={group.key}>
            <tr>
              <th
                scope="colgroup"
                colSpan={13}
                className="sticky left-0 bg-white pt-5 pb-2 pl-3 text-left lg:bg-transparent text-[10px] font-semibold tracking-[0.22em] text-brand uppercase"
              >
                {group.title}
              </th>
            </tr>
            {group.rows.map(({ slug, name, number, months }) => {
              const active = slug === activeSlug;
              return (
                <tr
                  key={slug}
                  onMouseEnter={() => onActivate?.(slug)}
                  className="group/row"
                >
                  <th
                    scope="row"
                    className={cn(
                      // White only while it must cover cells scrolling under it
                      // (narrow screens); clear on desktop so artwork behind
                      // the section shows through.
                      "sticky left-0 z-10 rounded-l-pill py-1.5 pr-3 pl-3 text-left font-normal transition-colors duration-200 ease-out group-hover/row:bg-brand-light lg:group-hover/row:bg-brand-light",
                      active ? "bg-brand-light" : "bg-white lg:bg-transparent",
                    )}
                  >
                    <Link
                      href={`/destinations/${slug}`}
                      onFocus={() => onActivate?.(slug)}
                      onBlur={() => onActivate?.(null)}
                      className={cn(
                        "flex items-center gap-2.5 truncate text-ink transition-colors duration-200 ease-out hover:text-brand group-hover/row:text-brand",
                        active && "text-brand",
                      )}
                    >
                      <span aria-hidden="true" className="w-5 shrink-0 font-display text-xs text-muted italic tabular-nums">
                        {String(number).padStart(2, "0")}
                      </span>
                      <span className="truncate font-medium">{name}</span>
                    </Link>
                  </th>
                  {months.map((rating, i) => (
                    <td
                      key={FULL_MONTHS[i]}
                      className={cn(
                        "py-1.5 text-center transition-colors duration-200 ease-out group-hover/row:bg-brand-light last:rounded-r-pill",
                        active && "bg-brand-light",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "mx-auto block rounded-pill transition-transform duration-200 ease-out group-hover/row:scale-125",
                          active && "scale-125",
                          DOT[rating],
                        )}
                      />
                      <span className="sr-only">
                        {FULL_MONTHS[i]}: {MONTH_RATING_LABEL[rating]}
                      </span>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        ))}
      </table>
    </div>
  );
}
