import { useContext } from 'react';
import { ThemeContext } from './theme-context-object';
import { type ThemeContextProps } from './contextTypes'; // <--- Adicionando importação do tipo

export const useTheme = (): ThemeContextProps => {
  // <--- Tipagem do retorno
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }

  return context;
};
