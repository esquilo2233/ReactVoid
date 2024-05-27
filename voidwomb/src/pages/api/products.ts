// src/pages/api/products.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Category } from '@prisma/client';

const prisma = new PrismaClient();

interface CustomRequest extends NextApiRequest {
  user?: {
    userId: number;
    email: string;
  };
}

const handler = async (req: CustomRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { name, price, description, category, color, sku, totalStock, totalSelled } = req.body;

    if (!req.user) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    try {
      const newProduct = await prisma.product.create({
        data: {
          name,
          price: parseFloat(price),
          description,
          category: category ? category as Category : null,
          color,
          sku,
          totalStock,
          totalSelled,
          userId: req.user.userId, // Certifique-se de que userId está definido no schema
        },
      });
      return res.status(201).json(newProduct);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao adicionar produto' });
    }
  } else if (req.method === 'GET') {
    try {
      const products = await prisma.product.findMany();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
  } else if (req.method === 'PUT') {
    const { id, name, price, description, category, color, sku, totalStock, totalSelled } = req.body;

    if (!req.user) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    try {
      const updatedProduct = await prisma.product.update({
        where: { id: Number(id) },
        data: {
          name,
          price: parseFloat(price),
          description,
          category: category ? category as Category : null,
          color,
          sku,
          totalStock,
          totalSelled,
          userId: req.user.userId, // Certifique-se de que userId está definido no schema
        },
      });
      return res.status(200).json(updatedProduct);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query;

    if (!req.user) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    try {
      await prisma.product.delete({
        where: { id: Number(id) },
      });
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar produto' });
    }
  } else {
    return res.status(405).json({ error: 'Método não permitido' });
  }
};

export default handler;
