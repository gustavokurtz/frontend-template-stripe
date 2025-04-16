'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/lib/auth';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace('/register');
    } else {
      router.replace('/dashboard');
    }
  }, []);

  return <p>Redirecionando...</p>;
}
