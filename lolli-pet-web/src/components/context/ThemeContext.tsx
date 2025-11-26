// src/components/context/ThemeContext.tsx

import React, { useState, useEffect, useMemo } from 'react';
import { type ReactNode } from 'react';
import { ThemeContext } from './theme-context-object';
import { type ThemeContextProps } from './contextTypes';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Inicializa o estado lendo do Local Storage
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' ? 'dark' : 'light';
  });

  // 1. CORREÇÃO DE DARK MODE: setAttribute
  useEffect(() => {
    // Garante que o código rode apenas no lado do cliente
    if (typeof globalThis === 'undefined') return;
    console.log('APLICANDO TEMA:', theme); // <<< Adicione esta linha

    // Se este console.log aparecer (como em),
    // o JS está funcionando; o problema é CSS/compilação.
    // console.log('APLICANDO TEMA:', theme);

    const root = globalThis.document.documentElement; // A tag <html>

    // setAttribute resolve o erro de classes conflitantes.
    root.setAttribute('class', theme);

    // Salva o tema no Local Storage para persistência
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // 2. CORREÇÃO DE ESCOPO: Define contextValue antes do retorno
  const contextValue: ThemeContextProps = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
