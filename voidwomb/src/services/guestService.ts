import prisma from '../utils/prisma';



export class GuestService {
  // Criar ou atualizar um usuário convidado
  async createOrUpdateGuest(email: string, data: {
    name?: string;
    phone?: string;
    address?: string;
  }) {
    const existingGuest = await prisma.guestUser.findUnique({
      where: { email },
    });

    if (existingGuest) {
      return await prisma.guestUser.update({
        where: { email },
        data,
      });
    }

    return await prisma.guestUser.create({
      data: {
        email,
        ...data,
      },
    });
  }

  // Criar uma venda para um convidado
  async createGuestSale(guestId: number, data: {
    totalAmount: number;
    paymentMethod: string;
    shippingAddress: string;
    items: Array<{
      productId: number;
      quantity: number;
      price: number;
      size?: string;
    }>;
  }) {
    return await prisma.$transaction(async (prisma) => {
      // Criar a venda
      const sale = await prisma.sale.create({
        data: {
          guestUserId: guestId,
          totalAmount: data.totalAmount,
          paymentProvider: data.paymentMethod,
          shippingAddress: data.shippingAddress,
          items: {
            create: data.items,
          },
        },
      });

      // Atualizar estoque dos produtos
      for (const item of data.items) {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
          include: { sizes: true },
        });

        if (!product) {
          throw new Error(`Produto ${item.productId} não encontrado`);
        }

        if (item.size) {
          const productSize = await prisma.productSize.findFirst({
            where: {
              productId: item.productId,
              size: item.size,
            },
          });

          if (!productSize) {
            throw new Error(`Tamanho ${item.size} para o produto ${item.productId} não encontrado`);
          }

          // Atualizar estoque do tamanho específico
          await prisma.productSize.update({
            where: {
              id: productSize.id,
            },
            data: {
              stock: {
                decrement: item.quantity,
              },
            },
          });
        }

        // Atualizar estoque total do produto
        await prisma.product.update({
          where: { id: item.productId },
          data: {
            totalStock: {
              decrement: item.quantity,
            },
            totalSelled: {
              increment: item.quantity,
            },
          },
        });
      }

      // Registrar log
      await prisma.log.create({
        data: {
          guestUserId: guestId,
          saleId: sale.id,
          action: 'GUEST_SALE_CREATED',
          details: `Venda criada para convidado ${guestId}`,
        },
      });

      return sale;
    });
  }

  // Obter histórico de compras de um convidado
  async getGuestSales(guestId: number) {
    return await prisma.sale.findMany({
      where: { guestUserId: guestId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Obter detalhes de um convidado
  async getGuestDetails(guestId: number) {
    return await prisma.guestUser.findUnique({
      where: { id: guestId },
      include: {
        sales: {
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });
  }
} 