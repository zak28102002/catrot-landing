/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CATROT — SITE CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Every value below comes from an environment variable. Nothing here is
 * invented, and nothing here is a secret: all of it is public information that
 * appears on the rendered page.
 *
 * None of these block a build. A value that is unset — or that still holds its
 * `REPLACE_WITH_…` placeholder — is treated as ABSENT, and the pages that would
 * have used it leave the statement out rather than printing a placeholder. A
 * privacy policy that omits the company address is merely incomplete; one that
 * publishes "[business address not configured]" is broken in public.
 *
 * In development, `<ConfigWarning />` lists whatever is still unset.
 *
 * See README.md → "Environment variables".
 */

export const PLACEHOLDER_PREFIX = "REPLACE_WITH";

/** Values with real, intentional defaults, supplied by the app's publisher. */
export const DEFAULT_SUPPORT_EMAIL = "catrotsupp@gmail.com";

/**
 * The publishing entity. Confirmed by the publisher as "Catrot".
 *
 * Override with LEGAL_COMPANY_NAME if the entity is ever registered under a
 * fuller name (e.g. with a "Ltd", "SAS" or "GmbH" suffix) — the pages read it
 * from there in preference to this default.
 */
export const DEFAULT_LEGAL_COMPANY_NAME = "Catrot";

export type ConfigKey =
  | "NEXT_PUBLIC_APP_STORE_URL"
  | "LEGAL_COMPANY_NAME"
  | "BUSINESS_ADDRESS"
  | "WEBSITE_URL"
  | "SUPPORT_EMAIL"
  | "LEGAL_GOVERNING_LAW";

type ConfigSpec = {
  key: ConfigKey;
  /** Raw value as provided by the environment, if any. */
  raw: string | undefined;
  /** What is lost while it is unset — shown in the development warning. */
  consequence: string;
};

/**
 * Reads one variable.
 *
 * A bundler may replace an unset `process.env.X` with an empty string rather
 * than leaving it undefined, so empty, whitespace-only and still-placeholder
 * values all have to count as absent. `??` is not enough here.
 */
function read(value: string | undefined): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  if (trimmed.toUpperCase().startsWith(PLACEHOLDER_PREFIX)) return null;
  return trimmed;
}

/*
 * NOTE: `process.env.X` must be written out literally (not `process.env[key]`)
 * so that Next.js can inline the value at build time.
 */
const specs: ConfigSpec[] = [
  {
    key: "NEXT_PUBLIC_APP_STORE_URL",
    raw: process.env.NEXT_PUBLIC_APP_STORE_URL,
    consequence:
      "The App Store button has nowhere to point, so it renders as an inert “coming soon” badge instead of a broken link.",
  },
  {
    key: "LEGAL_COMPANY_NAME",
    raw: process.env.LEGAL_COMPANY_NAME,
    consequence: `The legal pages and the footer use the default, ${DEFAULT_LEGAL_COMPANY_NAME}. Set this only if the entity is registered under a fuller name.`,
  },
  {
    key: "BUSINESS_ADDRESS",
    raw: process.env.BUSINESS_ADDRESS,
    consequence:
      "The postal contact line is omitted from the Privacy Policy and the Terms; email remains the only stated route.",
  },
  {
    key: "WEBSITE_URL",
    raw: process.env.WEBSITE_URL,
    consequence:
      "Canonical URLs, Open Graph tags, the sitemap and robots.txt fall back to the deployment URL Vercel provides, which is right for a preview but not for a custom domain.",
  },
  {
    key: "SUPPORT_EMAIL",
    raw: process.env.SUPPORT_EMAIL,
    consequence: `Support links use the default, ${DEFAULT_SUPPORT_EMAIL}.`,
  },
  {
    key: "LEGAL_GOVERNING_LAW",
    raw: process.env.LEGAL_GOVERNING_LAW,
    consequence:
      "The Terms' governing-law clause cannot name a jurisdiction and falls back to generic wording. It follows from where the entity is established, so it cannot be guessed.",
  },
];

function value(key: ConfigKey): string | null {
  return read(specs.find((spec) => spec.key === key)!.raw);
}

/**
 * Canonical origin. Vercel exposes the deployment host automatically, so a
 * deploy without WEBSITE_URL still gets correct absolute URLs rather than
 * localhost — `VERCEL_PROJECT_PRODUCTION_URL` is the stable production host,
 * `VERCEL_URL` the per-deployment one.
 */
function resolveWebsiteUrl(): string {
  const configured = value("WEBSITE_URL");
  if (configured) return configured.replace(/\/+$/, "");

  const vercelHost =
    read(process.env.VERCEL_PROJECT_PRODUCTION_URL) ?? read(process.env.VERCEL_URL);
  if (vercelHost) return `https://${vercelHost.replace(/^https?:\/\//, "").replace(/\/+$/, "")}`;

  return "http://localhost:3000";
}

/** Keys that are still unset. Surfaced in development only. */
export const missingConfig = specs
  .filter((spec) => read(spec.raw) === null)
  .map((spec) => ({ key: spec.key, consequence: spec.consequence }));

export const isConfigComplete = missingConfig.length === 0;

export const siteConfig = {
  name: "CATROT",
  tagline: "Less scroll. More life.",
  description:
    "CATROT helps you build healthier screen-time habits by turning your digital behavior into a playful cat you can care for.",

  /** Absent until the App Store listing exists. */
  appStoreUrl: value("NEXT_PUBLIC_APP_STORE_URL"),
  legalCompanyName: value("LEGAL_COMPANY_NAME") ?? DEFAULT_LEGAL_COMPANY_NAME,
  /** Absent until a postal address is configured. */
  businessAddress: value("BUSINESS_ADDRESS"),
  /** Absent until the governing jurisdiction is configured. */
  governingLaw: value("LEGAL_GOVERNING_LAW"),

  /** Always resolvable. */
  websiteUrl: resolveWebsiteUrl(),
  supportEmail: value("SUPPORT_EMAIL") ?? DEFAULT_SUPPORT_EMAIL,
} as const;
