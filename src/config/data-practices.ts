/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CATROT — DECLARED DATA PRACTICES
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  ⚠  READ THIS BEFORE PUBLISHING THE SITE.
 *
 *  The /privacy page is generated entirely from this file. It contains no
 *  free-floating claims about what the app does — every factual statement on
 *  that page traces back to a value declared here.
 *
 *  This file was written WITHOUT access to the CATROT iOS source code. The
 *  values below are therefore UNVERIFIED STARTING POINTS, not findings. Each
 *  one is marked with a `VERIFY:` note describing exactly what to check in the
 *  app before the statement may be published.
 *
 *  Until `verified` is set to true:
 *    • `next build` (production) FAILS.
 *    • `next dev` renders the policy behind a draft banner.
 *
 *  To publish:
 *    1. Walk each entry against the real implementation, Info.plist entitlements
 *       and the SDKs in the Xcode project / Package.resolved.
 *    2. Correct, add or delete entries so they describe what the app truly does.
 *    3. Set `verified: true` and `lastVerified` to today's date.
 *
 *  This is a drafting aid, not legal advice. Have the finished text reviewed by
 *  a qualified lawyer before publication.
 */

export type LegalBasis =
  | "Performance of a contract"
  | "Legitimate interests"
  | "Consent"
  | "Legal obligation";

export type DataItem = {
  /** Short name of the data category, e.g. "Focus sessions". */
  label: string;
  /** Precisely what is included. Keep it concrete. */
  detail: string;
  /** Why the app handles it. */
  purpose: string;
  /** GDPR Article 6 basis relied on for this category. */
  legalBasis: LegalBasis;
  /** How long it is kept, and by whom. */
  retention: string;
};

export type ThirdParty = {
  name: string;
  role: string;
  /** What that party receives. If it receives nothing, say so plainly. */
  dataReceived: string;
  privacyPolicyUrl: string;
};

export const dataPractices = {
  /**
   * VERIFY: flip to true only after every entry below has been checked against
   * the shipping build of the app.
   */
  verified: false,

  /** ISO date the verification above was performed. */
  lastVerified: null as string | null,

  /** Date shown as "Last updated" on /privacy and /terms. */
  lastUpdated: "2026-09-10",

  /**
   * Does CATROT operate its own backend that receives personal data?
   *
   * VERIFY: search the app for network calls (URLSession, Alamofire, Supabase,
   * Firebase, a custom API base URL). If the only outbound traffic belongs to
   * Apple and to the purchase SDK, leave `operatesOwnServers` false.
   */
  backend: {
    operatesOwnServers: false,
    /** Required when operatesOwnServers is true: what is sent, and why. */
    description: null as string | null,
  },

  /**
   * VERIFY: does the app require sign-in, or create any account identifier?
   */
  account: {
    required: false,
    note: "CATROT does not ask you to create an account, and does not ask for your name, email address or phone number in order to use the app.",
  },

  /**
   * VERIFY: is iCloud / CloudKit sync enabled for app data (check the iCloud
   * capability in the Xcode project and any NSPersistentCloudKitContainer)?
   * If it is, iCloud belongs in `thirdParties` and the sync must be described
   * in the on-device section.
   */
  icloudSync: {
    enabled: false,
    note: null as string | null,
  },

  /**
   * Data that is created and kept on the device, and that we never receive.
   *
   * VERIFY: each of these must correspond to something the app actually stores
   * locally (UserDefaults, App Group container, Core Data / SwiftData store).
   * Delete anything the app does not do.
   */
  onDevice: [
    {
      label: "Screen Time and Device Activity information",
      detail:
        "Usage measurements provided by Apple's Screen Time APIs for the apps and categories you have chosen to track.",
      purpose:
        "To measure your activity against the limits you set, and to update how your cat is doing.",
      legalBasis: "Performance of a contract",
      retention: "On your device only. Removed when you delete the app.",
    },
    {
      label: "Your selected apps and categories",
      detail:
        "The apps and categories you pick as distracting. Apple hands these to the app as opaque tokens rather than as names, so the app cannot read which specific apps you chose.",
      purpose: "To apply your limits and focus sessions to the right apps.",
      legalBasis: "Performance of a contract",
      retention: "On your device only. Removed when you delete the app.",
    },
    {
      label: "Goals and preferences",
      detail:
        "Daily limits, schedules, notification preferences and other in-app settings.",
      purpose: "To run the app the way you configured it.",
      legalBasis: "Performance of a contract",
      retention: "On your device only. Removed when you delete the app.",
    },
    {
      label: "Focus sessions",
      detail:
        "When a focus session started, how long it lasted, and whether you completed it.",
      purpose: "To show your session history and progress.",
      legalBasis: "Performance of a contract",
      retention: "On your device only. Removed when you delete the app.",
    },
    {
      label: "Streaks and progress",
      detail:
        "Streak counts, milestones and the current state of your cat.",
      purpose: "To keep your progress between launches of the app.",
      legalBasis: "Performance of a contract",
      retention: "On your device only. Removed when you delete the app.",
    },
  ] satisfies DataItem[],

  /**
   * Data transmitted off the device to a party acting for us.
   *
   * VERIFY: this list must match the SDKs actually linked into the app. If the
   * app does not integrate a purchase SDK, empty this array and set
   * `subscriptions.provider` to null.
   */
  transmitted: [
    {
      label: "Subscription status",
      detail:
        "A randomly generated app user ID, the receipt Apple issues for your purchase, and basic device and app information (such as iOS version and app version) sent by the purchase management SDK.",
      purpose:
        "To confirm whether your subscription is active and to unlock paid features on your devices.",
      legalBasis: "Performance of a contract",
      retention:
        "Kept by the purchase management provider for as long as the subscription record is needed to operate and support the service.",
    },
  ] satisfies DataItem[],

  /**
   * VERIFY: check the Xcode project's package dependencies for analytics SDKs
   * (Firebase Analytics, Amplitude, Mixpanel, PostHog, TelemetryDeck …). If
   * there are none, leave this as-is. NEVER list a provider that is not linked.
   */
  analytics: {
    sdksInstalled: false,
    providers: [] as ThirdParty[],
  },

  /**
   * VERIFY: App Store Connect reports (Apple's own aggregate analytics and
   * crash reports) reach every app whose user has opted into sharing with
   * developers. Confirm whether a third-party crash reporter is also linked.
   */
  diagnostics: {
    appleAggregateReports: true,
    thirdPartyCrashReporting: [] as ThirdParty[],
  },

  /**
   * VERIFY: check whether AppTrackingTransparency is present in the project and
   * whether any SDK is configured for advertising or cross-app tracking.
   */
  tracking: {
    attFrameworkUsed: false,
    advertisingSdks: [] as ThirdParty[],
    sellsPersonalInformation: false,
    sharesForCrossContextBehavioralAdvertising: false,
  },

  /**
   * VERIFY: confirm the purchase stack. If RevenueCat is not used, replace or
   * remove this block and the matching entry in `thirdParties`.
   *
   * freeTrial: leave `null` unless the configured products genuinely include an
   * introductory free-trial offer. `null` means the policy says nothing about
   * trials.
   */
  subscriptions: {
    provider: "RevenueCat" as string | null,
    freeTrial: null as boolean | null,
  },

  /**
   * Everyone outside the company who handles data because of the app.
   *
   * VERIFY: nothing may be listed here that is not genuinely integrated, and
   * nothing genuinely integrated may be left out.
   */
  thirdParties: [
    {
      name: "Apple",
      role: "App Store distribution, in-app purchases and platform services",
      dataReceived:
        "Apple processes your purchase and your App Store account information as the seller of record. Apple also provides the Screen Time APIs the app relies on; that processing is governed by Apple's own privacy policy.",
      privacyPolicyUrl: "https://www.apple.com/legal/privacy/",
    },
    {
      name: "RevenueCat",
      role: "Subscription management",
      dataReceived:
        "A randomly generated app user ID, your purchase receipt, and basic device and app information used to determine whether your subscription is active.",
      privacyPolicyUrl: "https://www.revenuecat.com/privacy/",
    },
  ] satisfies ThirdParty[],

  /**
   * This website. It is a static marketing site: it sets no cookies of its own,
   * embeds no third-party scripts and runs no analytics.
   *
   * VERIFY: if you later add web analytics, a cookie banner, an embedded video
   * or a newsletter form, this block and the sections it feeds must change.
   */
  website: {
    host: "Vercel",
    hostPrivacyPolicyUrl: "https://vercel.com/legal/privacy-policy",
    setsCookies: false,
    analytics: false,
    note: "Our hosting provider processes the technical information any web server receives when it answers a request — such as your IP address, the page requested, and your browser's user-agent — in order to serve the site and to keep it secure.",
  },

  /**
   * Support correspondence. This one is true by construction: writing to the
   * support address means we receive the email.
   */
  support: {
    label: "Support correspondence",
    detail:
      "Your email address and whatever you choose to include in your message, including any screenshots you attach.",
    purpose: "To answer your question and keep a record of the exchange.",
    legalBasis: "Legitimate interests",
    retention:
      "Kept for as long as needed to resolve your request and for a reasonable period afterwards, then deleted.",
  } satisfies DataItem,

  /**
   * VERIFY: must match the age rating and the eligibility clause in the Terms.
   */
  children: {
    minimumAge: 13,
    note: "CATROT is not directed to children, and we do not knowingly collect personal information from children.",
  },

  /**
   * California. Do not assert that the CCPA/CPRA applies to the business until
   * counsel has confirmed it — the statute's thresholds turn on revenue and on
   * the volume of consumers' personal information handled.
   *
   * VERIFY: set to true only on advice that the thresholds are met.
   */
  california: {
    applicabilityConfirmed: false,
  },
};

export type DataPractices = typeof dataPractices;
