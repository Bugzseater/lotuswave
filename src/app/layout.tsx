import type { Metadata } from "next";
import { Figtree, Fraunces } from "next/font/google";
import { BackToTop } from "@/components/layout/back-to-top";
// Two footers live side by side while the design is settled: `FooterScenic`
// leads with the hill-country photograph, `Footer` is the plain white one.
// Swap the element below to compare them.
import { FooterScenic } from "@/components/layout/footer-scenic";
import { Header } from "@/components/layout/header";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { SITE } from "@/lib/constants";
import "@/styles/globals.css";

// Variable font: every weight comes in one file. `SOFT` rounds the
// letterforms (set in globals.css); `opsz` lets large display sizes draw
// finer detail than body sizes.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
  display: "swap",
});

// Variable font — 300 is used for airy supporting copy over imagery (the
// hero standfirst), 400–700 everywhere else.
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Authentic Sri Lankan journeys through agriculture, wellness, nature and local communities—personally designed around you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${figtree.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <FooterScenic />
        <BackToTop />
        <WhatsAppButton />
      </body>
    </html>
  );
}
