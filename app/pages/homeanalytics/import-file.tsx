// components/UploadExcel.tsx
import { useState } from 'react'

import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem,  } from "@/components/ui/form";

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"



const formSchema = z.object({
    file: z.string().min(2, {
      message: "É nescessario selecionar o arquivo.",
    }),
})

export default function UploadExcel() {
    const [file, setFile] = useState<File | null>(null)


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        file: "",
        },
    })
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
        setFile(e.target.files[0])
        }
    }

    const handleUpload = async () => {
        if (!file) return

        const formData = new FormData()
        formData.append('file', file)

        const res = await fetch('/api/read-file', {
        method: 'POST',
        body: formData,
        })

        const data = await res.json()
        console.log(data)
    }

    function onSubmit() {
        return
    }
    return (
        <div className='flex flex-col w-full'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                    <FormField
                        control={form.control}
                        name="file"
                        render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Carregar arquivo</FormLabel>
                            <FormControl>
                                <Input type="file" className="login w-full h-9" {...field} />
                            </FormControl>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">Carregar arquivo</Button>
                </form>
            </Form>
            <input type="file" onChange={handleChange} accept=".xlsx" />
            <button onClick={handleUpload} >Enviar</button>
        </div>
    )
}
