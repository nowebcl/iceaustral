'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Session } from '@supabase/supabase-js';
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
  Snowflake,
  Lock,
  Mail,
  LogOut,
  Eye,
  EyeOff,
  ShieldAlert,
  UserCheck
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
  // Auth Session States
  const [session, setSession] = useState<Session | null>(null);
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);
  
  // Login Form States
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loggingIn, setLoggingIn] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');

  // Products Data & UI States
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

  // Toast Notification State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    category: 'Mariscos',
    format: '500 grs',
    price: '$3.800',
    image: ''
  });

  // Verify Auth Session on Mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setCheckingAuth(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setCheckingAuth(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch products when session is active
  useEffect(() => {
    if (session) {
      fetchProducts();
    }
  }, [session]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail.trim(),
        password: loginPassword,
      });

      if (error) throw error;
      setSession(data.session);
      showToast('¡Sesión iniciada correctamente!', 'success');
    } catch (err: any) {
      console.error('Login error:', err);
      setLoginError(
        err.message === 'Invalid login credentials' 
          ? 'Correo electrónico o contraseña incorrectos. Revisa tus datos.' 
          : (err.message || 'Error de autenticación. Intenta nuevamente.')
      );
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    showToast('Sesión cerrada correctamente.', 'success');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      // 1. Comprimir la imagen en el cliente a formato WebP ligero
      const { compressedFile } = await compressImage(file, 800, 800, 0.75);
      
      const fileExt = 'webp';
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `productos/${fileName}`;

      // 2. Subir directamente a Supabase Storage bucket 'productos'
      const { error: uploadError } = await supabase.storage
        .from('productos')
        .upload(filePath, compressedFile, {
          contentType: 'image/webp',
          upsert: true
        });

      if (uploadError) {
        throw uploadError;
      }

      // 3. Obtener URL pública directa
      const { data: { publicUrl } } = supabase.storage
        .from('productos')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, image: publicUrl }));
      showToast('¡Imagen optimizada en WebP y subida con éxito!');
    } catch (err: any) {
      console.error('Error uploading image:', err);
      showToast(`Error al subir imagen: ${err.message || 'Verifica la conexión'}`, 'error');
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

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

      if (error) throw error;
      setProducts(data || []);
    } catch (err: any) {
      console.error('Error loading products:', err);
      showToast('Error al cargar productos desde la base de datos', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Filter products by search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.format && product.format.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = 
      selectedCategory === 'Todos' || 
      (product.category && product.category.toLowerCase().includes(selectedCategory.toLowerCase()));

    return matchesSearch && matchesCategory;
  });

  // Open modal for creating new product
  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'Mariscos',
      format: '500 grs',
      price: '$',
      image: ''
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

  // Save product (Insert or Update)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('El nombre del producto es obligatorio', 'error');
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
            image: formData.image.trim()
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
              image: formData.image.trim()
            }
          ]);

        if (error) throw error;
        showToast('¡Producto creado exitosamente!');
      }

      setIsModalOpen(false);
      fetchProducts();
    } catch (err: any) {
      console.error('Error saving product:', err);
      showToast(`Error al guardar: ${err.message || 'Intenta nuevamente'}`, 'error');
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
      showToast('Producto eliminado correctamente');
      setDeleteConfirmId(null);
      fetchProducts();
    } catch (err: any) {
      console.error('Error deleting product:', err);
      showToast(`Error al eliminar: ${err.message}`, 'error');
    }
  };

  // 1. Loading Screen while checking auth session
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#06172d] flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <RefreshCw className="w-10 h-10 text-sky-400 animate-spin mx-auto" />
          <p className="text-slate-300 text-sm font-semibold">Verificando sesión de seguridad...</p>
        </div>
      </div>
    );
  }

  // 2. Login Screen when NOT authenticated
  if (!session) {
    return (
      <div className="min-h-screen bg-[#06172d] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ fontFamily: "'Outfit', sans-serif" }}>
        
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#1752b0]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 space-y-4 text-center">
          <Link href="/" className="inline-block hover:scale-105 transition-transform">
            <div className="relative w-20 h-20 mx-auto mb-2">
              <Image
                src="/IMAGENES/logo.png"
                alt="Ice Austral Logo"
                fill
                className="object-contain drop-shadow-md"
              />
            </div>
          </Link>

          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Panel Administrativo
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Ice Austral Congelados • Acceso Privado
            </p>
          </div>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
          <div className="bg-white/95 backdrop-blur-md py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-white/20 space-y-6">
            
            {/* Security Badge Banner */}
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-blue-50 border border-blue-100 text-[#1752b0]">
              <ShieldCheck className="w-5 h-5 flex-shrink-0" />
              <span className="text-xs font-bold leading-tight">
                Acceso restringido con autenticación SSL de Supabase.
              </span>
            </div>

            {/* Login Error Notification */}
            {loginError && (
              <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-red-700 text-xs font-semibold animate-shake">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              
              {/* Email Input */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  Correo Electrónico
                </label>
                <div className="relative rounded-xl shadow-2xs">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="contacto@iceaustralcongelados.cl"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1752b0] focus:bg-white transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  Contraseña
                </label>
                <div className="relative rounded-xl shadow-2xs">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1752b0] focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Login Button */}
              <button
                type="submit"
                disabled={loggingIn}
                className="w-full flex items-center justify-center gap-2 bg-[#1752b0] hover:bg-[#094bb5] active:scale-98 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50 mt-2"
              >
                {loggingIn ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Iniciando sesión...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Ingresar al Panel</span>
                  </>
                )}
              </button>

            </form>

            <div className="pt-2 text-center border-t border-slate-100">
              <Link 
                href="/" 
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#1752b0] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver a la tienda web</span>
              </Link>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // 3. Authenticated Admin Dashboard Panel
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800" style={{ fontFamily: "'Outfit', sans-serif" }}>
      
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl border text-sm font-bold animate-bounce ${
          toast.type === 'error'
            ? 'bg-red-50 border-red-200 text-red-700'
            : 'bg-emerald-50 border-emerald-200 text-emerald-800'
        }`}>
          {toast.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <Link href="/" className="relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 hover:scale-105 transition-transform">
              <Image
                src="/IMAGENES/logo.png"
                alt="Ice Austral Logo"
                fill
                className="object-contain"
              />
            </Link>
            <div>
              <div className="font-extrabold text-[#0b2854] text-base sm:text-lg leading-tight flex items-center gap-2">
                <span>Panel Admin</span>
                <span className="bg-blue-100 text-[#1752b0] text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider hidden sm:inline-block">
                  Seguro
                </span>
              </div>
              <p className="text-slate-500 text-xs font-semibold hidden sm:block">
                Gestión de productos y catálogo en tiempo real
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2 px-3 rounded-xl transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Ver Tienda</span>
            </Link>

            <button
              onClick={handleOpenCreateModal}
              className="inline-flex items-center gap-1.5 bg-[#1752b0] hover:bg-[#094bb5] active:scale-95 text-white text-xs sm:text-sm font-bold py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Nuevo Producto</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              title="Cerrar sesión"
              className="inline-flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold py-2 sm:py-2.5 px-3 rounded-xl transition-colors cursor-pointer border border-red-100"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Salir</span>
            </button>

          </div>

        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        
        {/* User Session Bar */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-700">
            <UserCheck className="w-4 h-4 text-emerald-600" />
            <span>Sesión iniciada como: <strong className="text-[#1752b0]">{session.user.email}</strong></span>
          </div>

          <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Autenticado
            </span>
          </div>
        </div>

        {/* Dashboard Quick Stats Bar */}
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

          {/* Category Pill Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
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

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-2">
                  <div className="text-[#1752b0] font-extrabold text-base">
                    {product.price}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditModal(product)}
                      className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#1752b0] transition-colors cursor-pointer"
                      title="Editar producto"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    {deleteConfirmId === product.id ? (
                      <div className="flex items-center gap-1 bg-red-50 p-1 rounded-xl border border-red-200">
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700"
                        >
                          Sí
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="px-2 py-1 bg-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-300"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirmId(product.id)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors cursor-pointer"
                        title="Eliminar producto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* Modal Form for Create / Edit Product */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 relative animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-[#0b2854]">
                <Package className="w-5 h-5 text-[#1752b0]" />
                <h2 className="text-lg font-bold">
                  {editingProduct ? 'Editar Producto' : 'Crear Nuevo Producto'}
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProduct} className="space-y-4">
              
              {/* Product Name */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  Nombre del Producto *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ej. Salmón Salar con piel 1 kg"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1752b0] focus:bg-white"
                />
              </div>

              {/* Category & Format Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Categoría
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1752b0] focus:bg-white"
                  >
                    {CATEGORIES.filter(c => c !== 'Todos').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Formato
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ej. 1 kg / 500 grs / 10 un."
                    value={formData.format}
                    onChange={(e) => setFormData(prev => ({ ...prev, format: e.target.value }))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1752b0] focus:bg-white"
                  />
                </div>
              </div>

              {/* Price */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  Precio (CLP)
                </label>
                <input
                  type="text"
                  required
                  placeholder="ej. $14.900"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1752b0] focus:bg-white"
                />
              </div>

              {/* Product Image File Upload & WebP Auto-Compression */}
              <div className="space-y-2 pt-1 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700">
                  Imagen del Producto (Compresión WebP automática)
                </label>
                
                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer transition-colors border border-slate-200">
                    {uploadingImage ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-[#1752b0]" />
                    ) : (
                      <Upload className="w-4 h-4 text-[#1752b0]" />
                    )}
                    <span>{uploadingImage ? 'Comprimiendo...' : 'Subir desde equipo'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>

                  <span className="text-xs text-slate-400 font-medium">o ingresa una URL:</span>
                </div>

                <input
                  type="text"
                  placeholder="URL de la imagen (opcional)"
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#1752b0] focus:bg-white"
                />

                {/* Preview Thumbnail */}
                {formData.image && (
                  <div className="relative w-20 h-20 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 mt-2">
                    <Image
                      src={formData.image}
                      alt="Vista previa"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                      className="absolute top-1 right-1 bg-red-600 text-white p-0.5 rounded-md hover:bg-red-700"
                      title="Quitar imagen"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving || uploadingImage}
                  className="px-5 py-2.5 bg-[#1752b0] hover:bg-[#094bb5] active:scale-95 text-white text-xs font-bold rounded-xl shadow-xs transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {saving && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingProduct ? 'Guardar Cambios' : 'Crear Producto'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
