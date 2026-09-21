"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

/** Two wave periods across 120 units, so a -50% slide loops seamlessly. */
const WAVE_PATH = "M0 6 Q15 0 30 6 T60 6 T90 6 T120 6 V12 H0Z";

/**
 * Always-visible return-to-top control, bottom left. The ball fills with
 * brand purple as the reader scrolls — a drifting wave rides the surface —
 * and is full once they reach the footer.
 */
export function BackToTop() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  const level = `${progress * 100}%`;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={`Back to top — ${Math.round(progress * 100)}% of page read`}
      className="group fixed bottom-4 left-4 z-40 size-14 overflow-hidden rounded-pill border-2 border-brand bg-white/90 text-brand shadow-lg backdrop-blur-md transition-transform duration-200 ease-out hover:-translate-y-0.5 sm:bottom-6 sm:left-6"
    >
      {/* The liquid. Its surface waves sit just above its top edge. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 bg-brand transition-[height] duration-300 ease-out"
        style={{ height: level }}
      >
        <Wave className="bottom-full translate-y-[3px] opacity-40 animate-wave-drift-slow" />
        <Wave className="bottom-full animate-wave-drift" />
      </span>

      {/* Purple arrow over the dry part of the ball… */}
      <span aria-hidden="true" className="absolute inset-0 grid place-items-center">
        <ArrowUp
          className="size-5 transition-transform duration-200 ease-out group-hover:-translate-y-0.5"
          strokeWidth={2.25}
        />
      </span>
      {/* …and a white copy clipped to the liquid, so it stays legible as
          the purple rises past it. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 grid place-items-center text-white transition-[clip-path] duration-300 ease-out"
        style={{ clipPath: `inset(calc(100% - ${level}) 0 0 0)` }}
      >
        <ArrowUp
          className="size-5 transition-transform duration-200 ease-out group-hover:-translate-y-0.5"
          strokeWidth={2.25}
        />
      </span>
    </button>
  );
}

function Wave({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 12"
      preserveAspectRatio="none"
      className={cn("absolute left-0 h-2 w-[200%] fill-brand", className)}
    >
      <path d={WAVE_PATH} />
    </svg>
  );
}
