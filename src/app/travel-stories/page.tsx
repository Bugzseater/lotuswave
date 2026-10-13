import { Suspense } from "react";
import type { Metadata } from "next";
import { JourneysInquiryCta } from "@/components/journeys/journeys-inquiry-cta";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { StoriesBrowser, StoriesBrowserFallback } from "@/components/stories/stories-browser";
import { STORIES_HERO_IMAGE as HERO_IMAGE, StoriesHero } from "@/components/stories/stories-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getStories, toStorySummary } from "@/lib/data";

// TODO: switch to buildMetadata() once src/lib/seo/metadata.ts exists.
export const metadata: Metadata = {
  title: "Sri Lanka Travel Blog — Agro Tourism, Wellness & Travel Guides",
  description:
    "Travel stories and guides from Sri Lanka: agro tourism and farm stays, Ayurveda and wellness travel, itineraries, the best time to visit, food and culture.",
  alternates: { canonical: "/travel-stories" },
  openGraph: {
    title: "Travel Stories | LotusWave Lanka Tours",
    images: [{ url: HERO_IMAGE.src, alt: HERO_IMAGE.alt }],
  },
};

export default async function TravelStoriesPage() {
  const stories = await getStories();
  // Only what the cards and filters use crosses to the client.
  const summaries = stories.map(toStorySummary);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        name: "LotusWave Travel Stories",
        url: "/travel-stories",
        blogPost: stories.map((story) => ({
          "@type": "BlogPosting",
          headline: story.title,
          url: `/travel-stories/${story.slug}`,
          datePublished: story.publishedAt,
          image: story.image.src,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "/" },
          { "@type": "ListItem", position: 2, name: "Travel Stories", item: "/travel-stories" },
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

      <StoriesHero
        title="Sri Lanka Travel Stories"
        tagline="Notes from the roots of Sri Lanka"
        hideText
      />

      <Container className="pt-5">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Travel Stories" }]} />
      </Container>

      {/* overflow-clip, not hidden, so the sticky filter row still sticks. */}
      <Section
        id="stories"
        aria-label="Travel stories"
        className="scroll-mt-24 overflow-clip pt-10 pb-16 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24"
      >
        <Container>
          <Suspense fallback={<StoriesBrowserFallback stories={summaries} />}>
            <StoriesBrowser stories={summaries} />
          </Suspense>
        </Container>
      </Section>

      <JourneysInquiryCta />
    </>
  );
}
