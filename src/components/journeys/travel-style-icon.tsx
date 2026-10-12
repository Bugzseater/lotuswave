import { Flower2, Landmark, PawPrint, Sprout, Waves, type LucideIcon } from "lucide-react";
import type { TravelStyleKey } from "@/types";

/** Data stores a key, not a component, so records stay serialisable. */
const ICONS: Record<TravelStyleKey, LucideIcon> = {
  agro: Sprout,
  wellness: Flower2,
  culture: Landmark,
  wildlife: PawPrint,
  beach: Waves,
};

export function TravelStyleIcon({
  style,
  className,
}: {
  style: TravelStyleKey;
  className?: string;
}) {
  const Icon = ICONS[style];
  return <Icon aria-hidden="true" className={className} strokeWidth={1.5} />;
}
