// services/productService.ts
import prisma from '../utils/prisma';
import { Product, ProductImage, ProductSize } from '@prisma/client';

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
  product: Omit<Product, 'id'>,
  images: Omit<ProductImage, 'id'>[],
  sizes: Omit<ProductSize, 'id'>[]
) => {
  return await prisma.product.create({
    data: {
      ...product,
      images: {
        create: images,
      },
      sizes: {
        create: sizes,
      },
    },
  });
};

export const updateProduct = async (
  id: number,
  product: Omit<Product, 'id'>,
  images: Omit<ProductImage, 'id'>[],
  sizes: Omit<ProductSize, 'id'>[]
) => {
  // First, delete existing images and sizes
  await prisma.productImage.deleteMany({
    where: { productId: id },
  });
  await prisma.productSize.deleteMany({
    where: { productId: id },
  });

  // Then, update the product with new data
  return await prisma.product.update({
    where: { id },
    data: {
      ...product,
      images: {
        create: images,
      },
      sizes: {
        create: sizes,
      },
    },
  });
};

export const deleteProduct = async (id: number) => {
  return await prisma.product.delete({
    where: { id },
  });
};
