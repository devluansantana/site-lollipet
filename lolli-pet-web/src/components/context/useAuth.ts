/**
 * Hook customizado para usar o AuthContext
 *
 * Uso:
 * const { user, isAuthenticated, login, logout } = useAuth();
 */

import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import type { AuthContextType } from './AuthContext';

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
}
