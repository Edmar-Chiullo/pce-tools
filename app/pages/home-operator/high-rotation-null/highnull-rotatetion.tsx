'use client'

import { useForm } from "react-hook-form"
import { useEffect, useState } from "react";

import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem,  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Task } from "@/app/class/class-task";

import { useActiviContext } from "@/app/context/acitivy-context";
import { setActivityDb } from "@/app/firebase/fbmethod";

const formSchema = z.object({
  loadAddress: z.string().min(2, {
    message: "É preciso ler o código do endereço.",
  }),
})
// Component Login....
export default function HighNullRotation({...props}: any) {

  const [ task, setTask ] = useState([])
  
  const { atividade }:any = useActiviContext()

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

  function onSubmit({loadAddress}: z.infer<typeof formSchema>) {
    const initTask = new Task(loadAddress)
    setTask((tsk):any => [...tsk, initTask])

    form.reset({
        loadAddress: "",
    })
  }

  function pushTasks() {
    atividade.updateTask = JSON.stringify(task)
    atividade.updateState(false)    
    setActivityDb(atividade)
    
    window.location.reload()
  }

  return (
    <div className="absolute flex flex-col items-center justify-center w-full">
      <h1 className="md:text-xl lg:text-2xl mb-14">Rotativo de aéreo</h1>
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full">
            <FormField
                control={form.control}
                name="loadAddress"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-[11px]">Endereço</FormLabel>
                    <FormControl>
                      <Input placeholder="Leia o endereço" className="loadAddress h-7 md:h-8 lg:h-9" {...field} />
                    </FormControl>
                    <FormDescription>
                    </FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />
            <Button type="submit" className="w-full h-7 md:h-9 lg:h-10 mt-10">Confirmar</Button>
          </form>
          <Button className="w-full h-7 md:h-9 lg:h-10 mt-4" onClick={pushTasks}>Finalizar</Button>
      </Form>
    </div>
  )
}
