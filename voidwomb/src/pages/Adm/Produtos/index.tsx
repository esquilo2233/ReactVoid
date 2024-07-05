import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProductList from '../../../components/ProductList';
import { useSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import withAuth from '../../../components/withAuth';
import { supabase } from '../../../utils/supabaseClient';

const ProductAdminPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const accessToken = session?.user.accessToken;

        if (!accessToken) {
          throw new Error("Access token is not available");
        }

        const { data, error } = await supabase
          .from('products')
          .select('*');

        if (error) {
          throw error;
        }

        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Error fetching products');
      }
    };

    fetchProducts();
  }, [session]);

  const handleDelete = async (id: number) => {
    try {
      const accessToken = session?.user.accessToken;

      if (!accessToken) {
        throw new Error("Access token is not available");
      }

      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setProducts(products.filter(product => product.id !== id));
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Error deleting product');
    }
  };

  return (
    <div>
      <h1>Product Administration</h1>
      <button onClick={() => router.push('/adm/produtos/add')}>Add Product</button>
      <ProductList products={products} onDelete={handleDelete} />
      <ToastContainer />
    </div>
  );
};

export default withAuth(ProductAdminPage);
