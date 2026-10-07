'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, PromoCode } from '@/types/ecommerce';
import { INITIAL_PRODUCTS, VALID_PROMO_CODES } from '@/data/products';

interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface CartContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  appliedPromo: PromoCode | null;
  toasts: ToastMessage[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  placeOrder: (customerInfo: {
    customerName: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
    paymentMethod: string;
  }) => Order | null;
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetCatalog: () => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  showToast: (message: string, type?: ToastMessage['type']) => void;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  taxAmount: number;
  totalAmount: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from LocalStorage or seed defaults
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem('shopvibe_products_v3');
      if (savedProducts) {
        const parsed = JSON.parse(savedProducts);
        // If parsed products are fewer than INITIAL_PRODUCTS or have old price format, reset
        if (Array.isArray(parsed) && parsed.length >= INITIAL_PRODUCTS.length && parsed[0]?.price > 1000) {
          setProducts(parsed);
        } else {
          setProducts(INITIAL_PRODUCTS);
          localStorage.setItem('shopvibe_products_v3', JSON.stringify(INITIAL_PRODUCTS));
        }
      } else {
        setProducts(INITIAL_PRODUCTS);
        localStorage.setItem('shopvibe_products_v3', JSON.stringify(INITIAL_PRODUCTS));
      }

      const savedCart = localStorage.getItem('shopvibe_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('shopvibe_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedOrders = localStorage.getItem('shopvibe_orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));
    } catch (e) {
      console.error('Error loading state from localStorage:', e);
      setProducts(INITIAL_PRODUCTS);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync state changes to LocalStorage
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('shopvibe_cart', JSON.stringify(cart));
  }, [cart, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('shopvibe_wishlist', JSON.stringify(wishlist));
  }, [wishlist, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('shopvibe_products_v3', JSON.stringify(products));
  }, [products, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('shopvibe_orders', JSON.stringify(orders));
  }, [orders, isLoaded]);

  const showToast = (message: string, type: ToastMessage['type'] = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        const newQty = existing.quantity + quantity;
        showToast(`Updated "${product.name}" quantity to ${newQty}`, 'info');
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: newQty } : item
        );
      } else {
        showToast(`Added "${product.name}" to cart!`, 'success');
        return [...prevCart, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const item = prev.find((i) => i.product.id === productId);
      if (item) {
        showToast(`Removed "${item.product.name}" from cart`, 'info');
      }
      return prev.filter((i) => i.product.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const toggleWishlist = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        if (product) showToast(`Removed "${product.name}" from wishlist`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        if (product) showToast(`Added "${product.name}" to wishlist!`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const discountAmount = appliedPromo
    ? (subtotal * appliedPromo.discountPercent) / 100
    : 0;

  const isFreeShipPromo = appliedPromo?.code === 'FREESHIP';
  const shippingFee = subtotal > 0 ? (subtotal > 1999 || isFreeShipPromo ? 0 : 149) : 0;
  const taxAmount = (subtotal - discountAmount) * 0.18; // 18% GST
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee + taxAmount);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const applyPromo = (codeString: string) => {
    const codeClean = codeString.trim().toUpperCase();
    const found = VALID_PROMO_CODES.find((p) => p.code === codeClean);
    if (!found) {
      return { success: false, message: 'Invalid promo code' };
    }

    if (found.minSpend && subtotal < found.minSpend) {
      return {
        success: false,
        message: `Promo code ${found.code} requires a minimum order of ₹${found.minSpend}`,
      };
    }

    setAppliedPromo(found);
    showToast(`Promo code "${found.code}" applied!`, 'success');
    return { success: true, message: `Applied ${found.description}` };
  };

  const removePromo = () => {
    setAppliedPromo(null);
    showToast('Promo code removed', 'info');
  };

  const placeOrder = (customerInfo: {
    customerName: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
    paymentMethod: string;
  }): Order | null => {
    if (cart.length === 0) return null;

    const newOrder: Order = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      customerName: customerInfo.customerName,
      email: customerInfo.email,
      address: customerInfo.address,
      city: customerInfo.city,
      zipCode: customerInfo.zipCode,
      items: cart.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        image: i.product.image,
      })),
      subtotal,
      discount: discountAmount,
      shipping: shippingFee,
      tax: taxAmount,
      total: totalAmount,
      status: 'Processing',
      paymentMethod: customerInfo.paymentMethod,
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Update stock levels
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        const cartItem = cart.find((i) => i.product.id === p.id);
        if (cartItem) {
          return { ...p, stock: Math.max(0, p.stock - cartItem.quantity) };
        }
        return p;
      })
    );

    clearCart();
    showToast(`Order #${newOrder.id} successfully placed!`, 'success');
    return newOrder;
  };

  const addProduct = (newProductData: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => {
    const newProd: Product = {
      ...newProductData,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
    };
    setProducts((prev) => [newProd, ...prev]);
    showToast(`Product "${newProd.name}" added to catalog`, 'success');
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
    showToast('Product updated successfully', 'success');
  };

  const deleteProduct = (id: string) => {
    const prod = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    if (prod) showToast(`Deleted product "${prod.name}"`, 'info');
  };

  const resetCatalog = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.setItem('shopvibe_products_v3', JSON.stringify(INITIAL_PRODUCTS));
    showToast('Reset catalog to 16 default INR products!', 'info');
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showToast(`Order ${orderId} updated to ${status}`, 'info');
  };

  return (
    <CartContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        appliedPromo,
        toasts,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        applyPromo,
        removePromo,
        placeOrder,
        addProduct,
        updateProduct,
        deleteProduct,
        resetCatalog,
        updateOrderStatus,
        showToast,
        subtotal,
        discountAmount,
        shippingFee,
        taxAmount,
        totalAmount,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
