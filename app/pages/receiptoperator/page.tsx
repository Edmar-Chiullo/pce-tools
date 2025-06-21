'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";

import { ref, onChildAdded, onChildChanged } from "firebase/database";
import { db } from "@/app/firebase/fbkey";

import { ScrollArea } from "@/components/ui/scroll-area";
import Combobox from "@/components/ui/combo-box";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { fullDatePrint, fullDate, hourPrint } from "@/utils/date-generate";

import { setBulkReceipt } from "@/app/firebase/fbmethod";
import { useReceiptContext } from "@/app/context/carga-context";
import { useLoginContext } from "@/app/context/user-context";

import { ReceiptOperator } from "@/app/class/class-task";

import Timer from "@/components/ui/span";
import { alterIdCarga } from "./alterIdCarga";
import { setBulkCpd } from "@/app/firebase/fbmethod";
import { extractionData } from "@/utils/alter-object";
import { getReceipt } from "@/app/firebase/fbmethod";

const formSchema = z.object({
  filial: z.string().min(2, {
    message: "Inserir com o nome do motorista.",
  }),
  agenda: z.string().min(2, {
    message: "Inserir o nome da transportadora",
  }),
  doca: z.string().min(2, {
    message: "Inserir o número da placa.",
  }),
  controle: z.string().min(2, {
    message: "Inserir o número do ticket.",
  }),
  tipo_carga: z.string().min(2, {
    message: "Inserir o número do controle.",
  }),  
  qt_pallet: z.string().min(2, {
    message: "Inserir o número de telefone.",
  }), 
})

// Component Login....
export default function ReceiptScreen() {

  const [ bulk, setBulk ] = useState<any[]>([])
  const [ userName, setUserName ] = useState<string | null>('')
  
  const { setReceipt } = useReceiptContext()
  const { receipt }:any = useReceiptContext()
  const { user } = useLoginContext() 

  const router = useRouter()

  useEffect(() => {
    const userLogin:any = localStorage.getItem('userName')
    userLogin ? setUserName(userLogin) : router.push('/')


    getReceipt().then((val) => {
      const arr = Object.values(val)
      setBulk(arr)
    
    })

    const strDate = fullDate().replace(/\//g, "");

    const basePath = `activity/receipt/${strDate.slice(4, 8)}/${strDate.slice(2, 8)}/`;

    const cargaReceipt = ref(db, basePath) 
      onChildAdded(cargaReceipt, (snapshot) => {
        if (snapshot.exists()) {
          const arr = snapshot.val();
          const { carga } = arr;

          setBulk((prev) => {
            const exists = prev.some((item) => item.carga.bulkId === carga.bulkId);
            if (!exists) {
              return [...prev, { carga }];
            }
            return prev;
          });
        }
      });  

    const alterCarga = ref(db, basePath)
      onChildChanged(alterCarga, (snapshot) => {
        if (snapshot.exists()) {
          const { carga } = snapshot.val();
          const id = carga.bulkId;
          setBulk((prev) =>
            prev.map((item) => item.carga.bulkId === id ? { carga } : item)
          );
        }
      });

  }, [])
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      filial: "",
      agenda: "",
      doca: "",
      controle: "",
      tipo_carga: "",
      qt_pallet: ""
    },
  })

  function openCarga(value: any) {
    const parent = value.target.parentElement
    const element = bulk.filter(({bulkId}) => bulkId === parent.id)
    if (element[0].bulkState === 'recebendo') return
    setReceipt(element[0])

    router.push('/pages/receipt-update')
  }

  function open(value: any) {
    const element = bulk.filter(({carga}) => carga.bulkControl === value)
    return element
  }

  function lbCarga(id:string) {
    const { status, box }:any = id
    const i = open(status)
    const obj = alterIdCarga({dataForm:i[0], situacao:'recebendo', box:box, user:user})
    setBulkCpd(obj) 
  }

  return (
    <div className="main flex flex-col p-3 h-screen">
      <div className="flex justify-end items-center w-full h-2">
        <h5>{userName}</h5>
      </div>
      <div className="flex justify-center items-center w-full h-24">
        <h1 className="text-4xl">Recebimento</h1>
      </div>
      <div className="flex gap-9 w-full h-[80%]">
        <Combobox props={{carga:bulk, lbCarga:lbCarga}}/>
        <div className="relative w-[80%] h-[100%] rounded-md p-1 bg-zinc-50">
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
              bulk.map(({carga}, key) => {
                if (carga.bulkState === 'recebendo') return (
                  <div key={key} className="flex items-center w-full h-6 rounded-[4px] bg-zinc-200 hover:bg-zinc-300 mb-[1.50px]">
                    <ul className="grid grid-cols-7 gap-10 text-[15px] w-full">
                      <li className="col-start-1 place-self-center">{carga.bulkControl.toUpperCase()}</li>
                      <li className="col-start-2 place-self-center">{carga.bulkDoca.toUpperCase()}</li>
                      <li className="col-start-3 place-self-center">{carga.bulkAgenda.toUpperCase()}</li>
                      <li className="col-start-4 place-self-center">{fullDatePrint(carga.bulkReceiptDate).toUpperCase()}</li>
                      <li className="col-start-5 place-self-center">{hourPrint(carga.bulkReceiptDate).toUpperCase()}</li>
                      <li className="col-start-6 place-self-center"><Timer props={{date:carga.bulkReceiptDate, k:key}} /></li>
                      <li id={carga.bulkId} className="col-start-7 place-self-center self-start "> 
                          {carga.bulkState.toUpperCase()}
                      </li>              
                    </ul>
                  </div>
                )
              })
            }
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
