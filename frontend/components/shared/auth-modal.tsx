"use client";

import { useEffect, useState } from "react";
import { Chrome, ShieldCheck } from "lucide-react";
import type { User } from "@supabase/supabase-js";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getDemoUser, signInDemoAdminUser, signInDemoUser, signOutDemoUser, type DemoUser } from "@/lib/demo-auth";
import { createClient } from "@/lib/supabase-client";
import { trackEvent } from "@/lib/analytics";

const ADMIN_COOKIE_NAME = "cardwise-admin-email";
const DEFAULT_ADMIN_EMAILS = ["admin@cardwiseindia.com"];

export function AuthModal() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [demoUser, setDemoUser] = useState<DemoUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  function syncAdminUi(email?: string | null) {
    const normalizedEmail = email?.toLowerCase() ?? null;
    const nextIsAdmin = normalizedEmail ? DEFAULT_ADMIN_EMAILS.includes(normalizedEmail) : false;

    setIsAdmin(nextIsAdmin);
    if (nextIsAdmin && email) {
      document.cookie = `${ADMIN_COOKIE_NAME}=${encodeURIComponent(email)}; path=/; SameSite=Lax`;
    } else {
      document.cookie = `${ADMIN_COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
    }
    window.dispatchEvent(new CustomEvent("cardwise-admin-session-changed", { detail: { isAdmin: nextIsAdmin } }));
    return nextIsAdmin;
  }

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) {
      setDemoUser(getDemoUser());
      const onChange = () => {
        const nextDemoUser = getDemoUser();
        setDemoUser(nextDemoUser);
        syncAdminUi(nextDemoUser?.email);
      };
      window.addEventListener("cardwise-demo-auth-changed", onChange);
      onChange();
      return () => window.removeEventListener("cardwise-demo-auth-changed", onChange);
    }

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      syncAdminUi(data.user?.email);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      syncAdminUi(session?.user?.email);
    });

    return () => subscription.unsubscribe();
  }, []);

  const activeEmail = user?.email ?? demoUser?.email ?? null;

  async function handleGoogleLogin() {
    trackEvent("auth_google_clicked", { source: "modal" });

    const supabase = createClient();
    if (!supabase) {
      const user = getDemoUser() ?? signInDemoUser();
      setDemoUser(user);
      syncAdminUi(user?.email);
      setMessage(user ? `Logged in as ${user.email}` : null);
      setOpen(false);
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
      setMessage(error.message);
    }
  }

  function handleDemoAdminLogin() {
    const user = signInDemoAdminUser();
    setDemoUser(user);
    syncAdminUi(user?.email);
    setMessage(user ? `Admin logged in as ${user.email}` : null);
    setOpen(false);
  }

  async function handleLogout() {
    const supabase = createClient();
    if (!supabase) {
      signOutDemoUser();
      setDemoUser(null);
      syncAdminUi(null);
      setOpen(false);
      return;
    }

    await supabase.auth.signOut();
    setUser(null);
    syncAdminUi(null);
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
              <Button variant="secondary" className="w-full" onClick={handleDemoAdminLogin}>
                Continue as Demo Admin
              </Button>
              {message ? <div className="text-sm text-emerald-200/85">{message}</div> : null}
              <div className="flex items-start gap-2 text-xs text-white/50">
                <ShieldCheck className="h-4 w-4 text-emerald-300" />
                Google login is running in demo pass-through mode until Supabase OAuth credentials are added.
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
