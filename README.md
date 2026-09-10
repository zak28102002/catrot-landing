# CATROT — marketing website

The public site for **CATROT**, an iOS screen-time wellness app: a single splash
landing page plus the Privacy Policy and Terms & Conditions.

Built with Next.js 16 (App Router, TypeScript) and hand-written CSS Modules. No
UI framework, no CSS framework, no client-side analytics, no cookies. Every
route is statically prerendered.

```
/          landing page
/privacy   Privacy Policy
/terms     Terms & Conditions
           plus a branded 404, sitemap.xml and robots.txt
```

---

## ⚠️ Read this before deploying

Two gates must be cleared, and **a production build fails until both are**. This
is deliberate: publishing placeholder company details or unverified privacy
claims is worse than publishing nothing.

### 1. Environment variables

| Variable | Required | What it is |
| --- | --- | --- |
| `NEXT_PUBLIC_APP_STORE_URL` | yes | Destination of the "Download on the App Store" button. Without it the badge renders inert, never as a broken link. |
| `LEGAL_COMPANY_NAME` | yes | The registered legal entity, exactly as registered. Appears in the footer, the Privacy Policy and the Terms. |
| `BUSINESS_ADDRESS` | yes | Postal contact address, on one line. |
| `WEBSITE_URL` | yes | Canonical origin, no trailing slash. Drives canonical URLs, Open Graph tags, `sitemap.xml` and `robots.txt`. |
| `SUPPORT_EMAIL` | defaulted | Support and privacy contact. Defaults to `catrotsupp@gmail.com`. |
| `LEGAL_GOVERNING_LAW` | yes | Jurisdiction governing the Terms, phrased to complete "These terms are governed by ___" — e.g. `the laws of France`. It follows from where the entity is established and cannot be guessed. |

Copy `.env.example` to `.env.local` for development, and set the same keys in
**Vercel → Project → Settings → Environment Variables** for Preview and
Production.

A value that is empty, or that still starts with `REPLACE_WITH`, counts as
missing. In development the site runs anyway and shows a warning bar listing
what is outstanding; in production the build stops.

> **None of these are secrets.** Every one of them is rendered on the page.
> The site has no server-side logic, no API routes and no database, so there is
> nothing here that could leak a credential — and no credential should ever be
> added to this project.

### 2. Verify the declared data practices

**`src/config/data-practices.ts` is the single source of truth for `/privacy`.**
The Privacy Policy contains no free-floating claims: every factual statement on
that page is rendered from a value in that file.

That file was written **without access to the CATROT iOS source code**. Its
values are therefore starting points, not findings, and each carries a `VERIFY:`
comment naming exactly what to check. Among the things it currently asserts, and
that must be confirmed or corrected:

- that Screen Time and Device Activity data never leaves the device;
- that the app operates no backend of its own;
- that no analytics SDK is linked into the app;
- that RevenueCat is the subscription provider, and which third parties receive
  what;
- that no account is required, and that iCloud sync is off;
- whether the configured products actually offer a free trial (`null` means the
  Terms say nothing about trials, which is the safe default);
- whether the CCPA applies to the business — the policy deliberately makes no
  claim about the statutory thresholds.

Work through the file against the shipping build, the Xcode project's package
dependencies and `Package.resolved`, then set:

```ts
verified: true,
lastVerified: "YYYY-MM-DD",
```

Until then, `/privacy` and `/terms` carry a "Draft — not yet published" banner
and the production build refuses to run.

> These documents are a **drafting aid, not legal advice.** Have them reviewed by
> a qualified lawyer before publication.

---

## Local development

```bash
npm install
cp .env.example .env.local   # then fill in real values
npm run dev                  # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (fails if either gate above is unmet) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run assets` | Regenerate the favicon, Apple touch icon and Open Graph image from `public/brand/app-icon.svg` |

## Deploying to Vercel

1. Import the repository. Vercel detects Next.js; no build settings to change.
2. Add every variable from the table above to **Preview** and **Production**.
3. Deploy. If a variable is missing, the build fails with a message naming it.
4. Point the domain at the project, and make sure `WEBSITE_URL` matches it
   exactly — canonical tags and Open Graph URLs are built from it.

## Project layout

```
public/
  badges/download-on-the-app-store.svg   Apple's official badge, unmodified
  brand/app-icon.svg                     the app mark — source for all raster icons
  brand/cat-thriving.svg                 mascot, bright and well kept
  brand/cat-worn.svg                     mascot, tired and unkempt
src/
  app/
    layout.tsx          fonts, metadata, the readiness guard
    page.tsx            landing page
    privacy/page.tsx    Privacy Policy — rendered from data-practices.ts
    terms/page.tsx      Terms & Conditions
    not-found.tsx       404
    sitemap.ts robots.ts
    icon.png apple-icon.png favicon.ico opengraph-image.png   (generated)
  components/
    SiteHeader  SiteFooter  AppStoreButton  SupportLink
    CatMoodStrip  LegalPage  ConfigWarning
  config/
    site.ts             environment values, and what is missing
    data-practices.ts   ← the file to verify before publishing
    guard.ts            blocks a production build until both gates pass
  fonts/                Nunito (SIL OFL 1.1), self-hosted
```

## Assets and attribution

- **App Store badge** — `public/badges/download-on-the-app-store.svg` is
  Apple's official badge, downloaded from Apple and used unmodified. Do not
  redraw it, recolour it or reconstruct the Apple logo. Replacements for other
  locales come from
  [Apple's Marketing Tools](https://tools.applemediaservices.com/app-store).
  Apple's guidelines require clear space around the badge of at least 10% of its
  height and a minimum height of 40px; the component honours both.
- **Mascot artwork** — `public/brand/*.svg` are vector illustrations drawn to
  match the CATROT app icon, because the repository contained no artwork when
  the site was built. If you have the original production assets, replace these
  files and re-run `npm run assets`; nothing else needs to change.
- **Nunito** — self-hosted under `src/fonts/`, licensed under the SIL Open Font
  License 1.1.

## Accessibility notes

- Every text/background pair meets WCAG AA. `--orange` is reserved for graphics;
  only `--orange-deep` (large bold display type) and `--orange-ink` (everything
  else) carry text.
- A skip link precedes the header; focus rings are visible and brand-coloured.
- The single entrance animation is disabled under `prefers-reduced-motion`.
- Layouts use `dvh` units and `env(safe-area-inset-*)` so the page behaves on
  notched iPhones in both orientations.

## Changing content

- **Landing copy** — `src/app/page.tsx`.
- **Brand colours, type scale, spacing** — the token block at the top of
  `src/app/globals.css`.
- **Legal copy** — `src/app/privacy/page.tsx` and `src/app/terms/page.tsx`.
  Anything factual about the app belongs in `data-practices.ts`, not in the page.
- **"Last updated" dates** — `dataPractices.lastUpdated`. It drives both legal
  pages and the sitemap.
