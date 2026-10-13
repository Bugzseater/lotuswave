import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ClipboardCheck,
  Cookie,
  CreditCard,
  HeartPulse,
  Leaf,
  Mail,
  MessageCircle,
  RotateCcw,
  Scale,
  ShieldCheck,
  Siren,
  Umbrella,
  type LucideIcon,
} from "lucide-react";
import { Eyebrow } from "@/components/about/eyebrow";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { RichText } from "@/components/stories/rich-text";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { WaveEdge } from "@/components/ui/wave-edge";
import { COMPANY, POLICY_GROUPS, SITE, WHATSAPP_URL } from "@/lib/constants";
import { getPolicies, getPolicyBySlug } from "@/lib/data";
import { absoluteUrl, cn, formatDate, slugify } from "@/lib/utils";
import type { Policy, PolicyIcon } from "@/types";

export const POLICY_ICON: Record<PolicyIcon, LucideIcon> = {
  terms: Scale,
  booking: ClipboardCheck,
  cancellation: RotateCcw,
  payment: CreditCard,
  privacy: ShieldCheck,
  cookie: Cookie,
  responsible: Leaf,
  health: HeartPulse,
  insurance: Umbrella,
  emergency: Siren,
};

/** "01", "02" … for the section numbers. */
const counter = (i: number) => String(i + 1).padStart(2, "0");

// TODO: switch to buildMetadata() once src/lib/seo/metadata.ts exists.
/** Metadata for a policy route. Each route file passes its own slug. */
export async function policyMetadata(slug: string): Promise<Metadata> {
  const policy = await getPolicyBySlug(slug);
  if (!policy) return {};

  return {
    title: policy.seo.title,
    description: policy.seo.description,
    alternates: { canonical: `/${slug}` },
    openGraph: { title: policy.seo.title, description: policy.seo.description },
  };
}

/**
 * Every legal and travel-information page. Each lives in its own route folder
 * (`app/privacy-policy`, …) so the URLs stay at the root without a catch-all
 * segment; this component does the rest.
 *
 * A brand hero carries the title — the header's white links need a dark
 * ground to start on — then a numbered "On this page" list, pinned beside the
 * text on wide screens, and the sections themselves. Every other policy is
 * listed at the foot.
 */
export async function PolicyPage({ slug }: { slug: string }) {
  const [policy, policies] = await Promise.all([getPolicyBySlug(slug), getPolicies()]);
  if (!policy) notFound();

  const { title, group, summary, updatedAt, sections, seo } = policy;
  const Icon = POLICY_ICON[policy.icon];
  const groupTitle = POLICY_GROUPS.find(({ key }) => key === group)?.title;
  const anchored = sections.map((section) => ({ ...section, id: slugify(section.heading) }));
  const url = absoluteUrl(`/${slug}`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: title,
        description: seo.description,
        url,
        dateModified: updatedAt,
        isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <article>
        {/* ── Hero ── */}
        <header className="relative isolate overflow-hidden bg-gradient-to-br from-brand to-brand-dark pt-32 pb-24 sm:pt-40 sm:pb-32 lg:pt-44 lg:pb-36">
          <Icon
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -bottom-6 -z-10 size-72 text-white/[0.07] sm:size-96 lg:right-[6%]"
            strokeWidth={1}
          />

          <Container>
            <Breadcrumbs onBrand items={[{ label: "Home", href: "/" }, { label: title }]} />
            {groupTitle && (
              <Eyebrow onBrand className="mt-10">
                {groupTitle}
              </Eyebrow>
            )}
            <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.08] font-semibold text-balance text-white sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-pretty text-white/90 sm:text-lg">
              {summary}
            </p>
            <p className="mt-6 text-sm text-white/75">
              Last updated <time dateTime={updatedAt}>{formatDate(updatedAt)}</time>
            </p>
          </Container>

          <WaveEdge position="bottom" flat className="-bottom-px fill-white" />
        </header>

        {/* ── Contents + text ── */}
        <div className="pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24">
          <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <nav
              aria-label="On this page"
              className="self-start rounded-card bg-section p-5 sm:p-6 lg:sticky lg:top-28 lg:col-span-4 xl:col-span-3"
            >
              <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">On this page</p>
              <ol className="mt-4 space-y-0.5">
                {anchored.map(({ id, heading }, i) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="flex gap-3 py-1.5 text-sm leading-snug text-ink/75 transition-colors duration-200 ease-out hover:text-brand"
                    >
                      <span aria-hidden="true" className="w-5 shrink-0 font-display text-brand/70 italic tabular-nums">
                        {counter(i)}
                      </span>
                      {heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="min-w-0 lg:col-span-8 xl:col-span-9">
              <div className="max-w-[46rem] divide-y divide-line">
                {anchored.map(({ id, heading, body, points }, i) => (
                  <section
                    key={id}
                    id={id}
                    aria-labelledby={`${id}-heading`}
                    className="scroll-mt-28 py-8 first:pt-0 sm:py-10"
                  >
                    <h2
                      id={`${id}-heading`}
                      className="flex items-baseline gap-3 font-display text-2xl leading-tight text-ink sm:text-3xl"
                    >
                      <span aria-hidden="true" className="text-base text-brand/70 italic tabular-nums sm:text-lg">
                        {counter(i)}
                      </span>
                      {heading}
                    </h2>

                    {body.map((paragraph, j) => (
                      <p key={j} className="mt-4 text-base leading-[1.8] text-pretty text-ink/85">
                        <RichText text={paragraph} />
                      </p>
                    ))}

                    {points && points.length > 0 && (
                      <ul className="mt-5 space-y-3 text-base leading-[1.7] text-pretty text-ink/85">
                        {points.map((point) => (
                          <li key={point} className="flex gap-3.5">
                            <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-pill bg-brand" />
                            <span>
                              <RichText text={point} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>

              <aside
                aria-labelledby="policy-questions-heading"
                className="mt-6 max-w-[46rem] rounded-card border border-line p-6 sm:p-8"
              >
                <h2 id="policy-questions-heading" className="font-display text-2xl leading-tight text-ink">
                  Questions about this page?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-pretty text-ink/75 sm:text-base">
                  Write to us or send a WhatsApp message — a member of our team
                  replies personally, usually within one working day.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <ButtonLink
                    href={`mailto:${COMPANY.email}?subject=${encodeURIComponent(`Question about: ${title}`)}`}
                  >
                    <Mail aria-hidden="true" className="size-4" strokeWidth={1.75} />
                    Email our team
                  </ButtonLink>
                  <ButtonLink href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" variant="secondary">
                    <MessageCircle aria-hidden="true" className="size-4" strokeWidth={1.75} />
                    WhatsApp Us
                  </ButtonLink>
                </div>
              </aside>
            </div>
          </Container>
        </div>
      </article>

      <MorePolicies policies={policies} current={slug} />
    </>
  );
}

/**
 * Every policy in its group, the current one marked. Last section before the
 * footer, which is pulled up over its foot — hence the deep bottom padding.
 */
function MorePolicies({ policies, current }: { policies: Policy[]; current: string }) {
  return (
    <section aria-labelledby="more-policies-heading" className="pb-36 sm:pb-48 lg:pb-60">
      <Container>
        <div className="border-t border-line pt-14 sm:pt-16 lg:pt-20">
          <h2 id="more-policies-heading" className="font-display text-3xl leading-tight text-ink sm:text-4xl">
            Policies and travel information
          </h2>

          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-16">
            {POLICY_GROUPS.map((group) => {
              const items = policies.filter((policy) => policy.group === group.key);
              if (items.length === 0) return null;

              return (
                <div key={group.key}>
                  <h3 className="font-sans text-xs font-semibold tracking-[0.2em] text-brand uppercase">
                    {group.title}
                  </h3>
                  <ul className="mt-4 divide-y divide-line border-y border-line">
                    {items.map((item) => {
                      const ItemIcon = POLICY_ICON[item.icon];
                      const isCurrent = item.slug === current;
                      return (
                        <li key={item.slug}>
                          <Link
                            href={`/${item.slug}`}
                            aria-current={isCurrent ? "page" : undefined}
                            className="group flex items-center gap-4 py-4"
                          >
                            <span
                              className={cn(
                                "grid size-10 shrink-0 place-items-center rounded-pill transition-colors duration-200 ease-out",
                                isCurrent
                                  ? "bg-brand text-white"
                                  : "bg-brand-light text-brand group-hover:bg-brand group-hover:text-white",
                              )}
                            >
                              <ItemIcon aria-hidden="true" className="size-4" strokeWidth={1.75} />
                            </span>
                            <span
                              className={cn(
                                "flex-1 text-base font-medium transition-colors duration-200 ease-out",
                                isCurrent ? "text-brand" : "text-ink group-hover:text-brand",
                              )}
                            >
                              {item.title}
                            </span>
                            <ArrowRight
                              aria-hidden="true"
                              className="size-4 shrink-0 text-brand transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                            />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
