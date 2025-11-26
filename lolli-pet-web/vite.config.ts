import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    port: 5173,
    proxy: {
      // Qualquer requisição que comece com /api (ex: /api/pets, /api/users)
      '/api': {
        // TARGET CORRIGIDO: Usando o nome do serviço Docker 'api' e a porta 3001
        target: 'http://api:3001', 
        
        changeOrigin: true, 
        secure: false,      
        // O 'rewrite' remove o '/api' antes de enviar para o backend
        rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    },
  },
});