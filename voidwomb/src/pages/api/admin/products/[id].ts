import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';
import jwt from 'jsonwebtoken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Verificar autenticação via JWT
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.NEXTAUTH_SECRET || 'supersecret';
  
  let decoded: any;
  try {
    decoded = jwt.verify(token, secret);
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  // Verificar se o usuário é admin
  if (!decoded.is_staff) {
    return res.status(403).json({ message: 'Acesso negado' });
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'ID inválido' });
  }

  const productId = parseInt(id);

  if (isNaN(productId)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const product = await prisma.product.findUnique({
          where: { id: productId },
        });

        if (!product) {
          return res.status(404).json({ message: 'Produto não encontrado' });
        }

        return res.status(200).json(product);
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }

    case 'PATCH':
      try {
        const { name, description, price, image_url, is_active } = req.body;

        const updateData: any = {};
        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (price) updateData.price = Number(price);
        if (image_url) updateData.image_url = image_url;
        if (typeof is_active === 'boolean') updateData.is_active = is_active;

        const product = await prisma.product.update({
          where: { id: productId },
          data: updateData,
        });

        return res.status(200).json(product);
      } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }

    case 'DELETE':
      try {
        await prisma.product.delete({
          where: { id: productId },
        });

        return res.status(204).end();
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }

    default:
      res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
      return res.status(405).json({ message: 'Método não permitido' });
  }
} 