"use client";

import { useState } from "react";
import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Destination } from "@/types";
import { DESTINATION_CATEGORY } from "./destination-category";
import { IslandMap, pinPosition } from "./island-map";
import { SeasonTable, type SeasonRow } from "./season-chart";

export type SeasonPlace = SeasonRow &
  Pick<Destination, "region" | "tagline" | "image" | "category" | "coordinates"> & {
    /** Pre-formatted best months, e.g. "Feb–Apr, Jun–Aug". */
    best: string;
  };

/**
 * The seasons table with a map that follows it. The map sits in a sticky
 * column on the right, so it stays in view while the table scrolls past.
 * Hovering or focusing a row lights that place on the map — the other pins
 * fall back to dots — and a small card opens beside the pin with its photo,
 * region and best months.
 *
 * Wide screens only for the map; phones get the plain table.
 */
export function SeasonExplorer({ places }: { places: SeasonPlace[] }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const active = places.find((place) => place.slug === activeSlug) ?? null;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-center lg:gap-24">
      {/* About ten rows tall; the rest scroll inside, scrollbar hidden. The
          header row stays pinned, and the foot fades to hint there's more. */}
      <SeasonTable
        rows={places}
        activeSlug={activeSlug}
        onActivate={setActiveSlug}
        className="max-h-[26rem] overflow-y-auto [mask-image:linear-gradient(to_bottom,black_88%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      />

      {/* Fixed size at every width, so nothing shifts while hovering. */}
      <aside aria-hidden="true" className="hidden w-72 justify-self-end lg:block">
        <div>
          <div className="relative">
            <IslandMap
              pins={places}
              activeSlug={activeSlug ?? undefined}
              tone="light"
              label="Map of Sri Lanka"
              className="block"
            />
            {/* Keyed so each new place replays the card's entrance. */}
            {active && <PinCard key={active.slug} place={active} />}
          </div>
          <p className="mt-4 text-center text-[11px] tracking-[0.16em] text-muted uppercase">
            {active ? `No. ${String(active.number).padStart(2, "0")} · ${active.region}` : "Hover a place to find it"}
          </p>
        </div>
      </aside>
    </div>
  );
}

/** The callout beside the lit pin. Opens towards the side with more room. */
function PinCard({ place }: { place: SeasonPlace }) {
  const { left, top } = pinPosition(place.coordinates);
  const opensLeft = left > 45;
  const { label, icon: Icon } = DESTINATION_CATEGORY[place.category];

  return (
    <div
      style={{
        left: `${left}%`,
        // Kept off the very top and bottom so the card never leaves the map.
        top: `${Math.min(Math.max(top, 22), 78)}%`,
      }}
      className={cn(
        "pointer-events-none absolute z-10 w-52 -translate-y-1/2",
        opensLeft ? "-translate-x-[calc(100%+1.25rem)]" : "translate-x-5",
      )}
    >
      <div className="animate-rise-in overflow-hidden rounded-card bg-white shadow-card ring-1 ring-line">
        <div className="relative h-24 bg-brand-light">
          <Image src={place.image.src} alt="" fill sizes="208px" className="object-cover" />
          <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-pill bg-white/90 px-2 py-0.5 text-[10px] font-semibold tracking-[0.14em] text-ink uppercase backdrop-blur-sm">
            <Icon className="size-3 text-brand" />
            {label}
          </span>
        </div>
        <div className="p-4">
          <p className="font-display text-lg leading-tight text-ink">{place.name}</p>
          <p className="mt-1 line-clamp-2 text-xs leading-snug text-muted">{place.tagline}</p>
          {place.best && (
            <p className="mt-3 flex items-center gap-1.5 border-t border-line pt-3 text-xs text-ink">
              <CalendarDays className="size-3.5 shrink-0 text-brand" strokeWidth={1.75} />
              <span>
                <span className="font-semibold">Best:</span> {place.best}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
