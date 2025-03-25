import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface PayPalOrder {
  intent: string;
  purchase_units: {
    amount: {
      currency_code: string;
      value: string;
    };
    items: {
      name: string;
      unit_amount: {
        currency_code: string;
        value: string;
      };
      quantity: string;
    }[];
    custom_id: string;
    description: string;
  }[];
  application_context: {
    return_url: string;
    cancel_url: string;
  };
}

interface PayPalResponse {
  id: string;
  status: string;
  links: {
    href: string;
    rel: string;
    method: string;
  }[];
}

export class PayPalService {
  private clientId: string;
  private clientSecret: string;
  private isSandbox: boolean;

  constructor() {
    this.clientId = process.env.PAYPAL_CLIENT_ID || '';
    this.clientSecret = process.env.PAYPAL_CLIENT_SECRET || '';
    this.isSandbox = process.env.NODE_ENV !== 'production';
  }

  private getBaseUrl(): string {
    return this.isSandbox
      ? 'https://api-m.sandbox.paypal.com'
      : 'https://api-m.paypal.com';
  }

  private async getAccessToken(): Promise<string> {
    const auth = Buffer.from(
      `${this.clientId}:${this.clientSecret}`
    ).toString('base64');

    const response = await fetch(`${this.getBaseUrl()}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${auth}`,
      },
      body: 'grant_type=client_credentials',
    });

    const data = await response.json();
    return data.access_token;
  }

  async createOrder(
    saleId: number,
    items: {
      name: string;
      price: number;
      quantity: number;
    }[],
    totalAmount: number,
    customerName: string,
    customerEmail: string
  ): Promise<PayPalResponse> {
    const accessToken = await this.getAccessToken();

    const order: PayPalOrder = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'BRL',
            value: totalAmount.toFixed(2),
          },
          items: items.map((item) => ({
            name: item.name,
            unit_amount: {
              currency_code: 'BRL',
              value: item.price.toFixed(2),
            },
            quantity: item.quantity.toString(),
          })),
          custom_id: saleId.toString(),
          description: `Pedido #${saleId} - ${customerName}`,
        },
      ],
      application_context: {
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
      },
    };

    const response = await fetch(`${this.getBaseUrl()}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'PayPal-Request-Id': `order-${saleId}-${Date.now()}`,
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Erro ao criar pedido PayPal: ${error.message}`);
    }

    const data: PayPalResponse = await response.json();

    // Atualizar a venda com o ID do pedido PayPal
    await prisma.sale.update({
      where: { id: saleId },
      data: {
        paymentId: data.id,
        paymentProvider: 'paypal',
        paymentStatus: 'pending',
      },
    });

    return data;
  }

  async captureOrder(paypalOrderId: string): Promise<void> {
    const accessToken = await this.getAccessToken();

    const response = await fetch(
      `${this.getBaseUrl()}/v2/checkout/orders/${paypalOrderId}/capture`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Erro ao capturar pagamento PayPal: ${error.message}`);
    }

    const data = await response.json();

    // Atualizar o status da venda
    await prisma.sale.update({
      where: { id: parseInt(paypalOrderId) },
      data: {
        paymentStatus: 'completed',
      },
    });
  }

  async getOrderDetails(paypalOrderId: string): Promise<any> {
    const accessToken = await this.getAccessToken();

    const response = await fetch(
      `${this.getBaseUrl()}/v2/checkout/orders/${paypalOrderId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Erro ao buscar detalhes do pedido PayPal: ${error.message}`);
    }

    return response.json();
  }
} 