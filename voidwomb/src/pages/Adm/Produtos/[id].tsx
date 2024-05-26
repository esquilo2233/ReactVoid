import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getProductById, updateProduct, Product } from '../../../services/productService';
import withAuth from '../../../components/withAuth';
import ProductForm from '../../../components/ProductForm';


const EditProduct = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      getProductById(Number(id)).then(setProduct);
    }
  }, [id]);

  const handleUpdateProduct = async (formData: FormData) => {
    const productData = {
      name: formData.get('name') as string,
      sku: formData.get('sku') as string,
      price: parseFloat(formData.get('price') as string),
      totalStock: parseInt(formData.get('totalStock') as string),
      description: formData.get('description') as string,
      color: formData.get('color') as string,
      totalSelled: parseInt(formData.get('totalSelled') as string),
    };

    const images = Array.from(formData.getAll('images')).map(image => ({
      imageUrl: URL.createObjectURL(image as File),
    }));

    const sizes = Array.from(formData.getAll('sizes')).map(size =>
      JSON.parse(size as string)
    );

    try {
      const response = await fetch('/api/products', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: Number(id), ...productData, images, sizes }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error updating product:', errorData);
        return;
      }

      const data = await response.json();
      console.log('Response:', data);
      router.push('/adm/produtos');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Product</h1>
      <ProductForm onSubmit={handleUpdateProduct} product={product} />
    </div>
  );
};

export default withAuth(EditProduct);
