// components/ProductList.tsx
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
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <p>Total Stock: {product.totalStock}</p>
            <button onClick={() => router.push(`/adm/produtos/${product.id}`)}>Edit</button>
            <button onClick={() => onDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
