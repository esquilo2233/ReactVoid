import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import jwt from 'jsonwebtoken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
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