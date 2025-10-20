'use client'

import { useEffect, useState } from "react";

import { useReceiptContext } from "@/app/context/carga-context"
import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import Image from "next/image";

import { setBulkCpd } from "@/app/firebase/fbmethod";
import { useRouter } from "next/navigation";
import { carga } from "./carga";
import { Textarea } from "@/components/ui/textarea";

import { EvolutionApi } from "@/app/evolution-api/evolution-methods";

const formSchema = z.object({
  textarea: z.string().min(2, {
    message: "Inserir descrição sobre a carga.",
  }), 
})
        
export default function LiberarCanhoto() {

    const [ state, setState ] = useState<string | null>(null)
    
    const { receipt }:any = useReceiptContext()

    useEffect(() => {
        setState(receipt.bulkState)
    }, [])

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            textarea: receipt?.bulkStateReceiptDescription,
        },
    })

    function onSubmit(cargo: z.infer<typeof formSchema>) {
        const obj = carga({dataForm:cargo, carga:receipt })
        setBulkCpd(obj)  
        try {      
            const evolution = new EvolutionApi()
            const restult = evolution.sentTextDiverCpdCanhoto({motorista: receipt.bulkDriver, 
                                                        telefone: receipt.bulkDriverPhoneNumber, 
                                                        textarea: cargo.textarea })
        } catch (error) {
            return `Erro ao tentar enviar messagem. Error: ${error}`
        }

        form.reset({
            textarea: '',
        })
        router.push('/pages/home/cpd')
    }

    return (
        <div className="w-full h-full rounded-2xl p-1 bg-zinc-200">
            <Image 
                onClick={() => router.push('/pages/home/cpd')}
                className="ml-3 mt-2 cursor-pointer hover:scale-[1.10]"
                src={'/seta-esquerda.png'}
                width={20}
                height={20} 
                alt="Proxima página."
            />
            <div className="flex items-end w-full h-16">
                <ul className="flex items-center w-full gap-4 list-none ml-4 mr-4 bg-zinc-100 px-2 rounded-[4px]">
                    <li><strong>Agenda:</strong> {receipt?.bulkControl}</li>
                    <li><strong>Motorista:</strong> {receipt?.bulkDriver}</li>
                    <li><strong>Transportadora:</strong> {receipt?.bulkCarrier}</li>
                    <li><strong>Situação:</strong> {receipt?.bulkStateReceipt}</li>
                </ul>
                <hr />
            </div>
            <div className="flex flex-col items-center justify-center gap-4 w-full h-48 pl-3 pr-3">
                <div className={`flex flex-col w-full h-[70%]`}>
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
                                            <Textarea placeholder="Descrição" className="text-area w-full h-48 bg-zinc-50" {...field}/>
                                        </FormControl>
                                        <FormDescription>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-32">Liberar</Button>            
                            </form>
                        </Form>
                    </div>
                </div>        
            </div>
        </div>
    )
}
        