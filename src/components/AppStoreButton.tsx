import Image from "next/image";
import { siteConfig } from "@/config/site";
import styles from "./AppStoreButton.module.css";

/**
 * The single "Download on the App Store" call to action.
 *
 * The artwork is Apple's official badge, served unmodified from
 * /badges/download-on-the-app-store.svg. It is not recreated by hand, and it is
 * not restyled beyond the surrounding shadow, per Apple's identity guidelines.
 *
 * With NEXT_PUBLIC_APP_STORE_URL unset the badge renders inert instead of
 * linking nowhere, and a development-only note explains what to configure.
 * (A production build cannot reach this state — see src/config/guard.ts.)
 */
export function AppStoreButton() {
  const badge = (
    <Image
      src="/badges/download-on-the-app-store.svg"
      alt="Download CATROT on the App Store"
      width={168}
      height={56}
      unoptimized
      priority
    />
  );

  if (!siteConfig.appStoreUrl) {
    return (
      <div>
        <span
          className={`${styles.badge} ${styles.unconfigured}`}
          aria-disabled="true"
          role="link"
        >
          {badge}
        </span>
        {process.env.NODE_ENV !== "production" ? (
          <p className={styles.devNote}>
            <strong>Not configured.</strong> Set{" "}
            <code>NEXT_PUBLIC_APP_STORE_URL</code> to the app&apos;s App Store
            listing. Until then this badge is deliberately inert rather than a
            broken link.
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <a
      className={styles.badge}
      href={siteConfig.appStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      {badge}
    </a>
  );
}
