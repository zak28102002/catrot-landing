import type { Metadata } from "next";
import Link from "next/link";
import {
  DataPanel,
  LegalPage,
  type LegalSection,
} from "@/components/LegalPage";
import { SupportLink } from "@/components/SupportLink";
import { dataPractices as dp } from "@/config/data-practices";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} handles information, what stays on your device, and the rights you have over it.`,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: `${siteConfig.name} Privacy Policy`,
    description: `How ${siteConfig.name} handles information, what stays on your device, and the rights you have over it.`,
    url: `${siteConfig.websiteUrl}/privacy`,
  },
};

const SUBJECT = "CATROT privacy request";

/** Every third party we have declared, in one place. */
const allThirdParties = [
  ...dp.thirdParties,
  ...dp.analytics.providers,
  ...dp.diagnostics.thirdPartyCrashReporting,
  ...dp.tracking.advertisingSdks,
];

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who We Are",
    content: (
      <>
        <p>
          CATROT is an iOS app published by{" "}
          <strong>{siteConfig.legalCompanyName}</strong>, {siteConfig.businessAddress}.
          In this policy, &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo;
          mean that company. Under the EU and UK General Data Protection
          Regulation we are the controller of the limited personal data described
          below.
        </p>
        <p>
          This policy covers the CATROT iOS app and this website. CATROT is an
          independent, third-party application. It is not affiliated with,
          endorsed by, sponsored by or provided by Apple Inc.
        </p>
        <p>
          CATROT is a wellness and productivity app. It is not a medical device,
          it does not provide medical or psychological advice, and it is not a
          treatment for any condition.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    title: "What Information We Collect",
    content: (
      <>
        <p>
          Most of what CATROT knows about you never leaves your iPhone. The
          panels below separate what stays on your device from what is sent
          elsewhere, and nothing appears here that the app does not actually
          handle.
        </p>
        {dp.account.required ? null : <p>{dp.account.note}</p>}

        <DataPanel
          heading="Stays on your device"
          tone="mint"
          items={dp.onDevice}
        />

        {dp.transmitted.length > 0 ? (
          <DataPanel
            heading="Sent to a service acting for us"
            items={dp.transmitted}
          />
        ) : (
          <p>
            <strong>
              No information from the app is transmitted to us or to a service
              acting for us.
            </strong>
          </p>
        )}

        <DataPanel heading="If you contact us" items={[dp.support]} />

        <p>
          <strong>This website.</strong> {dp.website.note}{" "}
          {dp.website.setsCookies
            ? null
            : "The site itself sets no cookies, embeds no third-party scripts and runs no analytics."}
        </p>
      </>
    ),
  },
  {
    id: "how-we-collect",
    title: "How We Collect Information",
    content: (
      <>
        <ul>
          <li>
            <strong>From your device, through Apple&apos;s frameworks.</strong>{" "}
            Once you grant Screen Time access, iOS reports activity for the apps
            and categories you selected. This happens inside the app on your
            device.
          </li>
          <li>
            <strong>From what you set up in the app.</strong> Your goals, limits
            and preferences are the ones you enter.
          </li>
          {dp.subscriptions.provider ? (
            <li>
              <strong>From your purchase.</strong> When you subscribe, Apple
              issues a receipt that is validated so the app knows your
              subscription is active.
            </li>
          ) : null}
          <li>
            <strong>From you, directly.</strong> When you email support, we
            receive whatever you send.
          </li>
        </ul>
        <p>
          We do not buy personal information, and we do not obtain it from data
          brokers or from other apps.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How We Use Information",
    content: (
      <>
        <p>Each category is used only for the purpose listed beside it above:</p>
        <ul>
          <li>To run the features you turned on, and to apply your limits.</li>
          <li>
            To keep your streaks, history and the state of your cat between
            launches.
          </li>
          {dp.subscriptions.provider ? (
            <li>
              To confirm whether your subscription is active and unlock paid
              features.
            </li>
          ) : null}
          <li>To answer you when you get in touch.</li>
          <li>
            To keep the app working — fixing crashes and faults, and protecting
            against abuse.
          </li>
        </ul>
        <p>
          We do not use your information to build advertising profiles, and we do
          not use it to make decisions about you that produce legal or similarly
          significant effects.
        </p>
      </>
    ),
  },
  {
    id: "screen-time",
    title: "Screen Time & Device Activity Data",
    content: (
      <>
        <p>
          This is the part people ask about most, so it is worth being exact.
        </p>
        {dp.backend.operatesOwnServers && dp.backend.description ? (
          <p>{dp.backend.description}</p>
        ) : (
          <>
            <p>
              <strong>
                Your Screen Time and Device Activity information stays on your
                device.
              </strong>{" "}
              It is not uploaded to any server operated by us. We do not receive
              it, we cannot read it, and we cannot reconstruct it. We do not
              operate a backend that receives app data.
            </p>
            <p>
              This is also enforced by iOS itself. Apple&apos;s Family Controls
              and Device Activity frameworks hand apps like CATROT{" "}
              <em>opaque tokens</em> rather than names: the app can tell that a
              selected app was used, and for how long, without ever learning
              which app it is. Those tokens are meaningless outside your device.
            </p>
            <p>
              In practice: CATROT can see that you spent time in the apps you
              chose to limit. We — the people who make CATROT — cannot.
            </p>
          </>
        )}
        <p>
          Deleting CATROT removes the data it stored on your device.{" "}
          {dp.icloudSync.enabled && dp.icloudSync.note ? dp.icloudSync.note : null}
        </p>
      </>
    ),
  },
  {
    id: "apple-permissions",
    title: "Apple Permissions",
    content: (
      <>
        <p>
          CATROT asks for permissions only when a feature needs them, and each
          one can be withdrawn at any time in the iOS Settings app.
        </p>
        <ul>
          <li>
            <strong>Screen Time access (Family Controls).</strong> Required for
            the app to measure your activity and to shield the apps you select.
            iOS presents Apple&apos;s own authorisation prompt. Without it, the
            core features cannot work.
          </li>
          <li>
            <strong>Notifications.</strong> Optional. Used for reminders and for
            telling you how your cat is doing.
          </li>
        </ul>
        <p>
          Revoking a permission stops the related feature. It does not delete
          data already stored on your device — deleting the app does that.
        </p>
      </>
    ),
  },
  {
    id: "subscriptions",
    title: "Subscriptions and Payments",
    content: (
      <>
        <p>
          Any purchase in CATROT is processed by Apple through the App Store.{" "}
          <strong>
            We never see or receive your card number, your billing address or
            your Apple Account credentials.
          </strong>{" "}
          Apple handles the payment and shares only what it chooses to share with
          developers.
        </p>
        {dp.subscriptions.provider ? (
          <p>
            We use {dp.subscriptions.provider} to check the receipt Apple issues
            and to tell the app whether your subscription is active. What that
            involves is set out in the panel in section 2 and in section 9.
          </p>
        ) : null}
        <p>
          Prices, billing periods and any introductory offers are shown in the
          app before you confirm a purchase, and are also governed by our{" "}
          <Link href="/terms">Terms &amp; Conditions</Link>.
        </p>
      </>
    ),
  },
  {
    id: "analytics",
    title: "Analytics and Diagnostics",
    content: (
      <>
        {dp.analytics.sdksInstalled ? (
          <>
            <p>CATROT includes the following analytics services:</p>
            <ul>
              {dp.analytics.providers.map((provider) => (
                <li key={provider.name}>
                  <strong>{provider.name}</strong> — {provider.role}.{" "}
                  {provider.dataReceived}{" "}
                  <a
                    href={provider.privacyPolicyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy policy
                  </a>
                  .
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>
            <strong>
              CATROT does not include third-party analytics software.
            </strong>{" "}
            There is no analytics SDK in the app, so no behavioural or usage
            events are sent to an analytics provider.
          </p>
        )}

        {dp.diagnostics.appleAggregateReports ? (
          <p>
            Apple provides developers with aggregate, non-identifying reports —
            crash logs, download counts and performance metrics — through App
            Store Connect. Whether your device contributes to these is decided by
            your own iOS setting under{" "}
            <strong>
              Settings → Privacy &amp; Security → Analytics &amp; Improvements
            </strong>
            , not by us.
          </p>
        ) : null}

        {dp.diagnostics.thirdPartyCrashReporting.length > 0 ? (
          <>
            <p>We also use the following crash reporting service:</p>
            <ul>
              {dp.diagnostics.thirdPartyCrashReporting.map((provider) => (
                <li key={provider.name}>
                  <strong>{provider.name}</strong> — {provider.dataReceived}{" "}
                  <a
                    href={provider.privacyPolicyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy policy
                  </a>
                  .
                </li>
              ))}
            </ul>
          </>
        ) : null}

        {dp.tracking.attFrameworkUsed ? null : (
          <p>
            CATROT does not track you across apps or websites owned by other
            companies, and does not present Apple&apos;s App Tracking
            Transparency prompt, because it has nothing to ask for.
          </p>
        )}
      </>
    ),
  },
  {
    id: "third-parties",
    title: "Third-Party Services",
    content: (
      <>
        <p>
          These are the only outside parties involved in running CATROT. Each
          handles data under its own privacy policy, which we encourage you to
          read.
        </p>
        <ul>
          {allThirdParties.map((party) => (
            <li key={party.name}>
              <strong>{party.name}</strong> — {party.role}. {party.dataReceived}{" "}
              <a
                href={party.privacyPolicyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy policy
              </a>
              .
            </li>
          ))}
          <li>
            <strong>{dp.website.host}</strong> — hosting for this website.{" "}
            {dp.website.note}{" "}
            <a
              href={dp.website.hostPrivacyPolicyUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy policy
            </a>
            .
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "sharing",
    title: "How We Share Information",
    content: (
      <>
        <p>
          <strong>We do not sell your personal information</strong>, and we do
          not share it with anyone for their own marketing or advertising.
        </p>
        <p>We disclose information only in these situations:</p>
        <ul>
          <li>
            <strong>To the service providers listed in section 9</strong>, and
            only so far as they need it to perform their function for us.
          </li>
          <li>
            <strong>Where the law requires it</strong> — a valid legal request,
            court order or obligation we are subject to.
          </li>
          <li>
            <strong>To protect people</strong> — where disclosure is necessary to
            investigate abuse, prevent fraud, or protect the rights and safety of
            our users or of others.
          </li>
          <li>
            <strong>In a corporate transaction</strong> — if the business is
            merged, acquired or reorganised, information may transfer to the
            successor, which would remain bound by this policy or give you notice
            of a new one.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "transfers",
    title: "International Data Transfers",
    content: (
      <>
        <p>
          The providers named in section 9 may process information on servers
          located outside your country, including in the United States. Where
          personal data is transferred out of the European Economic Area, the
          United Kingdom or Switzerland, we rely on the transfer safeguards those
          providers put in place — typically the European Commission&apos;s
          standard contractual clauses, together with the UK addendum where it
          applies. Each provider&apos;s privacy documentation sets out the
          mechanism it uses.
        </p>
        <p>
          Because the information described in section 5 never leaves your
          device, it is not transferred anywhere.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "Data Retention",
    content: (
      <>
        <p>
          The &ldquo;Kept&rdquo; line on each entry in section 2 states how long
          that category lasts. In summary:
        </p>
        <ul>
          <li>
            <strong>Data on your device</strong> stays until you delete it in the
            app, or until you delete the app.
          </li>
          {dp.transmitted.length > 0 ? (
            <li>
              <strong>Subscription records</strong> are kept by the provider for
              as long as they are needed to operate and support your
              subscription, and to meet the tax and accounting obligations that
              apply to purchases.
            </li>
          ) : null}
          <li>
            <strong>Support emails</strong> are kept while we resolve your
            request and for a reasonable period afterwards, then deleted.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "security",
    title: "Data Security",
    content: (
      <>
        <p>
          Because almost everything CATROT holds stays on your iPhone, it is
          protected first and foremost by your device: your passcode, Face ID or
          Touch ID, and iOS data protection. Keeping your device updated and
          locked is the single most effective thing you can do.
        </p>
        <p>
          For the limited data that does travel — the subscription check in
          section 2, and requests to this website — transport is encrypted with
          HTTPS. We keep access to any provider dashboards limited to people who
          need it.
        </p>
        <p>
          No app, website or transmission method is completely secure, and we
          make no guarantee that our safeguards cannot be defeated. We do not
          claim any security certification.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your Privacy Rights",
    content: (
      <>
        <p>
          Wherever you live, you can do the following:
        </p>
        <ul>
          <li>
            <strong>Erase what the app holds</strong> by deleting CATROT from
            your device. This removes the data it stored locally.
          </li>
          <li>
            <strong>Withdraw Screen Time access</strong> at any time in{" "}
            <strong>Settings → Screen Time</strong>, and notification permission
            in <strong>Settings → Notifications</strong>.
          </li>
          <li>
            <strong>Ask us anything about your data</strong> by writing to{" "}
            <SupportLink subject={SUBJECT} />.
          </li>
        </ul>
        <p>
          We cannot retrieve or delete for you the information we never receive.
          If you ask us to delete Screen Time data, the honest answer is that we
          do not hold any — deleting the app is what removes it.
        </p>
      </>
    ),
  },
  {
    id: "gdpr",
    title: "GDPR Rights",
    content: (
      <>
        <p>
          If you are in the European Economic Area, the United Kingdom or
          Switzerland, you have the following rights over personal data we hold
          about you:
        </p>
        <ul>
          <li>
            <strong>Access</strong> — to be told whether we hold personal data
            about you and to receive a copy of it.
          </li>
          <li>
            <strong>Rectification</strong> — to have inaccurate data corrected
            and incomplete data completed.
          </li>
          <li>
            <strong>Erasure</strong> — to have your data deleted where one of the
            grounds in Article 17 applies.
          </li>
          <li>
            <strong>Restriction</strong> — to have our processing limited while,
            for example, a dispute about accuracy is resolved.
          </li>
          <li>
            <strong>Portability</strong> — to receive data you provided to us in
            a structured, commonly used, machine-readable format, and to have it
            sent to another controller where technically feasible.
          </li>
          <li>
            <strong>Objection</strong> — to object to processing based on our
            legitimate interests, on grounds relating to your particular
            situation.
          </li>
          <li>
            <strong>Withdrawal of consent</strong> — where we rely on your
            consent, to withdraw it at any time, without affecting processing
            carried out before you withdrew it.
          </li>
        </ul>
        <p>
          <strong>How to exercise them.</strong> Email{" "}
          <SupportLink subject={SUBJECT} /> and tell us what you would like to
          do. We will respond within one month, and will tell you if we need
          longer because the request is complex. We may need to ask you for
          information to confirm the request comes from you — for the purchase
          data in section 2, the Apple Account email used for the purchase or the
          transaction identifier from your receipt is usually enough. Exercising
          these rights is free unless a request is manifestly unfounded or
          excessive.
        </p>
        <p>
          <strong>Legal bases.</strong> The basis we rely on for each category is
          shown beside it below.
        </p>
        <DataPanel
          heading="Processing and its legal basis"
          items={[...dp.onDevice, ...dp.transmitted, dp.support]}
          showLegalBasis
        />
        <p>
          <strong>Complaints.</strong> You have the right to lodge a complaint
          with your local data protection supervisory authority. We would
          appreciate the chance to address your concern first.
        </p>
      </>
    ),
  },
  {
    id: "california",
    title: "California Privacy Rights",
    content: (
      <>
        <p>
          Two things are true regardless of which statutes apply to us:
        </p>
        <ul>
          <li>
            <strong>
              We do not sell personal information
            </strong>{" "}
            as that term is defined by California law.
          </li>
          <li>
            <strong>
              We do not share personal information for cross-context behavioural
              advertising.
            </strong>{" "}
            CATROT contains no advertising software.
          </li>
        </ul>
        <p>
          Whether the California Consumer Privacy Act, as amended by the CPRA,
          applies to a particular business depends on thresholds set out in the
          statute. We make no claim here about whether we meet them.{" "}
          {dp.california.applicabilityConfirmed
            ? "We have confirmed that the CCPA applies to us, and California residents may exercise the rights it provides — to know, to delete, to correct, and to opt out — by contacting us."
            : "Either way, if you are a California resident we will handle a request to know, correct or delete your personal information exactly as described in sections 14 and 15."}
        </p>
        <p>
          We will not discriminate against you for making a privacy request. To
          make one, write to <SupportLink subject={SUBJECT} />.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children's Privacy",
    content: (
      <>
        <p>
          {dp.children.note} CATROT is intended for people aged{" "}
          {dp.children.minimumAge} and over.
        </p>
        <p>
          If you believe a child has provided us with personal information — for
          example by emailing support — please contact{" "}
          <SupportLink subject={SUBJECT} /> and we will delete it.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    content: (
      <>
        <p>
          If what the app does changes, this policy changes with it. The
          &ldquo;Last updated&rdquo; date at the top always reflects the current
          version.
        </p>
        <p>
          For a change that materially affects how we handle your information, we
          will give you reasonable notice — in the app, or here — before it takes
          effect. Continuing to use CATROT after a change means the updated
          policy applies to you.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact Us",
    content: (
      <>
        <p>
          Questions, requests and complaints about privacy all go to the same
          place, and a person reads them:
        </p>
        <ul>
          <li>
            <strong>Email</strong> — <SupportLink subject={SUBJECT} />
          </li>
          <li>
            <strong>Post</strong> — {siteConfig.legalCompanyName},{" "}
            {siteConfig.businessAddress}
          </li>
        </ul>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      supportSubject={SUBJECT}
      current="privacy"
      intro={
        <p>
          CATROT is built so that the sensitive part — what you actually do on
          your phone — stays on your phone. This policy explains exactly what
          that means, what little travels beyond it, and what you can ask us to
          do.
        </p>
      }
      sections={sections}
    />
  );
}
