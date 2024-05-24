// pages/adm/produtos/index.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProductList from '.././../../components/ProductList';
import { getProducts, deleteProduct } from '../../../services/productService';
import withAuth from '../../../components/withAuth';

const ProductAdminPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div>
      <h1>Product Administration</h1>
      
      <button onClick={() => router.push('/Adm/Produtos/add')}>Add Product</button>
      <ProductList products={products} onDelete={handleDelete} />
    </div>
  );
};

export default ProductAdminPage;
