"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

import { AuthModal } from "@/components/shared/auth-modal";
import { Button } from "@/components/ui/button";
import { getDemoUser, type DemoUser } from "@/lib/demo-auth";
import { createClient } from "@/lib/supabase-client";
import { trackEvent } from "@/lib/analytics";

export function EbookActions({
  sourcePage,
  title
}: {
  sourcePage: string;
  title: string;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [demoUser, setDemoUser] = useState<DemoUser | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) {
      setDemoUser(getDemoUser());
      const onChange = () => {
        setDemoUser(getDemoUser());
      };
      window.addEventListener("cardwise-demo-auth-changed", onChange);
      return () => window.removeEventListener("cardwise-demo-auth-changed", onChange);
    }

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const activeUser = user
    ? { id: user.id, email: user.email ?? "user@cardwiseindia.com" }
    : demoUser
      ? { id: demoUser.id, email: demoUser.email }
      : null;

  async function handleDownload() {
    if (!activeUser) {
      setMessage("Login with Google to unlock the free guide download.");
      return;
    }

    setLoading(true);
    setMessage(null);
    trackEvent("ebook_download_requested", { source_page: sourcePage, user_id: activeUser.id });

    try {
      const response = await fetch("/api/ebook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "download", sourcePage, title })
      });
      const data = await response.json();
      if (data.downloadUrl) {
        window.open(data.downloadUrl, "_blank", "noopener,noreferrer");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleEmail() {
    if (!activeUser?.email) {
      setMessage("Login with Google to email the free guide to your inbox.");
      return;
    }

    setLoading(true);
    setMessage(null);
    trackEvent("ebook_email_requested", { source_page: sourcePage, user_id: activeUser.id });

    try {
      const response = await fetch("/api/ebook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "email",
          sourcePage,
          title,
          email: activeUser.email
        })
      });
      const data = await response.json();
      setMessage(data.ok ? "Free guide emailed successfully." : data.message ?? "Unable to send email right now.");
    } finally {
      setLoading(false);
    }
  }

  if (!activeUser) {
    return (
      <div className="space-y-4">
        <div className="text-sm text-white/62">
          The free eBook unlocks only after login. Public visitors can read the preview, but download and email are gated behind Google sign-in.
        </div>
        <AuthModal />
        {message ? <div className="text-sm text-amber-200/85">{message}</div> : null}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleDownload} disabled={loading}>
          {loading ? "Preparing..." : "Download Guide"}
        </Button>
        <Button variant="secondary" onClick={handleEmail} disabled={loading}>
          {loading ? "Sending..." : "Email Guide"}
        </Button>
      </div>
      {message ? <div className="text-sm text-emerald-200/85">{message}</div> : null}
    </div>
  );
}
