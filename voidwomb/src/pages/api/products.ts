// pages/api/products.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../utils/prisma';

const allowedOrigins = ['https://voidwomb.com'];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const origin = req.headers.origin;

  if (!allowedOrigins.includes(origin || '')) {
    res.status(403).json({ error: 'Forbidden' });
    return;
  }

  if (req.method === 'GET') {
    const products = await prisma.product.findMany({
      include: {
        images: true,
        sizes: true,
      },
    });
    res.status(200).json(products);
  } else if (req.method === 'POST') {
    const { name, sku, price, totalStock, description, images, sizes } = req.body;
    const product = await prisma.product.create({
      data: {
        name,
        sku,
        price,
        totalStock,
        description,
        images: {
          create: images.map((url: string) => ({ imageUrl: url })),
        },
        sizes: {
          create: sizes,
        },
      },
    });
    res.status(201).json(product);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;
