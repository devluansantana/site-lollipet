import { BathIcon, CalendarDaysIcon, StethoscopeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    // Adiciona transição de cor suave
    <main className='w-full transition-colors duration-500'>
      {/* 1. SEÇÃO HERO (Banner/Destaque) */}
      <section
        //Fundo adaptado para Light e Dark Mode
        className='relative bg-white dark:bg-gray-900 h-[45vh] flex items-center justify-center text-center py-10 border-b dark:border-gray-700'
      >
        {/*  Fundo e Sombra do Conteúdo Central adaptados */}
        <div className='relative z-10 max-w-4xl px-4 shadow-xl p-8 rounded-xl bg-cyan-50 dark:bg-gray-800 transition duration-500'>
          {/*  Cores do Título Light e Dark */}
          <h1 className='text-4xl md:text-5xl font-extrabold text-cyan-800 dark:text-cyan-400 mb-4 leading-tight'>
            Onde a saúde e a alegria do seu pet se encontram!
          </h1>
          {/*  Cores do Parágrafo Light e Dark */}
          <p className='text-lg text-gray-700 dark:text-gray-300 mb-8'>
            Oferecemos o melhor em cuidados veterinários e serviços de estética,
            tudo em um só lugar.
          </p>

          {/* Botões */}
          <div className='flex justify-center gap-6'>
            {/*  Botão Rosa adaptado */}
            <Link
              to='/agendamento-clinico'
              className='px-6 py-3 bg-pink-500 dark:bg-pink-600 text-white text-md font-bold rounded-full shadow-md hover:bg-pink-600 dark:hover:bg-pink-700 transition duration-300 transform hover:scale-105'
            >
              Agendar Consulta
            </Link>
            {/*  Botão Amarelo adaptado */}
            <Link
              to='/agendamento-petshop'
              className='px-6 py-3 bg-yellow-400 dark:bg-yellow-500 text-gray-800 dark:text-gray-900 text-md font-bold rounded-full shadow-md hover:bg-yellow-500 dark:hover:bg-yellow-600 transition duration-300 transform hover:scale-105'
            >
              Agendar Petshop
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SEÇÃO DE SERVIÇOS */}
      {/*  Fundo da Seção adaptado */}
      <section className='py-16 px-5 bg-gray-100 dark:bg-gray-900 transition-colors duration-500'>
        <div className='max-w-7xl mx-auto'>
          {/* Título Centralizado adaptado */}
          <h2 className='text-3xl font-bold text-center text-pink-600 dark:text-pink-400 mb-12 border-b-2 border-cyan-400 dark:border-cyan-600 inline-block px-4 pb-2 mx-auto'>
            Nossos Serviços
          </h2>

          {/* Grid dos Cards */}
          <div className='grid md:grid-cols-3 gap-8'>
            {/* Card 1: Clínico (Ciano) */}
            {/* Fundo, Sombra e Borda adaptados */}
            <article className='p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-t-8 border-cyan-500 dark:border-cyan-600 text-center transform hover:shadow-cyan-300/50 dark:hover:shadow-cyan-800/50 hover:shadow-xl transition duration-300'>
              {/* Ícone: Fundo e Cor adaptados */}
              <span className='inline-flex items-center justify-center p-4 rounded-full bg-cyan-100 dark:bg-cyan-900 mb-4'>
                <StethoscopeIcon
                  className='text-cyan-600 dark:text-cyan-300'
                  size={40}
                />
              </span>
              {/* Texto: Cores Light e Dark */}
              <h3 className='text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3'>
                Consultório Veterinário
              </h3>
              <p className='text-gray-600 dark:text-gray-400'>
                Consultas de rotina, vacinas, exames e cirurgias. Cuidado
                profissional para a saúde do seu pet.
              </p>
              <Link
                to='/agendamento-clinico'
                // Link: Cor e Hover adaptados
                className='mt-4 inline-block text-cyan-600 dark:text-cyan-400 font-semibold hover:text-cyan-800 dark:hover:text-cyan-300 transition'
              >
                Agendar Agora &rarr;
              </Link>
            </article>

            {/* Card 2: Petshop (Rosa) */}
            <article className='p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-t-8 border-pink-500 dark:border-pink-600 text-center transform hover:shadow-pink-300/50 dark:hover:shadow-pink-800/50 hover:shadow-xl transition duration-300'>
              <span className='inline-flex items-center justify-center p-4 rounded-full bg-pink-100 dark:bg-pink-900 mb-4'>
                <BathIcon
                  className='text-pink-600 dark:text-pink-300'
                  size={40}
                />
              </span>
              <h3 className='text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3'>
                Petshop e Estética
              </h3>
              <p className='text-gray-600 dark:text-gray-400'>
                Banho e tosa, hidratação, tosa higiênica e outros cuidados para
                a beleza e higiene do seu amigo.
              </p>
              <Link
                to='/agendamento-petshop'
                className='mt-4 inline-block text-pink-600 dark:text-pink-400 font-semibold hover:text-pink-800 dark:hover:text-pink-300 transition'
              >
                Agendar Agora &rarr;
              </Link>
            </article>

            {/* Card 3: Organização (Amarelo) */}
            <article className='p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-t-8 border-yellow-500 dark:border-yellow-600 text-center transform hover:shadow-yellow-300/50 dark:hover:shadow-yellow-800/50 hover:shadow-xl transition duration-300'>
              <span className='inline-flex items-center justify-center p-4 rounded-full bg-yellow-100 dark:bg-yellow-900 mb-4'>
                <CalendarDaysIcon
                  className='text-yellow-600 dark:text-yellow-300'
                  size={40}
                />
              </span>
              <h3 className='text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3'>
                Organização Completa
              </h3>
              <p className='text-gray-600 dark:text-gray-400'>
                Gerencie todos os agendamentos e horários da clínica e do
                petshop de forma simples e eficiente.
              </p>
              <Link
                to='/agenda'
                className='mt-4 inline-block text-yellow-600 dark:text-yellow-400 font-semibold hover:text-yellow-800 dark:hover:text-yellow-300 transition'
              >
                Ver Agenda &rarr;
              </Link>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
