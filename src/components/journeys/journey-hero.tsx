import Image from "next/image";
import { CalendarDays, MapPin, Tag, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { WaveEdge } from "@/components/ui/wave-edge";
import { COMFORT_LEVELS, TRAVEL_STYLES } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import type { Journey } from "@/types";
import { TravelStyleIcon } from "./travel-style-icon";

/**
 * Journey opener: the journey's photo with no colour tint — only a black
 * fade rising from the foot and a light one at the top for the header — the
 * name and promise, then everything a visitor compares on one glass panel:
 * length, places, style and price.
 */
export function JourneyHero({ journey }: { journey: Journey }) {
  const { title, promise, durationDays, route, travelStyles, comfort, startingPrice, image } = journey;
  const comfortLabel = COMFORT_LEVELS.find(({ key }) => key === comfort)?.label;

  return (
    <section className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-ink">
      <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="-z-20 object-cover" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/85 via-ink/30 via-50% to-transparent"
      />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-ink/40 to-transparent" />

      <Container className="relative z-20 max-w-[80rem] pt-32 pb-24 sm:pb-28 lg:pb-32">
        <p className="inline-flex w-fit items-center rounded-pill border border-white/40 bg-white/10 px-3 py-1.5 text-xs font-medium tracking-[0.14em] text-white uppercase backdrop-blur-sm">
          {durationDays}-Day Journey · {comfortLabel}
        </p>
        <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[1.04] font-semibold text-balance text-white sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="mt-5 max-w-xl font-display text-xl leading-snug text-pretty text-white/90 italic sm:text-2xl">
          {promise}
        </p>

        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 rounded-card border border-white/25 bg-white/10 p-5 backdrop-blur-md sm:p-6 lg:grid-cols-4">
            <Fact icon={CalendarDays} label="Duration">
              {durationDays} days / {durationDays - 1} nights
            </Fact>
            <Fact icon={MapPin} label="Locations">
              {route.map(({ name }) => name).join(" · ")}
            </Fact>
            <Fact icon={Tag} label="Travel style">
              <span className="flex flex-wrap gap-x-3 gap-y-1">
                {travelStyles.map((style) => (
                  <span key={style} className="inline-flex items-center gap-1">
                    <TravelStyleIcon style={style} className="size-4" />
                    {TRAVEL_STYLES.find(({ key }) => key === style)?.label}
                  </span>
                ))}
              </span>
            </Fact>
            <Fact label={startingPrice === null ? "Price" : "Starting from"}>
              {startingPrice === null ? (
                <span className="font-display text-xl">Request Price</span>
              ) : (
                <>
                  <span className="font-display text-xl">{formatPrice(startingPrice)}</span>
                  <span className="text-white/75"> per person</span>
                </>
              )}
            </Fact>
          </dl>
      </Container>

      <WaveEdge position="bottom" flat className="-bottom-px z-10 fill-white" />
    </section>
  );
}

function Fact({
  icon: Icon,
  label,
  children,
}: {
  icon?: LucideIcon;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] text-white/75 uppercase">
        {Icon && <Icon aria-hidden="true" className="size-3.5" strokeWidth={1.75} />}
        {label}
      </dt>
      <dd className="mt-1.5 text-sm leading-snug text-white">{children}</dd>
    </div>
  );
}
