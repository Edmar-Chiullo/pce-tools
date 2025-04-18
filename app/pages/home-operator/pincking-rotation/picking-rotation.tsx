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

import { useActiviContext } from "@/app/context/acitivy-context";
import { createTasks } from "@/utils/createTask";
import { TaskPickingRotation } from "@/app/class/class-task";

const formSchema = z.object({
  loadAddress: z.string().min(2, {
    message: "É preciso ler o código do endereço.",
  }),
  loadProduct: z.string().min(2, {
    message: "É preciso ler o código do produto.",
  }),
  loadQuant: z.string().min(2, {
    message: "É preciso inserir a quantidade.",
  }),
  loadValid: z.string().min(2, {
    message: "Insira a data validade.",
  }),
})

// Component Login....
export default function PickingRotation() {
  
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
        loadQuant: "",
        loadValid: ""
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    const initTask = new TaskPickingRotation(data)
    setTask((tsk):any => [...tsk, initTask])

    form.reset({
        loadAddress: "",
        loadProduct: "",
        loadQuant: "",
        loadValid: ""
    })
  }

  function pushTasks() {
    atividade.updateTask = JSON.stringify(task)
    atividade.updateState(false)    
    setActivityDb(atividade)
    
    window.location.reload()
  }

  return (
    <div className="absolute flex flex-col gap-3 items-center justify-center w-full">
      <h1 className="md:text-xl lg:text-2xl">Rotativo De Picking</h1>
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
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
          <FormField
              control={form.control}
              name="loadProduct"
              render={({ field }) => (
              <FormItem>
                  <FormLabel className="text-[11px]">Produto</FormLabel>
                  <FormControl>
                    <Input placeholder="Leia o produto" className="loadProduct h-7 md:h-8 lg:h-9" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
              </FormItem>
              )}
          />
          <FormField
              control={form.control}
              name="loadQuant"
              render={({ field }) => (
              <FormItem>
                  <FormLabel className="text-[11px]">Quantidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Quantidade" className="loadQuant h-7 md:h-8 lg:h-9" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
              </FormItem>
              )}
          />
          <FormField
              control={form.control}
              name="loadValid"
              render={({ field }) => (
              <FormItem>
                  <FormLabel className="text-[11px]">Validade</FormLabel>
                  <FormControl>
                    <Input placeholder="Validade" className="loadValid h-7 md:h-8 lg:h-9" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
              </FormItem>
              )}
          />
          <Button type="submit" className="w-full h-7 md:h-9 lg:h-10 mt-3">Confirmar</Button>
          </form>
          <Button className="w-full h-7 md:h-9 lg:h-10 mt-1" onClick={pushTasks}>Finalizar</Button>
      </Form>
    </div>
  );
}
