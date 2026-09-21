"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Plays a section in as it scrolls into view, and back out in reverse when
 * the visitor scrolls back up past it. Content stays server-rendered; this
 * only animates the marked descendants:
 *
 * - `[data-reveal]` — lifts and fades in, staggered in document order
 * - `[data-reveal-card]` — rises and wipes open from the foot, staggered
 *
 * Reduced-motion visitors see everything in place with no movement.
 */
export function ScrollReveal({
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
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: root.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        if (root.current?.querySelector("[data-reveal]")) {
          tl.from("[data-reveal]", {
            y: 32,
            autoAlpha: 0,
            duration: 0.8,
            stagger: 0.1,
          });
        }

        if (root.current?.querySelector("[data-reveal-card]")) {
          // fromTo, not from: clip-path can't interpolate to its default
          // `none`. The end shape matches rounded-card (20px).
          tl.fromTo(
            "[data-reveal-card]",
            {
              y: 60,
              autoAlpha: 0,
              clipPath: "inset(100% 0% 0% 0% round 20px)",
            },
            {
              y: 0,
              autoAlpha: 1,
              clipPath: "inset(0% 0% 0% 0% round 20px)",
              duration: 1,
              stagger: 0.12,
            },
            "-=0.4",
          );
        }
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={cn(className)}>
      {children}
    </div>
  );
}
