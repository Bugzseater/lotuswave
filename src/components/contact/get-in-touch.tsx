import { Clock, Mail, MapPin, MessageCircle, type LucideIcon } from "lucide-react";
import { Eyebrow } from "@/components/about/eyebrow";
import { Container } from "@/components/ui/container";
import { SOCIAL_ICONS } from "@/components/layout/social-icons";
import { WaveEdge } from "@/components/ui/wave-edge";
import { COMPANY, SOCIAL_LINKS, WHATSAPP_URL } from "@/lib/constants";

type Channel = {
  icon: LucideIcon;
  label: string;
  /** Lines of the value; the first one is the link text when `href` is set. */
  lines: readonly string[];
  href?: string;
  external?: boolean;
};

const CHANNELS: Channel[] = [
  {
    icon: MessageCircle,
    label: "Call / WhatsApp",
    lines: [COMPANY.phone],
    href: WHATSAPP_URL,
    external: true,
  },
  {
    icon: Mail,
    label: "Email us",
    lines: [COMPANY.email],
    href: `mailto:${COMPANY.email}`,
  },
  { icon: MapPin, label: "Visit our office", lines: COMPANY.address },
  { icon: Clock, label: "Operating hours", lines: [COMPANY.hours] },
];

/**
 * Contact 01 — the direct routes: phone/WhatsApp, email, office, hours, then
 * the social row. The hero's scroll cue lands here.
 */
export function GetInTouch() {
  const socials = SOCIAL_LINKS.filter((link) => link.href && SOCIAL_ICONS[link.label]);

  return (
    <section
      id="get-in-touch"
      aria-labelledby="get-in-touch-heading"
      className="relative scroll-mt-20 overflow-hidden bg-white pt-16 pb-28 sm:pt-24 sm:pb-36 lg:pb-44"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow centered>Get in Touch</Eyebrow>
          <h2
            id="get-in-touch-heading"
            className="mt-4 font-display text-4xl leading-[1.08] text-balance text-ink sm:text-5xl"
          >
            Get in Touch <em className="font-medium text-brand">Directly</em>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-pretty text-ink/75">
            Have questions about planning your journey? LotusWave Lanka Tours
            is a Sri Lankan team living and working on the island we plan for.
            Our travel designers are ready to help you shape, adjust and secure
            a private agro and wellness itinerary that fits the way you like to
            travel.
          </p>
        </div>

        <address className="mx-auto mt-12 grid max-w-5xl gap-3 not-italic sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {CHANNELS.map(({ icon: Icon, label, lines, href, external }) => (
            <div
              key={label}
              className="group rounded-card border border-line bg-white p-5 transition-[border-color,transform] duration-300 ease-out hover:-translate-y-1 hover:border-brand/40"
            >
              <span className="grid size-10 place-items-center rounded-pill border border-brand/20 bg-brand-light text-brand transition-colors duration-300 ease-out group-hover:bg-brand group-hover:text-white">
                <Icon aria-hidden="true" className="size-4" strokeWidth={1.5} />
              </span>
              <p className="mt-4 text-[11px] font-semibold tracking-[0.18em] text-muted uppercase">
                {label}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink">
                {href ? (
                  <a
                    href={href}
                    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                    className="break-words hover:text-brand hover:underline hover:underline-offset-4"
                  >
                    {lines[0]}
                  </a>
                ) : (
                  lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))
                )}
              </p>
            </div>
          ))}
        </address>

        {socials.length > 0 && (
          <div className="mt-14 text-center">
            <p className="text-xs font-semibold tracking-[0.2em] text-muted uppercase">
              Follow our journey
            </p>
            <ul className="mt-4 flex justify-center gap-3">
              {socials.map(({ label, href }) => {
                const Glyph = SOCIAL_ICONS[label];
                return (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`LotusWave Lanka Tours on ${label}`}
                      className="grid size-11 place-items-center rounded-pill border border-line text-brand transition-colors duration-200 ease-out hover:border-brand hover:bg-brand hover:text-white"
                    >
                      <Glyph className="size-5" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </Container>

      {/* Waves into the brand-light form section — same fill, so the two meet
          on the curve. Nudged 1px past the edge to hide any sub-pixel seam. */}
      <WaveEdge position="bottom" flat className="-bottom-px fill-brand-light" />
    </section>
  );
}
