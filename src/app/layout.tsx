import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL } from "@/lib/constants";
import { getSettings } from "@/lib/data";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";

import "@/styles/globals.css";

/** Display face — headings, pull quotes, anything set large. */
const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

/** UI face — body copy, navigation, buttons, forms. */
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: settings.seo.metaTitle ?? settings.siteName,
      template: `%s | ${settings.siteName}`,
    },
    description: settings.seo.metaDescription ?? settings.description,
    keywords: settings.seo.keywords,
    applicationName: settings.siteName,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: settings.siteName,
      locale: "en_GB",
      url: settings.url,
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSettings();

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cormorantGaramond.variable} ${manrope.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <Header phone={settings.contact.phone} />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <JsonLd schema={[organizationSchema(settings), websiteSchema(settings)]} />
      </body>
    </html>
  );
}
