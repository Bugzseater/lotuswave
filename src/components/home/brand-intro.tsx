import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Section } from "@/components/ui/section";
import sriLankaMap from "../../../public/images/sri_lanka.jpeg";

/**
 * Section 02 — what the company is. The headline sits centred; below it the
 * island map faces the company story and a link.
 */
export function BrandIntro() {
  return (
    <Section aria-labelledby="brand-intro-heading" className="pt-10 pb-10 sm:pt-14 sm:pb-14 lg:pt-16 lg:pb-16">
      <Container>
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p
              data-reveal
              className="flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.2em] text-brand uppercase"
            >
              <span aria-hidden="true" className="h-px w-10 bg-brand" />
              Who We Are
              <span aria-hidden="true" className="h-px w-10 bg-brand" />
            </p>
            <h2
              id="brand-intro-heading"
              data-reveal
              className="mt-5 font-display text-4xl leading-[1.08] text-balance text-ink sm:text-5xl lg:text-6xl"
            >
              More Than a Holiday.{" "}
              <em className="block font-medium text-brand">A Deeper Connection.</em>
            </h2>
          </div>

          <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div data-reveal className="lg:col-span-5">
              <Image
                src={sriLankaMap}
                alt="Illustrated travel map of Sri Lanka marking national parks, ancient cities, hill country, beaches and wildlife"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="mx-auto h-auto w-full max-w-md"
              />
            </div>

            <div data-reveal className="lg:col-span-7">
              <div className="space-y-5 text-base leading-relaxed text-pretty text-muted sm:text-lg">
                <p>
                  We are a Sri Lankan inbound travel company creating
                  thoughtfully designed journeys for travellers who want to
                  experience more than the usual holiday.
                </p>
                <p>
                  Our signature focus is on agro tourism and wellness&mdash;connecting
                  travellers with Sri Lanka&rsquo;s farms, food traditions,
                  Ayurveda, yoga, nature and local communities. These experiences
                  reflect the side of Sri Lanka we believe deserves to be
                  explored more deeply.
                </p>
                <p className="font-display text-xl text-ink italic sm:text-2xl">
                  But our journeys are not limited to agro and wellness.
                </p>
                <p>
                  We also design complete travel experiences covering Sri
                  Lanka&rsquo;s culture, wildlife, heritage, beaches, adventure,
                  food and hidden destinations. From airport arrival to
                  accommodation, transport, licensed guides and carefully
                  selected activities, we bring every part of the journey
                  together.
                </p>
              </div>
              <Link
                href="/about"
                className="group mt-6 inline-flex items-center gap-3 text-sm font-semibold tracking-[0.14em] text-brand uppercase"
              >
                Discover our story
                <span className="grid size-9 place-items-center rounded-pill border border-brand transition-colors duration-200 ease-out group-hover:bg-brand group-hover:text-white">
                  <ArrowRight aria-hidden="true" className="size-4" />
                </span>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
