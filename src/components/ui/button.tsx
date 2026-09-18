import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

/**
 * - `primary`   — the main CTA on a page ("Plan My Journey", "Design My
 *                 Journey", "Plan This Journey"). Purple fill, white text.
 * - `secondary` — supporting actions ("WhatsApp Us", "Explore Our Journeys").
 *                 Transparent, 1px brand border, brand text.
 * - `onBrand`   — the same secondary action sitting on a purple background:
 *                 white border, white text.
 * - `ghost`     — low-emphasis text action, no border.
 */
type Variant = "primary" | "secondary" | "onBrand" | "ghost";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  secondary:
    "bg-transparent border border-brand text-brand hover:bg-brand-light",
  onBrand:
    "bg-transparent border border-white text-white hover:bg-white hover:text-brand focus-visible:outline-white",
  ghost: "text-brand hover:bg-brand-light",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: Variant;
  size?: Size;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-pill font-medium",
        "transition-colors duration-200",
        "disabled:pointer-events-none disabled:opacity-50",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    />
  );
}
