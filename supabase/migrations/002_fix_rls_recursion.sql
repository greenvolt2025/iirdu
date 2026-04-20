-- ============================================================
-- Migration 002: Fix infinite recursion in admin RLS policies
-- Problem: Admin policies on profiles table query profiles
--   itself, causing infinite recursion for ALL users.
-- Solution: SECURITY DEFINER function bypasses RLS internally.
-- ============================================================

-- 1. Create helper function (SECURITY DEFINER = bypasses RLS)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- 2. Fix profiles admin policy
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.is_admin());

-- 3. Fix orders admin policy
DROP POLICY IF EXISTS "Admins can do anything with orders" ON public.orders;
CREATE POLICY "Admins can do anything with orders"
  ON public.orders FOR ALL
  USING (public.is_admin());

-- 4. Fix documents admin policy
DROP POLICY IF EXISTS "Admins can do anything with documents" ON public.documents;
CREATE POLICY "Admins can do anything with documents"
  ON public.documents FOR ALL
  USING (public.is_admin());

-- 5. Fix payments admin policy
DROP POLICY IF EXISTS "Admins can do anything with payments" ON public.payments;
CREATE POLICY "Admins can do anything with payments"
  ON public.payments FOR ALL
  USING (public.is_admin());

-- 6. Fix reports admin policy
DROP POLICY IF EXISTS "Admins can do anything with reports" ON public.reports;
CREATE POLICY "Admins can do anything with reports"
  ON public.reports FOR ALL
  USING (public.is_admin());

-- ============================================================
-- Done! All admin policies now use is_admin() which bypasses
-- RLS internally, breaking the recursion cycle.
-- ============================================================
