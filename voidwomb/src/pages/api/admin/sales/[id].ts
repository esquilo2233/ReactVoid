import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  // Verificar se o usuário é admin
  const user = await prisma.users.findUnique({
    where: { email: session.user?.email as string },
  });

  if (!user?.is_staff) {
    return res.status(403).json({ message: 'Acesso negado' });
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'ID inválido' });
  }

  const saleId = parseInt(id);

  if (isNaN(saleId)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  switch (req.method) {
    case 'GET':
      try {
        const sale = await prisma.sale.findUnique({
          where: { id: saleId },
          include: {
            user: {
              select: {
                email: true,
                name: true,
              },
            },
            guestUser: {
              select: {
                email: true,
                name: true,
              },
            },
            items: {
              include: {
                product: true,
              },
            },
          },
        });

        if (!sale) {
          return res.status(404).json({ message: 'Venda não encontrada' });
        }

        return res.status(200).json(sale);
      } catch (error) {
        console.error('Erro ao buscar venda:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }

    case 'PATCH':
      try {
        const { status } = req.body;

        if (!status) {
          return res.status(400).json({ message: 'Status é obrigatório' });
        }

        if (!['pending', 'completed', 'cancelled'].includes(status)) {
          return res.status(400).json({ message: 'Status inválido' });
        }

        const sale = await prisma.sale.update({
          where: { id: saleId },
          data: { status },
        });

        return res.status(200).json(sale);
      } catch (error) {
        console.error('Erro ao atualizar venda:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }

    default:
      res.setHeader('Allow', ['GET', 'PATCH']);
      return res.status(405).json({ message: 'Método não permitido' });
  }
} 