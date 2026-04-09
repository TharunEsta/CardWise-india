"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

import { env, supabasePublicKey } from "@/lib/env";
import { createClient } from "@/lib/supabase-client";

export function useAuthUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    user,
    loading,
    isConfigured: Boolean(env.NEXT_PUBLIC_SUPABASE_URL && supabasePublicKey)
  };
}
