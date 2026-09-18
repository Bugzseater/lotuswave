import Link from "next/link";

import { Container, Section } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Section>
      <Container>
        <h1 className="font-display text-4xl">Page not found</h1>
        <p className="text-muted mt-4">
          That page has moved or never existed. Try the{" "}
          <Link href="/journeys" className="text-brand underline">
            journeys
          </Link>{" "}
          instead.
        </p>
      </Container>
    </Section>
  );
}
