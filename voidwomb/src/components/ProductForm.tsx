import React, { useState } from 'react';

interface ProductFormProps {
  onSubmit: (formData: FormData) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [price, setPrice] = useState('');
  const [totalStock, setTotalStock] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [sizes, setSizes] = useState<{ size: string; stock: number }[]>([{ size: '', stock: 0 }]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('sku', sku);
    formData.append('price', price);
    formData.append('totalStock', totalStock);
    formData.append('description', description);
    formData.append('color', color);
    images.forEach(image => formData.append('images', image));
    sizes.forEach(size => formData.append('sizes', JSON.stringify(size)));
    onSubmit(formData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSizeChange = (index: number, field: string, value: string | number) => {
    const newSizes = [...sizes];
    newSizes[index] = { ...newSizes[index], [field]: value };
    setSizes(newSizes);
  };

  const addSizeField = () => {
    setSizes([...sizes, { size: '', stock: 0 }]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="SKU" value={sku} onChange={(e) => setSku(e.target.value)} required />
      <input type="number" placeholder="Preço" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <input type="number" placeholder="Estoque Total" value={totalStock} onChange={(e) => setTotalStock(e.target.value)} required />
      <textarea placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input type="text" placeholder="Cor" value={color} onChange={(e) => setColor(e.target.value)} required />
      <div>
        <h3>Imagens</h3>
        <input type="file" multiple onChange={handleImageChange} />
      </div>
      <div>
        <h3>Tamanhos</h3>
        {sizes.map((size, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Tamanho"
              value={size.size}
              onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Estoque do tamanho"
              value={size.stock}
              onChange={(e) => handleSizeChange(index, 'stock', parseInt(e.target.value))}
              required
            />
          </div>
        ))}
        <button type="button" onClick={addSizeField}>Adicionar Tamanho</button>
      </div>
      <button type="submit">Adicionar Produto</button>
    </form>
  );
};

export default ProductForm;
