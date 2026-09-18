import { MessageCircle } from "lucide-react";

import { getSettings } from "@/lib/data";

/** Floating WhatsApp shortcut. Placeholder styling. */
export async function WhatsAppButton() {
  const settings = await getSettings();

  return (
    <a
      href={`https://wa.me/${settings.contact.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="bg-brand text-white hover:bg-brand-dark fixed right-4 bottom-4 z-40 inline-flex size-14 items-center justify-center rounded-pill shadow-card transition-colors duration-200"
    >
      <MessageCircle aria-hidden />
    </a>
  );
}
