import Link from "next/link";

import { Card, CardBody } from "@/components/ui/card";
import type { Destination } from "@/types";

/** Placeholder destination card. */
export function DestinationCard({
  destination,
}: {
  destination: Destination;
}) {
  return (
    <Card>
      <CardBody>
        <h3 className="font-display text-ink text-xl">
          <Link
            href={`/destinations/${destination.slug}`}
            className="hover:text-brand transition-colors"
          >
            {destination.title}
          </Link>
        </h3>
        <p className="text-muted mt-2 text-sm">{destination.excerpt}</p>
      </CardBody>
    </Card>
  );
}
