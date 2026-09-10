/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CATROT — SITE CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Every value below comes from an environment variable. Nothing here is
 * invented, and nothing here is a secret: all of it is public information that
 * appears on the rendered page.
 *
 * Values that still hold their `REPLACE_WITH_…` placeholder are treated as
 * MISSING:
 *
 *   • `next build` (production) FAILS with a list of what is unset.
 *   • `next dev` renders the site with a loud, development-only warning bar
 *     and neutral fallback text — placeholder legal text is never presented
 *     to a visitor as if it were real.
 *
 * See README.md → "Environment variables".
 */

export const PLACEHOLDER_PREFIX = "REPLACE_WITH";

/** The one value with a real, intentional default. */
export const DEFAULT_SUPPORT_EMAIL = "catrotsupp@gmail.com";

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
  /** Used when the value is missing, in development only. */
  devFallback: string;
  /** Why the site needs it — shown in the build error. */
  reason: string;
};

function read(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;
  if (trimmed.toUpperCase().startsWith(PLACEHOLDER_PREFIX)) return undefined;
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
    devFallback: "",
    reason: "Destination of the “Download on the App Store” button.",
  },
  {
    key: "LEGAL_COMPANY_NAME",
    raw: process.env.LEGAL_COMPANY_NAME,
    devFallback: "[legal entity not configured]",
    reason:
      "The legal entity named in the footer, the Privacy Policy and the Terms.",
  },
  {
    key: "BUSINESS_ADDRESS",
    raw: process.env.BUSINESS_ADDRESS,
    devFallback: "[business address not configured]",
    reason:
      "Postal contact address required by the Privacy Policy and the Terms.",
  },
  {
    key: "WEBSITE_URL",
    raw: process.env.WEBSITE_URL,
    devFallback: "http://localhost:3000",
    reason:
      "Canonical origin used for metadata, Open Graph tags, sitemap and robots.txt.",
  },
  {
    key: "SUPPORT_EMAIL",
    raw: process.env.SUPPORT_EMAIL ?? DEFAULT_SUPPORT_EMAIL,
    devFallback: DEFAULT_SUPPORT_EMAIL,
    reason: "Support and privacy contact address shown on every page.",
  },
  {
    key: "LEGAL_GOVERNING_LAW",
    raw: process.env.LEGAL_GOVERNING_LAW,
    devFallback: "[governing law not configured]",
    reason:
      "Jurisdiction whose law governs the Terms (e.g. “the laws of France”). " +
      "This cannot be guessed — it follows from where the legal entity is established.",
  },
];

export const missingConfigKeys: ConfigKey[] = specs
  .filter((spec) => read(spec.raw) === undefined)
  .map((spec) => spec.key);

export const isConfigComplete = missingConfigKeys.length === 0;

function resolve(key: ConfigKey): string {
  const spec = specs.find((candidate) => candidate.key === key)!;
  return read(spec.raw) ?? spec.devFallback;
}

export const siteConfig = {
  name: "CATROT",
  tagline: "Less scroll. More life.",
  description:
    "CATROT helps you build healthier screen-time habits by turning your digital behavior into a playful cat you can care for.",
  appStoreUrl: resolve("NEXT_PUBLIC_APP_STORE_URL"),
  legalCompanyName: resolve("LEGAL_COMPANY_NAME"),
  businessAddress: resolve("BUSINESS_ADDRESS"),
  websiteUrl: resolve("WEBSITE_URL").replace(/\/+$/, ""),
  supportEmail: resolve("SUPPORT_EMAIL"),
  governingLaw: resolve("LEGAL_GOVERNING_LAW"),
} as const;

/** Human-readable explanation of everything that is unset, for build output. */
export function describeMissingConfig(): string {
  return specs
    .filter((spec) => read(spec.raw) === undefined)
    .map((spec) => `  • ${spec.key}\n      ${spec.reason}`)
    .join("\n");
}
