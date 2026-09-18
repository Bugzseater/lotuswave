import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container, Section } from "@/components/ui/container";
import { getDestinationBySlug, getDestinationSlugs } from "@/lib/data";
import { buildMetadata } from "@/lib/seo/metadata";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getDestinationSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  if (!destination) return {};

  return buildMetadata({
    title: destination.title,
    description: destination.excerpt,
    path: `/destinations/${destination.slug}`,
    images: destination.images,
    seo: destination.seo,
  });
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  if (!destination) notFound();

  return (
    <Section>
      <Container>
        <h1 className="font-display text-4xl">{destination.title}</h1>
      </Container>
    </Section>
  );
}
