import { ChevronDown, Flower2, Landmark, Mountain, Sprout } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import type { HeroPathway, HeroPathwayIcon } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Categorisation drives iconography only — never colour. */
const PATHWAY_ICON: Record<HeroPathwayIcon, LucideIcon> = {
  agriculture: Sprout,
  wellness: Flower2,
  nature: Mountain,
  culture: Landmark,
};

function PathwayCard({
  pathway,
  style,
}: {
  pathway: HeroPathway;
  style?: CSSProperties;
}) {
  const Icon = PATHWAY_ICON[pathway.icon];

  return (
    <Link
      href={pathway.href}
      style={style}
      className={cn(
        "group relative block overflow-hidden rounded-[0.875rem] border border-white/20",
        "transition duration-200 ease-out hover:-translate-y-1 hover:border-white/50",
        "focus-visible:outline-white motion-safe:animate-rise",
      )}
    >
      <span className="relative block aspect-[5/3]">
        <Image
          src={pathway.image.url}
          alt={pathway.image.alt}
          fill
          sizes="(min-width: 640px) 220px, 45vw"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        />
      </span>

      {/* Enough to hold the label, not enough to flatten the photograph. */}
      <span
        aria-hidden
        className="from-ink/85 via-ink/25 absolute inset-0 bg-linear-to-t to-transparent to-70%"
      />

      <span className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-3 text-white">
        <Icon className="size-4 shrink-0" aria-hidden />
        <span className="text-sm font-medium">{pathway.label}</span>
      </span>
    </Link>
  );
}

interface HeroPathwaysProps {
  pathways: readonly HeroPathway[];
  scrollHint: { href: string; label: string };
  className?: string;
}

/**
 * The four ways into the site, as small image cards along the bottom of the
 * hero: two-up on a phone, a single row from tablet width. Photography carries
 * them, so each card needs only an icon and one word.
 */
export function HeroPathways({
  pathways,
  scrollHint,
  className,
}: HeroPathwaysProps) {
  return (
    <div className={cn("flex flex-col items-start gap-5", className)}>
      <Link
        href={scrollHint.href}
        className="hidden size-10 shrink-0 items-center justify-center rounded-pill border border-white/25 text-white transition-colors duration-200 ease-out hover:border-white/50 hover:bg-white/15 focus-visible:outline-white lg:flex"
      >
        <span className="sr-only">{scrollHint.label}</span>
        <ChevronDown className="size-5 motion-safe:animate-nudge" aria-hidden />
      </Link>

      <div className="grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {pathways.map((pathway, index) => (
          <PathwayCard
            key={pathway.href}
            pathway={pathway}
            style={{ animationDelay: `${400 + index * 80}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
