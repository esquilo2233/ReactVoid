import React, { useState } from 'react';
import { supabase } from '../_app';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify'; // Importe os componentes da react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Importe o CSS da react-toastify

function LoginForm() {
  const router = useRouter(); // Instância do useRouter
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Verifica se o usuário existe na tabela de usuários
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error) {
        throw error;
      }

      if (!user || user.password !== password) {
        throw new Error('Credenciais inválidas');
      }

      if (!user.is_staff) {
        throw new Error('Usuário não autorizado');
      }

      // Redireciona para outra página se o login for bem-sucedido e o usuário for autorizado
      router.push('/Adm/Home');

      // Exibe um toast de sucesso
      toast.success('Login bem-sucedido!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      // Exibe um toast de erro
      toast.error('Erro ao autenticar usuário: ' + error, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default LoginForm;