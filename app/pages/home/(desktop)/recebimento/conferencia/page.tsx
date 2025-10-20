'use client'

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

import { ref, onChildAdded, onChildChanged } from "firebase/database";
import { db } from "@/app/firebase/fbkey";

import { ScrollArea } from "@/components/ui/scroll-area";
import { fullDatePrint, fullDate, hourPrint } from "@/utils/date-generate";

import { useReceiptContext } from "@/app/context/carga-context";
import Timer from "@/components/ui/span";
import { ArrowBigRightIcon, ArrowDownRight } from "lucide-react";
import Link from "next/link";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";

// Função utilitária para atualizar um item pelo bulkId
function updateById(array: any[], updatedItem: any, key: string = 'bulkId') {
  return array.map(item =>
    item.carga[key] === updatedItem[key] ? { carga: updatedItem } : item
  );
}

// Função utilitária para adicionar item sem duplicar
function addUniqueById(array: any[], newItem: any, key: string = 'bulkId') {
  const exists = array.some(item => item.carga[key] === newItem[key]);
  return exists ? array : [...array, { carga: newItem }];
}

export default function ReceiptScreen() {
  const [bulk, setBulk] = useState<any[]>([]);
  const { setReceipt } = useReceiptContext();
  const [ userName, setUserName ] = useState<string | null>('')
  
  const [yellowTimeoutIds, setYellowTimeoutIds] = useState<string[]>([]);
  const [redTimeoutIds, setRedTimeoutIds] = useState<string[]>([]);
  
  const handleYellowTimeout = (bulkId: string) => setYellowTimeoutIds((prev) => [...prev, bulkId])
  const handleRedTimeout = (bulkId: string) => setRedTimeoutIds((prev) => [...prev, bulkId])
  
  const router = useRouter();

  useEffect(() => {
    const userLogin:any = localStorage.getItem('userName')
    userLogin ? setUserName(userLogin) : router.push('/')

    const strDate = fullDate().replace(/\//g, "");

    const basePath = `activity/receipt/${strDate.slice(4, 8)}/${strDate.slice(2, 8)}/`;

    const cargaReceipt = ref(db, basePath);
    onChildAdded(cargaReceipt, (snapshot) => {
      if (snapshot.exists()) {
        const result = Object.values(snapshot.val());
        const carga = result[0];
        setBulk((prev) => addUniqueById(prev, carga));
      }
    });

    const alterCarga = ref(db, basePath);
    onChildChanged(alterCarga, (snapshot) => {
      if (snapshot.exists()) {
        const { carga } = snapshot.val();
        setBulk((prev) => updateById(prev, carga));
      }
    });
  }, []);

  function openCarga(e: any) {
    const parent = e.target.closest("li");
    const element = bulk.find(item => item.carga.bulkId === parent?.id);
    if (element) {
      setReceipt(element.carga);
      router.push('/pages/home/recebimento/finalizarconferencia');
    }
  }

  return (
    <div className="main flex flex-col p-2 w-full h-full bg-zinc-800 rounded-2xl">
      <div className="flex justify-center items-center w-full h-12">
        <h1 className="text-4xl text-zinc-50">Recebimento</h1>
      </div>
      <div className="flex justify-end items-center w-full h-6 ">
        <Link href={'/pages/home/recebimento/cargasfinalizadas'}>
          <ArrowBigRightIcon className="size-8 mb-2 text-zinc-50 hover:cursor-pointer"/>
        </Link>
      </div>
      <div className="flex justify-end gap-9 w-full h-full">
        <div className="relative w-full rounded-md bg-zinc-50">
          <div className="w-full bg-zinc-600 pl-1 pr-1 rounded-t-sm">
            <ul className="grid grid-cols-7 gap-8 text-zinc-50">
              <li className="col-start-1 place-self-center">Controle</li>
              <li className="col-start-2 place-self-center">Doca</li>
              <li className="col-start-3 place-self-center">Agenda</li>
              <li className="col-start-4 place-self-center">Data</li>
              <li className="col-start-5 place-self-center">Hora</li>
              <li className="col-start-6 place-self-center">Tempo</li>
              <li className="col-start-7 place-self-center mr-2">Liberar</li>
            </ul>
          </div>
          <ScrollArea className="w-full">
            {bulk.map(({ carga }, key) => (
              carga.bulkStateReceipt === 'Carro estacionado'  && (                
                <div key={key} className={`flex items-center w-full h-6 rounded-[4px] mb-[1.50px] bg-amber-100`}>
                  <ul className="grid grid-cols-7 gap-10 text-[15px] w-full">
                    <li className="col-start-1 place-self-center">{carga.bulkControl.toUpperCase()}</li>
                    <li className="col-start-2 place-self-center">{carga.bulkDoca?.toUpperCase()}</li>
                    <li className="col-start-3 place-self-center">{carga.bulkAgenda?.toUpperCase()}</li>
                    <li className="col-start-4 place-self-center">{fullDatePrint(carga.bulkReceiptDate)}</li>
                    <li className="col-start-5 place-self-center">{hourPrint(carga.bulkReceiptDate)}</li>
                    <li className="col-start-6 place-self-center">
                      <Timer props={{
                        date: carga.bulkReceiptDate,
                        onYellowLimitReached: () => handleYellowTimeout(carga.bulkId),
                        onRedLimitReached: () => handleRedTimeout(carga.bulkId),
                        yellowLimitSeconds: 2340, 
                        redLimitSeconds: 2400 
                      }} />
                    </li>
                    <li id={carga.bulkId} className="col-start-7 place-self-center self-start">
                      <Image
                        onClick={openCarga}
                        className="cursor-pointer hover:scale-[1.10]"
                        src={'/proximo.png'}
                        width={20}
                        height={20}
                        alt="Proxima página."
                      />
                    </li>
                  </ul>
                </div>
              )
            ))}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
