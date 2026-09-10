import { dataPractices } from "./data-practices";
import { describeMissingConfig, isConfigComplete } from "./site";

/**
 * Two things must be true before this site may be served to the public:
 *
 *   1. Every deployment value is configured (no `REPLACE_WITH_…` left).
 *   2. The declared data practices in `data-practices.ts` have been checked
 *      against the shipping app.
 *
 * This module is deliberately side-effect free. `next.config.ts` is the single
 * enforcement point: it calls `readinessReport()` at the start of a production
 * build and stops there, so the failure arrives before compilation rather than
 * buried in a page-collection stack trace.
 *
 * In development nothing fires: the site runs and `<ConfigWarning />` says what
 * is outstanding.
 */

export const legalReviewComplete = dataPractices.verified;
export const readyForProduction = isConfigComplete && legalReviewComplete;

/** The full, formatted explanation, or null when the site is ready to publish. */
export function readinessReport(): string | null {
  if (readyForProduction) return null;

  const problems: string[] = [];

  if (!isConfigComplete) {
    problems.push(
      `Unconfigured deployment values:\n${describeMissingConfig()}\n` +
        `      Set each of these in Vercel → your project → Settings →\n` +
        `      Environment Variables, for both Production and Preview, then\n` +
        `      redeploy. For a local production build, put them in .env.local.\n` +
        `      See README.md → "Environment variables".`,
    );
  }

  if (!legalReviewComplete) {
    problems.push(
      `The declared data practices have not been verified.\n` +
        `      /privacy is generated from src/config/data-practices.ts. That file\n` +
        `      was drafted without access to the CATROT iOS source, so every entry\n` +
        `      is marked "VERIFY:". Check each one against the shipping app, correct\n` +
        `      the file, then set \`verified: true\` and fill in \`lastVerified\`.`,
    );
  }

  return [
    "",
    "──────────────────────────────────────────────────────────────────────",
    " CATROT — production build blocked",
    "──────────────────────────────────────────────────────────────────────",
    "",
    ...problems.map((problem, index) => `  ${index + 1}. ${problem}\n`),
    " Publishing placeholder company details or unverified privacy claims",
    " would be worse than not publishing at all, so the build stops here.",
    "──────────────────────────────────────────────────────────────────────",
    "",
  ].join("\n");
}
