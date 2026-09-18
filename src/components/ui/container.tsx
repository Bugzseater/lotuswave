import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/utils";

export function Container({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  );
}

interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  as?: ElementType;
}

/**
 * Vertical rhythm. Generous whitespace is the default on this site, so section
 * padding lives here rather than in each page.
 *
 * Background is the caller's choice: nothing (white), `bg-section` for the
 * tinted purple, `bg-brand text-white` for a full-bleed purple section, or
 * `bg-accent-sand` for the occasional warm alternate.
 */
export function Section({
  as: Tag = "section",
  className,
  ...props
}: SectionProps) {
  return (
    <Tag className={cn("py-16 sm:py-24 lg:py-32", className)} {...props} />
  );
}
