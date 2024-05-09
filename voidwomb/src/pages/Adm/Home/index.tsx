import React from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../_app';

function AdmHome() {
    const router = useRouter();

    // Verifica se o usuário não está autenticado e redireciona para a página de login
    if (!user) {
      router.push('/Adm');
      return null;
    }
  
    return (
      <div>
        <h1>Minha Página</h1>
        <p>Bem-vindo, {user.email}!</p>
      </div>
    );
  }
  
  export async function getServerSideProps(context) {
    // Obtém o cookie de autenticação do request
    const { user } = await supabase.auth.api.getUserByCookie(context.req);
  
    return {
      props: {
        user: user || null, // Passa o usuário para a página ou null se não estiver autenticado
      },
    };
  }


export default AdmHome;
