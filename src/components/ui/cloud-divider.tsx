import Image from "next/image";

const CLOUD_01 = { src: "/bg/cloud-01.png", width: 2400, height: 1253 } as const;
const CLOUD_02 = { src: "/bg/cloud-02.png", width: 2400, height: 1016 } as const;

type Puff = (typeof CLOUD_01 | typeof CLOUD_02) & {
  /** Position across the strip. */
  left: string;
  /** Height as a share of the strip — drives the width too, via the aspect. */
  size: string;
  flip?: boolean;
};

/**
 * Sized by height so each puff's own wispy top stays inside the strip; sizing
 * by width would scale the 1.9:1 artwork far taller than the divider.
 */
const PUFFS: readonly Puff[] = [
  { ...CLOUD_02, left: "-14%", size: "135%" },
  { ...CLOUD_01, left: "2%", size: "112%", flip: true },
  { ...CLOUD_01, left: "16%", size: "160%" },
  { ...CLOUD_02, left: "32%", size: "125%", flip: true },
  { ...CLOUD_01, left: "46%", size: "150%" },
  { ...CLOUD_02, left: "60%", size: "130%" },
  { ...CLOUD_01, left: "74%", size: "155%", flip: true },
  { ...CLOUD_02, left: "88%", size: "128%" },
];

/**
 * Decorative mist rolling along the bottom edge of a full-bleed image section,
 * melting into the white page beneath it. Overlapping puffs at different
 * scales keep the silhouette from reading as one repeated shape.
 *
 * Expects a positioned parent.
 */
export function CloudDivider() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[19vh] min-h-[128px] overflow-hidden sm:h-[22vh] lg:h-[25vh]"
    >
      {PUFFS.map((puff, index) => (
        <Image
          key={index}
          src={puff.src}
          width={puff.width}
          height={puff.height}
          alt=""
          sizes="50vw"
          loading="eager"
          style={{ left: puff.left, height: puff.size }}
          className={`absolute bottom-[-35%] w-auto max-w-none ${
            puff.flip ? "-scale-x-100" : ""
          }`}
        />
      ))}

      {/* The base settles into solid white so the next section starts clean.
          Solid only in the bottom fifth, then a long fade — a short ramp out of
          a near-opaque stop reads as a hard line wherever no puff covers it. */}
      <div className="absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-white from-20% via-white/50 via-58% to-transparent" />
    </div>
  );
}
