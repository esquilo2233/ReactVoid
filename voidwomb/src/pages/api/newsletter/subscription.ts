import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { NewsletterService } from '@/services/newsletterService';

const newsletterService = new NewsletterService();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Não autorizado' });
  }

  const userId = session.user.id;

  switch (req.method) {
    case 'POST':
      try {
        const subscription = await newsletterService.subscribeUser(parseInt(userId));
        return res.status(200).json(subscription);
      } catch (error) {
        return res.status(500).json({ error: 'Erro ao inscrever na newsletter' });
      }

    case 'DELETE':
      try {
        const subscription = await newsletterService.unsubscribeUser(parseInt(userId));
        return res.status(200).json(subscription);
      } catch (error) {
        return res.status(500).json({ error: 'Erro ao cancelar inscrição' });
      }

    default:
      res.setHeader('Allow', ['POST', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 