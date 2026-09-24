create table if not exists public.products (
	id integer primary key,
	slug text not null unique,
	name text not null,
	category text not null,
	collection text not null,
	price numeric not null check (price >= 0),
	compare_at_price numeric,
	discount_percent numeric,
	fabric text not null,
	color text not null,
	occasion text not null,
	image text not null,
	image_alt text not null,
	hover_image text,
	featured boolean not null default false,
	new_arrival boolean not null default false,
	best_seller boolean not null default false,
	badge text check (badge in ('NEW', 'BESTSELLER', 'SALE', 'LIMITED')),
	rating numeric not null default 0 check (rating >= 0 and rating <= 5),
	reviews integer not null default 0 check (reviews >= 0),
	description text not null
);

create table if not exists public.offer_campaigns (
	id integer primary key check (id = 1),
	enabled boolean not null default true,
	eyebrow text not null,
	title text not null,
	description text not null,
	button_label text not null,
	start_at timestamptz not null,
	end_at timestamptz not null
);

alter table public.products enable row level security;
alter table public.offer_campaigns enable row level security;

drop policy if exists "Public can read products" on public.products;
create policy "Public can read products"
	on public.products for select
	to anon, authenticated
	using (true);

drop policy if exists "Authenticated users manage products" on public.products;
create policy "Authenticated users manage products"
	on public.products for all
	to authenticated
	using (true)
	with check (true);

drop policy if exists "Public can read offer campaign" on public.offer_campaigns;
create policy "Public can read offer campaign"
	on public.offer_campaigns for select
	to anon, authenticated
	using (true);

drop policy if exists "Authenticated users manage offer campaign" on public.offer_campaigns;
create policy "Authenticated users manage offer campaign"
	on public.offer_campaigns for all
	to authenticated
	using (true)
	with check (true);

grant select on public.products, public.offer_campaigns to anon, authenticated;
grant insert, update, delete on public.products, public.offer_campaigns to authenticated;
