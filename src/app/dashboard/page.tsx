'use client';

import { logout } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Área Premium</h1>
      <p>Você tem acesso total! 🎉</p>

      <button onClick={handleLogout} className="mt-4 bg-red-600 text-white px-4 py-2 rounded">
        Sair
      </button>
    </div>
  );
}
