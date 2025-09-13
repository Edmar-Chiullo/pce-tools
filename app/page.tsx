import Link from "next/link"
/**
 * 
 *             <h1 className="text-4xl font-bold">Welcome to the PCE Tools</h1>
            <p className="text-lg">Your one-stop solution for all PCE-related tasks.</p>

 */
export default function Page() {
  return (
    <section className="flex items-center gap-1 bg-gray-50 p-2">
        <div className="flex flex-col justify-between text-center w-70 h-[97vh] px-6 py-4 bg-zinc-100 rounded-2xl border-2 border-zinc-300">
            <h1 className="text-4xl font-bold p-2 rounded-[4px] text-zinc-500">PCE Tools</h1>
            <Link href="/pages/login" className="w-full">
                <button className="h-10 w-full bg-zinc-950 text-white rounded hover:bg-zinc-900 hover:cursor-pointer">Entrar</button>
            </Link>
        </div>
        <div className="flex flex-col justify-center gap-8 w-full h-[97vh] text-center bg-zinc-300 rounded-2xl border-2 border-zinc-400">
            <div>
              <h1 className="text-4xl font-bold">Bem-vindo às Ferramentas PCE</h1>
              <p className="text-lg">Sua solução completa para todas as tarefas relacionadas a PCE.</p>
            </div>
        </div>
    </section>
  )
}