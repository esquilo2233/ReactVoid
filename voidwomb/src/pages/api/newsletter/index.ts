import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { NewsletterService } from '@/services/newsletterService';

const newsletterService = new NewsletterService();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Não autorizado' });
  }

  switch (req.method) {
    case 'POST':
      try {
        const { title, content } = req.body;
        const newsletter = await newsletterService.createNewsletter(title, content);
        return res.status(201).json(newsletter);
      } catch (error) {
        return res.status(500).json({ error: 'Erro ao criar newsletter' });
      }

    case 'GET':
      try {
        const newsletters = await newsletterService.listNewsletters();
        return res.status(200).json(newsletters);
      } catch (error) {
        return res.status(500).json({ error: 'Erro ao listar newsletters' });
      }

    default:
      res.setHeader('Allow', ['POST', 'GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 