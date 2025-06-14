'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";

import { ref, onChildAdded } from "firebase/database";
import { db } from "@/app/firebase/fbkey";

import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { fullDatePrint, fullDate, hourPrint } from "@/utils/date-generate";

import { setBulkReceipt } from "@/app/firebase/fbmethod";
import { useReceiptContext } from "@/app/context/carga-context";

import { ReceiptOperator } from "@/app/class/class-task";

import Timer from "@/components/ui/span";

// Component Login....
export default function ReceiptScreen() {

  const [ bulk, setBulk ] = useState<any[]>([])
  const { setReceipt } = useReceiptContext()

  const router = useRouter()

  useEffect(() => {
    const strDate = fullDate()
    .replace('/','')
    .replace('/','')

    const cargaReceipt = ref(db, `activity/receipt/${strDate.slice(4,8)}/${strDate.slice(2,8)}/`)   
    onChildAdded(cargaReceipt, (snapshot) => {
        if (snapshot.exists()) {
            const result = Object.values(snapshot.val())
            setBulk((object:any) => [...object, result[0]])
        } else {
            return "No data available"
        }
    })    
  }, [])
  
  function openCarga(value: any) {
    const parent = value.target.parentElement
    const element = bulk.filter(({bulkId}) => bulkId === parent.id)
    setReceipt(element[0])

    router.push('/pages/receipt-conf-up')
  }

  return (
    <div className="main flex p-3 h-screen">
        <div className="flex flex-col items-center justify-center gap-10 w-80 h-[95vh] pl-3">
            <h1 className="lg:text-2xl md:text-6xl sm:text-4xl self-start">CPD - RECEBIMENTO</h1>
        </div>
        <div className="relative self-end w-[100%] h-[82%] rounded-md p-1 bg-zinc-50">
            <div className="w-full bg-zinc-950 pl-1 pr-1 rounded-t-sm">
            <ul className="grid grid-cols-7 gap-8 text-zinc-50">
                <li className="col-start-1 place-self-center">Controle</li>
                <li className="col-start-2 place-self-center">Doca</li>
                <li className="col-start-3 place-self-center">Agenda</li>
                <li className="col-start-4 place-self-center">Data</li>
                <li className="col-start-5 place-self-center">Hora</li>
                <li className="col-start-6 place-self-center">Tempo</li>
                <li className="col-start-7 place-self-center mr-2">Situação</li>
            </ul>
            </div>
            <ScrollArea className="w-full h-full">
            {
                bulk.map((carga, key) => {
                return (
                    <div key={key} className="w-full h-10 mb-1 pl-1 pr-1 rounded-[4px] bg-zinc-100 hover:bg-zinc-200">
                    <ul className="grid grid-cols-7 gap-8 text-[15px]">
                        <li className="col-start-1 place-self-center">{carga.bulkControl.toUpperCase()}</li>
                        <li className="col-start-2 place-self-center">{carga.bulkDoca.toUpperCase()}</li>
                        <li className="col-start-3 place-self-center">{carga.bulkAgenda.toUpperCase()}</li>
                        <li className="col-start-4 place-self-center">{fullDatePrint(carga.bulkReceiptDate).toUpperCase()}</li>
                        <li className="col-start-5 place-self-center">{hourPrint(carga.bulkReceiptDate).toUpperCase()}</li>
                        <li className="col-start-6 place-self-center"><Timer props={{date:carga.bulkReceiptDate, k:key}} /></li>
                        <li id={carga.bulkId} onClick={(value) => openCarga(value)} className="col-start-7 place-self-center self-start pt-1"> 
                        <Button className="h-8">
                            {carga.bulkState}
                        </Button>
                        </li>
                        
                    </ul>
                    </div>
                )
                })
            }
            </ScrollArea>
        </div>
    </div>
  );
}
