import { z } from 'zod';

// Create validation schema with custom error messages
export function createSignupSchema(lang: 'pt-BR' | 'en-US' = 'en-US') {
  const messages = {
    'pt-BR': {
      nameMin: 'O nome deve ter pelo menos 2 caracteres',
      nameMax: 'O nome deve ter menos de 100 caracteres',
      nameRegex: 'O nome pode conter apenas letras e espaços',
      emailInvalid: 'Endereço de email inválido',
      emailMax: 'O email deve ter menos de 255 caracteres',
    },
    'en-US': {
      nameMin: 'Name must be at least 2 characters',
      nameMax: 'Name must be less than 100 characters',
      nameRegex: 'Name can only contain letters and spaces',
      emailInvalid: 'Invalid email address',
      emailMax: 'Email must be less than 255 characters',
    },
  };

  const t = messages[lang];

  return z.object({
    name: z
      .string()
      .min(2, t.nameMin)
      .max(100, t.nameMax)
      .regex(/^[a-zA-ZÀ-ÿ\s]+$/, t.nameRegex),
    email: z
      .string()
      .email(t.emailInvalid)
      .max(255, t.emailMax),
    // Honey pot field - should be empty (bots will fill this)
    // We validate this on the server side, not in the schema
    website: z.string().optional(),
  });
}

// Default schema for server-side validation
export const signupSchema = createSignupSchema('en-US');

// Type for form data
export type SignupFormData = {
  name: string;
  email: string;
  website?: string;
};
