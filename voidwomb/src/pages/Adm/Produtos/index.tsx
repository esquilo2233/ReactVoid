import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProductList from '../../../components/ProductList';
import { getProducts, deleteProduct } from '../../../services/productService';
import withAuth from '../../../components/withAuth';

const ProductAdminPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        console.log('Fetched products:', products); // Debugging log
        setProducts(products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  return (
    <div>
      <h1>Product Administration</h1>
      <button onClick={() => router.push('/adm/produtos/add')}>Add Product</button>
      <ProductList products={products} onDelete={handleDelete} />
    </div>
  );
};

export default withAuth(ProductAdminPage);
