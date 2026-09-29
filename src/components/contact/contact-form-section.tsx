import { Eyebrow } from "@/components/about/eyebrow";
import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/ui/container";

/**
 * Contact 02 — the message form. A plain white section with the form on a
 * white card lifted by a soft shadow. The bottom padding leaves room for the
 * scenic footer, which is pulled up over this section's foot.
 */
export function ContactFormSection() {
  return (
    <section
      id="contact-form"
      aria-labelledby="contact-form-heading"
      className="relative scroll-mt-20 bg-white pt-12 pb-32 sm:pt-16 sm:pb-40 lg:pt-20 lg:pb-52"
    >
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

          <div className="mt-8 rounded-card border border-line bg-white p-5 shadow-card sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
