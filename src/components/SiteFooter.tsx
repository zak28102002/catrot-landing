import Link from "next/link";
import { isConfigComplete, siteConfig } from "@/config/site";
import { SupportLink } from "./SupportLink";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const companyConfigured = isConfigComplete || !siteConfig.legalCompanyName.startsWith("[");

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copyright}>
          © {year}{" "}
          {companyConfigured ? (
            siteConfig.legalCompanyName
          ) : (
            <span className={styles.unset}>{siteConfig.legalCompanyName}</span>
          )}
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
