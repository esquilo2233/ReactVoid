import { NextApiRequest, NextApiResponse } from 'next';
import { GuestService } from '@/services/guestService';

const guestService = new GuestService();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const {
      email,
      name,
      phone,
      address,
      totalAmount,
      paymentMethod,
      shippingAddress,
      items,
    } = req.body;

    // Criar ou atualizar o convidado
    const guest = await guestService.createOrUpdateGuest(email, {
      name,
      phone,
      address,
    });

    // Criar a venda
    const sale = await guestService.createGuestSale(guest.id, {
      totalAmount,
      paymentMethod,
      shippingAddress,
      items,
    });

    return res.status(201).json(sale);
  } catch (error) {
    console.error('Erro ao processar venda de convidado:', error);
    return res.status(500).json({ error: 'Erro ao processar venda' });
  }
} 