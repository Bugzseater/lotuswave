"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type HeroMediaProps = {
  image: { src: string; alt: string };
  /** Looping background footage. Without it the still carries the section. */
  video?: { src: string; type?: string };
};

/**
 * The hero backdrop. The still always renders — it is the LCP element and the
 * poster the footage sits on, so the section is never empty while the video
 * buffers, and it is what readers who ask for reduced motion keep.
 *
 * A client component only because `prefers-reduced-motion` cannot stop a video
 * from autoplaying through CSS; the query has to be read to decide whether to
 * mount it at all.
 */
export function HeroMedia({ image, video }: HeroMediaProps) {
  const [motionAllowed, setMotionAllowed] = useState(false);

  useEffect(() => {
    if (!video) return;

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotionAllowed(!query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [video]);

  return (
    <>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        className="-z-20 object-cover"
      />

      {video && motionAllowed && (
        <video
          aria-hidden="true"
          autoPlay
          muted
          loop
          playsInline
          poster={image.src}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        >
          <source src={video.src} type={video.type ?? "video/mp4"} />
        </video>
      )}
    </>
  );
}
