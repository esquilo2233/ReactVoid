import { prisma } from './prisma';

type LogAction = 'login' | 'logout' | 'admin_access' | 'database_update';

interface LogData {
  userId?: number;
  email?: string;
  action: LogAction;
  details: string;
  ipAddress: string;
  productId?: number;
  transactionId?: number;
  guestUserId?: number;
  saleId?: number;
  newsletterId?: number;
}

export async function createLog(data: LogData) {
  try {
    await prisma.log.create({
      data: {
        userId: data.userId,
        email: data.email,
        action: data.action,
        details: data.details,
        ipAddress: data.ipAddress,
        productId: data.productId,
        transactionId: data.transactionId,
        guestUserId: data.guestUserId,
        saleId: data.saleId,
        newsletterId: data.newsletterId,
      },
    });
  } catch (error) {
    console.error('Erro ao criar log:', error);
  }
} 