import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Não autorizado' });
  }

  if (!session.user.is_staff) {
    return res.status(403).json({ error: 'Acesso negado' });
  }

  if (req.method === 'GET') {
    try {
      const logs = await prisma.log.findMany({
        orderBy: {
          createdAt: 'desc'
        },
        take: 100 // Limita a 100 logs mais recentes
      });

      return res.status(200).json(logs);
    } catch (error) {
      console.error('Erro ao buscar logs:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
} 