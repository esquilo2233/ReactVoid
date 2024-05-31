// src/pages/Adm/Produtos/[id].tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ProductForm from '../../../components/ProductForm';
import { Category } from '../../../types';
import withAuth from '../../../components/withAuth';
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category?: Category;
  color: string;
  sku: string;
  totalStock: number;
  totalSelled: number;
}

const EditProduct = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/api/products?id=${id}`);
      const data = await response.json();
      setProduct(data);
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleUpdateProduct = async (formData: { name: string; price: number; description?: string; category?: Category; color: string; sku: string; totalStock: number; totalSelled: number }) => {
    await fetch(`/api/products?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    router.push('/Adm/Produtos');
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Product</h1>
      <ProductForm onSubmit={handleUpdateProduct} product={product} />
    </div>
  );
};

export default withAuth(EditProduct);
