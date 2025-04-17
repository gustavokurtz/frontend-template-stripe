'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import { saveToken } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = async () => {
    setError(null);
    setIsSubmitting(true);
    
    try {
      const res = await axios.post('http://localhost:3000/auth/register', form);
      saveToken(res.data.token);
      router.replace('/welcome');
    } catch (error: any) {
      console.error('Erro ao registrar:', error);
      setError(
        error.response?.data?.message || 
        'Ocorreu um erro ao criar sua conta. Tente novamente.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="font-bold text-xl bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            QuantumSaaS
          </span>
        </div>
        
        <Card className="border border-gray-100 dark:border-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <CardHeader className="pb-6 pt-8 px-8">
            <CardTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
              Crie sua conta
            </CardTitle>
            <CardDescription className="text-center text-gray-600 dark:text-gray-400 mt-2">
              Comece a otimizar seus processos hoje
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-6 flex items-start" role="alert">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 dark:text-gray-300 flex items-center text-sm font-medium">
                  <User className="mr-2 h-4 w-4" /> Nome completo
                </Label>
                <Input
                  id="name"
                  placeholder="Digite seu nome completo"
                  name="name"
                  onChange={handleChange}
                  className="h-11 rounded-lg border-gray-200 dark:border-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 flex items-center text-sm font-medium">
                  <Mail className="mr-2 h-4 w-4" /> Email
                </Label>
                <Input
                  id="email"
                  placeholder="seu@email.com"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  className="h-11 rounded-lg border-gray-200 dark:border-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300 flex items-center text-sm font-medium">
                  <Lock className="mr-2 h-4 w-4" /> Senha
                </Label>
                <Input
                  id="password"
                  placeholder="Crie uma senha segura"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="h-11 rounded-lg border-gray-200 dark:border-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              
              <Button 
                onClick={register} 
                disabled={isSubmitting || !form.name || !form.email || !form.password}
                className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium shadow-lg shadow-indigo-500/20 transition-all duration-300"
              >
                {isSubmitting ? 'Processando...' : 'Criar minha conta'}
                {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Já tem uma conta?{' '}
                  <Link href="/login" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium">
                    Faça login
                  </Link>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Ao criar uma conta, você concorda com nossos{' '}
          <Link href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            Termos de Serviço
          </Link>{' '}
          e{' '}
          <Link href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            Política de Privacidade
          </Link>
        </p>
      </div>
    </div>
  );
}