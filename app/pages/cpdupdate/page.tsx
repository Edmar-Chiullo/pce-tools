'use client'

import { useEffect, useState } from "react";

import { useReceiptContext } from "@/app/context/carga-context"
import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem,  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form"
import { Switch } from "@/components/ui/switch";

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import Image from "next/image";

import { setBulkCpd } from "@/app/firebase/fbmethod";
import { useRouter } from "next/navigation";
import { carga } from "./create-carga";
import { Textarea } from "@/components/ui/textarea";

import { EvolutionApi } from "@/app/evolution-api/evolution-methods";

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
  liberado: z.boolean()
})
        
export default function PegeResponse() {

    const [ state, setState ] = useState<string | null>(null)
    const [ permitionCargaState, setPermitinCargaState ] = useState<string | null>(null)
    
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
        textarea: receipt?.bulkStateReceiptDescription,
        liberado: false
    },
    })

    function onSubmit(cargo: z.infer<typeof formSchema>) {
        if (cargo.textarea === 'no value') {
            const obj = carga({dataForm:cargo, carga:receipt })
            setBulkCpd(obj)  

            form.reset({
                motorista: "",
                transportadora: "",
                placa: "",
                ticket: "",
                telefone: ""
            })
    
            router.push('/pages/cpdoperator')
        } else {
           try {      
                const evolution = new EvolutionApi()
                const restult = evolution.sentTextDiverCpd(cargo)
            } catch (error) {
                return `Erro ao tentar enviar messagem. Error: ${error}`
            }

            // router.push('/pages/cpdoperator')
        }
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
        <div className="flex flex-col items-center justify-center gap-4 w-full h-56 pl-3 pr-3">
            <div className={`flex flex-col w-full h-[70%]`}>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="relative self-start flex flex-wrap gap-6">
                            <FormField
                                control={form.control}
                                name="motorista"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Motorista</FormLabel>
                                    <FormControl>
                                    <Input placeholder="Motorista" className="motorista w-96 h-8" {...field} />
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
                                    <Input placeholder="Transportadora" className="transportadora w-96 h-8" {...field} />
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
                                    <Input placeholder="Placa" className="placa w-96 h-8" {...field} />
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
                                    <Input placeholder="Agenda" className="ticket w-96 h-8" {...field} />
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
                                    <Input placeholder="Controle" className="controle w-96 h-8" {...field} />
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
                                    <Input placeholder="Telefone" className="telefone w-96 h-8" {...field} />
                                    </FormControl>
                                    <FormDescription></FormDescription>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="liberado"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center gap-2">
                                    <FormLabel>Liberar para descarga:</FormLabel>
                                    <FormControl>
                                        <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </div>
                <div className={`w-full h-20 mt-4`}>
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
                            <Button type="submit" className="w-32">Enviar</Button>            
                        </form>
                    </Form>
                </div>
            </div>        
        </div>
    </div>
    )
}
        