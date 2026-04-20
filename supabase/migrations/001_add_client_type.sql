-- ============================================================
-- Migration 001: Add client_type segmentation
-- Three segments: individual, legal_entity, international_partner
-- ============================================================

-- Add client_type to profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS client_type text NOT NULL DEFAULT 'individual'
    CHECK (client_type IN ('individual', 'legal_entity', 'international_partner'));

-- Additional fields for legal entities
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS company_edrpou text;

-- Additional fields for international partners
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS organization_country text;
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS organization_type text;

-- Add client_type to orders
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS client_type text NOT NULL DEFAULT 'individual'
    CHECK (client_type IN ('individual', 'legal_entity', 'international_partner'));

-- Update handle_new_user trigger to store client_type from metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (
    id, email, full_name, phone, company_name, role,
    client_type, company_edrpou, organization_country, organization_type
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.raw_user_meta_data->>'phone',
    NEW.raw_user_meta_data->>'company_name',
    COALESCE(NEW.raw_user_meta_data->>'role', 'client'),
    COALESCE(NEW.raw_user_meta_data->>'client_type', 'individual'),
    NEW.raw_user_meta_data->>'company_edrpou',
    NEW.raw_user_meta_data->>'organization_country',
    NEW.raw_user_meta_data->>'organization_type'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_profiles_client_type ON public.profiles(client_type);
CREATE INDEX IF NOT EXISTS idx_orders_client_type ON public.orders(client_type);
