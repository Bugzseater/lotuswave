import Link from "next/link";
import { Flower2, Sprout } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardBody } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import type { Journey } from "@/types";

/** Placeholder journey card. Theme shows as an icon, not as a colour scheme. */
export function JourneyCard({ journey }: { journey: Journey }) {
  const isAgro = journey.theme === "agro";
  const ThemeIcon = isAgro ? Sprout : Flower2;

  return (
    <Card>
      <CardBody>
        <Badge variant={isAgro ? "agro" : "brand"}>
          <ThemeIcon className="size-3.5" aria-hidden />
          {isAgro ? "Agro" : "Wellness"}
        </Badge>
        <h3 className="font-display text-ink mt-3 text-xl">
          <Link
            href={`/journeys/${journey.slug}`}
            className="hover:text-brand transition-colors"
          >
            {journey.title}
          </Link>
        </h3>
        <p className="text-muted mt-2 text-sm">{journey.excerpt}</p>
        <p className="text-muted mt-4 text-sm">
          {journey.duration.label} · from{" "}
          {formatPrice(journey.priceFrom.amount, journey.priceFrom.currency)}{" "}
          {journey.priceFrom.unit}
        </p>
      </CardBody>
    </Card>
  );
}
