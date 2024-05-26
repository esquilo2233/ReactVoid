// Conteúdo do arquivo addProduct.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../utils/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
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
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
