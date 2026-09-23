"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/*
 * Three photographs of the same quiet subject, crossfading every five seconds
 * across the full width of the page. `prefers-reduced-motion` stops the
 * rotation altogether — the first photograph simply stays.
 *
 * No frame, no overlay and no crop: the band runs the full width of the page
 * on the files' own 16:9 ratio, so each photograph shows whole and the white
 * haze along its lower edge meets the section's bottom edge on its own. Full
 * width and the whole frame together fix the height — the band can only get
 * shorter by cropping or by giving up the full width.
 */
const IMAGES = [
  {
    src: "/bg/wellness/ayurvedic%20spa%20outdoor.png",
    alt: "A shirodhara treatment in a garden — warm oil streaming from a hanging brass vessel onto the forehead",
  },
  {
    src: "/bg/wellness/herbal%20wellnes.png",
    alt: "A therapist spreading a fresh green herbal paste during a treatment, bowl in hand",
  },
  {
    src: "/bg/wellness/natural.png",
    alt: "Treatment tables set out on the rocks beside a forest stream, therapists at work",
  },
] as const;

const ROTATE_MS = 5000;

export function WellnessShowcase() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(
      () => setActive((current) => (current + 1) % IMAGES.length),
      ROTATE_MS,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative aspect-[16/9] w-full">
      {IMAGES.map((image, index) => (
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          fill
          sizes="100vw"
          priority={index === 0}
          className={cn(
            "object-contain transition-opacity duration-1000 ease-out",
            index === active ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
    </div>
  );
}
