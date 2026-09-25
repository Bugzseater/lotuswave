import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Eyebrow } from "@/components/about/eyebrow";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { COMPANY, WHATSAPP_URL, telHref } from "@/lib/constants";

/**
 * About 10 — the closing invitation. Full brand-dark surface (rule 5, as the
 * home Custom Journey CTA), with the ways to reach us laid out plainly.
 */
export function ContactCta() {
  return (
    <section
      aria-labelledby="about-contact-heading"
      className="relative isolate overflow-hidden bg-brand-dark"
    >
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/2 -z-10 size-[42rem] -translate-x-1/2 rounded-pill bg-brand opacity-50 blur-3xl"
      />

      <Container className="py-20 sm:py-28 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-20">
          <div>
            <Eyebrow onBrand>Get in Touch</Eyebrow>
            <h2
              id="about-contact-heading"
              className="mt-5 font-display text-4xl leading-[1.05] font-semibold text-balance text-white sm:text-5xl lg:text-6xl"
            >
              Let&rsquo;s Plan Your Sri Lanka,{" "}
              <em className="font-medium text-white/85">Together.</em>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-white/85 sm:text-lg">
              Tell us how you like to travel. A travel designer will reply
              personally — free to plan, with no obligation to book.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href="/plan-your-trip"
                size="lg"
                className="w-full bg-white text-brand hover:bg-brand-light focus-visible:outline-white sm:w-auto"
              >
                Plan My Journey
              </ButtonLink>
              <ButtonLink
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="onBrand"
                size="lg"
                className="w-full sm:w-auto"
              >
                <MessageCircle aria-hidden="true" className="size-5" strokeWidth={1.75} />
                WhatsApp Us
              </ButtonLink>
            </div>
          </div>

          <address className="rounded-card border border-white/15 bg-white/5 p-6 not-italic sm:p-8">
            <ul className="space-y-6">
              <li className="flex gap-4">
                <Phone aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-white/70" strokeWidth={1.5} />
                <div>
                  <p className="text-xs tracking-[0.15em] text-white/70 uppercase">Call us</p>
                  <a
                    href={telHref(COMPANY.phone)}
                    className="mt-1 block text-lg text-white hover:underline focus-visible:outline-white"
                  >
                    {COMPANY.phone}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <Mail aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-white/70" strokeWidth={1.5} />
                <div>
                  <p className="text-xs tracking-[0.15em] text-white/70 uppercase">Email</p>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="mt-1 block text-lg break-all text-white hover:underline focus-visible:outline-white"
                  >
                    {COMPANY.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-white/70" strokeWidth={1.5} />
                <div>
                  <p className="text-xs tracking-[0.15em] text-white/70 uppercase">Visit us</p>
                  <p className="mt-1 text-base leading-relaxed text-white">
                    {COMPANY.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              </li>
            </ul>
            <p className="mt-8 border-t border-white/15 pt-6 text-sm text-white/80">
              Prefer a form?{" "}
              <Link href="/contact" className="font-medium text-white underline underline-offset-4 focus-visible:outline-white">
                Send us a message on the contact page
              </Link>
              .
            </p>
          </address>
        </div>
      </Container>
    </section>
  );
}
