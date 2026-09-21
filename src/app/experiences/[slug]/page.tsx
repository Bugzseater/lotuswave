import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { ExperienceIcon } from "@/components/experiences/experience-icon";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getExperienceBySlug, getExperiences } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const experiences = await getExperiences();
  return experiences.map(({ slug }) => ({ slug }));
}

// TODO: switch to buildMetadata() once src/lib/seo/metadata.ts exists.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const experience = await getExperienceBySlug(slug);
  if (!experience) return {};

  return {
    title: experience.seo.title,
    description: experience.seo.description,
    alternates: { canonical: `/experiences/${slug}` },
    openGraph: {
      title: experience.seo.title,
      description: experience.seo.description,
      images: [{ url: experience.image.src, alt: experience.image.alt }],
    },
  };
}

export default async function ExperiencePage({ params }: Props) {
  const { slug } = await params;
  const experience = await getExperienceBySlug(slug);
  if (!experience) notFound();

  const { title, summary, description, highlights, icon, image } = experience;

  return (
    <article>
      {/* Dark image hero so the transparent header's white links stay legible. */}
      <header className="relative isolate flex min-h-[70svh] items-end overflow-hidden bg-brand-dark">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-brand-dark/70" />

        <Container className="pt-36 pb-16 sm:pb-20">
          <div className="max-w-2xl text-white">
            <ExperienceIcon icon={icon} className="size-7 text-white/90" />
            <p className="mt-4 text-xs font-semibold tracking-[0.2em] uppercase">
              Signature Experience
            </p>
            <h1 className="mt-3 font-display text-5xl leading-[1.04] font-semibold text-balance text-white sm:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="mt-5 max-w-lg text-base text-pretty text-white/85 sm:text-lg">
              {summary}
            </p>
          </div>
        </Container>
      </header>

      <Section>
        <Container className="max-w-3xl">
          <p className="font-display text-2xl leading-snug text-pretty text-ink sm:text-3xl">
            {description}
          </p>

          <h2 className="mt-12 font-display text-3xl text-ink sm:text-4xl">
            What you&rsquo;ll experience
          </h2>
          <ul className="mt-6 space-y-4">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 text-base leading-relaxed text-ink">
                <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-brand" />
                {highlight}
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-col gap-4 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
            <ButtonLink href="/plan-your-trip" size="lg">
              Plan My Journey
            </ButtonLink>
            <Link
              href="/#experiences"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-dark"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Browse all signature experiences
            </Link>
          </div>
        </Container>
      </Section>
    </article>
  );
}
