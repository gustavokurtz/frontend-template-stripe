// Dashboard Page
'use client';

import { logout } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LogOut, 
  Package, 
  Users, 
  BarChart, 
  ArrowUpRight, 
  Bell, 
  Clock, 
  Calendar,
  Settings,
  User,
  Menu,
  X
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-gray-950/80 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="font-bold text-xl bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                QuantumSaaS
              </span>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex ml-10 space-x-8">
                <Link href="/dashboard" className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  Dashboard
                </Link>
                <Link href="#analytics" className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                  Analytics
                </Link>
                <Link href="#projects" className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                  Projects
                </Link>
                <Link href="#settings" className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                  Settings
                </Link>
              </div>
            </div>
            
            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <Bell className="h-5 w-5" />
              </button>
              <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <User className="h-5 w-5" />
              </button>
              <Button onClick={handleLogout} variant="ghost" size="sm" className="hidden md:flex items-center text-gray-700 dark:text-gray-300">
                <LogOut className="h-4 w-4 mr-2" />
                <span>Sair</span>
              </Button>
              
              {/* Mobile menu button */}
              <button
                className="md:hidden text-gray-700 dark:text-gray-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 dark:text-indigo-400">
                Dashboard
              </Link>
              <Link href="#analytics" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Analytics
              </Link>
              <Link href="#projects" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Projects
              </Link>
              <Link href="#settings" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span>Sair</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Nova ação
          </Button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Usuários Ativos
                </h3>
                <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                  <Users className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">1,250</span>
                <span className="ml-2 text-sm font-medium text-green-500 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  12%
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Comparado ao mês anterior</p>
            </CardContent>
          </Card>

          <Card className="border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Armazenamento
                </h3>
                <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                  <Package className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">500 GB</span>
                <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">/ 1 TB</span>
              </div>
              <div className="mt-2 h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 dark:bg-indigo-400 rounded-full" style={{ width: '50%' }}></div>
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">50% do total utilizado</p>
            </CardContent>
          </Card>

          <Card className="border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Desempenho
                </h3>
                <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                  <BarChart className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">98.3%</span>
                <span className="ml-2 text-sm font-medium text-green-500 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  5%
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Tempo de atividade este mês</p>
            </CardContent>
          </Card>

          <Card className="border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Tempo Online
                </h3>
                <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">42h</span>
                <span className="ml-2 text-sm font-medium text-orange-500 flex items-center">
                  90%
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Esta semana</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
              <CardHeader className="bg-white dark:bg-gray-950 px-6 py-5 border-b border-gray-200 dark:border-gray-800">
                <CardTitle className="text-lg font-medium">Atividade Recente</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-start space-x-4">
                      <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">Nome do Usuário</h4>
                          <span className="text-xs text-gray-500 dark:text-gray-400">2h atrás</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Realizou uma ação importante no sistema.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
              <CardHeader className="bg-white dark:bg-gray-950 px-6 py-5 border-b border-gray-200 dark:border-gray-800">
                <CardTitle className="text-lg font-medium">Análise de Desempenho</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-64 w-full bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Visualização do gráfico</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <Card className="border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
              <CardHeader className="bg-white dark:bg-gray-950 px-6 py-5 border-b border-gray-200 dark:border-gray-800">
                <CardTitle className="text-lg font-medium">Próximos Eventos</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-md bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Nome do Evento</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Amanhã às 14:00
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
              <CardHeader className="bg-white dark:bg-gray-950 px-6 py-5 border-b border-gray-200 dark:border-gray-800">
                <CardTitle className="text-lg font-medium">Configurações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Settings className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Notificações</span>
                    </div>
                    <div className="h-5 w-10 bg-gray-200 dark:bg-gray-700 rounded-full relative">
                      <div className="h-5 w-5 rounded-full bg-indigo-600 absolute right-0"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Settings className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Modo escuro</span>
                    </div>
                    <div className="h-5 w-10 bg-gray-200 dark:bg-gray-700 rounded-full relative">
                      <div className="h-5 w-5 rounded-full bg-indigo-600 absolute right-0"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Settings className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Backup automático</span>
                    </div>
                    <div className="h-5 w-10 bg-gray-200 dark:bg-gray-700 rounded-full relative">
                      <div className="h-5 w-5 rounded-full bg-gray-400 absolute left-0"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}