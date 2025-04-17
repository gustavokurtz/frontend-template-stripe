'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { CheckCircle, XCircle, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

export default function SuccessPage() {
  const [status, setStatus] = useState<'verificando' | 'pago' | 'nao_pago'>('verificando');
  const router = useRouter();

  const handleDashboard = () => {
    router.replace('/dashboard');
  };

  useEffect(() => {
    const token = getToken();
    if (!token) return router.replace('/login');

    const checkPaymentStatus = async () => {
      try {
        const res = await axios.get('http://localhost:3000/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        // Simular um pequeno atraso para melhor experiência UX
        setTimeout(() => {
          setStatus(res.data.isPaid ? 'pago' : 'nao_pago');
        }, 1000);
      } catch (error) {
        console.error('Erro ao verificar pagamento:', error);
        setStatus('nao_pago');
      }
    };

    checkPaymentStatus();
  }, [router]);

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
              Status do Pagamento
            </CardTitle>
          </CardHeader>
          
          <CardContent className="px-8 pb-8 text-center">
            {status === 'verificando' ? (
              <div className="py-8">
                <Loader2 className="mx-auto h-12 w-12 text-indigo-600 animate-spin mb-4" />
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  Verificando informações de pagamento...
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Isto pode levar alguns instantes.
                </p>
              </div>
            ) : status === 'pago' ? (
              <div className="py-8">
                <div className="relative mx-auto h-24 w-24 mb-6">
                  <div className="absolute inset-0 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                  Pagamento Confirmado!
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xs mx-auto">
                  Seu pagamento foi processado com sucesso. Agora você tem acesso completo à plataforma.
                </p>
                
                <div className="flex flex-col gap-4">
                  <Button 
                    onClick={handleDashboard} 
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl py-3 shadow-lg shadow-indigo-500/20 transition-all duration-300"
                  >
                    Acessar o Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  
                  <Link href="#" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                    Ver detalhes da compra
                  </Link>
                </div>
              </div>
            ) : (
              <div className="py-8">
                <div className="relative mx-auto h-24 w-24 mb-6">
                  <div className="absolute inset-0 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <XCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
                  Pagamento Não Confirmado
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xs mx-auto">
                  Houve um problema ao verificar seu pagamento. Por favor, tente novamente ou entre em contato com o suporte.
                </p>
                
                <div className="flex flex-col gap-4">
                  <Button 
                    onClick={() => router.push('/welcome')} 
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl py-3 shadow-lg shadow-indigo-500/20 transition-all duration-300"
                  >
                    Tentar Novamente
                  </Button>
                  
                  <Link href="/support" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                    Contatar Suporte
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          <ShieldCheck className="h-4 w-4 mr-2" /> 
          Transações seguras com criptografia de ponta a ponta
        </div>
      </div>
    </div>
  );
}