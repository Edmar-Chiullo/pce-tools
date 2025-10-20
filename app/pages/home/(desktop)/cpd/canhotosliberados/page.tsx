'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

import { ref, onChildAdded, onChildChanged } from "firebase/database";
import { db } from "@/app/firebase/fbkey";

import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem  } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { fullDatePrint, fullDate, hourPrint } from "@/utils/date-generate";

import { getReceipt } from "@/app/firebase/fbmethod";

const formSchema = z.object({
  pesquisar: z.string().min(2, {
    message: "Inserir com o nome do motorista.",
  }),
})

// Component Login....
export default function ReceiptScreen() {

  const [ bulk, setBulk ] = useState<any[]>([])
  const [ userName, setUserName ] = useState<string | null>('')
  const [yellowTimeoutIds, setYellowTimeoutIds] = useState<string[]>([]);
  const [redTimeoutIds, setRedTimeoutIds] = useState<string[]>([]);  

  const router = useRouter()
  
  useEffect(() => {
    getReceipt().then((val) => {
      const arr = Object.values(val)
      setBulk(arr)
    })

    const strDate = fullDate().replace(/\//g, "");
    const basePath = `activity/receipt/${strDate.slice(4, 8)}/${strDate.slice(2, 8)}/`;

    const cargaReceipt = ref(db, basePath) 
      onChildAdded(cargaReceipt, (snapshot) => {
        if (snapshot.exists()) {
          const arr = snapshot.val();
          const { carga } = arr;

          setBulk((prev) => {
            const exists = prev.some((item) => item.carga.bulkId === carga.bulkId);
            if (!exists) {
              return [...prev, { carga }];
            }
            return prev;
          });
        }
      });  

    const alterCarga = ref(db, basePath)
      onChildChanged(alterCarga, (snapshot) => {
        if (snapshot.exists()) {
          const { carga } = snapshot.val();
          const id = carga.bulkId;
          setBulk((prev) =>
            prev.map((item) => item.carga.bulkId === id ? { carga } : item)
          );
        }
      });

  }, [])
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pesquisar: "",
    },
  })

  function onSubmit(value:z.infer<typeof formSchema>) {
    const listaDeCarga = Object.values(bulk)
    const result = listaDeCarga.filter(({carga}) => carga.bulkId === value.pesquisar.toUpperCase())
    
    const {carga} = result[0]
    setBulk(result)

    form.reset({
      pesquisar: ''
    })
    
  }

  return (
    <div className="main flex flex-col justify-end p-2 w-full h-full rounded-2xl bg-zinc-800">
      <div className="flex justify-center items-center w-full">
        <h1 className="text-3xl text-zinc-50">Canhotos Liberados</h1>
      </div>
      <div className="flex justify-end w-full p-2">
        <div className="flex justify-between items-center gap-2 h-9 bg-zinc-50 rounded-sm">
          <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-end items-center gap-2 pr-1">           
                <input type="text" placeholder="Insira o código" className="input-quary rounded-sm h-8 p-1 bg-zinc-50"/>
                <button type="submit" className="w-16 h-8 bg-zinc-950 hover:scale-[1.01] rounded-sm" >
                    <MagnifyingGlassIcon className="size-6 text-zinc-100 m-auto"/>
                </button>
              </form>
            </Form>          
        </div>
      </div>
      <div className="flex gap-9 w-full h-full">
        <div className="relative w-full h-full rounded-md bg-zinc-50">
          <div className="w-full bg-zinc-600 pl-1 pr-1 rounded-t-sm">
            <ul className="grid grid-cols-7 gap-8 text-zinc-50">
              <li className="col-start-1 place-self-center">Motorista</li>
              <li className="col-start-2 place-self-center">Transportadora</li>
              <li className="col-start-3 place-self-center">Agenda</li>
              <li className="col-start-4 place-self-center">Controle</li>
              <li className="col-start-5 place-self-center">Data</li>
              <li className="col-start-6 place-self-center">Hora</li>
              <li className="col-start-7 place-self-center mr-2">Situação</li>
            </ul>
          </div>
          <ScrollArea className="w-full">
            {
              bulk.map(({carga}, key) => {
                if (carga.bulkStateCpd === 'liberar canhoto') return (
                  <div key={key} className={`flex items-center w-full h-6 rounded-[4px] mb-[1.50px] 
                    ${
                       redTimeoutIds.includes(carga.bulkId)
                      ? 'bg-red-400 hover:bg-red-500'
                      : yellowTimeoutIds.includes(carga.bulkId)
                      ? 'bg-yellow-400 hover:bg-yellow-500'
                      : 'bg-zinc-200 hover:bg-zinc-300'
                    }`                    
                  }>
                    <ul className="grid grid-cols-7 gap-10 text-[15px] w-full">
                      <li className="col-start-1 place-self-center">{carga.bulkDriver.toUpperCase()}</li>
                      <li className="col-start-2 place-self-center">{carga.bulkCarrier.toUpperCase()}</li>
                      <li className="col-start-3 place-self-center">{carga.bulkAgenda.toUpperCase()}</li>
                      <li className="col-start-4 place-self-center">{carga.bulkId}</li>
                      <li className="col-start-5 place-self-center">{fullDatePrint(carga.bulkCpdDate).toUpperCase()}</li>
                      <li className="col-start-6 place-self-center">{hourPrint(carga.bulkCpdDate).toUpperCase()}</li>
                      <li id={carga.bulkId} className="col-start-7 place-self-center self-center"> 
                          {carga.bulkStateCpd.toUpperCase()}
                      </li>        
                    </ul>
                  </div>
                )
              })
            }
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
