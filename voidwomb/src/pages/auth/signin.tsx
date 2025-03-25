// pages/auth/signin.tsx
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: `${window.location.origin}/Adm/Home`,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push('/Adm/Home');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center py-48">
      <div className="w-full max-w-md p-8">
        <h2 className="text-4xl font-bold text-center text-white mb-12">Sign In</h2>
        {error && <div className="text-red-500 text-center mb-8">{error}</div>}
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 bg-transparent border border-white rounded-lg focus:ring-1 focus:ring-white text-white placeholder-gray-400"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 bg-transparent border border-white rounded-lg focus:ring-1 focus:ring-white text-white placeholder-gray-400"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-6 py-3 text-white border border-white rounded-lg hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-1 focus:ring-white transition duration-200"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
