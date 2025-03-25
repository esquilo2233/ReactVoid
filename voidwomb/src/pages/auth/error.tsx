// pages/auth/error.tsx
import React from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const errorMessages: { [key: string]: string } = {
    Configuration: 'Erro de configuração do servidor. Por favor, tente novamente mais tarde.',
    AccessDenied: 'Acesso negado. Você não tem permissão para acessar esta página.',
    Verification: 'Link de verificação inválido ou expirado.',
    Default: 'Ocorreu um erro durante a autenticação. Por favor, tente novamente.',
    CredentialsSignin: 'Email ou senha incorretos. Verifique suas credenciais e tente novamente.',
    EmailSignin: 'Erro ao enviar email de autenticação. Tente novamente mais tarde.',
    OAuthSignin: 'Erro ao conectar com o provedor de autenticação. Tente novamente.',
    OAuthCallback: 'Erro ao processar a resposta do provedor de autenticação.',
    OAuthCreateAccount: 'Erro ao criar conta com o provedor de autenticação.',
    EmailCreateAccount: 'Erro ao criar conta. Tente novamente.',
    Callback: 'Erro ao processar a resposta de autenticação.',
    OAuthAccountNotLinked: 'Para confirmar sua identidade, faça login com o mesmo provedor que você usou originalmente.',
    EmailNotVerified: 'O email não foi verificado. Verifique sua caixa de entrada.',
    SessionRequired: 'Por favor, faça login para acessar esta página.',
  };

  const errorMessage = error ? errorMessages[error] || errorMessages.Default : errorMessages.Default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Erro de Autenticação
          </h2>
          <p className="mt-2 text-center text-sm text-red-600">
            {errorMessage}
          </p>
        </div>
        <div className="mt-8 text-center space-y-4">
          <Link
            href="/auth/login"
            className="block font-medium text-indigo-600 hover:text-indigo-500"
          >
            Voltar para o login
          </Link>
          <Link
            href="/"
            className="block font-medium text-gray-600 hover:text-gray-500"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
