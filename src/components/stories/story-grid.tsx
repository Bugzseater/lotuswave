import type { StorySummary } from "@/types";
import { StoryCard } from "./story-card";

/** One column on phones, two on tablets, three from lg. */
export function StoryGrid({
  stories,
  headingLevel,
}: {
  stories: StorySummary[];
  headingLevel?: "h2" | "h3";
}) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {stories.map((story) => (
        <li key={story.slug}>
          <StoryCard story={story} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}
