import BarMenu from "./menu-bar";
import { signOut } from '@/auth';
import IconMenuToggle from "./icon-menu-toggle";
import { auth } from "@/auth";

export default async function MenuToggle() {
  const session = await auth();
  const user = JSON.parse(String(session?.user?.name)) ?? "Sem user";

  return (
    <div>
      <div className='flex flex-col justify-end p-2 md:hidden'>
        <IconMenuToggle />
        <div className={`absolute hidden z-40 top-0 bottom-0 left-0 flex-col justify-around w-full h-screen  bg-zinc-100`}>
          <BarMenu user={user} />
          <div className='flex justify-center gap-2 w-full text-2xl'>
            <h2>{user.first}</h2>
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
        </div>
      </div>
    </div>
  );
}