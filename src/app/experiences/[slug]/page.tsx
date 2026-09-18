import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container, Section } from "@/components/ui/container";
import { getExperienceBySlug, getExperienceSlugs } from "@/lib/data";
import { buildMetadata } from "@/lib/seo/metadata";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getExperienceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const experience = await getExperienceBySlug(slug);
  if (!experience) return {};

  return buildMetadata({
    title: experience.title,
    description: experience.excerpt,
    path: `/experiences/${experience.slug}`,
    images: experience.images,
    seo: experience.seo,
  });
}

export default async function ExperiencePage({ params }: Props) {
  const { slug } = await params;
  const experience = await getExperienceBySlug(slug);
  if (!experience) notFound();

  return (
    <Section>
      <Container>
        <h1 className="font-display text-4xl">{experience.title}</h1>
      </Container>
    </Section>
  );
}
