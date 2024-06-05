// pages/store/index.tsx
import React from 'react';
import Link from 'next/link';
import prisma from '../../utils/prisma';
import { GetServerSideProps } from 'next';
import { Product } from '../../types';

interface StoreProps {
  products: Product[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await prisma.product.findMany();

  return {
    props: {
      products,
    },
  };
}

const Store: React.FC<StoreProps> = ({ products }) => {
  return (
    <div className="container mx-auto mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="w-full max-w-sm bg-transparent border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4"
          >
            <Link href={`/store/product/${product.id}`}>
              <div className="p-8">
                <img
                  className="rounded-t-lg"
                  src="/path/to/default-image.jpg" // Placeholder image
                  alt={`${product.name} image`}
                  width={500}
                  height={500}
                />
              </div>
            </Link>
            <div className="px-5 pb-5">
              <Link href={`/store/product/${product.id}`}>
                <h5 className="text-xl font-semibold tracking-tight text-white dark:text-white">
                  {product.name}
                </h5>
              </Link>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-white dark:text-white">
                  ${product.price}
                </span>
                <Link
                  href={`/store/product/${product.id}`}
                  className="text-white bg-transparent hover:bg-transparent focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-transparent dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add to cart
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
