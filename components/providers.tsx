"use client";

import type React from "react";
import { ThemeProvider } from "next-themes";

import { AnalyticsProvider } from "@/components/shared/analytics-provider";
import { SmoothScrollProvider } from "@/components/shared/smooth-scroll-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <AnalyticsProvider>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </AnalyticsProvider>
    </ThemeProvider>
  );
}
