import {
  Building2,
  CalendarDays,
  Car,
  Clock,
  Hourglass,
  Landmark,
  Leaf,
  Map as MapIcon,
  Mountain,
  PawPrint,
  Thermometer,
  Trees,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { DESTINATION_AREAS } from "@/lib/constants";
import type { Destination, DestinationFactIcon, MonthRating } from "@/types";

/** Icon for each kind of card fact. */
export const FACT_ICON: Record<DestinationFactIcon, LucideIcon> = {
  altitude: Mountain,
  time: Clock,
  history: Hourglass,
  area: MapIcon,
  wildlife: PawPrint,
  heritage: Landmark,
  season: CalendarDays,
  distance: Car,
  temperature: Thermometer,
  nature: Trees,
};

/** Chip label and icon for each destination category. */
export const DESTINATION_CATEGORY: Record<
  Destination["category"],
  { label: string; icon: LucideIcon }
> = {
  heritage: { label: "Heritage", icon: Landmark },
  hills: { label: "Hill Country", icon: Mountain },
  tea: { label: "Tea Country", icon: Leaf },
  wildlife: { label: "Wildlife", icon: PawPrint },
  coast: { label: "Coast", icon: Waves },
  city: { label: "City & Coast", icon: Building2 },
  rainforest: { label: "Rainforest", icon: Trees },
};

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

export const MONTH_RATING_LABEL: Record<MonthRating, string> = {
  best: "Best",
  good: "Good",
  off: "Off-season",
};

/**
 * Destinations grouped by area in page order, each with its plate number.
 * The index, the map pins and the guide pages all number from this, so
 * "No. 07" means the same place everywhere.
 */
export function atlasOrder(destinations: Destination[]) {
  return DESTINATION_AREAS.flatMap(({ key }) =>
    destinations.filter((destination) => destination.area === key),
  ).map((destination, i) => ({ destination, number: i + 1 }));
}

/** "6.95° N, 80.79° E" — the field-guide caption under each name. */
export function formatCoordinates({ lat, lng }: Destination["coordinates"]) {
  return `${lat.toFixed(2)}° N, ${lng.toFixed(2)}° E`;
}

/** The months rated best, as a readable range list, e.g. "Feb–Apr, Jun–Aug". */
export function bestMonths(months: MonthRating[]) {
  const ranges: string[] = [];
  let start = -1;
  for (let i = 0; i <= months.length; i++) {
    const best = months[i] === "best";
    if (best && start === -1) start = i;
    if (!best && start !== -1) {
      ranges.push(start === i - 1 ? MONTHS[start] : `${MONTHS[start]}–${MONTHS[i - 1]}`);
      start = -1;
    }
  }
  return ranges.join(", ");
}
