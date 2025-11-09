// pages/auth/signin.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Login direto via API simples
      const response = await fetch('/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Email ou senha incorretos');
        setIsLoading(false);
        return;
      }

      // Salvar token no localStorage E como cookie
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user_id', data.user?.id || '');
        localStorage.setItem('user_email', data.user?.email || '');
        localStorage.setItem('is_staff', data.user?.is_staff ? 'true' : 'false');
        
        // Salvar também como cookie para o middleware acessar
        document.cookie = `auth_token=${data.token}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax`;
      }

      // Redirecionar
      if (data.user?.is_staff) {
        router.push('/admin');
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Erro ao conectar com o servidor. Tente novamente.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center py-48">
      <div className="w-full max-w-md p-8">
        <h2 className="text-4xl font-bold text-center text-white mb-12 drop-shadow-lg">Sign In</h2>
        {error && (
          <div className={`text-center mb-8 p-3 rounded-lg border ${
            error.includes('sucesso') 
              ? 'text-green-300 bg-green-900 bg-opacity-50 border-green-700' 
              : 'text-red-300 dark:text-red-400 bg-red-900 bg-opacity-50 border border-red-700'
          }`}>
            {error}
          </div>
        )}
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2 drop-shadow-md">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={isLoading}
                className="w-full px-4 py-3 bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 backdrop-blur-sm border border-white border-opacity-30 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2 drop-shadow-md">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                disabled={isLoading}
                className="w-full px-4 py-3 bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 backdrop-blur-sm border border-white border-opacity-30 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 text-white bg-white bg-opacity-20 dark:bg-gray-800 dark:bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 hover:bg-opacity-30 dark:hover:bg-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Entrando...' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
