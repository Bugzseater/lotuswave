import Link from "next/link";
import { Flower2, Sprout } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardBody } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import type { Experience } from "@/types";

/**
 * Placeholder experience card. Imagery, hover motion and the full information
 * hierarchy land with the page design work.
 *
 * Agro and wellness are told apart by icon, not by colour — the card itself is
 * the same on both. The only concession is the accent-green badge on agro.
 */
export function ExperienceCard({ experience }: { experience: Experience }) {
  const isAgro = experience.theme === "agro";
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
            href={`/experiences/${experience.slug}`}
            className="hover:text-brand transition-colors"
          >
            {experience.title}
          </Link>
        </h3>
        <p className="text-muted mt-2 text-sm">{experience.excerpt}</p>
        <p className="text-muted mt-4 text-sm">
          {experience.duration.label} · from{" "}
          {formatPrice(
            experience.priceFrom.amount,
            experience.priceFrom.currency,
          )}{" "}
          {experience.priceFrom.unit}
        </p>
      </CardBody>
    </Card>
  );
}
