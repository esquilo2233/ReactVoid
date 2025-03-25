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

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const sales = await prisma.sale.findMany({
      include: {
        user: {
          select: {
            email: true,
          },
        },
        guestUser: {
          select: {
            email: true,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    });

    return res.status(200).json(sales);
  } catch (error) {
    console.error('Erro ao buscar vendas:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
} 