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
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ message: 'ID do pedido não fornecido' });
    }

    await paypalService.captureOrder(orderId);

    return res.status(200).json({ message: 'Pagamento capturado com sucesso' });
  } catch (error) {
    console.error('Erro ao capturar pagamento:', error);
    return res.status(500).json({
      message: 'Erro ao capturar pagamento',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
} 