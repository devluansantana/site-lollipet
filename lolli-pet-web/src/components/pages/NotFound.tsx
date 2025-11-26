import { Dog, Home, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    // Fundo: Adapta-se ao modo claro/escuro
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-150px)] py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-500'>
      <div className='p-10 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-t-8 border-pink-500 max-w-lg w-full text-center transition-all duration-300 hover:shadow-pink-100 dark:hover:shadow-pink-900/50'>
        <div className='flex justify-center items-center mb-6 text-pink-600'>
          <AlertTriangle
            size={50}
            className='mr-4 text-yellow-500 dark:text-yellow-400'
          />
          <span className='text-8xl font-extrabold text-pink-600 dark:text-pink-400'>
            404
          </span>
        </div>

        {/* Título: Adapta-se ao modo escuro */}
        <h1 className='text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3'>
          Ops! Essa página fugiu!
        </h1>
        {/* Parágrafo: Adapta-se ao modo escuro */}
        <p className='text-lg text-gray-600 dark:text-gray-400 mb-8'>
          O endereço que você tentou acessar não foi encontrado. Talvez um dos
          nossos pets tenha levado o caminho!
        </p>

        {/* Ícone (Mão na roda para o visual) */}
        <Dog
          size={60}
          className='text-cyan-500 dark:text-cyan-400 mx-auto mb-8 animate-bounce-slow'
        />

        {/* Link para a Home */}
        <Link
          to='/'
          className='inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-semibold rounded-full shadow-md text-white bg-pink-500 hover:bg-pink-600 transition duration-300 ease-in-out transform hover:scale-105'
        >
          <Home size={20} className='mr-2' />
          Voltar para a Home
        </Link>
      </div>
    </div>
  );
}
