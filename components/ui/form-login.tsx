'use client';
 
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { authenticate } from '@/lib/server-actions';

export default function FormLogin() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/pages/home';
    
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );
    //
    return (
        <section className="flex flex-col gap-10 justify-center items-center min-h-screen bg-gray-100">
            <h1 className="text-4xl">Entrar</h1>
            <form action={formAction} className="flex justify-center items-center w-full">
                <div className="flex flex-col shrink justify-center items-center w-full p-6  md:w-md">
                        <label htmlFor="usuario" className="self-start mb-2">Usuário:</label>
                        <input id="usuario" placeholder="usuário" name="usuario" className="flex shrink mb-4 p-2 border h-10 w-full border-gray-300 rounded" required />
                        <label htmlFor="senha" className="self-start mb-2">Senha:</label>
                        <input type="password" id="senha" placeholder="Senha" name="senha" className="flex shrink mb-4 p-2 border h-10 w-full border-gray-300 rounded" required />
                        <input type="hidden" name="redirectTo" value={callbackUrl} className='flex w-full' />
                        <button className="flex justify-center shrink text-center h-10 w-full bg-zinc-950 text-white py-2 rounded">
                            {isPending ? "Carregando..." : "Entrar"}    
                        </button>
                        {errorMessage && (
                            <p className="flex text-red-500 mt-4">{errorMessage}</p>
                        )}
                </div>
            </form>
        </section>
    )
}