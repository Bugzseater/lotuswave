import Image from "next/image";
import {
  Backpack,
  CalendarDays,
  Check,
  ChevronDown,
  Clock,
  HeartHandshake,
  ListOrdered,
  MapPin,
  ShieldCheck,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";
import { IslandMap } from "@/components/destinations/island-map";
import { ButtonLink } from "@/components/ui/button";
import type { Experience } from "@/types";
import { cn } from "@/lib/utils";
import { ExperienceIcon } from "./experience-icon";

/**
 * One experience, complete, on its category page — there is no page of its
 * own, so everything lives here. Told as a chapter of a travel journal:
 * photo with a taped polaroid, and beneath it a small island map pinning
 * the place beside the quick facts. Opposite, the story, then the details
 * folded into disclosures so the chapter stays short until opened.
 * Chapters alternate sides; the photo column sticks on wide screens.
 */
export function ExperienceChapter({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  const {
    slug,
    title,
    category,
    type,
    promise,
    overview,
    activities,
    included,
    whatToBring,
    safety,
    impact,
    image,
    gallery,
    location,
    coordinates,
  } = experience;
  const flipped = index % 2 === 1;
  const polaroid = gallery.find((photo) => photo.src !== image.src);
  const place = location.split(",")[0];

  const facts: { icon: LucideIcon; label: string; value: string }[] = [
    { icon: Clock, label: "Duration", value: experience.duration },
    { icon: MapPin, label: "Where", value: location },
    { icon: CalendarDays, label: "Best time", value: experience.bestSeason },
    { icon: UserRound, label: "Suits", value: experience.suitableFor },
    { icon: Users, label: "Group", value: experience.groupSize },
  ];

  return (
    <article
      id={slug}
      aria-labelledby={`${slug}-title`}
      className="grid scroll-mt-28 items-start gap-10 lg:grid-cols-[5fr_6fr] lg:gap-16"
    >
      {/* Photo, polaroid, map and facts. */}
      <div className={cn("lg:sticky lg:top-28", flipped && "lg:order-2")}>
        <div className="relative pr-6 pb-8 sm:pr-10">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-brand-light shadow-card">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
            <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-pill bg-white/90 px-3 py-1.5 text-xs font-medium text-ink backdrop-blur-sm">
              <ExperienceIcon icon={category} className="size-3.5 text-brand" />
              {type}
            </span>
          </div>

          {polaroid && (
            <figure className="absolute right-0 bottom-0 w-28 rotate-6 rounded-md bg-white p-1.5 pb-2 shadow-card sm:w-36">
              <span
                aria-hidden="true"
                className="absolute -top-2.5 left-1/2 h-5 w-12 -translate-x-1/2 -rotate-3 rounded-sm bg-accent-sand/80"
              />
              <span className="relative block aspect-square overflow-hidden rounded-sm bg-brand-light">
                <Image src={polaroid.src} alt={polaroid.alt} fill sizes="9rem" className="object-cover" />
              </span>
              <figcaption className="mt-1.5 text-center font-display text-xs text-ink italic sm:text-sm">
                {place}
              </figcaption>
            </figure>
          )}
        </div>

        <div className="mt-4 grid grid-cols-[5.5rem_1fr] items-center gap-5 rounded-card bg-section p-5 sm:grid-cols-[7rem_1fr] sm:gap-6">
          <figure>
            <IslandMap
              pins={[{ slug, name: place, coordinates, number: index + 1 }]}
              activeSlug={slug}
              tone="light"
              minimal
              label={`Map of Sri Lanka pinning ${location}`}
            />
            <figcaption className="mt-2 text-center text-[10px] font-semibold tracking-[0.14em] text-brand uppercase">
              {place}
            </figcaption>
          </figure>

          <dl className="space-y-2.5">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex gap-2.5">
                <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={1.75} />
                <div className="text-sm leading-snug">
                  <dt className="sr-only">{label}</dt>
                  <dd className="text-ink">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Story and details. */}
      <div className={cn("relative isolate", flipped && "lg:order-1")}>
        <p
          aria-hidden="true"
          className="pointer-events-none absolute -top-12 -left-2 -z-10 font-display text-[7rem] leading-none font-semibold text-brand/[0.07] select-none sm:text-[9rem]"
        >
          {String(index + 1).padStart(2, "0")}
        </p>

        <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">
          Chapter {String(index + 1).padStart(2, "0")}
        </p>
        <h3
          id={`${slug}-title`}
          className="mt-3 font-display text-3xl leading-[1.1] text-balance text-ink sm:text-4xl"
        >
          {title}
        </h3>
        <p className="mt-3 font-display text-xl leading-snug text-pretty text-ink/80 italic">
          {promise}
        </p>

        <div className="mt-5 space-y-3">
          {overview.map((paragraph) => (
            <p key={paragraph} className="text-base leading-relaxed text-pretty text-muted">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8 divide-y divide-line border-y border-line">
          <Fold icon={ListOrdered} heading="How the day unfolds" open>
            <ol className="relative space-y-3 before:absolute before:top-2 before:bottom-2 before:left-[0.8rem] before:border-l before:border-dashed before:border-brand/40">
              {activities.map((step, i) => (
                <li key={step} className="relative flex gap-3">
                  <span
                    aria-hidden="true"
                    className="grid size-6.5 shrink-0 place-items-center rounded-pill border border-brand bg-white font-display text-xs font-semibold text-brand"
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-ink sm:text-base">{step}</span>
                </li>
              ))}
            </ol>
          </Fold>
          <Fold icon={Check} heading="What's included">
            <TickList items={included} />
          </Fold>
          <Fold icon={Backpack} heading="What to bring">
            <DotList items={whatToBring} />
          </Fold>
          <Fold icon={ShieldCheck} heading="Safety & accessibility">
            <DotList items={safety} />
          </Fold>
          <Fold icon={HeartHandshake} heading="How your visit gives back">
            <TickList items={impact} />
          </Fold>
        </div>

        <ButtonLink
          href={`/plan-your-trip?experience=${slug}`}
          size="lg"
          className="mt-8 w-full sm:w-auto"
        >
          Plan This Experience
        </ButtonLink>
      </div>
    </article>
  );
}

/** A native disclosure — no client JavaScript, keyboard-accessible. */
function Fold({
  icon: Icon,
  heading,
  open = false,
  children,
}: {
  icon: LucideIcon;
  heading: string;
  open?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details open={open} className="group">
      <summary className="flex cursor-pointer list-none items-center gap-3 py-4 text-base font-medium text-ink transition-colors duration-200 ease-out hover:text-brand [&::-webkit-details-marker]:hidden">
        <Icon aria-hidden="true" className="size-5 shrink-0 text-brand" strokeWidth={1.5} />
        <span className="flex-1">{heading}</span>
        <ChevronDown
          aria-hidden="true"
          className="size-4 shrink-0 text-muted transition-transform duration-200 ease-out group-open:rotate-180"
        />
      </summary>
      <div className="pb-5 pl-8">{children}</div>
    </details>
  );
}

function TickList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-ink sm:text-base">
          <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function DotList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-ink sm:text-base">
          <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-pill bg-brand" />
          {item}
        </li>
      ))}
    </ul>
  );
}
