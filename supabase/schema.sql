-- ============================================================
-- МІВРУ / IIRDU — Supabase Database Schema
-- Кабінет для замовлень науково-правових висновків
-- ============================================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ============================================================
-- 1. PROFILES (extends auth.users)
-- ============================================================

create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text not null default '',
  email text not null default '',
  phone text,
  company_name text,
  role text not null default 'client' check (role in ('client', 'expert', 'admin')),
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-create profile when user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- RLS
alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Admins can view all profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================================
-- 2. ORDERS
-- ============================================================

create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  report_type text not null check (report_type in (
    'damage_assessment', 'due_diligence', 'risk_assessment',
    'economic_analysis', 'legal_support', 'consulting'
  )),
  report_subtype text not null default '',
  status text not null default 'draft' check (status in (
    'draft', 'pending_payment', 'paid', 'documents_uploaded',
    'processing', 'expert_review', 'revision', 'completed', 'cancelled'
  )),
  title text not null default '',
  description text,
  object_address text,
  total_amount numeric(12, 2) not null default 0,
  currency text not null default 'UAH' check (currency in ('UAH', 'USD', 'EUR')),
  include_lost_profits boolean not null default false,
  turnaround text not null default 'standard' check (turnaround in ('standard', 'urgent')),
  delivery_method text not null default 'pdf' check (delivery_method in ('pdf', 'nova_poshta')),
  delivery_details jsonb,
  invoice_number text,
  assigned_expert_id uuid references public.profiles(id),
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger orders_updated_at
  before update on public.orders
  for each row execute function public.update_updated_at();

-- RLS
alter table public.orders enable row level security;

create policy "Users can view own orders"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "Users can create own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

create policy "Users can update own draft orders"
  on public.orders for update
  using (auth.uid() = user_id);

create policy "Experts can view assigned orders"
  on public.orders for select
  using (auth.uid() = assigned_expert_id);

create policy "Admins can do anything with orders"
  on public.orders for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================================
-- 3. DOCUMENTS
-- ============================================================

create table public.documents (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  file_name text not null,
  file_size bigint not null default 0,
  mime_type text not null default 'application/octet-stream',
  storage_path text not null,
  upload_channel text not null default 'standard' check (upload_channel in ('standard', 'simplex')),
  ocr_status text not null default 'pending' check (ocr_status in ('pending', 'processing', 'completed', 'failed')),
  ocr_text text,
  created_at timestamptz not null default now()
);

-- RLS
alter table public.documents enable row level security;

create policy "Users can view documents of own orders"
  on public.documents for select
  using (
    exists (
      select 1 from public.orders
      where orders.id = documents.order_id
        and orders.user_id = auth.uid()
    )
  );

create policy "Users can upload documents to own orders"
  on public.documents for insert
  with check (
    exists (
      select 1 from public.orders
      where orders.id = order_id
        and orders.user_id = auth.uid()
    )
  );

create policy "Users can delete documents from own orders"
  on public.documents for delete
  using (
    exists (
      select 1 from public.orders
      where orders.id = documents.order_id
        and orders.user_id = auth.uid()
    )
  );

create policy "Admins can do anything with documents"
  on public.documents for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================================
-- 4. PAYMENTS
-- ============================================================

create table public.payments (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  amount numeric(12, 2) not null,
  currency text not null default 'UAH' check (currency in ('UAH', 'USD', 'EUR')),
  method text not null default 'wayforpay' check (method in ('wayforpay', 'liqpay', 'bank_transfer')),
  status text not null default 'pending' check (status in ('pending', 'processing', 'success', 'failed', 'refunded')),
  transaction_id text,
  invoice_number text,
  invoice_url text,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

-- RLS
alter table public.payments enable row level security;

create policy "Users can view own payments"
  on public.payments for select
  using (
    exists (
      select 1 from public.orders
      where orders.id = payments.order_id
        and orders.user_id = auth.uid()
    )
  );

create policy "Admins can do anything with payments"
  on public.payments for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================================
-- 5. REPORTS
-- ============================================================

create table public.reports (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  status text not null default 'generating' check (status in (
    'generating', 'draft', 'expert_review', 'approved', 'finalized'
  )),
  title text not null default '',
  content_html text,
  content_json jsonb,
  pdf_url text,
  docx_url text,
  generated_at timestamptz,
  approved_at timestamptz,
  approved_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

-- RLS
alter table public.reports enable row level security;

create policy "Users can view reports of own orders"
  on public.reports for select
  using (
    exists (
      select 1 from public.orders
      where orders.id = reports.order_id
        and orders.user_id = auth.uid()
    )
  );

create policy "Admins can do anything with reports"
  on public.reports for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================================
-- 6. STORAGE BUCKET
-- ============================================================

-- Create documents bucket
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'documents',
  'documents',
  false,
  104857600, -- 100 MB
  array['application/pdf', 'image/jpeg', 'image/png', 'image/tiff', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
);

-- Storage RLS: users can upload to their own order folders
create policy "Users can upload to own order folders"
  on storage.objects for insert
  with check (
    bucket_id = 'documents'
    and auth.role() = 'authenticated'
  );

-- Storage RLS: users can view their own files
create policy "Users can view own files"
  on storage.objects for select
  using (
    bucket_id = 'documents'
    and auth.role() = 'authenticated'
  );

-- Storage RLS: users can delete their own files
create policy "Users can delete own files"
  on storage.objects for delete
  using (
    bucket_id = 'documents'
    and auth.role() = 'authenticated'
  );

-- ============================================================
-- 7. INDEXES
-- ============================================================

create index idx_orders_user_id on public.orders(user_id);
create index idx_orders_status on public.orders(status);
create index idx_orders_created_at on public.orders(created_at desc);
create index idx_documents_order_id on public.documents(order_id);
create index idx_payments_order_id on public.payments(order_id);
create index idx_reports_order_id on public.reports(order_id);

-- ============================================================
-- Done! Run this in Supabase Dashboard → SQL Editor
-- ============================================================
