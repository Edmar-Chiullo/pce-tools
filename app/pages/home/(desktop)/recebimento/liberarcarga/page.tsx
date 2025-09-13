'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";

import { ref, onChildAdded, onChildChanged } from "firebase/database";
import { db } from "@/app/firebase/fbkey";

import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { fullDatePrint, fullDate, hourPrint } from "@/utils/date-generate";
import Timer from "@/components/ui/span";
import { getReceipt, getCargasLiberadas, setBulkCpd } from "@/app/firebase/fbmethod";
import { handlePrint } from "@/utils/print";
import { extraction } from "@/utils/extract-carga";

import { exportFileXlsxRecebimento } from "@/utils/ger-xlsx";
import { cargaPrintXlsx } from "@/utils/treatment-data-print";

import ValidacaoCargaRetirada from "./validacao";
import { finishCarga } from "./finishCarga";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const formSchema = z.object({
  pesquisar: z.string().min(2, {
    message: "Inserir data a ser consultada.",
  }),
})

// Component Login....
export default function ReceiptScreen() {

  const [ bulk, setBulk ] = useState<any[]>([])
  const [ varSwap, setVarSwap ] = useState<any[]>([])
  const [ stateSwap, setStateSwap ] = useState(false)
  const [ dataConfirm, setDataConfirm ] = useState(false)

  const [ cargaLiberar, setCargaLiberar ] = useState<any>()

  const [ userName, setUserName ] = useState<string | null>('')
  const [yellowTimeoutIds, setYellowTimeoutIds] = useState<string[]>([]);
  const [redTimeoutIds, setRedTimeoutIds] = useState<string[]>([]);

  const [ query, setQuery ] = useState(false)

  const handleYellowTimeout = (bulkId: string) => setYellowTimeoutIds((prev) => [...prev, bulkId])
  const handleRedTimeout = (bulkId: string) => setRedTimeoutIds((prev) => [...prev, bulkId])
  
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        pesquisar: "",
      },
  })
  
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

  function open(value: any) {
    const { carga } = extraction({value:value, bulk:bulk})
    handlePrint(carga)
  }

  function printXlsx() {
    const result:any = bulk.filter(({carga}:any) => carga.bulkStateConf === 'finalizada divergente' || 
                                               carga.bulkStateConf === 'finalizada sucesso')
    const cargas = result.map(({carga}:any) => carga)
    const dataPrint = cargaPrintXlsx(cargas) 
    if (stateSwap) setBulk(varSwap)
    exportFileXlsxRecebimento(dataPrint)

    setStateSwap(false)
  }

  function onSubmit(value:z.infer<typeof formSchema>) {
    getCargasLiberadas().then((val) => {
      const arr = Object.values(val)
      const result:any = arr.filter(({carga}:any) => carga.bulkStateConf === 'finalizada divergente' || 
                                               carga.bulkStateConf === 'finalizada sucesso' && fullDatePrint(carga.bulkConfDate).slice(0, 2) === value.pesquisar.slice(0, 2))
      
      if (result[0] !== undefined) {
        setVarSwap(bulk)
        setBulk(result)
        setStateSwap(true)
      } 
    })

    form.reset({
      pesquisar: ''
    })    
  }

  function cargaPuxada(value:any) {
    const val = value.target.innerText

    if (val === 'LIBERAR') {
      setDataConfirm(true)
      const parent = value.target.parentElement
      const element = bulk.filter(({carga}) => carga.bulkId === parent.id)
      const { carga } = element[0]
      const c = finishCarga(carga)
      setCargaLiberar(c)
      console.log(val)

      return
    }
   
    if (val === 'Sim') {
      setDataConfirm(false)
      setBulkCpd(cargaLiberar)
      return
    } else {
      setDataConfirm(false)
    }

  }
  
  return (
    <div className="main flex flex-col gap-1 p-2 w-full h-[97%] bg-zinc-950 rounded-2xl text-zinc-50">
      <Image
        onClick={() => router.push('/pages/home/recebimento/receiptconf')}
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
        <h1 className="text-4xl">Cargas Finalizadas</h1>
      </div>
      <div className="relative flex justify-between items-start w-full">
        <button onClick={printXlsx} className="self-end w-24 h-6 mb-1 ml-1 rounded-[4px] bg-zinc-100 text-zinc-950">Imprimir</button>
        {dataConfirm && <ValidacaoCargaRetirada props={cargaPuxada} />}
          <div className="flex justify-between gap-2 h-9 p-[1px] bg-zinc-50 rounded-sm">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-end items-center gap-2 pr-1">           
                  <input type="text" placeholder="Insira o código" className="input-quary rounded-sm h-8 p-1 text-zinc-950"/>
                  <button type="submit" className="w-16 h-8 bg-zinc-950 hover:scale-[1.01] rounded-sm" >
                      <MagnifyingGlassIcon className="size-6 text-zinc-100 m-auto"/>
                  </button>
                </form>
              </Form>          
          </div>
      </div>
      
      <div className="flex gap-9 w-full h-full">
        <div className="relative w-full h-[100%] rounded-md bg-zinc-100">
          <div className="w-full bg-zinc-300 pl-1 pr-1 rounded-t-sm mb-[0.90px]">
            <ul className="grid grid-cols-9 gap-8 text-zinc-950">
              <li className="col-start-1 place-self-center">Controle</li>
              <li className="col-start-2 place-self-center">Doca</li>
              <li className="col-start-3 place-self-center">Agenda</li>
              <li className="col-start-4 place-self-center">Data</li>
              <li className="col-start-5 place-self-center">Hora</li>
              <li className="col-start-6 place-self-center">Tempo</li>
              <li className="col-start-7 place-self-center">Situação</li>
              <li className="col-start-8 place-self-end">Imprimir</li>
              <li className="col-start-9 place-self-center">Editar</li>
            </ul>
          </div>
          <ScrollArea className="w-full h-full">
            {
              bulk.map(({carga}, key) => {
                if ((carga.bulkStateConf === 'finalizada sucesso' || carga.bulkStateCpd === 'liberar canhoto') && 
                    carga.bulkStatusLeadTimeReceipt === undefined || carga.bulkStatusLeadTimeReceipt === 'no value') return (
                  <div key={key} className={`flex items-center w-full h-7 rounded-[4px] mb-[1.50px] 
                    ${
                       redTimeoutIds.includes(carga.bulkId)
                      ? 'bg-red-400 hover:bg-red-500'
                      : yellowTimeoutIds.includes(carga.bulkId)
                      ? 'bg-yellow-400 hover:bg-yellow-500'
                      : 'bg-zinc-200 hover:bg-zinc-300'
                    }`                    
                  }>
                    <ul className="grid grid-cols-9 gap-10 text-[15px] w-full mb-[0.90px] text-zinc-950">
                      <li className="col-start-1 place-self-center">{carga.bulkControl.toUpperCase()}</li>
                      <li className="col-start-2 place-self-center">{carga.bulkDoca.toUpperCase()}</li>
                      <li className="col-start-3 place-self-center">{carga.bulkAgenda.toUpperCase()}</li>
                      <li className="col-start-4 place-self-center">{fullDatePrint(carga.bulkConfDate).toUpperCase()}</li>
                      <li className="col-start-5 place-self-center">{hourPrint(carga.bulkConfDate).toUpperCase()}</li>
                      <li className="col-start-6 place-self-center">
                        <Timer props={{
                          date: carga.bulkConfDate,
                          onYellowLimitReached: () => handleYellowTimeout(carga.bulkId),
                          onRedLimitReached: () => handleRedTimeout(carga.bulkId),
                          yellowLimitSeconds: 1800, 
                          redLimitSeconds: 3200 
                        }} />
                      </li>
                      <li id={carga.bulkId} className="col-start-7 w-48 place-self-start"> 
                          {carga.bulkStateConf.toUpperCase()}
                      </li>        
                      <li id={carga.bulkId} className="col-start-8 place-self-end">
                        <h1 onClick={(element) => cargaPuxada(element)} className="hover:scale-[1.01] hover:cursor-pointer bg-zinc-900 rounded-[4px] text-zinc-50 pl-2 pr-2">LIBERAR</h1>
                      </li>      
                      <li id={carga.bulkId} className="col-start-9 place-self-center">
                        <Image
                          onClick={(value) => open(value)}
                          className="cursor-pointer hover:scale-[1.10] mr-5"
                          src={'/impressora-com-papel.png'}
                          width={22}
                          height={22}
                          alt="icon impressora."
                        />
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
