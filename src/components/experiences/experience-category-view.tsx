import Image from "next/image";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { WaveEdge } from "@/components/ui/wave-edge";
import type { Experience, ExperienceCategoryKey, ImageAsset } from "@/types";
import { ExperienceIcon } from "./experience-icon";
import { ExperienceInquiryCta } from "./experience-inquiry-cta";
import { ExperienceChapter } from "./experience-chapter";

/**
 * One category's own page, `/experiences/agro-experience`: a full-bleed
 * photo hero, the trail Home › Experiences › category beneath it, the kinds
 * of experience it covers, then every experience in it as a tile.
 */
export function ExperienceCategoryView({
  category,
  experiences,
  heroImage,
}: {
  category: { key: ExperienceCategoryKey; title: string; intro: string; types: readonly string[] };
  experiences: Experience[];
  heroImage: ImageAsset;
}) {
  const { key, title, intro, types } = category;
  // The last word of the title goes gold on its own line.
  const split = title.lastIndexOf(" ");
  const lead = split > 0 ? title.slice(0, split) : "";
  const last = title.slice(split + 1);

  return (
    <>
      {/* Built like the Destinations and Experiences heroes: full-bleed
          photo, oversized wordmark across the sky, headline bottom-left over
          a brand-dark veil, white wave into the page. */}
      <section className="relative isolate h-svh min-h-[40rem] overflow-hidden">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          sizes="100vw"
          className="-z-30 object-cover object-[65%_center]"
        />

        {/* Decorative wordmark — the real heading is the h1 below. */}
        <p
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-24 -z-20 text-center font-sans text-[15vw] leading-none font-black tracking-tight text-white uppercase select-none animate-wordmark-in [animation-delay:0.2s] lg:top-[14svh] lg:text-[14vw]"
        >
          {key}
        </p>

        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-dark/75 via-brand-dark/35 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/35 via-transparent to-ink/50"
        />

        <Container className="relative z-20 flex h-full max-w-[80rem] flex-col justify-end pt-28 pb-16 sm:pb-20 lg:pb-24">
          <p className="inline-flex w-fit items-center gap-2 rounded-pill border border-white/40 bg-white/10 px-3 py-1.5 text-xs font-medium tracking-[0.14em] text-white uppercase backdrop-blur-sm">
            <ExperienceIcon icon={key} className="size-4" />
            {experiences.length} {experiences.length === 1 ? "experience" : "experiences"}
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-[1.08] font-semibold text-balance text-white sm:text-5xl lg:text-6xl">
            {lead && <span className="block">{lead}</span>}
            <span className="block">
              {/* Gold on the brand-dark veil, at 36px+ — allowed by rule 7. */}
              <span className="text-accent-gold">{last}</span>.
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-white/85 sm:text-lg">
            {intro}
          </p>
        </Container>

        <WaveEdge position="bottom" flat className="-bottom-px z-10 fill-white" />
      </section>

      <Container className="pt-5">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Experiences", href: "/experiences" },
            { label: title },
          ]}
        />
      </Container>

      {/* overflow-clip, not hidden, so the chapters' sticky photo column
          still sticks. */}
      <Section
        aria-labelledby="category-experiences-heading"
        className="relative isolate overflow-clip pt-10 pb-44 sm:pt-12 sm:pb-56 lg:pt-16 lg:pb-64"
      >
        {/* The category's watercolour from the experiences page, faded in
            along the bottom and closed by a white wave. */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-80 sm:h-[26rem] lg:h-[34rem]">
          <Image
            src={`/bg/experiences/${key}-base.png`}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-bottom opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/30 to-transparent" />
        </div>
        <WaveEdge position="bottom" flat className="-bottom-px fill-white" />

        <Container>
          <div className="flex flex-col items-center text-center">
            <h2
              id="category-experiences-heading"
              className="font-display text-4xl leading-[1.08] text-balance text-ink sm:text-5xl"
            >
              Choose your {title.replace(/ Experiences$/, "").toLowerCase()} experience
            </h2>

            {/* What this covers — one row of small tags; scrolls sideways
                where it can't fit. */}
            <ul
              aria-label="What this covers"
              className="-mx-4 mt-6 flex max-w-[calc(100%+2rem)] gap-1.5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:max-w-full sm:px-0"
            >
              {types.map((type) => (
                <li
                  key={type}
                  className="shrink-0 rounded-pill border border-line bg-white px-2.5 py-1 text-xs whitespace-nowrap text-ink"
                >
                  {type}
                </li>
              ))}
            </ul>
          </div>

          {experiences.length > 0 && (
            <div className="mt-12 space-y-24 sm:space-y-28 lg:mt-16 lg:space-y-32">
              {experiences.map((experience, i) => (
                <ExperienceChapter key={experience.slug} experience={experience} index={i} />
              ))}
            </div>
          )}
        </Container>
      </Section>

      <ExperienceInquiryCta light />
    </>
  );
}
