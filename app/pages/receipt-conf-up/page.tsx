'use client'

import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem  } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod"
import { useForm } from "react-hook-form"

import { setBulkCpd } from "@/app/firebase/fbmethod"
import { setBulkReceipt } from "@/app/firebase/fbmethod";
import { useRouter } from "next/navigation"
import { carga } from "@/utils/create-carga";

import { useReceiptContext } from "@/app/context/carga-context"
import { useLoginContext } from "@/app/context/user-context";
import Combobox from "@/components/ui/combo-box";

import { finishCarga } from "./finishCarga";
        
const FormSchema = z.object({
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
    observation: z.string().min(2, {
        message: "É nescessario uma observação.",
    })
})

export default function PegeResponse() {

    const { receipt }:any = useReceiptContext()
    const { user } = useLoginContext() 
    const router = useRouter()


    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
        items: [],
        observation: 'Finalizado.'
        },
    })

    function onSubmit({items, observation }: z.infer<typeof FormSchema>) {
        const obj = finishCarga({dataForm:receipt, label:items[0], text:observation})
        setBulkCpd(obj)
        router.push('/pages/receipt-conf')
    }

    const items = [
        {
            id: "Finalizada",
            label: "Finalizada",
        },
        {
            id: "varia",
            label: "Finalizada com avária",
        },
        {
            id: "sobra",
            label: "Finalizada com sobra",
        },
        {
            id: "falta",
            label: "Finalizada com falta",
        },
        {
            id: "trocado",
            label: "Finalizado com materiais trocados",
        },
        {
            id: "divergencia",
            label: "Carga com divergência",
        },
    ] as const
    
    return (
    <div className="w-full h-full bg-zinc-50 rounded-[4px] p-1">
        <div className="flexitems-center justify-center gap-4 w-full h-56 pl-3">
            <h1 className="text-2xl">Finalizar carga</h1>
            <hr />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="items"
                        render={() => (
                        <FormItem>
                            <div className="mb-4">
                                <FormLabel className="text-base">Opções</FormLabel>
                                <FormDescription>
                                    Selecione a opção que defina sua carga.
                                </FormDescription>
                            </div>
                            {items.map((item) => (
                                <FormField
                                    key={item.id}
                                    control={form.control}
                                    name="items"
                                    render={({ field }) => {
                                        return (
                                            <FormItem
                                                key={item.id}
                                                className="flex flex-row items-center gap-2"
                                            >
                                    <FormControl>
                                    <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                        return checked
                                            ? field.onChange([...field.value, item.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                (value) => value !== item.id
                                                )
                                            )
                                        }}
                                    />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                    {item.label}
                                    </FormLabel>
                                </FormItem>
                                )
                            }}
                            />
                        ))}
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                        control={form.control}
                        name="observation"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Observações</FormLabel>
                                <FormControl>
                                    <Textarea
                                    placeholder="Observações..."
                                    className="resize-none"
                                    {...field}
                                />
                                </FormControl>
                                <FormDescription>
                                    Você pode mencionar texto breve mencionando o estado atual da carga.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    <Button type="submit">Finalizar</Button>
                </form>
            </Form>
        </div>
    </div>
    )
}
        