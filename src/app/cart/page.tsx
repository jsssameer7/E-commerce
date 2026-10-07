'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NotificationToast from '@/components/NotificationToast';
import { useCart } from '@/context/CartContext';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Tag,
  ShieldCheck,
  Truck,
  CheckCircle2,
  X
} from 'lucide-react';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    appliedPromo,
    applyPromo,
    removePromo,
    subtotal,
    discountAmount,
    shippingFee,
    taxAmount,
    totalAmount
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ success: boolean; text: string } | null>(null);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    setPromoMessage({ success: res.success, text: res.message });
    if (res.success) setPromoInput('');
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-200">
          <div>
            <h1 className="text-2xl font-extrabold text-stone-900">Your Shopping Cart</h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Review your items before proceeding to checkout
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Items Table */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden p-6 shadow-xs">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-200">
                  <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">
                    Item Details ({cart.length})
                  </span>
                  <button
                    onClick={clearCart}
                    className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Empty Cart
                  </button>
                </div>

                <div className="divide-y divide-stone-200">
                  {cart.map(({ product, quantity }) => (
                    <div key={product.id} className="py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                      {/* Product thumbnail & Info */}
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-xl bg-stone-100 border border-stone-200 flex-shrink-0"
                        />
                        <div>
                          <span className="text-[10px] font-bold text-emerald-700 uppercase">
                            {product.category}
                          </span>
                          <Link href={`/product/${product.id}`} className="block">
                            <h3 className="text-sm font-bold text-stone-900 hover:text-emerald-700 line-clamp-1">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-xs text-stone-500 font-semibold mt-0.5">
                            ₹{product.price.toLocaleString('en-IN')} each
                          </p>
                        </div>
                      </div>

                      {/* Quantity & Subtotal Actions */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                        {/* Quantity Counter */}
                        <div className="flex items-center bg-stone-100 border border-stone-300 rounded-xl px-2.5 py-1">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="text-stone-600 hover:text-stone-900 font-bold px-2 text-sm"
                          >
                            -
                          </button>
                          <span className="px-3 text-xs font-bold text-stone-900">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="text-stone-600 hover:text-stone-900 font-bold px-2 text-sm"
                          >
                            +
                          </button>
                        </div>

                        {/* Item Total Price */}
                        <span className="text-sm font-extrabold text-stone-900 w-24 text-right">
                          ₹{(product.price * quantity).toLocaleString('en-IN')}
                        </span>

                        {/* Delete Button */}
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors"
                          title="Remove item"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Promo Code Card */}
              <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs">
                <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-emerald-700" /> Have a Promo Code?
                </h3>

                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span className="font-bold text-emerald-900">{appliedPromo.code}</span>
                      <span className="text-stone-600">({appliedPromo.description})</span>
                    </div>
                    <button
                      onClick={removePromo}
                      className="text-stone-500 hover:text-rose-600 text-xs font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Try SAVE10, WELCOME20, or FREESHIP"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-emerald-600 flex-1 uppercase font-bold"
                    />
                    <button
                      type="submit"
                      className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all"
                    >
                      Apply Code
                    </button>
                  </form>
                )}

                {promoMessage && !appliedPromo && (
                  <p className={`text-xs mt-2 font-medium ${promoMessage.success ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {promoMessage.text}
                  </p>
                )}
              </div>
            </div>

            {/* Right Order Summary Sidebar */}
            <div className="space-y-4">
              <div className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4 shadow-xs">
                <h3 className="text-base font-bold text-stone-900 pb-3 border-b border-stone-200">
                  Order Summary
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Items Subtotal</span>
                    <span className="font-bold text-stone-900">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Promo Discount</span>
                      <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-stone-600">
                    <span>Estimated Shipping</span>
                    {shippingFee === 0 ? (
                      <span className="font-bold text-emerald-700">FREE</span>
                    ) : (
                      <span className="font-bold text-stone-900">₹{shippingFee.toLocaleString('en-IN')}</span>
                    )}
                  </div>

                  <div className="flex justify-between text-stone-600">
                    <span>GST (18%)</span>
                    <span className="font-bold text-stone-900">₹{taxAmount.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="pt-3 border-t border-stone-200 flex justify-between text-base font-black text-stone-900">
                    <span>Grand Total</span>
                    <span className="text-emerald-700 text-xl">₹{totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-all text-center"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="pt-3 border-t border-stone-200 space-y-2 text-[11px] text-stone-500">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>256-Bit Encrypted Safe Checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Free Shipping on orders over ₹1,999</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-stone-200 rounded-2xl p-8 max-w-md mx-auto">
            <div className="w-14 h-14 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-3 text-stone-400">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <h2 className="text-lg font-bold text-stone-900 mb-1">Your Cart is Empty</h2>
            <p className="text-xs text-stone-500 mb-5">
              Looks like you haven't added any products yet. Browse our simple catalog for headphones, displays, and keyboards!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all"
            >
              Explore Store <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </main>

      <Footer />
      <NotificationToast />
    </div>
  );
}
