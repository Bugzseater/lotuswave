import Image from "next/image";

import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";

export interface HeroVideo {
  /** Absolute or public-relative source. R2 in production. */
  src: string;
  /** Defaults to MP4. */
  type?: string;
}

interface HeroMediaProps {
  image: ImageAsset;
  /**
   * Optional clip. When present the still becomes its poster, so the hero looks
   * identical until the video can play. Nothing else in the hero changes.
   */
  video?: HeroVideo;
  className?: string;
}

/**
 * The hero's background layer.
 *
 * Object position is deliberate: the source still is a left/right split, agro
 * on the left and wellness on the right.
 *
 * The still is 2.35:1 and the frame is now a full screen, so `object-cover`
 * scales to the frame's height and crops the sides — the two things the hero is
 * about. On desktop `center` keeps both halves in shot. A phone only has room
 * for about a fifth of the width, so it holds the agro side: `20%` frames the
 * farmer and the terraces rather than an arbitrary middle. The vertical value
 * only bites on short, wide viewports, where `60%` lifts the sunrise sky up
 * behind the headline.
 */
export function HeroMedia({ image, video, className }: HeroMediaProps) {
  const framing = "h-full w-full object-cover object-[20%_center] lg:object-[center_60%] motion-safe:animate-ken-burns";

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {video ? (
        <video
          className={framing}
          poster={image.url}
          aria-label={image.alt}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={video.src} type={video.type ?? "video/mp4"} />
        </video>
      ) : (
        <Image
          src={image.url}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className={framing}
        />
      )}
    </div>
  );
}
