'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";

import { ref, onChildAdded, onChildChanged } from "firebase/database";
import { db } from "@/app/firebase/fbkey";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { fullDatePrint, fullDate, hourPrint } from "@/utils/date-generate";

import { useReceiptContext } from "@/app/context/carga-context";

import Timer from "@/components/ui/span";
import { getReceipt } from "@/app/firebase/fbmethod";
import { handlePrint } from "@/utils/print";
import { extraction } from "@/utils/extract-carga";

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
  const [timeoutIds, setTimeoutIds] = useState<string[]>([]);


  const handleTimeout = (bulkId: string) => {
    setTimeoutIds((prev) => [...prev, bulkId]);
  };
  
  const { receipt }:any = useReceiptContext()
  const router = useRouter()
  
  function printar() {
    console.log(receipt)
  }
  useEffect(() => {
    // const userLogin:any = localStorage.getItem('userName')
    // userLogin ? setUserName(userLogin) : router.push('/')


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
    const { carga } = extraction({value:value, bulk:bulk})
    handlePrint(carga)
  }

  return (
    <div className="main flex flex-col p-3 w-full h-screen">
      <Image
        onClick={() => router.push('/pages/receiptconf')}
        className="cursor-pointer hover:scale-[1.10]"
        src={'/seta-esquerda.png'}
        width={20}
        height={20}
        alt="Proxima página."
      />
      <div className="flex justify-end items-center w-full">
        <h5>{userName}</h5>
      </div>
      <div className="flex justify-center items-center w-full h-18">
        <h1 className="text-4xl">Recebimento</h1>
      </div>
      <div className="flex gap-9 w-full h-[80%]">
        <div className="relative w-full h-[100%] rounded-md p-1 bg-zinc-50">
          <div className="w-full bg-zinc-950 pl-1 pr-1 rounded-t-sm">
            <ul className="grid grid-cols-8 gap-8 text-zinc-50">
              <li className="col-start-1 place-self-center">Controle</li>
              <li className="col-start-2 place-self-center">Doca</li>
              <li className="col-start-3 place-self-center">Agenda</li>
              <li className="col-start-4 place-self-center">Data</li>
              <li className="col-start-5 place-self-center">Hora</li>
              <li className="col-start-6 place-self-center">Tempo</li>
              <li className="col-start-7 place-self-center mr-2">Situação</li>
              <li className="col-start-8 place-self-center mr-2">Imprimir</li>
            </ul>
          </div>
          <ScrollArea className="w-full h-full">
            {
              bulk.map(({carga}, key) => {
                if (carga.bulkState === 'Finalizada') return (
                  <div key={key} className={`flex items-center w-full h-6 rounded-[4px] mb-[1.50px] ${timeoutIds.includes(carga.bulkId)
                      ? 'bg-red-400 hover:bg-red-500' : 'bg-zinc-200 hover:bg-zinc-300'
                  }`}>
                    <ul className="grid grid-cols-8 gap-10 text-[15px] w-full">
                      <li className="col-start-1 place-self-center">{carga.bulkControl.toUpperCase()}</li>
                      <li className="col-start-2 place-self-center">{carga.bulkDoca.toUpperCase()}</li>
                      <li className="col-start-3 place-self-center">{carga.bulkAgenda.toUpperCase()}</li>
                      <li className="col-start-4 place-self-center">{fullDatePrint(carga.bulkConfDate).toUpperCase()}</li>
                      <li className="col-start-5 place-self-center">{hourPrint(carga.bulkConfDate).toUpperCase()}</li>
                      <li className="col-start-6 place-self-center">
                        <Timer props={{
                          date: carga.bulkConfDate,
                          onLimitReached: () => handleTimeout(carga.bulkId),
                          limitSeconds: 12000000
                        }} />
                      </li>
                      <li id={carga.bulkId} className="col-start-7 place-self-center self-start "> 
                          {carga.bulkState.toUpperCase()}
                      </li>        
                      <li id={carga.bulkId} className="col-start-8 place-self-center self-start">
                        <Image
                          onClick={(value) => open(value)}
                          className="cursor-pointer hover:scale-[1.10] mr-4"
                          src={'/impressora-com-papel.png'}
                          width={20}
                          height={20}
                          alt="Proxima página."
                        />
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
