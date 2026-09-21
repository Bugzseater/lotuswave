import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

type LogoProps = {
  /** `light` sits on purple or over a dark image; `brand` on white. */
  tone?: "light" | "brand";
  /** `sm` fits a header pill; `lg` carries the corner panel. */
  size?: "sm" | "lg";
  className?: string;
};

/** Horizontal lockup: the lotus-and-wave mark beside the stacked wordmark. */
export function Logo({ tone = "brand", size = "sm", className }: LogoProps) {
  const light = tone === "light";
  const large = size === "lg";

  return (
    <Link
      href="/"
      aria-label={`${SITE.name} — home`}
      className={cn(
        "group inline-flex shrink-0 items-center",
        large ? "gap-3 sm:gap-4" : "gap-2.5",
        className,
      )}
    >
      <Image
        src={light ? "/logo/mark-light.png" : "/logo/mark-brand.png"}
        alt=""
        width={236}
        height={308}
        className={cn(
          "w-auto transition-opacity duration-200 ease-out group-hover:opacity-80",
          large ? "h-9 sm:h-12" : "h-7 sm:h-8",
        )}
        loading="eager"
        fetchPriority="high"
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display leading-none font-semibold tracking-[0.06em] whitespace-nowrap uppercase",
            large ? "text-lg sm:text-2xl" : "text-[15px] sm:text-base",
            light ? "text-white" : "text-brand",
          )}
        >
          LotusWave
        </span>
        <span
          className={cn(
            "leading-none font-medium whitespace-nowrap uppercase",
            large
              ? "mt-1.5 text-[10px] tracking-[0.34em] sm:text-xs"
              : "mt-[3px] text-[8px] tracking-[0.26em]",
            light ? "text-white/75" : "text-muted",
          )}
        >
          Lanka Tours
        </span>
      </span>
    </Link>
  );
}
