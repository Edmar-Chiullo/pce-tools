'use client'

import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem  } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod"
import { useForm } from "react-hook-form"

import Image from "next/image";

import { setBulkCpd } from "@/app/firebase/fbmethod"
import { useRouter } from "next/navigation"

import { useReceiptContext } from "@/app/context/carga-context"
import { finishCarga } from "./finishCarga";
        
const FormSchema = z.object({
    conf: z.string().min(2, {
        message: "É nescessario inserir o número de inscrição.",
    }),
    tpallet: z.string().min(2, {
        message: "Insira o total de pallet.",
    }), 
    tcarga: z.string().min(2, {
        message: "Insira o tipo da carga.",
    }), 
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
    observation: z.string().min(2, {
        message: "É nescessario uma observação.",
    })
})

export default function PegeResponse() {

    const { receipt, setReceipt }:any = useReceiptContext()
    const router = useRouter()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            conf: receipt.bulkReceiptOperator,    
            tpallet: receipt.bulkQtPallet,
            tcarga: receipt.bulkTipoCarga,
            items: [],
            observation: 'no value'
        },
    })

    function onSubmit({conf, tpallet, tcarga, items, observation }: z.infer<typeof FormSchema>) {
        const obj = finishCarga({dataForm:receipt, label:items[0], text:observation, conf,  tpallet, tcarga})
        setBulkCpd(obj)
        setReceipt(obj)

        form.reset({
            conf: '',
            tpallet: '',
            tcarga: ''
        })

       router.push('/pages/receiptconf')
    }

    const items = [
        {
            id: "finalizada sucesso",
            label: "Finalizada com sucesso!",
        },
        {
            id: "finalizada divergente",
            label: "Carga com divergência",
        },
    ] as const
    
    return (
        <div className="w-full h-full bg-zinc-50 rounded-[4px] pt-1 p-6">
            <div className="flexitems-center justify-center w-full">
                <Image 
                    onClick={() => router.push('/pages/receiptconf')}
                    className="cursor-pointer hover:scale-[1.10] mb-2"
                    src={'/seta-esquerda.png'}
                    width={20}
                    height={20} 
                    alt="Proxima página."
                />
                
                <h1 className="text-2xl mb-2">Finalizar carga</h1>
                <hr />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mt-2">
                        <div className="flex justify-between">
                            <FormField
                                control={form.control}
                                name="conf"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Identificação do conferente</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Número de inscrição" className="conf w-96" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="tpallet"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quantidade de pallet</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Quantidade de pallet" className="tpallet w-96" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="tcarga"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipo da carga</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Tipo da carga" className="tcarga w-96" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
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
                                                    className="flex flex-row items-center gap-2 mb-2"
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
                                        className="resize-none h-42"
                                        {...field}
                                    />
                                    </FormControl>
                                    <FormDescription>
                                        Você pode mencionar um texto breve sobre o estado atual da carga.
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
        