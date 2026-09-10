import Image from "next/image";
import Link from "next/link";
import { SupportLink } from "./SupportLink";
import styles from "./SiteHeader.module.css";

/**
 * Deliberately a server component. Everything it renders comes from
 * `siteConfig`, and those values are read from environment variables that are
 * not `NEXT_PUBLIC_` — so they exist only on the server. Marking this
 * "use client" would ship the header's config to the browser as undefined and
 * quietly fall back to defaults on hydration.
 *
 * `current` therefore comes in as a prop rather than from usePathname().
 */
export function SiteHeader({ current }: { current?: "privacy" | "terms" }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.brand} href="/" aria-label="CATROT — home">
          <Image
            src="/brand/app-icon.svg"
            alt=""
            width={30}
            height={30}
            unoptimized
          />
          <span className={styles.wordmark}>CATROT</span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          <Link
            href="/privacy"
            aria-current={current === "privacy" ? "page" : undefined}
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            aria-current={current === "terms" ? "page" : undefined}
          >
            Terms
          </Link>
          <SupportLink subject="CATROT support">Support</SupportLink>
        </nav>
      </div>
    </header>
  );
}
