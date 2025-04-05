-- Templates table
create table if not exists templates (
  id text primary key,
  name text not null,
  description text,
  preview_image text,
  scene_type text
);

-- Invites table
create table if not exists invites (
  id text primary key,
  name1 text not null,
  name2 text not null,
  wedding_date date not null,
  image_url text,
  music_url text,
  particles boolean default false,
  interactive boolean default false,
  countdown boolean default false,
  video_available boolean default false,
  template_id text references templates(id),
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Media files table
create table if not exists media_files (
  id uuid primary key default uuid_generate_v4(),
  invite_id text references invites(id),
  type text,
  url text,
  label text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Orders table
create table if not exists orders (
  id uuid primary key default uuid_generate_v4(),
  customer_name text,
  email text,
  invite_id text references invites(id),
  order_source text,
  order_status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Logs table
create table if not exists logs (
  id uuid primary key default uuid_generate_v4(),
  invite_id text references invites(id),
  action text,
  user_agent text,
  timestamp timestamp with time zone default timezone('utc'::text, now())
);
