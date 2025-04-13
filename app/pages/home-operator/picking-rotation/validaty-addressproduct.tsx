'use client'

import { useEffect, useState } from "react";

import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem,  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { setActivityDb } from "@/app/firebase/fbmethod"
import { Task, TaskEndProd } from "@/app/class/class-task";

import { useActiviContext } from "@/app/context/acitivy-context"

const formSchema = z.object({
  loadAddress: z.string().min(2, {
    message: "É preciso ler o código do endereço.",
  }),
  loadProduct: z.string().min(2, {
    message: "É preciso ler o código do produto.",
  }),
})

// Component Login....
export default function ValidatyAddressProduct({...props}:any) {
  
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
        loadProduct: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log()
    const initTask = atividade.activityName === 'Aéreo vazio' ? new Task(data) : new TaskEndProd(data)
    console.log(initTask)
    setTask((tsk):any => [...tsk, initTask])

    form.reset({
        loadAddress: "",
        loadProduct: "",
    })
  }

  function pushTasks() {
    atividade.updateTask = JSON.stringify(task)
    atividade.updateState(false)    
    setActivityDb(atividade)
    
    window.location.reload()
  }

  return (
    <div className="absolute flex flex-col items-center justify-center w-full space-y-10">
      <h1 className="text-xl">Produto x Endereço</h1>
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
          <Button type="submit" className="w-full h-8 mt-6">Confirmar</Button>
          </form>
          <Button className="w-full h-8 mt-2" onClick={pushTasks}>Finalizar</Button>
      </Form>
    </div>
  );
}
