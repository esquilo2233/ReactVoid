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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>SKU</label>
        <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} />
      </div>
      <div>
        <label>Price</label>
        <input type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
      </div>
      <div>
        <label>Total Stock</label>
        <input type="number" value={totalStock} onChange={(e) => setTotalStock(parseInt(e.target.value))} />
      </div>
      <div>
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Images</label>
        <input type="file" multiple onChange={(e) => setImages(e.target.files)} />
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
