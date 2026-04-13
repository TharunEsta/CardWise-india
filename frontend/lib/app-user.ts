import type { User } from "@supabase/supabase-js";

import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createAdminClient } from "@/lib/supabase-admin";

export type AppUserRecord = {
  id: string;
  auth_user_id: string | null;
  name: string | null;
  email: string | null;
};

export async function getAuthenticatedAppUser() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return { authUser: null, appUser: null as AppUserRecord | null };
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { authUser: null, appUser: null as AppUserRecord | null };
  }

  const appUser = await ensureAppUser(user);
  return { authUser: user, appUser };
}

export async function ensureAppUser(user: User) {
  const admin = createAdminClient();
  if (!admin) {
    return null;
  }

  const { data: existing } = await admin
    .from("users")
    .select("id, auth_user_id, name, email")
    .eq("auth_user_id", user.id)
    .maybeSingle<AppUserRecord>();

  if (existing) {
    return existing;
  }

  const payload = {
    auth_user_id: user.id,
    email: user.email ?? null,
    name: (user.user_metadata.full_name as string | undefined) ?? (user.user_metadata.name as string | undefined) ?? user.email ?? "CardWise user",
    google_id: typeof user.app_metadata.provider_id === "string" ? user.app_metadata.provider_id : null
  };

  const { data: inserted } = await admin
    .from("users")
    .insert(payload)
    .select("id, auth_user_id, name, email")
    .single<AppUserRecord>();

  return inserted ?? null;
}
