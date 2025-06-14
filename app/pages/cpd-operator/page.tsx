'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";

import { ref, onChildAdded } from "firebase/database";
import { db } from "@/app/firebase/fbkey";

import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { fullDatePrint, fullDate, hourPrint } from "@/utils/date-generate";
import { setBulkCpd } from "@/app/firebase/fbmethod";

import { Receipt, ReceiptMello } from "@/app/class/class-task";
import Timer from "@/components/ui/span";
import Image from "next/image";

import { useReceiptContext } from "@/app/context/carga-context";
import { useLoginContext } from "@/app/context/user-context";

const formSchema = z.object({
  motorista: z.string().min(2, {
    message: "Inserir com o nome do motorista.",
  }),
  transportadora: z.string().min(2, {
    message: "Inserir o nome da transportadora",
  }),
  placa: z.string().min(2, {
    message: "Inserir o número da placa.",
  }),
  ticket: z.string().min(2, {
    message: "Inserir o número do ticket.",
  }),
  controle: z.string().min(2, {
    message: "Inserir o número do controle.",
  }),  
  telefone: z.string().min(2, {
    message: "Inserir o número de telefone.",
  }), 
})

// Component Login....

export default function ReceiptScreen() {

  const [ bulk, setBulk ] = useState<any[]>([])
  const [ callResponse, setCallResponse ] = useState<boolean>(false)
  const [ elementResponse, setElementResponse ] = useState<any | null>()

  const { setReceipt } = useReceiptContext()
  const { user } = useLoginContext()
  const router = useRouter()

  useEffect(() => {
    const strDate = fullDate()
    .replace('/','')
    .replace('/','')

    const cargaReceipt = ref(db, `activity/receipt/${strDate.slice(4,8)}/${strDate.slice(2,8)}/`)   
    onChildAdded(cargaReceipt, (snapshot) => {
        if (snapshot.exists()) {
            const result = Object.values(snapshot.val())
            setBulk((object:any) => [...object, result[0]])
        } else {
            return "No data available"
        }
    })    
  }, [])

  useEffect(() => {
    if (elementResponse !== undefined) setCallResponse(true)
  } , [elementResponse])
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      motorista: "",
      transportadora: "",
      placa: "",
      ticket: "",
      controle: "",
      telefone: ""
    },
  })

  function openCarga(value: any) {
    const parent = value.target.parentElement
    const element = bulk.filter(({bulkId}) => bulkId === parent.id)

    setReceipt(element[0])

    router.push('/pages/cpd-update')
  }

  function onSubmit(cargo: z.infer<typeof formSchema>) {
    const statusCarga = 'Entrada'
    const descriptionCarga = 'Liberada pelo CPD'
    
    const carga = new ReceiptMello({carga:cargo, cpdOperator:user})
    carga.alterBulkState(statusCarga)
    carga.alterBulkStateCpdDescription(descriptionCarga)
    
    setBulkCpd(carga)    
    form.reset({
      motorista: "",
      transportadora: "",
      placa: "",
      ticket: "",
      telefone: ""
    })
  }

  return (
    <div className="main flex p-3 h-screen">
      <div className="flex flex-col items-center justify-center gap-10 w-80 h-[95vh] pl-3">
        <h1 className="lg:text-2xl md:text-6xl sm:text-4xl self-start">CPD - RECEBIMENTO</h1>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="self-start flex flex-col gap-2">
              <FormField
                  control={form.control}
                  name="motorista"
                  render={({ field }) => (
                  <FormItem>
                      <FormLabel>Motorista</FormLabel>
                      <FormControl>
                      <Input placeholder="Motorista" className="motorista h-8" {...field} />
                      </FormControl>
                      <FormDescription>
                      </FormDescription>
                      <FormMessage />
                  </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="transportadora"
                  render={({ field }) => (
                  <FormItem>
                      <FormLabel>Transportadora</FormLabel>
                      <FormControl>
                      <Input placeholder="Transportadora" className="transportadora h-8" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                  </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="placa"
                  render={({ field }) => (
                  <FormItem>
                      <FormLabel>Placa</FormLabel>
                      <FormControl>
                      <Input placeholder="Placa" className="placa h-8" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                  </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="ticket"
                  render={({ field }) => (
                  <FormItem>
                      <FormLabel>Agenda</FormLabel>
                      <FormControl>
                      <Input placeholder="Agenda" className="ticket h-8" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                  </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="controle"
                  render={({ field }) => (
                  <FormItem>
                      <FormLabel>Controle</FormLabel>
                      <FormControl>
                      <Input placeholder="Controle" className="controle h-8" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                  </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="telefone"
                  render={({ field }) => (
                  <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                      <Input placeholder="Telefone" className="telefone h-8" {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                  </FormItem>
                  )}
              />
              <Button type="submit" className="w-full h-8 cursor-pointer">Salvar</Button>
            </form>
        </Form>
      </div>
      <div className="relative self-end w-[100%] h-[82%] rounded-md p-1 bg-zinc-50">
        <div className="w-full bg-zinc-950 pl-1 pr-1 rounded-t-sm">
          <ul className="grid grid-cols-11 gap-8 text-zinc-50">
            <li className="col-start-1 col-span-2">Motorista</li>
            <li className="col-start-3 col-span-2">Transportadora</li>
            <li className="col-start-5 place-self-center">Agenda</li>
            <li className="col-start-6 place-self-center">Controle</li>
            <li className="col-start-7 place-self-center">Telefone</li>
            <li className="col-start-8 place-self-center">Status</li>
            <li className="col-start-9 place-self-center">Data</li>
            <li className="col-start-10 place-self-center">Timer</li>
            <li className="col-start-11 place-self-end mr-2">Editar</li>
          </ul>
        </div>
        <ScrollArea className="w-full h-full">
          {
            bulk.map((carga, key) => {
              return (
                <div key={key} className="w-full h-6 mb-1 pl-1 pr-1 rounded-[4px] bg-zinc-100 hover:bg-zinc-200">
                  <ul className="grid grid-cols-11 gap-8 text-[15px]">
                    <li className="col-start-1 col-span-2">{carga.bulkDriver.toUpperCase()}</li>
                    <li className="col-start-3 col-span-2">{carga.bulkCarrier.toUpperCase()}</li>
                    <li className="col-start-5 place-self-center">{carga.bulkAgenda.toUpperCase()}</li>
                    <li className="col-start-6 place-self-center">{carga.bulkControl.toUpperCase()}</li>
                    <li className="col-start-7 place-self-center">{carga.bulkDriverPhoneNumber.toUpperCase()}</li>
                    <li className="col-start-8 place-self-center">{fullDatePrint(carga.bulkCpdDate)}</li>
                    <li className="col-start-9 place-self-center">{hourPrint(carga.bulkCpdDate)}</li>
                    <li className="col-start-10 place-self-center"><Timer props={{date:carga.bulkCpdDate, k:key}} /></li>
                    <li id={carga.bulkId} onClick={(value) => openCarga(value)} className="col-start-11 place-self-end self-start pr-5"> 
                      <Image 
                        onClick={(value) => openCarga(value)}
                        className="cursor-pointer hover:scale-[1.10]"
                        src={'/proximo.png'}
                        width={20}
                        height={20} 
                        alt="Proxima página."
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
  );
}
