'use server';

import { AuthError } from 'next-auth';
import { signIn } from '@/auth';
import { getActivity } from './firebase/server-database';
 
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

// export async function getTaskes(
//   prevState: string | undefined,
//   formData: FormData
// ) {
//   try {
//     const mouth:any = formData.get('pesquisar')?.slice(5,7)
//     console.log(mouth)
//     const result = await getActivity(mouth, '16')
//     return result
//   } catch (error) {
//     return `Erro ao buscar a tarefa ${error}`
//   }
// }
