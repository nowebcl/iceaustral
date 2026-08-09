'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Search, MessageCircle, ChevronLeft, ChevronRight, Snowflake } from 'lucide-react';

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  format: string;
  price: string;
  image: string;
}

const ALL_PRODUCTS: ProductItem[] = [
  // 1. Productos del Mar
  { id: 'mar-1', name: 'Surtido de mariscos 500 g', category: 'Mariscos', format: '500 grs', price: '$3.800', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'mar-2', name: 'Navajuelas 500 g', category: 'Mariscos', format: '500 grs', price: '$3.800', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'mar-3', name: 'Piure congelado 500 g', category: 'Mariscos', format: '500 grs', price: '$3.800', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'mar-4', name: 'Paila con piure 500 g', category: 'Mariscos', format: '500 grs', price: '$3.800', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'mar-5', name: 'Carne de choritos 500 g', category: 'Mariscos', format: '500 grs', price: '$2.900', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'mar-6', name: 'Camarón crudo 36/40 1 kg (Jetro)', category: 'Mariscos', format: '1 kg', price: '$10.490', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'mar-7', name: 'Atún 500 g', category: 'Pescados', format: '500 grs', price: '$6.500', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'mar-8', name: 'Jaiba 500 g', category: 'Mariscos', format: '500 grs', price: '$8.900', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'mar-9', name: 'Merluza con piel 1 kg', category: 'Pescados', format: '1 kg', price: '$6.500', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'mar-10', name: 'Salmón salar con piel (kg)', category: 'Pescados', format: '1 kg', price: '$14.900', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'mar-11', name: 'Salmón salar sin piel (kg)', category: 'Pescados', format: '1 kg', price: '$14.900', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'mar-12', name: 'Salmón trucha con piel (kg)', category: 'Pescados', format: '1 kg', price: '$14.900', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  
  // Page 2
  { id: 'mar-13', name: 'Salmón salar porción con piel (kg)', category: 'Pescados', format: '1 kg', price: '$15.900', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'mar-14', name: 'Salmón salar porción sin piel (kg)', category: 'Pescados', format: '1 kg', price: '$15.900', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'mar-15', name: 'Salmón slice ahumado en frío 200 g', category: 'Pescados', format: '200 grs', price: '$5.000', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'mar-16', name: 'Salmón salar en cubos 500 g', category: 'Pescados', format: '500 grs', price: '$7.400', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'mar-17', name: 'Camarón crudo desvenado 36/40 1 kg', category: 'Mariscos', format: '1 kg', price: '$8.900', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'mar-18', name: 'Camarón pelado cocido 100/150 1 kg', category: 'Mariscos', format: '1 kg', price: '$6.900', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'mar-19', name: 'Camarón ecuatoriano crudo pelado 1 kg', category: 'Mariscos', format: '1 kg', price: '$10.490', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'mar-20', name: 'Camarón apanado 500 g', category: 'Mariscos', format: '500 grs', price: '$7.900', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'mar-21', name: 'Ostiones 10 un.', category: 'Mariscos', format: '10 un.', price: '$8.700', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'mar-22', name: 'Choritos en salsa de ajo/mantequilla 450 g', category: 'Mariscos', format: '450 grs', price: '$1.500', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'mar-23', name: 'Anilla de calamar 1 kg', category: 'Mariscos', format: '1 kg', price: '$8.490', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'mar-24', name: 'Pulpo en conserva 1 L', category: 'Mariscos', format: '1 L', price: '$19.800', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },

  // Page 3 & 4 (Frutas y Verduras)
  { id: 'fru-1', name: 'Surtido de pimentón 1 kg (Minuto Verde)', category: 'Verduras', format: '1 kg', price: '$3.990', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'fru-2', name: 'Choclo grano 500 g (Frutos del Maipo)', category: 'Verduras', format: '500 grs', price: '$2.090', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'fru-3', name: 'Choclo grano 1 kg (Minuto Verde)', category: 'Verduras', format: '1 kg', price: '$3.790', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'fru-4', name: 'Choclo trozo 180 g (Minuto Verde)', category: 'Verduras', format: '180 grs', price: '$1.290', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'fru-5', name: 'Pasta de choclo 1 kg (Minuto Verde)', category: 'Verduras', format: '1 kg', price: '$4.500', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'fru-6', name: 'Habas 500 g (Minuto Verde)', category: 'Verduras', format: '500 grs', price: '$2.490', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'fru-7', name: 'Primavera 200 g (Minuto Verde)', category: 'Verduras', format: '200 grs', price: '$990', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'fru-8', name: 'Primavera 500 g (Minuto Verde)', category: 'Verduras', format: '500 grs', price: '$1.790', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'fru-9', name: 'Sofrito 150 g (Frutos del Maipo)', category: 'Verduras', format: '150 grs', price: '$940', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'fru-10', name: 'Sofrito con ajo 500 g (Minuto Verde)', category: 'Verduras', format: '500 grs', price: '$2.690', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'fru-11', name: 'Poroto verde 500 g (Minuto Verde)', category: 'Verduras', format: '500 grs', price: '$3.200', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'fru-12', name: 'Mix pimentón 150 g (Minuto Verde)', category: 'Verduras', format: '150 grs', price: '$990', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'fru-13', name: 'Salteado Chapsui 400 g (Minuto Verde)', category: 'Verduras', format: '400 grs', price: '$2.190', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'fru-14', name: 'Arvejas 1 kg (Minuto Verde)', category: 'Verduras', format: '1 kg', price: '$3.290', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'fru-15', name: 'Arvejas 500 g (Minuto Verde)', category: 'Verduras', format: '500 grs', price: '$1.890', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'fru-16', name: 'Zapallo en cubos 500 g (Minuto Verde)', category: 'Verduras', format: '500 grs', price: '$1.690', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },

  // Page 5 (Frutas)
  { id: 'fru-17', name: 'Frutilla 500 g (Minuto Verde)', category: 'Frutas', format: '500 grs', price: '$3.690', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'fru-18', name: 'Mix porotos granados 500 g (Minuto Verde)', category: 'Verduras', format: '500 grs', price: '$2.990', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'fru-19', name: 'Frambuesas 400 g (Minuto Verde)', category: 'Frutas', format: '400 grs', price: '$5.590', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'fru-20', name: 'Cebolla picada 250 g (Minuto Verde)', category: 'Verduras', format: '250 grs', price: '$1.290', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'fru-21', name: 'Arándanos 400 g (Minuto Verde)', category: 'Frutas', format: '400 grs', price: '$3.490', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'fru-22', name: 'Frutos del bosque 400 g (Minuto Verde)', category: 'Frutas', format: '400 grs', price: '$3.990', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'fru-23', name: 'Mango en trozos 500 g (Minuto Verde)', category: 'Frutas', format: '500 grs', price: '$3.990', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'fru-24', name: 'Piña en trozos 500 g (Minuto Verde)', category: 'Frutas', format: '500 grs', price: '$3.990', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'fru-25', name: 'Smoothie Red Antiox 500 g (Minuto Verde)', category: 'Frutas', format: '500 grs', price: '$4.290', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'fru-26', name: 'Smoothie Pink Punch 500 g (Minuto Verde)', category: 'Frutas', format: '500 grs', price: '$4.290', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'fru-27', name: 'Frambuesa IQF entera 1 kg', category: 'Frutas', format: '1 kg', price: '$7.500', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'fru-28', name: 'Frambuesa semi-entera 1 kg', category: 'Frutas', format: '1 kg', price: '$6.500', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },

  // Page 6 (Carnes & Hamburguesas)
  { id: 'car-1', name: 'Hamburguesas vegetales 100 g', category: 'Carnes', format: '100 grs', price: '$850', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'car-2', name: 'Vegan Burger 100 g', category: 'Carnes', format: '100 grs', price: '$1.190', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'car-3', name: 'Vegan Crispy 120 g', category: 'Carnes', format: '120 grs', price: '$1.290', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'car-4', name: 'Molida de vacuno 250 g (Karmac)', category: 'Carnes', format: '250 grs', price: '$2.390', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'car-5', name: 'Hamburguesa 100 g (Llanquihue / La Crianza)', category: 'Carnes', format: '100 grs', price: '$990', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'car-6', name: 'Hamburguesas de vacuno 4 un.', category: 'Carnes', format: '1 kg', price: '$6.900', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'car-7', name: 'Nuggets 275 g (Super Pollo)', category: 'Carnes', format: '275 grs', price: '$1.390', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'car-8', name: 'Escalopa de vacuno (Receta del Abuelo)', category: 'Carnes', format: '1 un.', price: '$1.200', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'car-9', name: 'Suprema de pollo (Receta del Abuelo)', category: 'Carnes', format: '1 un.', price: '$1.150', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'prep-1', name: 'Pizzas La Cabaña 470 g (Jamón/Queso)', category: 'Comidas', format: '470 grs', price: '$4.990', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'prep-2', name: 'Empanadas preparadas 10 un.', category: 'Comidas', format: '10 un.', price: '$3.950', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },

  // Page 7 (Papas & Masas)
  { id: 'pap-1', name: 'Papas prefritas 1 kg (Minuto Verde)', category: 'Papas & Masas', format: '1 kg', price: '$3.300', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'pap-2', name: 'Papas gajo horneables 700 g (Minuto Verde)', category: 'Papas & Masas', format: '700 grs', price: '$2.990', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'pap-3', name: 'Papas prefritas 12 mm 2,5 kg (A&F)', category: 'Papas & Masas', format: '2,5 kg', price: '$6.490', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'pap-4', name: 'Papas Loop 800 g (Minuto Verde)', category: 'Papas & Masas', format: '800 grs', price: '$4.590', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'pap-5', name: 'Papas prefritas 11 mm 500 g (Alim Chile)', category: 'Papas & Masas', format: '500 grs', price: '$1.690', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'pap-6', name: 'Papas duquesas 1 kg (Minuto Verde)', category: 'Papas & Masas', format: '1 kg', price: '$3.990', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'pap-7', name: 'Papas prefritas finas 800 g (Minuto Verde)', category: 'Papas & Masas', format: '800 grs', price: '$3.100', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'pap-8', name: 'Arrollado primavera / Empanadas 10 un.', category: 'Papas & Masas', format: '10 un.', price: '$2.890', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'pap-9', name: 'Sopapillas 50 g (10 un. Alim Chile)', category: 'Papas & Masas', format: '500 grs', price: '$2.690', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'beb-1', name: 'Jugo Jumex 1 L (Durazno / Piña)', category: 'Bebidas', format: '1 L', price: '$1.090', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'beb-2', name: 'Suerox Blue 630 ml', category: 'Bebidas', format: '630 ml', price: '$2.490', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'beb-3', name: 'Agua 500 ml (Con / Sin gas)', category: 'Bebidas', format: '500 ml', price: '$690', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },

  // Page 8 (Bebidas)
  { id: 'beb-4', name: 'Red Bull / Monster Zero', category: 'Bebidas', format: '250 ml / 473 ml', price: '$1.490', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
  { id: 'beb-5', name: 'Gaseosas en lata/botella (Bilz, Coca-Cola, Kem, Pap, Sprite)', category: 'Bebidas', format: 'Lata / Botella', price: '$990', image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80' },
];

const ITEMS_PER_PAGE = 12;

import { supabase } from '../lib/supabase';

export default function Catalog() {
  const [productsList, setProductsList] = useState<ProductItem[]>(ALL_PRODUCTS);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const whatsappNumber = '56940500068';

  useEffect(() => {
    async function loadProducts() {
      try {
        const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
        if (data && data.length > 0) {
          setProductsList(data as ProductItem[]);
        }
      } catch (e) {
        console.log('Using static products catalog fallback');
      }
    }
    loadProducts();
  }, []);

  const totalPages = Math.ceil(productsList.length / ITEMS_PER_PAGE) || 1;

  // Derive current products slice directly without stale memoization
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = productsList.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const catalogElem = document.getElementById('catalogo');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getProductWhatsappUrl = (product: ProductItem) => {
    const message = encodeURIComponent(
      `¡Hola Ice Austral! Me interesa pedir: *${product.name}* (${product.format}) por ${product.price}. ¿Me confirmas disponibilidad?`
    );
    return `https://wa.me/${whatsappNumber}?text=${message}`;
  };

  return (
    <section id="catalogo" className="py-16 sm:py-24 bg-gradient-to-b from-[#f2f8fc] via-white to-[#f2f8fc] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header matching exact Hero typography in deep vivid blue but thinner */}
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-[600] text-[#1752b0] tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Catálogo de productos
          </h2>
          
          <p className="text-slate-500 font-bold text-xs sm:text-sm">
            (Imágenes referenciales) — Página {currentPage} de {totalPages}
          </p>

          {/* Subtle Snowflake Divider Line (Exact match to screenshot: — ❄ —) */}
          <div className="flex items-center justify-center gap-3 text-[#94c3e8] pt-2">
            <span className="w-12 sm:w-16 h-[1.5px] bg-[#bce0f8]" />
            <Snowflake className="w-4 h-4 text-[#1752b0]" />
            <span className="w-12 sm:w-16 h-[1.5px] bg-[#bce0f8]" />
          </div>
        </div>

        {/* Product Cards Grid - 12 items per page matching screenshot layout */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              style={{ fontFamily: "'Outfit', sans-serif" }}
              className="bg-white rounded-[20px] border border-slate-200/80 p-3.5 sm:p-4 text-center shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="relative w-full aspect-square bg-[#ebf5fc] rounded-[14px] overflow-hidden mb-3.5 flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h3 className="text-[#0b2854] font-bold text-sm sm:text-base leading-tight mb-1 line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-slate-500 font-medium text-xs sm:text-sm mb-2">
                  {product.format}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 mt-2">
                <div className="text-[#1752b0] font-[800] text-lg sm:text-xl mb-2">
                  {product.price}
                </div>

                <a
                  href={getProductWhatsappUrl(product)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-[#1752b0] hover:bg-[#094bb5] active:scale-95 text-white py-2 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Pedir por WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              type="button"
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-500 disabled:opacity-40 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                type="button"
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                style={{ fontFamily: "'Outfit', sans-serif" }}
                className={`w-9 h-9 flex items-center justify-center rounded-xl font-bold text-sm transition-all cursor-pointer ${
                  currentPage === pageNum
                    ? 'bg-[#1752b0] text-white shadow-sm scale-105'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              type="button"
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-500 disabled:opacity-40 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}



