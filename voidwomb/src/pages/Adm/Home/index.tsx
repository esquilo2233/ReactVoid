import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../../utils/SupabaseService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdmHome() {
  return (
    <div>
      <div>Esta é a página do carrinho.</div>
      <div>Bem-vindo!</div>
    </div>
  );
}

export default AdmHome;
