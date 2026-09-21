import Image from "next/image";
import { cn } from "@/lib/utils";

const WAVE = {
  src: "/bg/wave.png",
  width: 2172,
  height: 724,
} as const;

/**
 * Lotus-and-wave artwork closing a full-bleed media section — the mark's own
 * motif, running thin along the left where the hero copy sits and swelling to
 * the right where the frame is empty.
 *
 * The bottom edge of the file is fully opaque and all but white, so it seams
 * straight into the page and needs no fade behind it. Its top third is
 * transparent; anchoring to the bottom means the strip height simply clips
 * that away. `min-w` keeps the swell from flattening to a stripe on narrow
 * screens — it overflows sideways instead, which this element clips.
 *
 * Expects a positioned parent.
 */
export function WaveDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[24vh] min-h-[150px] overflow-hidden sm:h-[32vh] lg:h-[40vh]",
        className,
      )}
    >
      <Image
        {...WAVE}
        alt=""
        sizes="(max-width: 760px) 760px, 100vw"
        loading="eager"
        className="absolute bottom-0 left-1/2 w-full min-w-[760px] max-w-none -translate-x-1/2"
      />
    </div>
  );
}
