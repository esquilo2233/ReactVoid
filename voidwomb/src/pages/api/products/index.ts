// pages/api/products/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';
import { authenticate } from '../Auth/authMiddleware';
import { errorHandler } from '../../../utils/errorHandler';
import cors, { runMiddleware } from '../../../utils/cors';
import Joi from 'joi';

const productSchema = Joi.object({
  name: Joi.string().required(),
  sku: Joi.string().required(),
  price: Joi.number().required(),
  color: Joi.string().required(),
  category: Joi.string().required(),
  totalStock: Joi.number().required(),
  totalSelled: Joi.number().required(),
  description: Joi.string().required(),
  userId: Joi.number().required(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);

  try {
    await new Promise<void>((resolve, reject) => {
      authenticate(req, res, (err: Error) => {
        if (err) reject(err);
        else resolve();
      });
    });

    if (req.method === 'GET') {
      const products = await prisma.product.findMany();
      res.json(products);
    } else if (req.method === 'POST') {
      const { error } = productSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: 'Validation error', details: error.details });
      }

      const { name, sku, price, color, category, totalStock, totalSelled, description, userId } = req.body;
      const newProduct = await prisma.product.create({
        data: { name, sku, price, color, category, totalStock, totalSelled, description, userId },
      });
      res.status(201).json(newProduct);
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (err) {
    errorHandler(err, req, res);
  }
}
