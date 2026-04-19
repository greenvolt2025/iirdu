"use server";

import { redirect } from "next/navigation";
import { createServerSupabase } from "./server";

export async function getUser() {
  const supabase = createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return profile;
}

export async function signOut(locale: string = "uk") {
  const supabase = createServerSupabase();
  await supabase.auth.signOut();
  redirect(`/${locale}/login`);
}
