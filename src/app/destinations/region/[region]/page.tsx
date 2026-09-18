import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container, Section } from "@/components/ui/container";
import { REGIONS } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo/metadata";

interface Props {
  params: Promise<{ region: string }>;
}

export async function generateStaticParams() {
  return REGIONS.map(({ slug }) => ({ region: slug }));
}

function findRegion(slug: string) {
  return REGIONS.find((entry) => entry.slug === slug) ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region } = await params;
  const entry = findRegion(region);
  if (!entry) return {};

  return buildMetadata({
    title: entry.label,
    description: `Destinations across the ${entry.label} of Sri Lanka.`,
    path: `/destinations/region/${entry.slug}`,
  });
}

export default async function DestinationRegionPage({ params }: Props) {
  const { region } = await params;
  const entry = findRegion(region);
  if (!entry) notFound();

  return (
    <Section>
      <Container>
        <h1 className="font-display text-4xl">{entry.label}</h1>
      </Container>
    </Section>
  );
}
