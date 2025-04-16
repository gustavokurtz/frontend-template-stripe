'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { getToken } from '@/lib/auth';

export default function Protected({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace('/login');
      return;
    }

    axios
      .get('http://localhost:3000/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (!res.data.isPaid) {
          router.replace('/checkout');
        } else {
          setLoading(false);
        }
      })
      .catch(() => router.replace('/login'));
  }, []);

  if (loading) return <p>Carregando...</p>;

  return <>{children}</>;
}
