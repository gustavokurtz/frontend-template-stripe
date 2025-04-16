'use client';

import { useRouter } from 'next/navigation';
import { saveToken } from '@/lib/auth';
import { useState } from 'react';
import axios from 'axios';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const res = await axios.post('http://localhost:3000/auth/login', {
      email,
      password,
    });
  
    const token = res.data.token;
    saveToken(token);
  
    // agora vamos consultar /auth/me
    try {
      const userRes = await axios.get('http://localhost:3000/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (userRes.data.isPaid) {
        router.replace('/dashboard'); // já pagou, vai pro premium
      } else {
        router.replace('/welcome'); // ainda não pagou, vai pro início
      }
    } catch (err) {
      console.error('Erro ao verificar usuário:', err);
      router.replace('/login'); // fallback em caso de erro
    }
  };

  const RollBackRegister = () => {
    router.replace('/register');
  }
  

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 block mb-2"
      />
      <input
        placeholder="senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 block mb-2"
      />
      <button onClick={login} className="bg-blue-500 text-white px-4 py-2">
        Entrar
      </button>
      <button onClick={RollBackRegister}>Voltar para o registro</button>
    </div>
  );
}
