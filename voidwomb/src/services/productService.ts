import prisma from '../utils/prisma';

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
  return await prisma.product.findMany({
    include: {
      images: true,
      sizes: true,
    },
  });
};

export const getProductById = async (id: number): Promise<Product | null> => {
  return await prisma.product.findUnique({
    where: { id },
    include: {
      images: true,
      sizes: true,
    },
  });
};

export const addProduct = async (
  product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
  images: ProductImageData[],
  sizes: ProductSizeData[]
): Promise<Product> => {
  console.log('Adding product:', product);
  console.log('Images:', images);
  console.log('Sizes:', sizes);

  try {
    const createdProduct = await prisma.product.create({
      data: {
        ...product,
        totalSelled: product.totalSelled ?? 0,
        images: {
          create: images,
        },
        sizes: {
          create: sizes,
        },
      },
      include: {
        images: true,
        sizes: true,
      },
    });
    console.log('Created product:', createdProduct);
    return createdProduct;
  } catch (error) {
    console.error('Error creating product:', error);
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
    await prisma.productImage.deleteMany({
      where: { productId: id },
    });
    await prisma.productSize.deleteMany({
      where: { productId: id },
    });

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        ...product,
        totalSelled: product.totalSelled ?? 0,
        images: {
          create: images,
        },
        sizes: {
          create: sizes,
        },
      },
      include: {
        images: true,
        sizes: true,
      },
    });
    return updatedProduct;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id: number): Promise<Product> => {
  try {
    const deletedProduct = await prisma.product.delete({
      where: { id },
      include: {
        images: true,
        sizes: true,
      },
    });
    return deletedProduct;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

