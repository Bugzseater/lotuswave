import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { ExperienceCategoryView } from "@/components/experiences/experience-category-view";
import { EXPERIENCE_CATEGORIES } from "@/lib/constants";
import { getExperienceBySlug, getExperiences } from "@/lib/data";
import type { ExperienceCategoryKey } from "@/types";

type Props = { params: Promise<{ slug: string }> };

/**
 * One page per category: `/experiences/agro-experience`. Experiences have
 * no page of their own — each is a full chapter on its category page, so an
 * old `/experiences/<experience>` link redirects to that chapter.
 */
const categoryBySlug = (slug: string) => EXPERIENCE_CATEGORIES.find((c) => c.slug === slug);

/** Alt text for each category's hero, `/bg/experiences/<key>-hero.png`. */
const CATEGORY_HERO_ALT: Record<ExperienceCategoryKey, string> = {
  agro: "A Sri Lankan farmer planting rice seedlings in a flooded paddy field at sunrise, misty hills behind",
  wellness: "A woman meditating on a wooden deck above a misty rainforest valley in Sri Lanka at dawn",
  culture: "A village woman weaving a palm-leaf mat on the veranda of a clay-tiled house in rural Sri Lanka",
  nature: "A leopard resting on a granite boulder in Yala National Park, Sri Lanka, in warm evening light",
  food: "Hands serving rice and colourful curries on a banana leaf in a Sri Lankan village kitchen",
};

export function generateStaticParams() {
  return EXPERIENCE_CATEGORIES.map(({ slug }) => ({ slug }));
}

// TODO: switch to buildMetadata() once src/lib/seo/metadata.ts exists.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) return {};

  const title = `${category.title} in Sri Lanka`;
  return {
    title,
    description: category.intro,
    alternates: { canonical: `/experiences/${slug}` },
    openGraph: { title: `${title} | LotusWave Lanka Tours`, description: category.intro },
  };
}

export default async function ExperienceCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = categoryBySlug(slug);

  if (!category) {
    const experience = await getExperienceBySlug(slug);
    const home = experience && EXPERIENCE_CATEGORIES.find((c) => c.key === experience.category);
    if (!experience || !home) notFound();
    permanentRedirect(`/experiences/${home.slug}#${experience.slug}`);
  }

  const experiences = (await getExperiences()).filter((e) => e.category === category.key);

  // The category's own hero once its file is in place; until then, the
  // first experience's photo.
  const heroSrc = `/bg/experiences/${category.key}-hero.png`;
  const heroImage = existsSync(path.join(process.cwd(), "public", heroSrc))
    ? { src: heroSrc, alt: CATEGORY_HERO_ALT[category.key] }
    : experiences[0].image;

  return <ExperienceCategoryView category={category} experiences={experiences} heroImage={heroImage} />;
}
