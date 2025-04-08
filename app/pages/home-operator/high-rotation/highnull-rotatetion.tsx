'use client'

import { useForm } from "react-hook-form"
import { useEffect } from "react";

import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem,  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Activity } from "@/app/class/class-activity";

const formSchema = z.object({
  loadAddress: z.string().min(2, {
    message: "É preciso ler o código do endereço.",
  }),
})
// Component Login....
export default function HighNullRotation({...props}: any) {
  
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
    },
  })

  function onSubmit(user: z.infer<typeof formSchema>) {

    form.reset({
        loadAddress: "",
    })
  }

  return (
    <div className="absolute flex flex-col items-center justify-center w-full space-y-10">
      <h1 className="lg:text-7xl text-xl sm:text-5xl">Rotativo de aéreo</h1>
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 lg:w-[40%] md:w-[50%] smLight:w-[90%]">
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
          <Button type="submit" className="w-full h-8 mt-10">Confirmar</Button>
          <Button className="w-full h-8 mt-4">Finalizar</Button>
          </form>
      </Form>
    </div>
  );
}
