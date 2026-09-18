import Image from "next/image";

import { cn } from "@/lib/utils";

/** Generated from `public/logo/logo.jpg` by `scripts/build-logo-assets.mjs`. */
const MARK = {
  light: "/logo/mark-light.png",
  brand: "/logo/mark-brand.png",
} as const;

type Tone = keyof typeof MARK;

interface LogoProps {
  /**
   * `light` for purple and photographic backgrounds, `brand` for white ones.
   * `both` renders the pair stacked and cross-fades between them — for the
   * header, whose background changes under the visitor without a remount.
   */
  tone: Tone | "both";
  /** Which of the two a `both` logo is currently showing. Ignored otherwise. */
  onDark?: boolean;
  priority?: boolean;
  className?: string;
}

/**
 * The brand lockup: mark beside a two-line wordmark.
 *
 * The supplied artwork stacks the mark over the wordmark in a square, which is
 * unreadable in a 72px header — so the lockup is rebuilt horizontally here and
 * the wordmark is set in the display face as real text. That keeps it legible
 * at any size, selectable, and readable by search engines, which a flattened
 * image of the words would not be. Colour comes from the parent, so the caller
 * decides white or brand.
 */
export function Logo({ tone, onDark = false, priority, className }: LogoProps) {
  const variants: Tone[] = tone === "both" ? ["brand", "light"] : [tone];
  const visible: Tone = onDark ? "light" : "brand";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative block h-9 w-7 shrink-0">
        {variants.map((variant) => (
          <Image
            key={variant}
            // Decorative: the wordmark beside it already names the company.
            alt=""
            src={MARK[variant]}
            fill
            sizes="28px"
            // Only the variant on screen is worth preloading.
            priority={priority && variant === visible}
            className={cn(
              "object-contain",
              tone === "both" && "transition-opacity duration-300 ease-out",
              tone === "both" &&
                (variant === visible ? "opacity-100" : "opacity-0"),
            )}
          />
        ))}
      </span>

      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.05rem] font-semibold tracking-[0.06em] uppercase">
          LotusWave
        </span>
        <span className="mt-1 text-[0.55rem] font-medium tracking-[0.3em] uppercase opacity-80">
          Lanka Tours
        </span>
      </span>
    </span>
  );
}
