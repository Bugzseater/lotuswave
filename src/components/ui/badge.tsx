import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

/**
 * - `brand` — the default: tinted purple chip with brand text.
 * - `agro`  — the one place the old earthy green survives. Use it to mark
 *             agro-related content; it carries meaning, not decoration.
 * - `onBrand` — sitting on a purple background.
 */
type Variant = "brand" | "agro" | "onBrand";

const VARIANTS: Record<Variant, string> = {
  brand: "bg-brand-light text-brand",
  agro: "bg-brand-light text-accent-green",
  onBrand: "bg-white/15 text-white",
};

export interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
  variant?: Variant;
}

export function Badge({ variant = "brand", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill px-3 py-1",
        "text-xs font-medium tracking-wide uppercase",
        VARIANTS[variant],
        className,
      )}
      {...props}
    />
  );
}
