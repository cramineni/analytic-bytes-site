# Analytic Bytes — Next.js production drop-in

The locked v3 design as a Next.js 14+ App Router project. TypeScript • Tailwind CSS • zero external runtime dependencies.

## Files

```
app/
  layout.tsx           Root layout, fonts, metadata, OG tags, favicon
  page.tsx             Homepage — all 7 sections with content as data arrays at top
  globals.css          Base styles + architecture animation keyframes + reduced-motion
components/
  Logo.tsx             AB monogram + Wordmark + Brand block (uses /public/logo.png with SVG fallback)
  Nav.tsx              Sticky nav with scroll-aware border, Brand on left, links + CTA on right
  Footer.tsx           Tagline, secondary line, Built-by + LinkedIn, mono nav links
  Architecture.tsx     The full-bleed animated decision-flow visual + learning loop indicator
  Reveal.tsx           Reveal-on-scroll wrapper component
public/
  logo.png             ← YOU NEED TO ADD THIS (your AB monogram)
  og-image.png         ← OPTIONAL: social share preview image
tailwind.config.ts     Brand color tokens
README.md              This file
```

## Page structure

| #  | Section         | Anchor          | What it does                                           |
| -- | --------------- | --------------- | ------------------------------------------------------ |
| —  | Hero            | (top)           | "Most data problems are decision problems. Fix the system." |
| 01 | Architecture    | `#architecture` | Animated decision-flow visual (Signal → Action) + Learning Loop |
| 02 | Operating Arc   | `#arc`          | The 90·90·90 USP — fast and on-point delivery          |
| 03 | Thesis          | (no anchor)     | "A system is not the dashboard. It's what happens after." |
| 04 | Proof of Work   | `#proof`        | 5 capability rows, sector-agnostic                     |
| 05 | Work With AB    | `#work`         | Three engagement options                               |
| —  | CTA             | `#contact`      | "Bring the messy problem. Let's make the system visible." |

## Drop-in steps

1. **Copy these files** into your existing Next.js repo:
   - `app/` (replace existing)
   - `components/` (replace existing)
   - `tailwind.config.ts` (replace existing)
2. **Add `logo.png`** to `public/logo.png` — your real AB monogram
3. **Optional:** Add `og-image.png` to `public/og-image.png` (recommended size: 1200×630) for social share previews
4. **Verify `tsconfig.json`** has the `@/*` path alias:
   ```json
   { "compilerOptions": { "paths": { "@/*": ["./*"] } } }
   ```
   (Default in `create-next-app`.)
5. **Push to Vercel.**

## Brand tokens (`tailwind.config.ts`)

| Token              | Value                          | Use                                  |
| ------------------ | ------------------------------ | ------------------------------------ |
| `bg-bg`            | `#FFFFFF`                      | Page background                      |
| `bg-bg-alt`        | `#FAFAF8`                      | Hover surface, subtle stripes        |
| `text-ink`         | `#06101F`                      | Primary text — deep navy             |
| `text-ink-2`       | `#3A4658`                      | Secondary copy                       |
| `text-ink-3`       | `#7A8499`                      | Muted labels, mono numerals          |
| `text-ink-4`       | `#B7BFCE`                      | Very muted (corner markers in viz)   |
| `text-accent` / `bg-accent` | `#0EA5E9`             | The single accent — use sparingly    |
| `text-accent-2`    | `#0284C7`                      | Hover                                |
| `border-line`      | `rgba(6,16,31,0.08)`           | Section dividers                     |
| `border-line-2`    | `rgba(6,16,31,0.16)`           | Stronger dividers, button borders    |
| `font-sans`        | Inter                          | Body, headlines                      |
| `font-mono`        | JetBrains Mono                 | Section numerals, eyebrows, footer   |

## Customizing copy

**All text content lives in data arrays at the top of `app/page.tsx`** — no hunting through JSX. Search for these constants:

- `HERO` — eyebrow, headline, lede
- `ARC_PHASES` — the three 90-day phases (title, range, bullets)
- `PROOF_ROWS` — five capability rows (tag + description)
- `OFFERS` — three Work With AB options
- `EMAIL` — single source of truth for the CTA email

Architecture visual content lives in `components/Architecture.tsx` (SVG with hardcoded labels — edit the `<text>` elements directly if you want to relabel stages).

## Domain & deploy plan

| Domain                     | Role                                          |
| -------------------------- | --------------------------------------------- |
| `analyticbytes.systems`    | Primary site + email                          |
| `analyticbytes.io`         | Backup → 301 redirect to primary              |
| `analyticbytes.ai`         | AI hedge → 301 redirect to primary (or future home) |
| `analyticbytes.com`        | Defensive grab (recommended) → 301 to primary |

**Setup:**
1. In Vercel: deploy this repo, point at `analyticbytes.systems`
2. In your registrar (Cloudflare Registrar, Porkbun): for each non-primary domain, add a 301 redirect rule pointing to `analyticbytes.systems`
3. For email: use a service like Fastmail, Hover, or Google Workspace — point MX records at the registrar to your provider

## Things to swap before launch

- [ ] **`public/logo.png`** — drop in your real AB monogram (the dark rounded-square version)
- [ ] **`public/og-image.png`** — 1200×630 social share image (optional but recommended)
- [ ] **LinkedIn URL** in `components/Footer.tsx` — already set to `https://www.linkedin.com/in/chaitanyaramineni/` (verify it's correct)
- [ ] **Email address** — currently `hello@analyticbytes.systems` in `app/page.tsx` (top constant) and `components/Footer.tsx`
- [ ] **Analytics** — recommended: add Plausible or Fathom (privacy-respecting, lightweight). Drop their script into `app/layout.tsx`

## Future additions (when you're ready)

These are conscious omissions, ready to add when you have the material:

- **Social proof / testimonials** — even one client name or quote between Operating Arc and Thesis would meaningfully lift conversion. Easy to add as a new component or inline section
- **About page** — the "Built by" line is the trust hook; a dedicated `/about` route adds depth
- **Case studies** — once you have one client outcome to point at, it goes in Proof of Work as a featured row above the capabilities

## Notes

- **Reduced motion:** all animations respect `prefers-reduced-motion: reduce`
- **Mobile:** the architecture viz has a `min-height: 200px` on small screens to keep labels readable
- **Logo fallback:** if `/logo.png` 404s, the SVG approximation auto-shows. Useful during dev / CI
- **Density:** every section is intentionally text-light. If something feels empty, that's the design — clarity > completeness
