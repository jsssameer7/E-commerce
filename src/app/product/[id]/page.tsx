import React from 'react';
import ProductDetailClient from './ProductDetailClient';
import { INITIAL_PRODUCTS } from '@/data/products';

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return INITIAL_PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  return <ProductDetailClient productId={resolvedParams.id} />;
}
