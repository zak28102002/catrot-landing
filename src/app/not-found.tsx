import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ConfigWarning } from "@/components/ConfigWarning";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SupportLink } from "@/components/SupportLink";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className={styles.shell}>
      <ConfigWarning />
      <SiteHeader />

      <main className={styles.main} id="main">
        <div className={styles.inner}>
          <div className={styles.disc}>
            <Image
              src="/brand/cat-worn.svg"
              alt=""
              width={168}
              height={168}
              unoptimized
            />
          </div>

          <p className={styles.code}>Error 404</p>
          <h1 className={styles.title}>This page wandered off.</h1>
          <p className={styles.body}>
            The cat has no idea where it went either. Let&apos;s get you back to
            somewhere that exists.
          </p>

          <div className={styles.actions}>
            <Link className={styles.primary} href="/">
              Back to CATROT
            </Link>
            <SupportLink className={styles.ghost} subject="CATROT support">
              Contact support
            </SupportLink>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
