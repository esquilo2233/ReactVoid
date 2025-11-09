// src/actions/actions.ts
import { prisma } from '../lib/prisma';
import { Product } from '../types';

export const addProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const newProduct = await prisma.product.create({
      data: {
        name: product.name,
        sku: product.sku,
        price: product.price,
        color: product.color,
        category: product.category,
        totalStock: product.totalStock,
        totalSelled: product.totalSelled || 0,
        description: product.description,
        userId: product.userId,
        is_active: product.is_active ?? true,
      },
    });

    return newProduct;
  } catch (error) {
    console.error('Error adding product:', error);
    throw new Error((error as Error).message);
  }
};
