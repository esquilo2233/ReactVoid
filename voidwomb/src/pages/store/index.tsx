import React from 'react';
import Image from 'next/image';

function Store() {
  return (
    <div className="container mx-auto mt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="w-full max-w-sm bg-transparent border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4">
          <a href="/store/product">
            <div className="p-8">
              <Image
                className="rounded-t-lg"
                src="/img/Merch_FotosSA/T-ShirtRedSA_BackZoom.jpg"
                alt="product image"
                width={500}
                height={500}
              />
            </div>
          </a>
          <div className="px-5 pb-5">
            <a href="/store/product">
              <h5 className="text-xl font-semibold tracking-tight text-white dark:text-white">
                Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
              </h5>
            </a>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-white dark:text-white">$599</span>
              <a
                href="/store/product"
                className="text-white bg-transparent hover:bg-transparent focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-transparent dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add to cart
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Store;
