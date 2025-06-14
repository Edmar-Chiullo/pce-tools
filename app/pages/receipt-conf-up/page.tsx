'use client'

import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage, FormItem,  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { setBulkCpd } from "@/app/firebase/fbmethod"
import { useRouter } from "next/navigation"
import { carga } from "@/utils/create-carga";

import { useReceiptContext } from "@/app/context/carga-context"
import { useLoginContext } from "@/app/context/user-context";
import Combobox from "@/components/ui/combo-box";
        
export default function PegeResponse() {

    const { receipt }:any = useReceiptContext()
    const { user } = useLoginContext() 
    const router = useRouter()


    function onSubmit() {
        const obj = carga({dataForm:'form', carga:'carga', situacao:'recebendo', user:'user'})
        setBulkCpd(obj)  
    
        router.push('/pages/receipt-conf')
    }
    
    return (
    <div className="absolute top-0 left-0 z-10 w-full h-full bg-zinc-50 rounded-[4px] p-1">
        <div className="flex flex-col items-center justify-center gap-4 w-full h-56 pl-3">
        <h1 className="lg:text-2xl md:text-6xl sm:text-4xl self-start">EDITAR</h1>
        <div className="flex w-full">
            <div className="w-full">
                <Combobox />
            </div>
        </div>
        </div>
        <hr />
    </div>
    )
}
        