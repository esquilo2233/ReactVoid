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
  return await prisma.product.create({
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
};

export const updateProduct = async (
  id: number,
  product: ProductData,
  images: ProductImageData[],
  sizes: ProductSizeData[]
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
      totalSelled: product.totalSelled ?? 0,  // Garantir que totalSelled tenha um valor padrão de 0
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

export const purchaseProduct = async (productId: number, quantity: number) => {
  const product = await prisma.product.update({
    where: { id: productId },
    data: {
      totalStock: {
        decrement: quantity,
      },
      totalSelled: {
        increment: 1, // Incrementa o campo totalSelled
      },
    },
  });
  return product;
};
