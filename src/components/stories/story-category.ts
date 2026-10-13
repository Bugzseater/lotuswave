import {
  Compass,
  Feather,
  Flower2,
  HeartHandshake,
  MapPin,
  Sprout,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { STORY_CATEGORIES } from "@/lib/constants";
import type { StoryCategoryKey } from "@/types";

/** One icon per category. Icons tell categories apart — never colour. */
export const STORY_CATEGORY_ICON: Record<StoryCategoryKey, LucideIcon> = {
  agro: Sprout,
  wellness: Flower2,
  guides: Compass,
  food: UtensilsCrossed,
  responsible: HeartHandshake,
  destinations: MapPin,
  founder: Feather,
};

export function storyCategory(key: StoryCategoryKey) {
  // Every key is in the list — the type guarantees it.
  return STORY_CATEGORIES.find((category) => category.key === key)!;
}

/** The stories page with that category's filter already chosen. */
export const storyCategoryHref = (slug: string) => `/travel-stories?category=${slug}#stories`;
