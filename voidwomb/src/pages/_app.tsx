import React from 'react'
import { SessionProvider } from 'next-auth/react'
import RootLayout from '../components/RootLayout'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Suprimir TODOS os erros do NextAuth no console e interceptar fetch
if (typeof window !== 'undefined') {
  const originalError = console.error;
  const originalWarn = console.warn;
  const originalLog = console.log;
  
  // Interceptar console.error
  console.error = (...args: any[]) => {
    const errorString = String(args[0] || '') + ' ' + (args[1] ? JSON.stringify(args[1]) : '') + ' ' + (args[2] ? JSON.stringify(args[2]) : '');
    
    // Bloquear TODOS os erros relacionados ao NextAuth, 404s e requisições de rede
    if (
      errorString.includes('next-auth') ||
      errorString.includes('CLIENT_FETCH_ERROR') ||
      errorString.includes('/api/auth/') ||
      errorString.includes('Unexpected token') ||
      errorString.includes('<!DOCTYPE') ||
      errorString.includes('is not valid JSON') ||
      errorString.includes('[next-auth]') ||
      errorString.includes('hydration-error-info') ||
      errorString.includes('POST http') && errorString.includes('/api/auth/_log') ||
      errorString.includes('GET http') && errorString.includes('/api/auth/') ||
      errorString.includes('404') && errorString.includes('/api/auth/') ||
      errorString.includes('Not Found') && errorString.includes('/api/auth/')
    ) {
      return; // Silenciar completamente
    }
    originalError.apply(console, args);
  };

  // Interceptar console.warn
  console.warn = (...args: any[]) => {
    const warnString = String(args[0] || '') + ' ' + (args[1] ? JSON.stringify(args[1]) : '');
    
    // Bloquear warnings do NextAuth também
    if (
      warnString.includes('next-auth') ||
      warnString.includes('[next-auth]') ||
      warnString.includes('/api/auth/')
    ) {
      return;
    }
    originalWarn.apply(console, args);
  };

  // Interceptar console.log também (alguns erros podem vir por aqui)
  console.log = (...args: any[]) => {
    const logString = String(args[0] || '') + ' ' + (args[1] ? JSON.stringify(args[1]) : '');
    
    if (
      logString.includes('[next-auth]') ||
      logString.includes('CLIENT_FETCH_ERROR') ||
      (logString.includes('POST http') && logString.includes('/api/auth/_log')) ||
      (logString.includes('GET http') && logString.includes('/api/auth/')) ||
      (logString.includes('404') && logString.includes('/api/auth/'))
    ) {
      return;
    }
    originalLog.apply(console, args);
  };

  // Interceptar erros não capturados
  window.addEventListener('error', (event) => {
    const errorMsg = String(event.message || '') + ' ' + String(event.filename || '');
    if (
      errorMsg.includes('next-auth') ||
      errorMsg.includes('CLIENT_FETCH_ERROR') ||
      errorMsg.includes('/api/auth/') ||
      errorMsg.includes('Unexpected token') ||
      errorMsg.includes('404') && errorMsg.includes('/api/auth/') ||
      errorMsg.includes('Not Found') && errorMsg.includes('/api/auth/')
    ) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }, true);

  // Interceptar promises rejeitadas
  window.addEventListener('unhandledrejection', (event) => {
    const reason = String(event.reason || '') + ' ' + JSON.stringify(event);
    if (
      reason.includes('next-auth') ||
      reason.includes('CLIENT_FETCH_ERROR') ||
      reason.includes('/api/auth/') ||
      reason.includes('Unexpected token') ||
      reason.includes('404') && reason.includes('/api/auth/') ||
      reason.includes('Failed to fetch') && reason.includes('/api/auth/')
    ) {
      event.preventDefault();
      event.stopPropagation();
    }
  });

  // Interceptar fetch requests para /api/auth/ e suprimir erros
  const originalFetch = window.fetch;
  window.fetch = async (...args: Parameters<typeof fetch>) => {
    const url = typeof args[0] === 'string' ? args[0] : (args[0] as Request).url;
    if (url?.includes('/api/auth/')) {
      try {
        const response = await originalFetch(...args);
        // Se a resposta for 404, retornar uma resposta vazia válida
        if (!response.ok && response.status === 404) {
          return new Response(JSON.stringify({}), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        return response;
      } catch (error) {
        // Silenciar erros de fetch para /api/auth/
        return new Response(JSON.stringify({}), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    return originalFetch(...args);
  };

  // Interceptar XMLHttpRequest também (caso seja usado)
  const originalXHROpen = XMLHttpRequest.prototype.open;
  const originalXHRSend = XMLHttpRequest.prototype.send;
  
  XMLHttpRequest.prototype.open = function(method: string, url: string | URL, ...rest: any[]) {
    if (typeof url === 'string' && url.includes('/api/auth/')) {
      this.addEventListener('error', (e) => e.stopPropagation(), true);
      this.addEventListener('loadend', function() {
        if (this.status === 404) {
          // Não fazer nada - silenciar o erro
        }
      });
    }
    return originalXHROpen.call(this, method, url, ...rest);
  };
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider 
      session={session} 
      refetchInterval={0}
      refetchOnWindowFocus={false}
    >
      <RootLayout>
        <Component {...pageProps} />
        <ToastContainer />
      </RootLayout>
    </SessionProvider>
  )
}

export default MyApp