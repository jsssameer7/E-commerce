'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NotificationToast from '@/components/NotificationToast';
import { useCart } from '@/context/CartContext';
import { Product, Order } from '@/types/ecommerce';
import { CATEGORIES } from '@/data/products';
import {
  ShieldCheck,
  DollarSign,
  Package,
  AlertTriangle,
  Plus,
  Trash2,
  Edit,
  ArrowLeft,
  X,
  Save,
  RefreshCw
} from 'lucide-react';

export default function AdminPage() {
  const {
    products,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
    resetCatalog,
    updateOrderStatus,
    showToast
  } = useCart();

  const [activeTab, setActiveTab] = useState<'inventory' | 'orders'>('inventory');

  // Product modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(4999);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(6999);
  const [category, setCategory] = useState(CATEGORIES[1] || 'Audio');
  const [stock, setStock] = useState<number>(20);
  const [image, setImage] = useState('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80');
  const [badge, setBadge] = useState<Product['badge']>('Featured');

  // Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const lowStockCount = products.filter((p) => p.stock <= 10).length;

  const openAddModal = () => {
    setEditingProductId(null);
    setName('');
    setDescription('');
    setPrice(4999);
    setOriginalPrice(6999);
    setCategory('Audio');
    setStock(15);
    setImage('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80');
    setBadge('Featured');
    setModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProductId(p.id);
    setName(p.name);
    setDescription(p.description);
    setPrice(p.price);
    setOriginalPrice(p.originalPrice);
    setCategory(p.category);
    setStock(p.stock);
    setImage(p.image);
    setBadge(p.badge);
    setModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim() || price <= 0) {
      showToast('Please provide valid product details', 'error');
      return;
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (editingProductId) {
      updateProduct(editingProductId, {
        name,
        slug,
        description,
        price,
        originalPrice: originalPrice || undefined,
        category,
        stock,
        image,
        badge: badge || undefined,
      });
    } else {
      addProduct({
        name,
        slug,
        description,
        price,
        originalPrice: originalPrice || undefined,
        category,
        stock,
        image,
        badge: badge || undefined,
      });
    }

    setModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-200">
          <div>
            <h1 className="text-2xl font-black text-stone-900 flex items-center gap-2.5">
              <ShieldCheck className="w-7 h-7 text-amber-600" /> Admin Control Center
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Manage product inventory, track customer orders, and update store items
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={resetCatalog}
              className="bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-xs"
              title="Reset catalog to 16 default INR products"
            >
              <RefreshCw className="w-3.5 h-3.5 text-stone-500" /> Reset Catalog
            </button>
            <button
              onClick={openAddModal}
              className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-xs transition-all"
            >
              <Plus className="w-4 h-4" /> Add Product
            </button>
            <Link
              href="/"
              className="text-xs font-semibold text-stone-500 hover:text-stone-800 flex items-center gap-1 ml-1"
            >
              <ArrowLeft className="w-4 h-4" /> Storefront
            </Link>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-stone-200 p-4.5 rounded-2xl flex items-center gap-4 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-stone-500 font-semibold">Total Revenue</p>
              <h3 className="text-xl font-extrabold text-stone-900">₹{totalRevenue.toLocaleString('en-IN')}</h3>
            </div>
          </div>

          <div className="bg-white border border-stone-200 p-4.5 rounded-2xl flex items-center gap-4 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-stone-500 font-semibold">Total Orders</p>
              <h3 className="text-xl font-extrabold text-stone-900">{orders.length}</h3>
            </div>
          </div>

          <div className="bg-white border border-stone-200 p-4.5 rounded-2xl flex items-center gap-4 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-stone-500 font-semibold">Active Products</p>
              <h3 className="text-xl font-extrabold text-stone-900">{products.length}</h3>
            </div>
          </div>

          <div className="bg-white border border-stone-200 p-4.5 rounded-2xl flex items-center gap-4 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-stone-500 font-semibold">Low Stock Alerts</p>
              <h3 className="text-xl font-extrabold text-amber-700">{lowStockCount}</h3>
            </div>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex border-b border-stone-200 gap-6 mb-6">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`pb-3 text-xs font-bold transition-all relative ${
              activeTab === 'inventory'
                ? 'text-emerald-700 border-b-2 border-emerald-700'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Products & Inventory ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 text-xs font-bold transition-all relative ${
              activeTab === 'orders'
                ? 'text-emerald-700 border-b-2 border-emerald-700'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Customer Orders ({orders.length})
          </button>
        </div>

        {/* Tab 1: Products Table */}
        {activeTab === 'inventory' && (
          <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-700">
                <thead className="bg-stone-100 text-stone-600 uppercase font-bold border-b border-stone-200">
                  <tr>
                    <th className="p-3.5">Product</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Price</th>
                    <th className="p-3.5">Stock</th>
                    <th className="p-3.5">Badge</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-stone-50">
                      <td className="p-3.5 flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-9 h-9 object-cover rounded-lg bg-stone-100 border border-stone-200"
                        />
                        <div>
                          <p className="font-bold text-stone-900 line-clamp-1">{p.name}</p>
                          <p className="text-[11px] text-stone-400">{p.id}</p>
                        </div>
                      </td>
                      <td className="p-3.5 font-bold text-emerald-700">{p.category}</td>
                      <td className="p-3.5 font-bold text-stone-900">₹{p.price.toLocaleString('en-IN')}</td>
                      <td className="p-3.5">
                        <span
                          className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                            p.stock <= 5
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : p.stock <= 10
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          }`}
                        >
                          {p.stock} units
                        </span>
                      </td>
                      <td className="p-3.5">
                        {p.badge ? (
                          <span className="bg-stone-100 border border-stone-300 text-stone-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                            {p.badge}
                          </span>
                        ) : (
                          <span className="text-stone-400">-</span>
                        )}
                      </td>
                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition-colors border border-stone-300"
                          title="Edit Product"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors border border-rose-200"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Orders List */}
        {activeTab === 'orders' && (
          <div className="space-y-3">
            {orders.length > 0 ? (
              orders.map((o) => (
                <div key={o.id} className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200">
                    <div>
                      <span className="font-mono font-bold text-stone-900 text-xs">{o.id}</span>
                      <p className="text-xs text-stone-500">
                        Customer: <span className="text-stone-900 font-bold">{o.customerName}</span> ({o.email})
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-stone-600">Status:</span>
                      <select
                        value={o.status}
                        onChange={(e) => updateOrderStatus(o.id, e.target.value as Order['status'])}
                        className="bg-stone-50 border border-stone-300 text-xs font-bold text-stone-900 rounded-xl px-2.5 py-1 focus:outline-none focus:border-emerald-600"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div className="py-3 text-xs text-stone-700">
                    <p className="font-bold text-stone-500 mb-1">Purchased Items:</p>
                    <div className="flex flex-wrap gap-2">
                      {o.items.map((i, idx) => (
                        <span key={idx} className="bg-stone-50 px-2.5 py-1 rounded-lg border border-stone-200">
                          {i.name} × {i.quantity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-stone-200 flex justify-between text-xs text-stone-500">
                    <span>Date: {o.date}</span>
                    <span className="font-extrabold text-emerald-700">Total: ₹{o.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white border border-stone-200 rounded-2xl">
                <p className="text-xs text-stone-500">No customer orders recorded yet.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Add / Edit Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-base font-bold text-stone-900">
              {editingProductId ? 'Edit Product' : 'Add New Product'}
            </h2>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-600 mb-1 font-semibold">Product Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-emerald-600 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-600 mb-1 font-semibold">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-emerald-600 font-semibold"
                  >
                    {CATEGORIES.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-stone-600 mb-1 font-semibold">Badge</label>
                  <select
                    value={badge || ''}
                    onChange={(e) => setBadge((e.target.value as any) || undefined)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-emerald-600 font-semibold"
                  >
                    <option value="">None</option>
                    <option value="Featured">Featured</option>
                    <option value="Best Seller">Best Seller</option>
                    <option value="New">New</option>
                    <option value="Sale">Sale</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-stone-600 mb-1 font-semibold">Price (₹) *</label>
                  <input
                    type="number"
                    step="1"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-emerald-600 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 mb-1 font-semibold">Original Price (₹)</label>
                  <input
                    type="number"
                    step="1"
                    value={originalPrice || ''}
                    onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-emerald-600 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 mb-1 font-semibold">Stock *</label>
                  <input
                    type="number"
                    required
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-emerald-600 font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-600 mb-1 font-semibold">Image URL</label>
                <input
                  type="url"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2 text-stone-800 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-stone-600 mb-1 font-semibold">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-emerald-600 font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all text-xs"
              >
                <Save className="w-4 h-4" /> Save Product
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
      <NotificationToast />
    </div>
  );
}
