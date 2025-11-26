import { createContext } from 'react';
import { type ThemeContextProps } from './contextTypes';

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined,
);
