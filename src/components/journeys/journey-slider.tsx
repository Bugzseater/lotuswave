"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Horizontal, snap-scrolling track with previous / next controls. Swipe and
 * trackpad scrolling work natively; the buttons step one card at a time.
 * Never autoplays. Children are the `<li>` slides, rendered on the server.
 */
export function JourneySlider({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  const track = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

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

  const step = (dir: 1 | -1) => {
    const el = track.current;
    const slide = el?.firstElementChild as HTMLElement | null;
    if (!el || !slide) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({
      left: dir * (slide.offsetWidth + gap),
      behavior: reduce ? "auto" : "smooth",
    });
  };

  // Below the track on small screens; from lg they float at the track's
  // sides, level with the photographs (`lg:contents` drops the wrapper so the
  // buttons position against the outer frame).
  const control =
    "grid size-12 place-items-center rounded-pill border border-brand bg-white text-brand transition-colors duration-200 ease-out hover:bg-brand hover:text-white disabled:pointer-events-none disabled:opacity-0 lg:absolute lg:top-[22%] lg:z-10 lg:shadow-header";

  return (
    <div className="relative">
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
          onClick={() => step(-1)}
          disabled={atStart}
          aria-label="Previous journey"
          className={cn(control, "lg:-left-6 2xl:-left-16")}
        >
          <ChevronLeft aria-hidden="true" className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          disabled={atEnd}
          aria-label="Next journey"
          className={cn(control, "lg:-right-6 2xl:-right-16")}
        >
          <ChevronRight aria-hidden="true" className="size-5" />
        </button>
      </div>
    </div>
  );
}
