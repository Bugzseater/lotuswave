"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Snap track for the quote cards. Swipe and trackpad scrolling work natively;
 * the arrows step one card. Never autoplays.
 *
 * The controls sit under the track next to a hairline rail whose brand segment
 * is as wide a fraction of the rail as the visible cards are of the whole
 * track, and slides along it with the scroll — the position indicator reads at
 * a glance without dots to count. The rail hides itself when nothing overflows.
 */
export function QuoteSlider({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  const track = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);
  /** Visible share of the track, 0–1. 1 means everything already fits. */
  const [visible, setVisible] = useState(1);
  /** How far through the scrollable remainder we are, 0–1. */
  const [progress, setProgress] = useState(0);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const scrollable = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= scrollable - 4);
    setVisible(el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1);
    setProgress(scrollable > 0 ? el.scrollLeft / scrollable : 0);
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

  const overflows = visible < 0.999;

  const control =
    "grid size-12 place-items-center rounded-pill border border-line text-ink transition-colors duration-200 ease-out hover:border-brand hover:bg-brand hover:text-white disabled:pointer-events-none disabled:border-line disabled:text-muted disabled:opacity-40";

  return (
    <div>
      <ul
        ref={track}
        aria-label={label}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] lg:gap-6 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>

      <div
        className={cn(
          "mt-10 flex items-center gap-8",
          !overflows && "justify-center",
        )}
      >
        {overflows && (
          <div aria-hidden="true" className="relative h-px flex-1 bg-line">
            <span
              className="absolute top-0 h-px bg-brand"
              style={{
                width: `${visible * 100}%`,
                left: `${progress * (1 - visible) * 100}%`,
              }}
            />
          </div>
        )}

        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={atStart}
            aria-label="Previous quotes"
            className={control}
          >
            <ArrowLeft aria-hidden="true" className="size-5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={atEnd}
            aria-label="Next quotes"
            className={control}
          >
            <ArrowRight aria-hidden="true" className="size-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
