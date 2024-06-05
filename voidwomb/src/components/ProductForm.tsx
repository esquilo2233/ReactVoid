// src/components/ProductForm.tsx
import React, { useState } from 'react';
import { Category } from '../types';

interface ProductFormProps {
  onSubmit: (formData: { name: string; price: number; description?: string; category?: Category; color: string; sku: string; totalStock: number; totalSelled: number }) => Promise<void>;
  product: {
    id: number;
    name: string;
    price: number;
    description: string;
    category?: Category;
    color: string;
    sku: string;
    totalStock: number;
    totalSelled: number;
  };
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, product }) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [category, setCategory] = useState(product.category || '');
  const [color, setColor] = useState(product.color);
  const [sku, setSku] = useState(product.sku);
  const [totalStock, setTotalStock] = useState(product.totalStock);
  const [totalSelled, setTotalSelled] = useState(product.totalSelled);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = {
      name,
      price,
      description,
      category: category ? category as Category : undefined,
      color,
      sku,
      totalStock,
      totalSelled
    };
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Preço</label>
        <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
      </div>
      <div>
        <label>Descrição</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      </div>
      <div>
        <label>Categoria</label>
        <select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
          <option value="">Selecione uma categoria</option>
          <option value={Category.CD}>CD</option>
          <option value={Category.Vinyl}>Vinyl</option>
          <option value={Category.Tshirt}>T-shirt</option>
          <option value={Category.Longsleeves}>Longsleeves</option>
        </select>
      </div>
      <div>
        <label>Cor</label>
        <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
      </div>
      <div>
        <label>SKU</label>
        <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} />
      </div>
      <div>
        <label>Estoque Total</label>
        <input type="number" value={totalStock} onChange={(e) => setTotalStock(Number(e.target.value))} />
      </div>
      <div>
        <label>Total Vendido</label>
        <input type="number" value={totalSelled} onChange={(e) => setTotalSelled(Number(e.target.value))} />
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
};

export default ProductForm;
