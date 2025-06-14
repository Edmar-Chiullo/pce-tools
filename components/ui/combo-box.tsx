'use client'

import * as React from "react"
import { CheckIcon, ChevronsDown, ChevronsDownUp, ChevronsUpDownIcon, LucideChevronsDown, LucideChevronsDownUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import {Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "sonner";

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { setBulkCpd } from "@/app/firebase/fbmethod"
import { useRouter } from "next/navigation"
import { carga } from "../../utils/create-carga"

import { useReceiptContext } from "@/app/context/carga-context"
import { useLoginContext } from "@/app/context/user-context";

const FormSchema = z.object({
  status: z.string({
    required_error: "Por favor, selecione a opção.",
  }),
})

export default function Combobox({props}:any) {
  const { carga, lbCarga } = props
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  
  const [open, setOpen] = React.useState(false)


  function onSubmit(data: z.infer<typeof FormSchema>) {
    lbCarga(data)

    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
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
              <FormLabel>Selecionar opção</FormLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      name="status"
                      className={cn("w-[200px] justify-between", !field.value && "text-muted-foreground")}
                    >
                      {field.value ? carga.find((framework:any) => framework.bulkControl === field.value)?.bulkControl : "Selecione a opção..."}
                      <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder={"Selecione a opção..."}/>
                      <CommandList>
                        <CommandEmpty>Controle não encontrado.</CommandEmpty>
                        <CommandGroup>
                          {carga.map((framework:any) => (
                            framework.bulkState === 'Entrada' ? (                            
                            <CommandItem
                              key={framework.bulkControl}
                              value={framework.bulkControl}
                              className="flex items-center justify-center cursor-pointer border-b-2"
                              onSelect={(currentValue) => {
                                form.setValue('status', currentValue)
                                setOpen(false)
                              }}
                            >
                              <CheckIcon
                                className={cn("mr-2 h-4 w-4", field.value === framework.bulkControl ? "opacity-100" : "opacity-0")}
                              />
                              {`CONTROLE: ${framework.bulkControl}`}
                            </CommandItem>
                            ): '' 
                          ))}                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full hover:scale-[1.02]">Altorizar descarga</Button>
      </form>
    </Form>

  )
}