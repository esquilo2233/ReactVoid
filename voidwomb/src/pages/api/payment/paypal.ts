import { NextApiRequest, NextApiResponse } from 'next';
import { PayPalService } from '@/services/paypalService';

const paypalService = new PayPalService();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const { saleId, items, totalAmount, customerName, customerEmail } = req.body;

    if (!saleId || !items || !totalAmount || !customerName || !customerEmail) {
      return res.status(400).json({ message: 'Dados incompletos' });
    }

    const order = await paypalService.createOrder(
      saleId,
      items,
      totalAmount,
      customerName,
      customerEmail
    );

    // Encontrar o link de aprovação do PayPal
    const approvalUrl = order.links.find(
      (link) => link.rel === 'approve'
    )?.href;

    if (!approvalUrl) {
      throw new Error('URL de aprovação não encontrada');
    }

    return res.status(200).json({ approvalUrl });
  } catch (error) {
    console.error('Erro ao processar pagamento:', error);
    return res.status(500).json({
      message: 'Erro ao processar pagamento',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
} 