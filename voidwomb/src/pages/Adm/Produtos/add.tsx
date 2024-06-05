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
    category: undefined, // Inicializar como undefined
    totalStock: 0,
    totalSelled: 0,
    description: '',
    userId: 0, // Inicializar como 0, será atualizado depois
  });
  const router = useRouter();

  useEffect(() => {
    if (session && session.user) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        userId: parseInt(session.user.id, 10), // Converter para número
      }));
    }
  }, [session]);

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

    try {
      await addProduct(product);
      toast.success('Produto adicionado com sucesso');
      router.push('/store'); // Redireciona para a página de loja após adicionar
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Erro ao adicionar produto: ${error.message}`);
      } else {
        toast.error('Erro desconhecido ao adicionar produto');
      }
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl font-semibold mb-6 text-center">Adicionar Produto</h1>
      <form onSubmit={handleAddProduct} className="space-y-6 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Produto</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
          <input
            type="text"
            name="sku"
            value={product.sku}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Preço</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Cor</label>
          <input
            type="text"
            name="color"
            value={product.color}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
          <select
            name="category"
            value={product.category || ''}
            onChange={handleCategoryChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="" disabled>Selecione uma categoria</option>
            <option value={Category.CD}>CD</option>
            <option value={Category.Vinyl}>Vinyl</option>
            <option value={Category.T_shirt}>T-shirt</option> {/* Correção aqui */}
            <option value={Category.Longsleeves}>Longsleeves</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Total em Estoque</label>
          <input
            type="number"
            name="totalStock"
            value={product.totalStock}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Total Vendido</label>
          <input
            type="number"
            name="totalSelled"
            value={product.totalSelled}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
        >
          Adicionar Produto
        </button>
      </form>
    </div>
  );
};


export default AddProduct;
