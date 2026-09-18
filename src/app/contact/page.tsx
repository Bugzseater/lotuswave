import type { Metadata } from "next";

import { ContactForm } from "@/components/forms/contact-form";
import { Container, Section } from "@/components/ui/container";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Reach the LotusWave team in Kandy by email, phone or WhatsApp.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Section>
      <Container>
        <h1 className="font-display text-4xl">Contact</h1>
        <div className="mt-10">
          <ContactForm />
        </div>
      </Container>
    </Section>
  );
}
