'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";

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
    // const userLogin:any = localStorage.getItem('userName')
    // userLogin ? setUserName(userLogin) : router.push('/')


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
    <div className="main flex flex-col p-3 w-full h-[95%]">
      <Image
        onClick={() => router.push('/pages/cpdoperator')}
        className="cursor-pointer hover:scale-[1.10]"
        src={'/seta-esquerda.png'}
        width={20}
        height={20}
        alt="Proxima página."
      />
      <div className="flex justify-end items-center w-full">
        <h5>{userName}</h5>
      </div>
      <div className="flex justify-center items-center w-full h-18">
        <h1 className="text-4xl">Cargas liberadas</h1>
      </div>
      <div className="w-full">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-end items-center gap-2 w-full pr-1">
              <FormField
                  control={form.control}
                  name="pesquisar"
                  render={({ field }) => (
                  <FormItem>
                      <FormLabel>Pesquisar</FormLabel>
                      <FormControl>
                        <Input placeholder="Pesquisar" className="motorista h-8" {...field} />
                      </FormControl>
                      <FormDescription>
                      </FormDescription>
                      <FormMessage />
                  </FormItem>
                  )}
              />
              <Button type="submit" className="mt-3 w-20 h-8">
                <Image 
                  src={'/lupa-de-pesquisa.png'}
                  width={24}
                  height={24}
                  alt="Pesquisar tarefa"
                /></Button>
            </form>
          </Form>
      </div>
      <div className="flex gap-9 w-full h-[80%]">
        <div className="relative w-full h-[100%] rounded-md p-1 bg-zinc-50">
          <div className="w-full bg-zinc-950 pl-1 pr-1 rounded-t-sm">
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
          <ScrollArea className="w-full h-full">
            {
              bulk.map(({carga}, key) => {
                if (carga.bulkState === 'liberar canhoto') return (
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
                          {carga.bulkState.toUpperCase()}
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
