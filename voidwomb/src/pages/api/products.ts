import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../utils/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res);
    case 'POST':
      return addProduct(req, res);
    case 'PUT':
      return updateProduct(req, res);
    case 'DELETE':
      return deleteProduct(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getProducts(req: NextApiRequest, res: NextApiResponse) {
  try {
    const products = await prisma.product.findMany({
      include: {
        images: true,
        sizes: true,
      },
    });
    res.status(200).json(products);
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ error: 'Failed to get products' });
  }
}

async function addProduct(req: NextApiRequest, res: NextApiResponse) {
  const { name, sku, price, totalStock, description, color, images, sizes } = req.body;

  try {
    const product = await prisma.product.create({
      data: {
        name,
        sku,
        price,
        totalStock,
        description,
        color,
        totalSelled: 0,
        images: {
          create: images,
        },
        sizes: {
          create: sizes,
        },
      },
    });
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
}

async function updateProduct(req: NextApiRequest, res: NextApiResponse) {
  const { id, name, sku, price, totalStock, description, color, images, sizes } = req.body;

  try {
    await prisma.productImage.deleteMany({
      where: { productId: id },
    });
    await prisma.productSize.deleteMany({
      where: { productId: id },
    });

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        sku,
        price,
        totalStock,
        description,
        color,
        images: {
          create: images,
        },
        sizes: {
          create: sizes,
        },
      },
    });
    res.status(200).json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
}

async function deleteProduct(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;

  try {
    await prisma.product.delete({
      where: { id },
    });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
}
