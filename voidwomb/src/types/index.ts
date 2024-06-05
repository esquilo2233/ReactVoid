// src/types/index.ts
export enum Category {
  CD = 'CD',
  Vinyl = 'Vinyl',
  T_shirt = 'T_shirt',
  Longsleeves = 'Longsleeves'
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  color: string;
  category?: Category;
  totalStock: number;
  totalSelled: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  images?: ProductImage[];
  sizes?: ProductSize[];
}

export interface ProductImage {
  id: number;
  url: string;
  productId: number;
}

export interface ProductSize {
  id: number;
  size: string;
  productId: number;
}
