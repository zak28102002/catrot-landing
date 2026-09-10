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

## Configuration

The site deploys and runs with **nothing configured**. Every value below is
optional: anything unset is left out of the page rather than published as a
placeholder, because a Privacy Policy missing the company address is merely
incomplete, while one that prints `[business address not configured]` is broken
in public. `npm run dev` shows a bar listing what is still unset and what each
omission costs.

| Variable | If unset |
| --- | --- |
| `NEXT_PUBLIC_APP_STORE_URL` | The App Store badge renders inert under "Coming soon to the App Store" instead of linking nowhere. **Set this as soon as the listing is live** — otherwise the site tells visitors the app is unreleased. |
| `LEGAL_COMPANY_NAME` | Defaults to **Catrot**, the publishing entity. Set this only if the entity is registered under a fuller name (a `Ltd`, `SAS` or `GmbH` suffix, say) — the legal pages and the footer read it from here in preference to the default. |
| `BUSINESS_ADDRESS` | The postal contact line is omitted from both legal pages and email remains the only stated route. Worth adding before a real launch: the GDPR expects a privacy policy to give the controller's contact details, and a postal address is the usual way to satisfy that fully. |
| `WEBSITE_URL` | Canonical URLs, Open Graph tags, `sitemap.xml` and `robots.txt` fall back to the deployment host Vercel provides — right for a preview, wrong once you have a custom domain. |
| `SUPPORT_EMAIL` | Defaults to `catrotsupp@gmail.com`. |
| `LEGAL_GOVERNING_LAW` | The Terms' governing-law clause falls back to "the law of the territory in which the publisher of CATROT is established" instead of naming a jurisdiction. It follows from where the entity is established, so it cannot be guessed. |

Copy `.env.example` to `.env.local` for development, and set the same keys in
**Vercel → Project → Settings → Environment Variables** for Preview and
Production. A value that is empty, or that still starts with `REPLACE_WITH`,
counts as unset.

> **None of these are secrets.** Every one of them is rendered on the page.
> The site has no server-side logic, no API routes and no database, so there is
> nothing here that could leak a credential — and no credential should ever be
> added to this project.

## ⚠️ The one thing that does block a build

**`src/config/data-practices.ts` is the single source of truth for `/privacy`.**
The Privacy Policy contains no free-floating claims: every factual statement on
that page is rendered from a value in that file.

It is currently marked `verified: true` (10 September 2026), on the publisher's
confirmation that:

- Screen Time and Device Activity data never leaves the device;
- the app operates no backend of its own;
- no analytics SDK is linked into the app;
- RevenueCat is the subscription provider;
- no account is required, and iCloud sync is off;
- no free trial is asserted (`freeTrial: null` means the Terms say nothing
  about trials, which is the safe default);
- no claim is made about whether the CCPA applies — the policy deliberately
  stays silent on the statutory thresholds.

**Set `verified: false` again whenever the app changes in a way that touches any
of these.** A production build then stops, with a message naming what to
re-check, until the declarations match the app again. That is the only condition
that fails a build.

> These documents are a **drafting aid, not legal advice.** Have them reviewed by
> a qualified lawyer before publication.

## Local development

```bash
npm install
cp .env.example .env.local   # then fill in real values
npm run dev                  # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (fails only if the data practices are unverified) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run assets` | Regenerate the favicon, Apple touch icon and Open Graph image from `public/brand/app-icon.svg` |

## Deploying to Vercel

1. Import the repository. Vercel detects Next.js; no build settings to change.
2. Deploy. It builds and serves with no environment variables at all.
3. Add the variables from the table above to **Preview** and **Production** as
   the real values become available — `NEXT_PUBLIC_APP_STORE_URL` first, since
   until it is set the site tells visitors the app is not out yet.
4. Point the domain at the project, and set `WEBSITE_URL` to match it exactly —
   canonical tags and Open Graph URLs are built from it, and until it is set
   they use the Vercel deployment host.

## Project layout

```
public/
  badges/download-on-the-app-store.svg   Apple's official badge, unmodified
  brand/app-icon.svg                     the app mark — source for all raster icons
  brand/cat-thriving.svg                 mascot, bright and well kept
  brand/cat-worn.svg                     mascot, tired and unkempt
src/
  app/
    layout.tsx          fonts and metadata
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
    site.ts             environment values, and how each degrades when unset
    data-practices.ts   ← the source of truth for /privacy
    guard.ts            blocks a production build while /privacy is unverified
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
