'use client'

// import { Form, useForm } from "react-hook-form"
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./form"
import { Input } from "./input"
import { Button } from "./button"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { EvolutionApi } from "@/app/evolution-api/evolution-methods"
import { ReceiptMello } from "@/app/class/class-task"
import { setBulkCpd } from "@/app/firebase/fbmethod"


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

export default function FormCadastroCpd(user: {user: {user: string} | any}) {
      
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

    function onSubmit(cargo: z.infer<typeof formSchema>) {
        if (cargo.telefone.length < 11) {
            alert('Número de telefone não cerresponde ao número válido.')
            form.setFocus('telefone')
            return
        }

        const statusCarga = 'chegada carro'
        const descriptionCarga = 'chegada do motorista no centro de distribuição.'
        
        const userr = {
            userName: user.user.first
        }

        const carga = new ReceiptMello({carga:cargo, cpdOperator:userr})
        carga.alterBulkStateCpd(statusCarga)
        carga.alterBulkStateConf('no value')
        carga.alterBulkStateReceipt('no value')
        carga.alterBulkStateCpdDescription(descriptionCarga)
        try {      
            const evolution = new EvolutionApi()
            const result = evolution.sentTextWelcome(carga)
            console.log(result)
        } catch (error) {
            return `Erro ao tentar enviar messagem. Error: ${error}`
        }

        setBulkCpd(carga)    
        form.reset({
            motorista: "",
            transportadora: "",
            placa: "",
            ticket: "",
            controle: "",
            telefone: ""
        })
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="self-start flex flex-col w-72 h-full bg-zinc-100 p-4 rounded-2xl">
                <FormField
                    control={form.control}
                    name="motorista"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Motorista</FormLabel>
                        <FormControl>
                        <Input placeholder="Motorista" className="motorista h-8 bg-white" {...field} />
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
                        <Input placeholder="Transportadora" className="transportadora h-8 bg-white" {...field} />
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
                        <Input placeholder="Placa" className="placa h-8 bg-white" {...field} />
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
                        <Input placeholder="Agenda" className="ticket h-8 bg-white" {...field} />
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
                        <Input placeholder="Controle" className="controle h-8 bg-white" {...field} />
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
                        <Input placeholder="Telefone" className="telefone h-8 bg-white" {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button type="submit" className="w-full h-8 cursor-pointer mt-3">Salvar</Button>
                </form>
            </Form>
        </>
    )
}