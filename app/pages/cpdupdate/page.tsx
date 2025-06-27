'use client'

import { useEffect, useState } from "react";

import { useReceiptContext } from "@/app/context/carga-context"
import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem,  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import Image from "next/image";

import { setBulkCpd } from "@/app/firebase/fbmethod";
import { useRouter } from "next/navigation";
import { carga } from "./create-carga";
import { Textarea } from "@/components/ui/textarea";

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
  textarea: z.string().min(2, {
    message: "Inserir descrição sobre a carga.",
  }), 
})
        
export default function PegeResponse() {

    const [ state, setState ] = useState<string | null>(null)
    
    const { receipt }:any = useReceiptContext()

    useEffect(() => {
        setState(receipt.bulkState)
    }, [])

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        motorista: receipt?.bulkDriver,
        transportadora: receipt?.bulkCarrier,
        placa: receipt?.bulkPlate,
        ticket: receipt?.bulkAgenda,
        controle: receipt?.bulkControl,
        telefone: receipt?.bulkDriverPhoneNumber,
        textarea: receipt?.bulkStateReceiptDescription
    },
    })

    function onSubmit(cargo: z.infer<typeof formSchema>) {
                
        const obj = carga({dataForm:cargo, carga:receipt})
        setBulkCpd(obj)  
        
        form.reset({
        motorista: "",
        transportadora: "",
        placa: "",
        ticket: "",
        telefone: ""
        })

        router.push('/pages/cpdoperator')
    }

    return (
    <div className="absolute top-0 left-0 z-10 w-full h-full bg-zinc-50 rounded-[4px] p-1">
        <Image 
             onClick={() => router.push('/pages/cpdoperator')}
                className="ml-3 mt-2 cursor-pointer hover:scale-[1.10]"
                src={'/seta-esquerda.png'}
                width={20}
                height={20} 
                alt="Proxima página."
        />
        <div className="flex flex-col items-center justify-center gap-4 w-full h-56 pl-3">
        <h1 className="lg:text-2xl md:text-6xl sm:text-4xl self-start">{state === 'Finalizada' ? 'Liberar canhoto' : 'Editar'}</h1>
        <div className={`flex flex-col w-full h-[70%]`}>
            <div className={` ${state === 'Finalizada' ? 'hidden' : 'none'}`}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="relative self-start flex flex-wrap gap-2">
                    <FormField
                        control={form.control}
                        name="motorista"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Motorista</FormLabel>
                            <FormControl>
                            <Input placeholder="Motorista" className="motorista w-72 h-8" {...field} />
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
                            <Input placeholder="Transportadora" className="transportadora w-72 h-8" {...field} />
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
                            <Input placeholder="Placa" className="placa w-72 h-8" {...field} />
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
                            <Input placeholder="Agenda" className="ticket w-72 h-8" {...field} />
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
                            <Input placeholder="Controle" className="controle w-72 h-8" {...field} />
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
                            <Input placeholder="Telefone" className="telefone w-72 h-8" {...field} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <Button type="submit" className="absolute self-center right-1 bottom-2 text-2xl w-32 h-26 bg-zinc-950 hover:bg-zinc-700 cursor-pointer">Editar</Button>
                    </form>
                </Form>
            </div>
            <hr className={`w-full h-20 p-4 ${state === 'Finalizada' ? 'none' : 'hidden'}`} />
            <div className={`w-full h-20 p-4 ${state === 'Finalizada' ? 'none' : 'hidden'}`}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="relative flex flex-col gap-2 h-full">
                        <FormField
                            control={form.control}
                            name="textarea"
                            render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Descrição</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Descrição" className="text-area w-full h-48" {...field}/>
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-32">Finalizar</Button>            
                    </form>
                </Form>
            </div>
        </div>
        </div>
        <hr className={`w-full h-20 p-4 ${state === 'Finalizada' ? 'hidden' : 'none'}`}/>
    </div>
    )
}
        