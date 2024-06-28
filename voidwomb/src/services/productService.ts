import axios from 'axios';

export interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  totalStock: number;
  description: string;
  color: string;
  totalSelled?: number;
  images: ProductImageData[];
  sizes: ProductSizeData[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImageData {
  id?: number;
  imageUrl: string;
  productId?: number;
}

export interface ProductSizeData {
  id?: number;
  size: string;
  stock: number;
  productId?: number;
}

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get('/api/products');
  return response.data;
};

export const getProductById = async (id: number): Promise<Product | null> => {
  const response = await axios.get(`/api/products/${id}`);
  return response.data;
};

export const addProduct = async (
  product: any,
  images: ProductImageData[],
  sizes: ProductSizeData[]
) => {
  try {
    const response = await axios.post('/api/products', { product, images, sizes });
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const updateProduct = async (
  id: number,
  product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
  images: ProductImageData[],
  sizes: ProductSizeData[]
): Promise<Product> => {
  try {
    const response = await axios.put(`/api/products/${id}`, { product, images, sizes });
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id: number): Promise<Product> => {
  try {
    const response = await axios.delete(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
  