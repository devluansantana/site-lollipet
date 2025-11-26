/**
 * AuthContext - Gerencia o estado de autenticação da aplicação
 *
 * Responsabilidades:
 * - Manter estado do usuário logado
 * - Fornecer funções de login/logout
 * - Verificar se usuário está autenticado
 * - Persistir sessão no localStorage
 */

import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import * as api from '../../services/api';
import type { AuthResponse } from '../../services/api';

/**
 * Interface para os dados do usuário
 */
export interface User {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
}

/**
 * Interface para o contexto de autenticação
 */
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (nome: string, email: string, password: string, telefone?: string) => Promise<void>;
  logout: () => void;
}

/**
 * Contexto de autenticação
 */
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provider do contexto de autenticação
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Ao carregar o componente, verifica se há um usuário salvo no localStorage
  useEffect(() => {
    const loadUser = () => {
      try {
        const savedUser = api.getUser();
        const token = api.getToken();

        if (savedUser && token) {
          console.log('[AuthContext] Usuário encontrado no localStorage:', savedUser.email);
          setUser(savedUser);
        } else {
          console.log('[AuthContext] Nenhum usuário autenticado encontrado');
        }
      } catch (error) {
        console.error('[AuthContext] Erro ao carregar usuário:', error);
        // Em caso de erro, limpa os dados corrompidos
        api.logout();
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  /**
   * Faz login do usuário
   *
   * @param email - Email do usuário
   * @param password - Senha do usuário
   */
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      console.log('[AuthContext] Iniciando login para:', email);

      // Chama a API de login
      const response: AuthResponse = await api.login({ email, password });

      console.log('[AuthContext] Login bem-sucedido! Usuário:', response.user.nome);

      // Atualiza o estado com os dados do usuário
      setUser(response.user);
    } catch (error) {
      console.error('[AuthContext] Erro no login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Registra um novo usuário
   *
   * @param nome - Nome completo
   * @param email - Email
   * @param password - Senha
   * @param telefone - Telefone (opcional)
   */
  const signup = async (
    nome: string,
    email: string,
    password: string,
    telefone?: string
  ): Promise<void> => {
    setIsLoading(true);
    try {
      console.log('[AuthContext] Iniciando cadastro para:', email);

      // Chama a API de signup
      const response: AuthResponse = await api.signup({
        nome,
        email,
        password,
        telefone,
      });

      console.log('[AuthContext] Cadastro bem-sucedido! Usuário:', response.user.nome);

      // Atualiza o estado com os dados do usuário
      setUser(response.user);
    } catch (error) {
      console.error('[AuthContext] Erro no cadastro:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Faz logout do usuário
   */
  const logout = (): void => {
    console.log('[AuthContext] Fazendo logout do usuário:', user?.email);

    // Limpa os dados do localStorage
    api.logout();

    // Limpa o estado
    setUser(null);

    console.log('[AuthContext] Logout concluído');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
