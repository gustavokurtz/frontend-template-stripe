'use client';

import { decodeToken, getToken, logout } from '@/lib/auth';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function WelcomePage() {
  const [user, setUser] = useState<{ sub: string} | null>(null);
  const router = useRouter();

  useEffect(() => {
    const decoded = decodeToken();
    if (!decoded) {
      router.replace('/login');
    } else {
      setUser(decoded);
    }
  }, []);

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  const goToStripe = async () => {
    const token = getToken();
    if (!token || !user) {
      router.replace('/login');
      return;
    }

    const response = await axios.post(
      'http://localhost:3000/pay/checkout',
      {
        userId: user.sub,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    window.location.href = response.data.url;
  };

  if (!user) return <p>Carregando...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Olá!</h1>
      <p className="mb-4">Bem-vindo! Aqui você pode escolher realizar seu pagamento agora:</p>

      <button
        onClick={goToStripe}
        className="bg-green-600 text-white px-4 py-2 rounded inline-block"
      >
        Ir para checkout
      </button>

      <button
        onClick={handleLogout}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
      >
        Sair
      </button>
    </div>
  );
}
