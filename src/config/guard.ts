import { dataPractices } from "./data-practices";
import { describeMissingConfig, isConfigComplete } from "./site";

/**
 * Two things must be true before this site may be served to the public:
 *
 *   1. Every deployment value is configured (no `REPLACE_WITH_…` left).
 *   2. The declared data practices in `data-practices.ts` have been checked
 *      against the shipping app.
 *
 * In production, failing either one aborts the build. In development the site
 * still runs, and `<ConfigWarning />` says what is outstanding.
 *
 * This module is imported by the root layout, so the check runs for every
 * route that Next.js renders.
 */

export const legalReviewComplete = dataPractices.verified;
export const readyForProduction = isConfigComplete && legalReviewComplete;

const isProductionBuild =
  process.env.NODE_ENV === "production" && process.env.NEXT_PHASE !== "phase-development-server";

if (isProductionBuild && !readyForProduction) {
  const problems: string[] = [];

  if (!isConfigComplete) {
    problems.push(
      `Unconfigured deployment values:\n${describeMissingConfig()}\n` +
        `      Set these in your Vercel project settings (or .env.local for a\n` +
        `      local production build). See README.md → "Environment variables".`,
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

  throw new Error(
    [
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
    ].join("\n"),
  );
}
