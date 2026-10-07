'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NotificationToast from '@/components/NotificationToast';
import { useCart } from '@/context/CartContext';
import {
  CreditCard,
  Lock,
  Truck,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Loader2
} from 'lucide-react';

export default function CheckoutPage() {
  const { cart, subtotal, discountAmount, shippingFee, taxAmount, totalAmount, placeOrder, showToast } = useCart();

  const [customerName, setCustomerName] = useState('Sameer Sharma');
  const [email, setEmail] = useState('sameer.sharma@example.in');
  const [address, setAddress] = useState('MG Road, Indiranagar');
  const [city, setCity] = useState('Bengaluru');
  const [zipCode, setZipCode] = useState('560038');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');

  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8892');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('342');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrderId, setCompletedOrderId] = useState<string | null>(null);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !email || !address || !city || !zipCode) {
      showToast('Please complete all required shipping fields', 'error');
      return;
    }

    setIsSubmitting(true);

    // Simulate Payment Gateway API Call delay (1.5 seconds)
    setTimeout(() => {
      const order = placeOrder({
        customerName,
        email,
        address,
        city,
        zipCode,
        paymentMethod:
          paymentMethod === 'upi'
            ? 'UPI / GPay / PhonePe'
            : paymentMethod === 'card'
            ? 'Credit / Debit Card'
            : paymentMethod === 'netbanking'
            ? 'Net Banking'
            : 'Cash on Delivery',
      });

      setIsSubmitting(false);

      if (order) {
        setCompletedOrderId(order.id);
      }
    }, 1500);
  };

  if (cart.length === 0 && !completedOrderId) {
    return (
      <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col">
        <Navbar />
        <div className="max-w-md mx-auto py-24 text-center px-4 flex-1">
          <h1 className="text-xl font-bold mb-2">No Items in Cart</h1>
          <p className="text-xs text-stone-500 mb-6">Add items to your cart before proceeding to checkout.</p>
          <Link href="/" className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl font-bold text-xs">
            Return to Store
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Breadcrumb */}
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-emerald-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </Link>

        {completedOrderId ? (
          /* Order Confirmation Card */
          <div className="max-w-md mx-auto bg-white border border-stone-200 rounded-2xl p-8 text-center space-y-5 shadow-sm my-8">
            <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">
                Payment Authorized & Order Confirmed
              </span>
              <h1 className="text-2xl font-bold text-stone-900 mt-1">Thank You for Your Order!</h1>
              <p className="text-xs text-stone-500 mt-1">
                Order ID: <span className="font-mono font-bold text-emerald-700">{completedOrderId}</span>
              </p>
            </div>

            <p className="text-xs text-stone-600 bg-stone-50 p-4 rounded-xl border border-stone-200 leading-relaxed">
              We've sent an order receipt to <span className="font-bold text-stone-900">{email}</span>. Your order is now being processed for delivery.
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <Link
                href="/orders"
                className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white py-2.5 rounded-xl font-bold text-xs transition-all text-center shadow-xs"
              >
                Track Order Status
              </Link>
              <Link
                href="/"
                className="flex-1 bg-white hover:bg-stone-100 text-stone-700 py-2.5 rounded-xl font-bold text-xs transition-all text-center border border-stone-300"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          /* Checkout Grid */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Checkout Form */}
            <form onSubmit={handleSubmitOrder} className="lg:col-span-2 space-y-6">
              {/* Shipping Info */}
              <div className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4 shadow-xs">
                <h2 className="text-sm font-bold text-stone-900 flex items-center gap-2 pb-3 border-b border-stone-200">
                  <Truck className="w-4 h-4 text-emerald-700" /> Shipping & Delivery Address
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-stone-600 mb-1 font-semibold">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-emerald-600 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 mb-1 font-semibold">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-emerald-600 font-medium"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block text-stone-600 mb-1 font-semibold">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-emerald-600 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-stone-600 mb-1 font-semibold">City *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-emerald-600 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 mb-1 font-semibold">Pincode *</label>
                    <input
                      type="text"
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-stone-800 focus:outline-none focus:border-emerald-600 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4 shadow-xs">
                <h2 className="text-sm font-bold text-stone-900 flex items-center gap-2 pb-3 border-b border-stone-200">
                  <CreditCard className="w-4 h-4 text-emerald-700" /> Payment Option
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all text-center flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === 'upi'
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-900'
                        : 'bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>UPI / GPay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all text-center flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === 'card'
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-900'
                        : 'bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Credit / Debit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all text-center flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === 'netbanking'
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-900'
                        : 'bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <Lock className="w-4 h-4 text-emerald-600" />
                    <span>Net Banking</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all text-center flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === 'cod'
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-900'
                        : 'bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <Truck className="w-4 h-4 text-amber-600" />
                    <span>Pay on Delivery</span>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3 pt-4 text-xs">
                    <div>
                      <label className="block text-stone-600 mb-1 font-semibold">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-lg p-2 text-stone-800 font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-stone-600 mb-1 font-semibold">Expiry</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-white border border-stone-300 rounded-lg p-2 text-stone-800 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-600 mb-1 font-semibold">CVV</label>
                        <input
                          type="text"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full bg-white border border-stone-300 rounded-lg p-2 text-stone-800 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm py-3.5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Processing Payment...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" /> Place Order & Pay ₹{totalAmount.toLocaleString('en-IN')}
                  </>
                )}
              </button>
            </form>

            {/* Right Summary Sidebar */}
            <div className="space-y-4">
              <div className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4 shadow-xs">
                <h3 className="text-sm font-bold text-stone-900 pb-3 border-b border-stone-200">
                  Cart Items ({cart.length})
                </h3>

                <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                  {cart.map(({ product, quantity }) => (
                    <div key={product.id} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-9 h-9 object-cover rounded-lg bg-stone-100 border border-stone-200"
                        />
                        <div>
                          <p className="font-bold text-stone-800 line-clamp-1">{product.name}</p>
                          <p className="text-[11px] text-stone-400">Qty: {quantity}</p>
                        </div>
                      </div>
                      <span className="font-bold text-stone-900">₹{(product.price * quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-stone-200 pt-3 space-y-2 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Discount</span>
                      <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-stone-600">
                    <span>Shipping</span>
                    <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee.toLocaleString('en-IN')}`}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>GST (18%)</span>
                    <span>₹{taxAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="pt-3 border-t border-stone-200 flex justify-between text-base font-bold text-stone-900">
                    <span>Total</span>
                    <span className="text-emerald-700 font-extrabold text-lg">₹{totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-200 text-[11px] text-stone-500">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>256-Bit Encrypted Safe Transaction</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <NotificationToast />
    </div>
  );
}
