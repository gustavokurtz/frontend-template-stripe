'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const [status, setStatus] = useState<'verificando' | 'pago' | 'nao_pago'>('verificando');
  const router = useRouter();

  const handleDashboard = () => {
    router.replace('/dashboard')
  }

  useEffect(() => {
    const token = getToken();
    if (!token) return router.replace('/login');

    axios
      .get('http://localhost:3000/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setStatus(res.data.isPaid ? 'pago' : 'nao_pago');
      })
      .catch(() => setStatus('nao_pago'));
  }, []);

  if (status === 'verificando') return <p>Verificando pagamento...</p>;

  return status === 'pago' ? (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-600">✅ Pagamento confirmado!</h1>
      <p>Você agora tem acesso ao conteúdo premium 🎉</p>
      <button onClick={handleDashboard}>Ir para conteudo premium</button>
    </div>
  ) : (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-red-500">❌ Pagamento não confirmado</h1>
      <p>Você ainda não completou o pagamento. Tente novamente em /checkout</p>
    </div>
  );


}
