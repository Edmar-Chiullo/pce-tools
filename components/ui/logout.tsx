import { signOut } from "@/auth";

export default function Logout() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({ redirectTo: '/' });
      }}
      className="flex justify-end"
    >
      <button className="flex h-[28px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium text-zinc-950 cursor-pointer md:flex-none md:justify-start md:p-2 md:px-3">
        Sair
      </button>
    </form>
  );
}