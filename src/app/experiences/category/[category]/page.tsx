import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container, Section } from "@/components/ui/container";
import { EXPERIENCE_CATEGORIES, EXPERIENCE_THEMES } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo/metadata";

interface Props {
  params: Promise<{ category: string }>;
}

/** Categories plus the two theme-level entries the home hero links to. */
const ENTRIES = [...EXPERIENCE_CATEGORIES, ...EXPERIENCE_THEMES];

export async function generateStaticParams() {
  return ENTRIES.map(({ slug }) => ({ category: slug }));
}

function findCategory(slug: string) {
  return ENTRIES.find((entry) => entry.slug === slug) ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const entry = findCategory(category);
  if (!entry) return {};

  return buildMetadata({
    title: entry.label,
    description: `${entry.label} experiences across Sri Lanka with LotusWave Lanka Tours.`,
    path: `/experiences/category/${entry.slug}`,
  });
}

export default async function ExperienceCategoryPage({ params }: Props) {
  const { category } = await params;
  const entry = findCategory(category);
  if (!entry) notFound();

  return (
    <Section>
      <Container>
        <h1 className="font-display text-4xl">{entry.label}</h1>
      </Container>
    </Section>
  );
}
