'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, RefreshCw, Headphones, ShoppingBag } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-100 border-t border-stone-200 text-stone-600 mt-auto">
      {/* Value Badges */}
      <div className="border-b border-stone-200 py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-800">Free Express Delivery</h4>
              <p className="text-[11px] text-stone-500">On all orders over ₹1,999</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-800">100% Safe Payments</h4>
              <p className="text-[11px] text-stone-500">UPI, Cards & Net Banking</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-800">Easy 30-Day Returns</h4>
              <p className="text-[11px] text-stone-500">Hassle-free guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-800">Customer Support</h4>
              <p className="text-[11px] text-stone-500">Friendly help whenever you need</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-lg font-black text-stone-900">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span>ShopVibe</span>
          </div>
          <p className="text-xs text-stone-500 leading-relaxed">
            Your simple everyday online store for audio gear, displays, mechanical keyboards, and desk accessories.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3">Quick Navigation</h3>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/" className="hover:text-emerald-700 transition-colors">Catalog Store</Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-emerald-700 transition-colors">Shopping Cart</Link>
            </li>
            <li>
              <Link href="/orders" className="hover:text-emerald-700 transition-colors">My Orders</Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-amber-700 transition-colors">Admin Dashboard</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3">Popular Categories</h3>
          <ul className="space-y-2 text-xs text-stone-600">
            <li><span>Headphones & Audio</span></li>
            <li><span>Monitors & Displays</span></li>
            <li><span>Smart Wearables</span></li>
            <li><span>Keyboards & Mice</span></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3">Stay Updated</h3>
          <p className="text-[11px] text-stone-500 mb-2">Subscribe for discount promo codes.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-xs text-stone-800 focus:outline-none focus:border-emerald-600 flex-1"
            />
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-stone-200 py-4 text-center text-[11px] text-stone-500">
        © 2026 ShopVibe E-Commerce Store. Simple, clean & friendly shopping.
      </div>
    </footer>
  );
}
