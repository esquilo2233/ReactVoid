import React, { useState } from 'react';
import { addProduct } from '../../../services/productService';

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    price: 0,
    color: '',
    description: '',
    totalStock: 0,
    images: [{ imageUrl: '' }],
    sizes: [{ size: '', stock: 0 }],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newImages = formData.images.map((image, i) => 
      i === index ? { ...image, imageUrl: e.target.value } : image
    );
    setFormData({ ...formData, images: newImages });
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newSizes = formData.sizes.map((size, i) =>
      i === index ? { ...size, [e.target.name]: e.target.value } : size
    );
    setFormData({ ...formData, sizes: newSizes });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const addedProduct = await addProduct(formData, formData.images, formData.sizes);
      console.log('Product added:', addedProduct);
      // Lógica para redirecionar ou notificar o usuário sobre o sucesso
    } catch (error) {
      console.error('Error adding product:', error);
      // Lógica para notificar o usuário sobre o erro
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="sku">SKU</label>
        <input type="text" id="sku" name="sku" value={formData.sku} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="price">Price</label>
        <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="color">Color</label>
        <input type="text" id="color" name="color" value={formData.color} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="totalStock">Total Stock</label>
        <input type="number" id="totalStock" name="totalStock" value={formData.totalStock} onChange={handleChange} required />
      </div>
      {formData.images.map((image, index) => (
        <div key={index}>
          <label htmlFor={`image-${index}`}>Image URL</label>
          <input type="text" id={`image-${index}`} value={image.imageUrl} onChange={(e) => handleImageChange(e, index)} required />
        </div>
      ))}
      {formData.sizes.map((size, index) => (
        <div key={index}>
          <label htmlFor={`size-${index}`}>Size</label>
          <input type="text" id={`size-${index}`} name="size" value={size.size} onChange={(e) => handleSizeChange(e, index)} required />
          <label htmlFor={`stock-${index}`}>Stock</label>
          <input type="number" id={`stock-${index}`} name="stock" value={size.stock} onChange={(e) => handleSizeChange(e, index)} required />
        </div>
      ))}
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;
