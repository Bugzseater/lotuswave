import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container, Section } from "@/components/ui/container";
import { FOOTER_LEGAL_NAV } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo/metadata";

interface Props {
  params: Promise<{ slug: string }>;
}

/**
 * Legal pages are driven off FOOTER_LEGAL_NAV for now. When the copy is ready
 * these move into Firestore alongside the rest of the content.
 */
function findLegalPage(slug: string) {
  const entry = FOOTER_LEGAL_NAV.find((item) => item.href === `/legal/${slug}`);
  return entry ?? null;
}

export async function generateStaticParams() {
  return FOOTER_LEGAL_NAV.map((item) => ({
    slug: item.href.replace("/legal/", ""),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = findLegalPage(slug);
  if (!entry) return {};

  return buildMetadata({
    title: entry.label,
    description: `${entry.label} for LotusWave Lanka Tours.`,
    path: entry.href,
  });
}

export default async function LegalPage({ params }: Props) {
  const { slug } = await params;
  const entry = findLegalPage(slug);
  if (!entry) notFound();

  return (
    <Section>
      <Container className="max-w-3xl">
        <h1 className="font-display text-4xl">{entry.label}</h1>
      </Container>
    </Section>
  );
}
