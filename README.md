# LotusWave Lanka Tours

Agro & wellness travel website for Sri Lanka.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Firebase Admin · Zod.

## Getting started

```bash
npm install
cp .env.local.example .env.local   # optional — the site runs on mock data without it
npm run dev
```

Open <http://localhost:3000>.

## Scripts

| Command         | Does                                     |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Dev server (Turbopack)                   |
| `npm run build` | Production build                         |
| `npm start`     | Serve the production build               |
| `npm run lint`  | ESLint (`next lint` was removed in v16)  |

## Where things live

- `src/app` — routes
- `src/lib/data` — content reads; mock arrays today, Firestore later, same signatures
- `src/styles/globals.css` — the two brand palettes and the semantic token system
- `src/types/index.ts` — the content model

Conventions, the colour system and the SEO rules are documented in
[CLAUDE.md](./CLAUDE.md). Read it before adding pages.

## Content and data

The site currently ships realistic mock content (Kandy, Ella, Sigiriya, Nuwara
Eliya, Galle, Anuradhapura, Dambulla, Mirissa). Firebase Admin stays
uninitialised while its env vars are absent, so nothing breaks locally. When
Firestore is ready, replace the bodies of the functions in `src/lib/data/*` —
the exported signatures are the contract.
