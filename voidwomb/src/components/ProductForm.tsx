import React, { useState, ChangeEvent, FormEvent } from 'react';

interface ProductFormProps {
  onSubmit: (formData: FormData) => void;
}

interface Size {
  size: string;
  stock: string;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState<string>('');
  const [sku, setSku] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [totalStock, setTotalStock] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('sku', sku);
    formData.append('price', price);
    formData.append('totalStock', totalStock);
    formData.append('description', description);
    formData.append('color', color);

    images.forEach((image) => {
      formData.append('images', image);
    });

    sizes.forEach((size) => {
      formData.append('sizes', JSON.stringify(size));
    });

    onSubmit(formData);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImages(Array.from(e.target.files || []));
  };

  const handleSizeChange = (index: number, field: keyof Size, value: string) => {
    const newSizes = sizes.slice();
    newSizes[index][field] = value;
    setSizes(newSizes);
  };

  const addSize = () => {
    setSizes([...sizes, { size: '', stock: '' }]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>SKU:</label>
        <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} required />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </div>
      <div>
        <label>Total Stock:</label>
        <input type="number" value={totalStock} onChange={(e) => setTotalStock(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
      </div>
      <div>
        <label>Color:</label>
        <input type="text" value={color} onChange={(e) => setColor(e.target.value)} required />
      </div>
      <div>
        <label>Images:</label>
        <input type="file" multiple onChange={handleImageChange} />
      </div>
      <div>
        <label>Sizes:</label>
        {sizes.map((size, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Size"
              value={size.size}
              onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Stock"
              value={size.stock}
              onChange={(e) => handleSizeChange(index, 'stock', e.target.value)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={addSize}>Add Size</button>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;
