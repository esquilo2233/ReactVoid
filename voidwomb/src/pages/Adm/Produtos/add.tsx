import React from 'react';
import { useRouter } from 'next/router';
import ProductForm from '../../../components/ProductForm';
import { addProduct } from '../../../services/productService';

const AddProductPage: React.FC = () => {
  const router = useRouter();

  const handleAddProduct = async (formData: FormData) => {
    const productData = {
      name: formData.get('name') as string,
      sku: formData.get('sku') as string,
      price: parseFloat(formData.get('price') as string),
      totalStock: parseInt(formData.get('totalStock') as string),
      description: formData.get('description') as string,
      color: formData.get('color') as string,
    };

    const images = Array.from(formData.getAll('images')).map(image => ({
      imageUrl: URL.createObjectURL(image as File),
    }));

    const sizes = JSON.parse(formData.get('sizes') as string);

    await addProduct(productData, images, sizes);
    router.push('/adm/produtos');
  };

  return (
    <div>
      <h1>Add New Product</h1>
      <ProductForm onSubmit={handleAddProduct} />
    </div>
  );
};

export default AddProductPage;
