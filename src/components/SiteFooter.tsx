import Link from "next/link";
import { siteConfig } from "@/config/site";
import { SupportLink } from "./SupportLink";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Falls back to the product name — never an invented entity. */}
        <p className={styles.copyright}>
          © {year} {siteConfig.legalCompanyName ?? siteConfig.name}
        </p>

        <nav className={styles.links} aria-label="Legal and support">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms &amp; Conditions</Link>
          <SupportLink subject="CATROT support">Support</SupportLink>
        </nav>
      </div>
    </footer>
  );
}
