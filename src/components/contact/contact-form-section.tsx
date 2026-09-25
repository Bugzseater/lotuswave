import Image from "next/image";
import { Eyebrow } from "@/components/about/eyebrow";
import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/ui/container";
import { WaveEdge } from "@/components/ui/wave-edge";

/**
 * Contact 02 — the message form. A watercolour landscape — waterfall on the
 * left, a thatched rest stop on the right, pale open sky between — frames
 * the white form card, which sits over the quiet middle. The top fades from
 * brand-light so the wave closing Get in Touch meets it without a seam.
 */
export function ContactFormSection() {
  return (
    <section
      id="contact-form"
      aria-labelledby="contact-form-heading"
      className="relative isolate scroll-mt-20 overflow-hidden bg-brand-light pt-6 pb-40 sm:pt-8 sm:pb-52 lg:pt-10 lg:pb-64"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src="/bg/contactUs/form.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-50"
        />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-brand-light to-transparent sm:h-40" />
        {/* The scenic footer is pulled up over this section's foot (by
            64 / 96 / 128px) and its artwork has a transparent top that
            expects white beneath — so that strip is solid white, and the
            wave below sits just above it where it stays visible. */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-white sm:h-24 lg:h-32" />
      </div>

      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <Eyebrow centered>Send a Message</Eyebrow>
            <h2
              id="contact-form-heading"
              className="mt-3 font-display text-3xl leading-[1.08] text-balance text-ink sm:text-4xl"
            >
              Tell Us About{" "}
              <em className="font-medium text-brand">Your Journey</em>
            </h2>
          </div>

          <div className="relative mt-8 rounded-card border border-white/70 bg-white/35 p-5 shadow-header ring-1 ring-brand/5 backdrop-blur-xl backdrop-saturate-150 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Container>

      {/* Nudged 1px into the white strip to hide any sub-pixel seam. */}
      <WaveEdge
        position="bottom"
        flat
        className="bottom-[calc(4rem-1px)] fill-white sm:bottom-[calc(6rem-1px)] lg:bottom-[calc(8rem-1px)]"
      />
    </section>
  );
}
