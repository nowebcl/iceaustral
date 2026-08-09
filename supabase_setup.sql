-- 1. CREAR LA TABLA DE PRODUCTOS EN SUPABASE
create table if not exists products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  category text not null,
  format text not null,
  price text not null,
  image text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. HABILITAR SEGURIDAD RLS (Row Level Security) Y POLÍTICAS DE ACCESO
alter table products enable row level security;

drop policy if exists "Public Read Access" on products;
drop policy if exists "Public Insert Access" on products;
drop policy if exists "Public Update Access" on products;
drop policy if exists "Public Delete Access" on products;

create policy "Public Read Access" on products for select using (true);
create policy "Public Insert Access" on products for insert with check (true);
create policy "Public Update Access" on products for update using (true);
create policy "Public Delete Access" on products for delete using (true);

-- 3. INSERTAR PRODUCTOS INICIALES DEL CATÁLOGO
insert into products (name, category, format, price, image) values
('Surtido de mariscos 500 g', 'Mariscos', '500 grs', '$3.800', 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80'),
('Navajuelas 500 g', 'Mariscos', '500 grs', '$3.800', 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80'),
('Piure congelado 500 g', 'Mariscos', '500 grs', '$3.800', 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80'),
('Paila con piure 500 g', 'Mariscos', '500 grs', '$3.800', 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80'),
('Carne de choritos 500 g', 'Mariscos', '500 grs', '$2.900', 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80'),
('Camarón crudo 36/40 1 kg (Jetro)', 'Mariscos', '1 kg', '$10.490', 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80'),
('Atún 500 g', 'Pescados', '500 grs', '$6.500', 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80'),
('Jaiba 500 g', 'Mariscos', '500 grs', '$8.900', 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80'),
('Merluza con piel 1 kg', 'Pescados', '1 kg', '$6.500', 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80'),
('Salmón salar con piel (kg)', 'Pescados', '1 kg', '$14.900', 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80'),
('Salmón salar sin piel (kg)', 'Pescados', '1 kg', '$14.900', 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80'),
('Salmón trucha con piel (kg)', 'Pescados', '1 kg', '$14.900', 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80'),
('Salmón salar porción con piel (kg)', 'Pescados', '1 kg', '$15.900', 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80'),
('Salmón salar porción sin piel (kg)', 'Pescados', '1 kg', '$15.900', 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80'),
('Salmón slice ahumado en frío 200 g', 'Pescados', '200 grs', '$5.000', 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80'),
('Salmón salar en cubos 500 g', 'Pescados', '500 grs', '$7.400', 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80'),
('Camarón crudo desvenado 36/40 1 kg', 'Mariscos', '1 kg', '$8.900', 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80'),
('Camarón pelado cocido 100/150 1 kg', 'Mariscos', '1 kg', '$6.900', 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80'),
('Camarón ecuatoriano crudo pelado 1 kg', 'Mariscos', '1 kg', '$10.490', 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80'),
('Camarón apanado 500 g', 'Mariscos', '500 grs', '$7.900', 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80'),
('Ostiones 10 un.', 'Mariscos', '10 un.', '$8.700', 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80'),
('Frutilla 500 g (Minuto Verde)', 'Frutas', '500 grs', '$3.690', 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80'),
('Frambuesas 400 g (Minuto Verde)', 'Frutas', '400 grs', '$5.590', 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80'),
('Hamburguesas de vacuno 4 un.', 'Carnes', '1 kg', '$6.900', 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80'),
('Papas prefritas 1 kg (Minuto Verde)', 'Papas & Masas', '1 kg', '$3.300', 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80'),
('Red Bull / Monster Zero', 'Bebidas', '250 ml / 473 ml', '$1.490', 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80');
