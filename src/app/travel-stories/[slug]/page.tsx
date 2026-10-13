import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { JourneysInquiryCta } from "@/components/journeys/journeys-inquiry-cta";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { storyCategory } from "@/components/stories/story-category";
import { StoryBody } from "@/components/stories/story-body";
import { StoryHero } from "@/components/stories/story-hero";
import { StorySidebar } from "@/components/stories/story-sidebar";
import { Container } from "@/components/ui/container";
import { WaveEdge } from "@/components/ui/wave-edge";
import { SITE } from "@/lib/constants";
import {
  getJourneysBySlugs,
  getRelatedStories,
  getStories,
  getStoryBySlug,
  toStorySummary,
} from "@/lib/data";
import { absoluteUrl } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const stories = await getStories();
  return stories.map(({ slug }) => ({ slug }));
}

// TODO: switch to buildMetadata() once src/lib/seo/metadata.ts exists.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) return {};

  return {
    title: story.seo.title,
    description: story.seo.description,
    alternates: { canonical: `/travel-stories/${slug}` },
    openGraph: {
      type: "article",
      title: story.seo.title,
      description: story.seo.description,
      publishedTime: story.publishedAt,
      modifiedTime: story.updatedAt ?? story.publishedAt,
      images: [{ url: story.image.src, alt: story.image.alt }],
    },
  };
}

export default async function StoryPage({ params }: Props) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) notFound();

  const { title, category, author, publishedAt, updatedAt, image, seo } = story;
  const { title: categoryTitle } = storyCategory(category);
  const [journeys, related] = await Promise.all([
    getJourneysBySlugs(story.relatedJourneys),
    getRelatedStories(story),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: title,
        description: seo.description,
        image: absoluteUrl(image.src),
        datePublished: publishedAt,
        dateModified: updatedAt ?? publishedAt,
        author: { "@type": "Organization", name: author },
        publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
        articleSection: categoryTitle,
        mainEntityOfPage: absoluteUrl(`/travel-stories/${slug}`),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Travel Stories", item: absoluteUrl("/travel-stories") },
          { "@type": "ListItem", position: 3, name: title, item: absoluteUrl(`/travel-stories/${slug}`) },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <article>
        <StoryHero story={story} />

        <Container className="pt-5">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Travel Stories", href: "/travel-stories" },
              { label: title },
            ]}
          />
        </Container>

        {/* ── Body ── the article on the left; journeys and more stories pinned
            on the right on wide screens, following the article on phones.
            overflow-clip, not hidden, so the sidebar still sticks. */}
        <div className="relative isolate overflow-clip pb-28 sm:pb-36 lg:pb-40">
          {/* The hero photo again, faded in along the bottom and closed by
              the CTA's green-mist wave — as on the journeys page. */}
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-80 sm:h-[26rem] lg:h-[34rem]">
            <Image src={image.src} alt="" fill sizes="100vw" className="object-cover object-bottom opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/30 to-transparent" />
          </div>
          <WaveEdge position="bottom" flat className="-bottom-px fill-green-mist" />

          <Container className="grid gap-16 pt-10 sm:pt-12 lg:grid-cols-12 lg:gap-12 lg:pt-16 xl:gap-16">
            <div className="lg:col-span-8">
              <StoryBody story={story} />
            </div>
            <aside aria-label="More from LotusWave" className="lg:col-span-4">
              <StorySidebar journeys={journeys} stories={related.map(toStorySummary)} />
            </aside>
          </Container>
        </div>
      </article>

      <JourneysInquiryCta />
    </>
  );
}
