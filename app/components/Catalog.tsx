'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { 
  Search, 
  MessageCircle, 
  ChevronLeft, 
  ChevronRight, 
  Snowflake,
  Filter,
  LayoutGrid,
  Fish,
  Apple,
  UtensilsCrossed,
  Pizza,
  ChefHat,
  CupSoda,
  X
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  format: string;
  price: string;
  image: string;
}

const ALL_PRODUCTS: ProductItem[] = [
  // 1. Productos del Mar (25)
  { id: 'mar-1', name: 'Surtido de mariscos 500 grs', category: 'Mariscos', format: '500 grs', price: '$3.800', image: '' },
  { id: 'mar-2', name: 'Navajuelas 500 grs', category: 'Mariscos', format: '500 grs', price: '$3.800', image: '' },
  { id: 'mar-3', name: 'Piure congelado 500 grs', category: 'Mariscos', format: '500 grs', price: '$3.800', image: '' },
  { id: 'mar-4', name: 'Paila con piure 500 grs', category: 'Mariscos', format: '500 grs', price: '$3.800', image: '' },
  { id: 'mar-5', name: 'Carne de choritos 500 grs', category: 'Mariscos', format: '500 grs', price: '$2.900', image: '' },
  { id: 'mar-6', name: 'Camarón crudo 36/40 1 kg Jetro', category: 'Mariscos', format: '1 kg', price: '$10.490', image: '' },
  { id: 'mar-7', name: 'Atún 500 grs', category: 'Pescados', format: '500 grs', price: '$6.500', image: '' },
  { id: 'mar-8', name: 'Jaiba 500 grs', category: 'Mariscos', format: '500 grs', price: '$8.900', image: '' },
  { id: 'mar-9', name: 'Merluza con piel 1 kg', category: 'Pescados', format: '1 kg', price: '$6.500', image: '' },
  { id: 'mar-10', name: 'Salmón Salar con piel – precio x kilo', category: 'Pescados', format: '1 kg', price: '$14.900', image: '' },
  { id: 'mar-11', name: 'Salmón Salar sin piel – precio x kilo', category: 'Pescados', format: '1 kg', price: '$14.900', image: '' },
  { id: 'mar-12', name: 'Salmón Trucha con piel – precio x kilo', category: 'Pescados', format: '1 kg', price: '$14.900', image: '' },
  { id: 'mar-13', name: 'Salmón Salar porción con piel – precio x kilo', category: 'Pescados', format: '1 kg', price: '$15.900', image: '' },
  { id: 'mar-14', name: 'Salmón Salar porción sin piel – precio x kilo', category: 'Pescados', format: '1 kg', price: '$15.900', image: '' },
  { id: 'mar-15', name: 'Salmón slice ahumado en frío 200 grs', category: 'Pescados', format: '200 grs', price: '$5.000', image: '' },
  { id: 'mar-16', name: 'Salmón Salar en cubos 500 gr', category: 'Pescados', format: '500 grs', price: '$7.400', image: '' },
  { id: 'mar-17', name: 'Camarón crudo desvenado 36/40 1 kg', category: 'Mariscos', format: '1 kg', price: '$8.900', image: '' },
  { id: 'mar-18', name: 'Camarón pelado cocido 36/40 1 kg', category: 'Mariscos', format: '1 kg', price: '$9.990', image: '' },
  { id: 'mar-19', name: 'Camarón pelado cocido 100/150 1 kg', category: 'Mariscos', format: '1 kg', price: '$6.900', image: '' },
  { id: 'mar-20', name: 'Camarón ecuatoriano crudo pelado y desvenado 1 kg', category: 'Mariscos', format: '1 kg', price: '$10.490', image: '' },
  { id: 'mar-21', name: 'Anilla de calamar 1 kg', category: 'Mariscos', format: '1 kg', price: '$8.490', image: '' },
  { id: 'mar-22', name: 'Camarón apanado 500 gr', category: 'Mariscos', format: '500 grs', price: '$7.900', image: '' },
  { id: 'mar-23', name: 'Ostiones 10 un.', category: 'Mariscos', format: '10 un.', price: '$8.700', image: '' },
  { id: 'mar-24', name: 'Choritos en salsa de ajo y mantequilla 450 gr', category: 'Mariscos', format: '450 grs', price: '$1.500', image: '' },
  { id: 'mar-25', name: 'Pulpo en conserva 1 lt', category: 'Mariscos', format: '1 L', price: '$19.800', image: '' },

  // 2. Frutas y Verduras (38)
  { id: 'fru-26', name: 'Surtido de pimentón 1 kg Min Verde', category: 'Verduras', format: '1 kg', price: '$3.990', image: '' },
  { id: 'fru-27', name: 'Choclo grano 500 grs Frutos del Maipo', category: 'Verduras', format: '500 grs', price: '$2.090', image: '' },
  { id: 'fru-28', name: 'Choclo grano 1 kg Min Verde', category: 'Verduras', format: '1 kg', price: '$3.790', image: '' },
  { id: 'fru-29', name: 'Choclo trozo 180 grs Min Verde', category: 'Verduras', format: '180 grs', price: '$1.290', image: '' },
  { id: 'fru-30', name: 'Pasta choclo 1 kg Min Verde', category: 'Verduras', format: '1 kg', price: '$4.500', image: '' },
  { id: 'fru-31', name: 'Habas 500 grs Min Verde', category: 'Verduras', format: '500 grs', price: '$2.490', image: '' },
  { id: 'fru-32', name: 'Primavera 200 grs Min Verde', category: 'Verduras', format: '200 grs', price: '$990', image: '' },
  { id: 'fru-33', name: 'Primavera 500 grs Min Verde', category: 'Verduras', format: '500 grs', price: '$1.790', image: '' },
  { id: 'fru-34', name: 'Sofrito 150 grs Frutos del Maipo', category: 'Verduras', format: '150 grs', price: '$940', image: '' },
  { id: 'fru-35', name: 'Sofrito con ajo 500 grs Min Verde', category: 'Verduras', format: '500 grs', price: '$2.690', image: '' },
  { id: 'fru-36', name: 'Poroto verde 500 grs Min Verde', category: 'Verduras', format: '500 grs', price: '$3.200', image: '' },
  { id: 'fru-37', name: 'Mix pimentón 150 grs Min Verde', category: 'Verduras', format: '150 grs', price: '$990', image: '' },
  { id: 'fru-38', name: 'Arvejas 1 kg Min Verde', category: 'Verduras', format: '1 kg', price: '$3.290', image: '' },
  { id: 'fru-39', name: 'Arvejas 500 grs Min Verde', category: 'Verduras', format: '500 grs', price: '$1.890', image: '' },
  { id: 'fru-40', name: 'Cebolla picada 250 grs Min Verde', category: 'Verduras', format: '250 grs', price: '$1.290', image: '' },
  { id: 'fru-41', name: 'Salteado Chapsui 400 grs Min Verde', category: 'Verduras', format: '400 grs', price: '$2.190', image: '' },
  { id: 'fru-42', name: 'Zapallo en cubos 500 grs Min Verde', category: 'Verduras', format: '500 grs', price: '$1.690', image: '' },
  { id: 'fru-43', name: 'Mix porotos granados 500 grs Min Verde', category: 'Verduras', format: '500 grs', price: '$2.990', image: '' },
  { id: 'fru-44', name: 'Arándanos 400 grs Min Verde', category: 'Frutas', format: '400 grs', price: '$3.490', image: '' },
  { id: 'fru-45', name: 'Frutos del bosque 400 grs Min Verde', category: 'Frutas', format: '400 grs', price: '$3.990', image: '' },
  { id: 'fru-46', name: 'Frutilla 500 grs Min Verde', category: 'Frutas', format: '500 grs', price: '$3.690', image: '' },
  { id: 'fru-47', name: 'Frambuesas 400 grs Min Verde', category: 'Frutas', format: '400 grs', price: '$5.590', image: '' },
  { id: 'fru-48', name: 'Mango en trozos 500 grs Min Verde', category: 'Frutas', format: '500 grs', price: '$3.990', image: '' },
  { id: 'fru-49', name: 'Piña en trozos 500 grs Min Verde', category: 'Frutas', format: '500 grs', price: '$3.990', image: '' },
  { id: 'fru-50', name: 'Smoothie Red Antiox 500 grs Min Verde', category: 'Frutas', format: '500 grs', price: '$4.290', image: '' },
  { id: 'fru-51', name: 'Smoothie Pink Punch 500 grs Min Verde', category: 'Frutas', format: '500 grs', price: '$4.290', image: '' },
  { id: 'fru-52', name: 'Frambuesa IQF entera bolsa 1 kg', category: 'Frutas', format: '1 kg', price: '$7.500', image: '' },
  { id: 'fru-53', name: 'Frambuesa semi-entera bolsa 1 kg', category: 'Frutas', format: '1 kg', price: '$6.500', image: '' },
  { id: 'fru-54', name: 'Mora IQF bolsa 1 kg', category: 'Frutas', format: '1 kg', price: '$5.000', image: '' },
  { id: 'fru-55', name: 'Frutilla IQF bolsa 1 kg', category: 'Frutas', format: '1 kg', price: '$5.000', image: '' },
  { id: 'fru-56', name: 'Murta IQF bolsa 1 kg', category: 'Frutas', format: '1 kg', price: '$9.500', image: '' },
  { id: 'fru-57', name: 'Frambuesa pulpa bolsa 1 kg', category: 'Frutas', format: '1 kg', price: '$5.000', image: '' },
  { id: 'fru-58', name: 'Mora pulpa bolsa 1 kg', category: 'Frutas', format: '1 kg', price: '$4.500', image: '' },
  { id: 'fru-59', name: 'Frutilla pulpa bolsa 1 kg', category: 'Frutas', format: '1 kg', price: '$4.500', image: '' },
  { id: 'fru-60', name: 'Tortilla papas 350 grs Min Verde', category: 'Verduras', format: '350 grs', price: '$3.690', image: '' },
  { id: 'fru-61', name: 'Tortilla zanahoria 350 grs Min Verde', category: 'Verduras', format: '350 grs', price: '$3.690', image: '' },
  { id: 'fru-62', name: 'Espárragos 350 grs Min Verde', category: 'Verduras', format: '350 grs', price: '$4.290', image: '' },
  { id: 'fru-63', name: 'Humitas 600 grs Min Verde', category: 'Verduras', format: '600 grs', price: '$5.900', image: '' },

  // 3. Carnes (11)
  { id: 'car-64', name: 'Hamburguesa porotos negros 100 grs Min Verde', category: 'Carnes', format: '100 grs', price: '$850', image: '' },
  { id: 'car-65', name: 'Hamburguesa lentejas 100 grs Min Verde', category: 'Carnes', format: '100 grs', price: '$850', image: '' },
  { id: 'car-66', name: 'Hamburguesa garbanzos 100 grs Min Verde', category: 'Carnes', format: '100 grs', price: '$850', image: '' },
  { id: 'car-67', name: 'Vegan Burger 100 grs RDA', category: 'Carnes', format: '100 grs', price: '$1.190', image: '' },
  { id: 'car-68', name: 'Vegan Crispy 120 grs RDA', category: 'Carnes', format: '120 grs', price: '$1.290', image: '' },
  { id: 'car-69', name: 'Molida vacuno 250 grs Karmac', category: 'Carnes', format: '250 grs', price: '$2.390', image: '' },
  { id: 'car-70', name: 'Hamburguesa 100 grs Llanquihue', category: 'Carnes', format: '100 grs', price: '$990', image: '' },
  { id: 'car-71', name: 'Hamburguesa 100 grs La Crianza', category: 'Carnes', format: '100 grs', price: '$990', image: '' },
  { id: 'car-72', name: 'Nuggets 275 grs Super Pollo', category: 'Carnes', format: '275 grs', price: '$1.390', image: '' },
  { id: 'car-73', name: 'Escalopa vacuno Receta del Abuelo', category: 'Carnes', format: '1 un.', price: '$1.200', image: '' },
  { id: 'car-74', name: 'Suprema pollo Receta del Abuelo', category: 'Carnes', format: '1 un.', price: '$1.150', image: '' },

  // 4. Comidas Preparadas (3)
  { id: 'pre-75', name: 'Pizza jamón y queso 470 grs La Cabaña', category: 'Comidas', format: '470 grs', price: '$4.990', image: '' },
  { id: 'pre-76', name: 'Pizza pepperoni 470 grs La Cabaña', category: 'Comidas', format: '470 grs', price: '$4.990', image: '' },
  { id: 'pre-77', name: 'Pizza cuatro quesos 470 grs La Cabaña', category: 'Comidas', format: '470 grs', price: '$4.990', image: '' },

  // 5. Papas y Masas (14)
  { id: 'pap-78', name: 'Papas pre-fritas 1 kg Min Verde', category: 'Papas & Masas', format: '1 kg', price: '$3.300', image: '' },
  { id: 'pap-79', name: 'Papas pre-fritas 12 mm 2,5 kg A&F', category: 'Papas & Masas', format: '2,5 kg', price: '$6.490', image: '' },
  { id: 'pap-80', name: 'Papas pre-fritas 11 mm 500 grs Alim Chile', category: 'Papas & Masas', format: '500 grs', price: '$1.690', image: '' },
  { id: 'pap-81', name: 'Papas pre-fritas finas 800 grs Min Verde', category: 'Papas & Masas', format: '800 grs', price: '$3.100', image: '' },
  { id: 'pap-82', name: 'Papas gajo horneables 700 grs Min Verde', category: 'Papas & Masas', format: '700 grs', price: '$2.990', image: '' },
  { id: 'pap-83', name: 'Papas Loop 800 grs Min Verde', category: 'Papas & Masas', format: '800 grs', price: '$4.590', image: '' },
  { id: 'pap-84', name: 'Papas duquesas 1 kg Min Verde', category: 'Papas & Masas', format: '1 kg', price: '$3.990', image: '' },
  { id: 'pap-85', name: 'Arrollado primavera', category: 'Papas & Masas', format: '10 un.', price: '$3.950', image: '' },
  { id: 'pap-86', name: 'Empanada queso-camarón 10 un.', category: 'Papas & Masas', format: '10 un.', price: '$2.890', image: '' },
  { id: 'pap-87', name: 'Empanada queso 10 un.', category: 'Papas & Masas', format: '10 un.', price: '$2.200', image: '' },
  { id: 'pap-88', name: 'Empanada jamón-queso 10 un.', category: 'Papas & Masas', format: '10 un.', price: '$2.890', image: '' },
  { id: 'pap-89', name: 'Empanada pino 10 un.', category: 'Papas & Masas', format: '10 un.', price: '$2.890', image: '' },
  { id: 'pap-90', name: 'Empanada queso-ciboulette 10 un.', category: 'Papas & Masas', format: '10 un.', price: '$2.890', image: '' },
  { id: 'pap-91', name: 'Sopapillas 50 grs, 10 unid., Alim Chile', category: 'Papas & Masas', format: '500 grs', price: '$2.690', image: '' },

  // 6. Bebidas y Jugos (12)
  { id: 'beb-92', name: 'Jugo Jumex durazno y piña', category: 'Bebidas', format: '1 L', price: '$1.090', image: '' },
  { id: 'beb-93', name: 'Suerox Blue', category: 'Bebidas', format: '630 ml', price: '$2.490', image: '' },
  { id: 'beb-94', name: 'Agua con gas 500 ml', category: 'Bebidas', format: '500 ml', price: '$690', image: '' },
  { id: 'beb-95', name: 'Agua sin gas 500 ml', category: 'Bebidas', format: '500 ml', price: '$690', image: '' },
  { id: 'beb-96', name: 'Redbull y Redbull Red', category: 'Bebidas', format: '250 ml', price: '$1.490', image: '' },
  { id: 'beb-97', name: 'Monster Zero', category: 'Bebidas', format: '473 ml', price: '$2.090', image: '' },
  { id: 'beb-98', name: 'Bebida Bilz', category: 'Bebidas', format: 'Lata', price: '$990', image: '' },
  { id: 'beb-99', name: 'Bebida Coca-Cola Original', category: 'Bebidas', format: 'Lata / Botella', price: '$990', image: '' },
  { id: 'beb-100', name: 'Bebida Kem', category: 'Bebidas', format: 'Lata', price: '$990', image: '' },
  { id: 'beb-101', name: 'Bebida Pap', category: 'Bebidas', format: 'Lata', price: '$990', image: '' },
  { id: 'beb-102', name: 'Bebida Sprite', category: 'Bebidas', format: 'Lata / Botella', price: '$990', image: '' },
  { id: 'beb-103', name: 'Bebida Coca-Cola Cero', category: 'Bebidas', format: 'Lata / Botella', price: '$990', image: '' },
];

const ITEMS_PER_PAGE = 12;

const CATEGORY_ITEMS = [
  { id: 'todos', label: 'Todos los Productos', key: 'Todos', icon: LayoutGrid },
  { id: 'mar', label: 'Productos del Mar', key: 'Productos del Mar', icon: Fish },
  { id: 'fru', label: 'Frutas y Verduras', key: 'Frutas y Verduras', icon: Apple },
  { id: 'car', label: 'Carnes y Hamburguesas', key: 'Carnes y Hamburguesas', icon: UtensilsCrossed },
  { id: 'pre', label: 'Comidas Preparadas', key: 'Comidas Preparadas', icon: Pizza },
  { id: 'pap', label: 'Papas y Masas', key: 'Papas y Masas', icon: ChefHat },
  { id: 'beb', label: 'Bebidas y Jugos', key: 'Bebidas y Jugos', icon: CupSoda },
];

export default function Catalog() {
  const [productsList, setProductsList] = useState<ProductItem[]>(ALL_PRODUCTS);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

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

  // Filter products by search and selected category
  const filteredProducts = useMemo(() => {
    return productsList.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
                            item.name.toLowerCase().includes(q) || 
                            item.format.toLowerCase().includes(q) || 
                            item.category.toLowerCase().includes(q);
      
      let matchesCategory = true;
      const cat = item.category?.toLowerCase() || '';

      if (selectedCategory === 'Productos del Mar') {
        matchesCategory = cat.includes('mariscos') || cat.includes('pescados');
      } else if (selectedCategory === 'Frutas y Verduras') {
        matchesCategory = cat.includes('frutas') || cat.includes('verduras');
      } else if (selectedCategory === 'Carnes y Hamburguesas') {
        matchesCategory = cat.includes('carnes');
      } else if (selectedCategory === 'Comidas Preparadas') {
        matchesCategory = cat.includes('comidas') || cat.includes('preparados');
      } else if (selectedCategory === 'Papas y Masas') {
        matchesCategory = cat.includes('papas');
      } else if (selectedCategory === 'Bebidas y Jugos') {
        matchesCategory = cat.includes('bebidas');
      }

      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      const aHasImg = Boolean(a.image && typeof a.image === 'string' && a.image.trim().length > 5 && a.image.startsWith('http'));
      const bHasImg = Boolean(b.image && typeof b.image === 'string' && b.image.trim().length > 5 && b.image.startsWith('http'));
      if (aHasImg && !bHasImg) return -1;
      if (!aHasImg && bHasImg) return 1;
      return 0;
    });
  }, [productsList, searchQuery, selectedCategory]);

  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  // Compute category item count
  const getCategoryCount = (key: string) => {
    if (key === 'Todos') return productsList.length;
    return productsList.filter((item) => {
      const cat = item.category?.toLowerCase() || '';
      if (key === 'Productos del Mar') return cat.includes('mariscos') || cat.includes('pescados');
      if (key === 'Frutas y Verduras') return cat.includes('frutas') || cat.includes('verduras');
      if (key === 'Carnes y Hamburguesas') return cat.includes('carnes');
      if (key === 'Comidas Preparadas') return cat.includes('comidas') || cat.includes('preparados');
      if (key === 'Papas y Masas') return cat.includes('papas');
      if (key === 'Bebidas y Jugos') return cat.includes('bebidas');
      return false;
    }).length;
  };

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;

  // Slice paginated items
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIdx, startIdx + ITEMS_PER_PAGE);

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
    <section id="catalogo" className="py-10 sm:py-20 bg-gradient-to-b from-[#f2f8fc] via-white to-[#f2f8fc] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Title Header matching exact Hero typography */}
        <div className="text-center space-y-1.5">
          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-[600] text-[#1752b0] tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Catálogo de productos
          </h2>
          
          <p className="text-slate-500 font-bold text-xs sm:text-sm">
            {filteredProducts.length} productos
          </p>

          {/* Snowflake Divider Line */}
          <div className="flex items-center justify-center gap-3 text-[#94c3e8] pt-0.5">
            <span className="w-12 sm:w-16 h-[1.5px] bg-[#bce0f8]" />
            <Snowflake className="w-4 h-4 text-[#1752b0]" />
            <span className="w-12 sm:w-16 h-[1.5px] bg-[#bce0f8]" />
          </div>
        </div>

        {/* Global Search Input Box */}
        <div className="max-w-2xl mx-auto">
          <div className="relative shadow-2xs rounded-2xl">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#1752b0] absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar productos (ej. Salmón, Camarón, 1 kg, Frutilla)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-9 sm:pr-10 py-3 bg-white border border-[#d0e5f7] focus:border-[#1752b0] rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-3 focus:ring-blue-100 transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                aria-label="Limpiar búsqueda"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* MINIMAL ULTRA-CLEAN HORIZONTAL CATEGORY SCROLLER FOR MOBILE */}
        <div className="lg:hidden space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 px-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <span className="flex items-center gap-1.5 text-[#0b2854]">
              <Filter className="w-3.5 h-3.5 text-[#1752b0]" /> Categorías
            </span>
            <span className="flex items-center gap-1 text-[#1752b0] font-extrabold animate-pulse">
              Desliza 👉
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar">
            {CATEGORY_ITEMS.map((item) => {
              const IconComponent = item.icon;
              const isSelected = selectedCategory === item.key;
              const count = getCategoryCount(item.key);

              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedCategory(item.key)}
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#1752b0] text-white shadow-xs scale-98'
                      : 'bg-white text-[#173a6e] border border-slate-200/90 hover:bg-slate-50'
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Layout: Desktop Sidebar + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Categories Sidebar (DESKTOP ONLY lg:block) */}
          <div className="hidden lg:block lg:col-span-4 bg-white border border-slate-200/90 rounded-[28px] p-5 shadow-xs">
            <div className="flex items-center gap-2.5 mb-4 text-[#0b2854] font-bold text-lg border-b border-slate-100 pb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
              <Filter className="w-5 h-5 text-[#1752b0]" />
              <span>Categorías</span>
            </div>

            {/* List of categories for desktop */}
            <div className="space-y-2">
              {CATEGORY_ITEMS.map((item) => {
                const IconComponent = item.icon;
                const isSelected = selectedCategory === item.key;
                const count = getCategoryCount(item.key);

                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedCategory(item.key)}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                    className={`w-full flex items-center justify-between p-3 sm:p-3.5 rounded-2xl font-bold text-sm transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-[#1752b0] text-white shadow-md border border-[#124290] scale-[1.01]'
                        : 'bg-[#f8fafc] text-[#173a6e] hover:bg-[#edf4fb] border border-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-blue-100/60 text-[#1752b0]'
                      }`}>
                        <IconComponent className="w-4 h-4 stroke-[2.2]" />
                      </div>
                      <span className="text-left text-xs sm:text-sm font-bold">
                        {item.label}
                      </span>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      isSelected 
                        ? 'bg-white text-[#1752b0]' 
                        : 'bg-white text-slate-500 border border-slate-200'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Products Grid Column */}
          <div className="lg:col-span-8 space-y-6">
            
            {currentProducts.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center space-y-3">
                <Search className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="text-lg font-bold text-[#0b2854]">No encontramos productos</h3>
                <p className="text-slate-500 text-xs sm:text-sm">
                  Intenta cambiar el término de búsqueda o selecciona otra categoría.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('Todos'); }}
                  className="inline-flex items-center gap-2 bg-[#1752b0] text-white text-xs font-bold px-4 py-2 rounded-xl"
                >
                  Ver todos los productos
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-6">
                {currentProducts.map((product) => (
                  <div
                    key={product.id}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                    className="bg-white rounded-[20px] border border-slate-200/80 p-3 sm:p-4 text-center shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Product Thumbnail / Image or PRONTO Badge */}
                      <div className="relative w-full aspect-square bg-[#ebf5fc] rounded-[14px] overflow-hidden mb-2.5 sm:mb-3.5 flex items-center justify-center">
                        {Boolean(product.image && typeof product.image === 'string' && product.image.trim().length > 5 && product.image.startsWith('http')) ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center space-y-1.5 text-[#1752b0] p-2">
                            <Snowflake className="w-8 h-8 stroke-[1.5] text-[#1752b0]/50 animate-pulse" />
                            <span className="font-extrabold text-[10px] sm:text-[11px] tracking-wider uppercase bg-white text-[#1752b0] px-2.5 py-0.5 rounded-full shadow-2xs border border-[#bce0f8]">
                              Pronto
                            </span>
                          </div>
                        )}
                      </div>

                      <h3 className="text-[#0b2854] font-bold text-xs sm:text-base leading-tight mb-1 line-clamp-2">
                        {product.name}
                      </h3>

                      <p className="text-slate-500 font-medium text-[11px] sm:text-sm mb-1.5 sm:mb-2">
                        {product.format}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 mt-1">
                      <div className="text-[#1752b0] font-[800] text-base sm:text-xl mb-1.5 sm:mb-2">
                        {product.price}
                      </div>

                      <a
                        href={getProductWhatsappUrl(product)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-1.5 bg-[#1752b0] hover:bg-[#094bb5] active:scale-95 text-white py-2 px-2.5 sm:px-3 rounded-xl font-bold text-[11px] sm:text-sm transition-all shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">Pedir por WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-500 disabled:opacity-40 hover:bg-slate-50 transition-colors cursor-pointer"
                  aria-label="Página anterior"
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
                        ? 'bg-[#1752b0] text-white shadow-xs scale-105'
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
                  aria-label="Página siguiente"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
