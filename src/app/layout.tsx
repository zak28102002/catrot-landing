import type { Metadata, Viewport } from "next";
import { nunito } from "./fonts";
import { siteConfig } from "@/config/site";
import "@/config/guard";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.websiteUrl),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "screen time",
    "digital wellbeing",
    "focus",
    "app blocking",
    "iOS app",
    "CATROT",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.websiteUrl,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#FDF7ED",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={nunito.variable}>
      <body>
        <a className="skipLink" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
