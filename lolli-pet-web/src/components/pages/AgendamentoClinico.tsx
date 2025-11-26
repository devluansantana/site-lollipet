import { useState, useEffect } from 'react';
import {
  StethoscopeIcon,
  PawPrint,
  Clock,
  CalendarDays,
  MessageSquare,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { agendarClinico, listarPets } from '../../services/api';
import type { ApiError, Pet } from '../../services/api';

const agendamentoClinicoSchema = z.object({
  pet_id: z.string().min(1, 'Selecione um pet.'),
  data: z.string().min(1, 'A data é obrigatória.'),
  hora: z.string().min(1, 'A hora é obrigatória.'),
  observacoes: z
    .string()
    .max(500, 'Máximo de 500 caracteres')
    .nullable()
    .optional(),
});

type AgendamentoClinicoFormData = z.infer<typeof agendamentoClinicoSchema>;

export function AgendamentoClinico() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoadingPets, setIsLoadingPets] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AgendamentoClinicoFormData>({
    resolver: zodResolver(agendamentoClinicoSchema),
    defaultValues: {
      pet_id: '',
      data: '',
      hora: '',
      observacoes: null,
    },
  });

  // Carrega lista de pets ao montar componente
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const petsData = await listarPets();
        setPets(petsData);
      } catch (err) {
        console.error('[AgendamentoClinico] Erro ao carregar pets:', err);
        setServerError('Erro ao carregar lista de pets.');
      } finally {
        setIsLoadingPets(false);
      }
    };

    fetchPets();
  }, []);

  async function onSubmit(data: AgendamentoClinicoFormData) {
    setIsSubmitting(true);
    setServerError(null);
    setSuccessMessage(null);

    try {
      // Monta data_hora no formato ISO
      const dataHora = new Date(`${data.data}T${data.hora}`).toISOString();

      const agendamentoData = {
        pet_id: parseInt(data.pet_id, 10),
        data_hora: dataHora,
        observacoes: data.observacoes || undefined,
      };

      console.log('[AgendamentoClinico] Criando agendamento:', agendamentoData);

      await agendarClinico(agendamentoData);

      const petSelecionado = pets.find(p => p.id === parseInt(data.pet_id, 10));
      setSuccessMessage(`Agendamento clínico para ${petSelecionado?.nome || 'pet'} realizado com sucesso!`);

      reset({
        pet_id: '',
        data: '',
        hora: '',
        observacoes: null,
      });
    } catch (err) {
      console.error('[AgendamentoClinico] Erro ao criar agendamento:', err);
      const apiError = err as ApiError;
      setServerError(apiError.message || 'Erro ao criar agendamento.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className='p-8 bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-150px)] flex justify-center items-start transition-colors duration-500'>
      <div className='container max-w-2xl w-full'>
        <h1 className='text-3xl font-extrabold text-center text-cyan-600 dark:text-cyan-400 mb-6 border-b-2 border-yellow-400 dark:border-yellow-600 pb-2 flex items-center justify-center gap-2'>
          <StethoscopeIcon size={30} />
          Novo Agendamento Clínico
        </h1>
        <p className='text-center text-gray-500 dark:text-gray-400 mb-8'>
          Selecione um pet cadastrado para agendar uma consulta clínica.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-6 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700'
        >
          {/* Mensagens de erro/sucesso */}
          {serverError && (
            <div className='p-3 mb-2 bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300 rounded'>
              {serverError}
            </div>
          )}
          {successMessage && (
            <div className='p-3 mb-2 bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 rounded'>
              {successMessage}
            </div>
          )}

          <fieldset className='border-2 border-cyan-500 dark:border-cyan-600 p-4 rounded-md'>
            <legend className='font-bold text-lg text-cyan-700 dark:text-cyan-400 px-2'>
              Selecionar Pet
            </legend>

            <div className='form-group'>
              <label
                htmlFor='pet_id'
                className='font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1'
              >
                <PawPrint
                  size={16}
                  className='text-cyan-500 dark:text-cyan-400'
                />{' '}
                Pet:
              </label>
              {isLoadingPets ? (
                <p className='text-gray-500 dark:text-gray-400'>Carregando pets...</p>
              ) : pets.length === 0 ? (
                <p className='text-yellow-600 dark:text-yellow-400'>
                  Nenhum pet cadastrado. Cadastre um cliente e pet primeiro.
                </p>
              ) : (
                <select
                  id='pet_id'
                  {...register('pet_id')}
                  className='w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:border-cyan-500 dark:focus:border-cyan-400 bg-white dark:bg-gray-700 dark:text-gray-50'
                >
                  <option value=''>Selecione um pet...</option>
                  {pets.map((pet) => (
                    <option key={pet.id} value={pet.id}>
                      {pet.nome} ({pet.especie}) - {pet.cliente?.nome || 'Cliente não informado'}
                    </option>
                  ))}
                </select>
              )}
              {errors.pet_id && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.pet_id.message}
                </p>
              )}
            </div>
          </fieldset>

          <fieldset className='border-2 border-cyan-500 dark:border-cyan-600 p-4 rounded-md'>
            <legend className='font-bold text-lg text-cyan-700 dark:text-cyan-400 px-2'>
              Data e Hora
            </legend>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='form-group'>
                <label
                  htmlFor='data'
                  className=' font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1'
                >
                  <CalendarDays
                    size={16}
                    className='text-cyan-500 dark:text-cyan-400'
                  />{' '}
                  Data:
                </label>
                <input
                  type='date'
                  id='data'
                  {...register('data')}
                  className='w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:border-cyan-500 dark:focus:border-cyan-400 dark:bg-gray-700 dark:text-gray-50'
                />
                {errors.data && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.data.message}
                  </p>
                )}
              </div>

              <div className='form-group'>
                <label
                  htmlFor='hora'
                  className=' font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1'
                >
                  <Clock
                    size={16}
                    className='text-cyan-500 dark:text-cyan-400'
                  />{' '}
                  Hora:
                </label>
                <input
                  type='time'
                  id='hora'
                  {...register('hora')}
                  className='w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:border-cyan-500 dark:focus:border-cyan-400 dark:bg-gray-700 dark:text-gray-50'
                />
                {errors.hora && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.hora.message}
                  </p>
                )}
              </div>
            </div>
          </fieldset>

          <div className='form-group'>
            <label
              htmlFor='observacoes'
              className=' font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1'
            >
              <MessageSquare
                size={16}
                className='text-cyan-500 dark:text-cyan-400'
              />{' '}
              Observações (Opcional):
            </label>
            <textarea
              id='observacoes'
              rows={3}
              {...register('observacoes')}
              placeholder='Ex: Suspeita de dor na pata traseira. Medicamento de uso contínuo.'
              className='w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:border-cyan-500 dark:focus:border-cyan-400 dark:bg-gray-700 dark:text-gray-50'
            ></textarea>
            {errors.observacoes && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.observacoes.message}
              </p>
            )}
          </div>

          <button
            type='submit'
            disabled={isSubmitting || isLoadingPets || pets.length === 0}
            className='w-full p-3 bg-cyan-500 dark:bg-cyan-600 text-white font-bold rounded-md hover:bg-cyan-600 dark:hover:bg-cyan-700 transition disabled:opacity-50'
          >
            {isSubmitting ? 'Agendando...' : 'Agendar Consulta'}
          </button>
        </form>
      </div>
    </div>
  );
}
