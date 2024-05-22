// pages/auth/signout.tsx
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const SignOut = () => {
  const router = useRouter();

  useEffect(() => {
    // Realiza o logout e redireciona para a página inicial após 3 segundos
    signOut({ redirect: false });
    const timer = setTimeout(() => {
      router.push('/');
    }, 3000);

    return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">You have been signed out</h2>
        <p className="text-center">You will be redirected to the homepage shortly.</p>
      </div>
    </div>
  );
};

export default SignOut;
