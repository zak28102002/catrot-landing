import Image from "next/image";
import { AppStoreButton } from "@/components/AppStoreButton";
import { CatMoodStrip } from "@/components/CatMoodStrip";
import { ConfigWarning } from "@/components/ConfigWarning";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.shell}>
      <ConfigWarning />
      <SiteHeader />

      <main className={styles.main} id="main">
        <section className={styles.hero}>
          <Image
            className={`${styles.icon} ${styles.rise}`}
            src="/brand/app-icon.svg"
            alt="CATROT"
            width={132}
            height={132}
            priority
            unoptimized
          />

          <h1 className={`${styles.wordmark} ${styles.rise}`}>CATROT</h1>

          <p className={`${styles.tagline} ${styles.rise}`}>
            Less scroll. More life.
          </p>

          <p className={`${styles.lede} ${styles.rise}`}>
            Take back your screen time — and keep your cat happy.
          </p>

          <div className={`${styles.cta} ${styles.rise}`}>
            <AppStoreButton />
          </div>

          <p className={`${styles.promise} ${styles.rise}`}>
            Your digital habits change your cat.
          </p>

          <div className={`${styles.strip} ${styles.rise}`}>
            <CatMoodStrip />
          </div>

          <p className={`${styles.coda} ${styles.rise}`}>
            Scroll less. Focus more. Watch your cat thrive.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
