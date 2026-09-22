import { ResponsibleShowcase } from "@/components/home/responsible-showcase";
import { Section } from "@/components/ui/section";

/**
 * Section 09 — how the journeys give back. A compact section on white:
 * choose one of the seven commitments and the framed photograph changes to
 * show it. Tighter padding than the page baseline on purpose. The
 * interactive part lives in `ResponsibleShowcase`.
 */
export function ResponsibleTravel() {
  return (
    <Section
      id="responsible-travel"
      aria-labelledby="responsible-heading"
      className="bg-white py-12 sm:py-16 lg:py-20"
    >
      <ResponsibleShowcase headingId="responsible-heading" />
    </Section>
  );
}
