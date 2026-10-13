import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { WaveEdge } from "@/components/ui/wave-edge";
import type { Story } from "@/types";
import { STORY_CATEGORY_ICON, storyCategory, storyCategoryHref } from "./story-category";

/**
 * Article opener: the story's photo full-bleed under a brand-dark veil, with
 * the category, title and standfirst bottom-left in white. The byline opens
 * the body instead.
 */
export function StoryHero({ story }: { story: Story }) {
  const { title, excerpt, category, image } = story;
  const Icon = STORY_CATEGORY_ICON[category];
  const { title: categoryTitle, slug: categorySlug } = storyCategory(category);

  return (
    <section className="relative isolate min-h-[36rem] overflow-hidden sm:min-h-[40rem] lg:h-[85svh]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="-z-30 object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-brand-dark/45" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/40 via-transparent to-ink/70"
      />

      <Container className="relative z-20 flex h-full min-h-[inherit] max-w-[80rem] flex-col justify-end pt-32 pb-20 sm:pb-24 lg:pb-28">
        <Link
          href={storyCategoryHref(categorySlug)}
          className="inline-flex h-9 items-center gap-2 self-start rounded-pill border border-white/40 bg-white/10 px-3.5 text-xs font-semibold tracking-[0.14em] text-white uppercase backdrop-blur-sm transition-colors duration-200 ease-out hover:bg-white hover:text-brand focus-visible:outline-white"
        >
          <Icon aria-hidden="true" className="size-4" strokeWidth={1.75} />
          {categoryTitle}
        </Link>

        <h1 className="mt-5 max-w-4xl font-display text-4xl leading-[1.08] font-semibold text-balance text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-pretty text-white/90 sm:text-lg">
          {excerpt}
        </p>
      </Container>

      <WaveEdge position="bottom" flat className="-bottom-px z-10 fill-white" />
    </section>
  );
}
