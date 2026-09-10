import Image from "next/image";
import styles from "./CatMoodStrip.module.css";

/**
 * The one illustration on the landing page: the same cat, either side of the
 * habit it reflects.
 */
export function CatMoodStrip() {
  return (
    <figure className={styles.figure}>
      <div className={styles.pair}>
        <div className={styles.state}>
          <div className={`${styles.disc} ${styles.good}`}>
            <Image
              src="/brand/cat-thriving.svg"
              alt="The CATROT cat looking bright and well kept"
              width={158}
              height={158}
              unoptimized
            />
          </div>
          <span className={styles.caption}>Scroll less</span>
        </div>

        <svg
          className={styles.arrow}
          viewBox="0 0 48 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 8h42m0 0-7-6m7 6-7 6"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className={styles.state}>
          <div className={`${styles.disc} ${styles.worn}`}>
            <Image
              src="/brand/cat-worn.svg"
              alt="The same cat looking tired and unkempt"
              width={158}
              height={158}
              unoptimized
            />
          </div>
          <span className={styles.caption}>Scroll more</span>
        </div>
      </div>
    </figure>
  );
}
