// pages/add-product.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { addProduct } from '../../../actions/actions';
import { useSession } from 'next-auth/react';
import { Category, Product } from '../../../types';

const AddProduct: React.FC = () => {
  const { data: session, status } = useSession();
  const [product, setProduct] = useState<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>({
    name: '',
    sku: '',
    price: 0,
    color: '',
    category: undefined,
    totalStock: 0,
    totalSelled: 0,
    description: '',
    userId: 0,
  });
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && session.user) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        userId: parseInt(session.user.id, 10),
      }));
    }
  }, [session, status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === 'price' || name === 'totalStock' || name === 'totalSelled' ? parseFloat(value) : value,
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      category: value as Category,
    }));
  };

  const handleAddProduct = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!product.name || !product.sku || !product.price || !product.category) {
      toast.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    console.log('Adding product:', product);

    try {
      const result = await addProduct(product);
      console.log('Product added:', result);
      toast.success('Produto adicionado com sucesso');
      router.push('/store');
    } catch (error) {
      console.error('Error adding product:', error);
      if (error instanceof Error) {
        toast.error(`Erro ao adicionar produto: ${error.message}`);
      } else {
        toast.error('Erro desconhecido ao adicionar produto');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Adicionar Produto</h2>
        <form className="mt-8 space-y-6" onSubmit={handleAddProduct}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Nome
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 rounded-t-md focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Nome do produto"
                value={product.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="sku" className="sr-only">
                SKU
              </label>
              <input
                id="sku"
                name="sku"
                type="text"
                autoComplete="sku"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="SKU"
                value={product.sku}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="price" className="sr-only">
                Preço
              </label>
              <input
                id="price"
                name="price"
                type="number"
                autoComplete="price"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Preço"
                value={product.price}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="color" className="sr-only">
                Cor
              </label>
              <input
                id="color"
                name="color"
                type="text"
                autoComplete="color"
                className="relative block w-full px-3 py-2 border border-gray-300 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Cor"
                value={product.color}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="category" className="sr-only">
                Categoria
              </label>
              <select
                id="category"
                name="category"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={product.category}
                onChange={handleCategoryChange}
              >
                <option value="" disabled selected>Selecione uma categoria</option>
                <option value="CD">CD</option>
                <option value="Vinyl">Vinyl</option>
                <option value="T_shirt">T-Shirt</option>
                <option value="Longsleeves">Longsleeves</option>
              </select>
            </div>
            <div>
              <label htmlFor="totalStock" className="sr-only">
                Estoque Total
              </label>
              <input
                id="totalStock"
                name="totalStock"
                type="number"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Estoque Total"
                value={product.totalStock}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="totalSelled" className="sr-only">
                Total Vendido
              </label>
              <input
                id="totalSelled"
                name="totalSelled"
                type="number"
                className="relative block w-full px-3 py-2 border border-gray-300 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Total Vendido"
                value={product.totalSelled}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="description" className="sr-only">
                Descrição
              </label>
              <textarea
                id="description"
                name="description"
                className="relative block w-full px-3 py-2 border border-gray-300 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Descrição"
                value={product.description}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Adicionar Produto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default AddProduct;
