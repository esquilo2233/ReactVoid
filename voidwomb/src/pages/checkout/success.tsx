import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { orderId } = router.query;

  useEffect(() => {
    const capturePayment = async () => {
      if (!orderId || typeof orderId !== 'string') return;

      try {
        const response = await fetch('/api/payment/paypal/capture', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderId }),
        });

        if (!response.ok) {
          throw new Error('Erro ao processar pagamento');
        }

        toast.success('Pagamento processado com sucesso!');
        router.push('/orders');
      } catch (error) {
        console.error('Erro ao capturar pagamento:', error);
        toast.error('Erro ao processar pagamento');
        router.push('/checkout');
      } finally {
        setIsLoading(false);
      }
    };

    capturePayment();
  }, [orderId, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Pagamento Confirmado!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Seu pedido foi processado com sucesso.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-600">
              Obrigado pela sua compra! Você receberá um email com os detalhes do
              pedido.
            </p>
            <div className="mt-6">
              <button
                onClick={() => router.push('/orders')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Ver Meus Pedidos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 