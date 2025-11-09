import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface UserData {
  id: number;
  email: string;
  name: string;
  phone?: string;
  address?: string;
}

export default function ClientArea() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      
      if (!token) {
        router.push('/auth/signin');
        return;
      }

      setIsAuthenticated(true);
      
      // Buscar dados do usuário
      const fetchUserData = async () => {
        try {
          const userId = localStorage.getItem('user_id');
          const response = await fetch(`/api/users/${userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data);
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchUserData();
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_email');
    localStorage.removeItem('is_staff');
    document.cookie = 'auth_token=; path=/; max-age=0';
    router.push('/');
  };

  if (!isAuthenticated || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Área de Cliente</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
            >
              Sair
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informações do Usuário */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Informações Pessoais</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Nome</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">{user?.name || 'Não informado'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">{user?.email || 'Não informado'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Telefone</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">{user?.phone || 'Não informado'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Endereço</p>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">{user?.address || 'Não informado'}</p>
                </div>
              </div>
              <Link
                href="/client/edit"
                className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Editar Perfil
              </Link>
            </div>

            {/* Pedidos */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Meus Pedidos</h2>
              <p className="text-gray-600 dark:text-gray-400">Em breve você poderá ver seus pedidos aqui.</p>
            </div>

            {/* Favoritos */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Favoritos</h2>
              <p className="text-gray-600 dark:text-gray-400">Em breve você poderá ver seus produtos favoritos aqui.</p>
            </div>

            {/* Configurações */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Configurações</h2>
              <Link
                href="/client/settings"
                className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Configurações da Conta
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

