import Image from "next/image";
import { ArrowRight, Landmark, Leaf, MapPin, Mountain, PawPrint, Waves, type LucideIcon } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getDestinations } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { Destination } from "@/types";

const CATEGORY: Record<Destination["category"], { label: string; icon: LucideIcon }> = {
  heritage: { label: "Heritage", icon: Landmark },
  hills: { label: "Hill Country", icon: Mountain },
  tea: { label: "Tea Country", icon: Leaf },
  wildlife: { label: "Wildlife", icon: PawPrint },
  coast: { label: "Coast", icon: Waves },
};

/**
 * Tile spans by position. Phones: a full-width lead, then pairs, closing on a
 * full-width tile. From lg, a four-column mosaic —
 *
 *   A A B C
 *   A A D C
 *   E E F F
 */
const SPANS = [
  "col-span-2 row-span-2",
  "",
  "lg:row-span-2",
  "",
  "lg:col-span-2",
  "col-span-2",
];

/**
 * Section after Featured Journeys: the places themselves. A split header
 * (heading left, intro and CTA right) over a photo mosaic of six destinations,
 * each tile numbered like a field-guide plate.
 */
export async function DestinationsMosaic() {
  const destinations = (await getDestinations()).slice(0, SPANS.length);

  return (
    <Section
      id="destinations"
      aria-labelledby="destinations-heading"
      className="pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24"
    >
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-brand uppercase">
              <span aria-hidden="true" className="h-px w-10 bg-brand" />
              Destinations
            </p>
            <h2
              id="destinations-heading"
              className="mt-5 font-display text-4xl leading-[1.08] text-balance text-ink sm:text-5xl lg:text-6xl"
            >
              Explore Sri Lanka&rsquo;s{" "}
              <em className="font-medium text-brand">Most Loved</em> Places.
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pb-2">
            <p className="text-base leading-relaxed text-pretty text-muted sm:text-lg">
              Ancient rock fortresses, misty tea hills, leopard country and
              palm-fringed bays — an island small enough to cross in a day, and
              varied enough to fill a lifetime.
            </p>
            <ButtonLink href="/destinations" variant="secondary" className="mt-6">
              Explore all destinations
              <ArrowRight aria-hidden="true" className="size-4" />
            </ButtonLink>
          </div>
        </div>

        <ul
          aria-label="Destinations in Sri Lanka"
          className="mt-10 grid auto-rows-[180px] grid-cols-2 gap-3 sm:mt-12 sm:auto-rows-[240px] sm:gap-4 lg:mt-14 lg:auto-rows-[220px] lg:grid-cols-4 lg:gap-5"
        >
          {destinations.map((destination, index) => (
            <DestinationTile
              key={destination.slug}
              destination={destination}
              index={index}
              className={SPANS[index]}
            />
          ))}
        </ul>
      </Container>
    </Section>
  );
}

function DestinationTile({
  destination,
  index,
  className,
}: {
  destination: Destination;
  index: number;
  className?: string;
}) {
  const { label, icon: Icon } = CATEGORY[destination.category];
  const lead = index === 0;

  return (
    <li
      className={cn(
        "group relative isolate overflow-hidden rounded-card bg-brand-light",
        className,
      )}
    >
      <Image
        src={destination.image.src}
        alt={destination.image.alt}
        fill
        sizes={lead ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
        className="-z-10 object-cover transition-transform duration-300 ease-out group-hover:scale-[1.05]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-ink/85 via-ink/15 to-transparent"
      />

      <div className="flex h-full flex-col justify-between p-3 text-white sm:p-5 lg:p-6">
        <div className="flex items-start justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-pill border border-white/30 bg-white/15 px-2.5 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase backdrop-blur-sm sm:text-[11px]">
            <Icon aria-hidden="true" className="size-3.5" />
            {label}
          </span>
          <span aria-hidden="true" className="font-display text-lg leading-none text-white/80 italic sm:text-xl">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div>
          <p className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.18em] text-white/80 uppercase sm:text-[11px]">
            <MapPin aria-hidden="true" className="size-3" />
            {destination.region}
          </p>
          <h3
            className={cn(
              "mt-1.5 font-display leading-tight font-normal text-white",
              lead ? "text-3xl sm:text-4xl lg:text-5xl" : "text-xl sm:text-2xl",
            )}
          >
            {destination.name}
          </h3>
          <p
            className={cn(
              "mt-1.5 text-sm leading-snug text-white/85",
              lead ? "max-w-sm sm:text-base" : "hidden sm:block",
            )}
          >
            {destination.tagline}
          </p>
        </div>
      </div>
    </li>
  );
}
