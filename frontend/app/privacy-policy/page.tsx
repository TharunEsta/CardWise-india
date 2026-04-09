import type { Metadata } from "next";

import { LegalPage } from "@/components/shared/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy | CardWise India",
  description: "Privacy policy for CardWise India covering analytics, lead forms, authentication, and Supabase-backed features."
};

const sections = [
  {
    heading: "Information We Collect",
    body: [
      "CardWise India may collect information you choose to provide, including lead form submissions, ebook download requests, contact details, and account identifiers used for authentication or admin access.",
      "We may also collect technical and usage information such as page views, interactions, approximate device and browser details, referral data, and event analytics generated when you use the platform."
    ]
  },
  {
    heading: "How We Use Information",
    body: [
      "We use collected information to operate the site, respond to user requests, deliver gated resources, analyze performance, improve comparisons and editorial content, protect the platform from misuse, and maintain administrative workflows.",
      "Where authentication or protected features are involved, personal data may also be used to verify sessions, manage access permissions, and support account-related requests."
    ]
  },
  {
    heading: "Supabase, Service Providers, and Integrations",
    body: [
      "CardWise India may use Supabase and other trusted infrastructure or communications providers to store data, manage authenticated sessions, send transactional emails, and support application functionality. These providers process data on our behalf subject to their own security and privacy obligations.",
      "Analytics and product tooling may also receive limited usage data to help us understand site performance and user journeys."
    ]
  },
  {
    heading: "Cookies and Tracking",
    body: [
      "The platform may use cookies or similar technologies to keep sessions active, remember preferences, measure traffic, and understand feature usage. Some cookies are necessary for core functionality, while others support analytics and operational insight.",
      "You can manage browser-level cookie settings, but disabling certain cookies may affect sign-in flows, callback behavior, or other interactive features."
    ]
  },
  {
    heading: "Data Sharing and Retention",
    body: [
      "We do not sell personal information as part of the normal operation of CardWise India. Information may be shared with service providers, internal admins, or legal authorities where required to operate the platform, respond to a request, enforce terms, or comply with law.",
      "Data is retained only for as long as reasonably necessary for business, product, compliance, fraud-prevention, or support purposes, after which it may be deleted or anonymized."
    ]
  },
  {
    heading: "Your Choices",
    body: [
      "You may choose not to submit personal information through forms, and you may contact the platform operator to request updates or deletion of information where applicable and legally permitted.",
      "If you no longer wish to receive communications related to a specific request, you can use the unsubscribe or contact options made available in those communications."
    ]
  }
] as const;

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy Policy"
      intro="This policy explains how CardWise India collects, uses, and protects information across its website, analytics tooling, lead forms, authenticated features, and API-powered workflows."
      lastUpdated="April 9, 2026"
      sections={sections.map((section) => ({ ...section, body: [...section.body] }))}
    />
  );
}
