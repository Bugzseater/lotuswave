import type { Metadata } from "next";
import { ExperienceInquiryCta } from "@/components/experiences/experience-inquiry-cta";
import { ExperienceShowcase } from "@/components/experiences/experience-showcase";
import {
  EXPERIENCES_HERO_IMAGE as HERO_IMAGE,
  ExperiencesHero,
} from "@/components/experiences/experiences-hero";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Container } from "@/components/ui/container";
import { EXPERIENCE_CATEGORIES } from "@/lib/constants";
import { getExperiences } from "@/lib/data";

// TODO: switch to buildMetadata() once src/lib/seo/metadata.ts exists.
export const metadata: Metadata = {
  title: "Sri Lanka Experiences — Agro, Wellness, Culture, Nature & Food",
  description:
    "Hands-on agro experiences, Ayurveda and yoga, village life, wildlife safaris and food trails across Sri Lanka — hosted by local families and guides.",
  alternates: { canonical: "/experiences" },
  openGraph: {
    title: "Sri Lanka Experiences | LotusWave Lanka Tours",
    images: [{ url: HERO_IMAGE.src, alt: HERO_IMAGE.alt }],
  },
};

export default async function ExperiencesPage() {
  const experiences = await getExperiences();
  const categories = EXPERIENCE_CATEGORIES.map((category) => ({
    ...category,
    experiences: experiences.filter((experience) => experience.category === category.key),
  }));

  return (
    <>
      <ExperiencesHero categories={categories} />

      <Container className="pt-5">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Experiences" },
          ]}
        />
      </Container>

      {categories.map(({ key, slug, title, intro, experiences }, index) => (
        <ExperienceShowcase
          key={key}
          categoryKey={key}
          categorySlug={slug}
          title={title}
          intro={intro}
          experiences={experiences}
          index={index}
          total={categories.length}
          baseArt={`/bg/experiences/${key}-base.png`}
        />
      ))}

      <ExperienceInquiryCta light />
    </>
  );
}
