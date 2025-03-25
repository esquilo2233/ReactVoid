import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { NewsletterService } from '@/services/newsletterService';

const newsletterService = new NewsletterService();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Não autorizado' });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { id } = req.query;
    await newsletterService.sendNewsletter(Number(id));
    return res.status(200).json({ message: 'Newsletter enviada com sucesso' });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao enviar newsletter' });
  }
} 