'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase, DbProduct } from '../lib/supabase';
import { compressImage } from '../lib/compressImage';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  ArrowLeft, 
  Package, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Tag, 
  Layers, 
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Upload,
  Snowflake
} from 'lucide-react';

const CATEGORIES = [
  'Todos',
  'Mariscos',
  'Pescados',
  'Frutas',
  'Verduras',
  'Carnes',
  'Comidas',
  'Papas & Masas',
  'Bebidas'
];

export default function AdminPage() {
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  
  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<DbProduct | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);

  const [uploadingImage, setUploadingImage] = useState<boolean>(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      // 1. Comprimir la imagen en el cliente a formato WebP ligero (Max 800px, 75% calidad)
      const { compressedFile, originalSizeKb, compressedSizeKb } = await compressImage(file, 800, 800, 0.75);

      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.webp`;
      
      // 2. Subir imagen única comprimida a Supabase Storage
      const { error } = await supabase.storage
        .from('productos')
        .upload(fileName, compressedFile, { 
          contentType: 'image/webp', 
          cacheControl: '31536000', 
          upsert: true 
        });

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from('productos')
        .getPublicUrl(fileName);

      if (publicUrlData?.publicUrl) {
        // Reemplaza de forma estricta la única imagen del producto
        setFormData((prev) => ({ ...prev, image: publicUrlData.publicUrl }));
        showToast(`¡Imagen optimizada (${originalSizeKb} KB ➔ ${compressedSizeKb} KB WebP) y guardada!`);
      }
    } catch (err: any) {
      console.error('Error uploading image:', err);
      showToast(`Error al comprimir/subir imagen: ${err.message || 'Verifica que el bucket sea público'}`, 'error');
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  // Toast Notification State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    category: 'Mariscos',
    format: '500 grs',
    price: '$3.800',
    image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80'
  });

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Fetch products from Supabase
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        showToast('No se pudo conectar a la tabla de productos en Supabase', 'error');
      } else if (data) {
        setProducts(data as DbProduct[]);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Open modal for creating new product
  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'Mariscos',
      format: '500 grs',
      price: '$',
      image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80'
    });
    setIsModalOpen(true);
  };

  // Open modal for editing existing product
  const handleOpenEditModal = (product: DbProduct) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category || 'Mariscos',
      format: product.format || '',
      price: product.price || '$',
      image: product.image || ''
    });
    setIsModalOpen(true);
  };

  // Save (Insert or Update) product
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price.trim()) {
      showToast('Por favor completa el nombre y el precio.', 'error');
      return;
    }

    setSaving(true);
    try {
      if (editingProduct) {
        // Update existing product
        const { error } = await supabase
          .from('products')
          .update({
            name: formData.name.trim(),
            category: formData.category,
            format: formData.format.trim(),
            price: formData.price.trim(),
            image: formData.image.trim() || 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80'
          })
          .eq('id', editingProduct.id);

        if (error) throw error;
        showToast('¡Producto actualizado exitosamente!');
      } else {
        // Create new product
        const { error } = await supabase
          .from('products')
          .insert([
            {
              name: formData.name.trim(),
              category: formData.category,
              format: formData.format.trim(),
              price: formData.price.trim(),
              image: formData.image.trim() || 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=600&q=80'
            }
          ]);

        if (error) throw error;
        showToast('¡Producto creado exitosamente!');
      }

      setIsModalOpen(false);
      fetchProducts();
    } catch (err: any) {
      console.error('Error saving product:', err);
      showToast(`Error al guardar: ${err.message || 'Intenta de nuevo'}`, 'error');
    } finally {
      setSaving(false);
    }
  };

  // Delete product
  const handleDeleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;

      showToast('Producto eliminado del catálogo');
      setDeleteConfirmId(null);
      fetchProducts();
    } catch (err: any) {
      console.error('Error deleting product:', err);
      showToast(`Error al eliminar: ${err.message}`, 'error');
    }
  };

  // Filtered Products List
  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.format.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      
      {/* Toast Alert Banner */}
      {toast && (
        <div className={`fixed top-4 right-4 left-4 sm:left-auto z-50 max-w-md p-4 rounded-2xl shadow-xl border flex items-center gap-3 transition-all animate-bounce ${
          toast.type === 'success' 
            ? 'bg-emerald-600 text-white border-emerald-500' 
            : 'bg-rose-600 text-white border-rose-500'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
          <span className="font-semibold text-sm leading-snug">{toast.message}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Volver a la tienda"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#1752b0] text-white flex items-center justify-center font-bold text-sm">
                ICE
              </div>
              <div>
                <h1 className="font-bold text-base text-slate-900 leading-tight">Panel Administrador</h1>
                <p className="text-[11px] text-slate-500 font-medium">Ice Austral Congelados</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={fetchProducts}
              className="p-2 text-slate-600 hover:text-[#1752b0] hover:bg-blue-50 rounded-xl transition-colors"
              title="Actualizar datos"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin text-[#1752b0]' : ''}`} />
            </button>
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#1752b0] hover:underline"
            >
              <span>Ver tienda</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={handleOpenCreateModal}
              className="inline-flex items-center gap-1.5 bg-[#1752b0] hover:bg-[#0f3c85] active:scale-95 text-white px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Producto</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* Stats Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white border border-slate-200/80 p-4 rounded-2xl shadow-2xs">
            <div className="text-slate-500 text-xs font-medium mb-1 flex items-center gap-1.5">
              <Package className="w-4 h-4 text-[#1752b0]" /> Total Productos
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{products.length}</div>
          </div>

          <div className="bg-white border border-slate-200/80 p-4 rounded-2xl shadow-2xs">
            <div className="text-slate-500 text-xs font-medium mb-1 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-600" /> Categorías
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{CATEGORIES.length - 1}</div>
          </div>

          <div className="bg-white border border-slate-200/80 p-4 rounded-2xl shadow-2xs">
            <div className="text-slate-500 text-xs font-medium mb-1 flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-indigo-600" /> En Pantalla
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{filteredProducts.length}</div>
          </div>

          <div className="bg-white border border-slate-200/80 p-4 rounded-2xl shadow-2xs">
            <div className="text-slate-500 text-xs font-medium mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sky-600" /> Base de Datos
            </div>
            <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md inline-block">
              Supabase Activo
            </div>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-2xl shadow-2xs space-y-4">
          
          {/* Search bar input */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar producto por nombre o formato (ej: Salmón, 1 kg, 500 grs)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1752b0] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Horizontal scrollable category pill tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1752b0] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Setup Banner if Empty or Table not created */}
        {!loading && products.length === 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center space-y-3">
            <Sparkles className="w-8 h-8 text-[#1752b0] mx-auto" />
            <h3 className="text-lg font-bold text-[#0b2854]">Aún no hay productos en tu base de datos Supabase</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              Puedes agregar nuevos productos usando el botón <strong>"+ Nuevo Producto"</strong> o ejecutar el script <code>supabase_setup.sql</code> en el editor SQL de tu panel de Supabase para subir automáticamente todos los productos iniciales.
            </p>
            <button
              onClick={handleOpenCreateModal}
              className="inline-flex items-center gap-2 bg-[#1752b0] text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-xs hover:bg-[#0f3c85] transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Crear mi primer producto</span>
            </button>
          </div>
        )}

        {/* Product Cards List (Mobile-Optimized Clean Cards) */}
        {loading ? (
          <div className="text-center py-16 space-y-3">
            <RefreshCw className="w-8 h-8 text-[#1752b0] animate-spin mx-auto" />
            <p className="text-sm font-semibold text-slate-500">Cargando catálogo desde Supabase...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow group"
              >
                <div>
                  {/* Image & Category Badge */}
                  <div className="relative w-full aspect-square bg-[#ebf5fc] rounded-xl overflow-hidden mb-3 border border-slate-100 flex items-center justify-center">
                    {Boolean(product.image && typeof product.image === 'string' && product.image.trim().length > 5 && product.image.startsWith('http')) ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="250px"
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center space-y-1 text-[#1752b0]">
                        <Snowflake className="w-7 h-7 text-[#1752b0]/50 animate-pulse" />
                        <span className="font-extrabold text-[10px] uppercase bg-white text-[#1752b0] px-2 py-0.5 rounded-full border border-[#bce0f8]">
                          Pronto
                        </span>
                      </div>
                    )}
                    <span className="absolute top-2 left-2 bg-white/95 backdrop-blur-xs text-[#1752b0] text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs border border-slate-100">
                      {product.category || 'General'}
                    </span>
                  </div>

                  {/* Title & Format */}
                  <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-slate-500 font-medium text-xs mb-2">
                    {product.format}
                  </p>
                </div>

                {/* Price & Action Buttons */}
                <div className="pt-3 border-t border-slate-100 mt-2 flex items-center justify-between gap-2">
                  <div className="font-extrabold text-[#1752b0] text-base">
                    {product.price}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditModal(product)}
                      className="p-2 text-slate-600 hover:text-[#1752b0] hover:bg-blue-50 rounded-lg transition-colors"
                      title="Editar producto"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(product.id)}
                      className="p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Eliminar producto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </main>

      {/* Floating Action Button for Mobile */}
      <button
        onClick={handleOpenCreateModal}
        className="sm:hidden fixed bottom-6 right-6 z-40 bg-[#1752b0] text-white p-4 rounded-full shadow-2xl active:scale-95 transition-transform flex items-center justify-center"
        aria-label="Agregar Producto"
      >
        <Plus className="w-7 h-7" />
      </button>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl text-center animate-in fade-in zoom-in duration-150">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">¿Eliminar producto?</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Esta acción quitará el producto de la base de datos y ya no aparecerá en el catálogo público.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="w-1/2 py-2.5 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDeleteProduct(deleteConfirmId)}
                className="w-1/2 py-2.5 bg-rose-600 text-white font-bold text-xs rounded-xl hover:bg-rose-700 transition-colors shadow-xs"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom sm:zoom-in duration-200 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="font-extrabold text-base text-slate-900">
                {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProduct} className="p-4 sm:p-6 space-y-4 overflow-y-auto">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Nombre del Producto *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Salmón Salar con piel 1 kg"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#1752b0] focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Categoría *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-[#1752b0] focus:bg-white focus:outline-none"
                  >
                    {CATEGORIES.filter((c) => c !== 'Todos').map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Formato / Peso *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. 1 kg, 500 grs, 10 un."
                    value={formData.format}
                    onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#1752b0] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Precio (Formato $X.XXX) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. $14.900"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-extrabold text-[#1752b0] focus:ring-2 focus:ring-[#1752b0] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Imagen del Producto
                </label>
                
                {/* Upload File Input Button */}
                <div className="flex flex-col sm:flex-row gap-2 mb-2">
                  <label className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-50 border border-blue-200 hover:bg-blue-100 text-[#1752b0] font-bold text-xs py-2.5 px-3 rounded-xl cursor-pointer transition-colors shadow-2xs">
                    <Upload className={`w-4 h-4 ${uploadingImage ? 'animate-bounce' : ''}`} />
                    <span>{uploadingImage ? 'Subiendo imagen a Storage...' : 'Subir desde mi celular / PC'}</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileUpload} 
                      disabled={uploadingImage}
                      className="hidden" 
                    />
                  </label>
                </div>

                <div className="text-[11px] text-slate-400 font-medium mb-1">
                  O pega directamente la URL de la imagen:
                </div>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:ring-2 focus:ring-[#1752b0] focus:bg-white focus:outline-none"
                />
              </div>

              {/* Image Preview Thumbnail */}
              {formData.image && (
                <div className="flex items-center gap-3 p-2 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-200 flex-shrink-0">
                    <Image
                      src={formData.image}
                      alt="Vista previa"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-xs text-slate-500 font-medium truncate">
                    Vista previa de imagen seleccionada
                  </div>
                </div>
              )}

              {/* Form Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/3 py-3 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="w-2/3 py-3 bg-[#1752b0] hover:bg-[#0f3c85] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Guardando...</span>
                    </>
                  ) : (
                    <span>{editingProduct ? 'Guardar Cambios' : 'Crear Producto'}</span>
                  )}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
