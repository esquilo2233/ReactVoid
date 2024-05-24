import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../utils/prisma';

const handleProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const products = await prisma.product.findMany({
      include: {
        images: true,
        sizes: true,
      },
    });
    res.status(200).json(products);
  } else if (req.method === 'POST') {
    const { name, sku, price, totalStock, description, color, images, sizes } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        sku,
        price,
        totalStock,
        description,
        color,
        totalSelled: 0, // Inicializa o campo totalSelled
        images: {
          create: images,
        },
        sizes: {
          create: sizes,
        },
      },
    });
    res.status(201).json(product);
  } else if (req.method === 'PUT') {
    const { id, name, sku, price, totalStock, description, color, images, sizes } = req.body;

    // First, delete existing images and sizes
    await prisma.productImage.deleteMany({
      where: { productId: id },
    });
    await prisma.productSize.deleteMany({
      where: { productId: id },
    });

    // Then, update the product with new data
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
  } else if (req.method === 'DELETE') {
    const { id } = req.body;

    const product = await prisma.product.delete({
      where: { id },
    });
    res.status(200).json(product);
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handleProducts;
