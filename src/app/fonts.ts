import localFont from "next/font/local";

/**
 * Nunito, self-hosted. Rounded terminals to match the mascot, and no request to
 * a third-party font host at runtime.
 *
 * Files are the Google Fonts variable builds (SIL Open Font License 1.1):
 * https://fonts.google.com/specimen/Nunito
 */
export const nunito = localFont({
  src: [
    {
      path: "../fonts/nunito-latin.woff2",
      weight: "400 900",
      style: "normal",
    },
    {
      path: "../fonts/nunito-latin-ext.woff2",
      weight: "400 900",
      style: "normal",
    },
  ],
  variable: "--font-nunito",
  display: "swap",
  fallback: ["SF Pro Rounded", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "system-ui", "sans-serif"],
});
