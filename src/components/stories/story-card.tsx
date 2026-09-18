import Link from "next/link";

import { Card, CardBody } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import type { Story } from "@/types";

/** Placeholder story card. */
export function StoryCard({ story }: { story: Story }) {
  return (
    <Card>
      <CardBody>
        <h3 className="font-display text-ink text-xl">
          <Link
            href={`/travel-stories/${story.slug}`}
            className="hover:text-brand transition-colors"
          >
            {story.title}
          </Link>
        </h3>
        <p className="text-muted mt-2 text-sm">{story.excerpt}</p>
        <p className="text-muted mt-4 text-sm">
          <time dateTime={story.publishedAt}>
            {formatDate(story.publishedAt)}
          </time>{" "}
          · {story.readingMinutes} min read
        </p>
      </CardBody>
    </Card>
  );
}
