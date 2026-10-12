"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { ExperienceIcon } from "@/components/experiences/experience-icon";
import { cn } from "@/lib/utils";
import type { ExperienceCategoryKey, ImageAsset } from "@/types";

export type CarouselExperience = {
  slug: string;
  title: string;
  type: string;
  category: ExperienceCategoryKey;
  location: string;
  image: ImageAsset;
  href: string;
};

const AUTOPLAY_MS = 3000;

/**
 * Centre-focus carousel for a journey's experiences: three cards in view,
 * the middle one full size, its neighbours smaller and softer. It loops,
 * advances on its own and can be driven by the arrows, the dots or a click
 * on a side card's arrow button. Autoplay pauses while the pointer or
 * keyboard focus is inside, and is off for reduced-motion visitors.
 *
 * Every card is in the server HTML; cards out of view are `inert`.
 * Two or fewer experiences skip the carousel and sit side by side.
 */
export function ExperienceCarousel({ experiences }: { experiences: CarouselExperience[] }) {
  const count = experiences.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((step: number) => setActive((i) => (i + step + count) % count), [count]);

  useEffect(() => {
    if (count < 3 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => go(1), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [count, paused, go]);

  if (count < 3) {
    return (
      <ul className="grid gap-5 sm:grid-cols-2">
        {experiences.map((experience) => (
          <li key={experience.slug}>
            <Card experience={experience} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Experiences included"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
    >
      <ul className="relative h-[24rem] overflow-hidden sm:h-[25rem]">
        {experiences.map((experience, i) => {
          // Position relative to the active card, wrapped to -n/2…n/2.
          let offset = (i - active + count) % count;
          if (offset > count / 2) offset -= count;
          const inView = Math.abs(offset) <= 1;

          return (
            <li
              key={experience.slug}
              inert={!inView}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              style={{
                transform: `translateX(calc(-50% + ${offset * 104}%)) scale(${offset === 0 ? 1 : 0.86})`,
                zIndex: offset === 0 ? 2 : inView ? 1 : 0,
              }}
              className={cn(
                "absolute top-0 left-1/2 h-full w-[78%] transition-[transform,opacity] duration-500 ease-out sm:w-[40%] lg:w-[34%]",
                offset === 0 ? "opacity-100" : inView ? "opacity-60" : "opacity-0",
              )}
            >
              <Card experience={experience} featured={offset === 0} />
            </li>
          );
        })}
      </ul>

      {/* Controls: previous, dots, next. */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <ArrowButton label="Previous experience" onClick={() => go(-1)}>
          <ChevronLeft aria-hidden="true" className="size-5" />
        </ArrowButton>
        <div className="flex items-center gap-1.5">
          {experiences.map((experience, i) => (
            <button
              key={experience.slug}
              type="button"
              aria-label={`Show ${experience.title}`}
              aria-current={i === active ? "true" : undefined}
              onClick={() => setActive(i)}
              className={cn(
                "h-2 rounded-pill transition-[width,background-color] duration-300 ease-out",
                i === active ? "w-6 bg-brand" : "w-2 bg-brand/25 hover:bg-brand/50",
              )}
            />
          ))}
        </div>
        <ArrowButton label="Next experience" onClick={() => go(1)}>
          <ChevronRight aria-hidden="true" className="size-5" />
        </ArrowButton>
      </div>
    </div>
  );
}

function ArrowButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-11 place-items-center rounded-pill border border-brand text-brand transition-colors duration-200 ease-out hover:bg-brand hover:text-white"
    >
      {children}
    </button>
  );
}

/**
 * Full-photo card, in the same family as the journey cards: the picture
 * fills it, a black fade rises from the foot, a glass chip names the kind
 * of experience, and the title and place sit at the bottom beside a glass
 * arrow. The centre card adds an "Included" tag and a call to view it.
 */
function Card({ experience, featured = false }: { experience: CarouselExperience; featured?: boolean }) {
  const { title, type, category, location, image, href } = experience;
  return (
    <article
      className={cn(
        "group relative isolate flex h-full flex-col justify-end overflow-hidden rounded-card bg-ink transition-shadow duration-300 ease-out has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-brand",
        featured && "shadow-card",
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 1024px) 34vw, (min-width: 640px) 40vw, 78vw"
        className="-z-20 object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/30 via-55% to-transparent"
      />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-20 bg-gradient-to-b from-ink/35 to-transparent" />

      <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-pill border border-white/25 bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
          <ExperienceIcon icon={category} className="size-3.5" />
          {type}
        </span>
        {featured && (
          <span className="rounded-pill bg-white px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-brand uppercase">
            Included
          </span>
        )}
      </div>

      <div className="flex items-end gap-3 p-5">
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-xs text-white/80">
            <MapPin aria-hidden="true" className="size-3.5 shrink-0" strokeWidth={1.75} />
            <span className="line-clamp-1">{location}</span>
          </p>
          <h3 className="mt-1.5 font-display text-xl leading-snug font-semibold text-balance text-white">
            <Link href={href} className="outline-none after:absolute after:inset-0 after:content-['']">
              {title}
            </Link>
          </h3>
          <span
            aria-hidden="true"
            className={cn(
              "mt-3 block h-0.5 rounded-pill bg-white/80 transition-[width] duration-300 ease-out",
              featured ? "w-10" : "w-6",
            )}
          />
          {featured && <p className="mt-3 text-xs font-medium text-white/85">View experience</p>}
        </div>
        <span
          aria-hidden="true"
          className="grid size-11 shrink-0 place-items-center rounded-pill border border-white/30 bg-white/15 text-white backdrop-blur-md transition-colors duration-200 ease-out group-hover:bg-white group-hover:text-brand"
        >
          <ArrowUpRight className="size-5 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </article>
  );
}
