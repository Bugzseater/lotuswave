import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { WaveEdge } from "@/components/ui/wave-edge";
import type { Experience, ExperienceIcon as ExperienceIconKey, ImageAsset } from "@/types";
import { cn } from "@/lib/utils";
import { ExperienceIcon } from "./experience-icon";

/** Polaroid tilts; each section starts one step further along. */
const TILTS = ["-rotate-6", "rotate-3", "-rotate-2", "rotate-6"];

/** Vertical scatter across the row, wide screens only. */
const SCATTER = ["sm:translate-y-6", "", "sm:translate-y-10", "sm:translate-y-2"];

type Polaroid = { photo: ImageAsset; caption: string; slug: string; name: string };

/**
 * Up to four photos: each experience's cover (captioned with its type),
 * then its gallery (captioned with the place), interleaved so both
 * experiences show early. Duplicates are skipped.
 */
function pickPolaroids(experiences: Experience[]): Polaroid[] {
  const covers = experiences.map((e) => ({ photo: e.image, caption: e.type, slug: e.slug, name: e.title }));
  const galleries = experiences.map((e) =>
    e.gallery.map((photo) => ({ photo, caption: e.location.split(",")[0], slug: e.slug, name: e.title })),
  );
  const extras: Polaroid[] = [];
  for (let i = 0; i < Math.max(0, ...galleries.map((g) => g.length)); i++) {
    for (const gallery of galleries) if (gallery[i]) extras.push(gallery[i]);
  }

  const seen = new Set<string>();
  return [...covers, ...extras]
    .filter(({ photo }) => !seen.has(photo.src) && !!seen.add(photo.src))
    .slice(0, 4);
}

/**
 * One experience category as a full section, laid out like a page of a
 * travel journal: a huge faint numeral behind the centred heading, a glass
 * button through, and four taped polaroids scattered over a
 * pencil-and-watercolour landscape that fades in along the bottom and is
 * closed by a white wave.
 */
export function ExperienceShowcase({
  categoryKey,
  categorySlug,
  title,
  intro,
  experiences,
  index,
  total,
  baseArt,
}: {
  categoryKey: ExperienceIconKey;
  /** The category's own page, `/experiences/<slug>`. */
  categorySlug: string;
  title: string;
  intro: string;
  experiences: Experience[];
  index: number;
  total: number;
  /** Decorative landscape along the bottom; omit for none. */
  baseArt?: string;
}) {
  const number = String(index + 1).padStart(2, "0");
  const polaroids = pickPolaroids(experiences);

  return (
    <section
      id={categoryKey}
      aria-labelledby={`${categoryKey}-heading`}
      className={cn(
        "relative isolate scroll-mt-20 overflow-hidden",
        // The first sits just under the breadcrumbs; the rest follow a wave.
        index === 0 ? "pt-6 sm:pt-8 lg:pt-10" : "pt-10 sm:pt-12 lg:pt-16",
        baseArt ? "pb-28 sm:pb-32 lg:pb-40" : "pb-16 sm:pb-24 lg:pb-32",
      )}
    >
      {baseArt && (
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-20 h-80 sm:h-[26rem] lg:h-[34rem]">
          <Image
            src={baseArt}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-bottom opacity-20"
          />
          {/* Fades the art up into the white section. */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/30 to-transparent" />
        </div>
      )}

      {/* Decorative numeral behind the heading — the real count is below. */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 text-center font-display text-[10rem] leading-none font-semibold text-brand/[0.06] select-none sm:text-[14rem] lg:text-[18rem]"
      >
        {number}
      </p>

      <Container className="flex flex-col items-center text-center">
        <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-brand uppercase">
          <ExperienceIcon icon={categoryKey} className="size-5" />
          {number} / {String(total).padStart(2, "0")}
        </p>
        <h2
          id={`${categoryKey}-heading`}
          className="mt-4 font-display text-4xl leading-[1.08] text-balance text-ink sm:text-5xl"
        >
          {title}
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-pretty text-muted sm:text-lg">
          {intro}
        </p>

        {experiences.length > 0 && (
          <Link
            href={`/experiences/${categorySlug}`}
            className="group mt-8 inline-flex h-13 items-center gap-2 rounded-pill border border-white/70 bg-white/40 px-8 text-base font-medium text-brand shadow-header backdrop-blur-md transition-colors duration-200 ease-out hover:bg-white lg:mt-10"
          >
            Explore {title}
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
            />
          </Link>
        )}

        {/* Four taped polaroids scattered over the art, each a link to the
            experience it comes from. Two by two on phones, one row from sm. */}
        {polaroids.length > 0 && (
          <ul className="mt-12 grid w-full max-w-md grid-cols-2 gap-x-4 gap-y-8 sm:max-w-none sm:grid-cols-4 sm:gap-4 lg:mt-16 lg:max-w-5xl lg:gap-8">
            {polaroids.map(({ photo, caption, slug, name }, i) => (
              <li key={photo.src} className={SCATTER[i]}>
                <Link
                  href={`/experiences/${categorySlug}#${slug}`}
                  aria-label={`${name} — ${caption}`}
                  className={cn(
                    "relative block rounded-md bg-white p-2 pb-3 shadow-card transition-transform duration-300 ease-out hover:rotate-0 hover:scale-[1.04] sm:p-2.5",
                    TILTS[(i + index) % TILTS.length],
                  )}
                >
                  {/* Masking tape. */}
                  <span
                    aria-hidden="true"
                    className="absolute -top-3 left-1/2 h-6 w-14 -translate-x-1/2 -rotate-3 rounded-sm bg-accent-sand/80 sm:w-16"
                  />
                  <span className="relative block aspect-square overflow-hidden rounded-sm bg-brand-light">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1024px) 15rem, (min-width: 640px) 22vw, 45vw"
                      className="object-cover"
                    />
                  </span>
                  <span className="mt-2.5 block font-display text-sm text-ink italic sm:text-base">
                    {caption}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>

      {baseArt && <WaveEdge position="bottom" flat className="-bottom-px fill-white" />}
    </section>
  );
}
