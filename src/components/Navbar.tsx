'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import {
  ShoppingBag,
  Heart,
  Search,
  Package,
  ShieldCheck,
  Menu,
  X,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

export default function Navbar({ searchQuery = '', setSearchQuery }: NavbarProps) {
  const { cartCount, wishlist } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 text-stone-800">
      {/* Friendly Top Notice Bar */}
      <div className="bg-emerald-700 px-4 py-1.5 text-center text-xs font-medium text-emerald-50 flex items-center justify-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        <span>Special Offer: Use code <span className="bg-white/20 px-1.5 py-0.5 rounded font-bold text-white">SAVE10</span> for 10% OFF | Free delivery over ₹1,999!</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm group-hover:bg-emerald-700 transition-colors">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-stone-900">
                ShopVibe
              </span>
              <span className="text-[10px] font-semibold text-stone-500 -mt-1">Simple Everyday Store</span>
            </div>
          </Link>

          {/* Search bar */}
          {setSearchQuery && (
            <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
              <input
                type="text"
                placeholder="Search headphones, monitors, keyboards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-100/80 border border-stone-300 rounded-xl py-2 pl-9 pr-4 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2 text-xs text-stone-400 hover:text-stone-700"
                >
                  Clear
                </button>
              )}
            </div>
          )}

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-6 text-xs font-semibold">
            <Link
              href="/"
              className="text-stone-700 hover:text-emerald-700 transition-colors"
            >
              Catalog
            </Link>
            
            <Link
              href="/orders"
              className="flex items-center gap-1.5 text-stone-700 hover:text-emerald-700 transition-colors"
            >
              <Package className="w-4 h-4 text-stone-400" />
              <span>My Orders</span>
            </Link>

            <Link
              href="/admin"
              className="flex items-center gap-1.5 text-amber-700 hover:text-amber-800 transition-colors bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200"
            >
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Admin</span>
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3">
            {/* Wishlist */}
            <Link
              href="/#wishlist"
              className="relative p-2 text-stone-600 hover:text-rose-600 transition-colors"
              title="Saved Items"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Link Button */}
            <Link
              href="/cart"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Cart</span>
              <span className="bg-emerald-800 text-white px-2 py-0.5 rounded-full text-[11px] font-extrabold">
                {cartCount}
              </span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-600 hover:text-stone-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-stone-50 border-b border-stone-200 px-4 py-4 space-y-3">
          {setSearchQuery && (
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-stone-300 rounded-xl py-2 pl-9 pr-4 text-xs text-stone-800"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            </div>
          )}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-stone-700 hover:text-emerald-700 font-semibold text-xs"
          >
            Catalog Store
          </Link>
          <Link
            href="/orders"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-stone-700 hover:text-emerald-700 font-semibold text-xs"
          >
            My Orders
          </Link>
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-amber-700 font-semibold text-xs"
          >
            Admin Control Center
          </Link>
        </div>
      )}
    </header>
  );
}
