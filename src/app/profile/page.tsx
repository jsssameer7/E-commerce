'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NotificationToast from '@/components/NotificationToast';
import { useCart } from '@/context/CartContext';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  Heart,
  ShieldCheck,
  LogOut,
  Save,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';

export default function ProfilePage() {
  const { user, logout, updateUserProfile, orders, wishlist, openAuthModal } = useCart();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [street, setStreet] = useState(user?.address?.street || '42 MG Road, Indiranagar');
  const [city, setCity] = useState(user?.address?.city || 'Bengaluru');
  const [state, setState] = useState(user?.address?.state || 'Karnataka');
  const [zipCode, setZipCode] = useState(user?.address?.zipCode || '560038');

  const [isSaved, setIsSaved] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-stone-50 text-stone-800">
        <Navbar />
        <main className="flex-1 max-w-7xl mx-auto px-4 py-16 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-stone-900 mb-2">Sign In Required</h1>
          <p className="text-sm text-stone-500 max-w-sm mb-6">
            Please log in to view your profile, manage saved addresses, and track your active orders.
          </p>
          <button
            onClick={() => openAuthModal('login')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs flex items-center gap-2 shadow-sm transition-all"
          >
            <User className="w-4 h-4" />
            <span>Sign In to Account</span>
          </button>
        </main>
        <Footer />
        <NotificationToast />
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      email,
      phone,
      address: { street, city, state, zipCode },
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-800">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Profile Header Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-200 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-700 text-white font-black text-2xl sm:text-3xl flex items-center justify-center shadow-md">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-stone-900">{user.name}</h1>
                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                  user.role === 'admin' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">{user.email} • {user.phone}</p>
              <p className="text-[11px] text-stone-400 mt-1">ShopVibe Member since October 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {user.role === 'admin' && (
              <Link
                href="/admin"
                className="flex-1 sm:flex-initial bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Admin Dashboard</span>
              </Link>
            )}
            <button
              onClick={logout}
              className="flex-1 sm:flex-initial bg-stone-100 hover:bg-rose-50 border border-stone-200 text-rose-600 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Link
            href="/orders"
            className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm hover:border-emerald-500 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-stone-500">Total Orders</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-stone-900">{orders.length}</p>
            <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 mt-1">
              View Order History <ArrowRight className="w-3 h-3" />
            </span>
          </Link>

          <Link
            href="/#wishlist"
            className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm hover:border-rose-500 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-stone-500">Wishlist Saved Items</span>
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <Heart className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-black text-stone-900">{wishlist.length}</p>
            <span className="text-[11px] font-semibold text-rose-600 flex items-center gap-1 mt-1">
              View Wishlist <ArrowRight className="w-3 h-3" />
            </span>
          </Link>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-stone-500">Default Payment Method</span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
            </div>
            <p className="text-base font-bold text-stone-900">UPI / Pay on Delivery</p>
            <span className="text-[11px] text-stone-500 mt-1 block">Google Pay, PhonePe, Paytm</span>
          </div>
        </div>

        {/* Profile Edit Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 sm:p-8">
          <h2 className="text-lg font-black text-stone-900 mb-6 pb-3 border-b border-stone-100 flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-600" />
            <span>Account Details & Saved Shipping Address</span>
          </h2>

          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2 pl-9 pr-3 text-xs text-stone-800"
                  />
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2 pl-9 pr-3 text-xs text-stone-800"
                  />
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Mobile (+91)</label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2 pl-9 pr-3 text-xs text-stone-800"
                  />
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100">
              <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Default Delivery Address</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Flat / House / Street Address</label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2 px-3 text-xs text-stone-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2 px-3 text-xs text-stone-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">State</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2 px-3 text-xs text-stone-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Pincode</label>
                    <input
                      type="text"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2 px-3 text-xs text-stone-800"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-stone-100">
              {isSaved ? (
                <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Profile saved successfully!
                </span>
              ) : (
                <span className="text-xs text-stone-400">Updates will automatically populate at checkout.</span>
              )}

              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs flex items-center gap-2 shadow-sm transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
      <NotificationToast />
    </div>
  );
}
