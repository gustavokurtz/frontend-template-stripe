'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import { saveToken } from '@/lib/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async () => {
    const res = await axios.post('http://localhost:3000/auth/register', form);
    saveToken(res.data.token);
    router.replace('/welcome'); // redireciona para página pública após login
  };
  

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Criar conta</h1>
      <input
        placeholder="Nome"
        name="name"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        placeholder="Email"
        name="email"
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        placeholder="Senha"
        name="password"
        type="password"
        onChange={handleChange}
        className="border p-2 w-full mb-4"
      />
      <button onClick={register} className="bg-blue-500 text-white w-full p-2 rounded">
        Criar conta
      </button>
    </div>
  );
}
