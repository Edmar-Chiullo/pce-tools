'use client'

import * as React from "react"
import { CheckIcon, ChevronsDown, ChevronsDownUp, ChevronsUpDownIcon, LucideChevronsDown, LucideChevronsDownUp } from "lucide-react"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import {Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "sonner";

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { box } from "@/app/pages/receipt-operator/box";

const FormSchema = z.object({
  status: z.string({
    required_error: "Por favor, selecionar oo controle.",
  }),

  box: z.string({
    required_error: "Por favor, selecione a opção.",
  }),

})

export default function Combobox({props}:any) {
  const { carga, lbCarga } = props
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  
  const [openStatus, setOpenStatus] = useState(false);
  const [openBox, setOpenBox] = useState(false);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    lbCarga(data)

    form.reset({
      status: '',
      box: ''
    })

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 p-1">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel>Selecionar controlar</FormLabel>
              <Popover open={openStatus} onOpenChange={setOpenStatus}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openStatus}
                    className={cn("w-[200px] justify-between", !field.value && "text-muted-foreground")}
                  >
                    {field.value
                      ? carga.find((f: any) => f.bulkControl === field.value)?.bulkControl
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
                        {carga.map((f: any) =>
                          f.bulkState === "Entrada" ? (
                            <CommandItem
                              key={f.bulkControl}
                              value={f.bulkControl}
                              onSelect={(currentValue) => {
                                form.setValue("status", currentValue);
                                setOpenStatus(false);
                              }}
                              className="flex items-center justify-center cursor-pointer border-b-2"
                            >
                              <CheckIcon
                                className={cn("mr-2 h-4 w-4", field.value === f.bulkControl ? "opacity-100" : "opacity-0")}
                              />
                              {`CONTROLE: ${f.bulkControl}`}
                            </CommandItem>
                          ) : null
                        )}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
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
                    {field.value ? box.find((f: any) => f.value === field.value)?.value : "Selecione a opção..."}
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
                              form.setValue("box", currentValue);
                              setOpenBox(false);
                            }}
                            className="flex items-center justify-center cursor-pointer border-b-2"
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

        <Button type="submit" className="w-full hover:scale-[1.02]">
          Autorizar descarga
        </Button>
      </form>
    </Form>
  );
}
