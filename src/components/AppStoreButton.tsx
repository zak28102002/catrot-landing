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
 * With NEXT_PUBLIC_APP_STORE_URL unset there is nowhere to send anyone, so the
 * badge renders inert under a "coming soon" caption rather than as a link that
 * goes nowhere. In development an extra note names the variable to set.
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
      <div className={styles.pending}>
        <span
          className={`${styles.badge} ${styles.unconfigured}`}
          aria-disabled="true"
          role="link"
        >
          {badge}
        </span>
        <p className={styles.pendingNote}>Coming soon to the App Store.</p>
        {process.env.NODE_ENV !== "production" ? (
          <p className={styles.devNote}>
            <strong>Not configured.</strong> Set{" "}
            <code>NEXT_PUBLIC_APP_STORE_URL</code> to the app&apos;s App Store
            listing and this becomes a working link. Until then the badge is
            deliberately inert rather than broken.
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
