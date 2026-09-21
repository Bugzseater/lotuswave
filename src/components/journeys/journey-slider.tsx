"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
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

  const control =
    "grid size-12 place-items-center rounded-pill border border-brand text-brand transition-colors duration-200 ease-out hover:bg-brand hover:text-white disabled:pointer-events-none disabled:opacity-35";

  return (
    <div>
      <ul
        ref={track}
        aria-label={label}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] lg:gap-6 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>

      <div className="mt-8 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={atStart}
          aria-label="Previous journey"
          className={cn(control)}
        >
          <ArrowLeft aria-hidden="true" className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          disabled={atEnd}
          aria-label="Next journey"
          className={cn(control)}
        >
          <ArrowRight aria-hidden="true" className="size-5" />
        </button>
      </div>
    </div>
  );
}
