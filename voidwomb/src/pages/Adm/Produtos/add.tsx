import React from 'react';
import ProductForm from '../../../components/ProductForm';
import withAuth from '../../../components/withAuth';
import { supabase } from '../../../utils/supabaseClient';
import { supabaseService } from '../../../utils/supabaseServiceClient';
import { useSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';


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
      const accessToken = session?.user.accessToken;

      if (!userId || !accessToken) {
        throw new Error("User ID or access token is not available");
      }

      console.log('Adding product:', { name, sku, price, color, category, totalStock, description, totalSelled, user_id: userId });

      // Adicionar produto
      const { data: productData, error: productError } = await supabaseService
        .from('Product')
        .insert([{ name, sku, price, color, category, totalStock, description, totalSelled, user_id: userId }])
        .select()
        .single();

      if (productError) {
        console.error('Error adding product:', productError);
        throw new Error(productError.message);
      }

      console.log('Product added:', productData);
      toast("Product added:",productData.name);
      const productId = productData.id;

      // Carregar imagens para o Supabase Storage e inserir URLs na tabela ProductImage
      for (const image of images) {
        const filePath = `public/${userId}/${Date.now()}_${image.name}`;
        console.log('Uploading image to path:', filePath);

        const formData = new FormData();
        formData.append('file', image);

        const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/products/${filePath}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
          body: formData
        });

        if (!response.ok) {
          const error = await response.json();
          console.error('Error uploading image:', error);
          throw new Error(`Error uploading image: ${error.message}`);
        }

        const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${filePath}`;
        console.log('Image URL:', imageUrl);

        const { error: imageInsertError } = await supabaseService
          .from('ProductImage')
          .insert([{ productId, imageUrl }]);

        if (imageInsertError) {
          console.error('Error inserting image URL:', imageInsertError);
          throw new Error(`Error inserting image URL: ${imageInsertError.message}`);
        }

        console.log('Image URL inserted:', imageUrl);
      }

      console.log('Product added successfully with images:', productData);
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
