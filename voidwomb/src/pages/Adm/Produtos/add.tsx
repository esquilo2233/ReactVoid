import React from 'react';
import ProductForm from '../../../components/ProductForm';
import withAuth from '../../../components/withAuth';
import { supabase } from '../../../utils/supabaseClient';
import { useSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
  name: string;
  sku: string;
  price: number;
  color: string;
  category: string;
  totalStock: number;
  description: string;
  totalSelled?: number;
  images: File[];
}

const AddProductPage: React.FC = () => {
  const { data: session } = useSession();

  const uploadFile = async (file: File, userId: string): Promise<string> => {
    const filePath = `public/${userId}/${Date.now()}_${file.name}`;
    const bucketName = 'products'; // Nome do bucket especificado aqui

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        upsert: true, // Sobrescrever arquivos existentes com o mesmo nome
      });

    if (error) {
      console.error('Error uploading file:', error);
      throw new Error(`Error uploading file: ${error.message}`);
    }

    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucketName}/${filePath}`;
  };

  const handleAddProduct = async (formData: FormData) => {
    try {
      const { name, sku, price, color, category, totalStock, description, totalSelled = 0, images } = formData;
      const userId = session?.user.id;

      if (!userId) {
        throw new Error("User ID is not available");
      }

      console.log('Adding product:', { name, sku, price, color, category, totalStock, description, totalSelled, user_id: userId });

      // Adicionar produto
      const { data: productData, error: productError } = await supabase
        .from('Product')
        .insert([{ name, sku, price, color, category, totalStock, description, totalSelled, user_id: userId }])
        .select()
        .single();

      if (productError) {
        console.error('Error adding product:', productError);
        throw new Error(productError.message);
      }

      console.log('Product added:', productData);
      toast.success("Product added successfully!");
      const productId = productData.id;

      // Carregar imagens para o Supabase Storage e inserir URLs na tabela ProductImage
      for (const image of images) {
        const imageUrl = await uploadFile(image, userId);
        console.log('Image URL:', imageUrl);

        const { error: imageInsertError } = await supabase
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
        toast.error('Error adding product: ' + error.message);
      } else {
        toast.error('An unknown error occurred.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <ProductForm onSubmit={handleAddProduct} />
      <ToastContainer />
    </div>
  );
};

export default withAuth(AddProductPage);
