import Link from "next/link";
import { BedDouble, PlaneTakeoff, UtensilsCrossed } from "lucide-react";
import { IslandMap } from "@/components/destinations/island-map";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import type { Journey, Meal } from "@/types";
import { ItineraryTrail } from "./itinerary-trail";

/** "Breakfast, lunch and dinner". */
export function formatMeals(meals: Meal[]) {
  const words = meals.map((meal, i) => (i === 0 ? meal[0].toUpperCase() + meal.slice(1) : meal));
  return words.length > 1 ? `${words.slice(0, -1).join(", ")} and ${words.at(-1)}` : words[0];
}

/**
 * Route map and day-by-day itinerary, side by side. Left: the island with
 * the stops pinned and joined in travel order, and the stops listed beneath
 * with their nights. Right: the days as a trail. On wide screens the whole
 * section pins under the header and page scroll moves the days up through a
 * window about three cards tall, the line drawing and each marker filling
 * as it goes (see `ItineraryTrail`).
 */
export function JourneyItinerary({ journey }: { journey: Journey }) {
  const { title, route, itinerary } = journey;
  const nights = route.reduce((sum, stop) => sum + stop.nights, 0);
  /** The route stop a day's night is spent at; the departure day maps to the last. */
  const stopOfDay = (day: number) => {
    let before = 0;
    for (let i = 0; i < route.length; i++) {
      if (day <= before + route[i].nights) return i;
      before += route[i].nights;
    }
    return route.length - 1;
  };
  const pins = route.map((stop, i) => ({
    slug: stop.id,
    name: stop.name,
    coordinates: stop.coordinates,
    number: i + 1,
  }));

  return (
    <Section
      id="itinerary"
      data-trail-pin
      aria-label={`${title} route and itinerary`}
      className="scroll-mt-20 bg-white pt-8 pb-14 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24"
    >
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <section aria-labelledby="route-heading" className="lg:col-span-5 lg:self-start">
          <h2 id="route-heading" className="font-display text-3xl leading-tight text-ink sm:text-4xl">
            Route map
          </h2>

          {/* The route card — as tall as the day window beside it. On wide
              screens the route draws stop by stop as the days scroll, and
              the pins and this legend light up with it (see ItineraryTrail). */}
          <div
            data-route-card
            className="relative isolate mt-6 flex flex-col overflow-hidden rounded-card border border-brand/10 bg-gradient-to-br from-brand-light via-white to-brand-light/70 p-5 shadow-card sm:p-6 lg:h-[min(31rem,calc(100svh-14rem))]"
          >
            {/* Atlas dot grid, fading out towards the edges, and a soft glow. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 opacity-25 [background-image:radial-gradient(var(--color-brand)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_40%_50%,black_20%,transparent_75%)]"
            />
            <div aria-hidden="true" className="absolute -top-24 -left-24 -z-10 size-72 rounded-pill bg-brand/10 blur-3xl" />

            <p className="flex items-center justify-between gap-3 text-[11px] font-semibold tracking-[0.14em] text-brand uppercase">
              <span>
                {route.length} {route.length === 1 ? "stop" : "stops"} · {nights} nights
              </span>
              <span className="rounded-pill border border-brand/20 bg-white/70 px-2.5 py-1 text-[10px] tracking-[0.12em] backdrop-blur-sm">
                Sri Lanka
              </span>
            </p>

            <div className="mt-4 flex min-h-0 flex-1 flex-col gap-6 sm:flex-row sm:items-center">
              <div className="flex min-h-0 flex-1 items-center justify-center lg:h-full">
                <IslandMap
                  pins={pins}
                  route
                  tone="light"
                  labelScale={1.4}
                  label={`Map of Sri Lanka showing the ${title} route: ${route.map(({ name }) => name).join(", ")}`}
                  className="mx-auto w-full max-w-[15rem] lg:h-full lg:w-auto lg:max-w-full"
                />
              </div>

              {/* Legend: the stops in order on a thin connecting line. */}
              <ol className="relative grid grid-cols-2 gap-x-4 gap-y-4 sm:flex sm:w-40 sm:shrink-0 sm:flex-col sm:before:absolute sm:before:top-3 sm:before:bottom-3 sm:before:left-3 sm:before:w-px sm:before:bg-brand/20 sm:before:content-['']">
                {route.map((stop, i) => (
                  <li
                    key={stop.id}
                    data-route-stop
                    className="group/rs relative flex items-start gap-3 transition-opacity duration-300 ease-out [&.is-off]:opacity-40"
                  >
                    <span
                      aria-hidden="true"
                      className="relative grid size-6 shrink-0 place-items-center rounded-pill bg-brand text-[11px] font-bold text-white ring-white transition-shadow duration-300 ease-out group-[.is-current]/rs:ring-4 group-[.is-current]/rs:ring-brand/20"
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0 text-sm leading-snug">
                      <p className="font-medium text-ink">
                        {stop.destinationSlug ? (
                          <Link
                            href={`/destinations/${stop.destinationSlug}`}
                            className="underline-offset-4 hover:text-brand hover:underline"
                          >
                            {stop.name}
                          </Link>
                        ) : (
                          stop.name
                        )}
                      </p>
                      <p className="mt-0.5 text-xs text-muted">
                        {stop.nights} {stop.nights === 1 ? "night" : "nights"}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section aria-labelledby="days-heading" className="lg:col-span-7">
          <h2 id="days-heading" className="font-display text-3xl leading-tight text-ink sm:text-4xl">
            Day-by-day itinerary
          </h2>

          <ItineraryTrail className="mt-6">
            <div data-trail-track className="relative pt-4 pb-10">
              {/* The track, and the progress line drawn over it. The line's
                  height is animated; without JavaScript it stays full. */}
              <span aria-hidden="true" className="absolute top-10 bottom-14 left-[1.1875rem] w-0.5 rounded-pill bg-brand/15" />
              <span aria-hidden="true" className="absolute top-10 bottom-14 left-[1.1875rem] w-0.5">
                <span data-trail-line className="relative block h-full w-full rounded-pill bg-brand">
                  <span className="absolute -bottom-1 left-1/2 size-2.5 -translate-x-1/2 rounded-pill bg-brand ring-4 ring-brand/20" />
                </span>
              </span>

              <ol className="relative space-y-3">
                {itinerary.map((day) => {
                  const label = day.toDay ? `Days ${day.day}–${day.toDay}` : `Day ${day.day}`;
                  return (
                    <li
                      key={day.day}
                      data-trail-stop
                      data-stop-index={stopOfDay(day.day)}
                      className="group/stop grid grid-cols-[2.5rem_1fr] items-start gap-3 sm:gap-4"
                    >
                      <span
                        data-trail-marker
                        aria-hidden="true"
                        className="relative z-10 mt-1 grid size-10 place-items-center rounded-pill border-2 border-brand bg-white font-display text-brand italic shadow-card transition-colors duration-300 ease-out group-[.is-reached]/stop:bg-brand group-[.is-reached]/stop:text-white"
                      >
                        <span className={day.toDay ? "text-xs" : "text-base"}>
                          {day.toDay ? `${day.day}–${day.toDay}` : day.day}
                        </span>
                      </span>

                      <article
                        data-trail-card
                        className="relative isolate overflow-hidden rounded-card border border-line bg-white px-4 py-3.5 transition-shadow duration-300 ease-out hover:shadow-card"
                      >
                        {/* Oversized day number, a watermark behind the card. */}
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute -top-2 right-2 -z-10 font-display text-6xl leading-none font-semibold text-brand/[0.06] select-none"
                        >
                          {String(day.day).padStart(2, "0")}
                        </span>

                        <p className="text-[10px] font-semibold tracking-[0.14em] text-brand uppercase">{label}</p>
                        <h3 className="mt-1 font-display text-base leading-snug text-balance text-ink">
                          {day.title}
                        </h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-pretty text-muted sm:text-[13px]">{day.text}</p>

                        <ul className="mt-2.5 flex flex-wrap gap-1.5 text-[11px] text-ink">
                          <li className="inline-flex items-center gap-1 rounded-pill bg-brand-light px-2.5 py-1">
                            {day.overnight ? (
                              <>
                                <BedDouble aria-hidden="true" className="size-3 text-brand" strokeWidth={1.75} />
                                <span className="sr-only">Overnight: </span>
                                {day.overnight}
                              </>
                            ) : (
                              <>
                                <PlaneTakeoff aria-hidden="true" className="size-3 text-brand" strokeWidth={1.75} />
                                Departure day
                              </>
                            )}
                          </li>
                          {day.meals.length > 0 && (
                            <li className="inline-flex items-center gap-1 rounded-pill bg-brand-light px-2.5 py-1">
                              <UtensilsCrossed aria-hidden="true" className="size-3 text-brand" strokeWidth={1.75} />
                              <span className="sr-only">Meals included: </span>
                              {formatMeals(day.meals)}
                            </li>
                          )}
                        </ul>
                      </article>
                    </li>
                  );
                })}
              </ol>
            </div>
          </ItineraryTrail>
        </section>
      </Container>
    </Section>
  );
}
