'use server';

import { AuthError } from 'next-auth';
import { signIn } from '@/auth';
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  
  try {
    await signIn('credentials', formData);

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Credenciais invalidas.';
        default:
          return 'Algo deu errado.';
      }
    }
    throw error;
  }
}
