import Image from "next/image";
import { Eyebrow } from "@/components/about/eyebrow";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { WaveEdge } from "@/components/ui/wave-edge";

/*
 * DRAFT — replace with the founder's own words and name before launch. Kept
 * deliberately free of names, dates and anecdotes so nothing here states a
 * fact about a real person.
 */
const FOUNDER = {
  /** Set to the founder's name; the attribution falls back to the role alone. */
  name: null as string | null,
  role: "Founder, LotusWave Lanka Tours",
  quote:
    "We grew up knowing Sri Lanka through its fields, its kitchens and its healers. LotusWave exists so travellers can know it that way too.",
  image: {
    src: "/bg/aboutUs/founder.png",
    alt: "Watercolour of the founder, arms folded beneath a tree, with Sigiriya rock and elephants crossing a river at sunset behind",
  },
};

/** About 04 — the founder's story. Sand is this section's one accent surface. */
export function FounderStory() {
  return (
    <Section
      aria-labelledby="founder-heading"
      className="relative isolate overflow-hidden bg-accent-sand/50"
    >
      {/* The Who We Are wave, reflected: brand-light hanging down from the
          Vision section above, so the two meet on a curve. Mirrored on x as
          well so it isn't the same shape twice. 1px past the edge hides any
          sub-pixel seam. */}
      <WaveEdge position="top" flat className="-top-px -scale-x-100 fill-brand-light" />
      {/* Sand melts into the brand-light of Why Trust Us below. Behind the
          content (-z-10), so the painting and text sit on top of it. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-b from-transparent to-brand-light sm:h-40 lg:h-56"
      />
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[7fr_5fr] lg:gap-16">
          {/* A watercolour on white paper, shown whole — no frame, no crop.
              `mix-blend-multiply` drops the paper white into the sand behind,
              so only the painting and its splashed edges show. */}
          <Image
            src={FOUNDER.image.src}
            alt={FOUNDER.image.alt}
            width={1536}
            height={1024}
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="h-auto w-full mix-blend-multiply"
          />

          <div>
            <Eyebrow>Founder Story</Eyebrow>
            <h2
              id="founder-heading"
              className="mt-4 font-display text-4xl leading-[1.08] text-balance text-ink sm:text-5xl"
            >
              Started at Home,{" "}
              <em className="font-medium text-brand">Not From Afar</em>
            </h2>

            <figure className="mt-8 border-l-2 border-brand pl-6">
              <blockquote className="font-display text-2xl leading-snug text-pretty text-ink sm:text-3xl">
                &ldquo;{FOUNDER.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm text-muted">
                {FOUNDER.name && (
                  <span className="font-semibold text-ink">{FOUNDER.name}, </span>
                )}
                {FOUNDER.role}
              </figcaption>
            </figure>
          </div>
        </div>
      </Container>
    </Section>
  );
}
