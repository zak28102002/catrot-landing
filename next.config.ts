import type { NextConfig } from "next";
import { readinessReport } from "./src/config/guard";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  agentRules: false,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

/**
 * Checked here, at the very start of a production build, so an unconfigured
 * deployment fails with a readable message instead of a page-collection stack
 * trace. Development is unaffected — the site runs and shows a warning bar.
 */
export default function config(phase: string): NextConfig {
  if (phase === "phase-production-build") {
    const report = readinessReport();
    if (report) throw new Error(report);
  }

  return nextConfig;
}
