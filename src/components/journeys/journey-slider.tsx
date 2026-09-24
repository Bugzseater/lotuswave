"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Horizontal, snap-scrolling track with previous / next controls. Swipe and
 * trackpad scrolling work natively; the buttons step one card at a time.
 * Children are the `<li>` slides, rendered on the server.
 *
 * Autoplay is opt-in through `autoplayMs`: it steps one card per interval and
 * wraps back to the first after the last. It holds while the pointer is over
 * the slider or focus is inside it, while the tab is hidden, and never runs
 * for reduced-motion visitors. Pressing a control restarts the interval, so
 * an auto step never lands straight after a manual one.
 */
export function JourneySlider({
  children,
  label,
  itemName = "journey",
  controlClassName,
  autoplayMs,
}: {
  children: ReactNode;
  label: string;
  /** Singular noun for the button labels: "Previous journey". */
  itemName?: string;
  /** Overrides for both prev / next buttons — size, vertical position. */
  controlClassName?: string;
  /** Advance one card every this many ms. Omit for no autoplay. */
  autoplayMs?: number;
}) {
  const track = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [paused, setPaused] = useState(false);
  // Bumped by the controls to restart the autoplay interval.
  const [restart, setRestart] = useState(0);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const step = useCallback((dir: 1 | -1, wrap = false) => {
    const el = track.current;
    const slide = el?.firstElementChild as HTMLElement | null;
    if (!el || !slide) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = reduce ? "auto" : "smooth";
    if (wrap && el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) {
      el.scrollTo({ left: 0, behavior });
      return;
    }
    el.scrollBy({ left: dir * (slide.offsetWidth + gap), behavior });
  }, []);

  const manualStep = (dir: 1 | -1) => {
    step(dir);
    setRestart((n) => n + 1);
  };

  useEffect(() => {
    if (!autoplayMs || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (!document.hidden) step(1, true);
    }, autoplayMs);
    return () => clearInterval(id);
  }, [autoplayMs, paused, restart, step]);

  // Below the track on small screens; from lg they float at the track's
  // sides, level with the photographs (`lg:contents` drops the wrapper so the
  // buttons position against the outer frame).
  const control =
    "grid size-12 place-items-center rounded-pill border border-brand bg-white text-brand transition-colors duration-200 ease-out hover:bg-brand hover:text-white disabled:pointer-events-none disabled:opacity-0 lg:absolute lg:top-[22%] lg:z-10 lg:shadow-header";

  return (
    <div
      className="relative"
      onPointerEnter={autoplayMs ? () => setPaused(true) : undefined}
      onPointerLeave={autoplayMs ? () => setPaused(false) : undefined}
      onFocus={autoplayMs ? () => setPaused(true) : undefined}
      onBlur={
        autoplayMs
          ? (e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
            }
          : undefined
      }
    >
      <ul
        ref={track}
        aria-label={label}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] lg:gap-6 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>

      <div className="mt-8 flex justify-center gap-3 lg:contents">
        <button
          type="button"
          onClick={() => manualStep(-1)}
          disabled={atStart}
          aria-label={`Previous ${itemName}`}
          className={cn(control, "lg:-left-6 2xl:-left-16", controlClassName)}
        >
          <ChevronLeft aria-hidden="true" className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => manualStep(1)}
          disabled={atEnd}
          aria-label={`Next ${itemName}`}
          className={cn(control, "lg:-right-6 2xl:-right-16", controlClassName)}
        >
          <ChevronRight aria-hidden="true" className="size-5" />
        </button>
      </div>
    </div>
  );
}
