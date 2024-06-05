import { useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import withAuth from '../../../components/withAuth';

const categories = ['CD', 'Vinyl', 'T_shirt', 'Longsleeves'];

const AddProduct = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Adicionar Produto</h2>
        <form className="mt-8 space-y-6" action={'addProduct'}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Nome do Produto
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 rounded-t-md focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Nome do Produto"
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
                required
                className="relative block w-full px-3 py-2 border border-gray-300 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="SKU"
                
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
                required
                className="relative block w-full px-3 py-2 border border-gray-300 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Preço"
                
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
                required
                className="relative block w-full px-3 py-2 border border-gray-300 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Cor"
                
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
                
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
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
                required
                className="relative block w-full px-3 py-2 border border-gray-300 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Total Vendido"
                
              />
            </div>
            <div>
              <label htmlFor="description" className="sr-only">
                Descrição
              </label>
              <textarea
                id="description"
                name="description"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 rounded-b-md focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Descrição"
                
              />
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

export default withAuth(AddProduct);
