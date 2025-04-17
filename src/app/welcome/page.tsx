'use client';

import { decodeToken, getToken, logout } from '@/lib/auth';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CreditCard, LogOut, Lightbulb, Zap, CheckCircle, ChevronRight, Shield, BarChart } from 'lucide-react';
import Link from 'next/link';

export default function WelcomePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    const decoded = decodeToken();
    
    if (!decoded) {
      router.replace('/login');
    } else {
      // Buscar informações adicionais do usuário
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get('http://localhost:3000/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          
          setUser({
            ...decoded,
            ...response.data
          });
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
          setUser(decoded);
        }
      };
      
      fetchUserInfo();
    }
  }, [router]);

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  const goToStripe = async () => {
    setLoading(true);
    const token = getToken();
    
    if (!token || !user) {
      router.replace('/login');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/pay/checkout',
        {
          userId: user.sub,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      window.location.href = response.data.url;
    } catch (error) {
      console.error('Erro ao ir para o checkout:', error);
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Carregando informações...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-bold text-xl bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            QuantumSaaS
          </span>
          <h1 className="mt-6 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
            Bem-vindo, {user.name || 'Usuário'}!
          </h1>
          <p className="mt-3 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Você está a um passo de desbloquear o potencial da nossa plataforma
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
            <CardContent className="p-8">
              <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-6">
                <Lightbulb className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Conteúdo Premium</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Acesse relatórios exclusivos, análises avançadas e insights estratégicos para seu negócio.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
            <CardContent className="p-8">
              <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Automação Avançada</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Configure fluxos de trabalho personalizados que aumentam a produtividade da sua equipe.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
            <CardContent className="p-8">
              <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-6">
                <BarChart className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Analytics Detalhados</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Visualize métricas importantes e tome decisões baseadas em dados concretos.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="border border-gray-100 dark:border-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8">
            <CardTitle className="text-2xl font-bold mb-2">Desbloqueie Todo o Potencial</CardTitle>
            <CardDescription className="text-indigo-100 opacity-90">
              Assine agora e transforme a maneira como sua empresa trabalha
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8">
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">Acesso ilimitado a todas as ferramentas e recursos</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">Suporte prioritário 24/7 para sua equipe</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">Integrações avançadas com outras plataformas</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">Atualizações contínuas com novos recursos</span>
              </li>
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={goToStripe} 
                disabled={loading}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-6 rounded-xl font-medium shadow-lg shadow-indigo-500/20 transition-all duration-300"
              >
                <CreditCard className="mr-2 h-5 w-5" />
                {loading ? 'Processando...' : 'Assinar Agora'}
                {!loading && <ChevronRight className="ml-2 h-5 w-5" />}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleLogout} 
                className="flex-1 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 py-6 rounded-xl font-medium transition-all duration-300"
              >
                <LogOut className="mr-2 h-5 w-5" />
                Sair da Conta
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          <Shield className="h-4 w-4 mr-2" /> 
          Seus dados estão protegidos com criptografia de nível empresarial
        </div>
      </div>
    </div>
  );
}