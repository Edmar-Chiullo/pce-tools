'use client'

import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useMemo, useState } from "react";
import { useReceiptContext } from "@/app/context/carga-context";
import Image from "next/image";
import Timer from "./span";
import { fullDate, fullDatePrint, hourPrint } from "@/utils/date-generate";
import { useRouter } from "next/navigation";
import { getReceipt } from "@/lib/firebase/server-database";
import { onChildAdded, onChildChanged, ref } from "firebase/database";
import { db } from "@/app/firebase/fbkey";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useSession } from "next-auth/react";

type UserData = {
    first: string
    session: string
    center: string
}
export default function ScrollCpd() {
    const [ bulk, setBulk ] = useState<any[]>([])
    const [yellowTimeoutIds, setYellowTimeoutIds] = useState<string[]>([]);
    const [redTimeoutIds, setRedTimeoutIds] = useState<string[]>([]);
    const router = useRouter();

    const handleYellowTimeout = (bulkId: string) => setYellowTimeoutIds((prev) => [...prev, bulkId])
    const handleRedTimeout = (bulkId: string) => setRedTimeoutIds((prev) => [...prev, bulkId])

    const { setReceipt } = useReceiptContext()
      
    const { data: session, status } = useSession()
    const user: UserData | null = useMemo(() => {
      if (session?.user?.name) {
          try {
              return JSON.parse(session.user.name) as UserData
          } catch (error) {
              console.error("Erro ao fazer parse dos dados do usuário:", error)
              return null
          }
      }
      return null
    }, [session])

    useEffect(() => {
      getReceipt().then((val) => {
        const arr = Object.values(val)
        setBulk(arr)
      })

      const strDate = fullDate().replace(/\//g, "");
      const basePath = `${strDate.slice(4,8)}/${strDate.slice(2,8)}/${strDate.slice(0,2)}/${user?.center}/recebimento`;
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
    }, [status, user])


    function openCarga(value: any) {
      const parent = value.target.parentElement
      const element = bulk.filter(({carga}) => carga.bulkId === parent.id)
      const { carga } = element[0]

      if (carga.bulkStateReceipt === 'Carro estacionado' && carga.bulkStateReceipt !== 'Conferência finalizada') {
        toast.warn(`Carga não pode ser editada.`, {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
          });
        return
      }
  
      if (carga.bulkStateReceipt === 'Conferência finalizada') {
        setReceipt(carga)
        router.push('/pages/home/cpd/liberarcanhoto')
      } else {
        setReceipt(carga)
        router.push('/pages/home/cpd/cpdatualizar')
      }
      
    }
    
    return (
        <div className="h-[calc(100%-40px)] overflow-hidden">
            <ScrollArea>
            {
              bulk.map(({carga}, key) => {
                return (
                  <div key={key} className={`flex items-center w-full h-6 rounded-[4px] mb-[1.50px] cursor-pointer 
                                            ${carga.bulkStateCpd === 'liberar canhoto' ? 'hidden' : 'none'}`}>
                    <ul className={`grid grid-cols-11 gap-10 pl-1 text-[15px]
                                    ${
                                      carga.bulkStateReceipt === 'Carro estacionado' ? 'bg-amber-300 hover:bg-amber-400' :
                                      carga.bulkStateConf === 'Finalizada sucesso' ? 'bg-green-300 hover:bg-green-400' : 
                                      carga.bulkStateConf === 'Finalizada divergente' ? 'bg-red-500 hover:bg-red-600' : 'bg-zinc-200 hover:bg-zinc-300'
                                    }`
                                  }>
                      <li className="col-start-1 col-span-2">{carga.bulkDriver.toUpperCase()}</li>
                      <li className="col-start-3 col-span-2">{carga.bulkCarrier.toUpperCase()}</li>
                      <li className="col-start-5 place-self-center">{carga.bulkAgenda.toUpperCase()}</li>
                      <li className="col-start-6 place-self-center">{carga.bulkId.toUpperCase()}</li>
                      <li className="col-start-7 place-self-center">{carga.bulkDriverPhoneNumber.toUpperCase()}</li>
                      <li className="col-start-8 place-self-center">{fullDatePrint(carga.bulkCpdDate)}</li>
                      <li className="col-start-9 place-self-center">{hourPrint(carga.bulkCpdDate)}</li>
                      <li className="col-start-10 place-self-center">
                        <Timer props={{
                          date: carga.bulkCpdDate,
                          onYellowLimitReached: () => handleYellowTimeout(carga.bulkId),
                          onRedLimitReached: () => handleRedTimeout(carga.bulkId),
                          yellowLimitSeconds: 2340, 
                          redLimitSeconds: 2400 
                        }} />
                      </li>
                      <li id={carga.bulkId} className="col-start-11 place-self-end self-start pr-5"> 
                        <Image 
                          onClick={(value) => openCarga(value)}
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
              })
            }
          </ScrollArea>
        </div>
    )
}