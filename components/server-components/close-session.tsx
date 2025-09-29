import { signOut } from "@/auth"
import { redirect } from "next/dist/server/api-utils"

export default function CloseSession() {
    return (
        <div className='flex flex-col justify-start items-start lg:items-end w-full px-2'>
          <form
            action={async () => {
                "use server"
                await signOut( {redirectTo: '/'})
              }}
            className="relative flex justify-end"
          >
            <button className="flex grow items-center justify-center gap-2 rounded-md text-[14px] lg:text-sm font-medium text-zinc-950 cursor-pointer md:flex-none md:justify-start underline">
              Sair
            </button>
          </form>
        </div>
    )
}