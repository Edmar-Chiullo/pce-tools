'use client';

import { signOut } from "@/auth";

export default function Logout() {

  const handleLogout = async () => {
    await signOut() // Isso funciona porque está no client
  }

  return (
    <form 
      action={handleLogout}
     className="relative flex justify-end">
      <button className="flex grow items-center justify-center gap-2 rounded-md text-2xl  md:text-sm font-medium text-zinc-950 cursor-pointer md:flex-none md:justify-start underline">
        Sair
      </button>
    </form>
  );
} 