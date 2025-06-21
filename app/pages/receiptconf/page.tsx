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
  const router = useRouter();

  const [timeoutIds, setTimeoutIds] = useState<string[]>([]);

// Chamada quando tempo limite for atingido
  const handleTimeout = (bulkId: string) => {
    setTimeoutIds((prev) => [...prev, bulkId]);
  };

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
        // const carga = result[0]?.carga || result[0];
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
      router.push('/pages/receiptconfup');
    }
  }

  return (
    <div className="main flex flex-col p-3 h-screen">
      <div className="flex justify-end items-center w-full h-2">
        <h5>{userName}</h5>
      </div>

      <div className="flex justify-center items-center w-full h-24">
        <h1 className="text-4xl">Recebimento</h1>
      </div>
      <div className="flex justify-end gap-9 w-full h-[80%]">
        <div className="relative w-[82%] h-[100%] rounded-md p-1 bg-zinc-50">
          <div className="w-full bg-zinc-950 pl-1 pr-1 rounded-t-sm">
            <ul className="grid grid-cols-7 gap-8 text-zinc-50">
              <li className="col-start-1 place-self-center">Controle</li>
              <li className="col-start-2 place-self-center">Doca</li>
              <li className="col-start-3 place-self-center">Agenda</li>
              <li className="col-start-4 place-self-center">Data</li>
              <li className="col-start-5 place-self-center">Hora</li>
              <li className="col-start-6 place-self-center">Tempo</li>
              <li className="col-start-7 place-self-center mr-2">Editar</li>
            </ul>
          </div>
          <ScrollArea className="w-full h-full">
            {bulk.map(({ carga }, key) => (
              carga.bulkState === 'recebendo'  && (                
                <div key={key} className={`flex items-center w-full h-6 rounded-[4px] mb-[1.50px] ${timeoutIds.includes(carga.bulkId) ? 
                  'bg-red-400 hover:bg-red-500' : 'bg-zinc-200 hover:bg-zinc-300'}`}>
                  <ul className="grid grid-cols-7 gap-10 text-[15px] w-full">
                    <li className="col-start-1 place-self-center">{carga.bulkControl.toUpperCase()}</li>
                    <li className="col-start-2 place-self-center">{carga.bulkDoca?.toUpperCase()}</li>
                    <li className="col-start-3 place-self-center">{carga.bulkAgenda?.toUpperCase()}</li>
                    <li className="col-start-4 place-self-center">{fullDatePrint(carga.bulkReceiptDate)}</li>
                    <li className="col-start-5 place-self-center">{hourPrint(carga.bulkReceiptDate)}</li>
                    <li className="col-start-6 place-self-center">
                      <Timer props={{ 
                        date: carga.bulkReceiptDate, 
                        onLimitReached: () => handleTimeout(carga.bulkId), 
                        limitSeconds: 1200000
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
