import React from 'react';
import { useRouter } from 'next/router';
import ProductForm from '../../../components/ProductForm';

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
      totalSelled: 0,
    };

    const images = Array.from(formData.getAll('images')).map(image => ({
      imageUrl: URL.createObjectURL(image as File),
    }));

    const sizes = Array.from(formData.getAll('sizes')).map(size =>
      JSON.parse(size as string)
    );

    console.log('Submitting Product:', productData);
    console.log('Images:', images);
    console.log('Sizes:', sizes);

    try {
      const response = await fetch('/api/addProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...productData, images, sizes }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Response:', data);
        router.push('/adm/produtos');
      } else {
        const errorData = await response.json();
        console.error('Error adding product:', errorData);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <h1>Add New Product</h1>
      <ProductForm onSubmit={handleAddProduct} />
    </div>
  );
};

export default AddProductPage;
