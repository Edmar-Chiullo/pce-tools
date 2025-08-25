'use client';
 
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { authenticate } from '@/lib/server-actions';
//

export default function FormLogin() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/pages/home';
    
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );
    
    return (
        <section className="flex flex-col gap-10 items-center min-h-screen bg-gray-100 py-10">
            <h1 className="text-4xl">Entrar</h1>
            <form action={formAction} className="flex justify-center w-full">
                <div className="flex flex-col items-center w-md p-6">
                    <label htmlFor="email" className="self-start mb-2">Usuário:</label>
                    <input id="email" placeholder="usuário" name="email" className="mb-4 p-2 border h-10 w-96 border-gray-300 rounded" required />
                    <label htmlFor="password" className="self-start mb-2">Senha:</label>
                    <input type="password" id="password" placeholder="Senha" name="password" className="mb-4 p-2 border h-10 w-96 border-gray-300 rounded" required />
                    <input type="hidden" name="redirectTo" value={callbackUrl} />
                    <button type="submit" className="h-10 w-96 bg-blue-500 text-white px-4 py-2 rounded">
                        {isPending ? "Carregando..." : "Entrar"}    
                    </button>
                    {errorMessage && (
                        <p className="text-red-500 mt-4">{errorMessage}</p>
                    )}
                </div>
            </form>
        </section>
    )
}