export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  rating: number;
  reviewsCount: number;
  stock: number;
  image: string;
  badge?: 'Featured' | 'Best Seller' | 'New' | 'Sale';
  specs?: Record<string, string>;
  features?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentMethod: string;
}

export interface PromoCode {
  code: string;
  discountPercent: number;
  minSpend?: number;
  description: string;
}
