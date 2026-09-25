import type { Metadata } from "next";
import { ContactFormSection } from "@/components/contact/contact-form-section";
import { ContactHero } from "@/components/contact/contact-hero";
import { GetInTouch } from "@/components/contact/get-in-touch";

// TODO: switch to buildMetadata() once src/lib/seo/metadata.ts exists.
export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact LotusWave Lanka Tours by phone, WhatsApp, email or our contact form. Our Sri Lankan team replies personally to help plan your agro and wellness journey.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact LotusWave Lanka Tours",
    images: [{ url: "/bg/contactUs/hero-peak.png", alt: "A lone mountain peak rising from morning mist above tea terraces in Sri Lanka's hill country" }],
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <GetInTouch />
      <ContactFormSection />
    </>
  );
}
