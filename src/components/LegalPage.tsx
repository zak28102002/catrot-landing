import Link from "next/link";
import { dataPractices } from "@/config/data-practices";
import { siteConfig } from "@/config/site";
import { ConfigWarning } from "./ConfigWarning";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { SupportLink } from "./SupportLink";
import styles from "./LegalPage.module.css";

export type LegalSection = {
  /** Anchor fragment, e.g. "screen-time". */
  id: string;
  title: string;
  content: React.ReactNode;
};

/** Formats an ISO date as e.g. "10 September 2026". */
export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function LegalPage({
  title,
  intro,
  sections,
  supportSubject,
  current,
}: {
  title: string;
  intro: React.ReactNode;
  sections: LegalSection[];
  supportSubject: string;
  current: "privacy" | "terms";
}) {
  return (
    <div className={styles.shell}>
      <ConfigWarning />
      <SiteHeader current={current} />

      <main className={styles.main} id="main">
        <article className={styles.article}>
          <Link className={styles.back} href="/">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M10 3 5 8l5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to CATROT
          </Link>

          {!dataPractices.verified ? (
            <p className={styles.draft}>
              <strong>Draft — not yet published.</strong> This document is
              generated from declarations that have not been checked against the
              shipping app. It must not be treated as CATROT&apos;s published
              policy until that review is complete.
            </p>
          ) : null}

          <h1 className={styles.title}>{title}</h1>

          <div className={styles.meta}>
            <span>Last updated: {formatDate(dataPractices.lastUpdated)}</span>
            <SupportLink subject={supportSubject}>
              {siteConfig.supportEmail}
            </SupportLink>
          </div>

          <div className={styles.intro}>{intro}</div>

          <hr className={styles.rule} />

          <nav className={styles.contents} aria-label="Contents">
            <h2 className={styles.contentsTitle}>Contents</h2>
            <ol className={styles.contentsList}>
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>
                    <span className={styles.num}>{index + 1}.</span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {sections.map((section, index) => (
            <section
              className={styles.section}
              id={section.id}
              key={section.id}
            >
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNum}>{index + 1}</span>
                {section.title}
              </h2>
              <div className={styles.body}>{section.content}</div>
            </section>
          ))}

          <aside className={styles.support}>
            <h2 className={styles.supportTitle}>Questions about this?</h2>
            <p className={styles.supportBody}>
              Write to us and a person will read it.
            </p>
            <div className={styles.supportActions}>
              <SupportLink className={styles.pillPrimary} subject={supportSubject}>
                {siteConfig.supportEmail}
              </SupportLink>
              <Link className={styles.pillGhost} href="/">
                Back to CATROT
              </Link>
            </div>
          </aside>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}

/** Renders a declared list of data categories as a labelled panel. */
export function DataPanel({
  heading,
  tone,
  items,
  showLegalBasis = false,
}: {
  heading: string;
  tone?: "mint";
  items: readonly {
    label: string;
    detail: string;
    purpose: string;
    legalBasis: string;
    retention: string;
  }[];
  showLegalBasis?: boolean;
}) {
  return (
    <div className={`${styles.panel} ${tone === "mint" ? styles.mint : ""}`}>
      <p className={styles.panelHeading}>{heading}</p>
      {items.map((item) => (
        <div className={styles.entry} key={item.label}>
          <p className={styles.entryLabel}>{item.label}</p>
          <p className={styles.entryDetail}>{item.detail}</p>
          <p className={styles.entryMeta}>
            <span>Why:</span> {item.purpose}
            {showLegalBasis ? (
              <>
                <br />
                <span>Legal basis (GDPR):</span> {item.legalBasis}
              </>
            ) : null}
            <br />
            <span>Kept:</span> {item.retention}
          </p>
        </div>
      ))}
    </div>
  );
}

export { styles as legalStyles };
