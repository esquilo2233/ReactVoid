// Conteúdo do arquivo productService.ts
import prisma from '../utils/prisma';

interface ProductData {
  name: string;
  sku: string;
  price: number;
  totalStock: number;
  description: string;
  color: string;
  totalSelled?: number;
}

interface ProductImageData {
  imageUrl: string;
  productId?: number;
}

interface ProductSizeData {
  size: string;
  stock: number;
  productId?: number;
}

export const getProducts = async () => {
  return await prisma.product.findMany({
    include: {
      images: true,
      sizes: true,
    },
  });
};

export const getProductById = async (id: number) => {
  return await prisma.product.findUnique({
    where: { id },
    include: {
      images: true,
      sizes: true,
    },
  });
};

export const addProduct = async (
  product: ProductData,
  images: ProductImageData[],
  sizes: ProductSizeData[]
) => {
  console.log('Adding product:', product);
  console.log('Images:', images);
  console.log('Sizes:', sizes);

  try {
    const createdProduct = await prisma.product.create({
      data: {
        ...product,
        totalSelled: product.totalSelled ?? 0,  // Garantir que totalSelled tenha um valor padrão de 0
        images: {
          create: images,
        },
        sizes: {
          create: sizes,
        },
      },
    });
    console.log('Created product:', createdProduct);
    return createdProduct;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};
