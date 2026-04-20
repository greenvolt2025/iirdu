"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@/types";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function fetchUser() {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) {
        setLoading(false);
        return;
      }

      // Fetch profile via API route (uses admin client, bypasses RLS)
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const profile = await res.json();
          setUser({
            id: profile.id,
            email: profile.email,
            fullName: profile.full_name,
            phone: profile.phone,
            role: profile.role,
            clientType: profile.client_type || "individual",
            companyName: profile.company_name,
            companyEdrpou: profile.company_edrpou,
            organizationCountry: profile.organization_country,
            organizationType: profile.organization_type,
            avatarUrl: profile.avatar_url,
            createdAt: profile.created_at,
          });
        }
      } catch {
        // Profile fetch failed — user stays null
      }
      setLoading(false);
    }

    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          setUser(null);
          setLoading(false);
        } else {
          fetchUser();
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}
