import type { Metadata } from "next";

import { LegalPage } from "@/components/shared/legal-page";

export const metadata: Metadata = {
  title: "Terms and Conditions | CardWise India",
  description: "Terms and conditions for using CardWise India, including comparison content, lead forms, and platform access."
};

const sections = [
  {
    heading: "Use of the Platform",
    body: [
      "CardWise India provides credit card discovery, comparison, editorial guides, and lead-generation tools intended to help users research financial products. The platform is informational in nature and does not itself issue cards, underwrite applications, or guarantee approval.",
      "By using the site, you agree to use it lawfully, provide accurate information in forms, and avoid any misuse that could interfere with service availability, security, or other users."
    ]
  },
  {
    heading: "Financial Information Disclaimer",
    body: [
      "Card benefits, fees, eligibility criteria, rewards, and issuer offers can change without notice. While CardWise India aims to keep information current, users should verify final terms directly with the relevant bank or issuer before applying for a card or relying on any offer.",
      "Nothing on the platform constitutes personalized financial, tax, legal, or investment advice. Decisions made using the site remain the responsibility of the user."
    ]
  },
  {
    heading: "Leads, Accounts, and Authentication",
    body: [
      "When you submit a callback request, download form, or authenticated request through the site, you agree that the provided information is accurate and that CardWise India may use it to respond to your request, improve service workflows, or share it with authorized internal systems and service providers.",
      "If authentication is enabled through Supabase or related services, you are responsible for maintaining the confidentiality of your session and for activities performed under your account."
    ]
  },
  {
    heading: "Intellectual Property and Content",
    body: [
      "The CardWise India brand, site design, editorial copy, comparisons, and original assets are protected by applicable intellectual property laws. You may use the site for personal, non-commercial purposes, but you may not copy, republish, scrape, or commercially exploit substantial parts of the platform without permission.",
      "Third-party trademarks, card names, bank names, and logos remain the property of their respective owners and are used for identification and comparison purposes only."
    ]
  },
  {
    heading: "Availability and Liability",
    body: [
      "The platform is provided on an as-available basis. CardWise India does not promise uninterrupted availability, error-free operation, or that every page, route, API response, or integration will always function without delay.",
      "To the maximum extent permitted by law, CardWise India is not liable for indirect, incidental, or consequential losses arising from use of the site, reliance on published information, or temporary downtime of platform features."
    ]
  },
  {
    heading: "Changes to These Terms",
    body: [
      "These terms may be updated from time to time to reflect product changes, regulatory needs, or operational updates. Continued use of the platform after changes become effective constitutes acceptance of the revised terms.",
      "Questions about these terms can be directed through the contact details or support channels made available on the platform."
    ]
  }
] as const;

export default function TermsAndConditionsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms and Conditions"
      intro="These terms govern access to and use of CardWise India, including its comparison tools, editorial content, API-backed flows, and authentication-enabled features."
      lastUpdated="April 9, 2026"
      sections={sections.map((section) => ({ ...section, body: [...section.body] }))}
    />
  );
}
