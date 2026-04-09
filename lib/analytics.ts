"use client";

import posthog from "posthog-js";

import { env } from "@/lib/env";

let initialized = false;

export function initPostHog() {
  if (initialized || !env.NEXT_PUBLIC_POSTHOG_KEY || typeof window === "undefined") {
    return;
  }

  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://app.posthog.com",
    capture_pageview: false,
    persistence: "localStorage+cookie"
  });

  initialized = true;
}

export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  if (typeof window === "undefined") {
    return;
  }

  initPostHog();
  posthog.capture(eventName, properties);
}
