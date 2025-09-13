'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import { ref, onChildAdded, onChildChanged } from "firebase/database";
import { db } from "@/app/firebase/fbkey";
import { ScrollArea } from "@/components/ui/scroll-area";
import Combobox from "@/components/ui/combo-box";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { fullDatePrint, fullDate, hourPrint } from "@/utils/date-generate";
import { useLoginContext } from "@/app/context/user-context";
import Timer from "@/components/ui/span";
import { alterIdCarga } from "./alterIdCarga";
import { setBulkCpd } from "@/app/firebase/fbmethod";
import { getReceipt } from "@/app/firebase/fbmethod";
import { formatString } from "@/utils/strSeparator";

import { TimerResetIcon } from "lucide-react";

import Link from "next/link";

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
  const { user } = useLoginContext() 
  const router = useRouter()
  
  const [yellowTimeoutIds, setYellowTimeoutIds] = useState<string[]>([])
  const [redTimeoutIds, setRedTimeoutIds] = useState<string[]>([])
  
  const handleYellowTimeout = (bulkId: string) => setYellowTimeoutIds((prev) => [...prev, bulkId])
  const handleRedTimeout = (bulkId: string) => setRedTimeoutIds((prev) => [...prev, bulkId])

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

  function open(value: any) {
    const element = bulk.filter(({carga}) => carga.bulkControl === value)
    return element
  }

  function lbCarga(id:string) {
    const { status, box }:any = id
    const i = open(status)
    const obj = alterIdCarga({dataForm:i[0], situacao:'carro estacionado', box:box, user:user})
    setBulkCpd(obj) 
  }

  return (
    <div className="main flex flex-col p-2 w-full h-full rounded-2xl bg-zinc-800">
      <div className="flex justify-center items-end w-full p-4">
        <h1 className="text-3xl text-zinc-50">Recebimento cargas</h1>
      </div>
      <div className="flex gap-2 w-full h-full">
        <Combobox props={{carga:bulk, lbCarga:lbCarga}}/>
        <div className="relative w-[85%] h-full rounded-md bg-zinc-50">
          <Link href="/pages/home/recebimento/conferencia">
            <div className="absolute top-[-34px] right-28 flex gap-1 p-1 cursor-pointer hover:scale-[1.10] rounded-sm hover:bg-zinc-100/30 transition ease-in-out duration-75">
              <TimerResetIcon className=" size-4 text-zinc-50"/>
              <span className="text-zinc-50 text-[12px]">Conferência</span>
            </div>
          </Link>

          <Link href="/pages/home/recebimento/cargasfinalizadas">
            <div className="absolute top-[-34px] right-4 flex gap-1 p-1 cursor-pointer hover:scale-[1.10] rounded-sm hover:bg-zinc-100/30 transition ease-in-out duration-75">
              <TimerResetIcon className=" size-4 text-zinc-50"/>
              <span className="text-zinc-50 text-[12px]">Pull Time</span>
            </div>
          </Link>
          <div className="w-full bg-zinc-600 pl-1 pr-1 rounded-t-sm">
            <ul className="grid grid-cols-8 gap-8 text-zinc-50">
              <li className="col-start-1 place-self-center">Controle</li>
              <li className="col-start-2 place-self-center">Doca</li>
              <li className="col-start-3 place-self-center">Placa</li>
              <li className="col-start-4 place-self-center">Agenda</li>
              <li className="col-start-5 place-self-center">Data</li>
              <li className="col-start-6 place-self-center">Hora</li>
              <li className="col-start-7 place-self-center">Tempo</li>
              <li className="col-start-8 place-self-center mr-2">Situação</li>
            </ul>
          </div>
          <ScrollArea className="w-full bg-zinc-100 rounded-2xl">
            {
              bulk.map(({carga}, key) => {
                if (carga.bulkStateReceipt === 'carro estacionado') return (
                  <div key={key} className={`flex items-center w-full h-6 rounded-[4px] mb-[1.50px] bg-amber-100`}>
                    <ul className="grid grid-cols-8 gap-8 text-[15px] w-full">
                      <li className="col-start-1 place-self-center">{carga.bulkControl.toUpperCase()}</li>
                      <li className="col-start-2 place-self-center">{carga.bulkDoca.toUpperCase()}</li>
                      <li className="col-start-3 place-self-center">{formatString(carga.bulkPlate.toUpperCase())}</li>
                      <li className="col-start-4 place-self-center">{carga.bulkAgenda.toUpperCase()}</li>
                      <li className="col-start-5 place-self-center">{fullDatePrint(carga.bulkReceiptDate).toUpperCase()}</li>
                      <li className="col-start-6 place-self-center">{hourPrint(carga.bulkReceiptDate).toUpperCase()}</li>
                      <li className="col-start-7 place-self-center">
                        <Timer props={{
                          date: carga.bulkReceiptDate,
                          onYellowLimitReached: () => handleYellowTimeout(carga.bulkId),
                          onRedLimitReached: () => handleRedTimeout(carga.bulkId),
                          yellowLimitSeconds: 2340, 
                          redLimitSeconds: 2400 
                        }} />
                      </li>
                      <li id={carga.bulkId} className="col-start-8 w-70 place-self-start self-center text-[9px]"> 
                          {carga.bulkStateReceipt.toUpperCase()}
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
