import { cn } from "@/lib/utils";

/**
 * Accent-green wave edging a section, drawn inline so it takes the token
 * colour directly. Two layers: a translucent swell behind for depth, the solid
 * band in front. `position="bottom"` flips the same shape to close a section.
 *
 * Expects a positioned parent with `overflow-hidden`.
 */
export function GreenWave({
  position = "top",
  className,
}: {
  position?: "top" | "bottom";
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={cn(
        "pointer-events-none absolute inset-x-0 h-12 w-full fill-accent-green sm:h-16 lg:h-24",
        position === "top" ? "top-0" : "bottom-0 rotate-180",
        className,
      )}
    >
      <path
        opacity="0.35"
        d="M0 0h1440v78c-120 26-260 38-420 18S740 30 560 44 240 118 0 92Z"
      />
      <path d="M0 0h1440v46c-150 34-300 44-470 22S690 12 520 28 210 92 0 66Z" />
    </svg>
  );
}
