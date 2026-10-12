"use client";

import { useId, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Compass, SlidersHorizontal, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import {
  COMFORT_LEVELS,
  GROUP_TYPES,
  JOURNEY_CATEGORIES,
  JOURNEY_DURATIONS,
  TRAVEL_STYLES,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import type {
  ComfortLevel,
  GroupType,
  JourneySummary,
  JourneyCategoryKey,
  TravelStyleKey,
} from "@/types";
import { JourneyCard } from "./journey-card";
import { TravelStyleIcon } from "./travel-style-icon";

type DurationKey = (typeof JOURNEY_DURATIONS)[number]["key"];

type Filters = {
  category: JourneyCategoryKey | null;
  duration: DurationKey | null;
  styles: TravelStyleKey[];
  comfort: ComfortLevel | null;
  group: GroupType | null;
};

const EMPTY: Filters = { category: null, duration: null, styles: [], comfort: null, group: null };

/** A query value, if it is one of the allowed keys. */
function pick<K extends string>(value: string | null, options: readonly { key: K }[]) {
  return options.find((option) => option.key === value)?.key ?? null;
}

function parse(params: URLSearchParams): Filters {
  const styles = (params.get("style") ?? "").split(",");
  return {
    category: pick(params.get("category"), JOURNEY_CATEGORIES),
    duration: pick(params.get("duration"), JOURNEY_DURATIONS),
    styles: TRAVEL_STYLES.filter(({ key }) => styles.includes(key)).map(({ key }) => key),
    comfort: pick(params.get("comfort"), COMFORT_LEVELS),
    group: pick(params.get("group"), GROUP_TYPES),
  };
}

function serialise(filters: Filters) {
  const params = new URLSearchParams();
  if (filters.category) params.set("category", filters.category);
  if (filters.duration) params.set("duration", filters.duration);
  if (filters.styles.length) params.set("style", filters.styles.join(","));
  if (filters.comfort) params.set("comfort", filters.comfort);
  if (filters.group) params.set("group", filters.group);
  return params.toString();
}

/** AND across filter groups; within travel style, any one selected style matches. */
function matches(journey: JourneySummary, filters: Filters) {
  const band = JOURNEY_DURATIONS.find(({ key }) => key === filters.duration);
  return (
    (!filters.category || journey.categories.includes(filters.category)) &&
    (!band || (journey.durationDays >= band.min && journey.durationDays <= band.max)) &&
    (!filters.styles.length || filters.styles.some((style) => journey.travelStyles.includes(style))) &&
    (!filters.comfort || journey.comfort === filters.comfort) &&
    (!filters.group || journey.groupTypes.includes(filters.group))
  );
}

/**
 * The journeys finder. The URL query is the state — `?category=agro&style=wellness`
 * — so a filtered view can be shared or linked to from elsewhere, and the
 * hero's category links simply navigate here. Filter changes go through
 * `history.replaceState`, which Next keeps in step with `useSearchParams`.
 *
 * Reading the query makes this client-rendered, so the page wraps it in
 * Suspense with `JourneyFinderFallback`: the same view, unfiltered, which is
 * what the prerendered HTML and search engines see.
 */
export function JourneyFinder({ journeys }: { journeys: JourneySummary[] }) {
  const params = useSearchParams();
  const filters = parse(new URLSearchParams(params.toString()));

  const onChange = (next: Filters) => {
    const query = serialise(next);
    window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
  };

  return <FinderView journeys={journeys} filters={filters} onChange={onChange} />;
}

export function JourneyFinderFallback({ journeys }: { journeys: JourneySummary[] }) {
  return <FinderView journeys={journeys} filters={EMPTY} onChange={() => {}} />;
}

function FinderView({
  journeys,
  filters,
  onChange,
}: {
  journeys: JourneySummary[];
  filters: Filters;
  onChange: (next: Filters) => void;
}) {
  const [panelOpen, setPanelOpen] = useState(false);
  const panelId = useId();
  const resultsRef = useRef<HTMLDivElement>(null);

  /** Apply a filter change, then bring the top of the cards back into view. */
  const update = (next: Filters) => {
    onChange(next);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    resultsRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  const results = journeys.filter((journey) => matches(journey, filters));
  const category = JOURNEY_CATEGORIES.find(({ key }) => key === filters.category);
  const activeCount =
    (filters.duration ? 1 : 0) +
    filters.styles.length +
    (filters.comfort ? 1 : 0) +
    (filters.group ? 1 : 0);
  const set = (patch: Partial<Filters>) => update({ ...filters, ...patch });
  const toggleStyle = (style: TravelStyleKey) =>
    set({
      styles: filters.styles.includes(style)
        ? filters.styles.filter((s) => s !== style)
        : [...filters.styles, style],
    });

  return (
    <div>
      {/* Categories — a frosted glass strip that sticks just under the fixed
          header while the results scroll. One row of pill tabs; it scrolls
          sideways, scrollbar hidden, where it can't fit. */}
      <fieldset className="sticky top-[5.25rem] z-30 min-w-0 sm:top-24">
        <legend className="sr-only">Journey category</legend>
        <div className="flex gap-2 overflow-x-auto overscroll-x-contain rounded-pill border border-white bg-white/60 p-1.5 shadow-card ring-1 ring-brand/10 backdrop-blur-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Chip
            type="radio"
            name="category"
            checked={!filters.category}
            onChange={() => set({ category: null })}
            className="shrink-0"
          >
            All journeys
          </Chip>
          {JOURNEY_CATEGORIES.map(({ key, title }) => (
            <Chip
              key={key}
              type="radio"
              name="category"
              checked={filters.category === key}
              onChange={() => set({ category: key })}
              className="shrink-0"
            >
              {title}
            </Chip>
          ))}
        </div>
      </fieldset>

      {/* Phones only — opens the filter panel directly beneath. */}
      <button
        type="button"
        aria-expanded={panelOpen}
        aria-controls={panelId}
        onClick={() => setPanelOpen((open) => !open)}
        className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-pill border border-brand px-5 text-sm font-medium text-brand transition-colors duration-200 ease-out hover:bg-brand hover:text-white lg:hidden"
      >
        <SlidersHorizontal aria-hidden="true" className="size-4" />
        {panelOpen ? "Hide filters" : "Filters"}
        {activeCount > 0 && ` (${activeCount})`}
      </button>

      <div className="mt-6 grid gap-10 lg:mt-10 lg:grid-cols-[17rem_1fr] lg:gap-12">
        {/* Filters — a frosted glass panel: a sidebar on wide screens, a
            fold-out on phones. Two soft brand glows sit behind the glass so
            the blur has something to catch. */}
        <div
          id={panelId}
          className={cn(
            "relative isolate space-y-5 overflow-hidden rounded-card border border-white bg-white/55 p-5 shadow-card ring-1 ring-brand/10 backdrop-blur-xl lg:sticky lg:top-[10.5rem] lg:block lg:max-h-[calc(100svh-11.5rem)] lg:self-start lg:overflow-y-auto lg:overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            !panelOpen && "hidden",
          )}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 -right-16 -z-10 size-56 rounded-pill bg-brand/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-20 -z-10 size-64 rounded-pill bg-brand-light blur-3xl"
          />
          <FilterGroup legend="Duration">
            <Chip type="radio" name="duration" checked={!filters.duration} onChange={() => set({ duration: null })}>
              Any length
            </Chip>
            {JOURNEY_DURATIONS.map(({ key, label }) => (
              <Chip
                key={key}
                type="radio"
                name="duration"
                checked={filters.duration === key}
                onChange={() => set({ duration: key })}
              >
                {label}
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup legend="Travel style">
            {TRAVEL_STYLES.map(({ key, label }) => (
              <Chip
                key={key}
                type="checkbox"
                name="style"
                checked={filters.styles.includes(key)}
                onChange={() => toggleStyle(key)}
              >
                <TravelStyleIcon style={key} className="size-4" />
                {label}
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup legend="Comfort level">
            <Chip type="radio" name="comfort" checked={!filters.comfort} onChange={() => set({ comfort: null })}>
              Any
            </Chip>
            {COMFORT_LEVELS.map(({ key, label }) => (
              <Chip
                key={key}
                type="radio"
                name="comfort"
                checked={filters.comfort === key}
                onChange={() => set({ comfort: key })}
              >
                {label}
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup legend="Travelling as">
            <Chip type="radio" name="group" checked={!filters.group} onChange={() => set({ group: null })}>
              Anyone
            </Chip>
            {GROUP_TYPES.map(({ key, label }) => (
              <Chip
                key={key}
                type="radio"
                name="group"
                checked={filters.group === key}
                onChange={() => set({ group: key })}
              >
                {label}
              </Chip>
            ))}
          </FilterGroup>

          {activeCount > 0 && (
            <button
              type="button"
              onClick={() => update({ ...EMPTY, category: filters.category })}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand underline-offset-4 hover:text-brand-dark hover:underline"
            >
              <X aria-hidden="true" className="size-4" />
              Clear filters
            </button>
          )}
        </div>

        {/* Results. The scroll margin clears the fixed header and the sticky
            category strip when a filter change scrolls back here. */}
        <div ref={resultsRef} className="scroll-mt-40 sm:scroll-mt-44">
          <h2 id="finder-heading" className="font-display text-3xl leading-tight text-balance text-ink sm:text-4xl">
            {category?.title ?? "All Sri Lanka journeys"}
          </h2>
          {category && (
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-pretty text-muted">{category.intro}</p>
          )}

          <p aria-live="polite" className="mt-6 text-sm text-muted">
            {results.length === journeys.length
              ? `${journeys.length} journeys`
              : `Showing ${results.length} of ${journeys.length} journeys`}
          </p>

          {results.length > 0 ? (
            <ul className="mt-5 grid gap-6 sm:grid-cols-2 lg:gap-8 xl:grid-cols-3">
              {results.map((journey) => (
                <li key={journey.slug}>
                  <JourneyCard {...journey} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-5 flex flex-col items-center rounded-card bg-section px-6 py-14 text-center">
              <span className="grid size-14 place-items-center rounded-pill bg-white text-brand">
                <Compass aria-hidden="true" className="size-7" strokeWidth={1.5} />
              </span>
              <h3 className="mt-5 font-display text-2xl text-ink">No journey matches all of that — yet</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                Loosen a filter, or tell us what you have in mind and we&rsquo;ll
                design a journey around it.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => update(EMPTY)}
                  className="inline-flex h-11 items-center justify-center rounded-pill border border-brand px-6 text-sm font-medium text-brand transition-colors duration-200 ease-out hover:bg-brand hover:text-white"
                >
                  Show all journeys
                </button>
                <ButtonLink href="/plan-your-trip">Design My Journey</ButtonLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="text-[11px] font-semibold tracking-[0.14em] text-ink uppercase">{legend}</legend>
      {/* Compact pills inside the panel so it fits the viewport height. */}
      <div className="mt-2 flex flex-wrap gap-1.5 [&_label]:px-3 [&_label]:py-1.5 [&_label]:text-xs [&_svg]:size-3.5">
        {children}
      </div>
    </fieldset>
  );
}

/** A radio or checkbox drawn as a pill — the same treatment as the contact form topics. */
function Chip({
  type,
  name,
  checked,
  onChange,
  className,
  children,
}: {
  type: "radio" | "checkbox";
  name: string;
  checked: boolean;
  onChange: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label
      className={cn(
        "inline-flex cursor-pointer items-center gap-1.5 rounded-pill border border-brand/40 bg-white/60 px-4 py-2 text-sm whitespace-nowrap text-ink transition-colors duration-200 ease-out select-none hover:border-brand/70 has-checked:border-brand has-checked:bg-brand has-checked:text-white has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand",
        className,
      )}
    >
      <input type={type} name={name} checked={checked} onChange={onChange} className="sr-only" />
      {children}
    </label>
  );
}
