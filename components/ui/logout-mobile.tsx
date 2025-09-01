import { signOut } from "@/auth";

export default async function LogoutMobile() {

    return (
         <div className='flex justify-center gap-2 w-full text-2xl'>
            <h2>User</h2>
            <form action={async () => {
            'use server';
              await signOut({ redirectTo: '/' });
            }} 
            className="relative flex justify-end">
              <button className="flex grow items-center justify-center gap-2 rounded-md text-xl font-medium text-zinc-950 cursor-pointer md:flex-none md:justify-start underline">
                Sair
              </button>
            </form>
          </div>
    )
}