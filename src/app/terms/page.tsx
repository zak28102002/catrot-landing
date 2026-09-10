import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/LegalPage";
import { SupportLink } from "@/components/SupportLink";
import { dataPractices as dp } from "@/config/data-practices";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `The agreement between you and ${siteConfig.legalCompanyName} for the use of ${siteConfig.name}.`,
  alternates: { canonical: "/terms" },
  openGraph: {
    title: `${siteConfig.name} Terms & Conditions`,
    description: `The agreement between you and ${siteConfig.legalCompanyName} for the use of ${siteConfig.name}.`,
    url: `${siteConfig.websiteUrl}/terms`,
  },
};

const SUBJECT = "CATROT terms question";

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    content: (
      <>
        <p>
          These Terms &amp; Conditions form an agreement between you and{" "}
          <strong>{siteConfig.legalCompanyName}</strong>,{" "}
          {siteConfig.businessAddress} (&ldquo;we&rdquo;, &ldquo;us&rdquo;). By
          downloading, installing or using CATROT, you accept them. If you do not
          accept them, please do not use the app.
        </p>
        <p>
          Our <Link href="/privacy">Privacy Policy</Link> is part of this
          agreement. Your use of the App Store is additionally governed by
          Apple&apos;s own terms — see section 12.
        </p>
      </>
    ),
  },
  {
    id: "description",
    title: "Description of CATROT",
    content: (
      <>
        <p>
          CATROT is an iOS app for building healthier screen-time habits. You
          choose apps or categories you would like to use less, set goals and run
          focus sessions, and the state of an on-screen cat reflects how you are
          doing.
        </p>
        <p>
          <strong>
            CATROT is a wellness and productivity tool, not a medical device.
          </strong>{" "}
          It does not diagnose, treat, cure or prevent any condition, it is not
          treatment for addiction or compulsive behaviour, and it is not a
          substitute for advice from a qualified professional. We make no promise
          about how much your screen time will change, or that it will change at
          all — that depends on you.
        </p>
        <p>
          We may add, change or remove features. We may also discontinue the app,
          in which case we will give reasonable notice where we can.
        </p>
      </>
    ),
  },
  {
    id: "eligibility",
    title: "Eligibility",
    content: (
      <p>
        You must be at least {dp.children.minimumAge} years old to use CATROT,
        and old enough under the law where you live to enter into this agreement.
        If you are a minor in your jurisdiction, you may use CATROT only with the
        involvement of a parent or guardian who accepts these terms on your
        behalf.
      </p>
    ),
  },
  {
    id: "your-use",
    title: "Your Account / Use of the App",
    content: (
      <>
        {dp.account.required ? null : (
          <p>
            CATROT does not require you to create an account. Your data lives on
            your device, which means keeping your device secure — and backed up,
            if you care about your history — is your responsibility.
          </p>
        )}
        <p>
          We grant you a personal, non-exclusive, non-transferable, revocable
          licence to use CATROT on Apple devices you own or control, as permitted
          by the App Store Terms of Service. This licence is for your own use;
          you may not rent, lease, lend, sell or sublicense the app.
        </p>
        <p>
          You are responsible for the settings you choose and for the
          consequences of blocking or unblocking apps on your own device.
        </p>
      </>
    ),
  },
  {
    id: "permissions",
    title: "Screen Time and Device Permissions",
    content: (
      <>
        <p>
          CATROT relies on Apple&apos;s Screen Time, Family Controls and Device
          Activity frameworks. To work, it needs the Screen Time authorisation
          that iOS asks you for. You grant that permission, and you can withdraw
          it at any time in <strong>Settings → Screen Time</strong>.
        </p>
        <p>
          If you withdraw it, features that depend on it stop working. That is a
          limitation imposed by iOS, not a fault in the app.
        </p>
        <p>
          What these permissions mean for your data is set out in our{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </>
    ),
  },
  {
    id: "focus-features",
    title: "Focus Features and App Blocking",
    content: (
      <>
        <p>
          Focus sessions and app shields are built on iOS features whose
          behaviour is controlled by Apple. We therefore cannot promise that
          blocking will be complete or uninterrupted. Restrictions can be
          affected by iOS updates, by device settings, by Focus modes, by
          restarts, by low-power conditions, or by removing the app&apos;s
          permission.
        </p>
        <p>
          <strong>
            CATROT is a tool to support your intentions, not a security control.
          </strong>{" "}
          Do not rely on it where a failure to block something would cause harm,
          and do not rely on it to supervise another person&apos;s device unless
          you are lawfully entitled to do so.
        </p>
      </>
    ),
  },
  {
    id: "subscriptions",
    title: "Subscriptions",
    content: (
      <>
        <p>
          Some CATROT features may require a paid subscription. Where they do:
        </p>
        <ul>
          <li>
            <strong>Purchases are made through Apple.</strong> All purchases and
            subscriptions are processed by the App Store; Apple is the seller of
            record.
          </li>
          <li>
            <strong>Prices and periods are shown in the app.</strong> The price,
            the billing period and any offer that applies are displayed to you
            before you confirm the purchase, in your local currency. Nothing is
            charged until you confirm.
          </li>
          <li>
            <strong>Prices may change.</strong> Where a change affects an
            existing subscription, Apple notifies you and asks for your consent
            as its rules require.
          </li>
        </ul>
        <p>
          Payment is charged to your Apple Account on confirmation, and is
          governed by Apple&apos;s payment terms.
        </p>
      </>
    ),
  },
  {
    id: "trials",
    title: "Free Trials, if applicable",
    content: (
      <>
        {dp.subscriptions.freeTrial === true ? (
          <p>
            Where an introductory free trial is offered, its length and the terms
            that apply are shown in the app before you confirm. Unless you cancel
            at least 24 hours before the trial ends, it converts into a paid
            subscription at the price shown, charged to your Apple Account.
          </p>
        ) : (
          <p>
            If an introductory or free-trial offer is available for your account
            and region, the App Store will show it — together with its length and
            the price that applies afterwards — before you confirm the purchase.
            Offers vary by product, by region and by whether you have used an
            offer before, and eligibility is determined by Apple.
          </p>
        )}
        <p>
          Where a trial converts into a paid subscription, cancelling before the
          end of the trial period prevents the charge. Section 10 explains how to
          cancel.
        </p>
      </>
    ),
  },
  {
    id: "billing",
    title: "Billing and Automatic Renewal",
    content: (
      <>
        <p>
          <strong>Subscriptions renew automatically.</strong> Unless you cancel,
          a subscription renews at the end of each billing period and your Apple
          Account is charged for the next one.
        </p>
        <ul>
          <li>
            Apple charges the renewal within 24 hours before the current period
            ends, at the price then in effect.
          </li>
          <li>
            Renewal continues until you cancel. Deleting the app does not cancel
            a subscription.
          </li>
          <li>
            You can see and manage everything — renewal date, price and status —
            in your Apple Account.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "cancellation",
    title: "Cancellation",
    content: (
      <>
        <p>
          You can cancel at any time, and you do not need to ask us. On your
          iPhone or iPad:
        </p>
        <ul>
          <li>
            Open <strong>Settings</strong>, tap your name, then{" "}
            <strong>Subscriptions</strong>.
          </li>
          <li>
            Select CATROT, then <strong>Cancel Subscription</strong>.
          </li>
        </ul>
        <p>
          Cancel at least 24 hours before the renewal date to avoid being charged
          for the next period. Cancelling stops future renewals; you keep access
          to paid features until the end of the period you have already paid for.
        </p>
      </>
    ),
  },
  {
    id: "refunds",
    title: "Refunds",
    content: (
      <>
        <p>
          Because Apple is the seller of record,{" "}
          <strong>
            refunds are handled by Apple and are subject to Apple&apos;s
            applicable policies
          </strong>
          . We cannot issue a refund for an App Store purchase ourselves.
        </p>
        <p>
          To request one, use{" "}
          <a
            href="https://reportaproblem.apple.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            reportaproblem.apple.com
          </a>{" "}
          and sign in with your Apple Account.
        </p>
        <p>
          Nothing here affects statutory rights you may have as a consumer —
          including any right of withdrawal under the law where you live — which
          apply regardless of what this section says.
        </p>
        <p>
          If something has gone wrong, tell us anyway at{" "}
          <SupportLink subject={SUBJECT} />. We would like to know.
        </p>
      </>
    ),
  },
  {
    id: "apple-terms",
    title: "Apple App Store Terms",
    content: (
      <>
        <p>
          CATROT is distributed through the App Store, and the following applies
          in addition to everything else here.
        </p>
        <ul>
          <li>
            This agreement is between you and us alone.{" "}
            <strong>
              Apple is not a party to it, and CATROT is not affiliated with,
              endorsed by or sponsored by Apple.
            </strong>
          </li>
          <li>
            Your licence to use CATROT is governed by Apple&apos;s{" "}
            <a
              href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Licensed Application End User Licence Agreement
            </a>{" "}
            (the standard EULA), except where these terms grant you more. We do
            not attempt to replace Apple&apos;s platform terms; where these terms
            conflict with them, Apple&apos;s terms prevail for the matters they
            cover.
          </li>
          <li>
            We, not Apple, are solely responsible for CATROT, for its content and
            for any support and maintenance. Apple has no obligation to furnish
            any support for it.
          </li>
          <li>
            We, not Apple, are responsible for addressing any claim that CATROT
            fails to conform to an applicable warranty, and for any third-party
            claim that CATROT infringes intellectual property rights. In the
            event of a failure to conform to a warranty, you may notify Apple,
            and Apple may refund the purchase price; to the maximum extent
            permitted by law, Apple has no other warranty obligation whatsoever.
          </li>
          <li>
            Apple and its subsidiaries are third-party beneficiaries of these
            terms and may enforce them against you.
          </li>
          <li>
            You represent that you are not located in a country subject to a U.S.
            Government embargo or designated as terrorist-supporting, and that you
            are not on any U.S. Government list of prohibited or restricted
            parties.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable Use",
    content: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>
            Reverse engineer, decompile or disassemble CATROT, except where that
            restriction is prohibited by law.
          </li>
          <li>
            Copy, modify or create derivative works of the app, or distribute it.
          </li>
          <li>
            Circumvent, disable or interfere with security features or with
            purchase verification.
          </li>
          <li>
            Use CATROT to monitor or restrict another person&apos;s device
            without the authority to do so.
          </li>
          <li>Use CATROT unlawfully, or to infringe anyone&apos;s rights.</li>
        </ul>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    content: (
      <>
        <p>
          CATROT — its software, name, logo, the cat character, illustrations,
          copy and design — belongs to {siteConfig.legalCompanyName} or its
          licensors, and is protected by copyright, trade mark and other laws.
          Nothing in these terms transfers ownership to you.
        </p>
        <p>
          You may not use our name, logo or artwork without our written
          permission, except as ordinary references to the app allow.
        </p>
        <p>
          Apple, the Apple logo, iPhone, iPad, App Store and Screen Time are
          trade marks of Apple Inc. They are used here only to describe
          compatibility and distribution, and their use implies no endorsement.
        </p>
      </>
    ),
  },
  {
    id: "third-party-services",
    title: "Third-Party Services",
    content: (
      <>
        <p>
          CATROT relies on services operated by other companies — Apple&apos;s
          platform and App Store
          {dp.subscriptions.provider
            ? `, and ${dp.subscriptions.provider} for subscription management`
            : ""}
          . Those services have their own terms and privacy policies, and we do
          not control them. We are not responsible for their availability,
          accuracy or conduct.
        </p>
        <p>
          Links from the app or this website to other sites are provided for
          convenience and are not an endorsement.
        </p>
      </>
    ),
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    content: (
      <>
        <p>
          To the fullest extent permitted by law, CATROT is provided{" "}
          <strong>&ldquo;as is&rdquo; and &ldquo;as available&rdquo;</strong>,
          without warranties of any kind, whether express, implied or statutory,
          including any implied warranties of merchantability, fitness for a
          particular purpose, accuracy and non-infringement.
        </p>
        <p>We do not warrant that:</p>
        <ul>
          <li>The app will be uninterrupted, timely, secure or error-free.</li>
          <li>
            Measurements, blocking or reminders will always be accurate or
            complete, given that they depend on iOS.
          </li>
          <li>
            Using CATROT will produce any particular result for your habits,
            attention, wellbeing or productivity.
          </li>
        </ul>
        <p>
          Some jurisdictions do not allow the exclusion of implied warranties, so
          some of the above may not apply to you. Where consumer law gives you
          guarantees that cannot be excluded, they are unaffected by this
          section.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    content: (
      <>
        <p>
          To the fullest extent permitted by law, neither we nor our directors,
          employees or suppliers are liable for indirect, incidental, special,
          consequential, exemplary or punitive damages, or for loss of profits,
          data, goodwill or opportunity, arising out of or relating to your use
          of CATROT — whether the claim is in contract, tort, negligence, strict
          liability or otherwise, and even if we were advised such damages were
          possible.
        </p>
        <p>
          To the fullest extent permitted by law, our total liability for all
          claims relating to CATROT is limited to the greater of the amount you
          paid us for the app in the twelve months before the event giving rise
          to the claim, or ten euro.
        </p>
        <p>
          Nothing in these terms limits liability that cannot be limited by law —
          including liability for death or personal injury caused by negligence,
          or for fraud. If you are a consumer, your statutory rights are not
          affected.
        </p>
      </>
    ),
  },
  {
    id: "indemnification",
    title: "Indemnification",
    content: (
      <p>
        You agree to indemnify and hold harmless {siteConfig.legalCompanyName}{" "}
        and its officers, employees and agents from any claim, liability, loss or
        expense (including reasonable legal fees) arising out of your misuse of
        CATROT, your breach of these terms, or your violation of the law or of
        anyone else&apos;s rights. This does not apply to the extent the claim
        arises from our own act or omission.
      </p>
    ),
  },
  {
    id: "termination",
    title: "Termination",
    content: (
      <>
        <p>
          You can end this agreement at any time by deleting CATROT from your
          devices. Remember that deleting the app does not cancel a subscription
          — see section 10.
        </p>
        <p>
          We may suspend or terminate your access if you materially breach these
          terms, or where we are required to by law. Sections that by their
          nature should survive termination — intellectual property, disclaimers,
          limitation of liability, indemnification and governing law — do so.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to the Terms",
    content: (
      <p>
        We may update these terms as the app changes or the law requires. The
        &ldquo;Last updated&rdquo; date at the top reflects the current version.
        For material changes we will give reasonable notice, in the app or here,
        before they take effect. Continuing to use CATROT after that means you
        accept the updated terms; if you do not, please stop using the app and
        cancel any subscription.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing Law",
    content: (
      <>
        <p>
          These terms are governed by {siteConfig.governingLaw}, without regard
          to conflict-of-law rules. Disputes will be subject to the jurisdiction
          of the competent courts of that territory.
        </p>
        <p>
          If you are a consumer resident in the European Union, the United
          Kingdom or another jurisdiction whose law gives you the protection of
          your local courts and mandatory consumer rules, this section does not
          deprive you of that protection.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <>
        <p>Questions about these terms:</p>
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

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      supportSubject={SUBJECT}
      current="terms"
      intro={
        <p>
          The agreement between you and {siteConfig.legalCompanyName} for using
          CATROT. We have kept it as plain as we can, and the parts that matter
          most — subscriptions, cancellation and what the app can and cannot
          promise — are in sections 7 to 11 and 16.
        </p>
      }
      sections={sections}
    />
  );
}
