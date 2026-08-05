'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { 
  Search, 
  MessageCircle, 
  ChevronLeft, 
  ChevronRight, 
  Snowflake,
  Filter,
  Fish,
  Apple,
  Utensils,
  Pizza,
  ChefHat,
  CupSoda,
  LayoutGrid
} from 'lucide-react';

export interface ProductItem {
  id: string;
  name: string;
  category: 'Productos del Mar' | 'Frutas y Verduras' | 'Carnes y Hamburguesas' | 'Comidas Preparadas' | 'Papas y Masas' | 'Bebidas y Jugos';
  format: string;
  price: string;
  image: string;
}

const CATEGORIES = [
  { id: 'Todos', name: 'Todos los Productos', icon: LayoutGrid },
  { id: 'Productos del Mar', name: 'Productos del Mar', icon: Fish },
  { id: 'Frutas y Verduras', name: 'Frutas y Verduras', icon: Apple },
  { id: 'Carnes y Hamburguesas', name: 'Carnes y Hamburguesas', icon: Utensils },
  { id: 'Comidas Preparadas', name: 'Comidas Preparadas', icon: Pizza },
  { id: 'Papas y Masas', name: 'Papas y Masas', icon: ChefHat },
  { id: 'Bebidas y Jugos', name: 'Bebidas y Jugos', icon: CupSoda },
] as const;

const IMG_SEA = 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80';
const IMG_SALMON = 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80';
const IMG_VEG = 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80';
const IMG_FRUIT = 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80';
const IMG_MEAT = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80';
const IMG_PIZZA = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80';
const IMG_FRIES = 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80';
const IMG_DRINK = 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80';

const ALL_PRODUCTS: ProductItem[] = [
  // 1. Productos del Mar (24 productos)
  { id: 'mar-1', name: 'Surtido de mariscos 500 g', category: 'Productos del Mar', format: '500 grs', price: '$3.800', image: IMG_SEA },
  { id: 'mar-2', name: 'Navajuelas 500 g', category: 'Productos del Mar', format: '500 grs', price: '$3.800', image: IMG_SEA },
  { id: 'mar-3', name: 'Piure congelado 500 g', category: 'Productos del Mar', format: '500 grs', price: '$3.800', image: IMG_SEA },
  { id: 'mar-4', name: 'Paila con piure 500 g', category: 'Productos del Mar', format: '500 grs', price: '$3.800', image: IMG_SEA },
  { id: 'mar-5', name: 'Carne de choritos 500 g', category: 'Productos del Mar', format: '500 grs', price: '$2.900', image: IMG_SEA },
  { id: 'mar-6', name: 'Camarón crudo 36/40 1 kg (Jetro)', category: 'Productos del Mar', format: '1 kg', price: '$10.490', image: IMG_SEA },
  { id: 'mar-7', name: 'Atún 500 g', category: 'Productos del Mar', format: '500 grs', price: '$6.500', image: IMG_SALMON },
  { id: 'mar-8', name: 'Jaiba 500 g', category: 'Productos del Mar', format: '500 grs', price: '$8.900', image: IMG_SEA },
  { id: 'mar-9', name: 'Merluza con piel 1 kg', category: 'Productos del Mar', format: '1 kg', price: '$6.500', image: IMG_SALMON },
  { id: 'mar-10', name: 'Salmón salar con piel (kg)', category: 'Productos del Mar', format: '1 kg', price: '$14.900', image: IMG_SALMON },
  { id: 'mar-11', name: 'Salmón salar sin piel (kg)', category: 'Productos del Mar', format: '1 kg', price: '$14.900', image: IMG_SALMON },
  { id: 'mar-12', name: 'Salmón trucha con piel (kg)', category: 'Productos del Mar', format: '1 kg', price: '$14.900', image: IMG_SALMON },
  { id: 'mar-13', name: 'Salmón salar porción con piel (kg)', category: 'Productos del Mar', format: '1 kg', price: '$15.900', image: IMG_SALMON },
  { id: 'mar-14', name: 'Salmón salar porción sin piel (kg)', category: 'Productos del Mar', format: '1 kg', price: '$15.900', image: IMG_SALMON },
  { id: 'mar-15', name: 'Salmón slice ahumado en frío 200 g', category: 'Productos del Mar', format: '200 grs', price: '$5.000', image: IMG_SALMON },
  { id: 'mar-16', name: 'Salmón salar en cubos 500 g', category: 'Productos del Mar', format: '500 grs', price: '$7.400', image: IMG_SALMON },
  { id: 'mar-17', name: 'Camarón crudo desvenado 36/40 1 kg', category: 'Productos del Mar', format: '1 kg', price: '$8.900', image: IMG_SEA },
  { id: 'mar-18', name: 'Camarón pelado cocido 100/150 1 kg', category: 'Productos del Mar', format: '1 kg', price: '$6.900', image: IMG_SEA },
  { id: 'mar-19', name: 'Camarón ecuatoriano crudo pelado y desvenado 1 kg', category: 'Productos del Mar', format: '1 kg', price: '$10.490', image: IMG_SEA },
  { id: 'mar-20', name: 'Camarón apanado 500 g', category: 'Productos del Mar', format: '500 grs', price: '$7.900', image: IMG_SEA },
  { id: 'mar-21', name: 'Ostiones 10 un.', category: 'Productos del Mar', format: '10 un.', price: '$8.700', image: IMG_SEA },
  { id: 'mar-22', name: 'Choritos en salsa de ajo/mantequilla 450 g', category: 'Productos del Mar', format: '450 grs', price: '$1.500', image: IMG_SEA },
  { id: 'mar-23', name: 'Anilla de calamar 1 kg', category: 'Productos del Mar', format: '1 kg', price: '$8.490', image: IMG_SEA },
  { id: 'mar-24', name: 'Pulpo en conserva 1 L', category: 'Productos del Mar', format: '1 L', price: '$19.800', image: IMG_SEA },

  // 2. Frutas y Verduras (35 productos)
  { id: 'fru-1', name: 'Surtido de pimentón 1 kg (Minuto Verde)', category: 'Frutas y Verduras', format: '1 kg', price: '$3.990', image: IMG_VEG },
  { id: 'fru-2', name: 'Choclo grano 500 g (Frutos del Maipo)', category: 'Frutas y Verduras', format: '500 grs', price: '$2.090', image: IMG_VEG },
  { id: 'fru-3', name: 'Choclo grano 1 kg (Minuto Verde)', category: 'Frutas y Verduras', format: '1 kg', price: '$3.790', image: IMG_VEG },
  { id: 'fru-4', name: 'Choclo trozo 180 g (Minuto Verde)', category: 'Frutas y Verduras', format: '180 grs', price: '$1.290', image: IMG_VEG },
  { id: 'fru-5', name: 'Pasta de choclo 1 kg (Minuto Verde)', category: 'Frutas y Verduras', format: '1 kg', price: '$4.500', image: IMG_VEG },
  { id: 'fru-6', name: 'Habas 500 g (Minuto Verde)', category: 'Frutas y Verduras', format: '500 grs', price: '$2.490', image: IMG_VEG },
  { id: 'fru-7', name: 'Primavera 200 g (Minuto Verde)', category: 'Frutas y Verduras', format: '200 grs', price: '$990', image: IMG_VEG },
  { id: 'fru-8', name: 'Primavera 500 g (Minuto Verde)', category: 'Frutas y Verduras', format: '500 grs', price: '$1.790', image: IMG_VEG },
  { id: 'fru-9', name: 'Sofrito 150 g (Frutos del Maipo)', category: 'Frutas y Verduras', format: '150 grs', price: '$940', image: IMG_VEG },
  { id: 'fru-10', name: 'Sofrito con ajo 500 g (Minuto Verde)', category: 'Frutas y Verduras', format: '500 grs', price: '$2.690', image: IMG_VEG },
  { id: 'fru-11', name: 'Poroto verde 500 g (Minuto Verde)', category: 'Frutas y Verduras', format: '500 grs', price: '$3.200', image: IMG_VEG },
  { id: 'fru-12', name: 'Mix pimentón 150 g (Minuto Verde)', category: 'Frutas y Verduras', format: '150 grs', price: '$990', image: IMG_VEG },
  { id: 'fru-13', name: 'Salteado Chapsui 400 g (Minuto Verde)', category: 'Frutas y Verduras', format: '400 grs', price: '$2.190', image: IMG_VEG },
  { id: 'fru-14', name: 'Arvejas 1 kg (Minuto Verde)', category: 'Frutas y Verduras', format: '1 kg', price: '$3.290', image: IMG_VEG },
  { id: 'fru-15', name: 'Arvejas 500 g (Minuto Verde)', category: 'Frutas y Verduras', format: '500 grs', price: '$1.890', image: IMG_VEG },
  { id: 'fru-16', name: 'Zapallo en cubos 500 g (Minuto Verde)', category: 'Frutas y Verduras', format: '500 grs', price: '$1.690', image: IMG_VEG },
  { id: 'fru-17', name: 'Frutilla 500 g (Minuto Verde)', category: 'Frutas y Verduras', format: '500 grs', price: '$3.690', image: IMG_FRUIT },
  { id: 'fru-18', name: 'Mix porotos granados 500 g (Minuto Verde)', category: 'Frutas y Verduras', format: '500 grs', price: '$2.990', image: IMG_VEG },
  { id: 'fru-19', name: 'Frambuesas 400 g (Minuto Verde)', category: 'Frutas y Verduras', format: '400 grs', price: '$5.590', image: IMG_FRUIT },
  { id: 'fru-20', name: 'Cebolla picada 250 g (Minuto Verde)', category: 'Frutas y Verduras', format: '250 grs', price: '$1.290', image: IMG_VEG },
  { id: 'fru-21', name: 'Arándanos 400 g (Minuto Verde)', category: 'Frutas y Verduras', format: '400 grs', price: '$3.490', image: IMG_FRUIT },
  { id: 'fru-22', name: 'Frutos del bosque 400 g (Minuto Verde)', category: 'Frutas y Verduras', format: '400 grs', price: '$3.990', image: IMG_FRUIT },
  { id: 'fru-23', name: 'Mango en trozos 500 g (Minuto Verde)', category: 'Frutas y Verduras', format: '500 grs', price: '$3.990', image: IMG_FRUIT },
  { id: 'fru-24', name: 'Piña en trozos 500 g (Minuto Verde)', category: 'Frutas y Verduras', format: '500 grs', price: '$3.990', image: IMG_FRUIT },
  { id: 'fru-25', name: 'Smoothie Red Antiox 500 g (Minuto Verde)', category: 'Frutas y Verduras', format: '500 grs', price: '$4.290', image: IMG_FRUIT },
  { id: 'fru-26', name: 'Smoothie Pink Punch 500 g (Minuto Verde)', category: 'Frutas y Verduras', format: '500 grs', price: '$4.290', image: IMG_FRUIT },
  { id: 'fru-27', name: 'Frambuesa IQF entera 1 kg', category: 'Frutas y Verduras', format: '1 kg', price: '$7.500', image: IMG_FRUIT },
  { id: 'fru-28', name: 'Frambuesa semi-entera 1 kg', category: 'Frutas y Verduras', format: '1 kg', price: '$6.500', image: IMG_FRUIT },
  { id: 'fru-29', name: 'Mora IQF bolsa 1 kg', category: 'Frutas y Verduras', format: '1 kg', price: '$5.000', image: IMG_FRUIT },
  { id: 'fru-30', name: 'Frutilla IQF bolsa 1 kg', category: 'Frutas y Verduras', format: '1 kg', price: '$5.000', image: IMG_FRUIT },
  { id: 'fru-31', name: 'Murta IQF bolsa 1 kg', category: 'Frutas y Verduras', format: '1 kg', price: '$9.500', image: IMG_FRUIT },
  { id: 'fru-32', name: 'Pulpas de fruta 1 kg (Frambuesa, Mora, Frutilla)', category: 'Frutas y Verduras', format: '1 kg', price: '$4.500 – $5.000', image: IMG_FRUIT },
  { id: 'fru-33', name: 'Tortillas preparadas 350 g (Papas / Zanahoria)', category: 'Frutas y Verduras', format: '350 grs', price: '$3.690', image: IMG_VEG },
  { id: 'fru-34', name: 'Espárragos 350 g (Minuto Verde)', category: 'Frutas y Verduras', format: '350 grs', price: '$4.290', image: IMG_VEG },
  { id: 'fru-35', name: 'Humitas 600 g (Minuto Verde)', category: 'Frutas y Verduras', format: '600 grs', price: '$5.900', image: IMG_VEG },

  // 3. Carnes y Hamburguesas (11 productos)
  { id: 'car-1', name: 'Hamburguesas vegetales 100 g (Porotos negros / Lentejas / Garbanzos)', category: 'Carnes y Hamburguesas', format: '100 grs', price: '$850', image: IMG_MEAT },
  { id: 'car-2', name: 'Vegan Burger 100 g', category: 'Carnes y Hamburguesas', format: '100 grs', price: '$1.190', image: IMG_MEAT },
  { id: 'car-3', name: 'Vegan Crispy 120 g', category: 'Carnes y Hamburguesas', format: '120 grs', price: '$1.290', image: IMG_MEAT },
  { id: 'car-4', name: 'Molida de vacuno 250 g (Karmac)', category: 'Carnes y Hamburguesas', format: '250 grs', price: '$2.390', image: IMG_MEAT },
  { id: 'car-5', name: 'Hamburguesa 100 g (Llanquihue / La Crianza)', category: 'Carnes y Hamburguesas', format: '100 grs', price: '$990', image: IMG_MEAT },
  { id: 'car-6', name: 'Hamburguesas de vacuno 4 un.', category: 'Carnes y Hamburguesas', format: '4 un.', price: '$6.900', image: IMG_MEAT },
  { id: 'car-7', name: 'Nuggets 275 g (Super Pollo)', category: 'Carnes y Hamburguesas', format: '275 grs', price: '$1.390', image: IMG_MEAT },
  { id: 'car-8', name: 'Escalopa de vacuno (Receta del Abuelo)', category: 'Carnes y Hamburguesas', format: '1 un.', price: '$1.200', image: IMG_MEAT },
  { id: 'car-9', name: 'Suprema de pollo (Receta del Abuelo)', category: 'Carnes y Hamburguesas', format: '1 un.', price: '$1.150', image: IMG_MEAT },

  // 4. Comidas Preparadas (3 productos)
  { id: 'prep-1', name: 'Pizza La Cabaña 470 g (Jamón / Queso)', category: 'Comidas Preparadas', format: '470 grs', price: '$4.990', image: IMG_PIZZA },
  { id: 'prep-2', name: 'Pizza La Cabaña 470 g (Pepperoni)', category: 'Comidas Preparadas', format: '470 grs', price: '$4.990', image: IMG_PIZZA },
  { id: 'prep-3', name: 'Pizza La Cabaña 470 g (Cuatro Quesos)', category: 'Comidas Preparadas', format: '470 grs', price: '$4.990', image: IMG_PIZZA },

  // 5. Papas y Masas (13 productos)
  { id: 'pap-1', name: 'Papas prefritas 1 kg (Minuto Verde)', category: 'Papas y Masas', format: '1 kg', price: '$3.300', image: IMG_FRIES },
  { id: 'pap-2', name: 'Papas gajo horneables 700 g (Minuto Verde)', category: 'Papas y Masas', format: '700 grs', price: '$2.990', image: IMG_FRIES },
  { id: 'pap-3', name: 'Papas prefritas 12 mm 2,5 kg (A&F)', category: 'Papas y Masas', format: '2,5 kg', price: '$6.490', image: IMG_FRIES },
  { id: 'pap-4', name: 'Papas Loop 800 g (Minuto Verde)', category: 'Papas y Masas', format: '800 grs', price: '$4.590', image: IMG_FRIES },
  { id: 'pap-5', name: 'Papas prefritas 11 mm 500 g (Alim Chile)', category: 'Papas y Masas', format: '500 grs', price: '$1.690', image: IMG_FRIES },
  { id: 'pap-6', name: 'Papas duquesas 1 kg (Minuto Verde)', category: 'Papas y Masas', format: '1 kg', price: '$3.990', image: IMG_FRIES },
  { id: 'pap-7', name: 'Papas prefritas finas 800 g (Minuto Verde)', category: 'Papas y Masas', format: '800 grs', price: '$3.100', image: IMG_FRIES },
  { id: 'pap-8', name: 'Arrollado primavera 10 un.', category: 'Papas y Masas', format: '10 un.', price: '$2.890', image: IMG_FRIES },
  { id: 'pap-9', name: 'Empanadas Queso-Camarón 10 un.', category: 'Papas y Masas', format: '10 un.', price: '$3.950', image: IMG_FRIES },
  { id: 'pap-10', name: 'Empanadas Pino 10 un.', category: 'Papas y Masas', format: '10 un.', price: '$3.950', image: IMG_FRIES },
  { id: 'pap-11', name: 'Empanadas Jamón-Queso 10 un.', category: 'Papas y Masas', format: '10 un.', price: '$3.950', image: IMG_FRIES },
  { id: 'pap-12', name: 'Empanadas Queso-Ciboulette 10 un.', category: 'Papas y Masas', format: '10 un.', price: '$3.950', image: IMG_FRIES },
  { id: 'pap-13', name: 'Sopapillas 50 g (10 un. Alim Chile)', category: 'Papas y Masas', format: '10 un. (500 g)', price: '$2.690', image: IMG_FRIES },

  // 6. Bebidas y Jugos (6 productos)
  { id: 'beb-1', name: 'Jugo Jumex 1 L (Durazno / Piña)', category: 'Bebidas y Jugos', format: '1 L', price: '$1.090', image: IMG_DRINK },
  { id: 'beb-2', name: 'Suerox Blue 630 ml', category: 'Bebidas y Jugos', format: '630 ml', price: '$2.490', image: IMG_DRINK },
  { id: 'beb-3', name: 'Agua 500 ml (Con / Sin gas)', category: 'Bebidas y Jugos', format: '500 ml', price: '$690', image: IMG_DRINK },
  { id: 'beb-4', name: 'Red Bull / Monster Zero', category: 'Bebidas y Jugos', format: 'Lata', price: '$1.490 – $2.090', image: IMG_DRINK },
  { id: 'beb-5', name: 'Gaseosas en lata/botella (Bilz, Coca-Cola, Kem, Pap, Sprite)', category: 'Bebidas y Jugos', format: 'Lata / Botella', price: '$990', image: IMG_DRINK },
];

const ITEMS_PER_PAGE = 12;

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const whatsappNumber = '56940500068';

  // Compute category item counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { Todos: ALL_PRODUCTS.length };
    ALL_PRODUCTS.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter products by category & search query
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
      const matchesSearch = searchQuery.trim() === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

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
        
        {/* Header Title & Subtitle */}
        <div className="text-center space-y-2 mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-[600] text-[#1752b0] tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Catálogo de productos
          </h2>
          
          <p className="text-slate-500 font-bold text-xs sm:text-sm">
            (Imágenes referenciales) — {filteredProducts.length} productos disponibles
          </p>

          {/* Snowflake Divider Line */}
          <div className="flex items-center justify-center gap-3 text-[#94c3e8] pt-2">
            <span className="w-12 sm:w-16 h-[1.5px] bg-[#bce0f8]" />
            <Snowflake className="w-4 h-4 text-[#1752b0]" />
            <span className="w-12 sm:w-16 h-[1.5px] bg-[#bce0f8]" />
          </div>
        </div>

        {/* Search & Category Filter Section */}
        <div className="mb-8">
          {/* Search bar */}
          <div className="max-w-md mx-auto mb-6 relative">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar por nombre (ej: camarón, salmón, choclo)..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                style={{ fontFamily: "'Outfit', sans-serif" }}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#1752b0] focus:ring-2 focus:ring-[#1752b0]/15 transition-all shadow-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => handleSearchChange('')}
                  className="absolute right-3 text-xs text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full w-5 h-5 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Mobile Category Filters (Horizontal Scrollbar above products on mobile) */}
          <div className="lg:hidden">
            <div className="flex items-center justify-between px-1 mb-2 text-xs font-bold text-[#0b2854]" style={{ fontFamily: "'Outfit', sans-serif" }}>
              <div className="flex items-center gap-1.5 text-[#1752b0]">
                <Filter className="w-3.5 h-3.5" />
                <span>Categorías</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-[#1752b0] bg-[#eef6fc] border border-[#bce0f8] px-2.5 py-0.5 rounded-full shadow-xs">
                <span>Desliza para ver más</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#1752b0] animate-pulse" />
              </div>
            </div>

            <div className="relative">
              {/* Fade gradient cue on right edge to show horizontal scrolling */}
              <div className="absolute right-0 top-0 bottom-3 w-8 bg-gradient-to-l from-[#f2f8fc] via-[#f2f8fc]/80 to-transparent pointer-events-none z-10 rounded-r-xl" />

              <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-thin px-1 scroll-smooth">
                {CATEGORIES.map((cat) => {
                  const IconComponent = cat.icon;
                  const isSelected = selectedCategory === cat.id;
                  const count = categoryCounts[cat.id] || 0;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategorySelect(cat.id)}
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 border flex-shrink-0 cursor-pointer ${
                        isSelected
                          ? 'bg-[#1752b0] text-white border-[#1752b0] shadow-md scale-[1.02]'
                          : 'bg-white text-slate-700 border-slate-200/80 hover:bg-[#eef6fc] hover:text-[#1752b0] shadow-sm'
                      }`}
                    >
                      <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#1752b0]'}`} />
                      <span>{cat.name}</span>
                      <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content: Desktop Sidebar Filter (left) + Products Grid (right) */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Desktop Category Sidebar (Sticky on PC) */}
          <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-24 z-10">
            <div className="bg-white rounded-[22px] border border-slate-200/80 p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-[#0b2854] font-bold text-base border-b border-slate-100 pb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
                <Filter className="w-4 h-4 text-[#1752b0]" />
                <span>Categorías</span>
              </div>

              <nav className="flex flex-col gap-1.5">
                {CATEGORIES.map((cat) => {
                  const IconComponent = cat.icon;
                  const isSelected = selectedCategory === cat.id;
                  const count = categoryCounts[cat.id] || 0;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategorySelect(cat.id)}
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-[#1752b0] text-white shadow-sm font-bold'
                          : 'bg-slate-50 text-slate-700 hover:bg-[#eef6fc] hover:text-[#1752b0] border border-slate-100/80'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <IconComponent className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#1752b0]'}`} />
                        <span>{cat.name}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-white border border-slate-200 text-slate-500'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1 w-full">
            {currentProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
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

                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#1752b0] bg-[#eef6fc] px-2 py-0.5 rounded-md mb-1.5">
                        {product.category}
                      </span>

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
            ) : (
              /* Empty state if no products found */
              <div className="bg-white rounded-[22px] border border-slate-200/80 p-12 text-center my-6">
                <p className="text-slate-500 font-semibold mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  No se encontraron productos que coincidan con la búsqueda o categoría seleccionada.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('Todos');
                    setSearchQuery('');
                  }}
                  className="bg-[#1752b0] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#094bb5] transition-all shadow-sm"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Ver todos los productos
                </button>
              </div>
            )}

            {/* Pagination Controls */}
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
        </div>

      </div>
    </section>
  );
}
