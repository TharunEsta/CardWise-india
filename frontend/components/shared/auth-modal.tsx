"use client";

import { useEffect, useState } from "react";
import { Chrome, ShieldCheck } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase-client";
import { trackEvent } from "@/lib/analytics";
import { useAuthUser } from "@/lib/use-auth-user";

const ADMIN_COOKIE_NAME = "cardwise-admin-email";

export function AuthModal() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { user, isConfigured } = useAuthUser();

  useEffect(() => {
    let cancelled = false;

    async function syncAdminUi() {
      const email = user?.email ?? null;
      const endpoint = "/api/auth/admin-session";
      const response = await fetch(endpoint, {
        method: email ? "POST" : "DELETE",
        headers: email ? { "Content-Type": "application/json" } : undefined,
        body: email ? JSON.stringify({ email }) : undefined
      }).catch(() => null);

      const payload = response && response.ok ? ((await response.json().catch(() => null)) as { isAdmin?: boolean } | null) : null;
      const nextIsAdmin = Boolean(payload?.isAdmin);

      if (!cancelled) {
        setIsAdmin(nextIsAdmin);
        if (!nextIsAdmin) {
          document.cookie = `${ADMIN_COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
        }
        window.dispatchEvent(new CustomEvent("cardwise-admin-session-changed", { detail: { isAdmin: nextIsAdmin } }));
      }
    }

    void syncAdminUi();

    return () => {
      cancelled = true;
    };
  }, [user?.email]);

  const activeEmail = user?.email ?? null;

  async function handleGoogleLogin() {
    trackEvent("auth_google_clicked", { source: "modal" });

    const supabase = createClient();
    if (!supabase) {
      setMessage("Google login is unavailable until Supabase environment variables are configured.");
      return;
    }

    const redirectTo =
      typeof window !== "undefined" ? `${window.location.origin}/auth/callback` : undefined;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo
      }
    });

    if (error) {
      const providerDisabled =
        error.message.toLowerCase().includes("unsupported provider") ||
        error.message.toLowerCase().includes("provider is not enabled");

      setMessage(
        providerDisabled
          ? "Google sign-in is not enabled in Supabase yet. Enable Google under Supabase Authentication > Providers and add the auth callback URL."
          : error.message
      );
    }
  }

  async function handleLogout() {
    const supabase = createClient();
    if (!supabase) {
      setMessage("Supabase is not configured, so there is no active session to sign out.");
      return;
    }

    await supabase.auth.signOut();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="max-w-[132px] sm:max-w-none">
          <span className="truncate">{activeEmail ? "Logged In" : "Login"}</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{activeEmail ? "You are logged in" : "Unlock free CardWise actions"}</DialogTitle>
          <DialogDescription>
            Browse everything publicly. Login only to save cards, get the free guide, leave reviews, request callback, and personalize suggestions.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 space-y-4">
          {activeEmail ? (
            <>
              <div className="break-all rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white/75">{activeEmail}</div>
              {isAdmin ? (
                <Button asChild variant="secondary" className="w-full">
                  <a href="/admin">Open Admin Dashboard</a>
                </Button>
              ) : null}
              <Button className="w-full" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button className="w-full" onClick={handleGoogleLogin}>
                <Chrome className="h-4 w-4" />
                Continue with Google
              </Button>
              {message ? <div className="text-sm text-emerald-200/85">{message}</div> : null}
              <div className="flex items-start gap-2 text-xs text-white/50">
                <ShieldCheck className="h-4 w-4 text-emerald-300" />
                {isConfigured
                  ? "Google login uses your Supabase OAuth provider and returns through the auth callback route."
                  : "Set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, and Supabase Google OAuth credentials to enable login."}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
