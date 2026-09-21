import {
  Flower2,
  Landmark,
  Sprout,
  Trees,
  UtensilsCrossed,
  Waves,
  type LucideIcon,
} from "lucide-react";
import type { ExperienceIcon as ExperienceIconKey } from "@/types";

/** Data stores a key, not a component, so records stay serialisable. */
const ICONS: Record<ExperienceIconKey, LucideIcon> = {
  agro: Sprout,
  wellness: Flower2,
  culture: Landmark,
  nature: Trees,
  food: UtensilsCrossed,
  beach: Waves,
};

export function ExperienceIcon({
  icon,
  className,
}: {
  icon: ExperienceIconKey;
  className?: string;
}) {
  const Icon = ICONS[icon];
  return <Icon aria-hidden="true" className={className} strokeWidth={1.5} />;
}
