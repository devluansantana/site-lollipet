/**
 * ProtectedRoute - Componente para proteger rotas que requerem autenticação
 *
 * Funcionalidades:
 * - Verifica se o usuário está autenticado
 * - Redireciona para /login se não estiver autenticado
 * - Mostra loading enquanto verifica autenticação
 * - Renderiza o conteúdo da rota se estiver autenticado
 */

import { Navigate } from 'react-router-dom';
import { useAuth } from './context/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  // Mostra loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Verificando autenticação...
          </p>
        </div>
      </div>
    );
  }

  // Se não estiver autenticado, redireciona para login
  if (!isAuthenticated) {
    console.log('[ProtectedRoute] Usuário não autenticado. Redirecionando para /login');
    return <Navigate to="/login" replace />;
  }

  // Se estiver autenticado, renderiza o conteúdo
  console.log('[ProtectedRoute] Usuário autenticado. Renderizando rota protegida.');
  return <>{children}</>;
}
