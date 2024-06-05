import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';
import { authenticate } from '../Auth/authMiddleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await new Promise<void>((resolve, reject) => {
      authenticate(req, res, (err: Error) => {
        if (err) {
          console.error("Authentication error:", err);
          reject(err);
        } else {
          resolve();
        }
      });
    });

    if (req.method === 'GET') {
      try {
        const products = await prisma.product.findMany();
        res.json(products);
      } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: 'An error occurred while fetching products.', details: (error as Error).message });
      }
    } else if (req.method === 'POST') {
      const { name, sku, price, color, category, totalStock, totalSelled, description, userId } = req.body;
      try {
        const newProduct = await prisma.product.create({
          data: { name, sku, price, color, category, totalStock, totalSelled, description, userId },
        });
        res.status(201).json(newProduct);
      } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: 'An error occurred while creating the product.', details: (error as Error).message });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error("Request processing error:", error);
    res.status(500).json({ error: 'An error occurred during request processing.', details: (error as Error).message });
  }
}
