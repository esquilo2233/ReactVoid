import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../../../utils/supabaseClient';
import ProductForm from '../../../../components/ProductForm';
import withAuth from '../../../../components/withAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  color: string;
  category: string;
  totalStock: number;
  description: string;
  totalSelled: number;
}

const EditProductPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);

  const fetchProduct = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('Product')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setProduct(data);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Error fetching product details');
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id, fetchProduct]);

  const handleUpdateProduct = async (formData: Partial<Product>) => {
    try {
      const { error } = await supabase
        .from('Product')
        .update(formData)
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast.success('Product updated successfully');
      router.push('/admin/products');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Error updating product');
    }
  };

  if (!product) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-12">
      <div className="w-full max-w-4xl p-8">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Edit Product</h1>
        <ProductForm 
          product={product}
          onSubmit={handleUpdateProduct}
        />
        <ToastContainer />
      </div>
    </div>
  );
};

export default withAuth(EditProductPage); 