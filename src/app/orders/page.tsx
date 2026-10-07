'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NotificationToast from '@/components/NotificationToast';
import { useCart } from '@/context/CartContext';
import { Package, Clock, Truck, CheckCircle2, ArrowLeft, ShoppingBag } from 'lucide-react';

export default function OrdersPage() {
  const { orders } = useCart();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-50 border-emerald-200 text-emerald-800';
      case 'Shipped':
        return 'bg-sky-50 border-sky-200 text-sky-800';
      case 'Processing':
        return 'bg-amber-50 border-amber-200 text-amber-800';
      default:
        return 'bg-stone-100 border-stone-200 text-stone-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />;
      case 'Shipped':
        return <Truck className="w-3.5 h-3.5 text-sky-600" />;
      default:
        return <Clock className="w-3.5 h-3.5 text-amber-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-200">
          <div>
            <h1 className="text-2xl font-extrabold text-stone-900 flex items-center gap-2.5">
              <Package className="w-7 h-7 text-emerald-700" /> My Orders & Tracking
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Track delivery updates for your placed orders
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Store Catalog
          </Link>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4 shadow-xs"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-stone-900 font-mono">{order.id}</span>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-400">Placed on {order.date}</p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[11px] text-stone-500 block">Total Amount</span>
                    <span className="text-lg font-extrabold text-emerald-700">
                      ₹{order.total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 bg-stone-50 p-2.5 rounded-xl border border-stone-200"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded-lg bg-white border border-stone-200"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-stone-900 line-clamp-1">{item.name}</p>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          ₹{item.price.toLocaleString('en-IN')} × {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping & Payment Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-stone-200 text-xs">
                  <div>
                    <span className="font-bold text-stone-500 uppercase tracking-wider text-[10px]">
                      Shipping Address
                    </span>
                    <p className="text-stone-800 font-semibold mt-0.5">
                      {order.customerName} • {order.address}, {order.city} {order.zipCode}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="font-bold text-stone-500 uppercase tracking-wider text-[10px]">
                      Payment Option
                    </span>
                    <p className="text-stone-800 font-semibold mt-0.5">{order.paymentMethod}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-stone-200 rounded-2xl p-8 max-w-md mx-auto">
            <div className="w-14 h-14 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-3 text-stone-400">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <h2 className="text-lg font-bold text-stone-900 mb-1">No Past Orders Found</h2>
            <p className="text-xs text-stone-500 mb-5">
              When you place an order, you can track delivery progress and shipment details here.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </main>

      <Footer />
      <NotificationToast />
    </div>
  );
}
