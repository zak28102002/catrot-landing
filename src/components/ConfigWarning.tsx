import { legalReviewComplete } from "@/config/guard";
import { missingConfigKeys } from "@/config/site";
import styles from "./ConfigWarning.module.css";

/**
 * Development-only banner listing everything that must be settled before this
 * site may go live. In production it renders nothing — a production build with
 * anything outstanding does not get built at all (src/config/guard.ts).
 */
export function ConfigWarning() {
  if (process.env.NODE_ENV === "production") return null;
  if (missingConfigKeys.length === 0 && legalReviewComplete) return null;

  return (
    <div className={styles.bar} role="status">
      <div className={styles.inner}>
        <span className={styles.mark} aria-hidden="true">
          ⚠
        </span>
        <div>
          <span className={styles.title}>Not ready to publish.</span>
          This notice is shown in development only; a production build fails
          until each item is resolved.
          <ul className={styles.list}>
            {missingConfigKeys.length > 0 ? (
              <li>
                Unset environment{" "}
                {missingConfigKeys.length === 1 ? "variable" : "variables"}:{" "}
                {missingConfigKeys.map((key, index) => (
                  <span key={key}>
                    {index > 0 ? ", " : ""}
                    <code>{key}</code>
                  </span>
                ))}
                .
              </li>
            ) : null}
            {!legalReviewComplete ? (
              <li>
                The Privacy Policy is generated from{" "}
                <code>src/config/data-practices.ts</code>, which has not been
                verified against the CATROT iOS app. Check every{" "}
                <code>VERIFY:</code> note in that file, then set{" "}
                <code>verified: true</code>.
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
}
