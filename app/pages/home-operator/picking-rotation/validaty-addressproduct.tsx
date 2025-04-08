'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem,  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const formSchema = z.object({
  loadAddress: z.string().min(2, {
    message: "É preciso ler o código do endereço.",
  }),
  loadProduct: z.string().min(2, {
    message: "É preciso ler o código do produto.",
  }),
  loadAmout: z.string().min(2, {
    message: "É preciso inserir a quantidade.",
  }),
  loadValidityDate: z.string().min(2, {
    message: "É preciso inserir a quantidade.",
  }),
})

// Component Login....
export default function ValidatyAddressProduct({...props}:any) {
  
  useEffect(() => {
    const title:any = document.querySelector('.titleApp')
    title.innerText = ''
    const inputAddress:any = document.querySelector('.loadAddress')
    inputAddress.focus()
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        loadAddress: "",
        loadProduct: "",
        loadAmout: "",
        loadValidityDate: ""
    },
  })

  function onSubmit(user: z.infer<typeof formSchema>) {
    form.reset({
        loadAddress: "",
        loadProduct: "",
    })
  }

  return (
    <div className="absolute flex flex-col items-center justify-center w-full space-y-10">
      <h1 className="text-xl">produto x endereço</h1>
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
              control={form.control}
              name="loadAddress"
              render={({ field }) => (
              <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                  <Input placeholder="Leia o endereço" className="loadAddress h-8" {...field} />
                  </FormControl>
                  <FormDescription>
                  </FormDescription>
                  <FormMessage />
              </FormItem>
              )}
          />
          <FormField
              control={form.control}
              name="loadProduct"
              render={({ field }) => (
              <FormItem>
                  <FormLabel>Produto</FormLabel>
                  <FormControl>
                  <Input placeholder="Leia o produto" className="loadProduct h-8" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
              </FormItem>
              )}
          />
          <Button type="submit" className="w-full h-8">Confirmar</Button>
          <Button className="w-full h-8">Finalizar</Button>
          </form>
      </Form>
    </div>
  );
}
