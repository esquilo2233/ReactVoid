import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prisma';
import { authenticate } from '../Auth/authMiddleware';
import Joi from 'joi';

// Definir esquema de validação para PUT
const updateProductSchema = Joi.object({
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
  await new Promise<void>((resolve, reject) => {
    authenticate(req, res, (err: Error) => {
      if (err) reject(err);
      else resolve();
    });
  });

  const { id } = req.query;

  if (req.method === 'PUT') {
    // Validar dados de entrada
    const { error } = updateProductSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: 'Validation error', details: error.details });
    }

    const { name, sku, price, color, category, totalStock, totalSelled, description, userId } = req.body;
    try {
      const updatedProduct = await prisma.product.update({
        where: { id: parseInt(id as string, 10) },
        data: { name, sku, price, color, category, totalStock, totalSelled, description, userId },
      });
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the product.', details: (error as Error).message });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.product.delete({
        where: { id: parseInt(id as string, 10) },
      });
      res.json({ message: 'Product deleted' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the product.', details: (error as Error).message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
