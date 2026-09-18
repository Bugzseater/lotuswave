import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container, Section } from "@/components/ui/container";
import { getStoryBySlug, getStorySlugs } from "@/lib/data";
import { buildMetadata } from "@/lib/seo/metadata";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getStorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) return {};

  return buildMetadata({
    title: story.title,
    description: story.excerpt,
    path: `/travel-stories/${story.slug}`,
    images: story.images,
    seo: story.seo,
    type: "article",
    publishedTime: story.publishedAt,
    modifiedTime: story.updatedAt,
  });
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) notFound();

  return (
    <Section>
      <Container>
        <h1 className="font-display text-4xl">{story.title}</h1>
      </Container>
    </Section>
  );
}
