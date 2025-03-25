import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
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

    // Buscar estatísticas
    const [
      totalUsers,
      totalProducts,
      totalSales,
      totalRevenue,
    ] = await Promise.all([
      prisma.users.count(),
      prisma.product.count(),
      prisma.sale.count(),
      prisma.sale.aggregate({
        _sum: {
          totalAmount: true,
        },
      }),
    ]);

    return res.status(200).json({
      totalUsers,
      totalProducts,
      totalSales,
      totalRevenue: totalRevenue?._sum?.totalAmount || 0,
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
} 