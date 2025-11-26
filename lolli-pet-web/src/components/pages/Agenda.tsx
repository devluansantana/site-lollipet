import { useState, useEffect } from 'react';
import {
  CalendarDays,
  StethoscopeIcon,
  BathIcon,
  Clock,
  User,
  PawPrint,
  Trash2,
  Edit,
} from 'lucide-react';
import { listarAgendamentos, deletarAgendamento, atualizarAgendamento } from '../../services/api';
import type { Agendamento, ApiError } from '../../services/api';

// --- COMPONENTE INTERNO: AgendamentoCard ---

interface AgendamentoCardProps {
  agendamento: Agendamento;
  tipo: 'clinica' | 'petshop';
  onCancel: (id: number) => void;
  onEdit: (id: number, agendamento: Agendamento) => void;
}

const AgendamentoCard: React.FC<AgendamentoCardProps> = ({
  agendamento,
  tipo,
  onCancel,
  onEdit,
}) => {
  const isClinica = tipo === 'clinica';
  const borderClass = isClinica
    ? 'border-cyan-500 dark:border-cyan-600'
    : 'border-pink-500 dark:border-pink-600';
  const accentClass = isClinica
    ? 'text-cyan-600 dark:text-cyan-400'
    : 'text-pink-600 dark:text-pink-400';

  // Formata a hora do agendamento
  const dataHora = new Date(agendamento.data_hora);
  const hora = dataHora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div
      className={`agendamento-card bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border-l-4 ${borderClass} transition hover:shadow-lg dark:shadow-gray-700/50`}
    >
      <div className='flex justify-between items-start'>
        <h3
          className={`text-xl font-bold text-gray-800 dark:text-gray-200 ${accentClass}`}
        >
          {isClinica ? 'Consulta Clínica' : 'Serviço Petshop'}
        </h3>
        <span className='text-sm text-gray-500 dark:text-gray-400'>
          #{agendamento.id}
        </span>
      </div>

      <p className='mt-2 text-sm flex items-center gap-2 text-gray-700 dark:text-gray-300'>
        <Clock size={16} className={accentClass} />
        <span className='font-bold'>Horário:</span> {hora}
      </p>

      <p className='text-sm flex items-center gap-2 text-gray-700 dark:text-gray-300'>
        <User size={16} className='text-gray-500 dark:text-gray-400' />
        <span className='font-bold'>Cliente:</span> {agendamento.pet?.cliente?.nome || 'Não informado'}
      </p>

      <p className='text-sm flex items-center gap-2 text-gray-700 dark:text-gray-300'>
        <PawPrint size={16} className='text-gray-500 dark:text-gray-400' />
        <span className='font-bold'>Pet:</span> {agendamento.pet?.nome || 'Não informado'}
      </p>

      {agendamento.veterinario && (
        <p className='text-sm flex items-center gap-2 text-gray-700 dark:text-gray-300'>
          <StethoscopeIcon
            size={16}
            className='text-gray-500 dark:text-gray-400'
          />
          <span className='font-bold'>Veterinário:</span> {agendamento.veterinario.nome}
        </p>
      )}

      {agendamento.status && (
        <p className='text-sm mt-1'>
          <span className='font-bold'>Status:</span>{' '}
          <span className={`px-2 py-1 rounded text-xs ${
            agendamento.status === 'agendado' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
            agendamento.status === 'confirmado' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
            agendamento.status === 'concluido' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {agendamento.status.charAt(0).toUpperCase() + agendamento.status.slice(1)}
          </span>
        </p>
      )}

      {agendamento.observacoes && (
        <p className='text-xs italic mt-2 text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-600 pt-2'>
          Obs: {agendamento.observacoes}
        </p>
      )}

      <div className='flex gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700'>
        <button
          onClick={() => onEdit(agendamento.id, agendamento)}
          className={`flex-1 p-2 bg-yellow-400 dark:bg-yellow-600 text-gray-800 dark:text-gray-50 font-bold rounded-md hover:bg-yellow-500 dark:hover:bg-yellow-700 transition flex items-center justify-center gap-1 text-sm`}
        >
          <Edit size={16} /> Editar
        </button>
        <button
          onClick={() => onCancel(agendamento.id)}
          className='flex-1 p-2 bg-red-500 dark:bg-red-600 text-white font-bold rounded-md hover:bg-red-600 dark:hover:bg-red-700 transition flex items-center justify-center gap-1 text-sm'
        >
          <Trash2 size={16} /> Cancelar
        </button>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL: Agenda ---

export function Agenda() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const hoje = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  // Carrega agendamentos do backend
  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const data = await listarAgendamentos();
        setAgendamentos(data);
      } catch (err) {
        console.error('[Agenda] Erro ao carregar agendamentos:', err);
        const apiError = err as ApiError;
        setError(apiError.message || 'Erro ao carregar agendamentos.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgendamentos();
  }, []);

  // Filtra agendamentos do dia atual
  const hojeData = new Date();
  hojeData.setHours(0, 0, 0, 0);
  const amanha = new Date(hojeData);
  amanha.setDate(amanha.getDate() + 1);

  const agendamentosHoje = agendamentos.filter(ag => {
    const dataAg = new Date(ag.data_hora);
    return dataAg >= hojeData && dataAg < amanha;
  });

  const agendaClinica = agendamentosHoje.filter(ag => ag.servico === 'clinico');
  const agendaPetshop = agendamentosHoje.filter(ag => ag.servico === 'petshop');

  // Função para cancelar agendamento
  const handleCancel = async (id: number) => {
    const confirmacao = globalThis.confirm(
      `Tem certeza que deseja cancelar o agendamento #${id}?`,
    );
    if (confirmacao) {
      try {
        await deletarAgendamento(id);
        setAgendamentos(prev => prev.filter(ag => ag.id !== id));
        alert(`Agendamento #${id} cancelado com sucesso!`);
      } catch (err) {
        console.error('[Agenda] Erro ao cancelar agendamento:', err);
        const apiError = err as ApiError;
        alert(apiError.message || 'Erro ao cancelar agendamento.');
      }
    }
  };

  // Função para editar agendamento (exemplo: alterar status)
  const handleEdit = async (id: number, agendamento: Agendamento) => {
    const novoStatus = globalThis.prompt(
      `Status atual: ${agendamento.status || 'agendado'}\n\nDigite o novo status (agendado, confirmado, cancelado, concluido):`,
      agendamento.status || 'agendado'
    );

    if (novoStatus && ['agendado', 'confirmado', 'cancelado', 'concluido'].includes(novoStatus)) {
      try {
        const atualizado = await atualizarAgendamento(id, { status: novoStatus as Agendamento['status'] });
        setAgendamentos(prev => prev.map(ag => ag.id === id ? atualizado : ag));
        alert(`Agendamento #${id} atualizado para: ${novoStatus}`);
      } catch (err) {
        console.error('[Agenda] Erro ao atualizar agendamento:', err);
        const apiError = err as ApiError;
        alert(apiError.message || 'Erro ao atualizar agendamento.');
      }
    } else if (novoStatus) {
      alert('Status inválido. Use: agendado, confirmado, cancelado ou concluido');
    }
  };

  if (isLoading) {
    return (
      <div className='p-8 bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-150px)] flex justify-center items-center'>
        <p className='text-gray-500 dark:text-gray-400'>Carregando agendamentos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='p-8 bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-150px)] flex justify-center items-center'>
        <p className='text-red-500'>{error}</p>
      </div>
    );
  }

  return (
    <div className='p-8 bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-150px)] flex justify-center items-start transition-colors duration-500'>
      <div className='container max-w-6xl w-full'>
        <h1 className='text-3xl font-extrabold text-center text-pink-600 dark:text-pink-400 mb-6 border-b-2 border-yellow-400 dark:border-yellow-600 pb-2 flex items-center justify-center gap-2'>
          <CalendarDays size={30} />
          Agenda do Dia
        </h1>
        <p className='text-center text-gray-500 dark:text-gray-400 mb-8 font-semibold'>
          Agendamentos para {hoje}
        </p>

        <div className='agenda-container flex flex-col lg:flex-row gap-8'>
          {/* Seção Clínica */}
          <section className='agenda-clinica flex-1 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-t-4 border-cyan-500 dark:border-cyan-600 transition-colors duration-500'>
            <h2 className='text-2xl font-bold text-center text-cyan-700 dark:text-cyan-400 mb-6 border-b border-cyan-200 dark:border-cyan-700 pb-3 flex items-center justify-center gap-2'>
              <StethoscopeIcon size={24} /> Agenda Clínica
            </h2>
            <div className='space-y-4'>
              {agendaClinica.map(agendamento => (
                <AgendamentoCard
                  key={agendamento.id}
                  agendamento={agendamento}
                  tipo='clinica'
                  onCancel={handleCancel}
                  onEdit={handleEdit}
                />
              ))}
            </div>
            {agendaClinica.length === 0 && (
              <p className='text-center text-gray-500 dark:text-gray-400 italic mt-8'>
                Nenhum agendamento clínico para hoje.
              </p>
            )}
          </section>

          {/* Seção Petshop */}
          <section className='agenda-petshop flex-1 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-t-4 border-pink-500 dark:border-pink-600 transition-colors duration-500'>
            <h2 className='text-2xl font-bold text-center text-pink-700 dark:text-pink-400 mb-6 border-b border-pink-200 dark:border-pink-700 pb-3 flex items-center justify-center gap-2'>
              <BathIcon size={24} /> Agenda Petshop
            </h2>
            <div className='space-y-4'>
              {agendaPetshop.map(agendamento => (
                <AgendamentoCard
                  key={agendamento.id}
                  agendamento={agendamento}
                  tipo='petshop'
                  onCancel={handleCancel}
                  onEdit={handleEdit}
                />
              ))}
            </div>
            {agendaPetshop.length === 0 && (
              <p className='text-center text-gray-500 dark:text-gray-400 italic mt-8'>
                Nenhum agendamento de petshop para hoje.
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
