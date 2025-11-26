import { z } from 'zod';

const PetSchema = z.object({
  nomePet: z.string().min(1, 'O nome do Pet é obrigatório.'),
  especie: z.string().min(1, 'A espécie do Pet é obrigatória.'),
  raca: z.string().optional().nullable().default(''),
});

export const cadastroClienteSchemas = z.object({
  nome: z.string().min(3, 'O nome completo é obrigatório.'),
  email: z.email('E-mail inválido.').min(1, 'O e-mail é obrigatório.'),
  telefone: z
  .string()
  .min(1, 'O telefone é obrigatório.')
  // 1. Limpa tudo que não for número antes de validar
  .transform((val) => val.replace(/\D/g, '')) 
  // 2. Valida se sobraram 10 ou 11 números
  .refine((val) => val.length >= 10 && val.length <= 11, { 
    message: 'Telefone inválido (deve ter 10 ou 11 dígitos).',
  }),

  pets: z.array(PetSchema).min(1, 'É obrigatório cadastrar pelo menos um pet.'),
});

export type PetFormData = z.infer<typeof PetSchema>;
export type CadastroClienteFormData = z.infer<typeof cadastroClienteSchemas>;
