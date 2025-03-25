import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import AdminLayout from '@/components/Layout/AdminLayout';

interface Sale {
  id: number;
  user_id: number | null;
  guest_user_id: number | null;
  total_amount: number;
  status: string;
  created_at: string;
  user?: {
    email: string;
  };
  guest_user?: {
    email: string;
  };
}

export default function SalesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sales, setSales] = useState<Sale[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
      return;
    }

    const fetchSales = async () => {
      try {
        const response = await fetch('/api/admin/sales');
        if (!response.ok) throw new Error('Erro ao carregar vendas');
        const data = await response.json();
        setSales(data);
      } catch (error) {
        toast.error('Erro ao carregar vendas');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSales();
  }, [status, router]);

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/sales/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Erro ao atualizar status da venda');

      setSales(
        sales.map((sale) =>
          sale.id === id ? { ...sale, status: newStatus } : sale
        )
      );
      toast.success('Status da venda atualizado com sucesso');
    } catch (error) {
      toast.error('Erro ao atualizar status da venda');
    }
  };

  if (status === 'loading' || isLoading) {
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
          <h1 className="text-3xl font-bold text-gray-900">Vendas</h1>
        </div>

        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Cliente
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Valor Total
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Data
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Ações</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {sales.map((sale) => (
                      <tr key={sale.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          #{sale.id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {sale.user?.email || sale.guest_user?.email || 'N/A'}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          R$ {sale.total_amount.toFixed(2)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
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
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {new Date(sale.created_at).toLocaleDateString()}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            onClick={() =>
                              router.push(`/admin/sales/${sale.id}`)
                            }
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            Detalhes
                          </button>
                          {sale.status === 'pending' && (
                            <>
                              <button
                                onClick={() =>
                                  handleStatusChange(sale.id, 'completed')
                                }
                                className="text-green-600 hover:text-green-900 mr-4"
                              >
                                Concluir
                              </button>
                              <button
                                onClick={() =>
                                  handleStatusChange(sale.id, 'cancelled')
                                }
                                className="text-red-600 hover:text-red-900"
                              >
                                Cancelar
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 