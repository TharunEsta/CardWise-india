import { env } from "@/lib/env";

const DEFAULT_ADMIN_EMAILS = ["admin@cardwiseindia.com"];

export function isAdminEmail(email?: string | null) {
  if (!email) {
    return false;
  }

  const configuredEmails = env.ADMIN_EMAILS
    ? env.ADMIN_EMAILS.split(",").map((value) => value.trim().toLowerCase())
    : [];

  return [...DEFAULT_ADMIN_EMAILS, ...configuredEmails].includes(email.toLowerCase());
}
