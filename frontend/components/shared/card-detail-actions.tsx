"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

import { AuthModal } from "@/components/shared/auth-modal";
import { Button } from "@/components/ui/button";
import { getDemoUser, type DemoUser } from "@/lib/demo-auth";
import { createClient } from "@/lib/supabase-client";

export function CardDetailActions({ cardName }: { cardName: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [demoUser, setDemoUser] = useState<DemoUser | null>(null);
  const [message, setMessage] = useState<string | null>(null);

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

  const activeEmail = user?.email ?? demoUser?.email ?? null;

  if (!activeEmail) {
    return (
      <div className="space-y-3">
        <AuthModal />
        <div className="text-sm text-white/55">Login to request a callback and save {cardName}.</div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Button
        onClick={() => {
          setMessage(`Callback requested for ${cardName}. Our team can follow up using ${activeEmail}.`);
        }}
      >
        Get Callback
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          setMessage(`${cardName} saved to your shortlist.`);
        }}
      >
        Save Card
      </Button>
      {message ? <div className="text-sm text-emerald-200/85">{message}</div> : null}
    </div>
  );
}
