"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Entrance timeline for the hero copy. The markup stays server-rendered; this
 * only finds the marked pieces and plays them in:
 *
 * - `[data-hero-rule]` — the left rule draws downwards
 * - `[data-hero-line]` — headline lines rise out of their masks
 * - `[data-hero-accent]` — "Sri Lanka" settles in after its line
 * - `[data-hero-fade]` — supporting copy and CTAs lift and fade in, staggered
 *
 * Then, tied to scroll, the whole column lifts and fades out as the hero
 * leaves the viewport, and returns when scrolling back up.
 *
 * The column ships `invisible` so nothing flashes before hydration; the
 * timeline reveals it. Reduced-motion visitors get the copy with no movement.
 */
export function HeroIntro({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(root.current, { autoAlpha: 1 });

        gsap
          .timeline({ defaults: { ease: "power3.out" }, delay: 0.5 })
          .from("[data-hero-rule]", {
            scaleY: 0,
            transformOrigin: "top",
            duration: 1.8,
            ease: "power2.inOut",
          })
          .from(
            "[data-hero-line]",
            { yPercent: 110, duration: 1.5, stagger: 0.3 },
            0.4,
          )
          .from(
            "[data-hero-accent]",
            {
              opacity: 0,
              scale: 0.92,
              filter: "blur(8px)",
              transformOrigin: "left center",
              duration: 1.4,
            },
            1,
          )
          .from(
            "[data-hero-fade]",
            { y: 24, autoAlpha: 0, duration: 1.2, stagger: 0.25 },
            1.5,
          );

        // Scroll out, and back in on the way up. Tweens the column itself so
        // it never fights the entrance, which only touches the children.
        gsap.fromTo(
          root.current,
          { y: 0, autoAlpha: 1 },
          {
            y: -80,
            autoAlpha: 0,
            ease: "none",
            scrollTrigger: {
              trigger: root.current?.closest("section"),
              start: "top top",
              end: "bottom 40%",
              scrub: 0.6,
            },
          },
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(root.current, { autoAlpha: 1 });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={cn("invisible", className)}>
      {children}
    </div>
  );
}
