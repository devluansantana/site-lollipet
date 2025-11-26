import { z } from 'zod';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const timeRegex = /^\d{2}:\d{2}$/;

// Função de refinamento para garantir que a data não seja passada
const isFutureDate = (dateString: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(dateString);
  date.setHours(0, 0, 0, 0);
  return date >= today;
};

export const agendamentoClinicoSchema = z.object({
  nomeCliente: z
    .string()
    .min(3, 'O nome do cliente é obrigatório (mínimo 3 caracteres).'),
  telefone: z
  .string()
  .min(1, 'O telefone é obrigatório.')
  // 1. Limpa tudo que não for número antes de validar
  .transform((val) => val.replace(/\D/g, '')) 
  // 2. Valida se sobraram 10 ou 11 números
  .refine((val) => val.length >= 10 && val.length <= 11, { 
    message: 'Telefone inválido (deve ter 10 ou 11 dígitos).',
  }),
  nomePet: z.string().min(1, 'O nome do Pet é obrigatório.'), //  GARANTIA DE PREENCHIMENTO

  servico: z.enum(['consulta', 'exame', 'vacina', 'outro'], {
    // Valida se o usuário selecionou uma opção válida (diferente de '')
    message: 'O tipo de serviço é obrigatório.',
  }),

  data: z
    .string()
    .min(1, 'A data é obrigatória.') //  GARANTIA DE PREENCHIMENTO
    .regex(dateRegex, 'Formato de data inválido (AAAA-MM-DD).')
    .refine(isFutureDate, 'Não é possível agendar em uma data passada.'),

  hora: z
    .string()
    .min(1, 'A hora é obrigatória.') //  GARANTIA DE PREENCHIMENTO
    .regex(timeRegex, 'Formato de hora inválido (HH:mm).'),

  observacoes: z
    .string()
    .max(500, 'As observações devem ter no máximo 500 caracteres.')
    .optional()
    .nullable()
    .default(''),
});

// Exportação dos Tipos
export type AgendamentoClinicoFormData = z.infer<
  typeof agendamentoClinicoSchema
>;
