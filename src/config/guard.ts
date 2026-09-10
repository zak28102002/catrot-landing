import { dataPractices } from "./data-practices";

/**
 * One thing must be true before this site may be served to the public: the
 * declared data practices in `data-practices.ts` have been checked against the
 * shipping app. `/privacy` is generated from that file, so publishing it
 * unverified would mean publishing claims nobody has confirmed.
 *
 * `next.config.ts` is the single enforcement point — it calls
 * `readinessReport()` at the start of a production build, so a failure arrives
 * before compilation rather than buried in a page-collection stack trace. This
 * module is deliberately side-effect free.
 *
 * Deployment values (company name, address, App Store URL and so on) do NOT
 * block a build. They are optional by design: anything unset is simply left
 * out of the page, never printed as a placeholder, and `<ConfigWarning />`
 * lists what is outstanding in development.
 */

export const legalReviewComplete = dataPractices.verified;

/** The formatted explanation, or null when the site is safe to publish. */
export function readinessReport(): string | null {
  if (legalReviewComplete) return null;

  return [
    "",
    "──────────────────────────────────────────────────────────────────────",
    " CATROT — production build blocked",
    "──────────────────────────────────────────────────────────────────────",
    "",
    "  The declared data practices have not been verified.",
    "",
    "  /privacy is generated from src/config/data-practices.ts. Every entry in",
    "  that file carries a VERIFY: note describing what to check against the",
    "  shipping iOS app. Work through them, correct anything that differs, then",
    "  set `verified: true` and fill in `lastVerified`.",
    "",
    "  Publishing unverified privacy claims would be worse than not publishing",
    "  at all, so the build stops here.",
    "──────────────────────────────────────────────────────────────────────",
    "",
  ].join("\n");
}
