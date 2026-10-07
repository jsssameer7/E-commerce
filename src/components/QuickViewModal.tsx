'use client';

import React, { useState } from 'react';
import { Product } from '@/types/ecommerce';
import { useCart } from '@/context/CartContext';
import { X, Star, Heart, ShoppingBag, Check, Shield } from 'lucide-react';
import Link from 'next/link';

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);
  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-white border border-stone-200 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-stone-500 hover:text-stone-900 rounded-full bg-stone-100 hover:bg-stone-200 border border-stone-200"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square bg-stone-100 flex items-center justify-center p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-xl"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase">
                {product.badge}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col justify-between max-h-[80vh] overflow-y-auto">
            <div>
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                {product.category}
              </span>
              
              <h2 className="text-lg font-bold text-stone-900 mt-1 mb-2">{product.name}</h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="ml-1 text-xs font-bold text-stone-800">{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-xs text-stone-400">({product.reviewsCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-2xl font-black text-stone-900">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-stone-400 line-through">
                    MRP ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Key Features */}
              {product.features && (
                <div className="mb-4 space-y-1.5">
                  <h4 className="text-[11px] font-bold text-stone-700 uppercase">Key Features</h4>
                  {product.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-stone-600">
                      <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="border-t border-stone-200 pt-4 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Controls */}
                <div className="flex items-center bg-stone-100 border border-stone-300 rounded-xl px-2.5 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-stone-600 hover:text-stone-900 text-base font-bold px-1"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-stone-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="text-stone-600 hover:text-stone-900 text-base font-bold px-1"
                  >
                    +
                  </button>
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-2.5 rounded-xl border transition-all ${
                    isFavorite
                      ? 'bg-rose-50 border-rose-200 text-rose-600'
                      : 'bg-stone-100 border-stone-200 text-stone-500 hover:text-rose-600'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
                </button>

                {/* Full Details Page Link */}
                <Link
                  href={`/product/${product.id}`}
                  onClick={onClose}
                  className="text-xs text-emerald-700 hover:underline font-bold ml-auto"
                >
                  Full Details →
                </Link>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
              >
                <ShoppingBag className="w-4 h-4" />
                Add {quantity} to Cart (₹{(product.price * quantity).toLocaleString('en-IN')})
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                <span>30-Day Money Back Guarantee Included</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
