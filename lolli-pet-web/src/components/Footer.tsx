import {
  HeartPulseIcon,
  LaughIcon,
  UserRoundCheckIcon,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.svg'; // Importa a logo para o rodapé

export function Footer() {
  return (
    // Container principal: Adiciona transição de cor para suavidade
    <div className='w-full transition-colors duration-500'>
      {/* 1. Seção de Valores */}
      {/*  Fundo, borda e transição para Dark Mode */}
      <section className='bg-gray-50 dark:bg-gray-900 py-12 px-5 border-t border-yellow-300 dark:border-yellow-600 transition-colors duration-500'>
        <div className='max-w-7xl mx-auto'>
          {/* Título: Cores Light e Dark */}
          <h2 className='text-3xl font-bold text-center text-cyan-700 dark:text-cyan-400 mb-10'>
            Por que escolher a Lolli Pet?
          </h2>

          {/* Cards de Valor */}
          <div className='grid md:grid-cols-3 gap-8 text-center'>
            {/* Card 1 */}
            {/*  Fundo, sombra e borda adaptados */}
            <article className='p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-t-8 border-cyan-500 dark:border-cyan-600 text-center transform hover:shadow-cyan-300/50 dark:hover:shadow-cyan-800/50 hover:shadow-xl transition duration-300'>
              {/* Ícone: Fundo e Cor adaptados */}
              <span className='inline-flex items-center justify-center p-3 rounded-full bg-pink-100 dark:bg-pink-900 mb-4'>
                <HeartPulseIcon
                  className='text-pink-600 dark:text-pink-300'
                  size={30}
                />
              </span>
              {/* Texto: Cores Light e Dark */}
              <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2'>
                Cuidado e Paixão
              </h3>
              {/* Parágrafo: Cores Light e Dark */}
              <p className='text-gray-500 dark:text-gray-400 text-sm'>
                Tratamento carinhoso e dedicado, como seu pet merece.
              </p>
            </article>

            {/* Card 2 */}
            <article className='p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-t-8 border-pink-500 dark:border-pink-600 text-center transform hover:shadow-pink-300/50 dark:hover:shadow-pink-800/50 hover:shadow-xl transition duration-300'>
              <span className='inline-flex items-center justify-center p-3 rounded-full bg-cyan-100 dark:bg-cyan-900 mb-4'>
                <UserRoundCheckIcon
                  className='text-cyan-600 dark:text-cyan-300'
                  size={30}
                />
              </span>
              <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2'>
                Profissionais Qualificados
              </h3>
              <p className='text-gray-500 dark:text-gray-400 text-sm'>
                Veterinários e Esteticistas com vasta experiência e expertise.
              </p>
            </article>

            {/* Card 3 */}
            <article className='p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-t-8 border-yellow-500 dark:border-yellow-600 text-center transform hover:shadow-yellow-300/50 dark:hover:shadow-yellow-800/50 hover:shadow-xl transition duration-300'>
              <span className='inline-flex items-center justify-center p-3 rounded-full bg-yellow-100 dark:bg-yellow-900 mb-4'>
                <LaughIcon
                  className='text-yellow-600 dark:text-yellow-300'
                  size={30}
                />
              </span>
              <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2'>
                Ambiente Confortável
              </h3>
              <p className='text-gray-500 dark:text-gray-400 text-sm'>
                Um espaço seguro e acolhedor para a total tranquilidade do seu
                pet.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 2. Rodapé de Contato/Copyright */}
      {/*  Fundo e Texto principal do rodapé adaptados */}
      <footer className='bg-gray-800 dark:bg-gray-950 text-white dark:text-gray-300 py-8 px-5 transition-colors duration-500'>
        {/* Borda de separação adaptada */}
        <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-700 dark:border-gray-600 pb-6 mb-6'>
          {/* Coluna 1: Links Rápidos */}
          <div>
            <h4 className='text-lg font-bold text-yellow-400 mb-4'>
              Navegação Rápida
            </h4>
            <ul className='space-y-2 text-sm'>
              <li>
                {/* Links: Hover adaptado */}
                <Link
                  to='/agendamento-clinico'
                  className='hover:text-pink-400 dark:hover:text-pink-300 transition'
                >
                  Agendamento Clínico
                </Link>
              </li>
              <li>
                <Link
                  to='/agendamento-petshop'
                  className='hover:text-pink-400 dark:hover:text-pink-300 transition'
                >
                  Agendamento Petshop
                </Link>
              </li>
              <li>
                <Link
                  to='/cadastrar-cliente'
                  className='hover:text-pink-400 dark:hover:text-pink-300 transition'
                >
                  Cadastrar Cliente
                </Link>
              </li>
              <li>
                <Link
                  to='/prontuario'
                  className='hover:text-pink-400 dark:hover:text-pink-300 transition'
                >
                  Prontuário
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 2: Contato */}
          <div>
            <h4 className='text-lg font-bold text-yellow-400 mb-4'>Contatos</h4>
            <ul className='space-y-3 text-sm'>
              <li className='flex items-center'>
                {/* Ícones: Cor adaptada */}
                <MapPin
                  size={16}
                  className='mr-2 text-cyan-400 dark:text-cyan-300'
                />{' '}
                Rua dos Pets, 123 - Cidade Feliz
              </li>
              <li className='flex items-center'>
                <Phone
                  size={16}
                  className='mr-2 text-cyan-400 dark:text-cyan-300'
                />{' '}
                (11) 9999-9999
              </li>
              <li className='flex items-center'>
                <Mail
                  size={16}
                  className='mr-2 text-cyan-400 dark:text-cyan-300'
                />{' '}
                <a
                  href='mailto:contato@lollipet.com'
                  className='hover:text-pink-400 dark:hover:text-pink-300 transition'
                >
                  contato@lollipet.com
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Logo e Mensagem */}
          <div className='flex flex-col items-start md:items-end'>
            <img src={Logo} alt='Logo Lolli Pet' className='h-10 w-auto mb-4' />
            {/* Mensagem: Cor adaptada */}
            <p className='text-sm text-gray-400 dark:text-gray-500 text-left md:text-right'>
              A saúde e alegria do seu pet em primeiro lugar.
            </p>
          </div>
        </div>

        {/* Copyright */}
        {/* Texto: Cor adaptada */}
        <div className='text-center text-sm text-gray-500 dark:text-gray-500 pt-4'>
          © {new Date().getFullYear()} Lolli Pet. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
