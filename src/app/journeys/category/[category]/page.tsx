import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container, Section } from "@/components/ui/container";
import { JOURNEY_CATEGORIES } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo/metadata";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return JOURNEY_CATEGORIES.map(({ slug }) => ({ category: slug }));
}

function findCategory(slug: string) {
  return JOURNEY_CATEGORIES.find((entry) => entry.slug === slug) ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const entry = findCategory(category);
  if (!entry) return {};

  return buildMetadata({
    title: entry.label,
    description: `${entry.label} through Sri Lanka with LotusWave Lanka Tours.`,
    path: `/journeys/category/${entry.slug}`,
  });
}

export default async function JourneyCategoryPage({ params }: Props) {
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
