// components/ProductForm.tsx
import React, { useState } from 'react';

interface ProductFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, initialData = {} }) => {
  const [name, setName] = useState(initialData.name || '');
  const [sku, setSku] = useState(initialData.sku || '');
  const [price, setPrice] = useState(initialData.price || 0);
  const [totalStock, setTotalStock] = useState(initialData.totalStock || 0);
  const [description, setDescription] = useState(initialData.description || '');
  const [images, setImages] = useState<FileList | null>(null);
  const [sizes, setSizes] = useState<{ size: string; stock: number }[]>(initialData.sizes || []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = new FormData();
    productData.append('name', name);
    productData.append('sku', sku);
    productData.append('price', price.toString());
    productData.append('totalStock', totalStock.toString());
    productData.append('description', description);
    
    if (images) {
      Array.from(images).forEach(image => {
        productData.append('images', image);
      });
    }
    
    sizes.forEach(size => {
      productData.append('sizes', JSON.stringify(size));
    });

    onSubmit(productData);
  };

  return (
    
    <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
      <div className="relative z-0 w-full mb-5 group">
        <label className="block mb-2 text-sm font-medium text-white dark:text-white">Name</label>
        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <label className='block mb-2 text-sm font-medium text-white dark:text-white'>SKU</label>
        <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="text" value={sku} onChange={(e) => setSku(e.target.value)} />
      </div>
      <div>
        <label className='block mb-2 text-sm font-medium text-white dark:text-white'>Price</label>
        <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500' type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
      </div>
      <div>
        <label className='block mb-2 text-sm font-medium text-white dark:text-white'>Total Stock</label>
        <input type="number" value={totalStock} onChange={(e) => setTotalStock(parseInt(e.target.value))} />
      </div>
      <div>
        <label className='block mb-2 text-sm font-medium text-white dark:text-white'>Description</label>
        <textarea className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label className='block mb-2 text-sm font-medium text-white dark:text-white'>Images</label>
        <input className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400' type="file" multiple onChange={(e) => setImages(e.target.files)} />
      </div>
      <div>
        <label>Sizes</label>
        {sizes.map((size, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Size"
              value={size.size}
              onChange={(e) => {
                const newSizes = [...sizes];
                newSizes[index].size = e.target.value;
                setSizes(newSizes);
              }}
            />
            <input
              type="number"
              placeholder="Stock"
              value={size.stock}
              onChange={(e) => {
                const newSizes = [...sizes];
                newSizes[index].stock = parseInt(e.target.value);
                setSizes(newSizes);
              }}
            />
            <button
              type="button"
              onClick={() => setSizes(sizes.filter((_, i) => i !== index))}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setSizes([...sizes, { size: '', stock: 0 }])}
        >
          Add Size
        </button>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;
