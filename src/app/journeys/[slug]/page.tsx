import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container, Section } from "@/components/ui/container";
import { getJourneyBySlug, getJourneySlugs } from "@/lib/data";
import { buildMetadata } from "@/lib/seo/metadata";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getJourneySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const journey = await getJourneyBySlug(slug);
  if (!journey) return {};

  return buildMetadata({
    title: journey.title,
    description: journey.excerpt,
    path: `/journeys/${journey.slug}`,
    images: journey.images,
    seo: journey.seo,
  });
}

export default async function JourneyPage({ params }: Props) {
  const { slug } = await params;
  const journey = await getJourneyBySlug(slug);
  if (!journey) notFound();

  return (
    <Section>
      <Container>
        <h1 className="font-display text-4xl">{journey.title}</h1>
      </Container>
    </Section>
  );
}
