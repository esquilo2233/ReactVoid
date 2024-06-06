import React from 'react';
import ProductForm from '../../../components/ProductForm';
import withAuth from '../../../components/withAuth';
import { supabase } from '../../../utils/supabaseClient';
import { useSession } from 'next-auth/react';

const AddProductPage = () => {
  const { data: session } = useSession();

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
    try {
      const { name, sku, price, color, category, totalStock, description, totalSelled = 0 } = formData;
      const userId = session?.user.id;

      if (!userId) {
        throw new Error("User ID is not available");
      }

      const { data, error } = await supabase
        .from('Product')
        .insert([{ name, sku, price, color, category, totalStock, description, totalSelled, user_id: userId }]);

      if (error) {
        console.error('Error adding product:', error);
        console.error('Error details:', error.details);
        console.error('Error hint:', error.hint);
        throw new Error(error.message);
      }

      console.log('Product added successfully:', data);
    } catch (error) {
      console.error('Error:', error);
      if (error instanceof Error) {
        alert('Error adding product: ' + error.message);
      } else {
        alert('An unknown error occurred.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <ProductForm onSubmit={handleAddProduct} />
    </div>
  );
};

export default withAuth(AddProductPage);
