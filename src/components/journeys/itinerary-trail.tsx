"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Where the pinned section sits — just under the fixed header. */
const PIN_TOP = 88;

/**
 * The day-by-day trail as a pinned, scroll-driven window (wide screens),
 * with the route map beside it following along.
 *
 * Trail: the closest `[data-trail-pin]` ancestor — the itinerary section —
 * pins under the header; this element is a fixed-height window showing the
 * first few days, and page scroll moves `[data-trail-track]` up through it
 * until the last day is in view, then the page carries on. The progress
 * line `[data-trail-line]` grows to the foot of the window, and each
 * `[data-trail-stop]` it passes gets `is-reached` (the marker fills) while
 * its `[data-trail-marker]` and `[data-trail-card]` play in.
 *
 * Route: each day carries `data-stop-index`, the route stop it sleeps at.
 * The furthest reached day sets the current stop; the map's
 * `[data-route-line]` draws to that stop with the `[data-route-traveller]`
 * dot riding its end, and the pins (`[data-route-pin]`) and legend
 * (`[data-route-stop]`) ahead of it dim (`is-off`), the current one marked
 * `is-current`. Scrolling back reverses all of it.
 *
 * Phones: no pinning — the days are a plain list and the whole route draws
 * once when the map scrolls into view. Reduced motion: the finished state,
 * nothing moving.
 */
export function ItineraryTrail({ children, className }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const win = root.current;
      if (!win) return;
      const track = win.querySelector<HTMLElement>("[data-trail-track]");
      const line = win.querySelector<HTMLElement>("[data-trail-line]");
      const stops = Array.from(win.querySelectorAll<HTMLElement>("[data-trail-stop]"));
      if (!track || !line) return;

      // The route map lives in the same section, outside this window.
      const section = win.closest<HTMLElement>("[data-trail-pin]");
      const routeLine = section?.querySelector<SVGPathElement>("[data-route-line]") ?? null;
      const traveller = section?.querySelector<SVGCircleElement>("[data-route-traveller]") ?? null;
      const markers = [
        Array.from(section?.querySelectorAll<SVGGElement>("[data-route-pin]") ?? []),
        Array.from(section?.querySelectorAll<HTMLElement>("[data-route-stop]") ?? []),
      ];
      const fractions: number[] = JSON.parse(routeLine?.dataset.fractions ?? "[0]");
      const route = { f: 0 };

      /** Draw the route to fraction `f` of its length and move the traveller there. */
      const drawRoute = (f: number) => {
        if (!routeLine) return;
        routeLine.style.strokeDashoffset = String(1 - f);
        if (traveller) {
          const point = routeLine.getPointAtLength(f * routeLine.getTotalLength());
          traveller.setAttribute("cx", String(point.x));
          traveller.setAttribute("cy", String(point.y));
        }
      };
      /** Light the pins and legend up to stop `k`; `null` clears the marks. */
      const markStops = (k: number | null) => {
        for (const list of markers) {
          list.forEach((el, i) => {
            el.classList.toggle("is-off", k !== null && i > k);
            el.classList.toggle("is-current", k !== null && i === k);
          });
        }
      };
      /** The last stop at or behind fraction `f` of the route. */
      const stopAt = (f: number) => {
        let k = 0;
        fractions.forEach((fraction, i) => {
          if (fraction <= f + 0.001) k = i;
        });
        return k;
      };
      const reset = () => {
        stops.forEach((stop) => stop.classList.remove("is-reached"));
        markStops(null);
        if (routeLine) routeLine.style.strokeDashoffset = "";
      };

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const pin = section ?? win;
        const distance = () => Math.max(0, track.scrollHeight - win.clientHeight);

        const timelines = stops.map((stop) =>
          gsap
            .timeline({ paused: true })
            .fromTo(
              stop.querySelector("[data-trail-marker]"),
              { scale: 0.6, autoAlpha: 0 },
              { scale: 1, autoAlpha: 1, duration: 0.3, ease: "power2.out" },
            )
            .fromTo(
              stop.querySelector("[data-trail-card]"),
              { x: 32, autoAlpha: 0 },
              { x: 0, autoAlpha: 1, duration: 0.3, ease: "power2.out" },
              "<0.05",
            ),
        );

        let current = -1;
        const goToStop = (k: number) => {
          if (k === current) return;
          current = k;
          markStops(k);
          gsap.to(route, {
            f: fractions[k] ?? 0,
            duration: 0.6,
            ease: "power2.inOut",
            overwrite: true,
            onUpdate: () => drawRoute(route.f),
          });
        };

        /** `offset` is how far the track has moved up, in px. */
        const update = (offset: number) => {
          const reach = offset + win.clientHeight * 0.9;
          let furthest = 0;
          stops.forEach((stop, i) => {
            const on = stop.offsetTop + 24 < reach;
            if (on) furthest = Math.max(furthest, Number(stop.dataset.stopIndex) || 0);
            if (on === stop.classList.contains("is-reached")) return;
            stop.classList.toggle("is-reached", on);
            if (on) timelines[i].play();
            else timelines[i].reverse();
          });
          // The line runs from 2.5rem below the track's top to 3.5rem above
          // its foot (see the markup), so measure along that length.
          const span = Math.max(1, track.scrollHeight - 96);
          gsap.set(line, { height: `${gsap.utils.clamp(0, 100, ((reach - 40) / span) * 100)}%` });
          goToStop(furthest);
        };

        route.f = 0;
        drawRoute(0);
        if (traveller) gsap.set(traveller, { autoAlpha: 1 });

        gsap.to(track, {
          y: () => -distance(),
          ease: "none",
          onUpdate: () => update(-Number(gsap.getProperty(track, "y"))),
          scrollTrigger: {
            trigger: pin,
            start: `top ${PIN_TOP}px`,
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });
        update(0);

        return reset;
      });

      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        stops.forEach((stop) => stop.classList.add("is-reached"));
        if (!routeLine) return reset;

        route.f = 0;
        drawRoute(0);
        markStops(0);
        if (traveller) gsap.set(traveller, { autoAlpha: 1 });

        gsap.to(route, {
          f: 1,
          duration: 2.4,
          ease: "power1.inOut",
          onUpdate: () => {
            drawRoute(route.f);
            markStops(stopAt(route.f));
          },
          scrollTrigger: { trigger: routeLine.closest("[data-route-card]") ?? routeLine, start: "top 75%" },
        });

        return reset;
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        stops.forEach((stop) => stop.classList.add("is-reached"));
        return reset;
      });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className={cn(
        // The window: about three small cards tall, edges softened so cards
        // fade in and out rather than cut off.
        "relative lg:h-[min(31rem,calc(100svh-14rem))] lg:overflow-hidden lg:[mask-image:linear-gradient(to_bottom,transparent,black_1.5rem,black_calc(100%-2.5rem),transparent)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
