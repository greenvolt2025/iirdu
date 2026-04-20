import { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { updateSession } from "@/lib/supabase/middleware";

const intlMiddleware = createIntlMiddleware({
  locales: ["uk", "en"],
  defaultLocale: "uk",
});

export async function middleware(request: NextRequest) {
  // 1. Run Supabase session refresh + auth check
  const supabaseResponse = await updateSession(request);

  // If Supabase returned a redirect (unauthenticated on portal route), use it
  if (supabaseResponse.headers.get("location")) {
    return supabaseResponse;
  }

  // 2. Run next-intl middleware for locale routing
  const intlResponse = intlMiddleware(request);

  // 3. Copy Supabase cookies onto the intl response so refreshed JWT tokens aren't lost
  supabaseResponse.cookies.getAll().forEach((cookie) => {
    intlResponse.cookies.set(cookie.name, cookie.value, cookie);
  });

  return intlResponse;
}

export const config = {
  matcher: ["/((?!_next|_vercel|api|favicon.ico|images|.*\\..*).*)"],
};
