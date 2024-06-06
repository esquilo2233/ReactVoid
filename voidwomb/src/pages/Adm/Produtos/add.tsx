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
    images: File[];
  }) => {
    try {
      const { name, sku, price, color, category, totalStock, description, totalSelled = 0, images } = formData;
      const userId = session?.user.id;

      if (!userId) {
        throw new Error("User ID is not available");
      }

      // Adicionar produto
      const { data: productData, error: productError } = await supabase
        .from('Product')
        .insert([{ name, sku, price, color, category, totalStock, description, totalSelled, user_id: userId }])
        .select()
        .single();

      if (productError) {
        console.error('Error adding product:', productError);
        console.error('Error details:', productError.details);
        console.error('Error hint:', productError.hint);
        throw new Error(productError.message);
      }

      const productId = productData.id;

      
      for (const image of images) {
        const filePath = `public/${userId}/${Date.now()}_${image.name}`;
        const { data: imageData, error: imageError } = await supabase.storage
          .from('products')
          .upload(filePath, image);

        if (imageError) {
          throw new Error(`Error uploading image: ${imageError.message}`);
        }

        const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${filePath}`;

        const { error: imageInsertError } = await supabase
          .from('ProductImage')
          .insert([{ productId, imageUrl }]);

        if (imageInsertError) {
          throw new Error(`Error inserting image URL: ${imageInsertError.message}`);
        }
      }

      console.log('Product added successfully:', productData);
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
