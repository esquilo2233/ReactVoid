import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export default function CheckoutCancelPage() {
  const router = useRouter();

  useEffect(() => {
    toast.error('Pagamento cancelado');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Pagamento Cancelado
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            O pagamento foi cancelado. Nenhum valor foi cobrado.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-600">
              Você pode tentar novamente quando quiser.
            </p>
            <div className="mt-6">
              <button
                onClick={() => router.push('/checkout')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Voltar ao Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 