// src/actions/actions.ts
import { supabase } from '../utils/supabaseClient';
import { Product } from '../types';

export const addProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> => {
  const { error } = await supabase
    .from('products')
    .insert([
      {
        name: product.name,
        sku: product.sku,
        price: product.price,
        color: product.color,
        category: product.category,
        totalStock: product.totalStock,
        totalSelled: product.totalSelled,
        description: product.description,
        userId: product.userId,
      },
    ]);

  if (error) {
    console.error('Erro ao adicionar produto:', error);
    throw new Error(error.message);
  }

  console.log('Produto adicionado com sucesso');
};
