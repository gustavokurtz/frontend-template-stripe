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
  
    saveToken(res.data.token);
    router.replace('/welcome'); // nova rota sem proteção
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
