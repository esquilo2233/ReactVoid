// src/actions/actions.ts
import { supabase } from '../utils/supabaseClient';
import { Product } from '../types';

export const addProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
  const { data, error } = await supabase
    .from('Product')
    .insert([product]);

  if (error) {
    console.log(error)
    console.log(error.message)
    throw new Error(error.message);
  }

  return data;
};
