'use client'

import * as React from "react"
import { useState } from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { box } from "@/app/pages/home/(desktop)/recebimento/box"

const FormSchema = z.object({
  status: z.string({
    required_error: "Por favor, selecione o controle.",
  }),
  box: z.string({
    required_error: "Por favor, selecione o box.",
  }),
})

export default function Combobox({ props }: any) {
  const { carga, lbCarga } = props

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const [openStatus, setOpenStatus] = useState(false)
  const [openBox, setOpenBox] = useState(false)

  function onSubmit(data: z.infer<typeof FormSchema>) {
    lbCarga(data)

    form.reset({
      status: '',
      box: ''
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 h-full bg-zinc-100 p-2 rounded-md">
        {/* Combobox Status */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel>Selecionar controle</FormLabel>
              <Popover open={openStatus} onOpenChange={setOpenStatus}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openStatus}
                    className={cn("w-[200px] justify-between", !field.value && "text-muted-foreground")}
                  >
                    {field.value
                      ? carga.find((item: any) => item.carga.bulkControl === field.value)?.carga.bulkControl
                      : "Selecione a opção..."}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Selecione a opção..." />
                    <CommandList>
                      <CommandEmpty>Controle não encontrado.</CommandEmpty>
                      <CommandGroup>
                        {carga
                          .filter((item: any) => item.carga.bulkStateCpd === "Entrada liberada")
                          .map((item: any) => (
                            <CommandItem
                              key={item.carga.bulkId}
                              value={item.carga.bulkControl}
                              onSelect={(currentValue) => {
                                form.setValue("status", currentValue)
                                setOpenStatus(false)
                              }}
                              className="cursor-pointer border-b-2"
                            >
                              <CheckIcon
                                className={cn("h-4 w-4 mr-2", field.value === item.carga.bulkControl ? "opacity-100" : "opacity-0")}
                              />
                              {`CONTROLE: ${item.carga.bulkControl}`}
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Combobox Box */}
        <FormField
          control={form.control}
          name="box"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel>Selecionar box</FormLabel>
              <Popover open={openBox} onOpenChange={setOpenBox}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openBox}
                    className={cn("w-[200px] justify-between", !field.value && "text-muted-foreground")}
                  >
                    {field.value
                      ? box.find((f: any) => f.value === field.value)?.value
                      : "Selecione a opção..."}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Selecione a opção..." />
                    <CommandList>
                      <CommandEmpty>Box não encontrado.</CommandEmpty>
                      <CommandGroup>
                        {box.map((f: any) => (
                          <CommandItem
                            key={f.value}
                            value={f.value}
                            onSelect={(currentValue) => {
                              form.setValue("box", currentValue)
                              setOpenBox(false)
                            }}
                            className="cursor-pointer border-b-2"
                          >
                            <CheckIcon
                              className={cn("mr-2 h-4 w-4", field.value === f.value ? "opacity-100" : "opacity-0")}
                            />
                            {`BOX: ${f.value}`}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Botão de envio */}
        <Button type="submit" className="w-full hover:scale-[1.02] mt-2">
          Autorizar descarga
        </Button>
      </form>
    </Form>
  )
}
