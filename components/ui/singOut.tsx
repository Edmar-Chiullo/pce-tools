'use client';

import { signOut } from 'next-auth/react';

export default function SignOutButton() {
    const handleSignOut = async () => {
        await signOut({ redirectTo: '/' }); 
    };

    return (
        <div className='flex flex-col justify-start items-center lg:items-end w-full px-2 lg:hidden'>
            <button 
                // 🔑 CHAVE: Chama a função no evento onClick
                onClick={handleSignOut}
                className="flex grow items-center justify-center gap-2 rounded-md text-[20px] lg:text-sm font-medium text-zinc-950 cursor-pointer md:flex-none md:justify-start underline"
            >
                Sair
            </button>
        </div>
    );
}