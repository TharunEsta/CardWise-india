"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, Sparkles } from "lucide-react";
import type { User } from "@supabase/supabase-js";

import { AuthModal } from "@/components/shared/auth-modal";
import { CommandSearch } from "@/components/shared/search-command";
import { Button } from "@/components/ui/button";
import { getDemoUser, type DemoUser } from "@/lib/demo-auth";
import { createClient } from "@/lib/supabase-client";

export function Navbar() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [demoUser, setDemoUser] = useState<DemoUser | null>(null);

  useEffect(() => {
    const readAdminCookie = () => {
      setShowAdmin(document.cookie.split("; ").some((cookie) => cookie.startsWith("cardwise-admin-email=")));
    };

    readAdminCookie();
    window.addEventListener("cardwise-admin-session-changed", readAdminCookie);

    return () => {
      window.removeEventListener("cardwise-admin-session-changed", readAdminCookie);
    };
  }, []);

  useEffect(() => {
    const supabase = createClient();

    if (!supabase) {
      const onChange = () => setDemoUser(getDemoUser());
      onChange();
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

  const isLoggedIn = Boolean(user ?? demoUser);

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-slate-950/40 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="glass-panel flex h-11 w-11 items-center justify-center rounded-2xl">
            <Sparkles className="h-5 w-5 text-cyan-200" />
          </div>
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-[0.32em] text-white/45">CardWise India</div>
            <div className="truncate font-display text-base text-white sm:text-lg">Premium Card Intelligence</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-white/70 md:flex">
          <Link href="/banks" className="transition hover:text-white">Banks</Link>
          <Link href="/compare" className="transition hover:text-white">Compare</Link>
          <Link href="/guides/best-credit-cards-in-india-2026-complete-comparison-guide" className="transition hover:text-white">eBook</Link>
          {showAdmin ? <Link href="/admin" className="transition hover:text-white">Admin</Link> : null}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <CommandSearch>
            <Button variant="secondary" size="sm" className="hidden md:inline-flex">
              <Search className="h-4 w-4" />
              Search
            </Button>
          </CommandSearch>
          {isLoggedIn ? (
            <Button asChild variant="secondary" size="sm" className="hidden md:inline-flex">
              <Link href="/api/ebook/download" target="_blank" rel="noreferrer">
                Download eBook
              </Link>
            </Button>
          ) : null}
          <AuthModal />
        </div>
      </div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 md:hidden">
          <Button asChild variant="secondary" size="sm" className="shrink-0">
            <Link href="/banks">Banks</Link>
          </Button>
          <Button asChild variant="secondary" size="sm" className="shrink-0">
            <Link href="/compare">Compare</Link>
          </Button>
          <Button asChild variant="secondary" size="sm" className="shrink-0">
            <Link href="/guides/best-credit-cards-in-india-2026-complete-comparison-guide">eBook</Link>
          </Button>
          {isLoggedIn ? (
            <Button asChild variant="secondary" size="sm" className="shrink-0">
              <Link href="/api/ebook/download" target="_blank" rel="noreferrer">
                Download eBook
              </Link>
            </Button>
          ) : null}
          {showAdmin ? (
            <Button asChild variant="secondary" size="sm" className="shrink-0">
              <Link href="/admin">Admin</Link>
            </Button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
