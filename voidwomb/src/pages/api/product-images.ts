// pages/api/product-images.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../utils/prisma';

const allowedOrigins = ['https://voidwomb.com'];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const origin = req.headers.origin;

  if (!allowedOrigins.includes(origin || '')) {
    res.status(403).json({ error: 'Forbidden' });
    return;
  }

  if (req.method === 'POST') {
    const { productId, imageUrl } = req.body;
    const image = await prisma.productImage.create({
      data: {
        productId,
        imageUrl,
      },
    });
    res.status(201).json(image);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;
