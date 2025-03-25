import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { toast } from 'react-toastify';
import AdminLayout from '@/components/Layout/AdminLayout';

interface SaleItem {
  id: number;
  product_id: number;
  quantity: number;
  price: number;
  product: {
    name: string;
    image_url: string;
  };
}

interface Sale {
  id: number;
  user_id: number | null;
  guest_user_id: number | null;
  total_amount: number;
  status: string;
  created_at: string;
  user?: {
    email: string;
    name: string;
  };
  guest_user?: {
    email: string;
    name: string;
  };
  sale_items: SaleItem[];
}

export default function SaleDetailsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const [sale, setSale] = useState<Sale | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id && typeof id === 'string') {
      const fetchSale = async () => {
        try {
          const response = await fetch(`/api/admin/sales/${id}`);
          if (!response.ok) throw new Error('Erro ao carregar venda');
          const data = await response.json();
          setSale(data);
        } catch (error) {
          toast.error('Erro ao carregar venda');
          router.push('/admin/sales');
        } finally {
          setIsLoading(false);
        }
      };

      fetchSale();
    }
  }, [id, router]);

  const handleStatusChange = async (newStatus: string) => {
    if (!sale) return;

    try {
      const response = await fetch(`/api/admin/sales/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Erro ao atualizar status da venda');

      setSale({ ...sale, status: newStatus });
      toast.success('Status da venda atualizado com sucesso');
    } catch (error) {
      toast.error('Erro ao atualizar status da venda');
    }
  };

  if (status === 'unauthenticated') {
    router.push('/auth/login');
    return null;
  }

  if (isLoading || !sale) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Detalhes da Venda #{sale.id}
            </h1>
            <button
              onClick={() => router.push('/admin/sales')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Voltar
            </button>
          </div>
        </div>

        <div className="mt-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Informações da Venda
              </h3>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        sale.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : sale.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {sale.status === 'completed'
                        ? 'Concluída'
                        : sale.status === 'pending'
                        ? 'Pendente'
                        : 'Cancelada'}
                    </span>
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Cliente</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {sale.user?.name || sale.guest_user?.name || 'N/A'}
                    <br />
                    {sale.user?.email || sale.guest_user?.email || 'N/A'}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Data da Venda
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {new Date(sale.created_at).toLocaleDateString()}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Valor Total
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    R$ {sale.total_amount.toFixed(2)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Itens da Venda
            </h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Produto
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Quantidade
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Preço Unitário
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sale.sale_items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <Image
                              className="h-10 w-10 rounded-full object-cover"
                              src={item.product.image_url}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {item.product.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.quantity}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          R$ {item.price.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {sale.status === 'pending' && (
            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => handleStatusChange('completed')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Concluir Venda
              </button>
              <button
                onClick={() => handleStatusChange('cancelled')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Cancelar Venda
              </button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
} 