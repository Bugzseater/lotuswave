"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Cards whose tops sit within this many px count as one row. */
const ROW_TOLERANCE = 80;

/**
 * Scroll-linked reveal: progress follows the scrollbar, so the section plays
 * in on the way down and runs backwards on the way up. Content stays
 * server-rendered; this only animates the marked descendants:
 *
 * - `[data-reveal]` — lifts and fades in, staggered in document order
 * - `[data-reveal-card]` — rises and wipes open from the foot. Each row gets
 *   its own trigger, so on a phone every card plays as it reaches the screen
 *   rather than all at once off-screen.
 * - `[data-reveal-step]` — slides in from the left on its own trigger
 * - `[data-reveal-image]` — rises and scales up on its own trigger; the value
 *   sets the rise in px (default 60), so a larger one lags behind a smaller
 *
 *
 * Reduced-motion visitors see everything in place with no movement.
 *
 * `disabled` switches the reveal off for a section while keeping its markers,
 * so it can be turned back on by deleting the prop.
 */
export function ScrollReveal({
  children,
  className,
  disabled = false,
}: {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (disabled) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);

        const text = q("[data-reveal]");
        if (text.length) {
          gsap.from(text, {
            y: 48,
            autoAlpha: 0,
            stagger: 0.25,
            ease: "power2.out",
            scrollTrigger: {
              trigger: root.current,
              start: "top 85%",
              end: "top 40%",
              scrub: 1.2,
            },
          });
        }

        for (const step of q("[data-reveal-step]") as HTMLElement[]) {
          gsap.from(step, {
            x: -40,
            autoAlpha: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top 92%",
              end: "top 65%",
              scrub: 1.2,
            },
          });
        }

        // No clip-path here, so rings and shadows outside the box survive.
        for (const img of q("[data-reveal-image]") as HTMLElement[]) {
          gsap.from(img, {
            y: Number(img.dataset.revealImage) || 60,
            scale: 0.92,
            autoAlpha: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: img,
              start: "top 95%",
              end: "top 50%",
              scrub: 1.2,
            },
          });
        }

        const rows: HTMLElement[][] = [];
        for (const card of q("[data-reveal-card]") as HTMLElement[]) {
          const top = card.getBoundingClientRect().top;
          const row = rows.find(
            (r) =>
              Math.abs(r[0].getBoundingClientRect().top - top) < ROW_TOLERANCE,
          );
          if (row) row.push(card);
          else rows.push([card]);
        }

        // fromTo, not from: clip-path can't interpolate to its default
        // `none`. The end shape matches rounded-card (20px).
        for (const row of rows) {
          gsap.fromTo(
            row,
            {
              y: 80,
              autoAlpha: 0,
              clipPath: "inset(100% 0% 0% 0% round 20px)",
            },
            {
              y: 0,
              autoAlpha: 1,
              clipPath: "inset(0% 0% 0% 0% round 20px)",
              stagger: 0.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: row[0],
                start: "top 95%",
                end: "top 55%",
                scrub: 1.2,
              },
            },
          );
        }
      });
    },
    { scope: root, dependencies: [disabled] },
  );

  return (
    <div ref={root} className={cn(className)}>
      {children}
    </div>
  );
}
