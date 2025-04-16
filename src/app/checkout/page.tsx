'use client';

import { useRouter } from 'next/navigation';
import { decodeToken, getToken } from '@/lib/auth';
import axios from 'axios';

export default function CheckoutPage() {
  const router = useRouter();

  const goToStripe = async () => {
    const token = getToken();
    if (!token) {
      router.replace('/login');
      return;
    }

    const decoded = decodeToken();
    if (!decoded) {
      router.replace('/login');
      return;
    }

    const response = await axios.post(
      'http://localhost:3000/pay/checkout',
      {
        email: decoded.email,
        userId: decoded.sub,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    window.location.href = response.data.url;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pagamento</h1>
      <p className="mb-4">Clique no botão abaixo para realizar o pagamento:</p>
      <button
        onClick={goToStripe}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Ir para checkout
      </button>
    </div>
  );
}
