import { legalReviewComplete } from "@/config/guard";
import { missingConfig } from "@/config/site";
import styles from "./ConfigWarning.module.css";

/**
 * Development-only banner listing what is still unset and what each omission
 * costs. None of it blocks a build: unset values are left out of the rendered
 * page rather than shown as placeholders. It renders nothing in production.
 */
export function ConfigWarning() {
  if (process.env.NODE_ENV === "production") return null;
  if (missingConfig.length === 0 && legalReviewComplete) return null;

  return (
    <div className={styles.bar} role="status">
      <div className={styles.inner}>
        <span className={styles.mark} aria-hidden="true">
          ⚠
        </span>
        <div>
          <span className={styles.title}>Not fully configured.</span>
          Shown in development only. The site still builds and deploys —
          anything unset is left out of the page rather than published as a
          placeholder.
          <ul className={styles.list}>
            {!legalReviewComplete ? (
              <li>
                <strong>Blocks the production build.</strong> The Privacy Policy
                is generated from <code>src/config/data-practices.ts</code>,
                which is not marked verified. Check every <code>VERIFY:</code>{" "}
                note in that file, then set <code>verified: true</code>.
              </li>
            ) : null}
            {missingConfig.map((entry) => (
              <li key={entry.key}>
                <code>{entry.key}</code> — {entry.consequence}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
