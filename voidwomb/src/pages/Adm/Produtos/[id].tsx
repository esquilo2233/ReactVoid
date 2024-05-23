// pages/adm/produtos/[id].tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProductForm from '../../../components/ProductForm';
import { getProductById, updateProduct } from '../../../services/productService';

const EditProductPage: React.FC = () => {
  const [product, setProduct] = useState<any>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const product = await getProductById(parseInt(id as string));
        setProduct(product);
      };
      fetchProduct();
    }
  }, [id]);

  const handleUpdateProduct = async (formData: FormData) => {
    const productData = {
      name: formData.get('name') as string,
      sku: formData.get('sku') as string,
      price: parseFloat(formData.get('price') as string),
      totalStock: parseInt(formData.get('totalStock') as string),
      description: formData.get('description') as string,
    };

    const images = Array.from(formData.getAll('images')).map(image => ({
      imageUrl: URL.createObjectURL(image as File),
    }));

    const sizes = Array.from(formData.getAll('sizes')).map(size =>
      JSON.parse(size as string)
    );

    await updateProduct(parseInt(id as string), productData, images, sizes);
    router.push('/adm/produtos');
  };

  return (
    <div>
      <h1>Edit Product</h1>
      {product ? (
        <ProductForm onSubmit={handleUpdateProduct} initialData={product} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditProductPage;
