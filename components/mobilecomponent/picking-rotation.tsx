'use client'

import { useEffect, useState } from "react";

import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem,  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { setActivityDb } from "@/app/firebase/fbmethod"

import { useActiviContext } from "@/app/context/acitivy-context";
import { TaskPickingRotation } from "@/app/class/class-task";

const formSchema = z.object({
  loadAddress: z.string().min(9, {
    message: "O código do endereço precisa conter no mínimo 9 dígitos..",
  }).max(9, {
    message: "Quantidade de dígitos superior ao do endereço cadastrado."
  }),
  loadProduct: z.string().min(2, {
    message: "É preciso ler o código do produto.",
  }).max(14, {
    message: "O valor não corresponde ao DUN ou EAN do produto."
  }),
  loadQuant: z.string().min(1, {
    message: "É preciso inserir a quantidade.",
  }),
   loadValid: z.string().min(8, {
    message: "Quantidade de caracter não pode ser inferior à 8 caracters.",
  }).max(8, {
    message: "Quantidade de caracter não pode ser superior à 8 caracters.",
  })
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

  function validAddress(address:any) {
    const prefix = [ 'PP', 'FR', 'TP', 'FB', 'BL', 'CF']
    const result = prefix.filter((pr) => pr === address)
    
    return result[0]
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    const { loadAddress, loadProduct, loadQuant, loadValid }:any = data
    const initCharAddress = loadAddress.slice(0,2)
   
    const result = validAddress(initCharAddress)
    if(!result) {
      alert('Código no campo endereço não é válido.')
      return
    } 
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
    <div className="absolute flex flex-col items-center justify-center w-full">
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
