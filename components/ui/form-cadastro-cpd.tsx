'use client'

import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./form"
import { Input } from "./input"
import { Button } from "./button"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { EvolutionApi } from "@/app/evolution-api/evolution-methods"
import { ReceiptMello } from "@/app/class/class-task"
import { setBulkCpd } from '@/lib/firebase/server-database'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import LaddaButton, {EXPAND_LEFT} from 'react-ladda-button'
import { useState } from 'react'

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
    const [ isSubmitting, setIsSubmitting] = useState(false);
      
    function getNameMotorista(name:any) {
        const { conversation } = name
        const n = conversation.split(' ')
        return n[1]
    }

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

    async function onSubmit(cargo: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        if (cargo.telefone.length < 11) {
            toast.error('Número de telefone não corresponde ao número válido.', {
                position: "top-right",
                autoClose: 4000,
            })
            form.setFocus('telefone')
            return
        }

        const statusCarga = 'Chegada carro'
        const descriptionCarga = 'Chegada do motorista no centro de distribuição.'
        const userr = {
            userName: user.user.first,
            userLocalWork: user.user.center
        }

        const carga = new ReceiptMello({carga:cargo, cpdOperator:userr})
        carga.alterBulkStateCpd(statusCarga)
        carga.alterBulkStateConf('no value')
        carga.alterBulkStateReceipt('no value')
        carga.alterBulkStateCpdDescription(descriptionCarga)
        let val = false
        try {
            setBulkCpd({...carga, userCenter: user.user.center})
            val = true
        } catch (error) {
            console.log(`Erro ao tentar enviar messagem. Error: ${error}`)      
        }
        
        try {      
            const evolution = new EvolutionApi()
            const result = await evolution.sentTextWelcome(carga)

            if (result.message) {
                const name = result.message
                const motorista = getNameMotorista(name)
                const msg = `Mensagem enviada com sucesso para o motorista: ${motorista}`
                toast.success(msg, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            } else {
                toast.error('Edmar'/**result*/, {
                    position: "top-right",  
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            } 
            console.log(val)
        } catch (error) {
            toast.error(`Erro ao tentar enviar mensagem. Error: ${error}`, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
                return `Erro ao tentar enviar messagem. Error: ${error}`
        }

        form.reset({
            motorista: "",
            transportadora: "",
            placa: "",
            ticket: "",
            controle: "",
            telefone: ""
        })
        setIsSubmitting(false);
    }

    return (
        <div className='h-full'>
            <Form {...form}>
                <ToastContainer />
                <form onSubmit={form.handleSubmit(onSubmit)} className="self-start flex flex-col w-60 h-full bg-zinc-100 p-4 rounded-2xl">
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
                <Button type="submit" disabled={isSubmitting} className="w-full h-8 cursor-pointer mt-3">Salvar</Button>
                </form>
            </Form>
        </div>
    )
}