import React from 'react';
import { useRouter } from 'next/router';

interface ProductListProps {
  products: any[];
  onDelete: (id: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onDelete }) => {
  const router = useRouter();

  return (
    <div>
      <h1>Product List</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Nome do Produto
              </th>
              <th scope="col" className="px-6 py-3">
                Stock Total
              </th>
              <th scope="col" className="px-6 py-3">
                Preço
              </th>
              <th scope="col" className="px-6 py-3">
                Ação
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="odd:bg-white even:bg-gray-50">
                <td className="px-6 py-4">
                  {product.id}
                </td>
                <td className="px-6 py-4">
                  {product.name}
                </td>
                <td className="px-6 py-4">
                  {product.totalStock}
                </td>
                <td className="px-6 py-4">
                  {product.price}
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => router.push(`/adm/produtos/${product.id}`)}>Edit</button>
                  <button onClick={() => onDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
