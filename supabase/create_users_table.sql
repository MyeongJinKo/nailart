-- 테이블 구조
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz default timezone('utc', now())
);

-- Supabase 인증 이벤트와 연결하려면
-- enable row level security 및 policies 따로 구성 필요
