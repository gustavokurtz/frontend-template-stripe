'use client';

import { decodeToken, logout } from '@/lib/auth';
import { useRouter } from 'next/navigation'; // ✅ CERTO no App Router


export default function WelcomePage() {
  const user = decodeToken();

  const router = useRouter();
  
    const handleLogout = () => {
      logout();
      router.replace('/login');
    };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Olá, {user?.email}</h1>
      <p className="mb-4">Bem-vindo! Aqui você pode escolher realizar seu pagamento agora:</p>

      <a
        href="/checkout"
        className="bg-green-600 text-white px-4 py-2 rounded inline-block"
      >
        Ir para checkout
      </a>

      <button onClick={handleLogout} className="mt-4 bg-red-600 text-white px-4 py-2 rounded">
        Sair
      </button>
    </div>
  );
}
