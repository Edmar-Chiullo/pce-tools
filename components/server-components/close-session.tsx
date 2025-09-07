import { signOut } from "@/auth"

export default function CloseSession() {
    return (
        <div className='hidden md:flex flex-col justify-end items-end w-full px-2'>
          <form
            action={async () => {
                "use server"
                await signOut()
              }}
            className="relative flex justify-end"
          >
            <button className="flex grow items-center justify-center gap-2 rounded-md text-2xl  md:text-sm font-medium text-zinc-950 cursor-pointer md:flex-none md:justify-start underline">
              Sair
            </button>
          </form>
        </div>
    )
}