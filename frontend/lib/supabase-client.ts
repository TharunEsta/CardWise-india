import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

import { env, supabasePublicKey } from "@/lib/env";

let browserClient: SupabaseClient | null = null;

export function createClient() {
  if (!env.NEXT_PUBLIC_SUPABASE_URL || !supabasePublicKey) {
    return null;
  }

  if (!browserClient) {
    browserClient = createBrowserClient(env.NEXT_PUBLIC_SUPABASE_URL, supabasePublicKey);
  }

  return browserClient;
}
