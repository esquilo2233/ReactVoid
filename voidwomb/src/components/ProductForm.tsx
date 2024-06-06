import React, { useState, useEffect } from 'react';

interface ProductFormProps {
  onSubmit: (formData: {
    name: string;
    sku: string;
    price: number;
    color: string;
    category: string;
    totalStock: number;
    description: string;
    totalSelled?: number;
  }) => void;
  product?: {
    name: string;
    sku: string;
    price: number;
    color: string;
    category: string;
    totalStock: number;
    description: string;
    totalSelled?: number;
  };
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, product }) => {
  const [name, setName] = useState(product?.name || '');
  const [sku, setSku] = useState(product?.sku || '');
  const [price, setPrice] = useState(product?.price.toString() || '');
  const [color, setColor] = useState(product?.color || '');
  const [category, setCategory] = useState(product?.category || '');
  const [totalStock, setTotalStock] = useState(product?.totalStock.toString() || '');
  const [description, setDescription] = useState(product?.description || '');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setSku(product.sku);
      setPrice(product.price.toString());
      setColor(product.color);
      setCategory(product.category);
      setTotalStock(product.totalStock.toString());
      setDescription(product.description);
    }
  }, [product]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const formData = {
      name,
      sku,
      price: parseFloat(price),
      color,
      category,
      totalStock: parseInt(totalStock, 10),
      description,
      totalSelled: product?.totalSelled || 0,
    };

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">{product ? 'Edit Product' : 'Add Product'}</h2>
      {message && <div className="mb-4 text-green-500">{message}</div>}
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="sku" className="block text-sm font-medium text-gray-700">SKU</label>
        <input
          id="sku"
          type="text"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
        <input
          id="price"
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color</label>
        <input
          id="color"
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <input
          id="category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="totalStock" className="block text-sm font-medium text-gray-700">Total Stock</label>
        <input
          id="totalStock"
          type="text"
          value={totalStock}
          onChange={(e) => setTotalStock(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        {product ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  );
};

export default ProductForm;
