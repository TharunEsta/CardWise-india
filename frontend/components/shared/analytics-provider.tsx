"use client";

import type React from "react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { initPostHog, trackEvent } from "@/lib/analytics";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    initPostHog();
  }, []);

  useEffect(() => {
    trackEvent("page_viewed", { pathname });
  }, [pathname]);

  return <>{children}</>;
}
