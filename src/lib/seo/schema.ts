import { absoluteUrl } from "@/lib/seo/metadata";
import type { Experience, Journey, SiteSettings, Story } from "@/types";

/** A JSON-LD node — kept loose on purpose, it is serialised straight to the page. */
export type JsonLdSchema = Record<string, unknown>;

export function organizationSchema(settings: SiteSettings): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": absoluteUrl("/#organization"),
    name: settings.siteName,
    description: settings.description,
    url: settings.url,
    logo: absoluteUrl(settings.logo.url),
    email: settings.contact.email,
    telephone: settings.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.contact.addressLines.join(", "),
      addressLocality: settings.contact.city,
      addressCountry: settings.contact.country,
    },
    sameAs: Object.values(settings.social).filter(Boolean),
  };
}

export function websiteSchema(settings: SiteSettings): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: settings.siteName,
    url: settings.url,
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

export interface BreadcrumbEntry {
  name: string;
  path: string;
}

export function breadcrumbSchema(entries: BreadcrumbEntry[]): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: absoluteUrl(entry.path),
    })),
  };
}

export function touristTripSchema(item: Journey | Experience): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: item.title,
    description: item.excerpt,
    image: item.images.map((image) => image.url),
    provider: { "@id": absoluteUrl("/#organization") },
    offers: {
      "@type": "Offer",
      price: item.priceFrom.amount,
      priceCurrency: item.priceFrom.currency,
      availability: "https://schema.org/InStock",
    },
  };
}

export function articleSchema(story: Story): JsonLdSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: story.title,
    description: story.excerpt,
    image: story.images.map((image) => image.url),
    datePublished: story.publishedAt,
    dateModified: story.updatedAt,
    author: { "@type": "Person", name: story.author.name },
    publisher: { "@id": absoluteUrl("/#organization") },
    mainEntityOfPage: absoluteUrl(`/travel-stories/${story.slug}`),
  };
}
