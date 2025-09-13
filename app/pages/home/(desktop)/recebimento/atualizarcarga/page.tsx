'use client'

import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { setBulkCpd } from "@/app/firebase/fbmethod"
import { useRouter } from "next/navigation"
import { carga } from "@/utils/create-carga";

import { useReceiptContext } from "@/app/context/carga-context"
import { useLoginContext } from "@/app/context/user-context";

const formSchema = z.object({
  doca: z.string().min(2, {
    message: "Inserir o número da porta.",
  }),
})
        
export default function PegeResponse() {

    const { receipt }:any = useReceiptContext()
    const { user } = useLoginContext() 
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
        defaultValues: {
            doca: receipt?.bulkDoca,
        },
    })

    function onSubmit(cargo: z.infer<typeof formSchema>) {
        const obj:any = carga({dataForm:cargo, carga:receipt, situacao:'recebendo', user:user})
        setBulkCpd(obj)  
        
        form.reset({
            doca: "",
        })

        router.push('/pages/receipt-operator')
    }
    
    return (
    <div className="absolute top-0 left-0 z-10 w-full h-full bg-zinc-50 rounded-[4px] p-1">
        <div className="flex flex-col items-center justify-center gap-4 w-full h-56 pl-3">
        <h1 className="lg:text-2xl md:text-6xl sm:text-4xl self-start">EDITAR</h1>
        <div className="flex w-full">
            <div className="w-full">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-6 w-full h-18">
                        <FormField
                            control={form.control}
                            name="doca"
                            render={({ field }) => (
                            <FormItem className="flex flex-col justify-center">
                                <FormLabel>Doca</FormLabel>
                                <FormControl>
                                    <Input placeholder="Doca" className="doca w-48 h-8" {...field} />
                                </FormControl>
                                <FormDescription></FormDescription>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <Button type="submit" className="place-self-end bg-zinc-950 hover:bg-zinc-700 cursor-pointer w-24 mb-3">Editar</Button>
                    </form>
                </Form>
            </div>
        </div>
        </div>
        <hr />
    </div>
    )
}
        