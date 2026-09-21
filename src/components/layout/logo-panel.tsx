import { Logo } from "@/components/layout/logo";
import { cn } from "@/lib/utils";

const SHAPE_ID = "logo-panel-shape";

/**
 * Brand panel anchored flush into the top-left corner of the page, its right
 * edge sweeping down and away so the hero photograph reads through beside it.
 *
 * Brand purple, so the panel and the logo inside it are the same colour and
 * the header reads as one brand mark rather than two.
 *
 * The edge is one long curve from the top-right corner to a flat base, which
 * no combination of `rounded-*` produces. It is an SVG `clipPath` rather than
 * a filled path so the panel can carry `backdrop-blur` — the photograph stays
 * visible underneath, softened, the way the nav pill treats it.
 * `clipPathUnits="objectBoundingBox"` keeps the curve in step as the panel
 * resizes across breakpoints.
 */
export function LogoPanel({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative h-[76px] w-[228px] sm:h-[92px] sm:w-[310px] lg:h-[104px] lg:w-[360px]",
        className,
      )}
    >
      <svg aria-hidden="true" className="absolute h-0 w-0">
        <defs>
          <clipPath id={SHAPE_ID} clipPathUnits="objectBoundingBox">
            <path d="M0,0 L1,0 C0.794,0.154 0.644,1 0.328,1 L0,1 Z" />
          </clipPath>
        </defs>
      </svg>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-brand/80 backdrop-blur-xl backdrop-saturate-150"
        style={{ clipPath: `url(#${SHAPE_ID})` }}
      />

      <Logo
        tone="light"
        size="lg"
        className="absolute top-1/2 left-4 -translate-y-[58%] sm:left-7 lg:left-9"
      />
    </div>
  );
}
