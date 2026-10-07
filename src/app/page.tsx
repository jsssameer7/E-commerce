'use client';

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import NotificationToast from '@/components/NotificationToast';
import { useCart } from '@/context/CartContext';
import { CATEGORIES } from '@/data/products';
import { SlidersHorizontal, ArrowUpDown, Heart, PackageCheck, Truck, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  const { products, wishlist } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(60000);
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category Filter
        if (selectedCategory !== 'All' && product.category !== selectedCategory) {
          return false;
        }
        // Wishlist Filter
        if (showWishlistOnly && !wishlist.includes(product.id)) {
          return false;
        }
        // Max Price Filter
        if (product.price > maxPrice) {
          return false;
        }
        // Search Query Filter
        if (searchQuery.trim() !== '') {
          const query = searchQuery.toLowerCase();
          const matchesName = product.name.toLowerCase().includes(query);
          const matchesCat = product.category.toLowerCase().includes(query);
          const matchesDesc = product.description.toLowerCase().includes(query);
          return matchesName || matchesCat || matchesDesc;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured
      });
  }, [products, selectedCategory, searchQuery, sortBy, maxPrice, showWishlistOnly, wishlist]);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Natural Simple Banner */}
      <section className="bg-stone-100/70 border-b border-stone-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl mx-auto space-y-2.5">
          <h1 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Everyday Essentials for Work & Home
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Simple, high-quality audio gear, monitors, ergonomic seating, and workspace accessories.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4 text-[11px] font-semibold text-stone-600">
            <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-lg border border-stone-200">
              <Truck className="w-3.5 h-3.5 text-emerald-600" /> Free Shipping &gt; ₹1,999
            </div>
            <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-lg border border-stone-200">
              <PackageCheck className="w-3.5 h-3.5 text-emerald-600" /> Easy 30-Day Returns
            </div>
            <div className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-lg border border-stone-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% Genuine Products
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Filter Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-stone-200">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setShowWishlistOnly(false);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat && !showWishlistOnly
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
                }`}
              >
                {cat}
              </button>
            ))}

            {/* Wishlist Filter */}
            <button
              onClick={() => setShowWishlistOnly(!showWishlistOnly)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                showWishlistOnly
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-white text-rose-600 border border-stone-300 hover:bg-rose-50'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${showWishlistOnly ? 'fill-white' : ''}`} />
              Favorites ({wishlist.length})
            </button>
          </div>

          {/* Controls: Price & Sort */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            {/* Price Slider */}
            <div className="flex items-center gap-2 bg-white border border-stone-300 px-3 py-1.5 rounded-xl">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
              <span className="text-stone-600">Max Price:</span>
              <span className="font-bold text-emerald-700">₹{maxPrice.toLocaleString('en-IN')}</span>
              <input
                type="range"
                min="2000"
                max="60000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-24 accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-white border border-stone-300 px-3 py-1.5 rounded-xl">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-500" />
              <span className="text-stone-600">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-stone-800 font-bold focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Header Results Info */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-xs text-stone-600 font-medium">
            Showing <span className="font-bold text-stone-900">{filteredProducts.length}</span> products
            {selectedCategory !== 'All' && <span> in <span className="text-emerald-700 font-semibold">{selectedCategory}</span></span>}
            {showWishlistOnly && <span className="text-rose-600 font-semibold"> (Favorites)</span>}
          </p>

          {(searchQuery || selectedCategory !== 'All' || maxPrice < 60000 || showWishlistOnly) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setMaxPrice(60000);
                setShowWishlistOnly(false);
              }}
              className="text-xs text-emerald-700 hover:underline font-bold"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-stone-200 rounded-2xl p-8">
            <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-3 text-stone-500">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-900 mb-1">No products match your filters</h3>
            <p className="text-xs text-stone-500 mb-4">
              Try adjusting your price range, search query, or category tab.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setMaxPrice(60000);
                setShowWishlistOnly(false);
              }}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      <Footer />
      <NotificationToast />
    </div>
  );
}
