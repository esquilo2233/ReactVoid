import React from 'react';
import ProductForm from '../../../components/ProductForm';
import withAuth from '../../../components/withAuth';
import { supabase } from '../../../utils/supabaseClient';

const AddProductPage = () => {
  const handleAddProduct = async (formData: {
    name: string;
    sku: string;
    price: number;
    color: string;
    category: string;
    totalStock: number;
    description: string;
    totalSelled?: number;
  }) => {
    const { name, sku, price, color, category, totalStock, description, totalSelled = 0 } = formData;

    const { data, error } = await supabase
      .from('Product')
      .insert([{ name, sku, price, color, category, totalStock, description, totalSelled }]);

    if (error) {
      console.error('Error adding product:', error);
      return;
    }

    console.log('Product added successfully:', data);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <ProductForm onSubmit={handleAddProduct} />
    </div>
  );
};

export default withAuth(AddProductPage);
