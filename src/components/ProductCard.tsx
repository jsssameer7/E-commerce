'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types/ecommerce';
import { useCart } from '@/context/CartContext';
import { Star, Heart, ShoppingBag, Eye } from 'lucide-react';
import QuickViewModal from './QuickViewModal';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const isFavorite = isInWishlist(product.id);

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <>
      <div className="group bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-stone-300 transition-all duration-200 flex flex-col justify-between hover:shadow-lg">
        <div>
          {/* Image & Badges */}
          <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            
            {/* Badges */}
            <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
              {product.badge && (
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wide ${
                    product.badge === 'Sale'
                      ? 'bg-rose-600 text-white'
                      : product.badge === 'Best Seller'
                      ? 'bg-amber-500 text-stone-900'
                      : product.badge === 'New'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-800 text-white'
                  }`}
                >
                  {product.badge}
                </span>
              )}
              {discountPercentage > 0 && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-500 text-white">
                  {discountPercentage}% OFF
                </span>
              )}
            </div>

            {/* Wishlist Heart Button */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 hover:bg-white border border-stone-200 text-stone-500 hover:text-rose-500 transition-all z-10"
              title="Save to Wishlist"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isFavorite ? 'fill-rose-500 text-rose-500' : ''
                }`}
              />
            </button>

            {/* Hover Quick View Overlay */}
            <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={() => setQuickViewOpen(true)}
                className="bg-white/95 hover:bg-white text-stone-900 border border-stone-200 text-xs font-bold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md transform translate-y-1 group-hover:translate-y-0 transition-all"
              >
                <Eye className="w-3.5 h-3.5" />
                Quick View
              </button>
            </div>
          </div>

          {/* Product Content */}
          <div className="p-4">
            <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
              <span className="font-semibold text-emerald-700 tracking-wide uppercase text-[10px]">
                {product.category}
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold text-stone-800">{product.rating.toFixed(1)}</span>
                <span className="text-stone-400">({product.reviewsCount})</span>
              </div>
            </div>

            <Link href={`/product/${product.id}`} className="block group-hover:text-emerald-700 transition-colors">
              <h3 className="font-bold text-stone-900 text-sm line-clamp-1 mb-1">
                {product.name}
              </h3>
            </Link>

            <p className="text-xs text-stone-500 line-clamp-2 mb-3 leading-normal">
              {product.description}
            </p>
          </div>
        </div>

        {/* Price & Actions */}
        <div className="px-4 pb-4 pt-0">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-lg font-extrabold text-stone-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through">
                MRP ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Stock Notice */}
          <div className="mb-2.5 text-[11px] font-medium">
            {product.stock > 0 ? (
              product.stock <= 10 ? (
                <span className="text-amber-700 font-semibold">Only {product.stock} items remaining</span>
              ) : (
                <span className="text-emerald-700 font-semibold">In Stock ({product.stock})</span>
              )
            ) : (
              <span className="text-rose-600 font-bold">Out of Stock</span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={product.stock === 0}
            className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs ${
              product.stock > 0
                ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>

      {quickViewOpen && (
        <QuickViewModal
          product={product}
          onClose={() => setQuickViewOpen(false)}
        />
      )}
    </>
  );
}
