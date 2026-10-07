'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import NotificationToast from '@/components/NotificationToast';
import { useCart } from '@/context/CartContext';
import { Review } from '@/types/ecommerce';
import {
  Star,
  Heart,
  ShoppingBag,
  ArrowLeft,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  Send,
  UserCheck
} from 'lucide-react';

interface ProductDetailClientProps {
  productId: string;
}

export default function ProductDetailClient({ productId }: ProductDetailClientProps) {
  const { products, addToCart, toggleWishlist, isInWishlist, showToast } = useCart();

  const product = products.find((p) => p.id === productId);
  const isFavorite = product ? isInWishlist(product.id) : false;

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');

  // Customer Reviews state
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 'rev-1',
      productId: productId,
      author: 'Aarav Sharma',
      rating: 5,
      comment: 'Super crisp sound and lightweight design. Very comfortable for long work hours.',
      date: '2 days ago'
    },
    {
      id: 'rev-2',
      productId: productId,
      author: 'Priya Patel',
      rating: 4,
      comment: 'Fast delivery to Bengaluru! Product packaging was top notch.',
      date: '1 week ago'
    }
  ]);

  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  if (!product) {
    return (
      <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col">
        <Navbar />
        <div className="max-w-md mx-auto py-24 text-center px-4 flex-1">
          <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
          <p className="text-xs text-stone-500 mb-6">The requested product could not be found.</p>
          <Link href="/" className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl font-bold text-xs">
            Return to Store
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) {
      showToast('Please fill out all review fields', 'error');
      return;
    }
    const created: Review = {
      id: `rev-${Date.now()}`,
      productId: product.id,
      author: newAuthor.trim(),
      rating: newRating,
      comment: newComment.trim(),
      date: 'Just now'
    };
    setReviews([created, ...reviews]);
    setNewAuthor('');
    setNewComment('');
    setNewRating(5);
    showToast('Thank you! Your review has been published.', 'success');
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Breadcrumb Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-500 hover:text-emerald-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Store Catalog
        </Link>

        {/* Top Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          {/* Main Image Container */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 relative flex items-center justify-center overflow-hidden shadow-xs">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-h-[440px] object-cover rounded-xl"
            />
            {product.badge && (
              <span className="absolute top-6 left-6 bg-emerald-700 text-white text-[11px] font-bold px-3 py-1 rounded-md uppercase">
                {product.badge}
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/90 border border-stone-200 text-stone-500 hover:text-rose-500 transition-colors shadow-xs"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>

          {/* Product Info & Purchase Sidebar */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                {product.category}
              </span>

              <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1 mb-2">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="ml-1 text-xs font-bold text-stone-800">{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-stone-300">•</span>
                <span className="text-xs text-stone-500 font-medium">
                  {product.reviewsCount + reviews.length - 2} Customer Reviews
                </span>
              </div>

              {/* Price Card */}
              <div className="flex items-baseline gap-3 mb-5 bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
                <span className="text-2xl sm:text-3xl font-extrabold text-stone-900">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    MRP ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="ml-auto text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                    Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Stock Status */}
              <div className="mb-6">
                {product.stock > 0 ? (
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    <span>In Stock ({product.stock} items available)</span>
                  </div>
                ) : (
                  <div className="text-xs font-bold text-rose-600">Currently Out of Stock</div>
                )}
              </div>
            </div>

            {/* Quantity & CTA Buttons */}
            <div className="space-y-3.5 pt-4 border-t border-stone-200">
              <div className="flex items-center gap-4">
                <label className="text-xs font-bold text-stone-600 uppercase">Quantity:</label>
                <div className="flex items-center bg-white border border-stone-300 rounded-xl px-3 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-stone-600 hover:text-stone-900 font-bold px-2 text-base"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-stone-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="text-stone-600 hover:text-stone-900 font-bold px-2 text-base"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => addToCart(product, quantity)}
                  disabled={product.stock === 0}
                  className="w-full bg-stone-900 hover:bg-stone-800 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </button>

                <Link
                  href="/cart"
                  onClick={() => addToCart(product, quantity)}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all text-center shadow-xs"
                >
                  Buy Now (₹{(product.price * quantity).toLocaleString('en-IN')})
                </Link>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 pt-3 text-[11px] text-stone-500 text-center">
                <div className="p-2 bg-white rounded-xl border border-stone-200">
                  <Truck className="w-4 h-4 text-emerald-700 mx-auto mb-1" />
                  <span>Free Shipping</span>
                </div>
                <div className="p-2 bg-white rounded-xl border border-stone-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 mx-auto mb-1" />
                  <span>1-Year Warranty</span>
                </div>
                <div className="p-2 bg-white rounded-xl border border-stone-200">
                  <RotateCcw className="w-4 h-4 text-emerald-700 mx-auto mb-1" />
                  <span>30-Day Return</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Info Section */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 mb-12 shadow-xs">
          <div className="flex border-b border-stone-200 gap-6 mb-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 text-xs font-bold transition-all relative ${
                activeTab === 'overview'
                  ? 'text-emerald-700 border-b-2 border-emerald-700'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Overview & Features
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 text-xs font-bold transition-all relative ${
                activeTab === 'specs'
                  ? 'text-emerald-700 border-b-2 border-emerald-700'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 text-xs font-bold transition-all relative ${
                activeTab === 'reviews'
                  ? 'text-emerald-700 border-b-2 border-emerald-700'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Customer Reviews ({reviews.length})
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-stone-900 mb-2">Product Key Highlights</h3>
              {product.features ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700">
                      <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-stone-500">Quality product designed for everyday performance and comfort.</p>
              )}
            </div>
          )}

          {/* Specs Tab */}
          {activeTab === 'specs' && (
            <div className="max-w-2xl">
              <h3 className="text-sm font-bold text-stone-900 mb-3">Technical Specifications</h3>
              {product.specs ? (
                <div className="divide-y divide-stone-200 border border-stone-200 rounded-xl overflow-hidden">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between p-3 text-xs bg-white">
                      <span className="font-semibold text-stone-500">{key}</span>
                      <span className="font-bold text-stone-900">{value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-stone-500">Standard manufacturer specifications apply.</p>
              )}
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Existing Reviews */}
              <div className="lg:col-span-2 space-y-3">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-stone-50 border border-stone-200 rounded-xl">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                          {rev.author.charAt(0)}
                        </div>
                        <span className="text-xs font-bold text-stone-800">{rev.author}</span>
                      </div>
                      <span className="text-[11px] text-stone-400">{rev.date}</span>
                    </div>
                    <div className="flex items-center text-amber-400 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>

              {/* Review Form */}
              <div className="bg-stone-50 border border-stone-200 p-4 rounded-xl h-fit">
                <h4 className="text-xs font-bold text-stone-900 mb-3 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-700" /> Write a Review
                </h4>
                <form onSubmit={handleAddReview} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-stone-600 mb-1 font-semibold">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-lg p-2 text-stone-800 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1 font-semibold">Rating</label>
                    <select
                      value={newRating}
                      onChange={(e) => setNewRating(Number(e.target.value))}
                      className="w-full bg-white border border-stone-300 rounded-lg p-2 text-stone-800 focus:outline-none focus:border-emerald-600"
                    >
                      <option value={5}>5 Stars - Excellent</option>
                      <option value={4}>4 Stars - Good</option>
                      <option value={3}>3 Stars - Average</option>
                      <option value={2}>2 Stars - Fair</option>
                      <option value={1}>1 Star - Poor</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-stone-600 mb-1 font-semibold">Review Comment</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Share your experience..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-lg p-2 text-stone-800 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" /> Submit Review
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-stone-900 mb-4">More in {product.category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
      <NotificationToast />
    </div>
  );
}
