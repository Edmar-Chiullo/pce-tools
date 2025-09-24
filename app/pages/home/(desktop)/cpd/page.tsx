import Link from "next/link";
import { ArrowBigRightIcon } from "lucide-react";
import ScrollCpd from "@/components/ui/scroll-area-cpd";
import FormCadastroCpd from "@/components/ui/form-cadastro-cpd";
import { auth } from "@/auth";

// Component Login....
export default async function ReceiptScreen() {

  const session = await auth();
  const user = JSON.parse(String(session?.user?.name)) ?? "Sem user";
  
  return (
    <div className="main flex flex-col justify-start p-2 w-full h-full bg-zinc-800 rounded-2xl">
      <div className="flex justify-center items-center p-2 w-full">
        <h1 className="text-3xl text-zinc-50">Processamento de notas</h1>
      </div>
      <div className="flex items-center justify-between gap-2 w-full h-full">
        <FormCadastroCpd user={user}/>
        <div className="self-end w-full h-full rounded-md bg-zinc-100">
          <div className="relative flex w-full justify-end pr-1">
            <div className="absolute top-[-35px] cursor-pointer hover:scale-[1.10]">
              <Link href="/pages/home/cpd/canhotosliberados">
                <ArrowBigRightIcon className="size-7 text-zinc-50"/>                 
              </Link>
            </div>
          </div>
          <div className="h-full">
            <div className="w-full bg-zinc-600 px-1 rounded-t-sm">
              <ul className="grid grid-cols-11 gap-8 text-zinc-50">
                <li className="col-start-1 col-span-2">Motorista</li>
                <li className="col-start-3 col-span-2">Transportadora</li>
                <li className="col-start-5 place-self-center">Agenda</li>
                <li className="col-start-6 place-self-center">Controle</li>
                <li className="col-start-7 place-self-center">Telefone</li>
                <li className="col-start-8 place-self-center">Status</li>
                <li className="col-start-9 place-self-center">Data</li>
                <li className="col-start-10 place-self-center">Tempo</li>
                <li className="col-start-11 place-self-end mr-2">Editar</li>
              </ul>
            </div>
            <ScrollCpd />
          </div>
        </div>
      </div>
    </div>
  );
}
