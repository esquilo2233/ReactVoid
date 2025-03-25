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

  switch (req.method) {
    case 'GET':
      try {
        const products = await prisma.product.findMany({
          orderBy: {
            id: 'desc',
          },
        });

        return res.status(200).json(products);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }

    case 'POST':
      try {
        const { name, description, price, sku, color, totalStock, totalSelled, image_urls } = req.body;

        if (!name || !description || !price || !sku || !color || totalStock === undefined || !image_urls) {
          return res.status(400).json({ message: 'Dados incompletos' });
        }

        const product = await prisma.product.create({
          data: {
            userId: user.id,
            name,
            description,
            price: Number(price),
            sku,
            color,
            totalStock,
            totalSelled: totalSelled || 0,
            is_active: true,
          },
        });

        // Adicionando as imagens
        const images = image_urls.map((url: any) => ({
          productId: product.id,
          imageUrl: url,
        }));

        await prisma.productImage.createMany({
          data: images,
        });

        return res.status(201).json(product);
      } catch (error) {
        console.error('Erro ao criar produto:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ message: 'Método não permitido' });
  }
} 