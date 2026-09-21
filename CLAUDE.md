@AGENTS.md

# LotusWave Lanka Tours

Agro & wellness travel website for Sri Lanka. Marketing site, content-driven,
SEO-critical.

## Stack

| Layer      | Choice                                                    |
| ---------- | --------------------------------------------------------- |
| Framework  | Next.js 16, App Router, Turbopack (default for dev + build) |
| Language   | TypeScript, strict                                        |
| Styling    | Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config`) |
| Data       | Mock arrays today → Firebase Admin / Firestore later      |
| Validation | Zod                                                       |
| Icons      | lucide-react                                              |
| Media      | Cloudflare R2 (Unsplash for placeholders)                 |
| Classnames | `cn()` = clsx + tailwind-merge, in `src/lib/utils.ts`     |

Import alias: `@/*` → `src/*`.

Next.js 16 specifics that differ from older training data: `params` and
`searchParams` are Promises and must be awaited; `revalidateTag` takes a
`cacheLife` profile as its second argument; `middleware` is now `proxy`;
`next lint` is gone (run `eslint` directly). See `node_modules/next/dist/docs/`
before reaching for an API.

## Folder conventions

```
src/
  app/          routes only — one folder per URL segment
  actions/      "use server" Server Actions (form submissions)
  components/
    ui/         primitives: Button, Card, Input, Badge, Container, Section
    layout/     Header, Footer, MobileNav, WhatsAppButton
    home/       home page sections
    experiences|journeys|destinations|stories/   domain components
    forms/      PlanTripForm, ContactForm (client components)
    seo/        JsonLd, Breadcrumbs
  lib/
    data/       one file per collection — the ONLY place content is read
    seo/        metadata.ts (buildMetadata) and schema.ts (JSON-LD)
    firebase-admin.ts   server-only, lazy, optional
    constants.ts        taxonomies, nav, cache tags
    validations.ts      Zod schemas
    utils.ts            cn, formatDate, formatPrice, slugify
  types/index.ts   the content model
  styles/globals.css design tokens
```

Rules:

- Pages never read data directly — they call `@/lib/data`. When Firestore
  replaces the mock arrays, the function signatures stay identical.
- Components are files in kebab-case exporting PascalCase names.
- `src/lib/firebase-admin.ts` imports `server-only`. Never import it from a
  client component.

## Colour system

One palette: logo purple, white and black. Defined in `src/styles/globals.css`.

The `@theme` block opens with `--color-*: initial`, which clears Tailwind's
default palette. The colours below are the only ones that exist — `bg-red-500`,
`text-gray-600` and friends do not compile. Adding a colour means adding it to
`@theme` first.

### Primary

| Token                  | Hex       | Use                                            |
| ---------------------- | --------- | ---------------------------------------------- |
| `--color-brand`        | `#652D90` | logo purple — CTAs, links, active nav, footer  |
| `--color-brand-dark`   | `#4E2270` | hover/pressed, dark sections, image overlays   |
| `--color-brand-light`  | `#F3EEF8` | soft tinted section background (never text)    |
| `--color-white`        | `#FFFFFF` | page background, text on purple                |
| `--color-ink`          | `#111111` | headings and body text                         |
| `--color-muted`        | `#6B6B6B` | secondary/supporting text only                 |
| `--color-line`         | `#E6E6E6` | borders, dividers, hairlines                   |

### Secondary accents — sparingly

| Token                  | Hex       | Use                                            |
| ---------------------- | --------- | ---------------------------------------------- |
| `--color-accent-gold`  | `#C8963E` | icons, star ratings, 24px+ text                |
| `--color-accent-green` | `#1F3D2B` | header logo panel; agro badges and icons       |
| `--color-accent-sand`  | `#E9DFCB` | occasional alternate section background        |

Plus `--color-transparent` and `--color-current`.

### Semantic aliases

Kept so component code stays readable. They are plain aliases — nothing switches
at runtime any more.

`--color-primary` → brand · `--color-bg` → white · `--color-surface` → white ·
`--color-section` → brand-light · `--color-text` → ink

### Usage rules

1. **Ratio.** Roughly 70% white, 20% purple, 10% ink text. Accents stay under 5%
   of a page, and **no section carries more than one accent colour**. The header
   logo panel is the one standing exception — see rule 4.
2. **Primary CTAs** — "Plan My Journey", "Design My Journey", "Plan This
   Journey": `bg-brand text-white hover:bg-brand-dark`. That is
   `<Button variant="primary">`, the default.
3. **Secondary buttons** — "WhatsApp Us", "Explore Our Journeys": transparent
   background, 1px brand border, brand text (`variant="secondary"`). On a purple
   background use `variant="onBrand"` — white border, white text.
4. **Header**: two pieces. The **logo panel** is a curved accent-green block
   wedged into the top-left corner, white logo on it — the only place green
   carries a surface rather than an icon or a badge. The **nav** floats beside
   it as a glass pill: transparent with white links over the hero, settling to
   white glass with ink links and brand hover once the page scrolls.
   **Footer**: brand background, white text.
5. **Hero, Custom Journey CTA and How It Works** may take a full brand
   background with white text. If the hero keeps a background image, put a
   `bg-brand-dark/70` overlay between the image and the text.
6. **Headings**: ink on light backgrounds, white on purple. **Links in body
   text**: brand.
7. **accent-gold is never text on white or any light background.** On purple it
   is allowed only for icons, star ratings, or text at 24px and above. Small
   eyebrow labels on purple use white — gold on purple is about 3.6:1, which
   fails at body size.
8. **Never brand text on ink, never ink text on brand.**
9. **No colours outside the tables above.**

### Agro vs wellness is not a colour

`theme: "agro" | "wellness"` stays on `Experience` and `Journey` as content
categorisation, but it must not change any colour. Differentiate with icons
(`Sprout` / `Flower2`), imagery and copy. The single exception is
`<Badge variant="agro">`, which tints its label accent-green.

The green in the header logo panel is not this — it is fixed brand furniture
that signals the agro side of the offer once, site-wide. It never responds to a
record's `theme`.

This applies to the TwoWorlds section too: the layout stays, both halves use the
same palette.

### Never hardcode hex colours in components

`bg-[#652D90]`, `style={{ color: "#111" }}` and inline hex in arbitrary values
are all wrong — they drift from the palette and dodge the rules above. Use the
tokens.

Two unavoidable exceptions, both commented in place: the `next/og` routes
(`opengraph-image.tsx`) render through Satori, which cannot read CSS variables,
and `src/app/manifest.ts`, which the browser reads outside any stylesheet.
`public/logo.svg` also carries literal brand values, as any standalone SVG must.

## Typography

Loaded with `next/font/google` in `src/app/layout.tsx`.

- **Cormorant Garamond** — 400/500/600/700 plus italics, var
  `--font-cormorant-garamond`, exposed as `font-display`.
  Headings, display text, pull quotes. Applied to `h1`–`h4` in base styles.
- **Manrope** — 400/500/600/700, var `--font-manrope`, exposed as `font-sans`.
  Body copy, navigation, buttons, forms. This is the `body` default.

Do not add a third family. Do not import fonts from a CDN — `next/font` self-hosts
them and avoids layout shift.

## Design direction

Calm, premium, natural. The site should feel like the places it sells.

- **Generous whitespace.** Sections breathe: `py-16 sm:py-24 lg:py-32` is the
  baseline, set once in `<Section>`. Resist tightening it.
- **Soft rounded corners.** `rounded-card` (20px) for surfaces, `rounded-pill`
  for buttons and tags. Nothing sharp-cornered.
- **Subtle motion.** 150–300ms, ease-out, on opacity/transform/colour only. No
  bounce, no parallax, no autoplay carousels. Honour
  `prefers-reduced-motion` — the base layer already disables animation for it.
- **Mobile-first.** Write the small-screen layout, then add `sm:` / `lg:`.
  Test at 375px before anything else.
- **Photography carries the design.** Large, quiet images; type and colour stay
  out of their way. One accent colour per section, not three.
- Contrast: ink on white, white on brand. `text-muted` is for supporting copy
  only, never a heading. Check any accent-gold pairing against rule 7 above
  before shipping it.
- **Focus rings** are brand on light backgrounds; inside a purple section add
  `focus-visible:outline-white`.

## SEO rules

Non-negotiable — this site lives on organic search.

1. **Server Components by default.** `"use client"` only for real interactivity
   (the mobile nav, the forms). Never for a page.
2. **`next/image` always**, never a bare `<img>`. Every image needs `alt` — the
   `ImageAsset` type makes it required. Hero images get `priority`; everything
   else stays lazy. Remote hosts must be allow-listed in `next.config.ts`.
3. **Semantic HTML.** `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`,
   `<footer>`, `<time dateTime>`, `<address>`. A `<div>` with a click handler is
   not a button.
4. **Exactly one `<h1>` per page**, and it states what the page is. Heading
   levels descend without skipping.
5. **Every route exports metadata** via `buildMetadata()` from
   `@/lib/seo/metadata` — it supplies the canonical URL, OG and Twitter cards.
   Dynamic routes use `generateMetadata` and pass the record's `seo` field.
6. **Structured data** on every content page: `<JsonLd>` with the right builder
   from `@/lib/seo/schema` (`touristTripSchema`, `articleSchema`,
   `breadcrumbSchema`). Organization and WebSite are already in the root layout.
7. **`generateStaticParams`** on all dynamic routes so pages prerender.
8. Keep `src/app/sitemap.ts` in step when adding a route.
9. Descriptive internal link text — never "click here" or "read more" alone.

## Commands

```bash
npm run dev     # Turbopack dev server
npm run build   # production build
npm run lint    # eslint (next lint no longer exists)
```

## Env

Copy `.env.local.example` to `.env.local`. Firebase Admin stays uninitialised
when its three vars are absent, and the site runs on mock data — that is the
intended local default.
