import type { Metadata } from "next";
import Image from "next/image";
import { Eyebrow } from "@/components/about/eyebrow";
import { ExperienceIcon } from "@/components/experiences/experience-icon";
import { ExperienceInquiryCta } from "@/components/experiences/experience-inquiry-cta";
import { ExperienceTile } from "@/components/experiences/experience-tile";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { EXPERIENCE_CATEGORIES } from "@/lib/constants";
import { getExperiences } from "@/lib/data";
import { cn } from "@/lib/utils";

const HERO_IMAGE = {
  src: "https://images.unsplash.com/photo-1544015759-237f87d55ef3?auto=format&fit=crop&w=2000&q=80",
  alt: "Terraced green tea plantations curving over the hills",
};

// TODO: switch to buildMetadata() once src/lib/seo/metadata.ts exists.
export const metadata: Metadata = {
  title: "Sri Lanka Experiences — Agro, Wellness, Culture, Nature & Food",
  description:
    "Hands-on agro experiences, Ayurveda and yoga, village life, wildlife safaris and food trails across Sri Lanka — hosted by local families and guides.",
  alternates: { canonical: "/experiences" },
  openGraph: {
    title: "Sri Lanka Experiences | LotusWave Lanka Tours",
    images: [{ url: HERO_IMAGE.src, alt: HERO_IMAGE.alt }],
  },
};

export default async function ExperiencesPage() {
  const experiences = await getExperiences();
  const categories = EXPERIENCE_CATEGORIES.map((category) => ({
    ...category,
    experiences: experiences.filter((experience) => experience.category === category.key),
  }));

  return (
    <>
      {/* Dark image hero so the transparent header's white links stay legible. */}
      <header className="relative isolate flex min-h-[75svh] items-end overflow-hidden bg-brand-dark">
        <Image
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-brand-dark/70" />

        <Container className="pt-36 pb-12 sm:pb-16">
          <div className="max-w-3xl">
            <Eyebrow onBrand>Experiences</Eyebrow>
            <h1 className="mt-5 font-display text-5xl leading-[1.04] font-semibold text-balance text-white sm:text-6xl lg:text-7xl">
              Sri Lanka Experiences, From Its Roots
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-white/85 sm:text-lg">
              Farms and tea estates, Ayurveda and yoga, village kitchens and
              leopard country. Choose one, or let us weave several into a
              journey shaped around you.
            </p>
          </div>

          <nav aria-label="Experience categories" className="mt-10">
            <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
              {categories.map(({ key, title }) => (
                <li key={key} className="shrink-0">
                  <a
                    href={`#${key}`}
                    className="inline-flex h-11 items-center gap-2 rounded-pill border border-white/40 bg-white/10 px-4 text-sm font-medium text-white backdrop-blur-sm transition-colors duration-200 ease-out hover:bg-white hover:text-brand focus-visible:outline-white"
                  >
                    <ExperienceIcon icon={key} className="size-4" />
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </header>

      {categories.map(({ key, title, intro, types, experiences }, index) => (
        <Section
          key={key}
          id={key}
          aria-labelledby={`${key}-heading`}
          className={cn("scroll-mt-20", index % 2 === 1 && "bg-section")}
        >
          <Container>
            <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
              <div>
                <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-brand uppercase">
                  <ExperienceIcon icon={key} className="size-5" />
                  {String(index + 1).padStart(2, "0")} / {String(categories.length).padStart(2, "0")}
                </p>
                <h2
                  id={`${key}-heading`}
                  className="mt-4 font-display text-4xl leading-[1.08] text-balance text-ink sm:text-5xl"
                >
                  {title}
                </h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-muted sm:text-lg">
                  {intro}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold tracking-[0.14em] text-ink uppercase">
                  What this covers
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {types.map((type) => (
                    <li
                      key={type}
                      className="rounded-pill border border-line bg-white px-3 py-1.5 text-sm text-ink"
                    >
                      {type}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {experiences.length > 0 && (
              <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
                {experiences.map((experience) => (
                  <li key={experience.slug}>
                    <ExperienceTile {...experience} />
                  </li>
                ))}
              </ul>
            )}
          </Container>
        </Section>
      ))}

      <ExperienceInquiryCta />
    </>
  );
}
